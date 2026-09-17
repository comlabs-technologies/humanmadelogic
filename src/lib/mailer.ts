import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { Inquiry } from './inquiries';

/**
 * Enquiry delivery over Google's SMTP.
 *
 * Gmail and Google Workspace both require an App Password here — a normal
 * account password is rejected, and the account must have 2-Step Verification
 * switched on before App Passwords can be generated. Google also insists the
 * envelope sender matches the authenticated user (or one of its verified
 * "Send mail as" aliases), so the visitor's address goes in `replyTo` rather
 * than `from`.
 */

export const CONTACT_TO = process.env.CONTACT_TO || 'info@humanmadelogic.fun';

/** Copied on every enquiry. Comma-separate the env var for more recipients. */
export const CONTACT_CC = (process.env.CONTACT_CC || 'kuntal@humanmadelogic.fun')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
/** Implicit TLS on 465, STARTTLS on 587. */
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === 'true'
  : SMTP_PORT === 465;

const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'Human Made Logic';

export function mailConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS);
}

export function mailStatus() {
  return {
    to: CONTACT_TO,
    cc: CONTACT_CC,
    provider: `smtp:${SMTP_HOST}`,
    configured: mailConfigured(),
    from: SMTP_FROM,
  };
}

let transporter: Transporter | null = null;

function getTransport() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // A serverless invocation must not hang on a silent SMTP port.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type InquiryPayload = Omit<Inquiry, 'id' | 'createdAt' | 'emailed' | 'read'> & { id?: string };

function buildBody(inquiry: InquiryPayload) {
  const rows: Array<[string, string]> = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Company', inquiry.company || '—'],
    ['Topic', inquiry.topic],
    ['Source', inquiry.source],
  ];

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', inquiry.message].join(
    '\n',
  );

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#151515;line-height:1.55">
      <p style="text-transform:uppercase;letter-spacing:0.18em;font-size:11px;color:#6B6A66;margin:0 0 4px">Human Made Logic</p>
      <h1 style="font-size:22px;font-weight:500;letter-spacing:-0.03em;margin:0 0 20px">New studio enquiry</h1>
      ${rows
        .map(
          ([label, value]) =>
            `<p style="margin:0 0 12px"><strong>${label}</strong><br>${escapeHtml(value)}</p>`,
        )
        .join('')}
      <p style="margin:0"><strong>Message</strong><br>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>
    </div>
  `;

  return { text, html };
}

export async function sendInquiryEmail(inquiry: InquiryPayload) {
  if (!mailConfigured()) {
    // Surface it rather than reporting a send that never happened. The
    // caller still persists the enquiry, so nothing is lost.
    throw new Error('SMTP_USER / SMTP_PASS are not set — enquiry saved but not emailed');
  }

  const { text, html } = buildBody(inquiry);

  await getTransport().sendMail({
    from: { address: SMTP_FROM, name: SMTP_FROM_NAME },
    to: CONTACT_TO,
    cc: CONTACT_CC.length > 0 ? CONTACT_CC : undefined,
    // Replying from the inbox goes straight back to the enquirer.
    replyTo: inquiry.email,
    subject: `New enquiry — ${inquiry.name} (${inquiry.topic})`,
    text,
    html,
  });

  return true;
}
