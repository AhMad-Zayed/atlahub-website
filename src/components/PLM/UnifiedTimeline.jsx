'use client';
import { motion } from 'framer-motion';

export default function UnifiedTimeline({ events }) {
  if (!events || events.length === 0) {
    return <p className="text-sm text-slate-500">No events logged yet.</p>;
  }

  return (
    <div className="relative border-l border-white/10 pl-6 space-y-8 py-4">
      {events.map((event, idx) => (
        <motion.div
          key={event.id || idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative"
        >
          <span className="absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-cyan-300">
              {new Date(event.createdAt).toLocaleString()}
            </span>
            <span className="font-semibold text-white">{event.title}</span>
            {event.description && (
              <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-white/5 mt-1 align-left">
                {event.description}
              </p>
            )}
            <span className="text-xs font-medium text-slate-500 mt-1">
              Actor: {event.actor}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
