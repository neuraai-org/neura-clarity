export const ALLOWED_RETENTION_DAYS = [30, 90, 365] as const;

export type RetentionDays = (typeof ALLOWED_RETENTION_DAYS)[number];

export function isValidRetentionDays(value: number): value is RetentionDays {
  return ALLOWED_RETENTION_DAYS.includes(value as RetentionDays);
}
