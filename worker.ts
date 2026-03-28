import { z } from "zod";

import { getEmailProvider } from "./functions/lib/email";
import { buildAcknowledgment, buildOwnerNotification } from "./functions/lib/email/templates";

interface Env {
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_ACK_FROM_EMAIL?: string;
  EMAIL_PROVIDER?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  RESEND_API_KEY?: string;
  POSTMARK_SERVER_TOKEN?: string;
}

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(256),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : null)),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(8).max(5000),
  companyWebsite: z.string().trim().max(200).optional().default(""),
  turnstileToken: z.string().trim().min(1),
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function parsePayload(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return request.json();
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }

  throw new Error("Unsupported content type.");
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null): Promise<boolean> {
  const payload = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    payload.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (!env.TURNSTILE_SECRET_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return jsonResponse(
      {
        ok: false,
        error: "Server configuration incomplete. Set TURNSTILE_SECRET_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
      },
      500,
    );
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = await parsePayload(request);
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request payload." }, 400);
  }

  const validation = contactSchema.safeParse(parsedPayload);
  if (!validation.success) {
    return jsonResponse({ ok: false, error: "Invalid form input." }, 400);
  }

  const data = validation.data;

  // Honeypot
  if (data.companyWebsite) {
    return jsonResponse({ ok: true, message: "Message received." });
  }

  const remoteIp = request.headers.get("CF-Connecting-IP");
  const turnstileOk = await verifyTurnstile(data.turnstileToken, env.TURNSTILE_SECRET_KEY, remoteIp);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: "Spam check failed. Please retry." }, 400);
  }

  let provider;
  try {
    provider = getEmailProvider(env);
  } catch (error) {
    return jsonResponse(
      { ok: false, error: error instanceof Error ? error.message : "Email provider configuration error." },
      500,
    );
  }

  const ownerTemplate = buildOwnerNotification({
    name: data.name,
    email: data.email,
    company: data.company,
    subject: data.subject,
    message: data.message,
  });

  const acknowledgmentTemplate = buildAcknowledgment({
    name: data.name,
    subject: data.subject,
  });

  const ackFrom = env.CONTACT_ACK_FROM_EMAIL ?? env.CONTACT_FROM_EMAIL;

  try {
    await Promise.all([
      provider.send({
        to: env.CONTACT_TO_EMAIL,
        from: env.CONTACT_FROM_EMAIL,
        subject: ownerTemplate.subject,
        text: ownerTemplate.text,
        html: ownerTemplate.html,
        replyTo: data.email,
      }),
      provider.send({
        to: data.email,
        from: ackFrom,
        subject: acknowledgmentTemplate.subject,
        text: acknowledgmentTemplate.text,
        html: acknowledgmentTemplate.html,
      }),
    ]);
  } catch {
    return jsonResponse({ ok: false, error: "Unable to send email right now. Please try again." }, 502);
  }

  return jsonResponse({
    ok: true,
    message: "Thanks for reaching out. Your message is in, and a confirmation email has been sent.",
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: { Allow: "POST, OPTIONS", "Cache-Control": "no-store" },
        });
      }
      if (request.method === "POST") {
        return handleContact(request, env);
      }
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    // All non-API requests are served by [assets]
    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
