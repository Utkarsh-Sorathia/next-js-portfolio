// scripts/index-blogs.mjs
//
// One-time / re-runnable INDEXING script (Phase 1 of RAG).
// Pulls every blog post from Sanity, turns each into plain text, splits it into
// chunks, and upserts those chunks into the Upstash Vector index. Upstash embeds
// each chunk for us server-side (because the index was created with a hosted
// embedding model), so we just send raw text.
//
// Run:  node scripts/index-blogs.mjs      (from the project root)
//
// Re-run it whenever you publish/edit a post — stable IDs mean chunks get
// UPDATED in place, not duplicated.

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { Index } from "@upstash/vector";

/* ---------- load .env.local into process.env (values never printed) ---------- */
try {
  const env = readFileSync(".env.local", "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
} catch {
  /* if there's no .env.local we'll just fail on the missing-var check below */
}

/* ---------- clients ---------- */
// Sanity (public config — same projectId/dataset as src/lib/sanity.ts)
const sanity = createClient({
  projectId: "roupwgmh",
  dataset: "production",
  apiVersion: "2022-06-01",
  useCdn: false, // want the freshest content when indexing
  perspective: "published",
});

// Upstash Vector index (reads UPSTASH_VECTOR_REST_URL / _TOKEN from env)
const url = process.env.UPSTASH_VECTOR_REST_URL;
const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
if (!url || !token) {
  console.error("Missing UPSTASH_VECTOR_REST_URL / UPSTASH_VECTOR_REST_TOKEN in .env.local");
  process.exit(1);
}
const index = new Index({ url, token });

/* ---------- STEP 1: normalize — Portable Text -> plain text ----------
 * Sanity stores body as an array of "blocks"; each text block has a `children`
 * array of spans that hold the actual text. We walk the blocks and concatenate
 * the span text, skipping non-text blocks (images, etc.). This is the "clean
 * your source into plain text" step every RAG pipeline needs.
 */
function portableTextToPlain(body) {
  if (!Array.isArray(body)) return "";
  return body
    .map((block) => {
      if (block?._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children.map((child) => child?.text || "").join("");
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

/* ---------- STEP 2: chunk ----------
 * Split into ~800-char pieces on paragraph boundaries, merging small paragraphs
 * together. Small enough that retrieval returns a focused, relevant piece;
 * big enough to keep a coherent thought. (No overlap yet — a fine v1.)
 */
function chunkText(text, maxChars = 800) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const chunks = [];
  let current = "";
  for (const p of paragraphs) {
    if (current && (current + "\n\n" + p).length > maxChars) {
      chunks.push(current);
      current = p;
    } else {
      current = current ? current + "\n\n" + p : p;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/* ---------- STEP 3: fetch + index ---------- */
async function main() {
  console.log("Fetching blog posts from Sanity…");
  const posts = await sanity.fetch(`*[_type == "post"]{ title, "slug": slug.current, body }`);
  console.log(`Found ${posts.length} posts.\n`);

  let totalChunks = 0;

  for (const post of posts) {
    const slug = post.slug;
    if (!slug) continue;

    const text = portableTextToPlain(post.body);
    if (!text) {
      console.log(`— "${post.title}": no text body, skipped`);
      continue;
    }

    const chunks = chunkText(text);

    // upsert each chunk. `data` is raw text → Upstash embeds it for us.
    // `id` is STABLE (slug + chunk index) so re-runs update instead of duplicate.
    for (let i = 0; i < chunks.length; i++) {
      await index.upsert({
        id: `${slug}-${i}`,
        data: chunks[i],
        metadata: {
          title: post.title,
          slug,
          url: `/blogs/${slug}`,
          chunk: i,
        },
      });
    }

    totalChunks += chunks.length;
    console.log(`✓ "${post.title}" → ${chunks.length} chunks`);
  }

  console.log(`\nDone. Indexed ${totalChunks} chunks from ${posts.length} posts.`);
}

main().catch((err) => {
  console.error("Indexing failed:", err);
  process.exit(1);
});
