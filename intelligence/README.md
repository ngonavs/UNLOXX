# UNLOXX Intelligence 0.1 — separate model service

This is the **first runnable inference service**, not a trained UNLOXX checkpoint or a production-ready AI. It runs a real open-weight transformer model locally or on your own server; it is **not rule-based** and does not call OpenAI or another paid model API.

## Model choice and attribution
Default foundation: [Qwen/Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B), Apache-2.0 licensed. Model weights and authorship remain Qwen's. UNLOXX-specific fine-tuning has **not yet occurred**. To build a distinct UNLOXX checkpoint, obtain permission to use curated training data, train a LoRA adapter, evaluate it against the original, and export/version the result. Never claim this is trained from scratch.

## Run locally (Python 3.11+, enough RAM; CPU can be slow)
```bash
cd intelligence
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export UNLOXX_ACCESS_TOKEN="choose-a-long-random-secret"
export UNLOXX_ALLOWED_ORIGIN="http://localhost:3000"
uvicorn app:app --host 127.0.0.1 --port 8000
```
On Windows use `.venv\\Scripts\\activate` and `set` or PowerShell `$env:` for variables. First launch downloads model weights (~1.5 GB plus tokenizer files) from Hugging Face. Set `UNLOXX_MODEL_PATH` to a local checkpoint directory when available. Use a GPU for practical latency.

## Test
```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -d '{"role":"young","messages":[{"role":"user","content":"Why is the sky blue?"}]}'
python evaluate.py
```

## Critical production gates
- **Do not expose the shared token in GitHub Pages JavaScript.** This backend must remain private until a server-side gateway and per-user authentication exist.
- Implement identity and role checks on the server, session-based quotas, content moderation and age-appropriate safeguarding before enabling access for minors.
- Validate safety and reasoning quality with representative evaluation sets and human review. A 0.6B model can hallucinate and make mathematical errors.
- Add privacy controls: no training on private chats without consent, retention limits, user deletion and security monitoring.
- Deploy the model on a server with sufficient memory and compute. GitHub Pages can only host static frontend files and **cannot run this Python model**.
- No public chat integration is included yet; this is intentional until secure hosting exists.

## Next milestones
1. Run inference and collect baseline evaluations.
2. Prepare licensed, consent-safe educational instruction examples.
3. Fine-tune with LoRA, evaluate and publish an internal UNLOXX model version.
4. Deploy an authenticated inference gateway, then integrate the three portals.
