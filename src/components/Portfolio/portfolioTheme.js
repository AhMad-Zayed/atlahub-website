export const PORTFOLIO_THEME = {
  software: {
    accent: 'from-orange-400 via-rose-400 to-pink-500',
    ring: 'border-orange-300/45',
    glow: 'shadow-[0_28px_90px_rgba(251,146,60,0.18)]',
    chip: 'bg-orange-400/12 text-orange-100',
    surface: 'from-[#fff4eb] via-[#fff8f1] to-[#fff2f6]',
    frame: 'min-h-[18rem]',
  },
  media: {
    accent: 'from-pink-500 via-rose-400 to-red-400',
    ring: 'border-pink-300/45',
    glow: 'shadow-[0_28px_90px_rgba(236,72,153,0.18)]',
    chip: 'bg-pink-500/12 text-pink-100',
    surface: 'from-[#fff1f7] via-[#fff4f8] to-[#fff7f2]',
    frame: 'min-h-[16rem]',
  },
  training: {
    accent: 'from-red-500 via-pink-500 via-orange-400 to-cyan-400',
    ring: 'border-rose-300/40',
    glow: 'shadow-[0_28px_90px_rgba(244,63,94,0.18)]',
    chip: 'bg-slate-950/78 text-white',
    surface: 'from-[#fff1f2] via-[#fff3f8] via-[#fff8ef] to-[#eefcff]',
    frame: 'min-h-[15rem]',
  },
  marketing: {
    accent: 'from-red-500 via-orange-400 to-amber-300',
    ring: 'border-red-300/45',
    glow: 'shadow-[0_28px_90px_rgba(248,113,113,0.18)]',
    chip: 'bg-red-400/12 text-red-100',
    surface: 'from-[#fff1ee] via-[#fff8f0] to-[#fff5ea]',
    frame: 'min-h-[17rem]',
  },
  design: {
    accent: 'from-[#14213d] via-[#1d4ed8] to-[#fb7185]',
    ring: 'border-blue-300/40',
    glow: 'shadow-[0_28px_90px_rgba(29,78,216,0.18)]',
    chip: 'bg-blue-400/12 text-blue-50',
    surface: 'from-[#eef4ff] via-[#fff7fb] to-[#fff3ef]',
    frame: 'min-h-[18rem]',
  },
  default: {
    accent: 'from-emerald-400 via-sky-500 to-blue-600',
    ring: 'border-white/15',
    glow: 'shadow-[0_28px_90px_rgba(59,130,246,0.16)]',
    chip: 'bg-white/10 text-white',
    surface: 'from-[#f4f9ff] via-[#fff8fb] to-[#f8fbff]',
    frame: 'min-h-[17rem]',
  },
};

export function getPortfolioTheme(id) {
  return PORTFOLIO_THEME[id] || PORTFOLIO_THEME.default;
}
