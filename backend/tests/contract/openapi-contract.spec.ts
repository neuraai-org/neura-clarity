import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("OpenAPI contract", () => {
  it("keeps contract file available for schema validation", async () => {
    const contractPath = new URL(
      "../../../specs/001-weekly-clarity-mvp/contracts/api.yaml",
      import.meta.url,
    );
    const contract = await readFile(contractPath, "utf8");
    expect(contract.length).toBeGreaterThan(0);
    expect(contract).toContain("openapi:");
  });
});
