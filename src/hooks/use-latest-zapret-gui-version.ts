import { useEffect, useState } from "react";
import { z } from "zod";

import {
  ZAPRET_GUI_RELEASES_LATEST_FETCH_URL,
  ZAPRET_GUI_VERSION_FALLBACK_RAW,
} from "@/lib/site";

/** Минимальная схема ответа GET /releases/latest — только нужное поле, без «доверия» к произвольному JSON. */
const githubLatestReleaseSchema = z.object({
  tag_name: z.string().refine((s) => s.trim().length > 0, { message: "empty tag" }),
});

/** Приводит tag_name релиза к виду vMAJOR.MINOR.PATCH (три числовых сегмента). */
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
  const [label, setLabel] = useState("v…");
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
