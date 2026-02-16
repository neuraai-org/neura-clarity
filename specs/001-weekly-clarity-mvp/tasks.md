---
description: "Task list for implementing Manager Weekly Clarity MVP"
---

# Tasks: Manager Weekly Clarity MVP

**Input**: Design documents from `/specs/001-weekly-clarity-mvp/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.yaml

**Tests**: Acceptance and contract-oriented tests are included because the specification and plan define measurable validation scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, etc.) for story phases only
- Every task includes a concrete file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize workspace layout, toolchain, and container baseline.

- [X] T001 Initialize root workspace scripts and package manager config in package.json
- [X] T002 [P] Add TypeScript base config in tsconfig.base.json
- [X] T003 [P] Add lint config in .eslintrc.cjs
- [X] T004 [P] Add formatter config in .prettierrc
- [X] T005 [P] Add git ignore patterns in .gitignore
- [X] T006 [P] Add Docker ignore patterns in .dockerignore
- [X] T007 Initialize backend package manifest in backend/package.json
- [X] T008 Initialize frontend package manifest in frontend/package.json
- [X] T009 Initialize workers package manifest in workers/package.json
- [X] T010 [P] Add backend runtime env template in backend/.env.example
- [X] T011 [P] Add workers runtime env template in workers/.env.example
- [X] T012 Create backend bootstrap entrypoint in backend/src/main.ts
- [X] T013 Create frontend layout bootstrap in frontend/src/app/layout.tsx
- [X] T014 Create workers bootstrap entrypoint in workers/src/main.ts
- [X] T015 [P] Add backend Dockerfile in backend/Dockerfile
- [X] T016 [P] Add frontend Dockerfile in frontend/Dockerfile
- [X] T017 [P] Add workers Dockerfile in workers/Dockerfile
- [X] T018 Add Docker Compose stack definition in docker-compose.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared platform capabilities required before all stories.

**⚠️ CRITICAL**: No user-story implementation should start until this phase is complete.

- [X] T019 Define Prisma multi-tenant schema and enums in backend/prisma/schema.prisma
- [X] T020 Add initial migration scaffold in backend/prisma/migrations/001_init/migration.sql
- [X] T021 [P] Implement root module wiring in backend/src/modules/auth/auth.module.ts
- [X] T022 [P] Implement tenant context middleware in backend/src/shared/middleware/tenant-context.middleware.ts
- [X] T023 [P] Implement token crypto utility in backend/src/shared/security/token-crypto.ts
- [X] T024 [P] Implement idempotency key utility in backend/src/shared/idempotency/idempotency-key.ts
- [X] T025 [P] Implement event logger service in backend/src/shared/observability/event-logger.service.ts
- [X] T026 [P] Implement source reference service in backend/src/shared/sources/source-reference.service.ts
- [X] T027 [P] Implement analytics base module in backend/src/modules/analytics/analytics.module.ts
- [X] T028 [P] Implement queue connection factory in workers/src/shared/queue/queue-factory.ts
- [X] T029 [P] Implement retention policy helper in workers/src/retention/retention-policy.ts
- [X] T030 Add OpenAPI presence contract test in backend/tests/contract/openapi-contract.spec.ts
- [X] T031 Add workspace-level TypeScript config for backend in backend/tsconfig.json
- [X] T032 Add workspace-level TypeScript config for workers in workers/tsconfig.json
- [X] T033 Validate compose syntax and dependencies in docker-compose.yml

**Checkpoint**: Foundation ready for independent user-story development.

---

## Phase 3: User Story 1 - Activate quickly and receive first value (Priority: P1) 🎯 MVP

**Goal**: Let a new manager complete onboarding in under 3 minutes and receive first value.

**Independent Test**: A new user can sign up, connect calendar + Slack, configure defaults, confirm meetings, and generate first output.

### Implementation for User Story 1

- [X] T034 [P] [US1] Implement signup and magic-link endpoints in backend/src/modules/auth/auth.controller.ts
- [X] T035 [P] [US1] Implement Google connect/callback service in backend/src/modules/integrations/google-calendar.service.ts
- [X] T036 [P] [US1] Implement Microsoft connect/callback service in backend/src/modules/integrations/microsoft-calendar.service.ts
- [X] T037 [P] [US1] Implement Slack connect/install service in backend/src/modules/integrations/slack-integration.service.ts
- [X] T038 [US1] Implement settings read/update endpoint in backend/src/modules/auth/settings.controller.ts
- [X] T039 [US1] Implement meetings list endpoint with classification in backend/src/modules/meetings/meetings.controller.ts
- [X] T040 [US1] Implement prep-config toggle endpoint in backend/src/modules/meetings/prep-config.controller.ts
- [X] T041 [US1] Implement first-value generation endpoint in backend/src/modules/prep/first-value.controller.ts
- [X] T042 [US1] Implement onboarding timing analytics service in backend/src/modules/analytics/activation-events.service.ts
- [X] T043 [US1] Build onboarding UI flow in frontend/src/app/onboarding/page.tsx
- [X] T044 [US1] Build meeting-selection UI flow in frontend/src/app/onboarding/meetings/page.tsx
- [X] T045 [US1] Add onboarding acceptance test in backend/tests/integration/us1-onboarding-acceptance.spec.ts

**Checkpoint**: User Story 1 provides first-value onboarding experience independently.

---

## Phase 4: User Story 2 - Receive actionable meeting prep and capture notes easily (Priority: P1)

**Goal**: Deliver prep before meetings and accept messy notes from Slack/web.

**Independent Test**: Prep arrives in time with sources, and notes can be captured from Slack/web without strict structure.

### Implementation for User Story 2

- [X] T046 [P] [US2] Implement prep payload assembler with section limits in backend/src/modules/prep/prep-payload.service.ts
- [X] T047 [P] [US2] Implement prep window scanner worker in workers/src/prep-scheduler/prep-window.worker.ts
- [X] T048 [P] [US2] Implement Slack prep delivery service in backend/src/modules/prep/slack-prep-delivery.service.ts
- [X] T049 [P] [US2] Implement post-meeting capture worker in workers/src/prep-scheduler/post-meeting-capture.worker.ts
- [X] T050 [P] [US2] Implement notes create endpoint in backend/src/modules/notes/notes.controller.ts
- [X] T051 [P] [US2] Implement Slack notes ingestion handler in backend/src/modules/notes/slack-notes.handler.ts
- [X] T052 [US2] Implement prep generation endpoint in backend/src/modules/prep/prep.controller.ts
- [X] T053 [US2] Implement prep source mapper service in backend/src/modules/prep/prep-source-mapper.service.ts
- [X] T054 [US2] Implement web inbox UI in frontend/src/app/inbox/page.tsx
- [X] T055 [US2] Add prep-and-notes acceptance test in backend/tests/integration/us2-prep-notes-acceptance.spec.ts

**Checkpoint**: User Story 2 prep and capture loop works independently.

---

## Phase 5: User Story 3 - Get weekly clarity summary and follow-through actions (Priority: P1)

**Goal**: Generate weekly clarity (Slack + email) with receipts and actionable controls.

**Independent Test**: User gets weekly digest at configured time or on-demand, with stateful actions.

### Implementation for User Story 3

- [X] T056 [P] [US3] Implement weekly input compiler in backend/src/modules/weekly/weekly-inputs.service.ts
- [X] T057 [P] [US3] Implement weekly LLM orchestrator in backend/src/modules/weekly/weekly-llm.service.ts
- [X] T058 [P] [US3] Implement weekly cron scheduler worker in workers/src/weekly-scheduler/weekly-cron.worker.ts
- [X] T059 [P] [US3] Implement Slack weekly delivery service with concise budget in backend/src/modules/weekly/slack-weekly-delivery.service.ts
- [X] T060 [P] [US3] Implement email weekly delivery service with drafts in backend/src/modules/weekly/email-weekly-delivery.service.ts
- [X] T061 [US3] Implement on-demand weekly generation endpoint in backend/src/modules/weekly/weekly.controller.ts
- [X] T062 [US3] Implement action status update endpoint in backend/src/modules/actions/actions.controller.ts
- [X] T063 [US3] Implement weekly/prep history UI page in frontend/src/app/history/page.tsx
- [X] T064 [US3] Implement source receipt component in frontend/src/components/receipts/source-receipt.tsx
- [X] T065 [US3] Add weekly clarity acceptance test in backend/tests/integration/us3-weekly-acceptance.spec.ts

**Checkpoint**: User Story 3 weekly clarity and action follow-through works independently.

---

## Phase 6: User Story 5 - Trust controls for privacy, retention, export, and deletion (Priority: P1)

**Goal**: Provide explicit trust controls and enforce retention/export/delete behavior.

**Independent Test**: User can change retention, export data, delete account, and verify data is removed.

### Implementation for User Story 5

- [X] T066 [P] [US5] Implement retention settings endpoint in backend/src/modules/privacy/retention-settings.controller.ts
- [X] T067 [P] [US5] Implement retention sweep worker in workers/src/retention/retention-sweep.worker.ts
- [X] T068 [P] [US5] Implement data export endpoint in backend/src/modules/privacy/export.controller.ts
- [X] T069 [P] [US5] Implement account deletion endpoint in backend/src/modules/privacy/delete-account.controller.ts
- [X] T070 [US5] Implement commitments confirmation endpoint in backend/src/modules/actions/commitments.controller.ts
- [X] T071 [US5] Implement onboarding privacy copy page in frontend/src/app/onboarding/privacy/page.tsx
- [X] T072 [US5] Implement privacy settings page with no-train copy in frontend/src/app/settings/privacy/page.tsx
- [X] T073 [US5] Add privacy acceptance test in backend/tests/integration/us5-privacy-acceptance.spec.ts

**Checkpoint**: User Story 5 trust and data-control capabilities work independently.

---

## Phase 7: User Story 4 - Confirm stakeholder meetings with low-noise suggestions (Priority: P2)

**Goal**: Suggest stakeholder meetings responsibly with activation gate and weekly rate limit.

**Independent Test**: Suggestion DM volume is limited and user responses update prep eligibility.

### Implementation for User Story 4

- [X] T074 [P] [US4] Implement stakeholder scoring service in backend/src/modules/suggestions/stakeholder-scoring.service.ts
- [X] T075 [P] [US4] Implement suggestion candidate worker in workers/src/weekly-scheduler/suggestion-candidate.worker.ts
- [X] T076 [P] [US4] Implement suggestion eligibility guard in backend/src/modules/suggestions/suggestion-eligibility.service.ts
- [X] T077 [P] [US4] Implement suggestion respond endpoint in backend/src/modules/suggestions/suggestions.controller.ts
- [X] T078 [US4] Implement Slack suggestion action parser in backend/src/modules/suggestions/slack-suggestion-actions.handler.ts
- [X] T079 [US4] Implement suggestion confirmation service in backend/src/modules/suggestions/suggestion-confirmation.service.ts
- [X] T080 [US4] Implement suggestion settings UI in frontend/src/app/settings/suggestions/page.tsx
- [X] T081 [US4] Add suggestion acceptance test in backend/tests/integration/us4-suggestions-acceptance.spec.ts

**Checkpoint**: User Story 4 suggestion lifecycle works independently.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening across all stories and containerized pilot readiness.

- [X] T082 [P] Add analytics dashboard endpoint in backend/src/modules/analytics/dashboard.controller.ts
- [X] T083 [P] Add error monitoring integration hook in backend/src/shared/observability/error-monitoring.ts
- [X] T084 [P] Add queue health reporter in workers/src/shared/queue/queue-health.ts
- [X] T085 [P] Add delivery idempotency service in backend/src/modules/weekly/delivery-log.service.ts
- [X] T086 Add follow-up draft endpoint in backend/src/modules/actions/followup-drafts.controller.ts
- [X] T087 [P] Add Playwright onboarding e2e test in frontend/tests/e2e/us1-onboarding-flow.spec.ts
- [X] T088 [P] Align OpenAPI contract with follow-up draft endpoint in specs/001-weekly-clarity-mvp/contracts/api.yaml
- [X] T089 [P] Update pilot runbook evidence checklist in specs/001-weekly-clarity-mvp/quickstart.md
- [X] T090 Validate Docker Compose stack startup and service health in docker-compose.yml

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 → required before Phase 2.
- Phase 2 → blocks all user-story phases.
- After Phase 2, recommended order by priority/value:
  1. Phase 3 (US1)
  2. Phase 4 (US2)
  3. Phase 5 (US3)
  4. Phase 6 (US5)
  5. Phase 7 (US4)
- Phase 8 runs after required user stories are complete.

### User Story Completion Order (Dependency Graph)

- `US1` → establishes activation baseline and integration setup.
- `US2` depends on meeting/prep enablement patterns from `US1`.
- `US3` depends on notes/actions signal quality from `US2`.
- `US5` is mostly independent after Phase 2 and can run in parallel with `US2`/`US3`.
- `US4` depends on activation and meeting data from `US1` + `US2`.

### Parallelization Rules

- Any tasks with `[P]` can run concurrently when phase prerequisites are met.
- Tasks touching the same file should remain sequential.
- Safe parallel lanes: backend modules, frontend pages/components, workers, and spec docs.

---

## Parallel Execution Examples

### User Story 1

- T035, T036, T037 can run in parallel (separate integration services).
- T043 and T044 can run in parallel once API contracts stabilize.

### User Story 2

- T046, T047, T048, T050, T051 can run in parallel.
- T054 can run in parallel with T046–T053 backend work.

### User Story 3

- T056, T057, T058, T059, T060 can run in parallel.
- T063 and T064 can run in parallel after weekly payload shape is fixed.

### User Story 5

- T066, T067, T068, T069 can run in parallel.
- T071 and T072 can run in parallel with backend privacy APIs.

### User Story 4

- T074, T075, T076, T077 can run in parallel.
- T078 and T079 follow after response contract is finalized.

---

## Implementation Strategy

### MVP Scope (recommended)

1. Phase 1 Setup
2. Phase 2 Foundational
3. Phase 3 User Story 1
4. Phase 4 User Story 2
5. Phase 5 User Story 3

This slice delivers onboarding + prep + weekly clarity loop and supports initial pilot testing.

### Incremental Delivery

- Increment 1: `US1`
- Increment 2: `US2`
- Increment 3: `US3`
- Increment 4: `US5`
- Increment 5: `US4`
- Final: polish + container readiness

---

## Notes

- All tasks follow strict checklist format: checkbox + task ID + optional `[P]` + required `[USx]` + file path.
- Setup and foundational phases intentionally have no story labels.
- Story phases are independently testable increments aligned to spec acceptance scenarios.
