"use client";

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ReviewCard from './ReviewCard';
import type { Review } from '@/utils/reviewsParser';

export default function ReviewsSection() {
  const { language } = useLanguage();
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, google: 0, booking: 0 });
  const [filter, setFilter] = useState<'all' | 'Google' | 'Booking.com'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reviews per page: 1 on mobile, 3 on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reviewsPerPage = isMobile ? 1 : 3;

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        console.log('[ReviewsSection] Fetching reviews from API...');
        const response = await fetch('/api/reviews');
        const data = await response.json();
        console.log('[ReviewsSection] API response:', data);
        
        if (data.reviews) {
          console.log('[ReviewsSection] Setting reviews:', data.reviews.length);
          setAllReviews(data.reviews);
          setFilteredReviews(data.reviews);
          setStats({
            total: data.total || 0,
            google: data.google || 0,
            booking: data.booking || 0
          });
        } else {
          console.log('[ReviewsSection] No reviews in API response!');
        }
      } catch (error) {
        console.error('[ReviewsSection] Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  // Filter reviews when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredReviews(allReviews);
    } else {
      setFilteredReviews(allReviews.filter(review => review.platform === filter));
    }
    setCurrentIndex(0); // Reset to first page when filter changes
  }, [filter, allReviews]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="pt-16 md:pt-16 pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              {language === 'en' ? 'Guest Reviews' : 'Vlerësimet e Mysafirëve'}
            </h2>
            <p className="text-base text-neutral-600">
              {language === 'en' ? 'Loading reviews...' : 'Duke ngarkuar vlerësimet...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 md:pt-16 pb-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
            {language === 'en' ? 'Guest Reviews' : 'Vlerësimet e Mysafirëve'}
          </h2>
          <p className="text-base text-neutral-600 mb-4">
            {language === 'en' ? 'What our guests say about us' : 'Çfarë thonë mysafirët tanë për ne'}
          </p>
          {stats.total > 0 && (
            <p className="text-sm text-neutral-500 mb-6">
              {language === 'en' 
                ? `${stats.total} total reviews (${stats.google} from Google, ${stats.booking} from Booking.com)`
                : `${stats.total} vlerësime totale (${stats.google} nga Google, ${stats.booking} nga Booking.com)`}
            </p>
          )}

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                filter === 'all'
                  ? 'bg-primary-700 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {/* Mobile: Just "All", Desktop: "All Reviews" */}
              <span className="md:hidden">{language === 'en' ? 'All' : 'Të Gjitha'}</span>
              <span className="hidden md:inline">{language === 'en' ? 'All Reviews' : 'Të Gjitha Vlerësimet'}</span>
            </button>
            <button
              onClick={() => setFilter('Google')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm flex items-center gap-2 ${
                filter === 'Google'
                  ? 'bg-primary-700 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill={filter === 'Google' ? '#FFF' : '#EA4335'} d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill={filter === 'Google' ? '#FFF' : '#4285F4'} d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill={filter === 'Google' ? '#FFF' : '#FBBC05'} d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill={filter === 'Google' ? '#FFF' : '#34A853'} d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {/* Mobile: Just "Google", Desktop: "Google (count)" */}
              <span className="md:hidden">Google</span>
              <span className="hidden md:inline">Google ({stats.google})</span>
            </button>
            <button
              onClick={() => setFilter('Booking.com')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm flex items-center gap-2 ${
                filter === 'Booking.com'
                  ? 'bg-primary-700 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <img 
                src="/images/logo/Booking Icon.svg" 
                alt="Booking.com" 
                className="w-4 h-4"
              />
              {/* Mobile: Just "Booking", Desktop: "Booking.com (count)" */}
              <span className="md:hidden">Booking</span>
              <span className="hidden md:inline">Booking.com ({stats.booking})</span>
            </button>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              {language === 'en' ? 'No reviews available' : 'Nuk ka vlerësime të disponueshme'}
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container with touch support */}
            <div 
              ref={carouselRef} 
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div 
                    key={pageIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1"
                  >
                    {filteredReviews
                      .slice(pageIndex * reviewsPerPage, (pageIndex + 1) * reviewsPerPage)
                      .map((review, index) => (
                        <div
                          key={`${pageIndex}-${index}`}
                          className="animate-fadeIn"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <ReviewCard 
                            review={review} 
                            index={pageIndex * reviewsPerPage + index} 
                          />
                        </div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-xl rounded-full p-3 hover:bg-neutral-100 transition-all z-10 hidden md:block"
                  aria-label="Previous reviews"
                >
                  <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-xl rounded-full p-3 hover:bg-neutral-100 transition-all z-10 hidden md:block"
                  aria-label="Next reviews"
                >
                  <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Pagination Dots - Mobile shows max 6 dots in carousel, Desktop shows all */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {/* Mobile: Show max 6 dots with carousel behavior */}
                <div className="md:hidden flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 6) }).map((_, i) => {
                    // Calculate which dot index to show based on current position
                    let dotIndex;
                    if (totalPages <= 6) {
                      // If total pages <= 6, show all
                      dotIndex = i;
                    } else {
                      // Carousel behavior: center the active dot when possible
                      const halfWindow = 3; // Show 3 dots on each side
                      if (currentIndex < halfWindow) {
                        // Near start: show first 6
                        dotIndex = i;
                      } else if (currentIndex >= totalPages - halfWindow) {
                        // Near end: show last 6
                        dotIndex = totalPages - 6 + i;
                      } else {
                        // Middle: center the active dot
                        dotIndex = currentIndex - halfWindow + i;
                      }
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => goToSlide(dotIndex)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentIndex === dotIndex
                            ? 'bg-primary-700 w-8'
                            : 'bg-neutral-300 hover:bg-neutral-400'
                        }`}
                        aria-label={`Go to reviews page ${dotIndex + 1}`}
                      />
                    );
                  })}
                </div>
                
                {/* Desktop: Show all dots */}
                <div className="hidden md:flex gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentIndex === index
                          ? 'bg-primary-700 w-8'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to reviews page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Navigation Buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-6 md:hidden">
                <button
                  onClick={prevSlide}
                  className="px-6 py-2 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                >
                  {language === 'en' ? 'Previous' : 'Mëparshme'}
                </button>
                <button
                  onClick={nextSlide}
                  className="px-6 py-2 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                >
                  {language === 'en' ? 'Next' : 'Tjetër'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
