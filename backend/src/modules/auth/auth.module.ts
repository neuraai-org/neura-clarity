import { Module } from "@nestjs/common";
import { ActionsController } from "../actions/actions.controller";
import { CommitmentsController } from "../actions/commitments.controller";
import { FollowupDraftsController } from "../actions/followup-drafts.controller";
import { DashboardController } from "../analytics/dashboard.controller";
import { ActivationEventsService } from "../analytics/activation-events.service";
import { AuthController } from "./auth.controller";
import { SettingsController } from "./settings.controller";
import { IntegrationsController } from "../integrations/integrations.controller";
import { GoogleCalendarService } from "../integrations/google-calendar.service";
import { MicrosoftCalendarService } from "../integrations/microsoft-calendar.service";
import { SlackIntegrationService } from "../integrations/slack-integration.service";
import { MeetingsController } from "../meetings/meetings.controller";
import { PrepConfigController } from "../meetings/prep-config.controller";
import { NotesController } from "../notes/notes.controller";
import { DeleteAccountController } from "../privacy/delete-account.controller";
import { ExportController } from "../privacy/export.controller";
import { RetentionSettingsController } from "../privacy/retention-settings.controller";
import { FirstValueController } from "../prep/first-value.controller";
import { PrepController } from "../prep/prep.controller";
import { PrepPayloadService } from "../prep/prep-payload.service";
import { PrepSourceMapperService } from "../prep/prep-source-mapper.service";
import { SlackPrepDeliveryService } from "../prep/slack-prep-delivery.service";
import { SuggestionConfirmationService } from "../suggestions/suggestion-confirmation.service";
import { SuggestionEligibilityService } from "../suggestions/suggestion-eligibility.service";
import { SuggestionsController } from "../suggestions/suggestions.controller";
import { StakeholderScoringService } from "../suggestions/stakeholder-scoring.service";
import { WeeklyController } from "../weekly/weekly.controller";
import { DeliveryLogService } from "../weekly/delivery-log.service";
import { EmailWeeklyDeliveryService } from "../weekly/email-weekly-delivery.service";
import { SlackWeeklyDeliveryService } from "../weekly/slack-weekly-delivery.service";
import { WeeklyInputsService } from "../weekly/weekly-inputs.service";
import { WeeklyLlmService } from "../weekly/weekly-llm.service";
import { EventLoggerService } from "../../shared/observability/event-logger.service";
import { SourceReferenceService } from "../../shared/sources/source-reference.service";

@Module({
  controllers: [
    AuthController,
    IntegrationsController,
    SettingsController,
    MeetingsController,
    PrepConfigController,
    NotesController,
    PrepController,
    FirstValueController,
    WeeklyController,
    ActionsController,
    CommitmentsController,
    FollowupDraftsController,
    SuggestionsController,
    RetentionSettingsController,
    ExportController,
    DeleteAccountController,
    DashboardController,
  ],
  providers: [
    GoogleCalendarService,
    MicrosoftCalendarService,
    SlackIntegrationService,
    PrepPayloadService,
    PrepSourceMapperService,
    SlackPrepDeliveryService,
    WeeklyInputsService,
    WeeklyLlmService,
    SlackWeeklyDeliveryService,
    EmailWeeklyDeliveryService,
    StakeholderScoringService,
    SuggestionEligibilityService,
    SuggestionConfirmationService,
    ActivationEventsService,
    DeliveryLogService,
    EventLoggerService,
    SourceReferenceService,
  ],
  exports: [EventLoggerService],
})
export class AuthModule {}
