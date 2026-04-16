'use client';

import { motion } from 'framer-motion';

function GlassCard({ title, subtitle, children, accent = 'from-cyan-400/40 to-sky-500/20' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(2,6,23,0.4)] backdrop-blur-xl"
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${accent} blur-3xl`} />
      <p className="relative z-10 font-tajawal text-xs uppercase tracking-[0.3em] text-slate-400">{subtitle}</p>
      <h3 className="relative z-10 mt-3 font-cairo text-2xl font-bold text-white">{title}</h3>
      <div className="relative z-10 mt-5">{children}</div>
    </motion.section>
  );
}

function Bars({ items = [], keyName = 'key', valueName = 'count', color = 'from-cyan-400 to-sky-500' }) {
  const maxValue = Math.max(...items.map((item) => Number(item[valueName]) || 0), 1);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const value = Number(item[valueName]) || 0;
        const width = Math.max(8, Math.round((value / maxValue) * 100));
        return (
          <div key={item[keyName]} className="space-y-1">
            <div className="flex items-center justify-between font-tajawal text-xs text-slate-300">
              <span className="truncate pe-3">{item[keyName]}</span>
              <span className="font-semibold text-white">{value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${width}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function UserJourneyMap({ summary }) {
  const conversion = summary?.conversionBySource || [];
  const heatmap = summary?.technicalInterestHeatmap || [];
  const geo = summary?.geoTraffic || [];
  const specs = summary?.techSpecs || [];
  const totals = summary?.totals || {};
  const uniqueVsReturning = summary?.uniqueVsReturning || { unique: 0, returning: 0 };
  const timeline = summary?.userJourneyTimeline || [];
  const hotzones = summary?.hotzones || [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Reach', value: totals.total_reach || 0, color: 'text-cyan-300' },
          { label: 'Project Engagement', value: totals.project_engagement || 0, color: 'text-pink-300' },
          { label: 'Unique Identities', value: totals.unique_identities || 0, color: 'text-emerald-300' },
          { label: 'Qualified Leads', value: totals.qualified_leads || 0, color: 'text-amber-300' },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 backdrop-blur-xl"
          >
            <p className="font-tajawal text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
            <p className={`mt-2 font-cairo text-3xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard title="Conversion By Source" subtitle="Acquisition Intelligence">
          <div className="space-y-3">
            {conversion.map((entry) => (
              <div key={entry.source} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-tajawal text-sm font-semibold text-white">{entry.source}</p>
                  <p className="font-cairo text-lg font-bold text-cyan-300">{entry.conversion_rate}%</p>
                </div>
                <p className="mt-1 font-tajawal text-xs text-slate-400">
                  Sessions: {entry.sessions} | Leads: {entry.leads}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Unique Vs Returning" subtitle="Visitor Identity Matrix" accent="from-emerald-400/40 to-cyan-500/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-tajawal text-xs uppercase tracking-[0.2em] text-slate-400">Unique</p>
              <p className="mt-2 font-cairo text-3xl font-bold text-emerald-300">{uniqueVsReturning.unique || 0}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-tajawal text-xs uppercase tracking-[0.2em] text-slate-400">Returning</p>
              <p className="mt-2 font-cairo text-3xl font-bold text-pink-300">{uniqueVsReturning.returning || 0}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Hotzone Projects" subtitle="Click Heat Bar Chart" accent="from-pink-400/40 to-red-500/20">
          <Bars items={hotzones.map((item) => ({ key: item.project, count: item.clicks }))} color="from-pink-400 to-red-500" />
        </GlassCard>

        <GlassCard title="User Journey Timeline" subtitle="Project Dwell & Path" accent="from-amber-400/40 to-orange-500/20">
          <div className="max-h-72 space-y-3 overflow-auto pe-1">
            {timeline.map((event) => (
              <div key={`${event.created_at}-${event.visitor}-${event.project}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="font-tajawal text-sm font-semibold text-white">
                  Visitor {String(event.visitor || '').slice(0, 10)}... viewed {event.project}
                </p>
                <p className="mt-1 font-tajawal text-xs text-slate-400">
                  {event.action === 'dwell_time'
                    ? `Stayed ${Math.round((event.dwell_ms || 0) / 1000)}s`
                    : 'Clicked project hotspot'}
                  {' '}| Source: {event.source_host}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Geo Distribution" subtitle="Geo Location Intelligence" accent="from-cyan-400/40 to-indigo-500/20">
          <Bars items={geo.map((item) => ({ key: item.key, count: item.count }))} />
        </GlassCard>

        <GlassCard title="Tech Specs Matrix" subtitle="Platform & Device Signals" accent="from-emerald-400/40 to-lime-500/20">
          <Bars items={specs.map((item) => ({ key: item.key, count: item.count }))} color="from-emerald-400 to-lime-500" />
        </GlassCard>

        <GlassCard title="Technical Interest Heatmap" subtitle="Engagement Density" accent="from-fuchsia-400/40 to-pink-500/20">
          <div className="space-y-3">
            {heatmap.map((entry) => (
              <div key={entry.section} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="font-tajawal text-sm font-semibold text-white">{entry.section}</p>
                <p className="mt-1 font-tajawal text-xs text-slate-400">
                  Interactions: {entry.interactions} | Clicks: {entry.clicks} | Avg Dwell: {entry.avg_dwell_seconds}s
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
