'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyOnboardingLink({ lang, token }) {
  const locale = String(lang || 'en').startsWith('ar') ? 'ar' : 'en';
  const path = `/${locale}/onboarding/portal?t=${token}`;
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => {
    if (typeof window === 'undefined') return path;
    return `${window.location.origin}${path}`;
  }, [path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      toast.success('Onboarding link copied.');
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error('Unable to copy link. Please copy manually.');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Link
        href={path}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/15"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        <span className="font-mono">{path}</span>
      </Link>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
        aria-label="Copy onboarding link"
      >
        <Copy className="h-3.5 w-3.5" />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

