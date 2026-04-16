import { redirect } from 'next/navigation';

export default async function LegacyTokenRedirect({ params }) {
  const resolvedParams = await params;
  const { lang, token } = resolvedParams;

  if (token === 'portal') {
    // If the folder overlap happens, we shouldn't redirect portal to portal
    return null;
  }

  // Preserve the secure line by seamlessly transitioning legacy paths to the new architecture
  redirect(`/${lang}/onboarding/portal?t=${token}`);
}
