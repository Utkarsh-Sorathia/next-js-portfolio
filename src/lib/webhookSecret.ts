import crypto from "crypto";

// Checks the `?secret=` query param of an incoming webhook against an env var.
// Rejects everything when the env var is unset, and compares in constant time.
export function hasValidSecret(req: Request, envValue: string | undefined): boolean {
  if (!envValue) {
    console.error("Webhook secret env var is not set — rejecting request");
    return false;
  }
  const provided = new URL(req.url).searchParams.get("secret") ?? "";
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(envValue).digest();
  return crypto.timingSafeEqual(a, b);
}
