'use client';

import { use } from 'react';
import { useActionState } from 'react';
import { handleLogin } from '../actions';
import { AUTH_INITIAL_STATE } from '@/lib/constants';

function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue-light px-4 py-3 font-cairo text-lg font-bold text-white shadow-[0_20px_60px_rgba(0,86,179,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_24px_70px_rgba(0,170,255,0.34)]"
    >
      Sign In
    </button>
  );
}

export default function LoginPage({ params }) {
  const { lang } = use(params);
  const loginAction = handleLogin.bind(null, lang);
  const [state, formAction, isPending] = useActionState(loginAction, AUTH_INITIAL_STATE);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,170,255,0.2),transparent_30%),linear-gradient(180deg,#08111d_0%,#0d1728_100%)] px-6 font-cairo">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-[0_30px_100px_rgba(2,6,23,0.35)] backdrop-blur">
        <div className="text-center">
          <p className="font-tajawal text-xs uppercase tracking-[0.4em] text-slate-500">
            Secure Access
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">
            Atla Hub Tech Admin Portal
          </h1>
          <p className="mt-3 font-tajawal text-sm leading-7 text-slate-600">
            Sign in with your administrator account to manage the platform securely.
          </p>
        </div>

        <form className="mt-8 space-y-5" action={formAction}>
          <div>
            <label htmlFor="username" className="mb-2 block font-tajawal text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-tajawal text-sm text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-tajawal text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-tajawal text-sm text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your password"
            />
          </div>

          {state?.error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-tajawal text-sm text-rose-600">
              {state.error}
            </div>
          ) : null}

          <div className={isPending ? 'pointer-events-none opacity-80' : ''}>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
