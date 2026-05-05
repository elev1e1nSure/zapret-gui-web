import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-2">
        {steps.flatMap((s, i) => {
          const card = (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: motionEase, delay: i * 0.12 }}
              className="group glass lift-card rounded-2xl p-8 relative overflow-hidden cursor-default hover:border-foreground/30 md:flex-1 min-w-0"
            >
              <div className="text-7xl md:text-8xl font-black tracking-[-0.05em] text-foreground/10 mb-6 transition-colors duration-700 group-hover:text-foreground/25">
                {s.n}
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{s.t}</h3>
              <p className="text-soft leading-relaxed">{s.d}</p>
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
