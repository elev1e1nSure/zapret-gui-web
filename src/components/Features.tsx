import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shuffle, Cpu, Eye, ShieldCheck, Sparkles } from "lucide-react";
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
        <p className="text-soft mt-5 text-lg leading-relaxed">
          {featuresSectionCopy.lead}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: motionEase, delay: i * 0.07 }}
            className="group glass lift-card rounded-2xl p-7 hover:border-foreground/30 cursor-default relative overflow-hidden"
          >
            {/* subtle hover spotlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(400px circle at 50% 0%, hsl(var(--foreground) / 0.04), transparent 60%)",
              }}
            />
            <div className="size-10 rounded-xl bg-secondary flex items-center justify-center mb-5 transition-colors duration-500 group-hover:bg-foreground">
              <it.icon className="size-4 text-foreground/80 transition-colors duration-500 group-hover:text-background" strokeWidth={1.75} />
            </div>
            <h3 className="font-semibold text-base mb-1.5">{it.title}</h3>
            <p className="text-sm text-soft leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
