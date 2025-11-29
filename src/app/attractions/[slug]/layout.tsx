import { Metadata } from 'next';
import { siteConfig, attractionsSEOData } from '@/lib/seo-config';
import { BUSINESS_INFO, CONTACT } from '@/lib/business-config';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const attraction = attractionsSEOData[params.slug];
  
  if (!attraction) {
    return {
      title: 'Attraction Not Found - Hotel Xhema Pristina Guide',
      description: 'The requested attraction could not be found.',
    };
  }

  const baseUrl = siteConfig.url;
  const imageUrl = `${baseUrl}${attraction.ogImage}`;
  const attractionUrl = `${baseUrl}/attractions/${params.slug}`;

  return {
    title: `${attraction.name} - Pristina Attractions | Hotel Xhema`,
    description: attraction.description,
    keywords: [`${attraction.name.toLowerCase()}`, "pristina attractions", "things to do pristina", attraction.category.toLowerCase(), "kosovo tourism", "hotel xhema location"],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    alternates: {
      canonical: attractionUrl,
      languages: {
        'x-default': `${baseUrl}/`,
        'en-US': attractionUrl,
      },
    },
    openGraph: {
      title: `${attraction.name} - Pristina Attractions | Hotel Xhema`,
      description: attraction.description,
      url: attractionUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${attraction.name} in Pristina, Kosovo`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${attraction.name} - Pristina Attractions | Hotel Xhema`,
      description: attraction.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'XK',
      'geo.position': '42.669889;21.164993',
      'geo.placename': 'Prishtina, Kosovo',
    },
  };
}

export default function AttractionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const attraction = attractionsSEOData[params.slug];
  
  if (!attraction) {
    return <>{children}</>;
  }

  // TouristAttraction Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": attraction.name,
    "description": attraction.description,
    "image": `${siteConfig.url}${attraction.ogImage}`,
    "url": `${siteConfig.url}/attractions/${params.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": attraction.address,
      "addressLocality": "Prishtina",
      "postalCode": "10000",
      "addressCountry": "XK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.669889",
      "longitude": "21.164993"
    },
    "touristType": [attraction.category],
    "isAccessibleForFree": true,
    "publicAccess": true
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Attractions",
        "item": `${siteConfig.url}/attractions`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": attraction.name,
        "item": `${siteConfig.url}/attractions/${params.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {children}
    </>
  );
}
