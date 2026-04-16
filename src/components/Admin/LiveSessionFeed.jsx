import React from 'react';

export default function LiveSessionFeed({ sessions = [] }) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">
        No active tracked sessions yet. Data will populate once consent is accepted.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="border-b border-white/10 px-6 py-5">
        <h3 className="font-cairo text-xl font-bold text-white">Live Session Feed</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-tajawal text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Device / OS</th>
              <th className="px-6 py-4 font-semibold">IP Hash</th>
              <th className="px-6 py-4 font-semibold">Steps</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {sessions.map((session) => (
              <tr key={session.id} className="transition hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" title={session.country}>
                      {session.country !== 'unknown' ? `📍 ${session.country}` : '🌐'}
                    </span>
                    <span className="truncate">{session.city !== 'unknown' ? session.city : 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-cyan-300">{session.deviceType || 'desktop'}</span>
                    <span className="text-xs text-slate-400">{session.browser} on {session.os}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-emerald-300">
                    {(session.ipHash || '').slice(0, 8)}...
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-white">{session.events?.length || 0}</span> events
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-amber-300">{session.duration || 0}s</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
