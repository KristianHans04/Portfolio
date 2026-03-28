import { PostmarkEmailProvider } from "./providers/postmark";
import { ResendEmailProvider } from "./providers/resend";
import { SmtpEmailProvider } from "./providers/smtp";
import type { EmailProvider } from "./types";

export type EmailRuntimeEnv = {
  EMAIL_PROVIDER?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  RESEND_API_KEY?: string;
  POSTMARK_SERVER_TOKEN?: string;
};

export function getEmailProvider(env: EmailRuntimeEnv): EmailProvider {
  const provider = (env.EMAIL_PROVIDER ?? "smtp").toLowerCase();

  if (provider === "smtp") {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
      throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS are required when EMAIL_PROVIDER=smtp.");
    }
    return new SmtpEmailProvider({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT ?? "465", 10),
      username: env.SMTP_USER,
      password: env.SMTP_PASS,
    });
  }

  if (provider === "postmark") {
    if (!env.POSTMARK_SERVER_TOKEN) {
      throw new Error("POSTMARK_SERVER_TOKEN is required when EMAIL_PROVIDER=postmark.");
    }
    return new PostmarkEmailProvider(env.POSTMARK_SERVER_TOKEN);
  }

  if (provider === "resend") {
    if (!env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is required when EMAIL_PROVIDER=resend.");
    }
    return new ResendEmailProvider(env.RESEND_API_KEY);
  }

  throw new Error(`Unknown EMAIL_PROVIDER: "${provider}". Use smtp, resend, or postmark.`);
}
