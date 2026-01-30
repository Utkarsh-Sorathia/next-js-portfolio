'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not ready. Please try again in a moment.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const gRecaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          gRecaptchaToken,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-white/5 dark:bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 dark:border-zinc-800/50 relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-zinc-400 mb-8">
              Thank you for reaching out. I&apos;ll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-[var(--primaryColor)] text-white rounded-full font-bold hover:scale-105 transition-transform"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl font-bold mb-8 text-zinc-100">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 dark:bg-zinc-800/50 border border-white/10 dark:border-zinc-700/50 focus:ring-2 focus:ring-[var(--primaryColor)] focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 dark:bg-zinc-800/50 border border-white/10 dark:border-zinc-700/50 focus:ring-2 focus:ring-[var(--primaryColor)] focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  disabled={isSubmitting}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 dark:bg-zinc-800/50 border border-white/10 dark:border-zinc-700/50 focus:ring-2 focus:ring-[var(--primaryColor)] focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 ml-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 dark:bg-zinc-800/50 border border-white/10 dark:border-zinc-700/50 focus:ring-2 focus:ring-[var(--primaryColor)] focus:border-transparent outline-none transition-all resize-none placeholder:text-zinc-600"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full max-w-[200px] py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-sm">Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <p className="text-[10px] text-zinc-500 text-center leading-relaxed max-w-[300px]">
                  Protected by reCAPTCHA. Google{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-zinc-400">
                    Privacy
                  </a>{' '}
                  &{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-zinc-400">
                    Terms
                  </a>{' '}
                  apply.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
