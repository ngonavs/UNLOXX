# UNLOXX OpenAI integration — secure deployment checklist

## Current status
Backend scaffold only. The AI endpoint intentionally refuses live requests until real user authentication, per-user rate limiting, and abuse protections are integrated. The GitHub Pages frontend continues to use its offline demo guide. No OpenAI API key is in the repository.

## Required setup and approvals
1. Create a dedicated UNLOXX OpenAI API project and secret key at https://platform.openai.com/api-keys. Never paste keys into chat, GitHub, HTML, or client-side JavaScript.
2. Approve API billing and set conservative project usage alerts/budgets. ChatGPT subscriptions do not include API usage.
3. Approve a separate Vercel project for the UNLOXX API (not RUMIQO). Add OPENAI_API_KEY as a server-only environment variable. Configure UNLOXX_ALLOWED_ORIGIN=https://ngonavs.github.io.
4. Choose UNLOXX authentication and identity verification (recommended: dedicated Supabase project), rate limits, moderation, and student/guardian safeguarding policy before switching on paid model calls.
5. After authentication is working, replace the fail-closed handler in api/ai.js with an authenticated OpenAI Responses API request, add moderation and bounded conversation history, and point the frontend at the deployed API URL.
6. Validate deployment, origin checks, abuse handling, cost caps, privacy notices, and age-appropriate safety with supervised tests.

## Planned architecture
GitHub Pages static UI -> HTTPS Vercel /api/ai -> verified user + rate limits + safety controls -> OpenAI Responses API. No keys in the browser. Plus entitlements must be checked on the server, not inferred from browser localStorage.

## Privacy
Avoid sending students' full names, birthdays, school records, or private contact information to the model. Provide a clear AI disclosure, data retention notice, reporting pathway, and adult/guardian oversight appropriate to users' ages.
