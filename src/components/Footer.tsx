"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hotel Xhema</h3>
            <p className="text-neutral-400">
              {language === 'en' 
                ? 'Modern hotel in the heart of Pristina, offering comfort and convenience for every traveler.'
                : 'Hotel modern në zemër të Prishtinës, duke ofruar komoditet dhe lehtësi për çdo udhëtar.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{language === 'en' ? 'Quick Links' : 'Lidhje të Shpejta'}</h4>
            <ul className="space-y-2">
              <li><Link href="/rooms" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Rooms' : 'Dhomat'}</Link></li>
              <li><Link href="/attractions" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Blog' : 'Blogu'}</Link></li>
              <li><Link href="/things-to-do" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Things to Do' : 'Aktivitete'}</Link></li>
              <li><Link href="/amenities" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Amenities' : 'Shërbimet'}</Link></li>
              <li><Link href="/booking" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Booking' : 'Rezervimi'}</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Contact' : 'Kontakti'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{language === 'en' ? 'Policies' : 'Politikat'}</h4>
            <ul className="space-y-2">
              <li><Link href="/booking-policies" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Booking Policies' : 'Politikat e Rezervimit'}</Link></li>
              <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Privacy Policy' : 'Politika e Privatësisë'}</Link></li>
              <li><Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">{language === 'en' ? 'Terms & Conditions' : 'Kushtet dhe Termat'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{language === 'en' ? 'Contact Info' : 'Informacione Kontakti'}</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>{language === 'en' ? 'Maliq Pashë Gjinolli' : 'Maliq Pashë Gjinolli'}</li>
              <li>{language === 'en' ? 'Pristina 10000, Kosovo' : 'Prishtinë 10000, Kosovë'}</li>
              <li>{language === 'en' ? 'Phone' : 'Telefoni'}: +383 44 177 665</li>
              <li>hotelxhema2323@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 Hotel Xhema. {language === 'en' ? 'All rights reserved.' : 'Të gjitha të drejtat e rezervuara.'}</p>
        </div>
      </div>
    </footer>
  );
}
