import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { RevealText } from "./RevealText";

interface HeroInteractiveProps {
  role: string;
  positioningStatement: string;
  heroIntro: string;
  location: string;
  email: string;
  projectsCount: number;
  impactCount: number;
}

export function HeroInteractive({
  role,
  positioningStatement,
  heroIntro,
  location,
  email,
  projectsCount,
  impactCount,
}: HeroInteractiveProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border-subtle/40 bg-canvas/30 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-md">
      {/* Animated abstract background */}
      <motion.div
        className="absolute -top-[50%] -left-[10%] -z-10 h-[200%] w-[120%] opacity-40 mix-blend-screen"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(58, 184, 255, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(57, 212, 173, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(20, 143, 208, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(58, 184, 255, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {role}
        </motion.p>
        <h1 className="headline mt-6 max-w-4xl text-ink">
          <RevealText text={positioningStatement} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="muted mt-6 max-w-2xl text-[1.1rem] leading-relaxed"
        >
          {heroIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {location && <span className="data-chip border-accent/20 bg-accent/5 text-accent">{location}</span>}
          {email && <span className="data-chip">{email}</span>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/work" className="btn-primary">
            Explore Work
          </MagneticButton>
          <MagneticButton href="/about" className="btn-secondary">
            Read Biography
          </MagneticButton>
          <MagneticButton href="/contact" className="btn-light">
            Contact
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:max-w-xl"
        >
          <div className="rounded-2xl border border-border-subtle/50 bg-panel-strong/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-panel-strong/60">
            <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">Project Depth</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{projectsCount} Case Studies</p>
          </div>
          <div className="rounded-2xl border border-border-subtle/50 bg-panel-strong/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-highlight/30 hover:bg-panel-strong/60">
            <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">Community Work</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">{impactCount} Impact Entries</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
