'use client';

import { use } from 'react';
import { useFormState } from 'react-dom';
import { handleLogin } from '../actions';

export default function LoginPage({ params }) {
  const { lang } = use(params);
  const loginAction = handleLogin.bind(null, lang);
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-cairo">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-blue">
            Atla Hub Tech - Admin Portal
          </h1>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <form className="space-y-6" action={formAction}>
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
              placeholder="Password"
            />
          </div>
          {state?.error && <p className="text-sm text-red-500 text-center">{state.error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-light hover:to-brand-blue transition-all"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
