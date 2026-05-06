import { useEffect, useRef, useState } from "react";

import { semverVToTriple } from "@/hooks/use-latest-zapret-gui-version";
import { cn } from "@/lib/utils";

type Status = "loading" | "ready" | "error";
type Scratch = { maj: number; min: number; pat: number };

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ReleaseVersionTicker({
  label,
  status,
  className,
  title,
}: {
  label: string;
  status: Status;
  className?: string;
  /** `title` on the wrapping element when provided (e.g. error tooltip). */
  title?: string;
}) {
  const [phase, setPhase] = useState<"spin" | "settle" | "done">("spin");
  const [scratch, setScratch] = useState<Scratch>({ maj: 0, min: 0, pat: 0 });
  const scratchRef = useRef(scratch);
  scratchRef.current = scratch;

  const spinTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settleRafRef = useRef<number | null>(null);

  const stopSpin = () => {
    if (spinTimerRef.current !== null) {
      clearInterval(spinTimerRef.current);
      spinTimerRef.current = null;
    }
  };

  const stopSettle = () => {
    if (settleRafRef.current !== null) {
      cancelAnimationFrame(settleRafRef.current);
      settleRafRef.current = null;
    }
  };

  useEffect(() => {
    if (status !== "loading") return;
    setPhase("spin");
    stopSettle();
    spinTimerRef.current = window.setInterval(() => {
      setScratch({
        maj: Math.floor(Math.random() * 10),
        min: Math.floor(Math.random() * 10),
        pat: Math.floor(Math.random() * 10),
      });
    }, 72);
    return stopSpin;
  }, [status]);

  useEffect(() => {
    if (status !== "error") return;
    stopSpin();
    stopSettle();
    setPhase("done");
  }, [status]);

  useEffect(() => {
    if (status !== "ready") return;
    stopSpin();
    const target = semverVToTriple(label);
    if (!target) {
      setPhase("done");
      return;
    }

    setPhase("settle");
    const start = { ...scratchRef.current };
    const end: Scratch = { maj: target[0], min: target[1], pat: target[2] };
    const durationMs = 780;
    const t0 = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const e = easeOutCubic(t);
      setScratch({
        maj: Math.round(start.maj + (end.maj - start.maj) * e),
        min: Math.round(start.min + (end.min - start.min) * e),
        pat: Math.round(start.pat + (end.pat - start.pat) * e),
      });
      if (t < 1) {
        settleRafRef.current = requestAnimationFrame(step);
      } else {
        settleRafRef.current = null;
        setScratch(end);
        setPhase("done");
      }
    };
    settleRafRef.current = requestAnimationFrame(step);
    return stopSettle;
  }, [status, label]);

  const numericLabel =
    status === "error"
      ? label
      : phase === "done" && status === "ready"
        ? label
        : `v${scratch.maj}.${scratch.min}.${scratch.pat}`;

  return (
    <span
      className={cn(
        "inline-flex tabular-nums tracking-[inherit]",
        status === "loading" && "animate-pulse",
        className,
      )}
      title={title}
    >
      {numericLabel}
    </span>
  );
}
