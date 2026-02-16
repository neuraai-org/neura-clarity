import { Body, Controller, Param, Put } from "@nestjs/common";

type PrepConfigPayload = {
  enabled: boolean;
  type: "one_on_one" | "stakeholder";
};

@Controller("meetings")
export class PrepConfigController {
  @Put(":recurrenceKey/prep-config")
  updatePrepConfig(
    @Param("recurrenceKey") recurrenceKey: string,
    @Body() body: PrepConfigPayload,
  ): { recurrenceKey: string; enabled: boolean; type: "one_on_one" | "stakeholder" } {
    return {
      recurrenceKey,
      enabled: body.enabled,
      type: body.type,
    };
  }
}
