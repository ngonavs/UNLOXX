# UNLOXX Prototype 2 (isolated development scaffold)

This folder is a **work in progress**, not a production-ready app. The existing GitHub Pages prototype remains at repository root.

## Local preview

1. Copy `.env.example` to `.env.local` and provide your own **public** Supabase URL and anon/publishable key.
2. Run `npm install` and `npm run dev` from this folder.
3. The homepage is a scaffold only. Sign-in, session refresh middleware, signup, admin bootstrap, consent workflows and backend APIs are **not yet implemented**.

Do not deploy or store real user data until the security work and tests are complete. The existing `supabase-prototype2.sql` in the repository root is a preliminary proposal, not a complete production schema.
