import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  NAV_SCROLL_SHOW_DOWNLOAD_PX,
  NAV_SCROLL_TOP_SHOW_PX,
  navCopy,
} from "@/content/site-copy";
import { DOWNLOAD_EXE_URL } from "@/lib/site";
import { motionEase } from "@/lib/motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [downloadInView, setDownloadInView] = useState(true);
  const [auxNavFocus, setAuxNavFocus] = useState(false);
  /** Синхронные копии для обработчика scroll (иначе там устаревший closure). */
  const downloadInViewRef = useRef(true);
  const auxNavFocusRef = useRef(false);
  const prevScrollYRef = useRef<number | null>(null);
  /** Предыдущее значение IntersectionObserver по #download — для детекта «снова вошли в герой». */
  const downloadWasInView = useRef(true);

  useEffect(() => {
    downloadInViewRef.current = downloadInView;
  }, [downloadInView]);
  useEffect(() => {
    auxNavFocusRef.current = auxNavFocus;
  }, [auxNavFocus]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = prevScrollYRef.current;
      const scrollingUp = prev !== null && y < prev;
      prevScrollYRef.current = y;

      setScrolled(y > 12);
      setScrollY(y);

      if (
        auxNavFocusRef.current &&
        downloadInViewRef.current &&
        y < NAV_SCROLL_SHOW_DOWNLOAD_PX &&
        scrollingUp
      ) {
        setAuxNavFocus(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("download");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDownloadInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /** Снова видим #download после того как уходил (например тянем страницу вверх с секции). */
    const reEnteredHeroDownload = downloadInView && !downloadWasInView.current;
    downloadWasInView.current = downloadInView;
    if (reEnteredHeroDownload) {
      setAuxNavFocus(false);
    }
  }, [downloadInView]);

  const showHeaderAside =
    !downloadInView || scrollY >= NAV_SCROLL_SHOW_DOWNLOAD_PX || auxNavFocus;

  const showScrollTop = scrollY > NAV_SCROLL_TOP_SHOW_PX;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-blur border-b border-border/60" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-end px-6 py-5 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="hidden md:block" aria-hidden />
          <nav className="z-10 hidden items-center gap-1.5 text-base text-soft md:col-start-2 md:flex md:justify-self-center">
            <a
              href="#features"
              onClick={() => setAuxNavFocus(true)}
              className="nav-link"
            >
              {navCopy.linkFeatures}
            </a>
            <a
              href="#how"
              onClick={() => setAuxNavFocus(true)}
              className="nav-link"
            >
              {navCopy.linkHowItWorks}
            </a>
          </nav>
          <div className="relative flex h-9 min-w-[5.75rem] items-center justify-end md:col-start-3 md:justify-self-end">
            <motion.a
              href={DOWNLOAD_EXE_URL}
              initial={false}
              animate={{
                opacity: showHeaderAside ? 1 : 0,
                y: showHeaderAside ? 0 : -8,
              }}
              transition={{ duration: 0.42, ease: motionEase }}
              className="absolute right-0 btn-download-fill btn-download-fill--compact btn-lift group relative isolate overflow-hidden inline-flex items-center justify-center text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium whitespace-nowrap"
              style={{ pointerEvents: showHeaderAside ? "auto" : "none" }}
            >
              <span className="btn-download-fill__blob" aria-hidden />
              <span className="btn-download-fill__shine" aria-hidden />
              <span className="relative z-10">{navCopy.headerDownload}</span>
            </motion.a>
          </div>
        </div>
      </header>

      <motion.button
        type="button"
        initial={false}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 16,
          scale: showScrollTop ? 1 : 0.94,
        }}
        transition={{ duration: 0.45, ease: motionEase }}
        className="fixed z-40 flex size-11 items-center justify-center rounded-full glass border border-border/55 text-foreground shadow-[var(--shadow-soft)] btn-lift hover:bg-secondary/40 max-md:bottom-[max(1.25rem,env(safe-area-inset-bottom))] max-md:right-[max(1.25rem,env(safe-area-inset-right))] md:bottom-8 md:right-8"
        style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
        aria-label={navCopy.scrollToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp className="size-5 stroke-[2.25]" aria-hidden />
      </motion.button>
    </>
  );
};
