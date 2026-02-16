# Quickstart: Manager Weekly Clarity MVP

## 1. Objective

Validate the MVP end-to-end for a pilot manager:
1. Connect calendar + Slack
2. Receive prep before enabled meetings
3. Capture notes in Slack/web
4. Receive weekly clarity in Slack + email
5. Confirm stakeholder suggestions
6. Validate retention/export/delete controls

## 2. Environment assumptions

- Docker Engine with Compose plugin is available locally.
- One test workspace in Slack
- At least one connected calendar account (Google or Microsoft)
- User timezone default `Asia/Bangkok`
- Worker processes running for sync/schedule/retention jobs

## 3. Seed data checklist

- Create at least 3 recurring 1:1 meetings (2 attendees).
- Create at least 3 recurring stakeholder-like meetings (3–8 attendees).
- Include at least one meeting with no description.
- Include one week of synthetic notes across Slack and web.

## 3.1 Local container startup

1. Start all services with Docker Compose.
2. Confirm backend, frontend, workers, PostgreSQL, and Redis containers are healthy.
3. Verify API and web container logs show successful boot without fatal errors.

## 4. MVP validation flows

### Flow A: Onboarding to first value (<3 minutes)

1. Sign up with email/password or magic link.
2. Connect calendar provider.
3. Install/connect Slack workspace.
4. Keep default weekly send time (Sun 7pm Asia/Bangkok).
5. Confirm at least one 1:1 prep meeting.
6. Generate first value.

**Expected**:
- First output generated without manual history paste.
- Meeting candidates and 1:1 auto-detection are visible.

### Flow B: Prep delivery + note capture

1. Enable prep for upcoming meeting.
2. Wait for prep window run.
3. Confirm prep card includes context/open loops/agenda/questions and source list.
4. After meeting end + 5 min, confirm capture prompt arrives.
5. Reply in thread with messy notes.
6. Add additional note via web inbox.

**Expected**:
- Notes persisted with timestamps and optional meeting links.
- Prep fallback works when no notes exist (agenda + metadata).

### Flow C: Weekly clarity generation

1. Trigger on-demand weekly generation.
2. Verify required sections and grouped actions (max 10).
3. Confirm receipts for actions/decisions/risks/people signals.
4. Verify Slack concise view with expansion path.
5. Verify email mirror includes manager update + follow-up drafts.

**Expected**:
- Action controls mutate state (`Mark done`, follow-up draft creation).

### Flow D: Stakeholder suggestions

1. Confirm user activation status is true.
2. Run weekly suggestion job.
3. Verify max one suggestion DM/week.
4. Confirm option behavior:
   - Confirm → prep enabled immediately
   - Not now → snoozed 30 days
   - Stop suggesting → no future suggestion sends

### Flow E: Privacy and retention

1. Set retention to 30 days.
2. Execute retention worker and verify aged records removed.
3. Request export and validate data package contains user + derived entities.
4. Request account deletion and verify all access/data revoked.

## 5. Pilot readiness checklist

- Docker Compose stack starts successfully on a clean machine.
- Onboarding completion under 3 minutes for sample users.
- Prep send reliability ≥ target in plan.
- Weekly generation and delivery verified in timezone.
- Suggestion rate limiting validated.
- Retention/export/delete validated with evidence logs.
- Event telemetry visible for activation and engagement funnel.

## 6. Pilot runbook validation evidence

- Capture screenshots for onboarding, prep card, weekly Slack summary, and privacy settings.
- Archive sample worker logs for prep, weekly, suggestions, and retention jobs.
- Record one successful export and one account deletion trace with timestamps.
- Confirm API contract paths used during pilot are present in `contracts/api.yaml`.
