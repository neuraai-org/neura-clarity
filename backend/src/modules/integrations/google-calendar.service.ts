import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleCalendarService {
  buildConnectUrl(state: string): { auth_url: string } {
    return {
      auth_url: `https://accounts.google.com/o/oauth2/v2/auth?state=${encodeURIComponent(state)}`,
    };
  }

  handleCallback(code: string): { connected: boolean; provider: "google"; code: string } {
    return {
      connected: true,
      provider: "google",
      code,
    };
  }
}
