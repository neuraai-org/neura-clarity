<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- Modified principles:
  - N/A → I. User Trust & Data Minimization
  - N/A → II. Source-Grounded Intelligence
  - N/A → III. Slack-First Delivery Reliability
  - N/A → IV. Incremental, Testable Delivery
  - N/A → V. Observability & Safe Operations
- Added sections:
  - Product & Technical Guardrails
  - Delivery Workflow & Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# Neura Clarity Constitution

## Core Principles

### I. User Trust & Data Minimization
The product MUST protect manager and employee data by default. The system MUST support
configurable retention windows (30/90/365 days), export, and account deletion. Calendar
and Slack integrations MUST request read-minimal scopes required for MVP workflows. The
product and policy copy MUST state that model providers are not allowed to train on user
data. Rationale: trust is the precondition for adoption in people-management workflows.

### II. Source-Grounded Intelligence
All generated outputs that claim actions, decisions, risks, people attention, or
commitments MUST include attributable receipts (`source snippet`, `timestamp`, and
`meeting/note reference`). Any statement lacking evidence MUST be marked as a suggestion
and MUST NOT be presented as a confirmed fact or decision. Commitments MUST default to
`suggested` and require explicit user confirmation to become `confirmed`. Rationale:
traceability and user control are mandatory for reliable AI assistance.

### III. Slack-First Delivery Reliability
MVP value delivery MUST work in Slack first: prep notifications before enabled meetings,
post-meeting capture prompts, weekly clarity summaries, and interactive action controls.
Primary workflows MUST remain usable even when optional channels (such as email) fail.
Schedulers and delivery jobs MUST be idempotent and retry-safe to prevent duplicates and
missed sends. Rationale: the weekly habit depends on consistent, low-friction delivery.

### IV. Incremental, Testable Delivery
Each feature MUST be decomposed into independently testable user journeys and shipped in
small increments. For every story, acceptance criteria MUST be defined before coding and
validated before rollout. Breaking schema or contract changes MUST include migration and
rollback strategy. Rationale: predictable iteration reduces delivery risk during pilot.

### V. Observability & Safe Operations
Critical product events and failures MUST be measurable. At minimum, activation and usage
events (`calendar_connected`, `slack_connected`, `prep_sent`, `note_created`,
`weekly_generated`, `action_completed`) and runtime errors MUST be captured. Background
jobs MUST emit execution status and retry metadata. Rationale: a pilot cannot be managed
without actionable operational visibility.

## Product & Technical Guardrails

- Tech stack baseline MUST be TypeScript-first with a web frontend, API/backend services,
  PostgreSQL persistence, and queue-based scheduling.
- LLM integrations MUST return schema-validated JSON before rendering to Slack/email.
- Multi-tenant separation by workspace and user MUST be enforced in data access paths.
- Calendar and Slack raw payload access MUST be restricted to operational needs and
  retention policy.
- The default user timezone MUST be `Asia/Bangkok`; user override MUST be supported.

## Delivery Workflow & Quality Gates

1. `spec.md` MUST define prioritized user stories, edge cases, and measurable outcomes.
2. `plan.md` MUST pass the Constitution Check before implementation begins.
3. `tasks.md` MUST include explicit tasks for receipts, retention, scheduler behavior,
   and observability when those concerns are touched.
4. Pull requests MUST include evidence that acceptance criteria were validated and that
   source-grounding constraints were not violated.
5. Releases that change integrations, retention behavior, or output schemas MUST include
   migration notes and operator runbook updates.

## Governance

This constitution supersedes conflicting local practices for specification, planning,
implementation, and release decisions.

Amendment policy:
- Amendments MUST be proposed in writing with rationale and impact analysis.
- Approval requires product + engineering owner review.
- Ratified amendments MUST include updates to affected templates and guidance files in the
  same change set when possible.

Versioning policy:
- MAJOR: backward-incompatible governance changes or principle removals/redefinitions.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: clarifications, wording improvements, non-semantic refinements.

Compliance review expectations:
- Each implementation plan MUST record pass/fail for every constitutional gate.
- Each feature task list MUST map implementation tasks back to affected principles.
- Non-compliance MUST be documented with explicit time-bound remediation tasks.

**Version**: 1.0.0 | **Ratified**: 2026-02-16 | **Last Amended**: 2026-02-16