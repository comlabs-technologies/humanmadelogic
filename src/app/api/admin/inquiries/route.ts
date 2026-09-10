import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { listInquiries, markInquiryRead } from '@/lib/inquiries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, inquiries: await listInquiries() });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  }

  let id = '';
  let read = true;
  try {
    const body = (await request.json()) as { id?: string; read?: boolean };
    id = String(body.id || '');
    read = body.read !== false;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const inquiry = await markInquiryRead(id, read);
  if (!inquiry) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, inquiry });
}
