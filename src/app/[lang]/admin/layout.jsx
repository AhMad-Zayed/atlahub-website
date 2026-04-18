import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { handleLogout } from './actions';
import AdminSidebar from '@/components/OS/AdminSidebar';
import CommandBar from '@/components/OS/CommandBar';

// Public routes that don't need the OS shell
const PUBLIC_ROUTES = ['/login'];

export default async function AdminLayout({ children, params }) {
  const { lang } = await params;

  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;

  // Determine current path via x-pathname header isn't available here,
  // so we let the login page render without shell, others get protected
  const isAuthenticated = session === 'authenticated';

  // Bind logout
  const logoutAction = handleLogout.bind(null, lang);

  // If not authenticated, render children bare (login page handles redirect)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      <AdminSidebar lang={lang} logoutAction={logoutAction} />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <CommandBar lang={lang} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
