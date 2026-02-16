import { Injectable } from "@nestjs/common";

@Injectable()
export class SuggestionConfirmationService {
  confirmAndEnablePrep(recurrenceKey: string): {
    recurrenceKey: string;
    prepEnabled: boolean;
  } {
    return {
      recurrenceKey,
      prepEnabled: true,
    };
  }
}
