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

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (hasTurnstileKey) {
      const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
      if (!turnstileToken) {
        setState({
          kind: "error",
          message: "Please complete the verification below before sending.",
        });
        return;
      }
    }

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
      ...(hasTurnstileKey && {
        turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
      }),
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
        message: data.message ?? "Message sent! I will get back to you soon.",
      });
      form.reset();
      window.turnstile?.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border-subtle bg-canvas-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  const labelClass = "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted";

  return (
    <form className="page-band mesh-panel p-6 sm:p-8" data-tone="blue" onSubmit={onSubmit} noValidate>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Send a message</h2>
        <p className="mt-1 text-sm text-ink-muted">Fields marked with <span className="text-red-400">*</span> are required.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className={labelClass}>Name <span className="text-red-400">*</span></span>
          <input required name="name" autoComplete="name" placeholder="Your name" className={fieldClass} />
        </label>
        <label className="text-sm">
          <span className={labelClass}>Email <span className="text-red-400">*</span></span>
          <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className={labelClass}>Company or Team</span>
          <input name="company" autoComplete="organization" placeholder="Optional" className={fieldClass} />
        </label>
        <label className="text-sm">
          <span className={labelClass}>Subject <span className="text-red-400">*</span></span>
          <input required name="subject" placeholder="What is this about?" className={fieldClass} />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className={labelClass}>Message <span className="text-red-400">*</span></span>
        <textarea required name="message" rows={6} placeholder="Tell me more..." className={fieldClass} />
      </label>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" name="companyWebsite" />
        </label>
      </div>

      {hasTurnstileKey && (
        <div className="mt-5">
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </div>
      )}

      <button
        type="submit"
        className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state.kind === "loading"}
      >
        {state.kind === "loading" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
            </svg>
            Sending...
          </span>
        ) : "Send message"}
      </button>

      <div className="mt-4 min-h-12" aria-live="polite">
        <AnimatePresence mode="wait">
          {state.kind === "success" && (
            <motion.div
              key="success"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-sm text-emerald-300"
            >
              <svg className="h-6 w-6 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{state.message}</span>
            </motion.div>
          )}

          {state.kind === "error" && (
            <motion.div
              key="error"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-red-500/35 bg-red-950/30 p-4 text-sm text-red-300"
            >
              <svg className="h-6 w-6 shrink-0 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{state.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
