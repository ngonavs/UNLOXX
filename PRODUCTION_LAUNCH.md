# UNLOXX production launch checklist

Status: **not production-ready**. Existing demo flows are local-browser simulations, not real registrations or messaging. Do not represent them as live services.

## Backend blocker
Supabase organization already uses its two free active projects for RUMIQO. Creating a third project was rejected at $0/month. Do not pause, delete, upgrade or modify RUMIQO projects. Options: a separate free Supabase organization/account with available quota, or approved paid capacity.

## Before real launch
- Separate UNLOXX Supabase project and browser-safe publishable key; never commit service-role keys.
- Real email/password signup and email verification using Supabase Auth. Do not store plaintext passwords.
- Server-validated Young, Mentor and School roles; school/mentor verification; guardian consent where required.
- Database RLS on all user data; no cross-account reads/writes; safe retention and deletion policies.
- Replace browser-only event registrations and chats with verified server-backed features; do not enable unmoderated adult-to-child private messaging.
- Clearly disclose offline rule-based assistant; do not claim live AI until provider connected and tested.
- Run automated and manual end-to-end testing on mobile and desktop before removing demo labels.
- Verify Google Search Console ownership and submit sitemap.xml; indexing is not guaranteed.
