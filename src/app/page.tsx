"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import HeroCarousel from "@/components/HeroCarousel";
import ReviewsSection from "@/components/ReviewsSection";
import AttractionsCarousel from "@/components/AttractionsCarousel";
import FAQSection from "@/components/FAQSection";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function Home() {
  const { language } = useLanguage();
  const roomsSection = useScrollAnimation(0.1);
  const attractionsSection = useScrollAnimation(0.1);
  const locationSection = useScrollAnimation(0.1);
  
  const [roomFilter, setRoomFilter] = useState<'apartment' | 'double' | 'twin'>('apartment'); // Default to apartment
  const [selectedApartment, setSelectedApartment] = useState(1); // 1 or 2
  const [selectedDouble, setSelectedDouble] = useState(1); // 1 or 2
  const [selectedTwin, setSelectedTwin] = useState(1); // 1 or 2
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [mobileMainImageIndex, setMobileMainImageIndex] = useState(0); // Track main image in mobile view

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % currentRoom.images.length);
  };

  const prevImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + currentRoom.images.length) % currentRoom.images.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, lightboxImageIndex]);


  // Reset mobile main image when room selection changes
  useEffect(() => {
    setMobileMainImageIndex(0);
  }, [roomFilter, selectedApartment, selectedDouble, selectedTwin]);

  // Room data with multiple images
  const rooms = [
    {
      id: 'luxury-apartment-1',
      type: 'apartment',
      name: { en: 'Luxury Apartment 1', sq: 'Apartament Luksoz 1' },
      price: '€40-120',
      description: { en: 'Spacious luxury apartment with king bed, private balcony, and stunning city views', sq: 'Apartament luksoz i gjerë me shtrat mbretëror, ballkon privat dhe pamje mahnitëse të qytetit' },
      images: ['/images/rooms/apartment1/View1.jpg', '/images/rooms/apartment1/View2.jpg', '/images/rooms/apartment1/View 3.jpg', '/images/rooms/apartment1/Jacuzi.jpg', '/images/rooms/apartment1/JacuziView2.jpg']
    },
    {
      id: 'luxury-apartment-2',
      type: 'apartment',
      name: { en: 'Luxury Apartment 2', sq: 'Apartament Luksoz 2' },
      price: '€40-120',
      description: { en: 'Modern luxury apartment featuring jacuzzi, balcony, and premium amenities', sq: 'Apartament modern luksoz me xhakuzi, ballkon dhe komoditet premium' },
      images: ['/images/rooms/apartment2/Main View.jpg', '/images/rooms/apartment2/View1.jpg', '/images/rooms/apartment2/View2.jpg', '/images/rooms/apartment2/View3.jpg']
    },
    {
      id: 'twin-room-1',
      type: 'twin',
      name: { en: 'Twin Room 1', sq: 'Dhomë Twin 1' },
      price: '€28-39',
      description: { en: 'Comfortable twin room with two single beds, perfect for friends or colleagues', sq: 'Dhomë twin komode me dy shtretër të vetëm, perfekte për miq ose kolegë' },
      images: ['/images/rooms/twin1/Main View.jpg', '/images/rooms/twin1/View 1.jpg', '/images/rooms/twin1/View 2.jpg', '/images/rooms/twin1/View 3.jpg', '/images/rooms/twin1/View 4.jpg']
    },
    {
      id: 'twin-room-2',
      type: 'twin',
      name: { en: 'Twin Room 2', sq: 'Dhomë Twin 2' },
      price: '€28-39',
      description: { en: 'Cozy twin room with balcony access and modern furnishings', sq: 'Dhomë twin komode me qasje në ballkon dhe mobilie moderne' },
      images: ['/images/rooms/twin2/Main View.jpg', '/images/rooms/twin2/View1.jpg', '/images/rooms/twin2/View2.jpg']
    },
    {
      id: 'double-room-1',
      type: 'double',
      name: { en: 'Double Room 1', sq: 'Dhomë Double 1' },
      price: '€28-39',
      description: { en: 'Intimate double room with comfortable double bed and warm ambiance', sq: 'Dhomë double intime me shtrat të dyfishtë komod dhe atmosferë të ngrohtë' },
      images: ['/images/rooms/double1/Main View.jpg', '/images/rooms/double1/View2.jpg']
    },
    {
      id: 'double-room-2',
      type: 'double',
      name: { en: 'Double Room 2', sq: 'Dhomë Double 2' },
      price: '€28-39',
      description: { en: 'Elegant double room with modern design and city views', sq: 'Dhomë double elegante me dizajn modern dhe pamje të qytetit' },
      images: ['/images/rooms/double2/Main View.jpg', '/images/rooms/double2/View2.jpg', '/images/rooms/double2/View3.jpg', '/images/rooms/double2/View 4.jpg']
    },
  ];

  const filteredRooms = rooms.filter(room => room.type === roomFilter);

  // Get display room based on selection
  const getDisplayRoom = (type: string) => {
    if (type === 'apartment') {
      return rooms.find(r => r.id === `luxury-apartment-${selectedApartment}`);
    } else if (type === 'double') {
      return rooms.find(r => r.id === `double-room-${selectedDouble}`);
    } else if (type === 'twin') {
      return rooms.find(r => r.id === `twin-room-${selectedTwin}`);
    }
    return null;
  };

  // Get the current room to display based on filter
  const currentRoom = getDisplayRoom(roomFilter)!;

  // Attractions data
  const attractions = [
    {
      slug: "newborn-monument",
      name: { en: "Newborn Monument", sq: "Monumenti Newborn" },
      distance: { en: "8 min walk", sq: "8 min ecje" },
      image: "/images/attractions/newborn/newborn-monument1.jpg"
    },
    {
      slug: "mother-teresa-cathedral",
      name: { en: "Mother Teresa Cathedral", sq: "Katedralja Nënë Tereza" },
      distance: { en: "10 min walk", sq: "10 min ecje" },
      image: "/images/attractions/cathedral/la-cattedrale1.jpg"
    },
    {
      slug: "national-library",
      name: { en: "National Library", sq: "Biblioteka Kombëtare" },
      distance: { en: "12 min walk", sq: "12 min ecje" },
      image: "/images/attractions/library/Libraria1.webp"
    },
    {
      slug: "germia-park",
      name: { en: "Germia Park", sq: "Parku i Gërmisë" },
      distance: { en: "15 min drive", sq: "15 min me makinë" },
      image: "/images/attractions/germia/Germia 1.webp"
    },
    {
      slug: "kosovo-museum",
      name: { en: "Kosovo Museum", sq: "Muzeu i Kosovës" },
      distance: { en: "7 min walk", sq: "7 min ecje" },
      image: "/images/attractions/museum/Museum 1.webp"
    },
    {
      slug: "city-center",
      name: { en: "City Center", sq: "Qendra e Qytetit" },
      distance: { en: "5 min walk", sq: "5 min ecje" },
      image: "/images/attractions/citycenter/Center 1.webp"
    },
    {
      slug: "skanderbeg-square",
      name: { en: "Skanderbeg Square", sq: "Sheshi Skënderbeu" },
      distance: { en: "9 min walk", sq: "9 min ecje" },
      image: "/images/attractions/skanderbeg/Skanderbeg 1.jpg"
    },
    {
      slug: "ethnographic-museum",
      name: { en: "Ethnographic Museum", sq: "Muzeu Etnologjik" },
      distance: { en: "11 min walk", sq: "11 min ecje" },
      image: "/images/attractions/ethnographic/Ethno 1.jpg"
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Section 1: Experience - Nearby Attractions */}
      <section 
        ref={attractionsSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          attractionsSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              {language === 'en' ? 'Experience Pristina' : 'Përjetoni Prishtinën'}
            </h2>
            <p className="text-base text-neutral-600">
              {language === 'en' ? 'Discover the best attractions near Hotel Xhema' : 'Zbuloni atraksionet më të mira pranë Hotel Xhema'}
            </p>
          </div>
          
          {/* Swiper Carousel */}
          <AttractionsCarousel 
            attractions={attractions}
            language={language}
          />

          <div className="text-center mt-6">
            <Link 
              href="/attractions" 
              className="inline-block px-6 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              {language === 'en' ? 'View All Attractions' : 'Shiko të Gjitha Atraksionet'}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Rooms with Gallery and Filters */}
      <section 
        ref={roomsSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-white ${
          roomsSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              {language === 'en' ? 'Our Rooms' : 'Dhomat Tona'}
            </h2>
            <p className="text-base text-neutral-600 mb-6">
              {language === 'en' ? 'Choose from our carefully designed accommodations' : 'Zgjidhni nga akomodimet tona të dizajnuara me kujdes'}
            </p>
          </div>

          {/* 3-Column Layout: Mobile gets stacked vertical layout, Desktop gets 3-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MOBILE LAYOUT (< lg) */}
            <div className="lg:hidden">
              {/* Room Filters - Inline on mobile */}
              <div className="flex flex-nowrap gap-2 mb-4 overflow-x-auto pb-2">
                {[
                  { key: 'apartment', label: { en: 'Apartments', sq: 'Apartamente' } },
                  { key: 'double', label: { en: 'Double Rooms', sq: 'Dhoma Double' } },
                  { key: 'twin', label: { en: 'Twin Rooms', sq: 'Dhoma Twin' } },
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setRoomFilter(filter.key as any)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm whitespace-nowrap flex-shrink-0 ${
                      roomFilter === filter.key
                        ? 'bg-primary-700 text-white shadow-lg'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {filter.label[language]}
                  </button>
                ))}
              </div>

              {/* Main large image - Below filters */}
              <div 
                className="relative h-64 sm:h-80 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mb-3"
                onClick={() => openLightbox(mobileMainImageIndex)}
              >
                <Image
                  src={currentRoom.images[mobileMainImageIndex]}
                  alt={`${currentRoom.name[language]} at Hotel Xhema Pristina - ${currentRoom.price} per night with modern amenities`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  quality={90}
                  loading="eager"
                />
              </div>

              {/* Smaller thumbnail images - Below main image */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {currentRoom.images.map((img: string, imgIdx: number) => (
                  <div 
                    key={imgIdx}
                    className={`relative h-16 rounded-md overflow-hidden cursor-pointer transition-all ${
                      mobileMainImageIndex === imgIdx 
                        ? 'ring-2 ring-primary-700 opacity-100' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setMobileMainImageIndex(imgIdx)}
                  >
                    <Image
                      src={img}
                      alt={`${currentRoom.name[language]} thumbnail ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Room switcher buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => {
                    if (roomFilter === 'apartment') setSelectedApartment(1);
                    else if (roomFilter === 'double') setSelectedDouble(1);
                    else if (roomFilter === 'twin') setSelectedTwin(1);
                  }}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                    ((roomFilter === 'apartment' && selectedApartment === 1) ||
                     (roomFilter === 'double' && selectedDouble === 1) ||
                     (roomFilter === 'twin' && selectedTwin === 1))
                      ? 'bg-primary-700 text-white'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {roomFilter === 'apartment' ? t('apt1', language) :
                   roomFilter === 'double' ? t('double1', language) :
                   t('twin1', language)}
                </button>
                <button
                  onClick={() => {
                    if (roomFilter === 'apartment') setSelectedApartment(2);
                    else if (roomFilter === 'double') setSelectedDouble(2);
                    else if (roomFilter === 'twin') setSelectedTwin(2);
                  }}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                    ((roomFilter === 'apartment' && selectedApartment === 2) ||
                     (roomFilter === 'double' && selectedDouble === 2) ||
                     (roomFilter === 'twin' && selectedTwin === 2))
                      ? 'bg-primary-700 text-white'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {roomFilter === 'apartment' ? t('apt2', language) :
                   roomFilter === 'double' ? t('double2', language) :
                   t('twin2', language)}
                </button>
              </div>

              {/* Room Info - Below switchers on mobile */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">{currentRoom.name[language]}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-primary-700">{currentRoom.price}</span>
                <span className="text-neutral-600 text-sm">{language === 'en' ? '/night' : '/natë'}</span>
              </div>
              <p className="text-base text-neutral-600 mb-4">{currentRoom.description[language]}</p>
              
              <Link
                href={`/rooms/${currentRoom.id}`}
                className="block w-full py-3 bg-primary-700 hover:bg-primary-800 text-white text-center rounded-lg font-semibold transition-colors text-sm"
              >
                {language === 'en' ? 'View Details' : 'Shiko Detajet'}
              </Link>
            </div>

            {/* DESKTOP LAYOUT (>= lg) - Original 3-column layout */}
            {/* Column 1: Main large image */}
            <div className="hidden lg:block lg:col-span-1">
              <div 
                className="relative h-96 lg:h-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={currentRoom.images[0]}
                  alt={`${currentRoom.name[language]} at Hotel Xhema - Comfortable accommodation in Pristina Kosovo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>

            {/* Column 2: Smaller images grid */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="grid grid-cols-2 gap-3 min-h-[24rem] lg:min-h-full auto-rows-fr">
                {currentRoom.images.slice(1).map((img: string, imgIdx: number) => (
                  <div 
                    key={imgIdx}
                    className="relative min-h-[11.5rem] lg:min-h-0 lg:h-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openLightbox(imgIdx + 1)}
                  >
                    <Image
                      src={img}
                      alt={`${currentRoom.name[language]} ${imgIdx + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 16.5vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Room info, filters, and switcher - Desktop only */}
            <div className="hidden lg:flex lg:col-span-1 flex-col justify-between">
              <div>
                {/* Room Filters */}
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    { key: 'apartment', label: { en: 'Apartments', sq: 'Apartamente' } },
                    { key: 'double', label: { en: 'Double Rooms', sq: 'Dhoma Double' } },
                    { key: 'twin', label: { en: 'Twin Rooms', sq: 'Dhoma Twin' } },
                  ].map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setRoomFilter(filter.key as any)}
                      className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-sm text-left ${
                        roomFilter === filter.key
                          ? 'bg-primary-700 text-white shadow-lg'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {filter.label[language]}
                    </button>
                  ))}
                </div>

                {/* Room switcher buttons */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => {
                      if (roomFilter === 'apartment') setSelectedApartment(1);
                      else if (roomFilter === 'double') setSelectedDouble(1);
                      else if (roomFilter === 'twin') setSelectedTwin(1);
                    }}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                      ((roomFilter === 'apartment' && selectedApartment === 1) ||
                       (roomFilter === 'double' && selectedDouble === 1) ||
                       (roomFilter === 'twin' && selectedTwin === 1))
                        ? 'bg-primary-700 text-white'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    {roomFilter === 'apartment' ? t('apt1', language) :
                     roomFilter === 'double' ? t('double1', language) :
                     t('twin1', language)}
                  </button>
                  <button
                    onClick={() => {
                      if (roomFilter === 'apartment') setSelectedApartment(2);
                      else if (roomFilter === 'double') setSelectedDouble(2);
                      else if (roomFilter === 'twin') setSelectedTwin(2);
                    }}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg font-semibold transition-all ${
                      ((roomFilter === 'apartment' && selectedApartment === 2) ||
                       (roomFilter === 'double' && selectedDouble === 2) ||
                       (roomFilter === 'twin' && selectedTwin === 2))
                        ? 'bg-primary-700 text-white'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    {roomFilter === 'apartment' ? t('apt2', language) :
                     roomFilter === 'double' ? t('double2', language) :
                     t('twin2', language)}
                  </button>
                </div>

                {/* Room Info */}
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{currentRoom.name[language]}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-primary-700">{currentRoom.price}</span>
                  <span className="text-neutral-600 text-sm">{language === 'en' ? '/night' : '/natë'}</span>
                </div>
                <p className="text-base text-neutral-600 mb-4">{currentRoom.description[language]}</p>
              </div>
              
              <Link
                href={`/rooms/${currentRoom.id}`}
                className="block w-full py-3 bg-primary-700 hover:bg-primary-800 text-white text-center rounded-lg font-semibold transition-colors text-sm"
              >
                {language === 'en' ? 'View Details' : 'Shiko Detajet'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Location with Map */}
      <section 
        ref={locationSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          locationSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              {language === 'en' ? 'Our Location' : 'Vendndodhja Jonë'}
            </h2>
            <p className="text-base text-neutral-600">
              {language === 'en' ? 'Find us in the heart of Pristina' : 'Na gjeni në zemër të Prishtinës'}
            </p>
          </div>
          
          {/* Map */}
          <div className="relative h-[60vh] sm:h-96 md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.5!2d21.1649933965909!3d42.66988853272513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDQwJzExLjYiTiAyMcKwMDknNTQuMCJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <svg className="w-8 h-8 text-primary-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-bold text-neutral-900 mb-1 text-sm">
                {language === 'en' ? 'Address' : 'Adresa'}
              </h3>
              <p className="text-neutral-600 text-xs">
                Hotel Xhema<br />
                Maliq pash Gjinolli<br />
                Prishtina, Kosovo
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <svg className="w-8 h-8 text-primary-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="font-bold text-neutral-900 mb-1 text-sm">
                {language === 'en' ? 'Phone' : 'Telefoni'}
              </h3>
              <a href="tel:+38344177665" className="text-primary-700 hover:text-primary-800 font-semibold text-xs">
                +383 44 177 665
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <svg className="w-8 h-8 text-primary-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-bold text-neutral-900 mb-1 text-sm">
                {language === 'en' ? 'Email' : 'Email'}
              </h3>
              <a href="mailto:hotelxhema2323@gmail.com" className="text-primary-700 hover:text-primary-800 font-semibold text-xs">
                hotelxhema2323@gmail.com
              </a>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <svg className="w-8 h-8 text-primary-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h3 className="font-bold text-neutral-900 mb-1 text-sm">
                {language === 'en' ? 'Airport Distance' : 'Distanca nga Aeroporti'}
              </h3>
              <p className="text-neutral-600 font-semibold text-xs">
                {language === 'en' ? '15 km / 20 min drive' : '15 km / 20 min me makinë'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Reviews */}
      <ReviewsSection />

      {/* Section 5: FAQ */}
      <FAQSection />

      {/* Section 6: Newsletter Signup */}
      <section className="relative pt-16 md:pt-16 pb-16 px-4 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rooms/apartment1/View1.jpg"
            alt="Hotel Xhema luxury apartment interior - Stay updated with exclusive offers"
            fill
            className="object-cover opacity-30"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            {language === 'en' ? 'Stay Updated' : 'Qëndroni të Informuar'}
          </h2>
          <p className="text-base text-neutral-200 mb-6">
            {language === 'en' 
              ? 'Subscribe to receive exclusive offers from Hotel Xhema'
              : 'Abonohu për të marrë oferta ekskluzive nga Hotel Xhema'}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'en' ? 'Enter your email address' : 'Vendosni adresën tuaj të emailit'}
              className="flex-1 px-4 py-3 rounded-lg text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              {language === 'en' ? 'Subscribe' : 'Abonohu'}
            </button>
          </form>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {currentRoom.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-neutral-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Main lightbox image */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentRoom.images[lightboxImageIndex]}
              alt={`${currentRoom.name[language]} - Image ${lightboxImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next button */}
          {currentRoom.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-neutral-300 transition-colors z-10"
              aria-label="Next image"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxImageIndex + 1} / {currentRoom.images.length}
          </div>
        </div>
      )}
    </main>
  );
}

