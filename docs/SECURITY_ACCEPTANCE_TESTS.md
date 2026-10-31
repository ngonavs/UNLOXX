# Prototype 2 — Security acceptance tests (initial swarm output)

This is a review checklist and test specification, **not evidence of passing tests**.

## Authentication and authorization
1. Anonymous request to /admin is redirected or rejected on the server.
2. A Young account cannot access Mentor, School, or Admin data, including direct API requests.
3. Mentor A cannot read Mentor B's private data; School A cannot read School B's data.
4. Changing user_metadata, form fields or request JSON to role=admin cannot elevate privileges.
5. Only a privileged, audited server-side operation can assign admin role; founder bootstrap is one-time and authenticated.
6. Password reset and email verification flows invalidate/refresh sessions correctly.
7. Sign-out revokes access; stale tokens are rejected as appropriate.
8. Supabase RLS is enabled on every private table and checked using distinct authenticated user sessions.

## Minors and event safety
1. Mentor-to-student private messages are not implemented or are rejected server-side.
2. Student registration for events enforces applicable guardian/school approval.
3. Unapproved events cannot be publicly discovered by students.
4. Student location and personal data are minimized and protected.

## AI and infrastructure
1. Model provider secret is not exposed in client bundles or public responses.
2. Unauthenticated users cannot consume the AI API; per-user rate limits are enforced.
3. Logs redact tokens and sensitive information; error messages do not leak secrets.
4. Preview deployment uses non-production credentials and is not promoted without review.
5. Existing static GitHub Pages site remains intact until explicit founder approval.

## Execution status
Not executed. Run as automated integration tests once the Next.js and Supabase implementation exists. Attach command output and failure logs to the PR.
