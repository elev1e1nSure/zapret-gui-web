import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shuffle, Cpu, Eye, ShieldCheck, Sparkles } from "lucide-react";
import { GlassSpotlightPanel, GLASS_GRID_SPOT_OFF } from "@/components/GlassSpotlightPanel";
import { featuresSectionCopy } from "@/content/site-copy";
import { usePointerGridHit } from "@/hooks/use-pointer-grid-hit";
import { motionEase } from "@/lib/motion";

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

  const { hit: gridHit, bindCellRef, onPointerMove: handleGridPointerMove, onPointerLeave: handleGridPointerLeave } =
    usePointerGridHit(items.length);

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
              <div className="mb-5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/35 bg-secondary/45 motion-safe:transition-[border-color,background-color,transform,box-shadow] motion-safe:duration-600 motion-safe:ease-out-soft motion-safe:shadow-[inset_0_1px_0_0_hsl(var(--foreground)_/_0.04)] group-hover/spot:border-border/48 group-hover/spot:bg-secondary/58 group-hover/spot:shadow-[inset_0_1px_0_0_hsl(var(--foreground)_/_0.07)] motion-safe:group-hover/spot:scale-[1.04]">
                <it.icon className="size-4 text-foreground/75 motion-safe:transition-transform motion-safe:duration-600 motion-safe:ease-out-soft motion-safe:group-hover/spot:scale-105 motion-safe:group-hover/spot:-rotate-3" strokeWidth={1.75} />
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
