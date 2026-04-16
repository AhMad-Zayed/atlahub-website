import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ClientDashboardClient from './ClientDashboardClient';

export const dynamic = 'force-dynamic';

export default async function ClientTokenPage(props) {
  const params = await props.params;
  const { token, lang = 'en' } = params;

  if (!token.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    notFound();
  }

  const client = await prisma.client.findUnique({
    where: { token: token },
    include: {
      campaigns: {
        include: {
          adItems: { orderBy: { createdAt: 'desc' } },
          logs: { orderBy: { createdAt: 'desc' }, take: 10 }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-tajawal relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 flex items-center justify-between border-b border-white/5 pb-8">
          <div>
            <p className="text-amber-500/80 uppercase tracking-[0.25em] text-xs font-bold mb-2">AtlaHub Elite Portal</p>
            <h1 className="text-4xl md:text-5xl font-bold font-cairo text-white">
              {client.name}
            </h1>
          </div>
          {client.logo ? (
            <img src={client.logo} alt={client.name} className="h-16 w-16 rounded-full border border-amber-500/20 object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-amber-300 border border-amber-500/30">
              {client.name.charAt(0)}
            </div>
          )}
        </header>

        <ClientDashboardClient client={client} lang={lang} />
      </div>
    </div>
  );
}
