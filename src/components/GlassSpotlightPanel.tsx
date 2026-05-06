import { useReducedMotion } from "framer-motion";
import { type PointerEvent, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Неактивная плашка в режиме сетки — стабильная ссылка, без лишних эффектов. */
export const GLASS_GRID_SPOT_OFF = { mode: "off" } as const;

export type GlassGridSpot =
  | typeof GLASS_GRID_SPOT_OFF
  | { mode: "on"; spot: { x: number; y: number } };

type GlassSpotlightPanelProps = {
  className?: string;
  children: ReactNode;
  /**
   * Подсветка от родителя (полная область grid/flex вкл. зазоры).
   * В промежутке между карточками `mode:'off'` — свет ни на что не цепляется.
   */
  gridSpot?: GlassGridSpot;
};

/** Плавность следования */
const LERP = 0.085;
const SNAP_PX = 0.65;
const REST_EPS = 0.35;
const GLOW_LEAVE_MS = 220;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Стеклянная пластина с едва заметным «бликом» по указателю.
 * По умолчанию — сам ловит pointer; если передан gridSpot — только он.
 */
export function GlassSpotlightPanel({ className, children, gridSpot }: GlassSpotlightPanelProps) {
  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  const delegated = gridSpot !== undefined;
  const rootRef = useRef<HTMLDivElement>(null);

  const targetSpot = useRef({ x: 0, y: 0 });
  const smoothedSpot = useRef({ x: 0, y: 0 });
  const pendingSpot = useRef<{ x: number; y: number } | null>(null);

  const rafRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [glowOn, setGlowOn] = useState(false);

  const stopLeaveTimer = () => {
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const stopRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const scheduleFrame = () => {
    if (rafRef.current !== null) return;
    if (reduceMotionRef.current) return;

    const frame = () => {
      rafRef.current = null;
      const el = rootRef.current;
      if (!el || reduceMotionRef.current) return;

      if (pendingSpot.current) {
        targetSpot.current = pendingSpot.current;
        pendingSpot.current = null;
      }

      const ts = targetSpot.current;
      const ss = smoothedSpot.current;

      let nx = lerp(ss.x, ts.x, LERP);
      let ny = lerp(ss.y, ts.y, LERP);
      if (Math.abs(ts.x - nx) < SNAP_PX) nx = ts.x;
      if (Math.abs(ts.y - ny) < SNAP_PX) ny = ts.y;

      smoothedSpot.current = { x: nx, y: ny };
      el.style.setProperty("--spot-x", `${nx}px`);
      el.style.setProperty("--spot-y", `${ny}px`);

      const err = Math.hypot(ts.x - nx, ts.y - ny);
      const hasMorePending = pendingSpot.current !== null;
      const stillBusy = err > REST_EPS || hasMorePending;
      if (stillBusy) {
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  const spotMode = gridSpot?.mode ?? "off";
  const spotXIn = spotMode === "on" && gridSpot && gridSpot.mode === "on" ? gridSpot.spot.x : 0;
  const spotYIn = spotMode === "on" && gridSpot && gridSpot.mode === "on" ? gridSpot.spot.y : 0;

  /* Режим сетки: только данные из родителя (зазоры = ни одна плашка не активна) */
  useLayoutEffect(() => {
    if (!delegated || gridSpot === undefined) return;

    stopLeaveTimer();
    const el = rootRef.current;

    if (reduceMotionRef.current) {
      if (gridSpot.mode === "off") {
        setGlowOn(false);
        return;
      }
      setGlowOn(true);
      if (el) {
        el.style.setProperty("--spot-x", `${gridSpot.spot.x}px`);
        el.style.setProperty("--spot-y", `${gridSpot.spot.y}px`);
      }
      return;
    }

    if (gridSpot.mode === "off") {
      pendingSpot.current = null;
      setGlowOn(false);
      return;
    }

    setGlowOn(true);
    pendingSpot.current = gridSpot.spot;
    scheduleFrame();
  }, [delegated, spotMode, spotXIn, spotYIn]);

  /* Сам режим pointer */
  const onPointerEnter = () => {
    if (delegated) return;
    stopLeaveTimer();
    setGlowOn(true);

    const el = rootRef.current;
    if (el && !reduceMotionRef.current) {
      const r = el.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      smoothedSpot.current = { x: cx, y: cy };
      targetSpot.current = { x: cx, y: cy };
      pendingSpot.current = null;
      el.style.setProperty("--spot-x", `${cx}px`);
      el.style.setProperty("--spot-y", `${cy}px`);
    }
    scheduleFrame();
  };

  const onPointerLeave = () => {
    if (delegated) return;
    stopLeaveTimer();
    pendingSpot.current = null;

    leaveTimerRef.current = setTimeout(() => {
      setGlowOn(false);
      leaveTimerRef.current = null;

      const el = rootRef.current;
      if (el && !reduceMotionRef.current) {
        const r = el.getBoundingClientRect();
        targetSpot.current = { x: r.width / 2, y: r.height / 2 };
        scheduleFrame();
      }
    }, GLOW_LEAVE_MS);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (delegated) return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    if (reduceMotionRef.current) {
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
      return;
    }

    pendingSpot.current = { x, y };
    scheduleFrame();
  };

  useEffect(() => {
    return () => {
      stopLeaveTimer();
      stopRaf();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-glass-spotlight={delegated ? "grid-cell" : "solo"}
      onPointerEnter={delegated ? undefined : onPointerEnter}
      onPointerMove={delegated ? undefined : onPointerMove}
      onPointerLeave={delegated ? undefined : onPointerLeave}
      className={cn(
        "group/spot glass-spotlight-panel relative isolate overflow-hidden rounded-2xl",
        "border bg-[hsl(var(--card)_/_0.38)] backdrop-blur-[22px]",
        glowOn ? "border-border/[0.52] shadow-[0_22px_48px_-44px_hsl(220_32%_4%_/_0.52)]" : "border-border/45",
        "shadow-[inset_0_1px_0_0_hsl(var(--foreground)_/_0.05)]",
        "motion-safe:transition-[border-color,box-shadow] motion-safe:duration-700 motion-safe:ease-out",
        !delegated &&
          !glowOn &&
          "pointer-coarse:hover:border-border/48 motion-safe:hover:border-border/[0.52] motion-safe:hover:shadow-[0_22px_48px_-44px_hsl(220_32%_4%_/_0.52)]",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "glass-spotlight-glow pointer-events-none absolute inset-0",
          glowOn ? "glass-spotlight-glow--on" : "glass-spotlight-glow--off",
        )}
        style={{
          background:
            "radial-gradient(640px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--foreground) / 0.034) 0%, hsl(var(--foreground) / 0.009) 38%, transparent 66%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.065] to-transparent"
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
