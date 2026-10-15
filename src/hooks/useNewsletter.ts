'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from '@/hooks/useGoogleReCaptcha';

// Newsletter sign-up state + submission for the light design. (The dark
// Footer keeps its own inline copy so it stays untouched.)
export function useNewsletter() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!email) {
      setIsError(true);
      setMessage('Please enter an email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const gRecaptchaToken = await executeRecaptcha('subscribe_newsletter');
      if (!gRecaptchaToken) throw new Error('Recaptcha failed');

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gRecaptchaToken }),
      });

      const data = await res.json().catch(() => ({}));
      setIsError(!res.ok);
      setMessage(data.message || data.error || (res.ok ? 'Subscribed!' : 'Failed to subscribe. Try again.'));
      if (res.ok) setEmail('');
    } catch {
      setIsError(true);
      setMessage('Failed to subscribe. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { email, setEmail, message, isError, isSubmitting, handleSubscribe };
}
