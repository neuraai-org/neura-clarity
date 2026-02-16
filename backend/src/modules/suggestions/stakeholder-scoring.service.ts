import { Injectable } from "@nestjs/common";

export type CandidateMeeting = {
  recurrenceKey: string;
  attendeeCount: number;
  hasDecisionSignals: boolean;
};

@Injectable()
export class StakeholderScoringService {
  scoreCandidate(meeting: CandidateMeeting): number {
    const attendeeFactor = Math.min(meeting.attendeeCount / 8, 1);
    const signalFactor = meeting.hasDecisionSignals ? 0.4 : 0;
    return Number((0.6 * attendeeFactor + signalFactor).toFixed(2));
  }
}
