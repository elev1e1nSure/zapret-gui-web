import { motion } from "framer-motion";
import { type MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { NAV_SCROLL_SHOW_DOWNLOAD_PX, navCopy } from "@/content/site-copy";
import { DOWNLOAD_EXE_URL } from "@/lib/site";
import { motionEase } from "@/lib/motion";

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [downloadInView, setDownloadInView] = useState(true);
  const [auxNavFocus, setAuxNavFocus] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setScrollY(y);
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
    if (downloadInView && scrollY < NAV_SCROLL_SHOW_DOWNLOAD_PX) {
      setAuxNavFocus(false);
    }
  }, [downloadInView, scrollY]);

  const showHeaderAside =
    !downloadInView || scrollY >= NAV_SCROLL_SHOW_DOWNLOAD_PX || auxNavFocus;

  const handleBrandClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== "/") return;
    e.preventDefault();
    if (location.hash) {
      window.history.replaceState(null, "", `${location.pathname}${location.search}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-blur border-b border-border/60" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="relative flex h-9 min-w-[5rem] items-center justify-start">
          <motion.div
            initial={false}
            animate={{
              opacity: showHeaderAside ? 1 : 0,
              y: showHeaderAside ? 0 : -8,
            }}
            transition={{ duration: 0.42, ease: motionEase }}
            className="absolute left-0"
            style={{ pointerEvents: showHeaderAside ? "auto" : "none" }}
          >
            <Link
              to="/"
              onClick={handleBrandClick}
              className="inline-block font-black text-lg tracking-[0.065em] text-foreground btn-lift hover:text-foreground"
            >
              {navCopy.brand}
            </Link>
          </motion.div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-soft">
          <a
            href="#features"
            onClick={() => setAuxNavFocus(true)}
            className="nav-link hover:text-foreground transition-colors duration-300"
          >
            {navCopy.linkFeatures}
          </a>
          <a
            href="#how"
            onClick={() => setAuxNavFocus(true)}
            className="nav-link hover:text-foreground transition-colors duration-300"
          >
            {navCopy.linkHowItWorks}
          </a>
        </nav>
        <div className="relative flex h-9 min-w-[5.75rem] items-center justify-end">
          <motion.a
            href={DOWNLOAD_EXE_URL}
            initial={false}
            animate={{
              opacity: showHeaderAside ? 1 : 0,
              y: showHeaderAside ? 0 : -8,
            }}
            transition={{ duration: 0.42, ease: motionEase }}
            className="absolute right-0 btn-lift text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 whitespace-nowrap"
            style={{ pointerEvents: showHeaderAside ? "auto" : "none" }}
          >
            {navCopy.headerDownload}
          </motion.a>
        </div>
      </div>
    </header>
  );
};
