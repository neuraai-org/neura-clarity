# Feature Specification: Manager Weekly Clarity MVP

**Feature Branch**: `[001-weekly-clarity-mvp]`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "MVP for manager weekly clarity with onboarding, meeting prep, notes capture, weekly digest, stakeholder suggestions, and privacy controls"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Activate quickly and receive first value (Priority: P1)

A people manager signs up, connects calendar and Slack, confirms prep meetings, and receives first value immediately without manually pasting historical notes.

**Why this priority**: Without fast activation and immediate value, there is no repeat usage.

**Independent Test**: A new user completes onboarding and gets a generated "this week at a glance" plus prep for the next relevant meeting in under 3 minutes.

**Acceptance Scenarios**:

1. **Given** a new user account, **When** the user connects calendar and Slack and saves defaults, **Then** onboarding completes in under 3 minutes.
2. **Given** onboarding is complete, **When** the user reaches the meeting setup step, **Then** the system auto-detects likely 1:1 meetings and shows stakeholder candidates for confirmation.
3. **Given** onboarding is complete, **When** first value is requested, **Then** the system generates a next-meeting prep and a weekly-at-a-glance view without requiring pasted notes.

---

### User Story 2 - Receive actionable meeting prep and capture notes easily (Priority: P1)

A manager receives prep before enabled meetings and can quickly capture messy notes in Slack or web without strict formatting.

**Why this priority**: Meeting prep and capture loops drive continuous engagement and produce high-value context for weekly clarity.

**Independent Test**: For an enabled meeting, prep is delivered before the meeting, shows sources, and user replies with unstructured notes that are stored and associated where possible.

**Acceptance Scenarios**:

1. **Given** an upcoming enabled meeting, **When** it enters the prep window, **Then** prep is delivered with context bullets, open loops, suggested agenda, questions, and source references.
2. **Given** no prior notes exist, **When** prep is generated, **Then** prep uses meeting agenda and metadata as source inputs.
3. **Given** a user sends unstructured text to the bot or web inbox, **When** the note is submitted, **Then** it is stored with timestamp and optional meeting association.
4. **Given** a prep-enabled meeting ends, **When** 5 minutes pass, **Then** the user receives a capture prompt and can reply in thread.

---

### User Story 3 - Get weekly clarity summary and follow-through actions (Priority: P1)

A manager receives a concise weekly summary on schedule, with receipts for claims, and can execute follow-up actions directly.

**Why this priority**: Weekly clarity is the core recurring value and retention driver.

**Independent Test**: At configured weekly time, user receives digest in Slack and email with required sections, actionable controls, and traceable sources.

**Acceptance Scenarios**:

1. **Given** weekly schedule is set, **When** scheduled time occurs in the user's timezone, **Then** weekly clarity is delivered in Slack and email.
2. **Given** weekly clarity is generated, **When** the user reviews sections, **Then** output includes top priorities, wins, risks/stuck with next step, people attention, and grouped next actions (max 10).
3. **Given** any action/decision/risk/people signal appears in output, **When** shown to the user, **Then** each includes a receipt snippet, timestamp, and source meeting/note link.
4. **Given** the user clicks action controls, **When** "Mark done" or "Draft follow-ups" is used, **Then** state updates and downstream summaries reflect the change.

---

### User Story 4 - Confirm stakeholder meetings with low-noise suggestions (Priority: P2)

A manager receives limited, relevant stakeholder suggestions and can confirm, snooze, or disable suggestions.

**Why this priority**: Confirmed stakeholder syncs extend prep coverage beyond 1:1s while avoiding spam.

**Independent Test**: After user activation, user receives no more than one suggestion DM per week and confirmed suggestions immediately become prep-enabled.

**Acceptance Scenarios**:

1. **Given** user has activated at least once, **When** weekly suggestion logic runs, **Then** at most one suggestion DM is sent in that week.
2. **Given** a suggestion is received, **When** user selects "Confirm", **Then** that meeting becomes prep-enabled immediately.
3. **Given** a suggestion is received, **When** user selects "Not now", **Then** it is snoozed for 30 days.
4. **Given** a suggestion is received, **When** user selects "Stop suggesting", **Then** future suggestions are disabled.

---

### User Story 5 - Trust controls for privacy, retention, export, and deletion (Priority: P1)

A manager can verify the product does not train on their data, can choose retention duration, and can export/delete data.

**Why this priority**: Trust and control are non-negotiable for paid pilot adoption.

**Independent Test**: User can configure retention period, export full data, and delete account; data handling aligns with configured policy.

**Acceptance Scenarios**:

1. **Given** onboarding/settings pages, **When** user reviews privacy statements, **Then** clear copy states that user data is not used for model training.
2. **Given** retention settings, **When** user selects 30, 90, or 365 days, **Then** future and existing eligible records honor that policy.
3. **Given** export request, **When** export completes, **Then** user receives machine-readable export containing user-provided and derived records.
4. **Given** delete account request, **When** deletion is confirmed, **Then** user data is removed and account access is revoked.

### Edge Cases

