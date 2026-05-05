import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shuffle, Cpu, Eye, Sparkles, ShieldCheck } from "lucide-react";

const items = [
  { icon: Zap, title: "Автоподбор", desc: "Автоматически находит рабочую стратегию обхода без копания в конфигах." },
  { icon: Shuffle, title: "Переключение стратегий", desc: "Мгновенный свитч между профилями — Discord, YouTube, кастом." },
  { icon: Cpu, title: "Без bat-скриптов", desc: "Никаких чёрных консолей. Один клик — и всё работает." },
  { icon: Eye, title: "Живой интерфейс", desc: "Минималистичные анимации и отзывчивый UI на Tauri." },
  { icon: ShieldCheck, title: "Безопасно", desc: "Полностью локально. Не собирает данные, открытый исходный код." },
  { icon: Sparkles, title: "Лёгковесно", desc: "Несколько мегабайт и почти нулевая нагрузка на систему." },
];

const ease = [0.22, 1, 0.36, 1] as const;

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
        transition={{ duration: 0.9, ease }}
        className="max-w-2xl mb-16"
      >
        <motion.p style={{ x: labelX }} className="text-xs uppercase tracking-[0.3em] text-soft mb-5">
          — Возможности
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05]">
          Обход без боли.
        </h2>
        <p className="text-soft mt-5 text-lg leading-relaxed">
          Всё, что раньше требовало терминала и десятка ключей — теперь в одном экране.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: i * 0.07 }}
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
