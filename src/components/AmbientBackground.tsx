import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const AmbientBackground = () => {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  const y1 = useTransform(smooth, [0, 1], ["0%", "35%"]);
  const x1 = useTransform(smooth, [0, 0.5, 1], ["-2%", "3%", "-1%"]);
  const hue1 = useTransform(smooth, [0, 1], [220, 232]);
  const op1 = useTransform(smooth, [0, 0.5, 1], [0.55, 0.7, 0.45]);
  const bg1 = useTransform(
    [hue1, op1] as never,
    ([h, o]: number[]) =>
      `radial-gradient(ellipse 60% 50% at 30% 30%, hsl(${h} 28% 24% / ${o}), transparent 70%)`
  );

  const y2 = useTransform(smooth, [0, 1], ["0%", "-28%"]);
  const x2 = useTransform(smooth, [0, 0.5, 1], ["1%", "-4%", "2%"]);
  const hue2 = useTransform(smooth, [0, 1], [210, 198]);
  const op2 = useTransform(smooth, [0, 0.5, 1], [0.5, 0.62, 0.42]);
  const bg2 = useTransform(
    [hue2, op2] as never,
    ([h, o]: number[]) =>
      `radial-gradient(ellipse 50% 50% at 75% 60%, hsl(${h} 22% 20% / ${o}), transparent 70%)`
  );

  const y3 = useTransform(smooth, [0, 1], ["10%", "-15%"]);
  const op3 = useTransform(smooth, [0, 0.4, 0.7, 1], [0, 0.35, 0.3, 0]);
  const bg3 = useTransform(
    op3,
    (o) =>
      `radial-gradient(ellipse 45% 40% at 50% 50%, hsl(250 30% 26% / ${o}), transparent 70%)`
  );

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      <motion.div
        style={{ y: y1, x: x1 }}
        className="absolute -top-[30%] -left-[28vw] w-[156vw] h-[95vh] will-change-transform"
      >
        <motion.div
          className="h-full w-full animate-[ambient-drift-1_18s_ease-in-out_infinite_alternate]"
          style={{ background: bg1 }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2, x: x2 }}
        className="absolute top-[28%] -left-[28vw] w-[156vw] h-[95vh] will-change-transform"
      >
        <motion.div
          className="h-full w-full animate-[ambient-drift-2_22s_ease-in-out_infinite_alternate]"
          style={{ background: bg2 }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute top-[58%] -left-[28vw] w-[156vw] h-[90vh] will-change-transform"
      >
        <motion.div
          className="h-full w-full animate-[ambient-drift-3_26s_ease-in-out_infinite_alternate]"
          style={{ background: bg3 }}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};
