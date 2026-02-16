import { createHash } from "crypto";

export type IdempotencyInputs = {
  workspaceId: string;
  userId: string;
  scope: string;
  entityId?: string;
  dateBucket?: string;
};

export function buildIdempotencyKey(input: IdempotencyInputs): string {
  const base = [
    input.workspaceId,
    input.userId,
    input.scope,
    input.entityId ?? "none",
    input.dateBucket ?? "none",
  ].join(":");

  return createHash("sha256").update(base).digest("hex");
}
