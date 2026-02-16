import { Controller, Get } from "@nestjs/common";

type MeetingEvent = {
  id: string;
  recurrenceKey: string;
  title: string;
  attendeeCount: number;
  classification: "one_on_one" | "stakeholder_candidate" | "unknown";
};

@Controller("meetings")
export class MeetingsController {
  @Get()
  listMeetings(): { items: MeetingEvent[] } {
    return {
      items: [
        {
          id: "meeting-1",
          recurrenceKey: "rk-1",
          title: "1:1 with Priya",
          attendeeCount: 2,
          classification: "one_on_one",
        },
      ],
    };
  }
}
