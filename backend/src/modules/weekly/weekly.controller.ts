import { Controller, Post } from "@nestjs/common";
import { WeeklyInputsService } from "./weekly-inputs.service";
import { WeeklyLlmService } from "./weekly-llm.service";

@Controller("weekly")
export class WeeklyController {
  constructor(
    private readonly weeklyInputsService: WeeklyInputsService,
    private readonly weeklyLlmService: WeeklyLlmService,
  ) {}

  @Post("generate")
  generateNow(): { summary: string; actions: string[]; sourcesUsed: string[] } {
    const inputs = this.weeklyInputsService.compileInputs();
    return this.weeklyLlmService.generateWeekly(inputs);
  }
}
