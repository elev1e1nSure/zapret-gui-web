import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-blur border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="group flex items-center gap-2 font-black tracking-tight text-lg">
          <span className="size-1.5 rounded-full bg-foreground transition-transform duration-500 group-hover:scale-150" />
          ZAPRET
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-soft">
          <a href="#features" className="nav-link hover:text-foreground transition-colors duration-300">Возможности</a>
          <a href="#how" className="nav-link hover:text-foreground transition-colors duration-300">Как работает</a>
          <a href="#download" className="nav-link hover:text-foreground transition-colors duration-300">Скачать</a>
        </nav>
        <a
          href="#download"
          className="btn-lift text-sm px-4 py-2 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90"
        >
          Скачать
        </a>
      </div>
    </motion.header>
  );
};
