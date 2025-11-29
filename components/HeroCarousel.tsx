"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

// Comprehensive list of all room images
const heroImages = [
  '/images/rooms/apartment1/Jacuzi.jpg',
  '/images/rooms/apartment1/View1.jpg',
  '/images/rooms/apartment1/View2.jpg',
  '/images/rooms/apartment1/View 3.jpg',
  '/images/rooms/apartment1/JacuziView2.jpg',
  '/images/rooms/apartment2/Main View.jpg',
  '/images/rooms/apartment2/View1.jpg',
  '/images/rooms/apartment2/View2.jpg',
  '/images/rooms/apartment2/View3.jpg',
  '/images/rooms/twin1/Main View.jpg',
  '/images/rooms/twin1/View 1.jpg',
  '/images/rooms/twin1/View 2.jpg',
  '/images/rooms/twin1/View 3.jpg',
  '/images/rooms/twin1/View 4.jpg',
  '/images/rooms/twin1/View 5.jpg',
  '/images/rooms/twin2/Main View.jpg',
  '/images/rooms/twin2/View1.jpg',
  '/images/rooms/twin2/View2.jpg',
  '/images/rooms/twin2/View3.jpg',
  '/images/rooms/double1/Main View.jpg',
  '/images/rooms/double1/View2.jpg',
  '/images/rooms/double2/Main View.jpg',
];

// Poetic text phrases that rotate
const heroTexts = {
  en: [
    'Where comfort meets elegance, and every stay feels like coming home.',
    'The world outside waits; inside, it disappears.',
    'Each sunrise writes its own welcome upon these walls, as if the world itself has paused to listen.',
    'Here, time slows so memory can breathe, tracing the warmth left by morning light.',
    'Moments rest here before returning to the world — gentler, quieter, changed.',
  ],
  sq: [
    'Ku rehati takon elegancën, dhe çdo qëndrim ndjehet si të kthehesh në shtëpi.',
    'Bota jashtë pret; brenda, ajo zhduket.',
    'Çdo agim shkruan mirëseardhjen e vet mbi këto mure, sikur vetë bota të ketë pushuar për të dëgjuar.',
    'Këtu, koha ngadalësohet që kujtesa të mund të marrë frymë, duke gjurmuar ngrohtësinë e lënë nga drita e mëngjesit.',
    'Momentet pushojnë këtu para se të kthehen në botë — më të buta, më të qeta, të ndryshuar.',
  ],
};

