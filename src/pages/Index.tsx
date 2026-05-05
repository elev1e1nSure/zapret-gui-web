import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Github, Send, Download as DownloadIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { AmbientBackground } from "@/components/AmbientBackground";

const ease = [0.22, 1, 0.36, 1] as const;

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20"
      >
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease }}
            className="text-[11px] tracking-[0.2em] text-soft/70 mb-8 font-mono"
          >
            v1.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
            className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-none text-center"
          >
            ZAPRET
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="text-soft text-base md:text-lg max-w-md mx-auto mt-6 text-center leading-relaxed"
          >
            GUI-обёртка для обхода блокировок Discord и YouTube.
            Один клик вместо bat-файлов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <a
              href="#"
              className="btn-lift group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium"
            >
              <DownloadIcon className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={2} />
              Скачать для Windows
            </a>
            <a
              href="#"
              className="btn-lift inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
            >
              <Github className="size-4" strokeWidth={2} />
              GitHub
            </a>
            <a
              href="#"
              className="btn-lift inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
            >
              <Send className="size-4" strokeWidth={2} />
              Telegram
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 text-soft"
        >
          <ChevronDown className="size-5 animate-float" />
        </motion.div>
      </section>

      <Features />
      <HowItWorks />

      <footer className="relative border-t border-border/60 py-10 text-center text-sm text-soft">
        © 2026 ZAPRET · Open source GUI for zapret-discord-youtube
      </footer>
    </main>
  );
};

export default Index;
