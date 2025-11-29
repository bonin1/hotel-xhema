"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '@/lib/LanguageContext';
import { t, type Language } from '@/lib/translations';

export default function RoomsPage() {
  const { language } = useLanguage();
  
  // Feature translation helper
  const translateFeature = (feature: string, lang: Language): string => {
    const featureMap: { [key: string]: { en: string; sq: string } } = {
      "Private Balcony with city views": { en: "Private Balcony with city views", sq: "Ballkon Privat me pamje të qytetit" },
      "Smart TV with Netflix": { en: "Smart TV with Netflix", sq: "Smart TV me Netflix" },
      "Air Conditioning": { en: "Air Conditioning", sq: "Kondicionim Ajri" },
      "Free High-Speed WiFi": { en: "Free High-Speed WiFi", sq: "WiFi Falas me Shpejtësi të Lartë" },
      "Private Bathroom with premium toiletries": { en: "Private Bathroom with premium toiletries", sq: "Banjo Private me produkte kozmetike premium" },
      "Work Desk": { en: "Work Desk", sq: "Tavolinë Pune" },
      "Mini Refrigerator": { en: "Mini Refrigerator", sq: "Mini Frigorifer" },
      "Coffee/Tea Making Facilities": { en: "Coffee/Tea Making Facilities", sq: "Pajisje për Kafe/Çaj" },
      "Additional mattresses available (up to 5 comfortable guests)": { en: "Additional mattresses available (up to 5 comfortable guests)", sq: "Dyshekë shtesë të disponueshëm (deri në 5 mysafirë komodë)" },
      "Private Balcony": { en: "Private Balcony", sq: "Ballkon Privat" },
      "Private Bathroom": { en: "Private Bathroom", sq: "Banjo Private" },
      "Wardrobe": { en: "Wardrobe", sq: "Dollap" }
    };
    return featureMap[feature]?.[lang] || feature;
  };
  
  const rooms = [
    {
      id: "luxury-apartment-1",
      name: "Luxury Apartment 1",
      type: "Apartment",
      count: 1,
      basePrice: 40,
      twoPersonPrice: 60,
      maxGuests: 8,
      comfortGuests: 5,
      size: "45m²",
      bed: "King Bed",
      features: [
        "Private Balcony with city views",
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom with premium toiletries",
        "Work Desk",
        "Mini Refrigerator",
        "Coffee/Tea Making Facilities",
        "Additional mattresses available (up to 5 comfortable guests)"
      ]
    },
    {
      id: "luxury-apartment-2",
      name: "Luxury Apartment 2",
      type: "Apartment",
      count: 1,
      basePrice: 40,
      twoPersonPrice: 60,
      maxGuests: 8,
      comfortGuests: 5,
      size: "45m²",
      bed: "King Bed",
      features: [
        "Private Balcony with city views",
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom with premium toiletries",
        "Work Desk",
        "Mini Refrigerator",
        "Coffee/Tea Making Facilities",
        "Additional mattresses available (up to 5 comfortable guests)"
      ]
    },
    {
      id: "twin-room-1",
      name: "Twin Room 1",
      type: "Twin Room",
      count: 1,
      basePrice: 28,
      twoPersonPrice: 39,
      maxGuests: 2,
      size: "30m²",
      bed: "Two Single Beds",
      features: [
        "Private Balcony",
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom",
        "Work Desk",
        "Wardrobe"
      ]
    },
    {
      id: "twin-room-2",
      name: "Twin Room 2",
      type: "Twin Room",
      count: 1,
      basePrice: 28,
      twoPersonPrice: 39,
      maxGuests: 2,
      size: "30m²",
      bed: "Two Single Beds",
      features: [
        "Private Balcony",
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom",
        "Work Desk",
        "Wardrobe"
      ]
    },
    {
      id: "double-room-1",
      name: "Double Room 1",
      type: "Double Room",
      count: 1,
      basePrice: 28,
      twoPersonPrice: 39,
      maxGuests: 2,
      size: "28m²",
      bed: "Double Bed",
      features: [
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom",
        "Work Desk",
        "Wardrobe"
      ]
    },
    {
      id: "double-room-2",
      name: "Double Room 2",
      type: "Double Room",
      count: 1,
      basePrice: 28,
      twoPersonPrice: 39,
      maxGuests: 2,
      size: "28m²",
      bed: "Double Bed",
      features: [
        "Smart TV with Netflix",
        "Air Conditioning",
        "Free High-Speed WiFi",
        "Private Bathroom",
        "Work Desk",
        "Wardrobe"
      ]
    },
  ];

  const calculateApartmentPrice = (guests: number) => {
    if (guests === 1) return 40;
    if (guests === 2) return 60;
    return 60 + ((guests - 2) * 30);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Mobile navbar: 10vh + 8vh = 18vh total height */}
      {/* Desktop navbar: 12vh total height */}
      {/* Using pt-16 for mobile and desktop standard spacing */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('ourRoomsTitle', language)}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t('ourRoomsSubtitle', language)}
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="pt-16 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, idx) => {
              // Map room IDs to folder names
              const folderMap: { [key: string]: string } = {
                'luxury-apartment-1': 'apartment1',
                'luxury-apartment-2': 'apartment2',
                'twin-room-1': 'twin1',
                'twin-room-2': 'twin2',
                'double-room-1': 'double1',
                'double-room-2': 'double2'
              };
              const folderName = folderMap[room.id];
              const imageName = room.id === 'luxury-apartment-1' ? 'View1.jpg' : 'Main View.jpg';
              
              return (
              <Link key={idx} href={`/rooms/${room.id}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 block cursor-pointer">
                <div className="relative h-56">
                  <Image
                    src={`/images/rooms/${folderName}/${imageName}`}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-neutral-900">{room.name}</h2>
                    <span className="text-xs px-3 py-1 rounded-full font-semibold bg-primary-100 text-primary-800">
                      {room.type}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    {room.type === "Apartment" ? (
                      <div className="text-sm text-neutral-600">
                        <span className="text-2xl font-bold text-primary-800">€{room.basePrice}</span>
                        <span className="text-neutral-600"> (1 {t('guest', language)})</span>
                        <span className="mx-2">•</span>
                        <span className="text-2xl font-bold text-primary-800">€{room.twoPersonPrice}</span>
                        <span className="text-neutral-600"> (2 {t('guests', language)})</span>
                        <div className="mt-1 text-xs text-neutral-600">+€30 {t('perAdditionalGuest', language)} ({t('max', language)} {room.maxGuests})</div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-600">
                        <span className="text-2xl font-bold text-primary-800">€{room.basePrice}</span>
                        <span className="text-neutral-600"> (1 {t('guest', language)})</span>
                        <span className="mx-2">•</span>
                        <span className="text-2xl font-bold text-primary-800">€{room.twoPersonPrice}</span>
                        <span className="text-neutral-600"> (2 {t('guests', language)})</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-neutral-600 mb-4 pb-4 border-b border-neutral-200">
                    <span>{room.size}</span>
                    <span>•</span>
                    <span>{room.bed}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-3">{t('roomFeatures', language)}</h3>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-neutral-700 text-sm">
                        <svg className="w-5 h-5 text-primary-800 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {translateFeature(feature, language)}
                      </li>
                    ))}
                  </ul>
                  <div className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-lg font-semibold transition-colors">
                    {t('viewDetails', language)}
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="pt-16 pb-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-neutral-900">
            {t('allRoomsIncludeTitle', language)}
          </h2>
          <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
            {t('allRoomsIncludeSubtitle', language)}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                title: t('freeWifi', language), 
                desc: t('highSpeedInternet', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('smartTvNetflix', language), 
                desc: t('entertainment', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('airConditioning', language), 
                desc: t('climateControl', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('freeParking', language), 
                desc: t('secureOnSite', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/></svg>
              },
              { 
                title: t('dailyHousekeeping', language), 
                desc: t('freshTowelsLinens', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('reception247Full', language), 
                desc: t('alwaysHereToHelp', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('centralLocation', language), 
                desc: t('minToCenter', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
              },
              { 
                title: t('privateBathroom', language), 
                desc: t('modernFixtures', language),
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
              },
            ].map((amenity, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-center">
                <div className="flex justify-center mb-4 text-primary-800">
                  {amenity.icon}
                </div>
                <h3 className="font-bold text-neutral-900 mb-2 text-lg">{amenity.title}</h3>
                <p className="text-sm text-neutral-600">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 pt-16 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('readyToBookTitle', language)}
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            {t('readyToBookSubtitle', language)}
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-colors"
          >
            {t('bookNow', language)}
          </Link>
        </div>
      </section>
    </main>
  );
}

