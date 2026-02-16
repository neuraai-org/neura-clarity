import { Injectable } from "@nestjs/common";

type WeeklyOutput = {
  summary: string;
  actions: string[];
  sourcesUsed: string[];
};

@Injectable()
export class WeeklyLlmService {
  generateWeekly(inputs: { meetings: number; notes: number; actions: number }): WeeklyOutput {
    return {
      summary: `You had ${inputs.meetings} meetings and ${inputs.notes} notes this week.`,
      actions: ["Close hiring loop", "Draft stakeholder update"],
      sourcesUsed: ["note:1", "meeting:rk-1"],
    };
  }
}
