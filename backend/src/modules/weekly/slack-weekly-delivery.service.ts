import { Injectable } from "@nestjs/common";

@Injectable()
export class SlackWeeklyDeliveryService {
  deliver(summary: string, details: string[]): {
    conciseSummary: string;
    overflowCount: number;
    channel: "slack";
  } {
    const oneScreenBudget = 6;
    return {
      conciseSummary: summary,
      overflowCount: Math.max(0, details.length - oneScreenBudget),
      channel: "slack",
    };
  }
}
