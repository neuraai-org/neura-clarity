import { Injectable } from "@nestjs/common";

@Injectable()
export class SlackPrepDeliveryService {
  renderAndSend(userSlackId: string, message: string): {
    channel: "slack";
    delivered: boolean;
    userSlackId: string;
  } {
    return {
      channel: "slack",
      delivered: true,
      userSlackId,
    };
  }
}
