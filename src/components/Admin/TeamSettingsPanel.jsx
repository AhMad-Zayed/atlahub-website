'use client';

import { useState } from 'react';

export default function TeamSettingsPanel({ users, createAction, updateAction, deleteAction }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const beginEdit = (user) => {
    setEditingUserId(user.id);
    setEditUsername(user.username || '');
    setEditPassword('');
    setConfirmDelete(null);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Team Settings</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Admin Users</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-400">
            Manage user credentials stored in the users table. Edit usernames, rotate passwords, or remove stale admin accounts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 text-slate-300">
            No admin users found in the database yet.
          </div>
        ) : (
          users.map((user) => (
            <article key={user.id} className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{user.username}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">ID #{user.id}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => beginEdit(user)}
                    className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/15"
                  >
                    Edit
                  </button>
                  {confirmDelete === user.id ? (
                    <form action={deleteAction} className="inline-flex">
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                      >
                        Confirm Delete
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(user.id)}
                      className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              {editingUserId === user.id ? (
                <form action={updateAction} className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="userId" value={user.id} />
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Username</span>
                    <input
                      name="username"
                      value={editUsername}
                      onChange={(event) => setEditUsername(event.target.value)}
                      className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-200">
                    <span>Password</span>
                    <input
                      name="password"
                      type="password"
                      value={editPassword}
                      onChange={(event) => setEditPassword(event.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    <p className="text-xs text-slate-500">Leave blank to preserve the existing password.</p>
                  </label>
                  <div className="sm:col-span-2 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                    >
                      Save User
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingUserId(null)}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : null}
            </article>
          ))
        )}
      </div>

      <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Create New Admin User</p>
        <form action={createAction} className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Username</span>
            <input
              name="username"
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
            />
          </label>

          <button
            type="submit"
            className="sm:col-span-2 rounded-full bg-gradient-to-r from-emerald-400 to-lime-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            Create Admin User
          </button>
        </form>
      </div>
    </div>
  );
}
