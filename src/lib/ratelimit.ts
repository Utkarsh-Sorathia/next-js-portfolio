// lib/ratelimit.ts
//
// Shared, Redis-backed rate limiting for the API routes. Replaces the old
// per-route in-memory Map limiters, which silently failed on serverless:
// each cold start / instance had its own Map, so the limits reset constantly
// and were never shared across the functions actually serving traffic.
//
// Upstash Redis gives every serverless invocation one shared store, so the
// limits are actually enforced. The REST client is stateless/HTTP-based, so a
// single instance is fine across all routes and invocations.
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error(
    "Missing Upstash Redis credentials. Add UPSTASH_REDIS_REST_URL and " +
      "UPSTASH_REDIS_REST_TOKEN to .env.local (and to your host's environment variables)."
  );
}

const redis = new Redis({ url, token });

// Sliding-window limiter per route. `prefix` namespaces the keys so the four
// routes each get their own independent bucket in Redis (never collide).
function createLimiter(
  requests: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1],
  prefix: string
) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: `ratelimit:${prefix}`,
  });
}

// Same limits the routes enforced before, now actually shared across instances.
export const chatRatelimit = createLimiter(5, "60 s", "chat");
export const contactRatelimit = createLimiter(5, "15 m", "contact");
export const subscribeRatelimit = createLimiter(3, "10 m", "subscribe");
export const unsubscribeRatelimit = createLimiter(5, "10 m", "unsubscribe");

// Extracts the client IP from the standard proxy headers Vercel sets.
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Applies a limiter, failing OPEN if Redis is unreachable: a transient Redis
// outage should never take down the contact form or chatbot entirely. Returns
// true if the request is allowed, false if it should be blocked (429).
export async function isAllowed(limiter: Ratelimit, ip: string): Promise<boolean> {
  try {
    const { success } = await limiter.limit(ip);
    return success;
  } catch (err) {
    console.error("[ratelimit] check failed, allowing request (fail-open):", err);
    return true;
  }
}
