// lib/vector.ts
//
// RAG retrieval over the blog posts indexed in Upstash Vector.
// (Indexing lives in scripts/index-blogs.mjs — run that when you publish a post.)
import { Index } from "@upstash/vector";

const url = process.env.UPSTASH_VECTOR_REST_URL;
const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

// Optional enhancement, not critical infra: if it isn't configured we skip blog
// retrieval rather than crash the chat. (Rate limiting, by contrast, throws on
// missing creds because a missing limiter is a real hole.)
const vectorIndex = url && token ? new Index({ url, token }) : null;

export interface RetrievedChunk {
  text: string;
  title: string;
  url: string; // relative, e.g. "/blogs/my-post"
  score: number;
}

/**
 * Retrieve the blog chunks most relevant to `query`, keeping only those above
 * `minScore`. Returns [] when nothing is relevant enough — so the caller can
 * skip augmentation entirely (see test 3: vector search always returns *some*
 * nearest chunk, so the score threshold is what separates signal from noise).
 * Fails soft: any error → [].
 */
export async function retrieveBlogContext(
  query: string,
  { topK = 3, minScore = 0.7 }: { topK?: number; minScore?: number } = {}
): Promise<RetrievedChunk[]> {
  if (!vectorIndex || !query?.trim()) return [];
  try {
    const results = await vectorIndex.query({
      data: query, // Upstash embeds the query with the index's model
      topK,
      includeMetadata: true,
      includeData: true,
    });
    return results
      .filter((r) => (r.score ?? 0) >= minScore)
      .map((r) => ({
        text: String(r.data ?? ""),
        title: String(r.metadata?.title ?? ""),
        url: String(r.metadata?.url ?? ""),
        score: r.score ?? 0,
      }));
  } catch (err) {
    console.error("[vector] blog retrieval failed:", err);
    return [];
  }
}
