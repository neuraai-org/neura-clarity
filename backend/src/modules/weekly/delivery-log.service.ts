import { Injectable } from "@nestjs/common";
import { buildIdempotencyKey } from "../../shared/idempotency/idempotency-key";

@Injectable()
export class DeliveryLogService {
  createDeliveryKey(workspaceId: string, userId: string, scope: string, entityId: string): string {
    return buildIdempotencyKey({
      workspaceId,
      userId,
      scope,
      entityId,
      dateBucket: new Date().toISOString().slice(0, 10),
    });
  }
}
