import { useEffect, useState } from "react";
import { z } from "zod";

import {
  ZAPRET_GUI_RELEASES_LATEST_FETCH_URL,
  ZAPRET_GUI_VERSION_FALLBACK_RAW,
} from "@/lib/site";

/** Minimal `/releases/latest` payload — rejects unexpected JSON shapes. */
const githubLatestReleaseSchema = z.object({
  tag_name: z.string().refine((s) => s.trim().length > 0, { message: "empty tag" }),
});

/** Parses `vMAJOR.MINOR.PATCH` (as produced by `releaseTagToSemverV`) for UI transitions. */
export function semverVToTriple(version: string): [number, number, number] | null {
  const m = /^v(\d+)\.(\d+)\.(\d+)$/i.exec(version.trim());
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

/** Normalizes `tag_name` to `vMAJOR.MINOR.PATCH` (numeric segments only beyond semver core). */
export function releaseTagToSemverV(tagName: string): string {
  const cleaned = tagName.trim().replace(/^v/i, "");
  const core = (cleaned.split(/[-+]/)[0] ?? cleaned).trim();
  const segments = core.split(".").map((part) => {
    const m = /^(\d+)/.exec(part);
    return m ? parseInt(m[1], 10) : NaN;
  });
  const nums = segments.filter((n) => !Number.isNaN(n));
  const major = nums[0] ?? 0;
  const minor = nums[1] ?? 0;
  const patch = nums[2] ?? 0;
  return `v${major}.${minor}.${patch}`;
}

type Status = "loading" | "ready" | "error";

const fallbackLabel =
  ZAPRET_GUI_VERSION_FALLBACK_RAW.length > 0
    ? releaseTagToSemverV(ZAPRET_GUI_VERSION_FALLBACK_RAW)
    : null;

export function useLatestZapretGuiVersion(): { label: string; status: Status } {
  const [label, setLabel] = useState("v0.0.0");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const headers: HeadersInit =
          ZAPRET_GUI_RELEASES_LATEST_FETCH_URL.startsWith("http")
            ? {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              }
            : {};
        const res = await fetch(ZAPRET_GUI_RELEASES_LATEST_FETCH_URL, {
          signal: ac.signal,
          credentials: "omit",
          headers,
        });
        if (!res.ok) throw new Error(String(res.status));
        const json: unknown = await res.json();
        const parsed = githubLatestReleaseSchema.safeParse(json);
        if (!parsed.success) throw new Error("release shape");
        const tag = parsed.data.tag_name;
        if (!ac.signal.aborted) {
          setLabel(releaseTagToSemverV(tag));
          setStatus("ready");
        }
      } catch {
        if (!ac.signal.aborted) {
          if (fallbackLabel) {
            setLabel(fallbackLabel);
            setStatus("ready");
          } else {
            setLabel("v—");
            setStatus("error");
          }
        }
      }
    })();
    return () => ac.abort();
  }, []);

  return { label, status };
}
