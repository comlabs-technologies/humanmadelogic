import { NextResponse } from 'next/server';
import { mailStatus } from '@/lib/mailer';
import { providerStatus } from '@/lib/models';
import { connectGuide } from '@/lib/studio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return NextResponse.json({
    ok: true,
    endpoint: `${origin}/api/mcp`,
    providers: providerStatus(),
    mail: mailStatus(),
    connect: connectGuide(origin),
  });
}
