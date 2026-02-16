import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailWeeklyDeliveryService {
  deliverEmailDigest(recipient: string): {
    delivered: boolean;
    recipient: string;
    includesManagerUpdate: boolean;
    includesFollowUpDrafts: boolean;
  } {
    return {
      delivered: true,
      recipient,
      includesManagerUpdate: true,
      includesFollowUpDrafts: true,
    };
  }
}
