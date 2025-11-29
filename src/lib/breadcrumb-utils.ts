import { siteConfig } from './seo-config';

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

export interface BreadcrumbConfig {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeText?: string;
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  breadcrumbs.push({
    name: 'Home',
    url: '/',
    position: 1
  });

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      url: `${currentPath}/`,
      position: index + 2
    });
  });

  return breadcrumbs;
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": `${siteConfig.url}${item.url}`
    }))
  };
}

export function getBreadcrumbProps(pathname: string) {
  const breadcrumbs = generateBreadcrumbs(pathname);
  const schema = generateBreadcrumbSchema(breadcrumbs);
  
  return {
    breadcrumbs,
    schema,
    currentPage: breadcrumbs[breadcrumbs.length - 1]?.name || 'Home'
  };
}

export function getPageHierarchyLevel(pathname: string): number {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length + 1;
}

export function getParentPageUrl(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return null;
  
  segments.pop(); 
  return segments.length > 0 ? `/${segments.join('/')}/` : '/'; 
}

export function getSiblingPages(pathname: string, allRoutes: string[]): string[] {
  const parentUrl = getParentPageUrl(pathname);
  if (!parentUrl) return [];
  
  return allRoutes.filter(route => {
    const routeParent = getParentPageUrl(route);
    return routeParent === parentUrl && route !== pathname;
  });
}
