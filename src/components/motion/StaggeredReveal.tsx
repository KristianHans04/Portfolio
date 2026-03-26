import { motion, useInView } from "motion/react";
import { useRef, type ReactNode, Children } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function StaggeredReveal({
  children,
  className = "",
  staggerDelay = 0.08,
  direction = "up",
}: StaggeredRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const childArray = Children.toArray(children);

  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -30 };
      case "right":
        return { opacity: 0, x: 30 };
      case "scale":
        return { opacity: 0, scale: 0.9 };
      default:
        return { opacity: 0, y: 24 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial={getInitial()}
          animate={isInView ? getAnimate() : getInitial()}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.16, 0.84, 0.23, 0.99],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
