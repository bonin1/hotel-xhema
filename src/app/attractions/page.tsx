"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

export default function AttractionsPage() {
  const { language } = useLanguage();
  
  const getAttractionName = (slug: string): string => {
    const names: { [key: string]: { en: string; sq: string } } = {
      "newborn-monument": { en: "Newborn Monument", sq: "Monumenti Newborn" },
      "mother-teresa-cathedral": { en: "Mother Teresa Cathedral", sq: "Katedralja Nënë Tereza" },
      "national-library": { en: "National Library of Kosovo", sq: "Biblioteka Kombëtare e Kosovës" },
      "germia-park": { en: "Germia Park", sq: "Parku i Gërmisë" },
      "kosovo-museum": { en: "Kosovo Museum", sq: "Muzeu i Kosovës" },
      "city-center": { en: "Pristina City Center", sq: "Qendra e Qytetit Prishtinë" },
      "skanderbeg-square": { en: "Skanderbeg Square", sq: "Sheshi Skënderbeu" },
      "ethnographic-museum": { en: "Ethnographic Museum", sq: "Muzeu Etnografik" }
    };
    return names[slug]?.[language] || slug;
  };

  const getAttractionCategory = (category: string): string => {
    const categories: { [key: string]: { en: string; sq: string } } = {
      "Landmark": { en: "Landmark", sq: "Monument" },
      "Religious Site": { en: "Religious Site", sq: "Vend Fetar" },
      "Architecture": { en: "Architecture", sq: "Arkitekturë" },
      "Nature": { en: "Nature", sq: "Natyrë" },
      "Museum": { en: "Museum", sq: "Muze" },
      "Shopping": { en: "Shopping", sq: "Blerje" },
      "Public Space": { en: "Public Space", sq: "Hapësirë Publike" }
    };
    return categories[category]?.[language] || category;
  };

  const getAttractionDistance = (distance: string): string => {
    if (language === 'sq') {
      return distance.replace('min walk', 'min ecje').replace('min drive', 'min me makinë');
    }
    return distance;
  };

  const getAttractionDescription = (slug: string): string => {
    const descriptions: { [key: string]: { en: string; sq: string } } = {
      "newborn-monument": { 
        en: "Iconic symbol of Kosovo's independence, repainted annually with different themes and messages.", 
        sq: "Simbol ikonik i pavarësisë së Kosovës, rilyesuar çdo vit me tema dhe mesazhe të ndryshme." 
      },
      "mother-teresa-cathedral": { 
        en: "Beautiful modern cathedral dedicated to Mother Teresa, featuring stunning architecture and peaceful atmosphere.", 
        sq: "Katedrale e bukur moderne e dedikuar Nënë Terezës, me arkitekturë mahnitëse dhe atmosferë paqësore." 
      },
      "national-library": { 
        en: "Unique brutalist architecture covered in distinctive metal netting, one of the most photographed buildings in Pristina.", 
        sq: "Arkitekturë brutale unike e mbuluar me rrjetë metalike dalluese, një nga ndërtesat më të fotografuara në Prishtinë." 
      },
      "germia-park": { 
        en: "Large green oasis perfect for hiking, picnics, and outdoor activities. Features restaurant and swimming pool.", 
        sq: "Oaz i madh i gjelbër perfekt për ecje, piknike dhe aktivitete në natyrë. Ka restorant dhe pishinë." 
      },
      "kosovo-museum": { 
        en: "Learn about Kosovo's rich history and culture through archaeological and ethnological exhibitions.", 
        sq: "Mësoni për historinë e pasur dhe kulturën e Kosovës përmes ekspozitave arkeologjike dhe etnologjike." 
      },
      "city-center": { 
        en: "Modern shopping mall with international brands, cinema, restaurants, and cafes.", 
        sq: "Qendër moderne tregtare me marka ndërkombëtare, kinema, restorante dhe kafene." 
      },
      "skanderbeg-square": { 
        en: "Central square with statue of Albanian national hero, surrounded by cafes and government buildings.", 
        sq: "Shesh qendror me statujën e heroit kombëtar shqiptar, i rrethuar nga kafene dhe ndërtesa qeveritare." 
      },
      "ethnographic-museum": { 
        en: "Traditional Ottoman-era house showcasing Kosovo's cultural heritage and traditional lifestyle.", 
        sq: "Shtëpi tradicionale e epokës osmane që paraqet trashëgiminë kulturore dhe stilin tradicional të jetesës në Kosovë." 
      }
    };
    return descriptions[slug]?.[language] || "";
  };

  const attractions = [
    {
      slug: "newborn-monument",
      name: "Newborn Monument",
      category: "Landmark",
      distance: "8 min walk",
      description: "Iconic symbol of Kosovo's independence, repainted annually with different themes and messages.",
      image: "/images/attractions/newborn/newborn-monument1.jpg"
    },
    {
      slug: "mother-teresa-cathedral",
      name: "Mother Teresa Cathedral",
      category: "Religious Site",
      distance: "12 min walk",
      description: "Beautiful modern cathedral dedicated to Mother Teresa, featuring stunning architecture and peaceful atmosphere.",
      image: "/images/attractions/cathedral/la-cattedrale1.jpg"
    },
    {
      slug: "national-library",
      name: "National Library of Kosovo",
      category: "Architecture",
      distance: "15 min walk",
      description: "Unique brutalist architecture covered in distinctive metal netting, one of the most photographed buildings in Pristina.",
      image: "/images/attractions/library/Libraria1.webp"
    },
    {
      slug: "germia-park",
      name: "Germia Park",
      category: "Nature",
      distance: "10 min drive",
      description: "Large green oasis perfect for hiking, picnics, and outdoor activities. Features restaurant and swimming pool.",
      image: "/images/attractions/germia/Germia 1.webp"
    },
    {
      slug: "kosovo-museum",
      name: "Kosovo Museum",
      category: "Museum",
      distance: "10 min walk",
      description: "Learn about Kosovo's rich history and culture through archaeological and ethnological exhibitions.",
      image: "/images/attractions/museum/Museum 1.webp"
    },
    {
      slug: "city-center",
      name: "Pristina City Center",
      category: "Shopping",
      distance: "7 min walk",
      description: "Modern shopping mall with international brands, cinema, restaurants, and cafes.",
      image: "/images/attractions/citycenter/Center 1.webp"
    },
    {
      slug: "skanderbeg-square",
      name: "Skanderbeg Square",
      category: "Public Space",
      distance: "8 min walk",
      description: "Central square with statue of Albanian national hero, surrounded by cafes and government buildings.",
      image: "/images/attractions/skanderbeg/Skanderbeg 1.jpg"
    },
    {
      slug: "ethnographic-museum",
      name: "Ethnographic Museum",
      category: "Museum",
      distance: "10 min walk",
      description: "Traditional Ottoman-era house showcasing Kosovo's cultural heritage and traditional lifestyle.",
      image: "/images/attractions/ethnographic/Ethno 1.jpg"
    },
  ];

  const restaurants = [
    {
      name: "Tiffany",
      cuisine: "International",
      priceRange: "€€€",
      description: "Upscale dining with panoramic city views and extensive wine selection."
    },
    {
      name: "Pishat",
      cuisine: "Traditional Albanian",
      priceRange: "€€",
      description: "Authentic local cuisine in rustic setting, famous for grilled meats and traditional dishes."
    },
    {
      name: "Renaissance",
      cuisine: "Mediterranean",
      priceRange: "€€€",
      description: "Elegant atmosphere with creative Mediterranean cuisine and excellent service."
    },
    {
      name: "Babaghanoush",
      cuisine: "Middle Eastern",
      priceRange: "€€",
      description: "Popular spot for falafel, hummus, and other Middle Eastern specialties."
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Mobile navbar: 10vh + 8vh = 18vh total height */}
      {/* Desktop navbar: 12vh total height */}
      {/* Using pt-16 for mobile and desktop standard spacing */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('explorePristinaTitle', language)}</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('explorePristinaSubtitle', language)}
          </p>
        </div>
      </section>

      {/* Main Attractions */}
<section className="pt-16 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('topAttractions', language)}</h2>
            <p className="text-neutral-600">{t('mustVisitPlaces', language)}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, idx) => (
              <Link 
                key={idx} 
                href={`/attractions/${attraction.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={attraction.image}
                    alt={getAttractionName(attraction.slug)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-xl font-bold text-neutral-900 flex-1">{getAttractionName(attraction.slug)}</h3>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap flex-shrink-0">
                      {getAttractionCategory(attraction.category)}
                    </span>
                  </div>
                  <p className="text-sm text-primary-800 font-semibold mb-3">{getAttractionDistance(attraction.distance)}</p>
                  <p className="text-neutral-700 mb-4">{getAttractionDescription(attraction.slug)}</p>
                  <div className="text-primary-800 font-semibold flex items-center">
                    {t('learnMore', language)} 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
<section className="pt-16 pb-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">{t('whereToEat', language)}</h2>
            <p className="text-neutral-600">{t('recommendedRestaurants', language)}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-neutral-900">{restaurant.name}</h3>
                  <span className="text-primary-800 font-semibold">{restaurant.priceRange}</span>
                </div>
                <p className="text-sm text-primary-800 font-semibold mb-3">{restaurant.cuisine}</p>
                <p className="text-neutral-700">{restaurant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Around */}
<section className="pt-16 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">{t('gettingAround', language)}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{t('walking', language)}</h3>
              <p className="text-neutral-600">{t('walkingDesc', language)}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{t('publicTransport', language)}</h3>
              <p className="text-neutral-600">{t('publicTransportDesc', language)}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{t('taxiServices', language)}</h3>
              <p className="text-neutral-600">{t('taxiServicesDesc', language)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Mobile: pt-12 pb-12 standard spacing */}
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 pt-16 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('exploreFromHotel', language)}
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            {t('exploreCta', language)}
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-colors"
          >
            {t('bookYourStay', language)}
          </Link>
        </div>
      </section>
    </main>
  );
}


