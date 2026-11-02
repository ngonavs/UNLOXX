# UNLOXX secure data foundation (draft)

**Status: not applied to Supabase.** The connected UNLOXX account is not accessible from this chat. Never execute this SQL on any RUMIQO/hotel project.

## Architecture

- Supabase Auth identifies each student using `auth.uid()`. Separate Mentor and School access models will be designed before enabling those roles.
- `unloxx_student_profiles`: nickname, short bio, dream and private showcase settings. No date of birth, school, address or phone required.
- `unloxx_student_projects`: owner-controlled project titles/descriptions. File uploads and public sharing are intentionally excluded.
- `unloxx_student_progress`: server-owned XP, read-only to the student.
- `unloxx_badge_catalog`: six initial badges, read-only to students.
- `unloxx_student_badges`: server-awarded badges, read-only to students.
- All tables have RLS; students can only read their own sensitive rows. No anonymous access.
- **Important:** Browser-local quest completion is not evidence of a verified achievement. Do not copy local XP or badges into trusted server tables. Design verified quest events and anti-abuse rules before awarding XP.

## Eleven ranks

| Rank | Minimum XP |
| --- | ---: |
| Newbie | 0 |
| Rookie | 100 |
| Explorer | 250 |
| Traveler | 450 |
| Adventurer | 700 |
| Achiever | 1000 |
| Dream Crusher | 1400 |
| Mastermind | 1900 |
| Grand Mastermind | 2500 |
| Legends | 3200 |
| Master Legends | 4000 |

Rank is **derived** from XP in the app, not editable by students.

## Before execution

1. Confirm project name and project ID are the dedicated UNLOXX project. Inspect existing schema to avoid name collisions.
2. Review current Supabase security and RLS documentation, then inspect SQL in `unloxx/sql/student_foundation.sql`.
3. Apply only in an isolated UNLOXX test project first, and run owner/non-owner/anonymous access tests.
4. Add guardian-consent, age-appropriate onboarding, deletion/export and moderation requirements before accepting real student data.
5. Confirm email auth redirect URLs and origin restrictions before any production login.

## Acceptance tests (not yet run)

- Anonymous client cannot read any of the five tables.
- Student A cannot read or mutate Student B's profile or projects.
- Student A cannot insert/update XP or awarded badges.
- Student A can create and edit only their own profile and projects.
- Student A cannot change project ownership to Student B.
- Deleting an Auth user removes their associated private rows.
- No public portfolios, user search or leaderboards are available.

This file is a reviewable proposal, **not a migration applied to a database**.
