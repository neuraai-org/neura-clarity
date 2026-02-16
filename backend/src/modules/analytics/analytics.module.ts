import { Module } from "@nestjs/common";
import { EventLoggerService } from "../../shared/observability/event-logger.service";

@Module({
  providers: [EventLoggerService],
  exports: [EventLoggerService],
})
export class AnalyticsModule {}
