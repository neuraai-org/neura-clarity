import { ALLOWED_RETENTION_DAYS, isValidRetentionDays } from "./retention-policy";

export type RetentionSweepResult = {
  retentionDays: number;
  deletedEntityCount: number;
};

export function runRetentionSweep(retentionDays: number): RetentionSweepResult {
  if (!isValidRetentionDays(retentionDays)) {
    throw new Error(`Invalid retention policy. Allowed values: ${ALLOWED_RETENTION_DAYS.join(", ")}`);
  }

  return {
    retentionDays,
    deletedEntityCount: 0,
  };
}
