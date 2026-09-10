import { NextResponse } from 'next/server';
import { contact } from '@/config/agency';
import { validateContact, type ContactFields } from '@/lib/contact';
import { saveInquiry } from '@/lib/inquiries';
import { sendInquiryEmail } from '@/lib/mailer';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  let body: Partial<ContactFields> & { website?: string };
  try {
    body = (await request.json()) as Partial<ContactFields> & { website?: string };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const fields: ContactFields = {
    name: String(body.name || ''),
    email: String(body.email || ''),
    company: String(body.company || ''),
    topic: String(body.topic || contact.topics[0]),
    message: String(body.message || ''),
  };

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  let emailed = false;
  try {
    emailed = await sendInquiryEmail({ ...fields, source: 'contact' });
  } catch {
    emailed = false;
  }

  const inquiry = await saveInquiry(fields, { emailed, source: 'contact' });

  return NextResponse.json({
    ok: true,
    id: inquiry.id,
    emailed,
  });
}
