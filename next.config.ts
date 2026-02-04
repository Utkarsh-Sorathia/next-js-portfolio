import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Force HTTPS redirect
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://utkarshsorathia.in/:path*",
        permanent: true,
      },
      // www to non-www redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.utkarshsorathia.in",
          },
        ],
        destination: "https://utkarshsorathia.in/:path*",
        permanent: true,
      },
      // Vercel domain redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "utkarsh-sorathia.vercel.app",
          },
        ],
        destination: "https://utkarshsorathia.in/:path*",
        permanent: true,
      },
      // www to non-www redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.utkarshsorathia.in",
          },
        ],
        destination: "https://utkarshsorathia.in/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
