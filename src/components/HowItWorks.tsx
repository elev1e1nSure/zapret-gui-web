import { motion, useScroll, useTransform } from "framer-motion";
import { type PointerEvent as ReactPointerEvent, useCallback, useRef, useState } from "react";
import { GlassSpotlightPanel, GLASS_GRID_SPOT_OFF } from "@/components/GlassSpotlightPanel";
import { howSectionCopy } from "@/content/site-copy";
import { motionEase } from "@/lib/motion";

const steps = howSectionCopy.steps.map((s) => ({
  n: s.number,
  t: s.title,
  d: s.description,
}));

export const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowHit, setRowHit] = useState<{ idx: number; x: number; y: number } | null>(null);

  const bindStepRef = useCallback((index: number) => (node: HTMLDivElement | null) => {
    stepRefs.current[index] = node;
  }, []);

  const handleRowPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    let hit: { idx: number; x: number; y: number } | null = null;
    for (let i = 0; i < steps.length; i++) {
      const node = stepRefs.current[i];
      if (!node) continue;
      const r = node.getBoundingClientRect();
      if (
        e.clientX >= r.left &&
        e.clientX < r.right &&
        e.clientY >= r.top &&
        e.clientY < r.bottom
      ) {
        hit = { idx: i, x: e.clientX - r.left, y: e.clientY - r.top };
        break;
      }
    }
    setRowHit(hit);
  }, []);

  const handleRowPointerLeave = useCallback(() => {
    setRowHit(null);
  }, []);

  return (
    <section ref={ref} id="how" className="container mx-auto px-6 py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: motionEase }}
        className="max-w-2xl mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-soft mb-5">{howSectionCopy.kicker}</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">{howSectionCopy.title}</h2>
      </motion.div>

      <div
        className="flex flex-col gap-3 md:flex-row md:items-start md:gap-2"
        onPointerMove={handleRowPointerMove}
        onPointerLeave={handleRowPointerLeave}
      >
        {steps.flatMap((s, i) => {
          const card = (
            <motion.div
              ref={bindStepRef(i)}
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: motionEase, delay: i * 0.12 }}
              className="min-w-0 cursor-default md:flex-1"
            >
              <GlassSpotlightPanel
                gridSpot={
                  rowHit?.idx === i ? { mode: "on", spot: { x: rowHit.x, y: rowHit.y } } : GLASS_GRID_SPOT_OFF
                }
                className="group/step p-8"
              >
                <div className="mb-6 leading-none tabular-nums">
                  <span className="block text-7xl font-black tracking-[-0.05em] text-foreground/[0.125] md:text-8xl motion-safe:transition-[color] motion-safe:duration-500 motion-safe:ease-out group-hover/step:text-foreground/[0.24]">
                    {s.n}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight">{s.t}</h3>
                <p className="text-soft leading-relaxed">{s.d}</p>
              </GlassSpotlightPanel>
            </motion.div>
          );

          if (i === steps.length - 1) return [card];

          const join = (
            <motion.div
              key={`join-${i}`}
              style={{ scaleX: lineScale }}
              className="hidden md:flex w-11 lg:w-12 shrink-0 flex-col items-center justify-start pt-20 origin-center pointer-events-none"
              aria-hidden
            >
              <div className="h-px w-full rounded-full bg-foreground/25" />
            </motion.div>
          );

          return [card, join];
        })}
      </div>
    </section>
  );
};
