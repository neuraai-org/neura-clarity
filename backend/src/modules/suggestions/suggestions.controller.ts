import { Body, Controller, Param, Post } from "@nestjs/common";

type SuggestionAction = "confirm" | "snooze_30d" | "stop_suggesting";

@Controller("suggestions")
export class SuggestionsController {
  @Post(":id/respond")
  respond(
    @Param("id") id: string,
    @Body() body: { action: SuggestionAction },
  ): { id: string; action: SuggestionAction; updated: true } {
    return {
      id,
      action: body.action,
      updated: true,
    };
  }
}
