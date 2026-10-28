// One-off: submit every URL in the live sitemap to IndexNow (Bing, DuckDuckGo,
// Copilot, Yandex, …). New posts are submitted automatically by the publish
// webhook (/api/revalidate); run this once after deploying, or after bulk edits.
//
//   node scripts/indexnow-submit.mjs
//
// Requires the key file to be live at https://utkarshsorathia.in/<key>.txt.
const HOST = 'utkarshsorathia.in';
const KEY = 'decc4fce286484a26ce6b6682e25e984'; // keep in sync with src/lib/indexnow.ts

const keyRes = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not live at https://${HOST}/${KEY}.txt — deploy first.`);
  process.exit(1);
}

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Submitting ${urlList.length} URLs…`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

// 200/202 = accepted. 403 = key not valid yet, 422 = URLs don't match host.
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
process.exit(res.ok ? 0 : 1);
