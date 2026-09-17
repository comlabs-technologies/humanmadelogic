import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { mailDiagnostics, verifyMail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Connects to the SMTP host and authenticates without sending anything, so a
 * failing form can be diagnosed from the deployed environment rather than
 * guessed at. Admin-only: the reason it returns is the provider's own error.
 */
export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorised.' }, { status: 401 });
  }

  const check = await verifyMail();

  return NextResponse.json({
    ok: true,
    verified: check.ok,
    reason: check.ok ? null : check.reason,
    mail: mailDiagnostics(),
  });
}
