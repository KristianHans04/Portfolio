type OwnerTemplateInput = {
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
};

type AcknowledgmentTemplateInput = {
  name: string;
  subject: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildOwnerNotification(input: OwnerTemplateInput) {
  const escapedName = escapeHtml(input.name);
  const escapedEmail = escapeHtml(input.email);
  const escapedCompany = input.company ? escapeHtml(input.company) : "Not provided";
  const escapedSubject = escapeHtml(input.subject);
  const escapedMessage = escapeHtml(input.message).replaceAll("\n", "<br />");

  return {
    subject: `Portfolio contact: ${input.subject}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Company: ${input.company ?? "Not provided"}`,
      `Subject: ${input.subject}`,
      "",
      input.message,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1f2937;">
        <h1 style="font-size:20px;margin:0 0 16px;">New portfolio contact submission</h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Name</td><td style="padding:8px;border:1px solid #e5e7eb;">${escapedName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${escapedEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Company</td><td style="padding:8px;border:1px solid #e5e7eb;">${escapedCompany}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">Subject</td><td style="padding:8px;border:1px solid #e5e7eb;">${escapedSubject}</td></tr>
        </table>
        <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
        <p style="margin:0;line-height:1.6;">${escapedMessage}</p>
      </div>
    `,
  };
}

export function buildAcknowledgment(input: AcknowledgmentTemplateInput) {
  const escapedName = escapeHtml(input.name);
  const escapedSubject = escapeHtml(input.subject);

  return {
    subject: `Received: ${input.subject}`,
    text: [
      `Hi ${input.name},`,
      "",
      `Thank you for reaching out regarding "${input.subject}".`,
      "This message confirms your note has been received.",
      "You can expect a follow-up reply soon.",
      "",
      "Regards,",
      "Portfolio Contact",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;color:#1f2937;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;">
          <p style="margin-top:0;">Hi ${escapedName},</p>
          <p>Thank you for reaching out regarding <strong>${escapedSubject}</strong>.</p>
          <p>Your message has been received, and a follow-up reply will come shortly.</p>
          <p style="margin-bottom:0;">Regards,<br />Portfolio Contact</p>
        </div>
      </div>
    `,
  };
}
