import { Body, Controller, Get, Patch } from "@nestjs/common";

type UserSettings = {
  timezone: string;
  tone: "concise" | "neutral" | "warm";
  weeklySendTimeLocal: string;
  suggestionsEnabled: boolean;
};

const defaultSettings: UserSettings = {
  timezone: "Asia/Bangkok",
  tone: "neutral",
  weeklySendTimeLocal: "19:00",
  suggestionsEnabled: true,
};

@Controller("settings")
export class SettingsController {
  private settings = { ...defaultSettings };

  @Get()
  getSettings(): UserSettings {
    return this.settings;
  }

  @Patch()
  updateSettings(@Body() payload: Partial<UserSettings>): UserSettings {
    this.settings = {
      ...this.settings,
      ...payload,
    };
    return this.settings;
  }
}
