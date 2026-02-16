import { Injectable } from "@nestjs/common";
import { EventLoggerService } from "../../shared/observability/event-logger.service";

@Injectable()
export class ActivationEventsService {
  constructor(private readonly eventLoggerService: EventLoggerService) {}

  onboardingCompleted(workspaceId: string, userId: string, completionSeconds: number): void {
    this.eventLoggerService.logEvent({
      eventName: "onboarding_completed",
      workspaceId,
      userId,
      properties: {
        completionSeconds,
      },
    });
  }
}
