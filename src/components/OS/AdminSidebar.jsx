'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Zap, FolderOpen, Settings,
  ChevronRight, Activity, MonitorPlay, ChevronDown
} from 'lucide-react';
import { useState } from 'react';

const NAV_GROUPS = [
  {
    label: 'Workspace',
    items: [
      { href: '/admin/dashboard', label: 'Mission Control', icon: LayoutDashboard },
      { href: '/admin/clients', label: 'Client Directory', icon: Users },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/agency', label: 'Ad-Ops & Funding', icon: Zap },
      { href: '/admin/dashboard/portfolio', label: 'Portfolio Registry', icon: MonitorPlay },
      { href: '/admin/onboarding', label: 'Pipeline Manager', icon: FolderOpen },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
];

function NavItem({ href, label, icon: Icon, lang }) {
  const pathname = usePathname();
  const fullHref = `/${lang}${href}`;
  const isActive = pathname === fullHref || (href !== '/admin/dashboard' && pathname.startsWith(fullHref));

  return (
    <Link
      href={fullHref}
      className={`group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all duration-150 ${
        isActive
          ? 'bg-white/[0.06] text-white'
          : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
      }`}
    >
      <Icon size={15} className={isActive ? 'text-[#6d28d9]' : 'text-gray-600 group-hover:text-gray-400'} />
      <span className="flex-1 tracking-tight">{label}</span>
      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#6d28d9]" />}
    </Link>
  );
}

function NavGroup({ group, lang }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-600 hover:text-gray-400 transition-colors"
      >
        {group.label}
        <ChevronDown size={11} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <div className="mt-0.5 space-y-0.5">
          {group.items.map(item => (
            <NavItem key={item.href} {...item} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSidebar({ lang, logoutAction }) {
  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-[#1e1e1e] bg-[#0a0a0a]">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[#1e1e1e] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6d28d9]">
          <span className="text-xs font-bold text-white">A</span>
        </div>
        <div>
          <span className="block text-sm font-semibold tracking-tight text-white">AtlaHub OS</span>
          <span className="block text-[10px] text-gray-600 font-mono">v2.0 Console</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto p-3 pt-4 no-scrollbar">
        {NAV_GROUPS.map(group => (
          <NavGroup key={group.label} group={group} lang={lang} />
        ))}
      </nav>

      {/* Server status + logout */}
      <div className="border-t border-[#1e1e1e] p-3">
        <div className="mb-2 flex items-center justify-between rounded-md bg-[#111] px-3 py-2 border border-[#222]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] text-gray-400">Neon DB · Live</span>
          </div>
          <Activity size={12} className="text-gray-600" />
        </div>
        {logoutAction && (
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-md border border-[#222] bg-[#111] px-3 py-2 text-xs text-gray-500 transition hover:border-red-900/50 hover:bg-red-950/20 hover:text-red-400"
            >
              Sign out
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
