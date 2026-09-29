// scripts/test-retrieval.mjs
//
// Phase 2 sanity check: given a question, retrieve the most relevant blog chunks.
// This is exactly what the chat route will do before calling the LLM.
//
// Run:  node scripts/test-retrieval.mjs "how did you build the chatbot?"
//       node scripts/test-retrieval.mjs            (uses a default question)

import { readFileSync } from "node:fs";
import { Index } from "@upstash/vector";

// load .env.local (values never printed)
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
} catch {}

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

const question = process.argv.slice(2).join(" ") || "how did you build the AI chatbot?";

console.log(`\nQuestion: "${question}"\n`);

// Same call the chat route will make: embed the question (Upstash does it),
// return the 3 nearest chunks with their metadata + similarity score.
const results = await index.query({
  data: question,
  topK: 3,
  includeMetadata: true,
  includeData: true, // also return the chunk text so we can see what matched
});

results.forEach((r, i) => {
  console.log(`#${i + 1}  score=${r.score.toFixed(3)}  from "${r.metadata?.title}"  (${r.metadata?.url})`);
  console.log(`     ${String(r.data).replace(/\s+/g, " ").slice(0, 160)}…\n`);
});
