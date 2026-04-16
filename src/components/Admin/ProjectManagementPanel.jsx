'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { PenLine, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_OPTIONS = ['Pipeline', 'Review', 'Needs Revision', 'Approved', 'Completed'];

export default function ProjectManagementPanel({ project, updateAction, deleteAction, changeStatusAction }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [clientName, setClientName] = useState(project.client_name);
  const [status, setStatus] = useState(project.status);
  const [deletePhrase, setDeletePhrase] = useState('');

  const [updateState, updateFormAction, isUpdating] = useActionState(updateAction, { success: null, error: null });
  const [deleteState, deleteFormAction, isDeleting] = useActionState(deleteAction, { success: null, error: null });
  const [statusState, statusFormAction, isStatusUpdating] = useActionState(changeStatusAction, { success: null, error: null });

  const closeModal = () => {
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setTitle(project.title);
    setClientName(project.client_name);
    setStatus(project.status);
    setDeletePhrase('');
  };

  useEffect(() => {
    if (updateState?.success === true) {
      toast.success('Project updated successfully.');
      closeModal();
    } else if (updateState?.success === false) {
      toast.error(updateState?.error || 'Unable to update project.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateState?.success]);

  useEffect(() => {
    if (deleteState?.success === true) {
      toast.success('Project deleted successfully.');
      closeModal();
    } else if (deleteState?.success === false) {
      toast.error(deleteState?.error || 'Unable to delete project.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState?.success]);

  useEffect(() => {
    if (statusState?.success === true) {
      toast.success('Status updated.');
    } else if (statusState?.success === false) {
      toast.error(statusState?.error || 'Unable to update status.');
    }
  }, [statusState?.success, statusState?.error]);

  const deleteDisabled = useMemo(() => deletePhrase.trim().toUpperCase() !== 'DELETE', [deletePhrase]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => setIsEditOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/15"
      >
        <PenLine className="h-4 w-4" />
        Edit
      </button>

      <button
        type="button"
        onClick={() => setIsDeleteOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>

      <form action={statusFormAction} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="projectId" value={project.id} />
        <div className="relative">
          <select
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="appearance-none rounded-full border border-white/10 bg-slate-900/80 py-2 pl-4 pr-10 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-slate-950 text-white">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        <button
          type="submit"
          disabled={isStatusUpdating}
          className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Save
        </button>
      </form>

      {isEditOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_rgba(2,8,24,0.85)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">Project Controls</p>
                <h2 className="mt-2 text-3xl font-cairo font-bold text-white">Edit project details</h2>
              </div>
              <button type="button" onClick={closeModal} className="text-slate-400 transition hover:text-white">
                Close
              </button>
            </div>

            <form action={updateFormAction} className="mt-6 grid gap-4">
              <input type="hidden" name="projectId" value={project.id} />
              <div>
                <label className="font-semibold text-slate-200">Client Name</label>
                <input
                  name="client_name"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-200">Project Title</label>
                <input
                  name="project_title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isDeleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-xl rounded-[2rem] border border-rose-500/25 bg-slate-950/95 p-6 shadow-[0_40px_120px_rgba(2,8,24,0.85)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-rose-300">Danger Zone</p>
                <h2 className="mt-2 text-3xl font-cairo font-bold text-white">Delete this project?</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  This will permanently remove the client project, tokens, submission data, and related assets. This action cannot be undone.
                </p>
              </div>
              <button type="button" onClick={closeModal} className="text-slate-400 transition hover:text-white">
                Close
              </button>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-rose-500/20 bg-rose-500/10 p-4">
              <p className="text-sm text-rose-100">
                Type <span className="font-semibold">DELETE</span> to confirm.
              </p>
              <input
                value={deletePhrase}
                onChange={(e) => setDeletePhrase(e.target.value)}
                placeholder="DELETE"
                className="mt-3 w-full rounded-3xl border border-rose-500/20 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-300/20"
              />
            </div>

            <form action={deleteFormAction} className="mt-6 flex flex-wrap gap-3">
              <input type="hidden" name="projectId" value={project.id} />
              <button
                type="submit"
                disabled={deleteDisabled || isDeleting}
                className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Permanently Delete
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
