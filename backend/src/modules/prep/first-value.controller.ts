import { Body, Controller, Post } from "@nestjs/common";

type FirstValueRequest = {
  recurrenceKey: string;
};

@Controller("prep")
export class FirstValueController {
  @Post("first-value")
  generateFirstValue(@Body() body: FirstValueRequest): {
    status: "generated";
    recurrenceKey: string;
    generatedAt: string;
  } {
    return {
      status: "generated",
      recurrenceKey: body.recurrenceKey,
      generatedAt: new Date().toISOString(),
    };
  }
}
