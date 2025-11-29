"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from '@/lib/LanguageContext';
import { t, type Language } from '@/lib/translations';

// Feature translation helper (same as rooms page)
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
    "Wardrobe": { en: "Wardrobe", sq: "Dollap" },
    "Two Single Beds": { en: "Two Single Beds", sq: "Dy Krevate të Vegjël" },
    "Daily Housekeeping": { en: "Daily Housekeeping", sq: "Pastrimi Ditor" },
    "Fresh Towels & Linens": { en: "Fresh Towels & Linens", sq: "Peshqirë & çarçafë të freskëta" },
    "24/7 Reception": { en: "24/7 Reception", sq: "Recepsioni 24/7" },
    "Free Parking": { en: "Free Parking", sq: "Parking Falas" },
    "Central Location (5-10 min walk to city center)": { en: "Central Location (5-10 min walk to city center)", sq: "Vendndodhje Qendrore (5-10 min ecje deri në qendrën e qytetit)" }
  };
  return featureMap[feature]?.[lang] || feature;
};

const roomsData = {
  "luxury-apartment-1": {
    name: "Luxury Apartment 1",
    type: "Apartment",
    basePrice: 40,
    twoPersonPrice: 60,
    maxGuests: 8,
    comfortGuests: 5,
    size: "45m²",
    bed: "King Bed",
    description: "Experience luxury in our spacious apartment featuring a private balcony with stunning city views. Perfect for families or groups, this apartment offers premium comfort with the flexibility to accommodate up to 8 guests.",
    images: [
      "/images/rooms/apartment1/View1.jpg",
      "/images/rooms/apartment1/View2.jpg",
      "/images/rooms/apartment1/View 3.jpg",
      "/images/rooms/apartment1/Jacuzi.jpg",
      "/images/rooms/apartment1/JacuziView2.jpg"
    ],
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
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  },
  "luxury-apartment-2": {
    name: "Luxury Apartment 2",
    type: "Apartment",
    basePrice: 40,
    twoPersonPrice: 60,
    maxGuests: 8,
    comfortGuests: 5,
    size: "45m²",
    bed: "King Bed",
    description: "Our second luxury apartment offers the same exceptional comfort and amenities as Apartment 1. Ideal for travelers seeking space and flexibility with modern conveniences.",
    images: [
      "/images/rooms/apartment2/Main View.jpg",
      "/images/rooms/apartment2/View1.jpg",
      "/images/rooms/apartment2/View2.jpg",
      "/images/rooms/apartment2/View3.jpg"
    ],
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
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  },
  "twin-room-1": {
    name: "Twin Room 1",
    type: "Twin Room",
    basePrice: 28,
    twoPersonPrice: 39,
    maxGuests: 2,
    comfortGuests: 2,
    size: "30m²",
    bed: "Two Single Beds",
    description: "Perfect for friends or colleagues traveling together, our Twin Room features two comfortable single beds and a private balcony. Enjoy modern amenities in a cozy, well-appointed space.",
    images: [
      "/images/rooms/twin1/Main View.jpg",
      "/images/rooms/twin1/View 1.jpg",
      "/images/rooms/twin1/View 2.jpg",
      "/images/rooms/twin1/View 3.jpg",
      "/images/rooms/twin1/View 4.jpg",
      "/images/rooms/twin1/View 5.jpg"
    ],
    features: [
      "Private Balcony",
      "Smart TV with Netflix",
      "Air Conditioning",
      "Free High-Speed WiFi",
      "Private Bathroom",
      "Work Desk",
      "Wardrobe"
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  },
  "twin-room-2": {
    name: "Twin Room 2",
    type: "Twin Room",
    basePrice: 28,
    twoPersonPrice: 39,
    maxGuests: 2,
    comfortGuests: 2,
    size: "30m²",
    bed: "Two Single Beds",
    description: "Our second Twin Room provides the same comfortable setup with two single beds and a private balcony. Ideal for travelers who prefer separate sleeping arrangements.",
    images: [
      "/images/rooms/twin2/Main View.jpg",
      "/images/rooms/twin2/View1.jpg",
      "/images/rooms/twin2/View2.jpg",
      "/images/rooms/twin2/View3.jpg"
    ],
    features: [
      "Private Balcony",
      "Smart TV with Netflix",
      "Air Conditioning",
      "Free High-Speed WiFi",
      "Private Bathroom",
      "Work Desk",
      "Wardrobe"
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  },
  "double-room-1": {
    name: "Double Room 1",
    type: "Double Room",
    basePrice: 28,
    twoPersonPrice: 39,
    maxGuests: 2,
    comfortGuests: 2,
    size: "28m²",
    bed: "Double Bed",
    description: "Cozy and comfortable, our Double Room is perfect for couples or solo travelers seeking quality accommodations. Equipped with all essential amenities for a pleasant stay.",
    images: [
      "/images/rooms/double1/Main View.jpg",
      "/images/rooms/double1/View2.jpg"
    ],
    features: [
      "Smart TV with Netflix",
      "Air Conditioning",
      "Free High-Speed WiFi",
      "Private Bathroom",
      "Work Desk",
      "Wardrobe"
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  },
  "double-room-2": {
    name: "Double Room 2",
    type: "Double Room",
    basePrice: 28,
    twoPersonPrice: 39,
    maxGuests: 2,
    comfortGuests: 2,
    size: "28m²",
    bed: "Double Bed",
    description: "Experience comfort and convenience in our second Double Room. Featuring a comfortable double bed and modern amenities, it's an excellent choice for a relaxing stay in Pristina.",
    images: [
      "/images/rooms/double2/Main View.jpg",
      "/images/rooms/double2/View2.jpg",
      "/images/rooms/double2/View3.jpg",
      "/images/rooms/double2/View 4.jpg"
    ],
    features: [
      "Smart TV with Netflix",
      "Air Conditioning",
      "Free High-Speed WiFi",
      "Private Bathroom",
      "Work Desk",
      "Wardrobe"
    ],
    amenities: [
      "Daily Housekeeping",
      "Fresh Towels & Linens",
      "24/7 Reception",
      "Free Parking",
      "Central Location (5-10 min walk to city center)"
    ]
  }
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const roomId = params?.id as string;
  const room = roomsData[roomId as keyof typeof roomsData];

  const [guests, setGuests] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  if (!room) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">{t('roomNotFound', language)}</h1>
          <Link href="/rooms" className="text-primary-800 hover:text-primary-900 underline">
            {t('backToRooms', language)}
          </Link>
        </div>
      </main>
    );
  }

  const calculatePrice = () => {
    if (room.type === "Apartment") {
      if (guests === 1) return room.basePrice;
      if (guests === 2) return room.twoPersonPrice;
      return room.twoPersonPrice + ((guests - 2) * 30);
    } else {
      return guests === 1 ? room.basePrice : room.twoPersonPrice;
    }
  };

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setLightboxImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-neutral-300 transition-colors z-50"
          >
            &times;
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white text-5xl hover:text-neutral-300 transition-colors z-50"
          >
            ‹
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white text-5xl hover:text-neutral-300 transition-colors z-50"
          >
            ›
          </button>
          
          <div 
            className="relative w-11/12 h-5/6 max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={room.images[lightboxImage]}
              alt={`${room.name} - View ${lightboxImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 text-white text-lg">
            {lightboxImage + 1} / {room.images.length}
          </div>
        </div>
      )}
      {/* Hero Section */}
      {/* Mobile: pt-16 ensures section starts below fixed navbar with standard spacing */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Link href="/rooms" className="text-primary-200 hover:text-white mb-4 inline-block">
            ← {t('backToAllRooms', language)}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{room.name}</h1>
          <p className="text-xl text-primary-100">{room.type}</p>
        </div>
      </section>

      {/* Room Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="relative rounded-xl h-96 overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(selectedImage)}
              >
                <Image
                  src={room.images[selectedImage]}
                  alt={`${room.name} - View ${selectedImage + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('clickToEnlarge', language)}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {room.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    onDoubleClick={() => openLightbox(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx 
                        ? 'border-primary-600 ring-2 ring-primary-300' 
                        : 'border-neutral-300 hover:border-primary-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${room.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('aboutThisRoomLabel', language)}</h2>
              <p className="text-neutral-700 leading-relaxed mb-6">{room.description}</p>
              
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-primary-800">{room.size}</div>
                  <div className="text-sm text-neutral-600 mt-1">{t('roomSizeLabel', language)}</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-primary-800">{room.bed}</div>
                  <div className="text-sm text-neutral-600 mt-1">{t('bedTypeLabel', language)}</div>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-primary-800">{room.maxGuests}</div>
                  <div className="text-sm text-neutral-600 mt-1">{t('maxGuestsText', language)}</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('roomFeaturesLabel', language)}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-800 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('hotelAmenitiesLabel', language)}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-800 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">{language === 'en' ? 'Explore Nearby Attractions' : 'Eksploroni Atraksionet Afër'}</h2>
              <p className="text-neutral-700 mb-6">
                {language === 'en' 
                  ? 'Hotel Xhema is perfectly located for exploring Pristina\'s top attractions, all within walking distance.' 
                  : 'Hotel Xhema është pozicionuar përsosur për të eksploruar atraksionet kryesore të Prishtinës, të gjitha brenda distancës së ecjes.'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/attractions/newborn-monument" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-700 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{language === 'en' ? 'Newborn Monument' : 'Monumenti Newborn'}</h3>
                      <p className="text-sm text-neutral-600">{language === 'en' ? '8 min walk' : '8 min ecje'}</p>
                    </div>
                  </div>
                </Link>
                <Link href="/attractions/mother-teresa-cathedral" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-700 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{language === 'en' ? 'Mother Teresa Cathedral' : 'Katedralja Nënë Tereza'}</h3>
                      <p className="text-sm text-neutral-600">{language === 'en' ? '12 min walk' : '12 min ecje'}</p>
                    </div>
                  </div>
                </Link>
                <Link href="/attractions/kosovo-museum" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-700 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{language === 'en' ? 'Kosovo Museum' : 'Muzeu i Kosovës'}</h3>
                      <p className="text-sm text-neutral-600">{language === 'en' ? '10 min walk' : '10 min ecje'}</p>
                    </div>
                  </div>
                </Link>
                <Link href="/attractions/city-center" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-700 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{language === 'en' ? 'City Center Mall' : 'Qendra e Qytetit'}</h3>
                      <p className="text-sm text-neutral-600">{language === 'en' ? '7 min walk' : '7 min ecje'}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <Link href="/attractions" className="inline-block text-primary-700 hover:text-primary-800 font-semibold">
                  {language === 'en' ? 'View All Attractions →' : 'Shiko të Gjitha Atraksionet →'}
                </Link>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{t('bookThisRoomLabel', language)}</h3>
              
              {/* Price Calculator for Apartments */}
              {room.type === "Apartment" && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    {t('numberOfGuestsText', language)}
                  </label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num} className="text-neutral-900">{num} {num === 1 ? t('guest', language) : t('guests', language)}</option>
                    ))}
                  </select>
                  {room.type === "Apartment" && guests > 5 && (
                    <p className="text-xs text-neutral-600 mt-2">
                      {t('note', language)}: {t('comfortablyAccommodates', language)} 5 {t('guests', language)}
                    </p>
                  )}
                </div>
              )}

              {/* Price Display */}
              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-neutral-600 mb-1">{t('pricePerNightLabel', language)}</div>
                <div className="text-4xl font-bold text-primary-800">€{calculatePrice()}</div>
                {room.type === "Apartment" && guests > 2 && (
                  <div className="text-xs text-neutral-600 mt-2">
                    {t('base', language)}: €{room.twoPersonPrice} + €{(guests - 2) * 30} {t('forExtra', language)} {guests - 2} {t('extra', language)} {guests - 2 === 1 ? t('guest', language) : t('guests', language)}
                  </div>
                )}
              </div>

              {/* Standard Pricing Info */}
              {room.type !== "Apartment" && (
                <div className="mb-6 text-sm text-neutral-600">
                  <div className="flex justify-between mb-1">
                    <span>1 {t('guest', language)}:</span>
                    <span className="font-semibold">€{room.basePrice}/{t('night', language)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 {t('guests', language)}:</span>
                    <span className="font-semibold">€{room.twoPersonPrice}/{t('night', language)}</span>
                  </div>
                </div>
              )}

              {/* Apartment Pricing Info */}
              {room.type === "Apartment" && (
                <div className="mb-6 text-sm text-neutral-600 border-t border-neutral-200 pt-4">
                  <div className="font-semibold mb-2">{t('pricingLabel', language)}:</div>
                  <div className="space-y-1">
                    <div>1 {t('guest', language)}: €{room.basePrice}/{t('night', language)}</div>
                    <div>2 {t('guests', language)}: €{room.twoPersonPrice}/{t('night', language)}</div>
                    <div>{t('eachAdditionalGuestText', language)}: +€30/{t('night', language)}</div>
                    <div className="text-xs text-neutral-600 mt-2">{t('max', language)} {room.maxGuests} {t('maxGuestsComfortText', language)} 5</div>
                  </div>
                </div>
              )}

              <Link
                href="/booking"
                className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-lg font-semibold transition-colors mb-3"
              >
                {t('bookNow', language)}
              </Link>

              <Link
                href="/contact"
                className="block w-full py-3 border-2 border-primary-800 text-primary-800 hover:bg-primary-50 text-center rounded-lg font-semibold transition-colors"
              >
                {t('contactUsLabel', language)}
              </Link>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-sm text-neutral-600">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-primary-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {t('freeCancellationText', language)}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-primary-800 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {t('bestPriceGuaranteeText', language)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
