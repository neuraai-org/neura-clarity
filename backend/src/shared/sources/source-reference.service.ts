import { Injectable } from "@nestjs/common";

export type SourceReferenceInput = {
  sourceType: "meeting_description" | "note" | "calendar_metadata";
  sourceId: string;
  snippet: string;
  sourceTimestamp: string;
  meetingEventId?: string;
};

@Injectable()
export class SourceReferenceService {
  normalizeSource(input: SourceReferenceInput): SourceReferenceInput {
    return {
      ...input,
      snippet: input.snippet.trim(),
    };
  }
}
