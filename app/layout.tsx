import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";
import LayoutContent from "../components/LayoutContent";
import { generateMetadataFromConfig } from "../lib/seo-metadata";
import { BUSINESS_INFO, CONTACT } from "../lib/business-config";
import { calculateAggregateRating, generateAggregateRatingSchema } from "../lib/review-schema";
import { generateFAQSchema } from "../lib/faq-schema";

// Generate SEO metadata using centralized configuration
export const metadata: Metadata = {
  ...generateMetadataFromConfig("/"),
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hotelxhema.com'),
  icons: {
    icon: [
      {
        url: '/images/logo/BlackLogo.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/logo/Logo.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/images/logo/Logo.svg',
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Calculate aggregate rating from reviews
  const aggregateRating = calculateAggregateRating();
  
  // Hotel Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": BUSINESS_INFO.name,
    "description": "Comfortable accommodation in the heart of Pristina, Kosovo. Modern rooms, luxury apartments with city views, and warm hospitality. Walking distance to major attractions.",
    "image": `${BUSINESS_INFO.websiteUrl}/images/rooms/apartment1/View1.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT.street,
      "addressLocality": CONTACT.city,
      "postalCode": CONTACT.zip,
      "addressCountry": "XK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.669889",
      "longitude": "21.164993"
    },
    "telephone": `+383 ${CONTACT.phone}`,
    "email": CONTACT.email,
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    },
    "aggregateRating": generateAggregateRatingSchema(aggregateRating),
    "priceRange": "€28-120",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Front Desk" },
      { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" },
      { "@type": "LocationFeatureSpecification", "name": "City Views" },
      { "@type": "LocationFeatureSpecification", "name": "Concierge Services" },
      { "@type": "LocationFeatureSpecification", "name": "Daily Housekeeping" }
    ],
    "openingHours": "Mo-Su 00:00-24:00",
    "url": BUSINESS_INFO.websiteUrl
  };

  // FAQ Schema for homepage
  const faqSchema = generateFAQSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}

