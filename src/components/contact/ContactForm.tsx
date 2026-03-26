import { type FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type ContactFormProps = {
  turnstileSiteKey: string | undefined;
};

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
};

export default function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<FormState>({ kind: "idle" });

  const hasTurnstileKey = Boolean(turnstileSiteKey);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasTurnstileKey) {
      setState({
        kind: "error",
        message: "Turnstile is not configured. Set PUBLIC_TURNSTILE_SITE_KEY first.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
    if (!turnstileToken) {
      setState({
        kind: "error",
        message: "Please complete the spam protection challenge before submitting.",
      });
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
      turnstileToken,
    };

    setState({ kind: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send message right now.");
      }

      setState({
        kind: "success",
        message: data.message ?? "Your message was sent successfully.",
      });
      form.reset();
      window.turnstile?.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "Unexpected error. Please try again.",
      });
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border-subtle bg-canvas-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form className="page-band mesh-panel p-6 sm:p-8" data-tone="blue" onSubmit={onSubmit} noValidate>
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Contact form</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Send your message</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Name</span>
          <input required name="name" autoComplete="name" className={fieldClass} />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Email</span>
          <input required type="email" name="email" autoComplete="email" className={fieldClass} />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Company or Team</span>
          <input name="company" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Subject</span>
          <input required name="subject" className={fieldClass} />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Message</span>
        <textarea required name="message" rows={7} className={fieldClass} />
      </label>

      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" name="companyWebsite" />
        </label>
      </div>

      <div className="mt-5 space-y-3">
        {hasTurnstileKey ? (
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        ) : (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Turnstile site key is missing. Configure PUBLIC_TURNSTILE_SITE_KEY.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state.kind === "loading" || !hasTurnstileKey}
      >
        {state.kind === "loading" ? "Sending..." : "Send message"}
      </button>

      <div className="mt-4 min-h-12" aria-live="polite">
        <AnimatePresence mode="wait">
          {state.kind === "success" && (
            <motion.p
              key="success"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl border border-emerald-500/40 bg-success-soft p-3 text-sm text-success-ink"
            >
              {state.message}
            </motion.p>
          )}

          {state.kind === "error" && (
            <motion.p
              key="error"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl border border-red-500/35 bg-red-950/45 p-3 text-sm text-red-100"
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
