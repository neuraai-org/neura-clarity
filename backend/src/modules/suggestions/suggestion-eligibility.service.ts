import { Injectable } from "@nestjs/common";

type EligibilityInput = {
  activated: boolean;
  sentSuggestionCountThisWeek: number;
  suggestionsEnabled: boolean;
};

@Injectable()
export class SuggestionEligibilityService {
  canSendSuggestion(input: EligibilityInput): boolean {
    if (!input.activated || !input.suggestionsEnabled) {
      return false;
    }

    return input.sentSuggestionCountThisWeek < 1;
  }
}
