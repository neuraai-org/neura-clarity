import { Injectable } from "@nestjs/common";

@Injectable()
export class SlackIntegrationService {
  buildConnectUrl(state: string): { auth_url: string } {
    return {
      auth_url: `https://slack.com/oauth/v2/authorize?state=${encodeURIComponent(state)}`,
    };
  }

  completeInstall(code: string): { connected: boolean; provider: "slack"; code: string } {
    return {
      connected: true,
      provider: "slack",
      code,
    };
  }
}
