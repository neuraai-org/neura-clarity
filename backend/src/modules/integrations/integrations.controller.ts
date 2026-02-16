import { Controller, Get, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { GoogleCalendarService } from "./google-calendar.service";
import { MicrosoftCalendarService } from "./microsoft-calendar.service";
import { SlackIntegrationService } from "./slack-integration.service";

@Controller("integrations")
export class IntegrationsController {
  constructor(
    private readonly googleCalendarService: GoogleCalendarService,
    private readonly microsoftCalendarService: MicrosoftCalendarService,
    private readonly slackIntegrationService: SlackIntegrationService,
  ) {}

  @Post("calendar/google/connect")
  connectGoogleCalendar(): { auth_url: string } {
    return this.googleCalendarService.buildConnectUrl("onboarding-google");
  }

  @Post("calendar/microsoft/connect")
  connectMicrosoftCalendar(): { auth_url: string } {
    return this.microsoftCalendarService.buildConnectUrl("onboarding-microsoft");
  }

  @Post("slack/connect")
  connectSlack(): { auth_url: string } {
    return this.slackIntegrationService.buildConnectUrl("onboarding-slack");
  }

  @Get("calendar/google/connect")
  redirectGoogleCalendar(@Res() response: Response): void {
    const { auth_url } = this.googleCalendarService.buildConnectUrl("onboarding-google");
    response.redirect(auth_url);
  }

  @Get("calendar/microsoft/connect")
  redirectMicrosoftCalendar(@Res() response: Response): void {
    const { auth_url } = this.microsoftCalendarService.buildConnectUrl("onboarding-microsoft");
    response.redirect(auth_url);
  }

  @Get("slack/connect")
  redirectSlack(@Res() response: Response): void {
    const { auth_url } = this.slackIntegrationService.buildConnectUrl("onboarding-slack");
    response.redirect(auth_url);
  }
}
