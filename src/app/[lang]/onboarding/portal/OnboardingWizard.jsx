'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudCheck, CloudOff } from 'lucide-react';
import { defaultLegacyWizardSchemaJson } from '@/lib/plm/snapshot';
import DeliverablesGallery from './DeliverablesGallery';
import UnifiedTimeline from '@/components/PLM/UnifiedTimeline';
import { addPinCommentAction, approveDeliverableAction } from './actions';

const LOCALIZED = {
  en: {
    portalBadge: 'Client Portal',
    gatewayTitle: 'Onboarding Gateway',
    intro: 'Five immersive steps to shape your brand soul, market positioning, visual vibe, media references, and final statement.',
    placeholder: [
      'Describe the brand vision, voice, values, and soulful identity in strong brand statements.',
      'Map competitors, audience positioning, and the creative edge your brand will own.',
      'Describe the visual tone, colors, typography, and imagery style your brand should express.',
      'Add reference files, URLs, keywords, or asset names that inspire the creative direction.',
      'Summarize the brand narrative and provide your final statement or sign-off.',
    ],
    saveLater: 'Save & Finish Later',
    saveContinue: 'Save & Continue',
    back: 'Back',
    autoSave: 'Draft saved automatically as you type.',
    syncSaving: 'Syncing to database…',
    syncSaved: 'Synced to database.',
    syncError: 'Sync failed.',
    noMedia: 'No media references yet. Drop files or add URLs to guide the creative team.',
    clearMedia: 'Clear Media References',
    mediaDropTitle: 'Drop reference files or paste links here',
    mediaDropDescription: 'File names and links are captured as creative direction for the project team.',
  },
  ar: {
    portalBadge: 'بوابة العميل',
    gatewayTitle: 'بوابة التهيئة',
    intro: 'خمسة خطوات غامرة لتشكيل روح العلامة التجارية، تحديد السوق، الرؤية البصرية، المراجع، والملخص النهائي.',
    placeholder: [
      'وصف رؤية العلامة التجارية، الصوت، القيم، والهوية الروحية في عبارات قوية.',
      'ارسم المنافسين، الجمهور، وميزة التموضع التي ستمتلكها العلامة.',
      'وصف نبرة التصميم، الألوان، الطباعة، والأسلوب البصري المطلوب.',
      'أضف ملفات مرجعية، روابط، أو أسماء أصول تلهم الاتجاه الإبداعي.',
      'لخص السرد العلامي وقدّم البيان النهائي أو توقيعك الرقمي.',
    ],
    saveLater: 'حفظ والانتهاء لاحقاً',
    saveContinue: 'حفظ والمتابعة',
    back: 'عودة',
    autoSave: 'يتم حفظ المسودة تلقائياً أثناء الكتابة.',
    syncSaving: 'جارٍ المزامنة مع قاعدة البيانات…',
    syncSaved: 'تمت المزامنة مع قاعدة البيانات.',
    syncError: 'فشلت المزامنة.',
    noMedia: 'لا توجد مراجع وسائط بعد. اسحب الملفات أو أضف الروابط لتوجيه الفريق الإبداعي.',
    clearMedia: 'مسح مراجع الوسائط',
    mediaDropTitle: 'أفلت ملفات المراجع أو ألصق الروابط هنا',
    mediaDropDescription: 'يتم حفظ أسماء الملفات والروابط لتوجيه الفريق الإبداعي.',
  },
};

