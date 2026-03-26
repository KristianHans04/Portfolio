import type { EmailMessage, EmailProvider } from "../types";

export class PostmarkEmailProvider implements EmailProvider {
  constructor(private readonly serverToken: string) {}

  async send(message: EmailMessage): Promise<void> {
    if (!this.serverToken) {
      throw new Error("POSTMARK_SERVER_TOKEN is not configured.");
    }

    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": this.serverToken,
      },
      body: JSON.stringify({
        To: message.to,
        From: message.from,
        Subject: message.subject,
        TextBody: message.text,
        HtmlBody: message.html,
        ReplyTo: message.replyTo,
        MessageStream: "outbound",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Postmark error: ${errorBody || `status ${response.status}`}`);
    }
  }
}
