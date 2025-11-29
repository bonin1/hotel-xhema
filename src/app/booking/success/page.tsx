"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/utils/translations";

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // TODO: Stripe payment verification disabled for now
    // In production, this should verify the Stripe payment session
    
    // Skip verification and mark as verified immediately
    setLoading(false);
    setVerified(true);

    // Redirect to homepage after 10 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-neutral-600">{language === 'en' ? 'Verifying payment...' : 'Duke verifikuar pagesën...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t('bookingReceived', language)}
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            {t('bookingConfirmationMessage', language)}
          </p>

          {/* Info Box */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-primary-800 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {t('whatHappensNext', language)}
                </h3>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>{t('confirmationStep1', language)}</li>
                  <li>{t('confirmationStep2', language)}</li>
                  <li>{t('confirmationStep3', language)}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-neutral-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-neutral-900 mb-4">
              {t('needImmediateAssistance', language)}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+38344177665"
                className="inline-flex items-center justify-center space-x-2 text-primary-800 hover:text-primary-900 font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+383 44 177 665</span>
              </a>
              <a
                href="mailto:hotelxhema2323@gmail.com"
                className="inline-flex items-center justify-center space-x-2 text-primary-800 hover:text-primary-900 font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>hotelxhema2323@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('returnToHomepage', language)}
            </Link>
            <Link
              href="/rooms"
              className="inline-block border-2 border-primary-800 text-primary-800 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('viewRooms', language)}
            </Link>
          </div>

          {/* Auto Redirect Message */}
          <p className="text-sm text-neutral-600 mt-6">
            {t('autoRedirectMessage', language)}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </main>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
