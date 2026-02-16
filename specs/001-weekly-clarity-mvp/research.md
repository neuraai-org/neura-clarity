# Research: Manager Weekly Clarity MVP

## Decision 1: Application topology

- **Decision**: Use a split web architecture (frontend, backend API, workers) with TypeScript across all services.
- **Rationale**: MVP requires user-facing onboarding/settings UX, synchronous API orchestration, and durable scheduled/background execution for prep and weekly delivery.
- **Alternatives considered**:
  - Single monolith process: simpler initially but weaker isolation of scheduler failures.
  - Serverless-only design: higher integration complexity for recurring schedules and idempotent retries.

## Decision 2: Queue and scheduling model

- **Decision**: Use Redis-backed BullMQ queues for recurring and event-driven jobs.
- **Rationale**: Supports retries, backoff, idempotency keys, delayed jobs (prep window and post-meeting capture), and visibility into job attempts.
- **Alternatives considered**:
  - Cron in app process: poor resiliency and limited retry semantics.
  - External workflow engine: too heavy for MVP timeline.

## Decision 3: Data persistence

- **Decision**: Use PostgreSQL as canonical store, with normalized multi-tenant tables keyed by `workspace_id` and `user_id`.
- **Rationale**: Strong consistency for action state, suggestion lifecycle, retention windows, and auditable source references.
- **Alternatives considered**:
  - Document store: flexible but weaker relational guarantees for source-link integrity.
  - Mixed stores from day one: unnecessary operational overhead.

## Decision 4: Calendar integrations approach

- **Decision**: Use incremental sync with provider event IDs + recurrence keys and upsert semantics.
- **Rationale**: Minimizes API calls, keeps ingestion idempotent, and supports meeting classification from historical recurrence patterns.
- **Alternatives considered**:
  - Full sync each run: expensive and slower.
  - Webhook-first only: inconsistent availability across providers/workspace setup states.

## Decision 5: Slack delivery and interactions

- **Decision**: Slack is primary output path using DM messages, interactive buttons, and thread capture prompts.
- **Rationale**: Matches core product habit loop and constitution requirement for Slack-first reliability.
- **Alternatives considered**:
  - Email-first approach: slower action loop and lower in-flow engagement.
  - Slash-command only: insufficient for proactive prep/weekly delivery.

## Decision 6: LLM orchestration and safety

- **Decision**: Constrain LLM responses to strict JSON schemas and reject/regenerate invalid outputs.
- **Rationale**: Guarantees render-safe payloads, deterministic downstream processing, and source-link contract compliance.
- **Alternatives considered**:
  - Free-form markdown generation: brittle parsing and weaker traceability.
  - Post-hoc heuristic parsing: lower reliability and higher ambiguity risk.

## Decision 7: Source-grounding strategy

- **Decision**: Every extracted item carries `source_ref` metadata (`snippet`, `timestamp`, `source_type`, `source_id`) persisted with outputs/actions.
- **Rationale**: Enables receipts everywhere and aligns with trust requirements.
- **Alternatives considered**:
  - Storing source references only in rendered messages: loses auditability.
  - Optional source references: violates product non-negotiables.

## Decision 8: Commitment handling

- **Decision**: Detected commitments are stored as candidates with `suggested` default state and explicit confirm action.
- **Rationale**: Prevents accidental assertions and enforces user control.
- **Alternatives considered**:
  - Auto-promoting commitment text to action item: too risky and violates constitutional guardrail.

## Decision 9: Retention and deletion policy enforcement

- **Decision**: Implement retention sweeps as scheduled workers that hard-delete notes, outputs, and derived entities beyond policy.
- **Rationale**: Enforces policy continuously and supports clear user trust expectations.
- **Alternatives considered**:
  - Soft-delete only: does not satisfy explicit retention guarantees.
  - Manual admin cleanup: non-scalable and error-prone.

## Decision 10: Suggestion eligibility and throttling

- **Decision**: Run weekly candidate detection but gate send by activation status and hard rate limit of one suggestion DM/week/user.
- **Rationale**: Balances relevance and anti-spam behavior required by MVP.
- **Alternatives considered**:
  - Send top-3 immediately: higher spam risk.
  - No activation gate: poor early user trust and fatigue.

## Decision 11: Observability baseline

- **Decision**: Emit product and job telemetry for activation, delivery, and action lifecycle events with structured logs and error traces.
- **Rationale**: Needed to operate paid pilot and diagnose reliability regressions quickly.
- **Alternatives considered**:
  - Basic request logs only: insufficient for scheduler and Slack delivery debugging.

## Decision 12: Pilot launch scope constraints

- **Decision**: Keep both Google and Microsoft calendar support in MVP; keep email digest enabled but secondary.
- **Rationale**: Directly matches paid pilot target and requirements set.
- **Alternatives considered**:
  - Cut Microsoft at launch: faster build but reduces pilot eligibility.
  - Slack-only launch: acceptable fallback but not selected for this plan.

## Decision 13: Local runtime orchestration

- **Decision**: Use Docker Compose to orchestrate frontend, backend, workers, PostgreSQL, and Redis for local integration runs.
- **Rationale**: Ensures reproducible environment setup and supports a single command startup path for end-to-end checks.
- **Alternatives considered**:
  - Manual multi-terminal startup: error-prone and inconsistent across developer machines.
  - Kubernetes for local MVP: too heavy for pilot-stage development needs.
