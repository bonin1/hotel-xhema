import { siteConfig } from './seo-config';

export interface GenerateSEOOptions {
  pageType: 'service' | 'location' | 'blog' | 'page';
  title: string;
  content: string;
  location?: string;
  service?: string;
  keywords?: string[];
}

export interface GeneratedSEO {
  title: string;
  description: string;
  keywords: string[];
  ogType: 'website' | 'article';
  twitterCard: 'summary' | 'summary_large_image';
}

/**
 * Auto-generate SEO metadata from content
 * This is a utility function that analyzes content and generates SEO-optimized metadata
 * 
 * @param options - Configuration for SEO generation
 * @returns Generated SEO metadata object
 */
export function generateSEOContent(options: GenerateSEOOptions): GeneratedSEO {
  const { pageType, title, content, location, service, keywords = [] } = options;
  
  // Auto-generate meta description (150-160 chars)
  const description = generateMetaDescription(content, location, service);
  
  // Auto-extract/enhance keywords
  const generatedKeywords = [
    ...keywords,
    service,
    location,
    ...extractKeywordsFromContent(content),
  ].filter(Boolean) as string[];
  
  // Auto-generate title
  const seoTitle = formatTitle(title, service, location);
  
  return {
    title: seoTitle,
    description,
    keywords: generatedKeywords,
    ogType: pageType === 'blog' ? 'article' : 'website',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Generate meta description following SEO best practices
 * - 150-160 characters
 * - Includes location and service
 * - Ends with CTA
 * - Removes HTML tags
 */
function generateMetaDescription(content: string, location?: string, service?: string): string {
  // Extract first 120 characters, clean HTML tags
  let excerpt = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 120);
  
  // Add ellipsis if truncated
  if (content.length > 120) excerpt += '...';
  
  // Build complete description following workspace rules
  const parts = [excerpt];
  
  if (service) {
    parts.push(`Professional ${service}`);
  }
  
  if (location) {
    parts.push(`in ${location}`);
  }
  
  // Add CTA as per workspace rules
  parts.push('Contact us today for a free consultation!');
  
  const fullDescription = parts.join(' ');
  
  // Ensure it's within 160 characters
  return fullDescription.length > 160 
    ? fullDescription.substring(0, 157) + '...'
    : fullDescription;
}

/**
 * Extract relevant keywords from content
 * Simple keyword extraction that finds meaningful words
 */
function extractKeywordsFromContent(content: string, limit = 5): string[] {
  // Remove HTML tags and normalize
  const cleanContent = content
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4); // Only words longer than 4 characters
  
  // Create frequency map
  const wordFreq = cleanContent.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort by frequency and get top words
  const sortedWords = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .map(([word]) => word)
    .slice(0, limit);
  
  return sortedWords;
}

/**
 * Format title following SEO best practices
 * - 60-70 characters
 * - Includes service and location
 * - Follows "Service - Company in Location" format
 */
function formatTitle(title: string, service?: string, location?: string): string {
  const parts = [title];
  
  if (service && !title.toLowerCase().includes(service.toLowerCase())) {
    parts.unshift(service);
  }
  
  if (location && !title.toLowerCase().includes(location.toLowerCase())) {
    parts.push(`in ${location}`);
  }
  
  parts.push(siteConfig.name);
  
  const fullTitle = parts.join(' | ');
  
  // Ensure it's within 70 characters
  return fullTitle.length > 70 
    ? fullTitle.substring(0, 67) + '...'
    : fullTitle;
}

/**
 * Generate SEO for service pages specifically
 * Optimized for Example Company garage door services
 */
export function generateServiceSEO(options: {
  service: string;
  location?: string;
  content: string;
  additionalKeywords?: string[];
}): GeneratedSEO {
  const { service, location, content, additionalKeywords = [] } = options;
  
  const serviceKeywords = [
    service,
    `${service} services`,
    `${service} booking`,
    `${service} accommodation`,
    'hotel services',
    'hotel pristina',
    'accommodation kosovo',
    ...additionalKeywords,
  ];
  
  if (location) {
    serviceKeywords.push(
      `${service} in ${location}`,
      `hotel services in ${location}`,
      `accommodation in ${location}`,
      location
    );
  }
  
  return generateSEOContent({
    pageType: 'service',
    title: service,
    content,
    location,
    service,
    keywords: serviceKeywords,
  });
}

/**
 * Generate SEO for location pages specifically
 * Optimized for city/area specific pages
 */
export function generateLocationSEO(options: {
  location: string;
  content: string;
  services?: string[];
}): GeneratedSEO {
  const { location, content, services = [] } = options;
  
  const locationKeywords = [
    location,
    `hotel in ${location}`,
    `accommodation in ${location}`,
    'hotel booking',
    'rooms and suites',
    'luxury apartments',
    ...services,
  ];
  
  return generateSEOContent({
    pageType: 'location',
    title: `Hotel Accommodation in ${location}`,
    content,
    location,
    keywords: locationKeywords,
  });
}

/**
 * Generate SEO for blog posts
 * Optimized for article content
 */
export function generateBlogSEO(options: {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
}): GeneratedSEO {
  const { title, content, excerpt, tags = [] } = options;
  
  const blogKeywords = [
    'travel tips kosovo',
    'pristina attractions',
    'kosovo tourism',
    'hotel xhema blog',
    ...tags,
  ];
  
  return generateSEOContent({
    pageType: 'blog',
    title,
    content: excerpt || content,
    keywords: blogKeywords,
  });
}

/**
 * Validate generated SEO content
 * Ensures SEO content meets best practices
 */
export function validateSEO(seo: GeneratedSEO): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  // Validate title length
  if (seo.title.length < 30) {
    warnings.push('Title is too short (minimum 30 characters recommended)');
  }
  if (seo.title.length > 70) {
    warnings.push('Title is too long (maximum 70 characters recommended)');
  }
  
  // Validate description length
  if (seo.description.length < 120) {
    warnings.push('Description is too short (minimum 120 characters recommended)');
  }
  if (seo.description.length > 160) {
    warnings.push('Description is too long (maximum 160 characters recommended)');
  }
  
  // Validate keywords
  if (seo.keywords.length < 3) {
    warnings.push('Too few keywords (minimum 3 recommended)');
  }
  if (seo.keywords.length > 10) {
    warnings.push('Too many keywords (maximum 10 recommended)');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
  };
}
