import { siteConfig } from './seo-config';

/**
 * Generate additional head elements for Next.js metadata
 * This extends the metadata API with additional head elements
 * Use this when you need extra head tags beyond what metadata provides
 */

export interface HeadElement {
  tag: string;
  attributes: Record<string, string>;
}

/**
 * Generate favicon head elements
 * Returns additional head elements for favicon support
 */
export function generateFaviconElements(): HeadElement[] {
  return [
    {
      tag: 'link',
      attributes: {
        rel: 'icon',
        href: siteConfig.favicon,
        type: 'image/x-icon',
      },
    },
    {
      tag: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: siteConfig.favicon,
        type: 'image/x-icon',
      },
    },
    {
      tag: 'link',
      attributes: {
        rel: 'apple-touch-icons',
        href: siteConfig.favicon,
      },
    },
  ];
}

/**
 * Generate preconnect head elements for performance
 * Preconnects to external domains for faster loading
 */
export function generatePreconnectElements(): HeadElement[] {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    // Add other domains you use
  ];

  return domains.map(domain => ({
    tag: 'link',
    attributes: {
      rel: 'preconnect',
      href: domain,
      crossorigin: 'anonymous',
    },
  }));
}

/**
 * Generate DNS prefetch elements for performance
 * Prefetches DNS for external domains
 */
export function generateDNSPrefetchElements(): HeadElement[] {
  const domains = [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    // Add other domains you use
  ];

  return domains.map(domain => ({
    tag: 'link',
    attributes: {
      rel: 'dns-prefetch',
      href: domain,
    },
  }));
}

/**
 * Generate viewport and mobile optimization elements
 */
export function generateMobileElements(): HeadElement[] {
  return [
    {
      tag: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    },
    {
      tag: 'meta',
      attributes: {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
    },
    {
      tag: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
    },
    {
      tag: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    },
  ];
}

/**
 * Generate security headers as meta tags
 */
export function generateSecurityElements(): HeadElement[] {
  return [
    {
      tag: 'meta',
      attributes: {
        'http-equiv': 'X-Content-Type-Options',
        content: 'nosniff',
      },
    },
    {
      tag: 'meta',
      attributes: {
        'http-equiv': 'X-Frame-Options',
        content: 'SAMEORIGIN',
      },
    },
    {
      tag: 'meta',
      attributes: {
        'http-equiv': 'X-XSS-Protection',
        content: '1; mode=block',
      },
    },
    {
      tag: 'meta',
      attributes: {
        'http-equiv': 'Referrer-Policy',
        content: 'strict-origin-when-cross-origin',
      },
    },
  ];
}

/**
 * Generate all recommended head elements
 * Combines all head elements for comprehensive head optimization
 */
export function generateAllHeadElements(): HeadElement[] {
  return [
    ...generateFaviconElements(),
    ...generatePreconnectElements(),
    ...generateDNSPrefetchElements(),
    ...generateMobileElements(),
    ...generateSecurityElements(),
  ];
}

/**
 * Convert head elements to Next.js metadata format
 * This allows you to use head elements through the metadata API
 */
export function headElementsToMetadata(elements: HeadElement[]) {
  const links: Array<{ [key: string]: string }> = [];
  const meta: Array<{ [key: string]: string }> = [];

  elements.forEach(element => {
    if (element.tag === 'link') {
      links.push(element.attributes as { [key: string]: string });
    } else if (element.tag === 'meta') {
      meta.push(element.attributes as { [key: string]: string });
    }
  });

  return {
    ...(links.length > 0 && { other: { links } }),
    ...(meta.length > 0 && { other: { meta } }),
  };
}

/**
 * Generate comprehensive head metadata for Next.js
 * Use this in your layout or page metadata
 */
export function generateHeadMetadata() {
  const elements = generateAllHeadElements();
  return headElementsToMetadata(elements);
}
