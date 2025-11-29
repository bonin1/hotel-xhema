import { seoConfigs } from '@/lib/seo-config'

export default function myImageLoader({
    src,
    width,
    quality,
  }: {
    src: string;
    width?: number;
    quality?: number;
  }) {
    const isLocal = !/^https?:\/\//i.test(src);
    const query = new URLSearchParams();
  
    const imageOptimizationApi = 'https://cdn.dblseo.com';
    // Your NextJS application URL
    // Use localhost in development, otherwise use SEO config baseUrl

        //If not in localhost 300 change it
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000' 
        : typeof seoConfigs.baseUrl === 'string'
          ? seoConfigs.baseUrl
          : '';

    const baseUrlStr = typeof baseUrl === 'string' ? baseUrl : '';
    const fullSrc = src.startsWith('/') ? `${baseUrlStr.replace(/\/$/, '')}${src}` : src;

    // Always set width and quality parameters for optimization
    query.set('width', String(width || 3840));
    query.set('quality', String(quality || 75));
  
    if (isLocal && process.env.NODE_ENV === 'development') {
      // In development, return local path with query params so Next.js recognizes width implementation
      return `${fullSrc}?${query.toString()}`;
    }
    if (isLocal) {
      return `${imageOptimizationApi}/image/${fullSrc}?${query.toString()}`;
    }
    return `${imageOptimizationApi}/image/${src}?${query.toString()}`;
  }