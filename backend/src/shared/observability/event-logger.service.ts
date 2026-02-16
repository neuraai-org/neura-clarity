import { Injectable, Logger } from "@nestjs/common";

type EventPayload = {
  eventName: string;
  workspaceId: string;
  userId: string;
  properties?: Record<string, unknown>;
};

@Injectable()
export class EventLoggerService {
  private readonly logger = new Logger(EventLoggerService.name);

  logEvent(payload: EventPayload): void {
    this.logger.log(
      JSON.stringify({
        type: "analytics_event",
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    );
  }
}
