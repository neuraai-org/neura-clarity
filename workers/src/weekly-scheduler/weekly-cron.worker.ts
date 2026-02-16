export type WeeklyScheduleInput = {
  timezone: string;
  sendTimeLocal: string;
};

export function computeWeeklyRunKey(input: WeeklyScheduleInput): string {
  return `${input.timezone}:${input.sendTimeLocal}`;
}
