'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from '@/hooks/useGoogleReCaptcha';

// Contact form state + submission for the light design. (The dark design's
// ContactForm keeps its own inline copy so it stays untouched.)
export type ContactFormData = { name: string; email: string; subject: string; message: string };

const EMPTY: ContactFormData = { name: '', email: '', subject: '', message: '' };

export function useContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage('');
  };

  const validate = (): string | null => {
    if (!formData.name) return 'Please enter your name.';
    if (!formData.email) return 'Please enter your email.';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return 'Please enter a valid email address.';
    }
    if (!formData.subject) return 'Please enter a subject.';
    if (!formData.message) return 'Please enter your message.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const gRecaptchaToken = await executeRecaptcha('contact_form');
      if (!gRecaptchaToken) throw new Error('Recaptcha verification failed');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, gRecaptchaToken }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData(EMPTY);
      } else {
        const data = await response.json().catch(() => ({}));
        setMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setMessage('Something went wrong. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    message,
    handleChange,
    handleSubmit,
    reset: () => setIsSuccess(false),
  };
}
