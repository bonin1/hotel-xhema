import { MetadataRoute } from 'next';
import { seoConfigs, siteConfig, roomsSEOData, attractionsSEOData } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const staticRoutes = Object.entries(seoConfigs).map(([path]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Add dynamic room routes
  const roomRoutes = Object.keys(roomsSEOData).map((roomId) => ({
    url: `${baseUrl}/rooms/${roomId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Add dynamic attraction routes
  const attractionRoutes = Object.keys(attractionsSEOData).map((slug) => ({
    url: `${baseUrl}/attractions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes, ...attractionRoutes];
}
