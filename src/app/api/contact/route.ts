import { NextResponse } from 'next/server';
import { contact } from '@/config/agency';
import { validateContact, type ContactFields } from '@/lib/contact';
import { saveInquiry } from '@/lib/inquiries';
import { describeMailError, noteMailFailure, noteMailSuccess, sendInquiryEmail } from '@/lib/mailer';
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
  let mailError: string | null = null;

  try {
    emailed = await sendInquiryEmail({ ...fields, source: 'contact' });
    noteMailSuccess();
  } catch (error) {
    mailError = describeMailError(error);
    noteMailFailure(mailError);
    // Logged so the reason shows up in the platform's function logs; the
    // visitor is never shown SMTP internals.
    console.error('[contact] enquiry email failed:', mailError);
  }

  // Persistence is a convenience for /admin, not the delivery path. A
  // read-only or full filesystem must never turn a successful send into a
  // 500 for the visitor.
  let id: string | null = null;
  try {
    id = (await saveInquiry(fields, { emailed, source: 'contact' })).id;
  } catch (error) {
    console.error('[contact] enquiry could not be stored:', (error as Error).message);
  }

  // Nothing got through: tell the visitor rather than showing a false success.
  if (!emailed && !id) {
    return NextResponse.json(
      { ok: false, error: 'We could not send your message. Please email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id, emailed });
}
