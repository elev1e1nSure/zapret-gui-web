import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Github, Send, Download as DownloadIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLatestZapretGuiVersion } from "@/hooks/use-latest-zapret-gui-version";
import { motionEase } from "@/lib/motion";
import {
  AUTHOR_GITHUB_URL,
  DOWNLOAD_EXE_URL,
  REPO_GUI_APP,
  REPO_ZAPRET_DISCORD_YT,
  TELEGRAM_NEWS_URL,
} from "@/lib/site";
import { footerCopy, heroCopy } from "@/content/site-copy";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";

const heroDownloadIconClassName =
  "size-4 shrink-0 transition-transform duration-[750ms] ease-[cubic-bezier(0.25,1,0.55,1)] group-hover:-translate-y-px";

const Index = () => {
  const { label: releaseVersionLabel, status: releaseVersionStatus } = useLatestZapretGuiVersion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen">
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
            transition={{ duration: 1.2, ease: motionEase }}
            className={`text-[13px] md:text-[0.875rem] tracking-[0.18em] text-muted-foreground font-mono mb-8 ${
              releaseVersionStatus === "loading" ? "animate-pulse" : ""
            } ${releaseVersionStatus === "error" ? "opacity-60" : ""}`}
            title={releaseVersionStatus === "error" ? heroCopy.versionFetchErrorTitle : undefined}
          >
            {releaseVersionLabel}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: motionEase, delay: 0.1 }}
            className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-none text-center"
          >
            {heroCopy.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: motionEase, delay: 0.25 }}
            className="text-soft text-base md:text-lg max-w-md mx-auto mt-6 text-center leading-relaxed"
          >
            {heroCopy.subtitleBeforeBreak} {heroCopy.subtitleAfterBreak}
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
              className="btn-lift group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium"
            >
              <DownloadIcon className={heroDownloadIconClassName} strokeWidth={2} />
              {heroCopy.downloadWindows}
            </a>
            <a
              href={REPO_GUI_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
            >
              <Github className="size-4" strokeWidth={2} />
              {heroCopy.heroGithub}
            </a>
            <a
              href={TELEGRAM_NEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-secondary/60"
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
          <ChevronDown className="size-5 animate-float" />
        </motion.div>
      </section>

      <Features />
      <HowItWorks />

      <footer className="relative mt-4 bg-muted/25 pt-7 pb-4 text-center text-sm text-muted-foreground border-t border-border/15">
        <div className="container mx-auto max-w-lg px-6 space-y-1.5">
          <p className="leading-snug text-soft">
            <span className="font-medium text-foreground/85">{footerCopy.copyright}</span>
            <span className="mx-1.5 text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums" aria-hidden>
              ·
            </span>
            <span>
              {footerCopy.createdByPrefix}{" "}
              <a href={AUTHOR_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
                {footerCopy.authorName}
              </a>
            </span>
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 leading-snug text-soft">
            <a
              href={REPO_GUI_APP}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-flex items-center gap-1.5"
            >
              <Github className="size-3.5 opacity-80 shrink-0" strokeWidth={2} aria-hidden />
              {footerCopy.linkZapretGui}
            </a>
            <span className="text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums" aria-hidden>
              ·
            </span>
            <a
              href={TELEGRAM_NEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-flex items-center gap-1.5"
            >
              <Send className="size-3.5 opacity-80 shrink-0" strokeWidth={2} aria-hidden />
              {footerCopy.linkTelegramChannel}
            </a>
            <span className="text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums" aria-hidden>
              ·
            </span>
            <a
              href={REPO_ZAPRET_DISCORD_YT}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-flex items-center gap-1.5 text-sm"
            >
              <Github className="size-3.5 opacity-80 shrink-0" strokeWidth={2} aria-hidden />
              {footerCopy.linkCoreRepoLabel}
            </a>
          </p>
          <p className="pt-1 text-[0.62rem] sm:text-[0.65rem] text-muted-foreground/35 max-w-md mx-auto leading-normal select-none">
            {footerCopy.disclaimer}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
