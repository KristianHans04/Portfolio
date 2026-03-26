import { PostmarkEmailProvider } from "./providers/postmark";
import { ResendEmailProvider } from "./providers/resend";
import type { EmailProvider } from "./types";

export type EmailRuntimeEnv = {
  EMAIL_PROVIDER?: string;
  RESEND_API_KEY?: string;
  POSTMARK_SERVER_TOKEN?: string;
};

export function getEmailProvider(env: EmailRuntimeEnv): EmailProvider {
  const provider = (env.EMAIL_PROVIDER ?? "resend").toLowerCase();

  if (provider === "postmark") {
    if (!env.POSTMARK_SERVER_TOKEN) {
      throw new Error("POSTMARK_SERVER_TOKEN is required when EMAIL_PROVIDER=postmark.");
    }
    return new PostmarkEmailProvider(env.POSTMARK_SERVER_TOKEN);
  }

  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required when EMAIL_PROVIDER=resend.");
  }
  return new ResendEmailProvider(env.RESEND_API_KEY);
}
