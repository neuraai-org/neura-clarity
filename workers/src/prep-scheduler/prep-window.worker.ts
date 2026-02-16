export type UpcomingMeeting = {
  recurrenceKey: string;
  startAtIso: string;
  prepEnabled: boolean;
};

export function scanPrepWindow(meetings: UpcomingMeeting[]): UpcomingMeeting[] {
  return meetings.filter((meeting) => meeting.prepEnabled);
}
