import { Metadata } from 'next';
import { siteConfig, roomsSEOData } from '../../../lib/seo-config';
import { BUSINESS_INFO, CONTACT } from '../../../lib/business-config';
import { calculateAggregateRating, generateAggregateRatingSchema } from '../../../lib/review-schema';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const room = roomsSEOData[params.id];
  
  if (!room) {
    return {
      title: 'Room Not Found - Hotel Xhema',
      description: 'The requested room could not be found.',
    };
  }

  const baseUrl = siteConfig.url;
  const imageUrl = `${baseUrl}${room.ogImage}`;
  const roomUrl = `${baseUrl}/rooms/${params.id}`;

  return {
    title: `${room.name} - Hotel Xhema Pristina`,
    description: room.description,
    keywords: [`${room.name.toLowerCase()} pristina`, "hotel xhema rooms", room.price, "accommodation kosovo", "pristina hotels"],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    alternates: {
      canonical: roomUrl,
      languages: {
        'x-default': `${baseUrl}/`,
        'en-US': roomUrl,
      },
    },
    openGraph: {
      title: `${room.name} - Hotel Xhema Pristina`,
      description: room.description,
      url: roomUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${room.name} at Hotel Xhema - ${room.price} per night`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.name} - Hotel Xhema Pristina`,
      description: room.description,
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

export default function RoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const room = roomsSEOData[params.id];
  
  if (!room) {
    return <>{children}</>;
  }

  // Calculate aggregate rating from reviews
  const aggregateRating = calculateAggregateRating();

  // Hotel Room Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "name": room.name,
    "description": room.description,
    "image": `${siteConfig.url}${room.ogImage}`,
    "url": `${siteConfig.url}/rooms/${params.id}`,
    "aggregateRating": generateAggregateRatingSchema(aggregateRating),
    "containedInPlace": {
      "@type": "Hotel",
      "name": BUSINESS_INFO.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CONTACT.street,
        "addressLocality": CONTACT.city,
        "postalCode": CONTACT.zip,
        "addressCountry": "XK"
      },
      "telephone": `+383 ${CONTACT.phone}`,
      "email": CONTACT.email,
      "url": BUSINESS_INFO.websiteUrl
    },
    "bed": room.amenities.find(a => a.includes("Bed")),
    "amenityFeature": room.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "offers": {
      "@type": "Offer",
      "price": room.price.replace(/[€-]/g, ''),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `${siteConfig.url}/booking?room=${params.id}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
