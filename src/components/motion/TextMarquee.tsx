interface TextMarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export function TextMarquee({
  items,
  separator = " / ",
  className = "",
}: TextMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-border-subtle/50 bg-panel/30 py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap px-2 font-mono text-sm tracking-wider text-ink-muted"
          >
            {item}
            {i < doubled.length - 1 && (
              <span className="mx-3 text-accent/40">{separator}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
