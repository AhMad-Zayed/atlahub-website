'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight, Bell } from 'lucide-react';

const PATH_LABELS = {
  dashboard: 'Mission Control',
  clients:   'Client Directory',
  agency:    'Ad-Ops & Funding',
  portfolio: 'Portfolio Registry',
  onboarding:'Pipeline Manager',
  settings:  'Settings',
  login:     'Login',
};

function getBreadcrumbs(pathname, lang) {
  const segments = pathname
    .replace(`/${lang}/admin`, '')
    .split('/')
    .filter(Boolean);

  return segments.map((seg, i) => ({
    label: PATH_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    isLast: i === segments.length - 1,
  }));
}

export default function CommandBar({ lang }) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname, lang);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a] px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-mono text-xs text-gray-500">
        <span className="text-gray-600">admin</span>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="text-gray-700" />
            <span className={crumb.isLast ? 'text-gray-200' : 'text-gray-500'}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-[#222] bg-[#111] px-3 py-1.5 font-mono text-[11px] text-gray-500">
          elite-v2-master-stable
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-md border border-[#222] bg-[#111] text-gray-500 hover:text-gray-300 transition-colors">
          <Bell size={13} />
        </button>
      </div>
    </header>
  );
}
