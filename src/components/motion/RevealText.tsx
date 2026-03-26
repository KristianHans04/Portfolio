import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

export function RevealText({ text, as: Component = "span", className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text by lines (e.g. if it has <br/> or is just a block)
  // For simplicity, we just split by space to animate words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
