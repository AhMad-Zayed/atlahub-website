import { redirect } from 'next/navigation';

export default async function AdminIndexPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/admin/login`);
}
