import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://utkarshsorathia.in/",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "https://utkarshsorathia.in/blogs",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "https://utkarshsorathia.in/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/cv",
        destination: "https://utkarshsorathia.in/cv",
        permanent: true,
      },
      {
        source: "/:path*",
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
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
