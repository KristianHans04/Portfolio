import { startTransition, useDeferredValue, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type WorkProject = {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  featured: boolean;
  period: string | null;
  stack: string[];
};

type WorkFilterProps = {
  projects: WorkProject[];
};

export default function WorkFilter({ projects }: WorkFilterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");
  const deferredCategory = useDeferredValue(activeCategory);

  const categories = ["all", ...new Set(projects.flatMap((project) => project.categories))];
  const featuredFirst = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const filteredProjects =
    deferredCategory === "all"
      ? featuredFirst
      : featuredFirst.filter((project) => project.categories.includes(deferredCategory));

  const onFilterChange = (category: string) => {
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  return (
    <section className="space-y-7" aria-label="Filter and project grid">
      <div className="panel p-3">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-muted">Filter by category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = deferredCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onFilterChange(category)}
                className={[
                  "rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active
                    ? "border-accent bg-accent text-[#04111e]"
                    : "border-border-subtle bg-canvas-soft text-ink-muted hover:border-accent hover:text-accent",
                ].join(" ")}
                aria-pressed={active}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="panel p-8 text-ink-muted">No projects match this category yet.</p>
      ) : (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.li
                key={project.slug}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="mosaic-card flex h-full flex-col p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Project</p>
                  {project.featured ? (
                    <span className="rounded-md border border-accent/20 bg-accent-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                      Featured
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                  <a className="transition-colors hover:text-accent" href={`/work/${project.slug}`}>
                    {project.title}
                  </a>
                </h3>

                <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>

                {project.categories.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.categories.map((categoryItem) => (
                      <li
                        key={`${project.slug}-${categoryItem}`}
                        className="rounded-full border border-border-subtle bg-canvas-soft px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                      >
                        {categoryItem}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {project.stack.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((stackItem) => (
                      <li
                        key={`${project.slug}-stack-${stackItem}`}
                        className="rounded-full bg-panel px-2.5 py-1 text-[11px] text-ink-muted"
                      >
                        {stackItem}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 flex items-center justify-between border-t border-border-subtle/70 pt-4 text-sm">
                  <span className="text-ink-muted">{project.period ?? "Timeline pending"}</span>
                  <a href={`/work/${project.slug}`} className="font-medium text-accent transition-colors hover:text-[#80d5ff]">
                    View details {"->"}
                  </a>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  );
}
