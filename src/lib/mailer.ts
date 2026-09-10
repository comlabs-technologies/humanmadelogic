import nodemailer from 'nodemailer';
import type { Inquiry } from './inquiries';

export const CONTACT_TO = process.env.CONTACT_TO || 'info@humanmadelogic.fun';

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST);
}

export function mailStatus() {
  return {
    to: CONTACT_TO,
    smtp: smtpConfigured(),
    from: process.env.SMTP_FROM || CONTACT_TO,
  };
}

function createTransport() {
  if (!smtpConfigured()) {
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendInquiryEmail(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'emailed' | 'read'> & { id?: string }) {
  const transport = createTransport();
  const subject = `New enquiry — ${inquiry.name} (${inquiry.topic})`;
  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company || '—'}`,
    `Topic: ${inquiry.topic}`,
    `Source: ${inquiry.source}`,
    '',
    inquiry.message,
  ].join('\n');

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;color:#151515;line-height:1.55">
      <p style="text-transform:uppercase;letter-spacing:0.18em;font-size:11px;color:#6B6A66">Human Made Logic</p>
      <h1 style="font-size:22px;font-weight:500;letter-spacing:-0.03em">New studio enquiry</h1>
      <p><strong>Name</strong><br>${escapeHtml(inquiry.name)}</p>
      <p><strong>Email</strong><br>${escapeHtml(inquiry.email)}</p>
      <p><strong>Company</strong><br>${escapeHtml(inquiry.company || '—')}</p>
      <p><strong>Topic</strong><br>${escapeHtml(inquiry.topic)}</p>
      <p><strong>Source</strong><br>${escapeHtml(inquiry.source)}</p>
      <p><strong>Message</strong><br>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>
    </div>
  `;

  await transport.sendMail({
    from: process.env.SMTP_FROM || CONTACT_TO,
    to: CONTACT_TO,
    replyTo: inquiry.email,
    subject,
    text,
    html,
  });

  return smtpConfigured();
}
