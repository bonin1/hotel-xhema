'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Attraction {
  slug: string;
  name: { en: string; sq: string } | string;
  distance: { en: string; sq: string } | string;
  image: string;
}

interface AttractionsCarouselProps {
  attractions: Attraction[];
  language: 'en' | 'sq';
  learnMoreText?: string;
}

export default function AttractionsCarousel({ 
  attractions, 
  language,
  learnMoreText 
}: AttractionsCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const getName = (attraction: Attraction) => {
    return typeof attraction.name === 'string' 
      ? attraction.name 
      : attraction.name[language];
  };

  const getDistance = (attraction: Attraction) => {
    return typeof attraction.distance === 'string' 
      ? attraction.distance 
      : attraction.distance[language];
  };

  return (
    <div className="relative max-w-6xl mx-auto py-8 px-4">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous attraction"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        ref={nextRef}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next attraction"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        centeredSlides={true}
        slidesPerView={1.2}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 30 },
          768: { slidesPerView: 2.2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        className="attractionsSwiper"
      >
        {attractions.map((attraction, idx) => (
          <SwiperSlide key={idx}>
            <Link href={`/attractions/${attraction.slug}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-full">
                <div className="relative h-56 md:h-64 bg-gray-200">
                  <Image
                    src={attraction.image}
                    alt={`${getName(attraction)} - ${getDistance(attraction)} from Hotel Xhema Pristina`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1">
                      {getName(attraction)}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 font-semibold">
                      {getDistance(attraction)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swipe Hint (Mobile) */}
      <div className="md:hidden text-center mt-4 text-sm text-neutral-500">
        {language === 'sq' ? '← Rrëshqit për të shfletuar →' : '← Swipe to browse →'}
      </div>
    </div>
  );
}
