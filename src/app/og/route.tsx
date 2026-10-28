import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Social preview card (1200×630) for link shares on LinkedIn, X, WhatsApp, etc.
//   /og                         → site card (name + title)
//   /og?title=Some%20Post&kind=post → card for a page or blog post
// Matches the site's dark branding.
export const runtime = 'nodejs';

const SIZE = { width: 1200, height: 630 };
const ACCENT = '#4361ee';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || '').slice(0, 120);
  const kind = searchParams.get('kind') === 'post' ? 'post' : 'page';

  const avatar = await readFile(join(process.cwd(), 'public/android-chrome-192x192.png'));
  const avatarSrc = `data:image/png;base64,${avatar.toString('base64')}`;

  // The site card leads with the title (the name is already in the footer line).
  const heading = title || 'Full Stack & Mobile App Developer';
  const eyebrow = kind === 'post' ? 'Blog' : 'Portfolio';
  const subline = title ? 'Full Stack & Mobile App Developer' : 'Next.js, MERN & React Native · Surat, India';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(circle at 85% 10%, #1b2347 0%, #050505 55%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: ACCENT }} />
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', color: '#a1a1aa' }}>{eyebrow}</div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: heading.length > 60 ? 60 : 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1040,
          }}
        >
          {heading}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} width={64} height={64} style={{ borderRadius: 999, background: '#ffffff' }} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, fontWeight: 700 }}>Utkarsh Sorathia</div>
              <div style={{ fontSize: 22, color: '#a1a1aa' }}>{subline}</div>
            </div>
          </div>
          <div style={{ fontSize: 26, color: ACCENT, fontWeight: 600 }}>utkarshsorathia.in</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' },
    }
  );
}
