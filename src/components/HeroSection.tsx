import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Github, Send, Download as DownloadIcon } from "lucide-react";

import { ReleaseVersionTicker } from "@/components/ReleaseVersionTicker";
import { heroCopy, primaryDownloadIconClassName } from "@/content/site-copy";
import { useDownloadClickFeedback } from "@/hooks/use-download-click-feedback";
import { useLatestZapretGuiVersion } from "@/hooks/use-latest-zapret-gui-version";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DOWNLOAD_EXE_URL, REPO_GUI_APP, TELEGRAM_NEWS_URL } from "@/lib/site";

export const HeroSection = () => {
  const { downloading, onDownloadActivate } = useDownloadClickFeedback();
  const { label: releaseVersionLabel, status: releaseVersionStatus } = useLatestZapretGuiVersion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50" aria-hidden />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: motionEase }}
          className="text-[13px] md:text-[0.875rem] tracking-[0.18em] text-muted-foreground font-mono mb-8 flex justify-center min-h-[1.25em]"
        >
          <ReleaseVersionTicker
            label={releaseVersionLabel}
            status={releaseVersionStatus}
            className={releaseVersionStatus === "error" ? "opacity-60" : undefined}
            title={releaseVersionStatus === "error" ? heroCopy.versionFetchErrorTitle : undefined}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: motionEase, delay: 0.1 }}
          className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-none text-center text-foreground"
        >
          {heroCopy.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: motionEase, delay: 0.25 }}
          className="text-soft text-base md:text-lg max-w-3xl mx-auto mt-6 text-center leading-relaxed"
        >
          {heroCopy.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: motionEase, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          <a
            id="download"
            href={DOWNLOAD_EXE_URL}
            onClick={onDownloadActivate}
            aria-busy={downloading}
            className={cn(
              "btn-download-fill btn-lift group relative isolate overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium",
              downloading && "btn-download-fill--downloading",
            )}
          >
            <span className="btn-download-fill__blob" aria-hidden />
            <span className="btn-download-fill__shine" aria-hidden />
            <span className="btn-download-fill__dl-track" aria-hidden />
            <span className="relative z-10 inline-flex items-center gap-2">
              <DownloadIcon className={primaryDownloadIconClassName} strokeWidth={2} />
              {heroCopy.downloadWindows}
            </span>
          </a>
          <a
            href={REPO_GUI_APP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift hero-glass-cta inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
          >
            <Github className="size-4" strokeWidth={2} />
            {heroCopy.heroGithub}
          </a>
          <a
            href={TELEGRAM_NEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift hero-glass-cta inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
          >
            <Send className="size-4" strokeWidth={2} />
            {heroCopy.heroTelegram}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 text-soft"
      >
        <div
          className="inline-flex cursor-default motion-safe:transition-[transform] motion-safe:duration-500 motion-safe:ease-out-soft motion-safe:hover:scale-[1.06] motion-safe:hover:translate-y-0.5"
          aria-hidden
        >
          <ChevronDown className="size-5 animate-float motion-reduce:animate-none" />
        </div>
      </motion.div>
    </section>
  );
};
