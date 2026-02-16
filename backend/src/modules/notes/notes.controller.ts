import { Body, Controller, Post } from "@nestjs/common";

type CreateNoteDto = {
  source: "slack_dm" | "slack_thread" | "web";
  text: string;
  meetingEventId?: string;
};

@Controller("notes")
export class NotesController {
  @Post()
  createNote(@Body() body: CreateNoteDto): {
    id: string;
    source: CreateNoteDto["source"];
    text: string;
  } {
    return {
      id: "note-1",
      source: body.source,
      text: body.text,
    };
  }
}
