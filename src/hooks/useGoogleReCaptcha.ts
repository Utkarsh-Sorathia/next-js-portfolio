'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function useGoogleReCaptcha() {
  const executeRecaptcha = useCallback(async (action: string) => {  
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey || typeof window === 'undefined') {
      console.warn('ReCAPTCHA is not loaded properly.');
      return '';
    }

    // The script is loaded with strategy="lazyOnload", so a fast first action can
    // arrive before it's ready. The APIs now reject missing tokens, so wait briefly.
    for (let waited = 0; !window.grecaptcha && waited < 5000; waited += 100) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!window.grecaptcha) {
      console.warn('ReCAPTCHA is not loaded properly.');
      return '';
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  }, []);

  return { executeRecaptcha };
}