export default function HeroCarousel() {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Simple auto-play carousel - 8 seconds per slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Fixed 8 seconds per slide
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate text - changes every 4 seconds (2 quotes per 8s image)
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.en.length);
    }, 4000); // 4 seconds per quote (2 quotes during 8s image)
    return () => clearInterval(textInterval);
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to booking page with query params
    const params = new URLSearchParams();
    if (checkIn) params.append('checkIn', checkIn.toISOString().split('T')[0]);
    if (checkOut) params.append('checkOut', checkOut.toISOString().split('T')[0]);
    params.append('guests', guests.toString());
    window.location.href = `/booking?${params.toString()}`;
  };

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return language === 'en' ? 'Select date' : 'Zgjidhni datën';
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* SEO H1 Tag - Visually hidden but readable by screen readers and search engines */}
      <h1 className="sr-only">
        Hotel Xhema - Modern Luxury Hotel in Pristina, Kosovo | Premium Accommodation & Comfort
      </h1>
      
      {/* Carousel Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`relative w-full h-full transition-transform duration-1000 ${
            index === currentSlide ? 'md:scale-110' : 'md:scale-100'
          }`}>
            <Image
              src={image}
              alt={`Hotel Xhema Pristina - Luxury accommodation with modern rooms and city views in Kosovo`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

      {/* Desktop Content - Text and form at bottom */}
      <div className="hidden md:flex relative z-10 h-full flex-col items-center justify-end px-2 sm:px-4 pb-4 sm:pb-8">
        {/* Desktop Text - Positioned at bottom */}
        <p 
          key={`text-${currentTextIndex}`}
          className="text-white/90 mb-6 sm:mb-8 text-center max-w-4xl drop-shadow-lg italic px-3 sm:px-4 transition-opacity duration-500 md:text-[clamp(18px,4vw,48px)]" 
          style={{fontFamily: '"Crimson Text", serif', lineHeight: '1.3'}}
        >
          {heroTexts[language][currentTextIndex]}
        </p>
        
        {/* Scroll Down Button - Desktop only */}
        {showScrollIndicator && (
          <button
            onClick={scrollToContent}
            className="mb-4 md:mb-8 flex flex-col items-center text-white hover:text-primary-300 transition-all animate-bounce group"
            aria-label="Scroll down"
          >
            {/* Desktop: Mouse Shape */}
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        )}

        {/* Desktop Quick Booking Widget - Horizontal layout */}
        <form onSubmit={handleQuickSearch} className="bg-white/95 backdrop-blur-sm shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-6xl mb-2 sm:mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Check-in */}
            <div>
              <label htmlFor="hero-checkin" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
                {language === 'en' ? 'Check-in' : 'Hyrje'}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 h-[3rem]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateDisplay(checkIn)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out */}
            <div>
              <label htmlFor="hero-checkout" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
                {language === 'en' ? 'Check-out' : 'Dalje'}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 h-[3rem]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateDisplay(checkOut)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => {
                      const today = new Date(new Date().setHours(0, 0, 0, 0));
                      if (date < today) return true;
                      if (checkIn && date <= checkIn) return true;
                      return false;
                    }}
                    initialFocus
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="hero-guests" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
                {language === 'en' ? 'Guests' : 'Mysafirë'}
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 h-[3rem] border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 italic invisible" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
                &nbsp;
              </label>
              <button
                type="submit"
                className="w-full bg-primary-700 text-white h-[3rem] px-6 hover:bg-primary-800 transition-colors font-semibold shadow-lg italic"
                style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}
              >
                {language === 'en' ? 'Check Availability' : 'Shiko Disponueshmërinë'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Content - Text absolutely positioned, form in fixed location */}
      <div className="md:hidden relative z-10 h-full flex flex-col items-center justify-end px-4 pb-8">
        {/* Mobile Text - Centered vertically */}
        <div className="absolute top-1/3 left-0 right-0 px-6">
          <p 
            key={`text-mobile-${currentTextIndex}`}
            className="text-white/90 text-center max-w-4xl drop-shadow-lg italic transition-opacity duration-500 text-2xl mx-auto" 
            style={{fontFamily: '"Crimson Text", serif', lineHeight: '1.3'}}
          >
            {heroTexts[language][currentTextIndex]}
          </p>
        </div>
        
        {/* Mobile Scroll Down Indicator */}
        {showScrollIndicator && (
          <button
            onClick={scrollToContent}
            className="absolute top-[60vh] left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-primary-300 transition-all animate-bounce"
            aria-label="Scroll down"
          >
            {/* Mobile: Swipe Down Arrow */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm mt-1">{language === 'en' ? 'Swipe' : 'Rrëshqit'}</span>
          </button>
        )}
        
        {/* Mobile Quick Booking Widget - Fixed at bottom of viewport */}
        <form onSubmit={handleQuickSearch} className="bg-white/95 backdrop-blur-sm shadow-2xl p-4 w-full max-w-sm space-y-3">
          {/* Check-in */}
          <div>
            <label htmlFor="hero-checkin-mobile" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
              {language === 'en' ? 'Check-in' : 'Hyrje'}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 h-[3rem]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateDisplay(checkIn)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out */}
          <div>
            <label htmlFor="hero-checkout-mobile" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
              {language === 'en' ? 'Check-out' : 'Dalje'}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 h-[3rem]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateDisplay(checkOut)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => {
                    const today = new Date(new Date().setHours(0, 0, 0, 0));
                    if (date < today) return true;
                    if (checkIn && date <= checkIn) return true;
                    return false;
                  }}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="hero-guests-mobile" className="block text-sm font-medium text-neutral-700 mb-2 italic" style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}>
              {language === 'en' ? 'Guests' : 'Mysafirë'}
            </label>
            <select
              id="hero-guests-mobile"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 h-[3rem] border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary-700 text-white h-[3rem] px-6 hover:bg-primary-800 transition-colors font-semibold shadow-lg italic"
              style={{fontFamily: '"Crimson Text", serif', fontSize: '1rem'}}
            >
              {language === 'en' ? 'Check Availability' : 'Shiko Disponueshmërinë'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
