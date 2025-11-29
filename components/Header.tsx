"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useLanguage } from "../lib/LanguageContext";
import { t } from "../lib/translations";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(true);
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Mobile navbar auto-hide logic - only for mobile and when menu is NOT open
      if (window.innerWidth < 768 && !isMobileMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setShowMobileNav(false);
        } else {
          // Scrolling up - show navbar
          setShowMobileNav(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      (showMobileNav || isMobileMenuOpen) ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
    }`}>
      {/* Mobile background - always white */}
      <div className={`md:hidden absolute inset-0 bg-white/95 backdrop-blur-sm shadow-md`}></div>
      
      {/* Desktop background - homepage transparent when not scrolled, others match gradient, all white when scrolled */}
      <div className={`hidden md:block absolute inset-0 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : isHomePage
            ? 'bg-transparent'
            : 'bg-gradient-to-r from-primary-700 to-primary-900'
      }`}></div>
      
      <div className="max-w-full mx-auto px-4 md:px-8 relative z-10">
        {/* Mobile Layout (< md) */}
        {/* Mobile navbar has two rows: Top row (h-[10vh]) + Bottom row (h-[8vh]) = Total 18vh */}
        <div className="md:hidden">
          {/* Top Row: Hamburger (left) and Logo (center) - Mobile always uses dark colors since bg is white */}
          {/* Changed from h-20 (5rem/80px) to h-[10vh] for responsive viewport-based height */}
          <div className="flex items-center justify-between h-[10vh] relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors z-10 text-neutral-900 hover:bg-neutral-100 p-2 rounded-md"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0'
                  }`}
                />
              </div>
            </button>
            
            {/* Logo centered absolutely - always use black logo on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="relative">
                <Image 
                  src="/images/logo/BlackLogo.svg"
                  alt="Hotel Xhema"
                  width={120}
                  height={48}
                  className="h-12 w-auto transition-all"
                  priority
                  unoptimized
                />
              </Link>
            </div>
          </div>
          
          {/* Second Row: Call button (left) and Book button (right) - Extended connected borders */}
          {/* Changed from pb-3 to h-[8vh] for responsive height, total mobile navbar = 10vh + 8vh = 18vh */}
          <div className="flex items-center h-[8vh]">
            <a 
              href="tel:+38344177665"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-r-0 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors font-semibold text-base"
              style={{ borderTopLeftRadius: '0.375rem', borderBottomLeftRadius: '0.375rem' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>Call</span>
            </a>
            
            <Link 
              href="/booking" 
              className="flex-1 px-4 py-3 transition-all font-semibold border-2 text-base text-center border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
              style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
            >
              {t('bookNow', language)}
            </Link>
          </div>
        </div>

        {/* Desktop/Tablet Layout (>= md) */}
        {/* Changed from h-24 (6rem/96px) to h-[12vh] for responsive viewport-based height */}
        <div className="hidden md:grid grid-cols-3 items-center h-[12vh]">
          {/* Left Side - Hamburger Menu */}
          <div className="flex justify-start items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-500 ease-in-out p-2 rounded-md ${
                isScrolled ? 'text-neutral-900 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-7 h-6 relative flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Logo - Absolute Center */}
          <div className="flex justify-center">
            <Link href="/" className="relative">
              {isScrolled ? (
                <Image 
                  src="/images/logo/BlackLogo.svg"
                  alt="Hotel Xhema"
                  width={160}
                  height={64}
                  className="h-16 w-auto transition-all duration-500 ease-in-out"
                  priority
                  unoptimized
                />
              ) : (
                <Image 
                  src="/images/logo/Logo.svg"
                  alt="Hotel Xhema"
                  width={160}
                  height={64}
                  className="h-16 w-auto transition-all duration-500 ease-in-out drop-shadow-lg"
                  priority
                  unoptimized
                />
              )}
            </Link>
          </div>

          {/* Right Side - Phone & Book Button */}
          <div className="flex justify-end items-center space-x-6">
            {/* Phone Number */}
            <a 
              href="tel:+38344177665" 
              className={`hidden lg:flex items-center space-x-2 transition-all duration-500 ease-in-out ${
                isScrolled ? 'text-neutral-700 hover:text-primary-700' : 'text-white hover:text-primary-300'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span className="font-semibold text-base">+383 44 177 665</span>
            </a>

            {/* Book Button */}
            <Link 
              href="/booking" 
              className={`px-8 py-2.5 transition-all duration-500 ease-in-out font-semibold border-2 text-sm ${
                isScrolled
                  ? 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-primary-600'
              }`}
            >
              {t('bookNow', language)}
            </Link>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-white overflow-hidden" 
          style={{ 
            touchAction: 'pan-y',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            height: '100vh',
            width: '100vw'
          }}
        >
          {/* Close Button - Top Right Corner (above all sections) */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 z-[80] text-neutral-900 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Desktop: 2-column layout, Mobile: Single column */}
          <div className="flex flex-col md:flex-row h-full bg-white overflow-hidden">
            {/* LEFT SECTION - Menu Links */}
            <div className="flex flex-col md:w-1/2 h-full overflow-y-auto border-r border-neutral-200">
              {/* Menu Header */}
              <div className="flex justify-center items-center p-8 border-b border-neutral-200 relative bg-white">
                <Image 
                  src="/images/logo/BlackLogo.svg"
                  alt="Hotel Xhema"
                  width={160}
                  height={64}
                  className="h-16 w-auto"
                  priority
                  unoptimized
                />
              </div>

              {/* Menu Links */}
              <nav className="flex-1 px-8 py-10 bg-white">
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="block text-neutral-900 hover:bg-primary-50 hover:text-primary-700 text-2xl font-medium transition-all py-5 px-6 rounded-lg italic text-center"
                    onClick={closeMobileMenu}
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    {language === 'en' ? 'Home' : 'Kryefaqja'}
                  </Link>
                  <Link
                    href="/rooms"
                    className="block text-neutral-900 hover:bg-primary-50 hover:text-primary-700 text-2xl font-medium transition-all py-5 px-6 rounded-lg italic text-center"
                    onClick={closeMobileMenu}
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    {language === 'en' ? 'Rooms' : 'Dhomat'}
                  </Link>
                  <Link
                    href="/attractions"
                    className="block text-neutral-900 hover:bg-primary-50 hover:text-primary-700 text-2xl font-medium transition-all py-5 px-6 rounded-lg italic text-center"
                    onClick={closeMobileMenu}
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    {language === 'en' ? 'Blog' : 'Blogu'}
                  </Link>
                  <Link
                    href="/amenities"
                    className="block text-neutral-900 hover:bg-primary-50 hover:text-primary-700 text-2xl font-medium transition-all py-5 px-6 rounded-lg italic text-center"
                    onClick={closeMobileMenu}
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    {language === 'en' ? 'Amenities' : 'Shërbimet'}
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-neutral-900 hover:bg-primary-50 hover:text-primary-700 text-2xl font-medium transition-all py-5 px-6 rounded-lg italic text-center"
                    onClick={closeMobileMenu}
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    {language === 'en' ? 'Contact' : 'Kontakti'}
                  </Link>
                </div>
              </nav>

              {/* Menu Footer - Language & Book Button */}
              <div className="px-8 pb-10 bg-white border-t border-neutral-200 pt-8">
                {/* Language Switcher */}
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <button
                    onClick={() => { setLanguage('en'); closeMobileMenu(); }}
                    className="px-6 py-4 text-neutral-900 hover:bg-primary-50 hover:text-primary-700 font-medium text-2xl transition-all rounded-lg italic"
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('sq'); closeMobileMenu(); }}
                    className="px-6 py-4 text-neutral-900 hover:bg-primary-50 hover:text-primary-700 font-medium text-2xl transition-all rounded-lg italic"
                    style={{fontFamily: '"Crimson Text", serif'}}
                  >
                    Shqip
                  </button>
                </div>

                {/* Book Button */}
                <Link
                  href="/booking"
                  className="block w-full text-center bg-primary-600 text-white px-8 py-5 rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg hover:shadow-xl text-2xl italic"
                  onClick={closeMobileMenu}
                  style={{fontFamily: '"Crimson Text", serif'}}
                >
                  {language === 'en' ? 'Book Now' : 'Rezervo Tani'}
                </Link>
              </div>
            </div>

            {/* RIGHT SECTION - Map (Top) & Contact Info (Bottom) - Desktop only */}
            <div className="hidden md:flex md:w-1/2 h-full flex-col bg-white overflow-y-auto">
              {/* Google Maps Embed - Top Section */}
              <div className="relative h-1/2 min-h-[350px] bg-neutral-50 border-b border-neutral-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2935.123456789!2d21.1649933965909!3d42.66988853272513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDQwJzExLjYiTiAyMcKwMDknNTQuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={language === 'en' ? 'Hotel Xhema Location' : 'Vendndodhja e Hotel Xhema'}
                ></iframe>
              </div>

              {/* Contact Information - Bottom Section */}
              <div className="flex-1 p-10 bg-white">
                <h3 className="text-2xl font-bold mb-8 text-neutral-900 italic" style={{fontFamily: '"Crimson Text", serif'}}>
                  {language === 'en' ? 'Contact Us' : 'Na Kontaktoni'}
                </h3>
                
                {/* Phone */}
                <div className="mb-8 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-colors">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900 text-sm mb-1">{language === 'en' ? 'Phone' : 'Telefoni'}</span>
                      <a href="tel:+38344177665" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                        +383 44 177 665
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-8 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-colors">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900 text-sm mb-1">{language === 'en' ? 'Email' : 'Email-i'}</span>
                      <a href="mailto:info@hotelxhema.com" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                        info@hotelxhema.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 group-hover:bg-primary-100 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block font-semibold text-neutral-900 text-sm mb-1">{language === 'en' ? 'Address' : 'Adresa'}</span>
                      <p className="text-neutral-700 font-medium leading-relaxed">
                        Rr. Lidhja e Prizrenit<br />
                        Pristina 10000, Kosovo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
