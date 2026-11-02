# UNLOXX Young Portfolio — pre-merge QA

Status: **local-browser demo only**. No authenticated accounts, server-backed XP, public profiles or uploads.

## Automated checks
- GitHub Actions `UNLOXX static quality`: HTML asset links, JS/inline syntax, portfolio wiring and rank ladder consistency.
- Passing static checks do **not** verify browser behavior, privacy of shared devices, accessibility or authentication.

## Manual checks required before merging
- Open Young portal on mobile, tablet and desktop. Portfolio tab opens and returns to Overview.
- Edit nickname and introduction; reload. Values persist in the same browser profile.
- Add up to 12 projects; 13th is rejected; remove a project; reload and verify deletion.
- Change showcase toggles; preview reflects badges, dream and projects without publishing.
- Click **Clear saved portfolio**, cancel, and confirm no data is deleted.
- Click **Clear saved portfolio**, accept, and confirm nickname, introduction and projects reset. Confirm unrelated Young demo data remains.
- Check private/shared-device wording; no real student personal details are requested.
- Complete a demo quest; verify Achievements and Portfolio use the same 11-rank ladder.
- Check narrow screens, keyboard navigation, focus outlines, reduced-motion and browser console.
- Ensure localStorage errors and malformed localStorage data do not crash the portal.

## Production blockers
- Real authentication, consent/guardian flows, deletion/export, secure storage and RLS have not been connected.
- Quest completion is self-reported; XP and badges are **not** verified.
- A shared browser profile can expose locally saved data to others. Do not market this as private user-account storage.
- Do not connect to Supabase until the dedicated UNLOXX project is verified and SQL security tests pass.

## Rank thresholds
Newbie 0, Rookie 100, Explorer 250, Traveler 450, Adventurer 700, Achiever 1000, Dream Crusher 1400, Mastermind 1900, Grand Mastermind 2500, Legends 3200, Master Legends 4000.
