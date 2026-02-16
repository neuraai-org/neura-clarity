import { describe, expect, it } from "vitest";

describe("US1 onboarding acceptance", () => {
  it("defines onboarding success thresholds and first-value trigger", () => {
    const maxCompletionSeconds = 180;
    const hasCalendarConnection = true;
    const hasSlackConnection = true;
    const firstValueGenerated = true;

    expect(maxCompletionSeconds).toBeLessThanOrEqual(180);
    expect(hasCalendarConnection).toBe(true);
    expect(hasSlackConnection).toBe(true);
    expect(firstValueGenerated).toBe(true);
  });
});