function normalizeMediaEntries(rawMedia) {
  if (Array.isArray(rawMedia)) {
    return rawMedia.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof rawMedia === 'string') {
    return rawMedia
      .split(/\r?\n/)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return [];
}

function getFieldDefaultValue(field) {
  if (field?.type === 'multiline') {
    return [];
  }

  return '';
}

function hasFieldValue(value, field) {
  if (field?.type === 'multiline') {
    return Array.isArray(value) ? value.length > 0 : normalizeMediaEntries(value).length > 0;
  }

  return Boolean(String(value || '').trim());
}

function getResumeStep(steps, values) {
  const firstIncompleteIndex = steps.findIndex((step) => {
    if (!Array.isArray(step.fields) || step.fields.length === 0) {
      return false;
    }

    return step.fields.some((field) => field.required && !hasFieldValue(values[field.key], field));
  });

  return firstIncompleteIndex === -1 ? steps.length : Math.min(firstIncompleteIndex + 1, steps.length);
}

function getProgress(completedSteps, totalSteps) {
  return Math.round((completedSteps / totalSteps) * 100);
}

export default function OnboardingWizard({ lang = 'en', token, initialData }) {
  const locale = String(lang || 'en').startsWith('ar') ? 'ar' : 'en';
  const labels = LOCALIZED[locale];
  const validationMessages = {
    en: {
      requiredField: 'Please complete this step before moving forward.',
      requiredMedia: 'Add at least one media reference before moving on.',
      tooLong: 'Your entry is too long. Please shorten it to the allowed limit.',
    },
    ar: {
      requiredField: 'يرجى إكمال هذه الخطوة قبل المتابعة.',
      requiredMedia: 'أضف مرجع وسائط واحدًا على الأقل قبل المتابعة.',
      tooLong: 'النص طويل جدًا. يرجى تقصيره ليتناسب مع الحد المسموح.',
    },
  }[locale];

  const schemaJson = useMemo(() => {
    const snapshot = initialData?.project?.snapshot?.schemaSnapshotJson;
    if (!snapshot || !Array.isArray(snapshot.steps)) {
      return defaultLegacyWizardSchemaJson();
    }
    return snapshot;
  }, [initialData]);

  const steps = schemaJson.steps && schemaJson.steps.length ? schemaJson.steps : defaultLegacyWizardSchemaJson().steps;
  const stepCount = steps.length;
  const initialSubmission = initialData?.project?.submission || {};

  const initialValues = useMemo(() => {
    const defaults = steps.reduce((acc, step) => {
      if (!Array.isArray(step.fields)) return acc;
      step.fields.forEach((field) => {
        acc[field.key] = getFieldDefaultValue(field);
      });
      return acc;
    }, {});

    return {
      ...defaults,
      ...Object.keys(initialSubmission).reduce((acc, key) => {
        if (defaults[key] !== undefined) {
          const fieldType = steps.flatMap((step) => step.fields || []).find((field) => field.key === key)?.type;
          acc[key] = fieldType === 'multiline' ? normalizeMediaEntries(initialSubmission[key]) : String(initialSubmission[key] ?? '');
        }
        return acc;
      }, {}),
    };
  }, [initialSubmission, steps]);

  const [formValues, setFormValues] = useState(initialValues);
  const [activeStep, setActiveStep] = useState(() => getResumeStep(steps, initialValues));
  const [statusMessage, setStatusMessage] = useState(labels.autoSave);
  const [statusType, setStatusType] = useState('info');
  const [isSaving, setIsSaving] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const saveRequestRef = useRef(null);
  const saveQueuedRef = useRef(false);

  const completedSteps = useMemo(
    () => steps.filter((step) => {
      if (!Array.isArray(step.fields) || step.fields.length === 0) {
        return false;
      }
      return step.fields.every((field) => !field.required || hasFieldValue(formValues[field.key], field));
    }).length,
    [formValues, steps],
  );

  const progress = getProgress(completedSteps, stepCount);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = window.setTimeout(() => {
      saveProgress();
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [formValues]);

  async function saveProgress() {
    if (saveRequestRef.current) {
      saveQueuedRef.current = true;
      return saveRequestRef.current;
    }

    setIsSaving(true);
    setStatusType('info');
    const currentValues = formValues;

    const savePromise = (async () => {
      try {
        const response = await fetch(`/api/onboarding/portal`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(currentValues),
          cache: 'no-store',
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || 'Unable to save onboarding progress.');
        }

        setStatusType('success');
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : String(error) || (locale === 'ar' ? 'فشل الحفظ التلقائي. أعد المحاولة لاحقاً.' : 'Auto-save failed. Please retry later.'));
        setStatusType('error');
      } finally {
        setIsSaving(false);
        saveRequestRef.current = null;

        if (saveQueuedRef.current) {
          saveQueuedRef.current = false;
          await saveProgress();
        }
      }
    })();

    saveRequestRef.current = savePromise;
    return savePromise;
  }

  const handleFieldChange = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (fieldError) {
      setFieldError('');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (!files.length) return;

    setFormValues((current) => ({
      ...current,
      step4_media: [...normalizeMediaEntries(current.step4_media), ...files.map((file) => file.name)],
    }));

    if (fieldError) {
      setFieldError('');
    }
  };

  const handleSaveLater = async () => {
    setStatusMessage(locale === 'ar' ? 'جارٍ حفظ عملك...' : 'Saving your work...');
    setIsSaving(true);
    await saveProgress();
    setIsSaving(false);
  };

  const activeStepConfig = steps[activeStep - 1] || steps[0];
  const activeFields = Array.isArray(activeStepConfig?.fields) ? activeStepConfig.fields : [];
  const hasMediaDrop = activeFields.some((field) => field.type === 'multiline');

  const validateStep = () => {
    for (const field of activeFields) {
      if (field.required && !hasFieldValue(formValues[field.key], field)) {
        return field.type === 'multiline' ? validationMessages.requiredMedia : validationMessages.requiredField;
      }
      if (typeof formValues[field.key] === 'string' && formValues[field.key].length > 5000) {
        return validationMessages.tooLong;
      }
    }

    return '';
  };

  const handleContinue = async () => {
    const validationError = validateStep();
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    await saveProgress();
    setActiveStep((prev) => Math.min(stepCount, prev + 1));
  };

  const renderField = (field) => {
    const value = formValues[field.key];
    const placeholder = field.placeholder || labels.placeholder[activeStep - 1] || '';
    const labelText = field.label || field.key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    const options = Array.isArray(field.options)
      ? field.options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option))
      : [];

    return (
      <div key={field.key} className="space-y-3">
        <label className="block text-sm font-semibold text-white">{labelText}{field.required ? ' *' : ''}</label>
        {field.type === 'text' && (
          <input
            value={String(value || '')}
            onChange={(event) => handleFieldChange(field.key, event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
          />
        )}
        {field.type === 'select' && options.length > 0 && (
          <select
            value={String(value || '')}
            onChange={(event) => handleFieldChange(field.key, event.target.value)}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
          >
            <option value="" disabled>{placeholder || 'Choose an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
        {field.type === 'multiline' && (
          <textarea
            value={Array.isArray(value) ? value.join('\n') : String(value || '')}
            onChange={(event) => handleFieldChange(field.key, normalizeMediaEntries(event.target.value))}
            rows={6}
            placeholder={placeholder}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
          />
        )}
        {(!field.type || field.type === 'textarea') && (
          <textarea
            value={String(value || '')}
            onChange={(event) => handleFieldChange(field.key, event.target.value)}
            rows={8}
            placeholder={placeholder}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/20"
          />
        )}
        {field.hint ? <p className="text-sm text-slate-400">{field.hint}</p> : null}
      </div>
    );
  };

  const isVisualReviewMode = initialData?.project?.type === 'VISUAL_ID' && 
                             initialData?.project?.deliverables?.length > 0;

  const projectInfo = initialData?.project;
  
  const formatMetadata = (meta) => {
    if (!meta) return '';
    try {
      const obj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      return obj.message || obj.title ? `${obj.message || ''} ${obj.title || ''}`.trim() : JSON.stringify(obj);
    } catch {
      return String(meta);
    }
  };

  const unifiedEvents = projectInfo ? [
    ...(projectInfo.activityLogs || []).map(log => ({ id: `al-${log.id}`, createdAt: log.createdAt, title: log.action, description: formatMetadata(log.metadata), actor: log.actorRole })),
    ...(projectInfo.collaboratorNotes || []).map(note => ({ id: `cn-${note.id}`, createdAt: note.createdAt, title: 'Collaborator Note', description: note.content, actor: note.author })),
    ...(projectInfo.deliverables || []).flatMap(d => (d.comments || []).map(c => ({ id: `dc-${c.id}`, createdAt: c.createdAt, title: `Comment on ${d.title}`, description: c.comment, actor: c.author })))
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : [];

  if (isVisualReviewMode) {
    return (
      <div className="space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
          <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">{labels.portalBadge}</p>
          <h2 className="mt-3 text-3xl font-cairo font-bold text-white">Visual Identity Review</h2>
          <p className="mt-3 max-w-3xl text-slate-400">Review the assets prepared by our team. Leave pin-point feedback or approve final versions.</p>
        </div>
        <DeliverablesGallery 
          deliverables={initialData.project.deliverables} 
          onApprove={async (id) => await approveDeliverableAction(token, id)} 
          onComment={async (id, comment, x, y) => await addPinCommentAction(token, { deliverableId: id, comment, pinX: x, pinY: y })} 
        />
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
          <h3 className="mb-6 font-cairo text-xl font-bold text-white">Project Timeline</h3>
          <UnifiedTimeline events={unifiedEvents} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-cyan-300">{labels.portalBadge}</p>
            <h2 className="mt-3 text-3xl font-cairo font-bold text-white">{labels.gatewayTitle}</h2>
            <p className="mt-3 max-w-3xl text-slate-400">{labels.intro}</p>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
            {lang.toUpperCase()}
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.45)] backdrop-blur-xl">
          <p className="font-tajawal text-xs uppercase tracking-[0.35em] text-slate-400">Step Navigation</p>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <button
                key={step.id || index}
                type="button"
                onClick={() => setActiveStep(index + 1)}
                className={`block w-full rounded-2xl px-4 py-3 text-left transition ${activeStep === index + 1 ? 'border border-cyan-400/40 bg-cyan-500/10 text-cyan-100' : 'border border-white/10 bg-slate-900/70 text-slate-300 hover:border-cyan-400/30 hover:bg-slate-900/90'}`}
              >
                <span className="block text-sm font-semibold">{index + 1}. {step.title || (labels.placeholder[index] || '')}</span>
                <span className="mt-1 block text-xs text-slate-500">{step.description || ''}</span>
              </button>
            ))}
          </div>
          <div className={`rounded-3xl border p-4 ${statusType === 'error' ? 'border-rose-500/20 bg-rose-500/10 text-rose-100' : statusType === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'}`}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-white">
                {isSaving
                  ? labels.syncSaving
                  : statusType === 'success'
                    ? labels.syncSaved
                    : statusType === 'error'
                      ? labels.syncError
                      : statusMessage}
              </p>
              {isSaving ? (
                <Cloud className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              ) : statusType === 'success' ? (
                <CloudCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              ) : statusType === 'error' ? (
                <CloudOff className="h-5 w-5 text-rose-200" aria-hidden="true" />
              ) : (
                <Cloud className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              )}
            </div>
            {statusType === 'error' && statusMessage ? (
              <p className="mt-2 text-sm text-rose-100/90">{statusMessage}</p>
            ) : null}
            <p className="mt-2 text-sm text-slate-200">{completedSteps}/{stepCount} {locale === 'ar' ? 'خطوات مكتملة' : 'steps completed'}</p>
          </div>
          <button
            type="button"
            onClick={handleSaveLater}
            disabled={isSaving}
            className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {labels.saveLater}
          </button>
        </aside>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white">{activeStepConfig.title || `${locale === 'ar' ? 'الخطوة' : 'Step'} ${activeStep}`}</h3>
                  <p className="text-slate-400">{activeStepConfig.description || labels.placeholder[activeStep - 1]}</p>
                </div>

                {hasMediaDrop ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(event) => event.preventDefault()}
                    className="rounded-3xl border border-dashed border-white/20 bg-slate-900/80 p-6 text-slate-300 transition hover:border-cyan-400"
                  >
                    <p className="font-semibold text-white">{labels.mediaDropTitle}</p>
                    <p className="mt-2 text-sm text-slate-400">{labels.mediaDropDescription}</p>
                    {formValues.step4_media && formValues.step4_media.length ? (
                      <div className="mt-4 space-y-2">
                        {formValues.step4_media.map((item, index) => (
                          <div key={`${item}-${index}`} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                            {item}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="space-y-6">
                  {activeFields.map((field) => renderField(field))}
                </div>

                {fieldError ? <p className="text-sm text-rose-400">{fieldError}</p> : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {labels.back}
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSaving}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {labels.saveContinue}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_90px_rgba(2,8,24,0.55)] backdrop-blur-xl" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <h3 className="mb-6 font-cairo text-xl font-bold text-white">Your Project History</h3>
        <UnifiedTimeline events={unifiedEvents} />
      </div>
    </div>
  );
}
