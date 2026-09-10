import { LegalPage } from '@/components/LegalPage';
import { termsPage } from '@/config/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms',
  description:
    'Placeholder terms of service shipped with the Relay template, including template licence notes — replace before launch.',
  path: '/terms',
});

export default function Terms() {
  return (
    <LegalPage
      title={termsPage.title}
      updated={termsPage.updated}
      intro={termsPage.intro}
      sections={termsPage.sections}
    />
  );
}
