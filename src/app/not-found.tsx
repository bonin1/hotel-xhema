"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
            <Image
              src="/images/rooms/apartment1/View1.jpg"
              alt="Hotel Xhema Room"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
          </div>

          {/* Right side - Content */}
          <div className="text-center md:text-left order-1 md:order-2">
            {/* 404 Number with golden styling */}
            <div className="mb-6">
              <h1 className="text-8xl md:text-9xl font-bold text-primary-500 leading-none mb-2">
                404
              </h1>
              <div className="h-1 w-24 bg-primary-500 mx-auto md:mx-0 rounded-full"></div>
            </div>

            {/* Error message */}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {language === 'en' ? 'Page Not Found' : 'Faqja Nuk u Gjet'}
            </h2>
            
            <p className="text-base md:text-lg text-neutral-600 mb-8 max-w-md mx-auto md:mx-0">
              {language === 'en' 
                ? 'Sorry, we couldn\'t find the page you\'re looking for. Perhaps you\'d like to explore our comfortable rooms instead?'
                : 'Na vjen keq, nuk mund ta gjejmë faqen që po kërkoni. Ndoshta do të dëshironit të eksploroni dhomat tona komode në vend të kësaj?'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-sm"
              >
                {language === 'en' ? 'Go to Homepage' : 'Shko te Faqja Kryesore'}
              </Link>
              
              <Link
                href="/rooms"
                className="inline-block px-8 py-3 bg-white hover:bg-neutral-100 text-neutral-900 border-2 border-neutral-300 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-sm"
              >
                {language === 'en' ? 'View Our Rooms' : 'Shiko Dhomat Tona'}
              </Link>
            </div>

            {/* Helpful links */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-600 mb-4">
                {language === 'en' ? 'You might be interested in:' : 'Mund t\'ju interesojë:'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <Link 
                  href="/attractions" 
                  className="text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                >
                  {language === 'en' ? 'Attractions' : 'Atraksionet'}
                </Link>
                <span className="text-neutral-400">•</span>
                <Link 
                  href="/booking" 
                  className="text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                >
                  {language === 'en' ? 'Book a Room' : 'Rezervo Dhomë'}
                </Link>
                <span className="text-neutral-400">•</span>
                <Link 
                  href="/contact" 
                  className="text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                >
                  {language === 'en' ? 'Contact Us' : 'Na Kontaktoni'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-neutral-500 text-sm">
            <div className="h-px w-12 bg-neutral-300"></div>
            <span className="font-semibold">Hotel Xhema</span>
            <div className="h-px w-12 bg-neutral-300"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
