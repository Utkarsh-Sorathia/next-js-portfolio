'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useGoogleReCaptcha } from '@/hooks/useGoogleReCaptcha';

// AI assistant chat state for the light design's chat panel: wraps useChat,
// attaches a fresh reCAPTCHA token to every message (the API rejects requests
// without one) and turns server rejections into friendly messages.
export function useAssistantChat() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    onError: (err) => {
      const msg = err?.message || '';
      if (msg.includes('Too many requests')) {
        setError("You're sending messages too quickly. Please wait a moment and try again.");
      } else if (
        msg.includes("can't help with that") ||
        msg.includes('too long') ||
        msg.includes('Security check')
      ) {
        setError(msg);
      } else {
        setError("Sorry, I couldn't pull that up just now — mind rephrasing, or take a look at the Work section on the page?");
      }
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const send = async (text: string) => {
    if (!text.trim()) return false;
    try {
      setError(null);
      const token = await executeRecaptcha('chat_message');
      if (!token) {
        setError('Security service not ready. Please try again.');
        return false;
      }
      await sendMessage({ text }, {
        headers: { 'x-recaptcha-token': token },
        body: { metadata: { gRecaptchaToken: token } },
      });
      return true;
    } catch {
      setError('Security verification failed. Please try again.');
      return false;
    }
  };

  return { messages, isLoading, error, send };
}

// Text of a UI message with any <think>…</think> reasoning stripped.
export function getMessageText(m: { parts?: { type: string; text?: string }[]; content?: string }) {
  const raw = m.parts
    ? m.parts.map((p) => (p.type === 'text' ? p.text ?? '' : '')).join('')
    : m.content || '';
  return raw.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, '').trim();
}
