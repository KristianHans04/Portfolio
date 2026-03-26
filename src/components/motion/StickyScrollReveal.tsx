import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface StickyItem {
  title: string;
  content: ReactNode;
  accent?: string;
}

interface StickyScrollRevealProps {
  items: StickyItem[];
  stickyContent: ReactNode;
  className?: string;
}

export function StickyScrollReveal({
  items,
  stickyContent,
  className = "",
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-28">{stickyContent}</div>
        </div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <StickyItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StickyItem({ item, index }: { item: StickyItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [20, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }}>
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-mono text-sm font-bold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <div className="mt-3 text-sm text-ink-muted leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
