import { Injectable } from "@nestjs/common";

@Injectable()
export class WeeklyInputsService {
  compileInputs(): {
    meetings: number;
    notes: number;
    actions: number;
  } {
    return {
      meetings: 3,
      notes: 5,
      actions: 4,
    };
  }
}
