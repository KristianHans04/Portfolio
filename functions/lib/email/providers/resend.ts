import { Resend } from "resend";

import type { EmailMessage, EmailProvider } from "../types";

export class ResendEmailProvider implements EmailProvider {
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<void> {
    const response = await this.client.emails.send({
      to: message.to,
      from: message.from,
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });

    if (response.error) {
      throw new Error(`Resend error: ${response.error.message}`);
    }
  }
}
