import { redirect } from 'next/navigation';

export default function AdminIndexPage({ params }) {
  redirect(`/${params.lang}/admin/login`);
}
