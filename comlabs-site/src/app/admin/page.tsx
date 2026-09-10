import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AdminDashboard } from '@/components/hml/AdminDashboard';
import { AdminLogin } from '@/components/hml/AdminLogin';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { agency, admin } from '@/config/agency';
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/admin-auth';
import { listInquiries } from '@/lib/inquiries';
import { mailStatus } from '@/lib/mailer';
import { providerStatus } from '@/lib/models';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: `Studio — ${agency.name}` },
  description: admin.body,
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const authed = verifyAdminToken(token);

  if (!authed) {
    return (
      <HmlPageShell>
        <AdminLogin />
      </HmlPageShell>
    );
  }

  const inquiries = await listInquiries();

  return (
    <HmlPageShell>
      <AdminDashboard
        inquiries={inquiries}
        providers={providerStatus()}
        mail={mailStatus()}
        endpoint="/api/mcp"
      />
    </HmlPageShell>
  );
}
