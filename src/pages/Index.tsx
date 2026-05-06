import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Github, Send, Download as DownloadIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useLatestZapretGuiVersion } from "@/hooks/use-latest-zapret-gui-version";
import { motionEase } from "@/lib/motion";
import { DOWNLOAD_EXE_URL, AUTHOR_GITHUB_URL, REPO_GUI_APP, REPO_ZAPRET_DISCORD_YT, TELEGRAM_NEWS_URL } from "@/lib/site";
import { footerCopy, heroCopy } from "@/content/site-copy";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";

const FOOTER_LINKS = [
  {
    href: REPO_GUI_APP,
    label: footerCopy.linkGuiRepo,
    icon: Github,
    title: "zapret-gui — исходный код приложения",
  },
  {
    href: REPO_ZAPRET_DISCORD_YT,
    label: footerCopy.linkCoreRepo,
    icon: Github,
    title: "zapret-discord-youtube — ядро для Discord и YouTube",
  },
  {
    href: TELEGRAM_NEWS_URL,
    label: footerCopy.linkTelegramChannel,
    icon: Send,
    title: "Официальный канал с новостями и релизами",
  },
] as const;

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
            className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-none text-center text-foreground"
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
              className="btn-download-fill btn-lift group relative isolate overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium"
            >
              <span className="btn-download-fill__blob" aria-hidden />
              <span className="btn-download-fill__shine" aria-hidden />
              <span className="relative z-10 inline-flex items-center gap-2">
                <DownloadIcon className={heroDownloadIconClassName} strokeWidth={2} />
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
            className="inline-flex cursor-default motion-safe:transition-[transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:scale-[1.06] motion-safe:hover:translate-y-0.5"
            aria-hidden
          >
            <ChevronDown className="size-5 animate-float motion-reduce:animate-none" />
          </div>
        </motion.div>
      </section>

      <Features />
      <HowItWorks />

      <footer className="relative mt-4 bg-muted/25 pt-7 pb-4 text-center text-sm text-muted-foreground border-t border-border/15">
        <div className="container mx-auto max-w-lg px-6 space-y-2">
          <p className="leading-snug text-soft">
            <span className="font-medium text-foreground/85">{footerCopy.copyright}</span>
            <span className="mx-1.5 text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums" aria-hidden>
              ·
            </span>
            <span>
              {footerCopy.createdByPrefix}{" "}
              <a
                href={AUTHOR_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                title="GitHub профиля автора"
              >
                {footerCopy.authorName}
              </a>
            </span>
          </p>
          <nav aria-label={footerCopy.linksNavLabel}>
            <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-2 gap-y-1 p-0 leading-snug text-soft">
              {FOOTER_LINKS.map(({ href, label, icon: Icon, title }, index) => (
                <li key={href} className="flex items-center gap-x-2">
                  {index > 0 ? (
                    <span
                      className="select-none text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums"
                      aria-hidden
                    >
                      ·
                    </span>
                  ) : null}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link inline-flex items-center gap-1.5"
                    title={title}
                  >
                    <Icon className="size-3.5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="pt-0.5 text-[0.62rem] sm:text-[0.65rem] text-muted-foreground/35 max-w-md mx-auto leading-normal select-none">
            {footerCopy.disclaimer}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
