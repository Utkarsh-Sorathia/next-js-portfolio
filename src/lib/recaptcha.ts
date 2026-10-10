// lib/recaptcha.ts
//
// Shared reCAPTCHA v3 verification for the public API routes. Fails closed:
// a missing token, a low score, or an unreachable Google endpoint all block
// the request.

export type RecaptchaResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

const MIN_SCORE = 0.5;

export async function verifyRecaptcha(token: unknown): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return { ok: false, status: 500, error: "Server configuration error" };
  }
  if (typeof token !== "string" || !token) {
    return { ok: false, status: 400, error: "Security token missing" };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data = await res.json();

    if (!data.success || (data.score ?? 0) < MIN_SCORE) {
      return { ok: false, status: 400, error: "Security check failed. Please try again." };
    }
    return { ok: true };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      ok: false,
      status: 503,
      error: "Security verification unavailable. Please try again later.",
    };
  }
}
