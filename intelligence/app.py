"""UNLOXX Intelligence 0.1: locally served, open-weight language model. No external AI API."""
import os
import threading
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from typing import Literal

import torch
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = os.getenv("UNLOXX_MODEL_PATH", "Qwen/Qwen3-0.6B")
ACCESS_TOKEN = os.getenv("UNLOXX_ACCESS_TOKEN", "")
ORIGIN = os.getenv("UNLOXX_ALLOWED_ORIGIN", "http://localhost:3000")
MAX_NEW_TOKENS = min(512, max(32, int(os.getenv("UNLOXX_MAX_NEW_TOKENS", "256"))))
RATE_LIMIT = int(os.getenv("UNLOXX_REQUESTS_PER_MINUTE", "12"))
SYSTEM = """You are UNLOXX Intelligence, an experimental AI study and mentorship assistant.
Be clear, respectful, encouraging and honest about uncertainty. You are an AI, not a human mentor.
For students, help them understand concepts and solve problems with explanations rather than shortcuts.
Do not request or retain private details, contact information, passwords or addresses of minors.
Do not facilitate private mentor-student contact. Never claim to have verified a mentor or event.
Avoid providing dangerous instructions. For emergencies, recommend contacting a trusted adult or local emergency services.
This is a prototype; do not pretend to have live internet access, access to accounts, or professional qualifications."""

tokenizer = None
model = None
lock = threading.Lock()
requests = defaultdict(deque)


@asynccontextmanager
async def lifespan(app: FastAPI):
    global tokenizer, model
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=False)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID, device_map="auto", torch_dtype="auto", trust_remote_code=False
    )
    model.eval()
    yield


app = FastAPI(title="UNLOXX Intelligence", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ORIGIN],
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)


class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2500)


class ChatRequest(BaseModel):
    role: Literal["young", "mentors", "schools"] = "young"
    messages: list[Message] = Field(min_length=1, max_length=12)


class ChatResponse(BaseModel):
    answer: str
    model: str
    prototype: bool = True


@app.get("/health")
def health():
    return {"status": "ready" if model is not None else "loading", "model": MODEL_ID}


@app.post("/v1/chat", response_model=ChatResponse)
def chat(body: ChatRequest, request: Request):
    # This shared-token prototype MUST NOT be directly exposed to untrusted public browsers.
    # Production requires per-user authentication, abuse protection and moderated input/output.
    if not ACCESS_TOKEN or request.headers.get("Authorization") != f"Bearer {ACCESS_TOKEN}":
        raise HTTPException(status_code=401, detail="Unauthorized")
    if body.messages[-1].role != "user":
        raise HTTPException(status_code=422, detail="Last message must be from the user")
    now = time.monotonic()
    key = request.client.host if request.client else "unknown"
    bucket = requests[key]
    while bucket and now - bucket[0] > 60:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Please try again later")
    bucket.append(now)
    if model is None:
        raise HTTPException(status_code=503, detail="Model is loading")
    context = [{"role": "system", "content": SYSTEM + f" Current portal: {body.role}."}]
    context += [m.model_dump() for m in body.messages]
    with lock, torch.inference_mode():
        tokens = tokenizer.apply_chat_template(
            context, tokenize=True, add_generation_prompt=True,
            enable_thinking=False, return_tensors="pt"
        ).to(model.device)
        if tokens.shape[-1] > 4096:
            raise HTTPException(status_code=413, detail="Conversation is too long")
        output = model.generate(
            tokens, max_new_tokens=MAX_NEW_TOKENS, do_sample=True,
            temperature=0.7, top_p=0.8, pad_token_id=tokenizer.eos_token_id
        )
        answer = tokenizer.decode(output[0][tokens.shape[-1]:], skip_special_tokens=True).strip()
    return ChatResponse(answer=answer or "Please try rephrasing your question.", model=MODEL_ID)
