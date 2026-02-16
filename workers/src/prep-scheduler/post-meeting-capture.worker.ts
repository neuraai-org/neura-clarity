export type CapturePrompt = {
  recurrenceKey: string;
  sendAtIso: string;
};

export function schedulePostMeetingCapture(
  recurrenceKey: string,
  meetingEndIso: string,
): CapturePrompt {
  const sendAt = new Date(new Date(meetingEndIso).getTime() + 5 * 60 * 1000);
  return {
    recurrenceKey,
    sendAtIso: sendAt.toISOString(),
  };
}
