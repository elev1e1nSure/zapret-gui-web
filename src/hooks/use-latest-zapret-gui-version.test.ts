import { describe, expect, it } from "vitest";

import { releaseTagToSemverV } from "./use-latest-zapret-gui-version";

describe("releaseTagToSemverV", () => {
  it("нормализует v1.2.3", () => {
    expect(releaseTagToSemverV("v1.2.3")).toBe("v1.2.3");
  });

  it("добавляет patch для неполной версии", () => {
    expect(releaseTagToSemverV("1.2")).toBe("v1.2.0");
  });

  it("отбрасывает prerelease", () => {
    expect(releaseTagToSemverV("v2.0.0-beta.1")).toBe("v2.0.0");
  });

  it("отбрасывает build metadata", () => {
    expect(releaseTagToSemverV("1.0.0+build.1")).toBe("v1.0.0");
  });
});
