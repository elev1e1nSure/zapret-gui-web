import { describe, expect, it } from "vitest";

import { releaseTagToSemverV, semverVToTriple } from "./use-latest-zapret-gui-version";

describe("releaseTagToSemverV", () => {
  it("keeps semver patch triples", () => {
    expect(releaseTagToSemverV("v1.2.3")).toBe("v1.2.3");
  });

  it("pads missing patch with 0", () => {
    expect(releaseTagToSemverV("1.2")).toBe("v1.2.0");
  });

  it("drops prerelease suffixes", () => {
    expect(releaseTagToSemverV("v2.0.0-beta.1")).toBe("v2.0.0");
  });

  it("drops build metadata after +", () => {
    expect(releaseTagToSemverV("1.0.0+build.1")).toBe("v1.0.0");
  });
});

describe("semverVToTriple", () => {
  it("parses normalized semver strings", () => {
    expect(semverVToTriple("v1.2.3")).toEqual([1, 2, 3]);
    expect(semverVToTriple("V10.0.42")).toEqual([10, 0, 42]);
  });

  it("returns null for unsupported shapes", () => {
    expect(semverVToTriple("v—")).toBeNull();
    expect(semverVToTriple("invalid")).toBeNull();
    expect(semverVToTriple("v1.2")).toBeNull();
  });
});
