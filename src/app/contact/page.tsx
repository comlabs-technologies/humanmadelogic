import type { Metadata } from 'next';
import { ContactView } from '@/components/hml/ContactView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { agency, contact } from '@/config/agency';

export const metadata: Metadata = {
  title: { absolute: `Contact — ${agency.name}` },
  description: contact.body,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <HmlPageShell>
      <ContactView />
    </HmlPageShell>
  );
}
