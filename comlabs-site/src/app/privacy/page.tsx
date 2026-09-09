import { LegalPage } from '@/components/LegalPage';
import { privacyPage } from '@/config/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy',
  description:
    'Placeholder privacy policy shipped with the Relay template, including a security section — replace it with a policy reviewed by your own counsel.',
  path: '/privacy',
});

export default function Privacy() {
  return (
    <LegalPage
      title={privacyPage.title}
      updated={privacyPage.updated}
      intro={privacyPage.intro}
      sections={privacyPage.sections}
    />
  );
}
