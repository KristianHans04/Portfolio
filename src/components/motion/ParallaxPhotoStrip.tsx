import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type PhotoItem = {
  slug: string;
  src: string;
  alt: string;
  caption: string | null;
};

type ParallaxPhotoStripProps = {
  photos: PhotoItem[];
};

export default function ParallaxPhotoStrip({ photos }: ParallaxPhotoStripProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const firstColumnShift = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -34]);
  const secondColumnShift = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 34]);

  const midpoint = Math.ceil(photos.length / 2);
  const leftColumn = photos.slice(0, midpoint);
  const rightColumn = photos.slice(midpoint);

  return (
    <div ref={rootRef} className="grid gap-4 md:grid-cols-2">
      <motion.div style={{ y: firstColumnShift }} className="space-y-4">
        {leftColumn.map((photo, index) => (
          <figure key={photo.slug} className="mosaic-card overflow-hidden">
            <img
              className={[
                "w-full object-cover transition-transform duration-500 hover:scale-[1.02]",
                index % 2 === 0 ? "h-80" : "h-64",
              ].join(" ")}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
            {photo.caption ? <figcaption className="media-caption">{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </motion.div>
      <motion.div style={{ y: secondColumnShift }} className="space-y-4">
        {rightColumn.map((photo, index) => (
          <figure key={photo.slug} className="mosaic-card overflow-hidden">
            <img
              className={[
                "w-full object-cover transition-transform duration-500 hover:scale-[1.02]",
                index % 2 === 0 ? "h-64" : "h-80",
              ].join(" ")}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
            {photo.caption ? <figcaption className="media-caption">{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
