import { MetadataRoute } from 'next';
import { baseURL } from '@/utils/api';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
