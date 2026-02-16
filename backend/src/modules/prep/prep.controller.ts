import { Controller, Post } from "@nestjs/common";
import { PrepPayloadService } from "./prep-payload.service";

@Controller("prep")
export class PrepController {
  constructor(private readonly prepPayloadService: PrepPayloadService) {}

  @Post("next")
  generateNextPrep(): {
    meetingRecurrenceKey: string;
    sections: Array<{ title: string; bullets: string[] }>;
  } {
    const payload = this.prepPayloadService.buildPayload();
    return {
      meetingRecurrenceKey: "rk-1",
      sections: payload.sections,
    };
  }
}
