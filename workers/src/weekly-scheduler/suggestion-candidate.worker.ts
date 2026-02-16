import type { CandidateMeeting } from "../../../backend/src/modules/suggestions/stakeholder-scoring.service";

export function pickTopSuggestionCandidates(candidates: CandidateMeeting[]): CandidateMeeting[] {
  return [...candidates]
    .sort((a, b) => b.attendeeCount - a.attendeeCount)
    .slice(0, 3);
}
