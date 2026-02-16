# Implementation Plan: Manager Weekly Clarity MVP

**Branch**: `[001-weekly-clarity-mvp]` | **Date**: 2026-02-16 | **Spec**: [/specs/001-weekly-clarity-mvp/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-weekly-clarity-mvp/spec.md`

## Summary

Deliver a Slack-first manager copilot MVP for onboarding, prep, note capture, weekly clarity,
suggestions, and trust controls. Implement as a TypeScript monorepo (frontend, backend,
workers) with PostgreSQL + Redis, schema-constrained AI outputs, and Docker Compose for
reproducible local runtime validation.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS  
**Primary Dependencies**: Next.js, NestJS, BullMQ, Prisma, Zod, Slack SDK, Google Calendar API, Microsoft Graph, Playwright, Vitest  
**Storage**: PostgreSQL (primary store), Redis (queue/scheduler)  
**Testing**: Vitest for contract/integration/unit scaffolding, Playwright for onboarding e2e flow  
**Target Platform**: Linux containers (local Docker Compose + cloud container runtime parity)  
**Project Type**: web (frontend + backend + workers)  
**Performance Goals**: prep delivery before meeting start for 95% of enabled meetings; weekly generation completion < 3 minutes for p95  
**Constraints**: Slack-first output reliability, source-grounded outputs, explicit commitment confirmation, retention policy enforcement, idempotent background delivery, no model training on user data  
**Scale/Scope**: pilot scale 10–20 managers; single-region deployment; multi-tenant workspace/user boundaries

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate Review

| Gate | Status | Notes |
|------|--------|-------|
| I. User Trust & Data Minimization | PASS | Plan includes retention controls, export/delete flows, and explicit no-training surfaces. |
| II. Source-Grounded Intelligence | PASS | Prep/weekly structures require receipts and explicit source references. |
| III. Slack-First Delivery Reliability | PASS | Slack remains primary delivery channel with retries/idempotency. |
| IV. Incremental, Testable Delivery | PASS | Story-driven tasking and independent acceptance checks are defined. |
| V. Observability & Safe Operations | PASS | Activation/usage/job telemetry is modeled and included in implementation artifacts. |

### Post-Design Re-Check (after Phase 1 artifacts)

| Gate | Status | Notes |
|------|--------|-------|
| I. User Trust & Data Minimization | PASS | Data model + endpoints include retention/export/delete support and workspace scoping. |
| II. Source-Grounded Intelligence | PASS | Contract and source-mapper services enforce receipts and source linkage. |
| III. Slack-First Delivery Reliability | PASS | Worker and delivery artifacts include scheduling windows and idempotent key generation. |
| IV. Incremental, Testable Delivery | PASS | quickstart and tests define independent validation paths for each user story. |
| V. Observability & Safe Operations | PASS | analytics events, queue health, and error capture hooks are present. |

## Project Structure

### Documentation (this feature)

```text
specs/001-weekly-clarity-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api.yaml
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── prisma/
├── src/
│   ├── modules/
│   ├── shared/
│   └── main.ts
└── tests/

frontend/
├── src/
│   ├── app/
│   └── components/
└── tests/

workers/
└── src/
    ├── prep-scheduler/
    ├── weekly-scheduler/
    ├── retention/
    └── shared/queue/

docker-compose.yml
backend/Dockerfile
frontend/Dockerfile
workers/Dockerfile
```

**Structure Decision**: Web split architecture is retained to isolate synchronous APIs from
asynchronous scheduling workers, while Docker Compose provides local parity for backend,
frontend, workers, PostgreSQL, and Redis.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
