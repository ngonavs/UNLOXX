# UNLOXX Prototype 2 — Agent Swarm Plan

## Ground rules
- **Only** `ngonavs/UNLOXX`; never access or modify any other repository.
- `main` is the existing public static website. No direct pushes, no merges without authorized human review.
- Claude's ordinary chat cannot push GitHub commits. Founder transfers its generated files for review; this is a **coordinated workflow**, not autonomous Claude-to-ChatGPT communication.
- Use `claude/prototype-2` for proposed implementation and `chatgpt/review-fixes` for isolated review corrections. Open draft PRs for review; do not merge without approval.
- Never commit passwords, API secrets, service-role keys, personal data or real minors' data.
- Only authorized adults manage provider accounts, payments and legal obligations.

## Workstreams and acceptance gates
| Workstream | Deliverable | Acceptance gate |
| --- | --- | --- |
| Architecture | Next.js App Router migration plan, dependency choices, hosting and rollback | Preserve existing GitHub Pages site; clear Vercel preview strategy |
| Authentication & security | Supabase Auth, 4 roles: young/mentor/school/admin, role provisioning, RLS | Verified users cannot self-promote; founder-only admin bootstrap; tested cross-account isolation |
| Mentor portal | Dedicated responsive pages, themes, verified mentor workflows, event proposals | Real data only; approvals required; no mentor-to-minor direct messaging |
| School portal | School-specific access, staff roles, supervised event registration | Cross-school isolation and consent safeguards |
| Admin | Protected control tower, audit logs, approvals, event moderation | Admin access checked on server and in DB; no hardcoded credentials |
| UNLOXX AI | Authenticated model API via server, streaming, usage quotas, safeguards | No client-side API key; age-appropriate safety; real model integration verified |
| QA/DevOps | CI checks, integration tests, security review, preview deploy | Checks green, eligible human review, founder approval before merge |

## Implementation order
1. **P0** Architecture + secure auth + database migrations + RLS + test harness.
2. **P1** Mentor and School authenticated flows.
3. **P1** Admin Control Tower and moderation.
4. **P2** Real UNLOXX AI with provider configuration and limits.
5. **P2** Young UI based on founder's forthcoming design brief, with minor-safety requirements.
6. Preview validation, independent review, staged launch and rollback readiness.

## Definition of done
- Code is in a non-main branch and reviewed as a PR.
- Relevant automated tests are executed and results documented honestly.
- No credentials or personal data are exposed.
- Database policies are checked for privilege escalation and cross-tenant leaks.
- Required services configured by authorized account owner.
- Founder explicitly approves merge/deployment.

## Current status
- Swarm coordination plan only; no independent agents have been launched.
- Two development branches created; no production login or AI backend is operational yet.
- Awaiting Claude Phase 1 generated files for actual review and integration.