- User connects calendar but denies required read scope; onboarding must explain the missing permission and allow retry.
- User has no upcoming prep-enabled meetings; first value must still produce a weekly-at-a-glance summary.
- User has overlapping prep-enabled meetings in the same prep window; system must send separate prep cards with clear meeting labels.
- User pastes very large or messy notes (mixed bullets, paragraphs, timestamps); note must still be accepted without forced structure.
- Meeting has no description/agenda and no prior notes; prep must still render using available metadata and explicitly indicate limited context.
- Slack delivery fails temporarily; message must retry and preserve idempotency.
- Weekly output exceeds one-screen target; overflow content must stay accessible via explicit expansion.
- Suggested commitments without explicit confirmation must remain in "suggested" state and not be treated as confirmed commitments.
- User disables suggestions; existing snoozed suggestions must not reactivate suggestions automatically.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create and access accounts using either email/password or magic link.
- **FR-002**: System MUST allow each user to connect at least one supported calendar account and one Slack workspace before activation is complete.
- **FR-003**: System MUST provide default settings for tone and weekly send time, with default send time of Sunday 7:00 PM in Asia/Bangkok.
- **FR-004**: System MUST allow users to update timezone, weekly send time, tone, and retention duration at any time.
- **FR-005**: System MUST auto-detect likely 1:1 meetings from calendar patterns and allow users to enable or disable prep per meeting pattern.
- **FR-006**: System MUST identify stakeholder meeting candidates, surface top suggestions to users, and require explicit user confirmation before prep is enabled.
- **FR-007**: System MUST limit stakeholder suggestion outreach to no more than one suggestion DM per user per week.
- **FR-008**: System MUST only send stakeholder suggestions after a user has shown activation behavior (for example, viewing prep or generating weekly clarity).
- **FR-009**: System MUST allow users to snooze a suggestion for 30 days or disable future suggestions.
- **FR-010**: System MUST generate and deliver meeting prep before each prep-enabled meeting.
- **FR-011**: Meeting prep MUST include context bullets (maximum 4), open loops (maximum 5) with receipts, suggested agenda (maximum 5), and questions (maximum 3).
- **FR-012**: Meeting prep MUST always display sources used.
- **FR-013**: If no prior notes exist for a meeting, prep MUST use meeting agenda and metadata as source inputs.
- **FR-014**: System MUST support note capture via Slack DM, Slack meeting thread reply after capture prompt, and web inbox append entry.
- **FR-015**: System MUST store each note with timestamp and optional meeting association, and MUST accept unstructured text.
- **FR-016**: System MUST send a post-meeting capture prompt shortly after prep-enabled meetings end.
- **FR-017**: System MUST generate weekly clarity at the user's configured schedule and allow on-demand generation.
- **FR-018**: Weekly clarity MUST include fixed sections: top 3 priorities (outcomes), wins, risks/stuck with suggested next step, people attention, and grouped next actions (maximum 10 total).
- **FR-019**: Weekly clarity in Slack MUST remain concise for a single-screen primary view and provide explicit expansion for overflow.
- **FR-020**: Weekly clarity email MUST mirror Slack summary and include a manager update draft plus follow-up drafts.
- **FR-021**: System MUST provide action controls in weekly and prep surfaces, including mark done and follow-up drafting flows.
- **FR-022**: Any action, decision, risk, or people signal shown to users MUST include a receipt snippet, timestamp, and source link.
- **FR-023**: Any detected promise or commitment MUST remain suggested until explicitly confirmed by the user.
- **FR-024**: System MUST state and honor a "never train on your data" commitment in product-visible copy.
- **FR-025**: System MUST allow users to select retention duration from 30, 90, or 365 days and enforce expiration accordingly.
- **FR-026**: System MUST provide user-initiated export of user-provided and derived data in machine-readable format.
- **FR-027**: System MUST provide user-initiated account deletion that removes retained data and disables access.
- **FR-028**: System MUST keep a history view of past weekly outputs and past meeting prep outputs.
- **FR-029**: System MUST track key activation and engagement events needed to measure activation, usage, and follow-through outcomes.

### Key Entities *(include if feature involves data)*

- **User**: Individual manager profile with timezone, tone preference, weekly send time, and retention selection.
- **Workspace**: Team/workspace context for Slack connection and shared policy settings.
- **Calendar Connection**: User-authorized calendar account connection and sync status.
- **Slack Connection**: Workspace install connection and mapping between workspace and user messaging identity.
- **Meeting Event**: Normalized meeting record (title, time range, participants, recurrence key, description metadata).
- **Note**: Unstructured user-captured text with timestamp, source channel, and optional meeting link.
- **Prep Configuration**: User-controlled enablement for meetings that should receive prep.
- **Suggestion**: Stakeholder candidate recommendation with score and lifecycle state (pending, confirmed, snoozed, disabled).
- **Generated Output**: Structured prep or weekly clarity payload plus references to used sources.
- **Action Item**: Suggested or confirmed task with owner, state, due suggestion, and source reference.
- **Commitment Candidate**: Potential promise/commitment extracted from inputs, pending user confirmation.

### Assumptions & Dependencies

- Pilot users are people managers operating primarily in Slack.
- Calendar and Slack providers are available and accessible in the pilot region.
- Users can connect at least one calendar account and one Slack workspace during onboarding.
- Email delivery is enabled for users who opt in to digest notifications.
- Receipts reference source snippets that users already have permission to view.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 80% of new pilot users complete onboarding and first-value generation in under 3 minutes.
- **SC-002**: At least 90% of prep-enabled meetings receive prep before meeting start.
- **SC-003**: At least 70% of active users generate or receive weekly clarity at least once per week for 4 consecutive weeks.
- **SC-004**: At least 80% of weekly outputs include receipts for all displayed actions, decisions, risks, and people signals.
- **SC-005**: Slack weekly clarity primary view remains readable in approximately one screen for at least 90% of outputs.
- **SC-006**: At least 60% of users who receive stakeholder suggestions take a confirm/snooze/disable action within 7 days.
- **SC-007**: 100% of commitment candidates remain unconfirmed until explicit user confirmation.
- **SC-008**: 100% of tested retention, export, and deletion requests complete according to selected policy.
