'use client';

import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';

const fieldClass =
  'w-full rounded-2xl border border-(--lt-border) bg-(--lt-surface-2) px-4 py-3 text-[15px] text-(--lt-text) outline-none transition-colors placeholder:text-[#9a9aa0] focus:border-(--lt-accent) focus:bg-white focus:ring-4 focus:ring-(--lt-accent)/10 disabled:opacity-60';

const labelClass = 'mb-1.5 block text-sm font-medium text-(--lt-text)';

export default function LightContactForm() {
  const { formData, isSubmitting, isSuccess, message, handleChange, handleSubmit, reset } = useContactForm();

  if (isSuccess) {
    return (
      <div role="status" aria-live="polite" className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-(--lt-success)" aria-hidden="true" />
        <h3 className="text-2xl font-semibold tracking-tight text-(--lt-text)">Message sent</h3>
        <p className="max-w-sm text-(--lt-muted)">Thanks for reaching out — I&apos;ll get back to you as soon as I can.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 rounded-full border border-(--lt-border-strong) px-5 py-2.5 text-sm font-medium text-(--lt-text) hover:bg-(--lt-surface-2)"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="lt-contact-title" noValidate className="flex flex-col gap-4">
      <h3 id="lt-contact-title" className="text-xl font-semibold tracking-tight text-(--lt-text)">
        Send a message
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lt-name" className={labelClass}>Name</label>
          <input id="lt-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} disabled={isSubmitting} placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="lt-email" className={labelClass}>Email</label>
          <input id="lt-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} disabled={isSubmitting} placeholder="you@company.com" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="lt-subject" className={labelClass}>Subject</label>
        <input id="lt-subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} disabled={isSubmitting} placeholder="Project inquiry, role, or just hello" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="lt-message" className={labelClass}>Message</label>
        <textarea id="lt-message" name="message" rows={5} required value={formData.message} onChange={handleChange} disabled={isSubmitting} placeholder="Tell me about your project…" className={`${fieldClass} resize-none`} />
      </div>

      {message && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-[#b91c1c]">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {message}
        </p>
      )}

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-(--lt-muted)">
          Protected by reCAPTCHA. Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Privacy</a> &amp;{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">Terms</a> apply.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--lt-text) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#26262b] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
