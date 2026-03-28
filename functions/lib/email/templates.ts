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

const DARK_MODE_CSS = `
  @media (prefers-color-scheme: dark) {
    .em-wrap { background-color: #0c1424 !important; }
    .em-card { background-color: #121f33 !important; border-color: #1e3a5f !important; }
    .em-text { color: #e8f4ff !important; }
    .em-muted { color: #8ba3c4 !important; }
    .em-accent { color: #3ab8ff !important; }
    .em-label { color: #8ba3c4 !important; }
    .em-divider { border-color: #1e3a5f !important; }
    .em-row td { border-color: #1e3a5f !important; }
    .em-msg { background-color: #0a1120 !important; border-color: #1e3a5f !important; color: #d0dcea !important; }
    .em-btn { background-color: #3ab8ff !important; color: #0c1424 !important; }
    .em-footer { color: #5a7394 !important; }
    .em-footer a { color: #3ab8ff !important; }
  }
`;

function emailShell(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${title}</title>
<style>
  ${DARK_MODE_CSS}
</style>
</head>
<body class="em-wrap" style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;">
  <!-- Logo -->
  <tr><td style="padding:0 0 24px;">
    <span class="em-accent" style="font-size:32px;font-weight:700;color:#1478c2;letter-spacing:-1px;">K</span>
  </td></tr>
  ${content}
  <!-- Footer -->
  <tr><td class="em-footer" style="padding:24px 0 0;text-align:center;font-size:12px;color:#94a3b8;">
    <a class="em-footer" href="https://kristianhans.com" style="color:#1478c2;text-decoration:none;">kristianhans.com</a>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildOwnerNotification(input: OwnerTemplateInput) {
  const eName = escapeHtml(input.name);
  const eEmail = escapeHtml(input.email);
  const eCompany = input.company ? escapeHtml(input.company) : null;
  const eSubject = escapeHtml(input.subject);
  const eMessage = escapeHtml(input.message).replaceAll("\n", "<br />");

  const companyRow = eCompany
    ? `<tr class="em-row"><td class="em-label" style="padding:10px 14px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;width:90px;vertical-align:top;border-bottom:1px solid #e8ecf1;">Company</td><td class="em-text" style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #e8ecf1;">${eCompany}</td></tr>`
    : "";

  const html = emailShell(
    "New contact submission",
    `<tr><td class="em-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <!-- Header bar -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr><td class="em-accent" style="padding:16px 20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1478c2;">New Contact Submission</td></tr>
      </table>
      <!-- Details -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 20px;width:calc(100% - 40px);">
        <tr class="em-row"><td class="em-label" style="padding:10px 14px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;width:90px;vertical-align:top;border-bottom:1px solid #e8ecf1;">From</td><td class="em-text" style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #e8ecf1;">${eName}</td></tr>
        <tr class="em-row"><td class="em-label" style="padding:10px 14px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;width:90px;vertical-align:top;border-bottom:1px solid #e8ecf1;">Email</td><td class="em-text" style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #e8ecf1;"><a style="color:#1478c2;text-decoration:none;" href="mailto:${eEmail}">${eEmail}</a></td></tr>
        ${companyRow}
        <tr class="em-row"><td class="em-label" style="padding:10px 14px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;width:90px;vertical-align:top;border-bottom:1px solid #e8ecf1;">Subject</td><td class="em-text" style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #e8ecf1;">${eSubject}</td></tr>
      </table>
      <!-- Message -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:20px;">
        <tr><td class="em-label" style="padding:0 0 8px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;">Message</td></tr>
        <tr><td class="em-msg" style="padding:16px;background:#f8fafc;border:1px solid #e8ecf1;border-radius:8px;color:#334155;font-size:14px;line-height:1.65;">${eMessage}</td></tr>
      </table>
      <!-- Reply action -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:0 20px 20px;">
        <tr><td align="left">
          <a class="em-btn" href="mailto:${eEmail}?subject=Re: ${encodeURIComponent(input.subject)}" style="display:inline-block;padding:10px 24px;background:#1478c2;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:6px;">Reply to ${eName}</a>
        </td></tr>
      </table>
    </td></tr>`,
  );

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
    html,
  };
}

export function buildAcknowledgment(input: AcknowledgmentTemplateInput) {
  const eName = escapeHtml(input.name);
  const eSubject = escapeHtml(input.subject);

  const html = emailShell(
    `Received: ${escapeHtml(input.subject)}`,
    `<tr><td class="em-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:28px 24px;">
      <p class="em-text" style="margin:0 0 16px;color:#1e293b;font-size:15px;line-height:1.6;">Hi ${eName},</p>
      <p class="em-text" style="margin:0 0 16px;color:#1e293b;font-size:15px;line-height:1.6;">Your message regarding <strong>${eSubject}</strong> has been received. I will review it and get back to you shortly.</p>
      <p class="em-text" style="margin:0;color:#1e293b;font-size:15px;line-height:1.6;">Kristian</p>
    </td></tr>`,
  );

  return {
    subject: `Received: ${input.subject}`,
    text: [
      `Hi ${input.name},`,
      "",
      `Your message regarding "${input.subject}" has been received. I will review it and get back to you shortly.`,
      "",
      "Kristian",
    ].join("\n"),
    html,
  };
}
