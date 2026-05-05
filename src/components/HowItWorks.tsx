import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Скачай", d: "Один установщик. Никаких зависимостей и ручной настройки." },
  { n: "02", t: "Запусти", d: "Открой приложение — автоподбор сделает всё сам." },
  { n: "03", t: "Пользуйся", d: "Discord и YouTube работают как должны. Без VPN." },
];

const ease = [0.22, 1, 0.36, 1] as const;

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
        transition={{ duration: 0.9, ease }}
        className="max-w-2xl mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-soft mb-5">— Как это работает</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">Три шага. Без магии.</h2>
      </motion.div>

      <div className="relative">
        {/* connector line */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="hidden md:block absolute top-[5.5rem] left-8 right-8 h-px bg-foreground/20 origin-left"
        />

        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              className="group glass lift-card rounded-2xl p-8 relative overflow-hidden cursor-default hover:border-foreground/30"
            >
              <div className="text-7xl md:text-8xl font-black tracking-[-0.05em] text-foreground/10 mb-6 transition-colors duration-700 group-hover:text-foreground/25">
                {s.n}
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{s.t}</h3>
              <p className="text-soft leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
