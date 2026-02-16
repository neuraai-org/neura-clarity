import { test, expect } from "@playwright/test";

test("US1 onboarding flow", async ({ page }) => {
  await page.goto("/onboarding");
  await expect(page.getByRole("heading", { name: "Welcome to Weekly Clarity" })).toBeVisible();
  await expect(page.getByText("Complete setup in under 3 minutes.")).toBeVisible();
});
