import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

interface CounterUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label?: string;
}

export function CounterUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  label,
}: CounterUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: [0.16, 0.84, 0.23, 0.99],
      });
      return controls.stop;
    }
  }, [isInView, target, duration, count]);

  return (
    <div ref={ref} className={className}>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="stat-number">{prefix}</span>}
        <motion.span className="stat-number">{rounded}</motion.span>
        {suffix && (
          <span className="text-lg font-semibold text-accent">{suffix}</span>
        )}
      </div>
      {label && (
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </p>
      )}
    </div>
  );
}
