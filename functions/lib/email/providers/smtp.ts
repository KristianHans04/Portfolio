import { connect } from "cloudflare:sockets";
import type { EmailMessage, EmailProvider } from "../types";

type SmtpConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
};

/**
 * Parse a complete SMTP response from the accumulation buffer.
 * Multi-line responses use a hyphen after the code (e.g. "250-...") for
 * continuation lines; the final line uses a space (e.g. "250 OK").
 * Returns null when the buffer does not yet contain a complete response.
 */
function parseSmtpResponse(
  buffer: string,
): { code: number; text: string; remaining: string } | null {
  const lines = buffer.split("\r\n");
  if (lines.length < 2) return null;

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    if (line.length < 3) continue;

    const code = parseInt(line.substring(0, 3), 10);
    const sep = line.charAt(3);

    if (sep !== "-") {
      return {
        code,
        text: lines.slice(0, i + 1).join("\r\n"),
        remaining: lines.slice(i + 1).join("\r\n"),
      };
    }
  }

  return null;
}

function extractAddress(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return match ? match[1] : value.trim();
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function wrapBase64(encoded: string, maxLen = 76): string {
  const lines: string[] = [];
  for (let i = 0; i < encoded.length; i += maxLen) {
    lines.push(encoded.substring(i, i + maxLen));
  }
  return lines.join("\r\n");
}

function buildMimeMessage(message: EmailMessage): string {
  const date = new Date().toUTCString();
  const msgId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@portfolio>`;
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const headers: string[] = [
    `Date: ${date}`,
    `Message-ID: ${msgId}`,
    `From: ${message.from}`,
    `To: ${message.to}`,
    `Subject: =?UTF-8?B?${utf8ToBase64(message.subject)}?=`,
    "MIME-Version: 1.0",
  ];

  if (message.replyTo) {
    headers.push(`Reply-To: ${message.replyTo}`);
  }

  let body: string;

  if (message.html) {
    headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);
    body = [
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(utf8ToBase64(message.text)),
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(utf8ToBase64(message.html)),
      `--${boundary}--`,
    ].join("\r\n");
  } else {
    headers.push("Content-Type: text/plain; charset=UTF-8");
    headers.push("Content-Transfer-Encoding: base64");
    body = "\r\n" + wrapBase64(utf8ToBase64(message.text));
  }

  return (headers.join("\r\n") + "\r\n" + body)
    .split("\r\n")
    .map((line) => (line.startsWith(".") ? "." + line : line))
    .join("\r\n");
}

export class SmtpEmailProvider implements EmailProvider {
  private config: SmtpConfig;

  constructor(config: SmtpConfig) {
    this.config = config;
  }

  async send(message: EmailMessage): Promise<void> {
    const socket = connect(
      { hostname: this.config.host, port: this.config.port },
      { secureTransport: "on", allowHalfOpen: false },
    );

    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    let buf = "";

    const read = async (expectedCode: number): Promise<string> => {
      for (;;) {
        const parsed = parseSmtpResponse(buf);
        if (parsed) {
          buf = parsed.remaining;
          if (parsed.code !== expectedCode) {
            throw new Error(`SMTP ${parsed.code}: ${parsed.text}`);
          }
          return parsed.text;
        }

        const { value, done } = await reader.read();
        if (done) {
          throw new Error("SMTP connection closed unexpectedly");
        }
        buf += dec.decode(value as Uint8Array, { stream: true });
      }
    };

    const cmd = async (line: string): Promise<void> => {
      await writer.write(enc.encode(line + "\r\n"));
    };

    try {
      await read(220);

      await cmd("EHLO portfolio.local");
      await read(250);

      await cmd("AUTH LOGIN");
      await read(334);

      await cmd(btoa(this.config.username));
      await read(334);

      await cmd(btoa(this.config.password));
      await read(235);

      await cmd(`MAIL FROM:<${extractAddress(message.from)}>`);
      await read(250);

      await cmd(`RCPT TO:<${extractAddress(message.to)}>`);
      await read(250);

      await cmd("DATA");
      await read(354);

      await writer.write(enc.encode(buildMimeMessage(message) + "\r\n.\r\n"));
      await read(250);

      await cmd("QUIT");
    } finally {
      try {
        writer.releaseLock();
      } catch {
        /* cleanup */
      }
      try {
        reader.releaseLock();
      } catch {
        /* cleanup */
      }
      try {
        await socket.close();
      } catch {
        /* cleanup */
      }
    }
  }
}
