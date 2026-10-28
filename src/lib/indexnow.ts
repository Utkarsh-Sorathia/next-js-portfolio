// lib/indexnow.ts
//
// IndexNow tells Bing (and the engines that use its index — DuckDuckGo,
// Copilot, ChatGPT search, Yandex, …) about new or updated URLs immediately,
// instead of waiting for the next crawl. Google doesn't use IndexNow; it reads
// the sitemap.
//
// The key isn't a secret: IndexNow verifies ownership by fetching
// https://utkarshsorathia.in/<key>.txt, which lives in /public.
import { baseURL } from "@/utils/api";

export const INDEXNOW_KEY = "decc4fce286484a26ce6b6682e25e984";

const PRODUCTION_HOST = "utkarshsorathia.in";

/**
 * Submits URLs on this site to IndexNow. Never throws: a failed submission is
 * logged and the caller (e.g. the publish webhook) carries on.
 */
export async function submitToIndexNow(paths: string[]): Promise<{ ok: boolean; status?: number }> {
  // Only the live site can be verified; skip local and preview builds.
  if (new URL(baseURL).host !== PRODUCTION_HOST || paths.length === 0) {
    return { ok: false };
  }

  const urlList = [...new Set(paths.map((p) => new URL(p, baseURL).toString()))];

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: PRODUCTION_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${baseURL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(5000),
    });
    // 200 = accepted, 202 = accepted (key validation pending)
    if (!res.ok) console.error(`[indexnow] submission rejected: ${res.status}`);
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("[indexnow] submission failed:", err);
    return { ok: false };
  }
}
