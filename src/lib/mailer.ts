import type { Inquiry } from './inquiries';

/**
 * Enquiry delivery via the Brevo transactional API.
 *
 * Deliberately HTTP rather than SMTP: serverless functions cannot reliably
 * hold an outbound SMTP connection, and a blocked port fails silently at the
 * worst possible moment. A `fetch` to Brevo either returns 2xx or tells us
 * why, and needs no dependency.
 */

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

export const CONTACT_TO = process.env.CONTACT_TO || 'info@humanmadelogic.fun';

/** Copied on every enquiry. Comma-separate the env var for more recipients. */
export const CONTACT_CC = (process.env.CONTACT_CC || 'kuntal@humanmadelogic.fun')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

/**
 * The verified sender. Brevo rejects anything that is not a verified sender
 * or an authenticated domain, so this must match what is set up in the
 * Brevo account — it is not the visitor's address.
 */
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || CONTACT_TO;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Human Made Logic';

export function mailConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

export function mailStatus() {
  return {
    to: CONTACT_TO,
    cc: CONTACT_CC,
    provider: 'brevo' as const,
    configured: mailConfigured(),
    from: SENDER_EMAIL,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildBody(inquiry: InquiryPayload) {
  const rows: Array<[string, string]> = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Company', inquiry.company || '—'],
    ['Topic', inquiry.topic],
    ['Source', inquiry.source],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    inquiry.message,
  ].join('\n');

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

type InquiryPayload = Omit<Inquiry, 'id' | 'createdAt' | 'emailed' | 'read'> & { id?: string };

export async function sendInquiryEmail(inquiry: InquiryPayload) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    // Surface it rather than reporting a send that never happened. The
    // caller still persists the enquiry, so nothing is lost.
    throw new Error('BREVO_API_KEY is not set — enquiry saved but not emailed');
  }

  const { text, html } = buildBody(inquiry);

  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email: CONTACT_TO }],
      ...(CONTACT_CC.length > 0 ? { cc: CONTACT_CC.map((email) => ({ email })) } : {}),
      // Replying from the inbox goes straight back to the enquirer.
      replyTo: { email: inquiry.email, name: inquiry.name || inquiry.email },
      subject: `New enquiry — ${inquiry.name} (${inquiry.topic})`,
      textContent: text,
      htmlContent: html,
      tags: ['website-enquiry', inquiry.source],
    }),
    // Never let a hung provider hold the request open.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Brevo rejected the message (${response.status}): ${detail.slice(0, 300)}`);
  }

  return true;
}
