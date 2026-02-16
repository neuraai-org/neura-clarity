import { Injectable } from "@nestjs/common";

@Injectable()
export class MicrosoftCalendarService {
  buildConnectUrl(state: string): { auth_url: string } {
    return {
      auth_url: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?state=${encodeURIComponent(state)}`,
    };
  }

  handleCallback(code: string): { connected: boolean; provider: "microsoft"; code: string } {
    return {
      connected: true,
      provider: "microsoft",
      code,
    };
  }
}
