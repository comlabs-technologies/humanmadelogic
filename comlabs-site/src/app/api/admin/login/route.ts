import { NextResponse } from 'next/server';
import { adminCookieHeader, adminPasswordConfigured, passwordsMatch, signAdminToken } from '@/lib/admin-auth';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json({ ok: false, error: 'ADMIN_PASSWORD is not set.' }, { status: 503 });
  }

  if (!rateLimit(`admin:${clientKey(request)}`, 12, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many attempts.' }, { status: 429 });
  }

  let password = '';
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password || '');
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!passwordsMatch(password)) {
    return NextResponse.json({ ok: false, error: 'That password is not right.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', adminCookieHeader(signAdminToken()));
  return response;
}
