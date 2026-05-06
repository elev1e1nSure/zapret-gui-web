import { motion, useScroll } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { SiteFooter } from "@/components/SiteFooter";

const Index = () => {
  const { scrollYProgress: pageScrollProgress } = useScroll();

  return (
    <main className="relative min-h-screen">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[51] h-0.5 w-full origin-left bg-foreground/[0.22]"
        style={{ scaleX: pageScrollProgress }}
        aria-hidden
      />

      <Navbar />

      <HeroSection />

      <Features />
      <HowItWorks />

      <SiteFooter />
    </main>
  );
};

export default Index;
