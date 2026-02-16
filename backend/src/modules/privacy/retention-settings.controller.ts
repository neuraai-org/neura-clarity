import { Body, Controller, Patch } from "@nestjs/common";

type RetentionDays = 30 | 90 | 365;

@Controller("privacy")
export class RetentionSettingsController {
  @Patch("retention")
  updateRetention(@Body() body: { retentionDays: RetentionDays }): { retentionDays: RetentionDays } {
    return {
      retentionDays: body.retentionDays,
    };
  }
}
