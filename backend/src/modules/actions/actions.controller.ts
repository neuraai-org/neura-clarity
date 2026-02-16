import { Body, Controller, Param, Patch } from "@nestjs/common";

type ActionStatus = "open" | "done" | "snoozed";

@Controller("actions")
export class ActionsController {
  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: { status: ActionStatus; snoozedUntil?: string },
  ): { id: string; status: ActionStatus; snoozedUntil?: string } {
    return {
      id,
      status: body.status,
      snoozedUntil: body.snoozedUntil,
    };
  }
}
