import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ScrollParallax({ children, offset = 50, className = "" }: ScrollParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
