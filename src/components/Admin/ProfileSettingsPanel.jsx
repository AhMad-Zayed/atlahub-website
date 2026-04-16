'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProfileSettingsPanel({ user, updateAction }) {
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');

  const [state, formAction, isPending] = useActionState(updateAction, { success: null, error: null });
  const canUpdate = Boolean(user?.id);

  useEffect(() => {
    if (state?.success === true) {
      toast.success('Profile updated.');
      setPassword('');
    } else if (state?.success === false) {
      toast.error(state?.error || 'Unable to update profile.');
    }
  }, [state?.success, state?.error]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Profile Settings</p>
        <h2 className="mt-3 text-2xl font-bold text-white">Your Admin Identity</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-400">
          Update your username and rotate your password. Passwords are hashed before being stored in MySQL.
        </p>
      </div>

      {!canUpdate ? (
        <div className="rounded-[1.6rem] border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
          Your current session is authenticated via fallback credentials (not a database-backed user). Create a user in “Team Settings”, sign in with it, then you can update your profile here.
        </div>
      ) : (
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Username</span>
            <input
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>New Password</span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
            />
            <p className="text-xs text-slate-500">Leave blank to preserve your existing password.</p>
          </label>

          <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

