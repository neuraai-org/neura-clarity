import { Controller, Get } from "@nestjs/common";

@Controller("analytics/dashboard")
export class DashboardController {
  @Get("funnel")
  getPilotFunnel(): {
    onboardingStarted: number;
    onboardingCompleted: number;
    prepOpened: number;
    weeklyOpened: number;
  } {
    return {
      onboardingStarted: 10,
      onboardingCompleted: 9,
      prepOpened: 8,
      weeklyOpened: 7,
    };
  }
}
