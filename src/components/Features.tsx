import { motion, useScroll, useTransform } from "framer-motion";
import { type PointerEvent as ReactPointerEvent, useCallback, useRef, useState } from "react";
import { Zap, Shuffle, Cpu, Eye, ShieldCheck, Sparkles } from "lucide-react";
import { GlassSpotlightPanel, GLASS_GRID_SPOT_OFF } from "@/components/GlassSpotlightPanel";
import { featuresSectionCopy } from "@/content/site-copy";
import { motionEase } from "@/lib/motion";

/** Порядок иконок должен совпадать с порядком `featuresSectionCopy.cards`. */
const FEATURE_ICONS = [Zap, Shuffle, Cpu, Eye, ShieldCheck, Sparkles] as const;

const items = FEATURE_ICONS.map((icon, i) => {
  const c = featuresSectionCopy.cards[i];
  return { icon, title: c.title, desc: c.description };
});

export const Features = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const labelX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  /** DOM-ячейки сетки — хит-тест по bounding box, зазоры между карточками = мимо всех. */
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [gridHit, setGridHit] = useState<{ idx: number; x: number; y: number } | null>(null);

  const bindCellRef = useCallback((index: number) => (node: HTMLDivElement | null) => {
    cellRefs.current[index] = node;
  }, []);

  const handleGridPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    let hit: { idx: number; x: number; y: number } | null = null;
    for (let i = 0; i < items.length; i++) {
      const node = cellRefs.current[i];
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
    setGridHit(hit);
  }, []);

  const handleGridPointerLeave = useCallback(() => {
    setGridHit(null);
  }, []);

  return (
    <section ref={ref} id="features" className="container mx-auto px-6 py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: motionEase }}
        className="max-w-2xl mb-16"
      >
        <motion.p style={{ x: labelX }} className="text-xs uppercase tracking-[0.3em] text-soft mb-5">
          {featuresSectionCopy.kicker}
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05]">
          {featuresSectionCopy.title}
        </h2>
        <p className="text-soft mt-5 text-lg leading-relaxed">{featuresSectionCopy.lead}</p>
      </motion.div>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-3"
        onPointerMove={handleGridPointerMove}
        onPointerLeave={handleGridPointerLeave}
      >
        {items.map((it, i) => (
          <motion.div
            ref={bindCellRef(i)}
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: motionEase, delay: i * 0.07 }}
            className="h-full min-h-0"
          >
            <GlassSpotlightPanel
              gridSpot={
                gridHit?.idx === i ? { mode: "on", spot: { x: gridHit.x, y: gridHit.y } } : GLASS_GRID_SPOT_OFF
              }
              className="h-full cursor-default p-7"
            >
              <div className="mb-5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/35 bg-secondary/45">
                <it.icon className="size-4 text-foreground/75" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-base mb-1.5">{it.title}</h3>
              <p className="text-sm text-soft leading-relaxed">{it.desc}</p>
            </GlassSpotlightPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
