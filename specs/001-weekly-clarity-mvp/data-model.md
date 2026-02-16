# Data Model: Manager Weekly Clarity MVP

## Tenancy Model

- All domain records are scoped by `workspace_id` and/or `user_id`.
- Access controls enforce user ownership within workspace boundaries.

## Entities

### 1) User
- **Purpose**: Manager account and personalization.
- **Fields**:
  - `id` (UUID)
  - `workspace_id` (UUID)
  - `email` (string, unique per workspace)
  - `timezone` (string, default `Asia/Bangkok`)
  - `tone` (enum: concise, neutral, warm)
  - `weekly_send_time_local` (time)
  - `retention_days` (enum: 30, 90, 365)
  - `suggestions_enabled` (boolean)
  - `activated_at` (timestamp, nullable)
  - `created_at`, `updated_at` (timestamp)
- **Rules**:
  - `retention_days` must be one of 30/90/365.
  - `activated_at` set after first prep view or weekly generation.

### 2) Workspace
- **Purpose**: Tenant boundary and policy container.
- **Fields**:
  - `id` (UUID)
  - `name` (string)
  - `slack_team_id` (string, unique)
  - `data_training_disabled` (boolean, always true)
  - `created_at`, `updated_at` (timestamp)

### 3) CalendarConnection
- **Purpose**: Provider auth and sync state.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `provider` (enum: google, microsoft)
  - `provider_account_id` (string)
  - `scopes` (string[])
  - `access_token_encrypted` (string)
  - `refresh_token_encrypted` (string)
  - `token_expires_at` (timestamp)
  - `sync_cursor` (string, nullable)
  - `last_sync_at` (timestamp, nullable)
  - `created_at`, `updated_at` (timestamp)
- **Rules**:
  - At least one active calendar connection needed for activation.

### 4) SlackConnection
- **Purpose**: Slack installation and user mapping.
- **Fields**:
  - `id` (UUID)
  - `workspace_id` (UUID)
  - `team_id` (string)
  - `bot_token_encrypted` (string)
  - `bot_user_id` (string)
  - `installer_user_id` (UUID)
  - `created_at`, `updated_at` (timestamp)

### 5) MeetingEvent
- **Purpose**: Normalized meeting facts for prep/suggestion/classification.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `provider` (enum: google, microsoft)
  - `provider_event_id` (string)
  - `recurrence_key` (string)
  - `title` (string)
  - `description` (text, nullable)
  - `start_at`, `end_at` (timestamp)
  - `attendees` (json array of objects)
  - `is_recurring` (boolean)
  - `classification` (enum: unknown, one_on_one, stakeholder_candidate, stakeholder_confirmed)
  - `created_at`, `updated_at` (timestamp)
- **Rules**:
  - (`provider`, `provider_event_id`, `user_id`) unique.
  - `recurrence_key` stable across occurrences.

### 6) PrepConfig
- **Purpose**: Per-meeting prep enablement.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `meeting_recurrence_key` (string)
  - `type` (enum: one_on_one, stakeholder)
  - `enabled` (boolean)
  - `created_at`, `updated_at` (timestamp)
- **Rules**:
  - Unique (`user_id`, `meeting_recurrence_key`).

### 7) Note
- **Purpose**: User-captured unstructured inputs.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `source` (enum: slack_dm, slack_thread, web)
  - `text` (text)
  - `meeting_event_id` (UUID, nullable)
  - `thread_ts` (string, nullable)
  - `created_at` (timestamp)
- **Rules**:
  - Must accept arbitrary text payload.

### 8) Suggestion
- **Purpose**: Stakeholder candidate recommendation lifecycle.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `meeting_recurrence_key` (string)
  - `stakeholder_label` (string)
  - `score` (decimal)
  - `status` (enum: pending, confirmed, snoozed, dismissed, disabled)
  - `snoozed_until` (timestamp, nullable)
  - `sent_at` (timestamp, nullable)
  - `created_at`, `updated_at` (timestamp)
- **Rules**:
  - At most one suggestion DM send/week/user.

### 9) LLMOutput
- **Purpose**: Renderable structured prep/weekly payloads with source map.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `type` (enum: prep, weekly)
  - `meeting_event_id` (UUID, nullable for weekly)
  - `payload_json` (json)
  - `sources_used` (json array)
  - `generated_at` (timestamp)
- **Rules**:
  - `payload_json` must validate against schema by `type`.

### 10) SourceReference
- **Purpose**: Canonical receipt references linked to derived artifacts.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `source_type` (enum: meeting_description, note, calendar_metadata)
  - `source_id` (string)
  - `snippet` (text)
  - `source_timestamp` (timestamp)
  - `meeting_event_id` (UUID, nullable)
  - `created_at` (timestamp)

### 11) ActionItem
- **Purpose**: Open loops and follow-through tracking.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `text` (string)
  - `owner` (string, default self)
  - `status` (enum: open, done, snoozed)
  - `due_suggested_at` (timestamp, nullable)
  - `snoozed_until` (timestamp, nullable)
  - `source_reference_id` (UUID)
  - `created_from_output_id` (UUID, nullable)
  - `created_at`, `updated_at` (timestamp)

### 12) CommitmentCandidate
- **Purpose**: Candidate commitments requiring explicit confirmation.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `text` (string)
  - `source_reference_id` (UUID)
  - `status` (enum: suggested, confirmed)
  - `confirmed_at` (timestamp, nullable)
  - `created_at`, `updated_at` (timestamp)

### 13) DeliveryLog
- **Purpose**: Trace Slack/email sends and retries.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `channel` (enum: slack, email)
  - `delivery_type` (enum: prep, weekly, suggestion, reminder)
  - `idempotency_key` (string)
  - `status` (enum: queued, sent, failed, retried)
  - `attempt_count` (int)
  - `last_error` (text, nullable)
  - `sent_at` (timestamp, nullable)
  - `created_at`, `updated_at` (timestamp)

### 14) AnalyticsEvent
- **Purpose**: Product telemetry.
- **Fields**:
  - `id` (UUID)
  - `workspace_id`, `user_id` (UUID)
  - `event_name` (enum: calendar_connected, slack_connected, prep_sent, prep_opened, note_created, weekly_generated, weekly_opened, meeting_suggestion_sent, meeting_confirmed, action_created, action_completed)
  - `event_properties` (json)
  - `occurred_at` (timestamp)

## Relationships

- `Workspace` 1—N `User`
- `User` 1—N `CalendarConnection`, `MeetingEvent`, `Note`, `PrepConfig`, `Suggestion`, `LLMOutput`, `ActionItem`, `CommitmentCandidate`
- `MeetingEvent` 1—N `Note` (optional link)
- `LLMOutput` 1—N `ActionItem` (optional derived link)
- `SourceReference` 1—N `ActionItem` and 1—N `CommitmentCandidate`

## State Transitions

### Suggestion.status
`pending` → `confirmed` | `snoozed` | `dismissed`  
`snoozed` → `pending` (when `snoozed_until` elapsed and suggestions enabled)

### ActionItem.status
`open` → `done` | `snoozed`  
`snoozed` → `open` (when reminder window reached)

### CommitmentCandidate.status
`suggested` → `confirmed` only via explicit user action

## Retention and Deletion

- Retention worker deletes `Note`, `LLMOutput`, `SourceReference`, `ActionItem`, `CommitmentCandidate`, and `DeliveryLog` records older than policy window unless required for active legal/compliance holds (none in MVP).
- Account deletion cascades all user-scoped records and invalidates integration tokens.
- Export includes user content and derived entities with source references.
