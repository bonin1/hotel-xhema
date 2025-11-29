"use client";

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import type { Review, GoogleReview, BookingReview } from '@/utils/reviewsParser';
import { getRatingStars, getBookingAverageRating, formatReviewDate } from '@/utils/reviewsParser';

interface ReviewCardProps {
  review: Review;
}

// Helper function to extract country from name
function getCountryFromName(name: string): string | null {
  // Common patterns in review names that indicate country
  const countryPatterns: { [key: string]: string } = {
    'TR': 'Turkey',
    'DE': 'Germany',
    'AL': 'Albania',
    'XK': 'Kosovo',
    'US': 'USA',
    'UK': 'United Kingdom',
    'IT': 'Italy',
    'FR': 'France',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland',
    'CZ': 'Czech Republic',
    'SK': 'Slovakia',
    'HU': 'Hungary',
    'RO': 'Romania',
    'BG': 'Bulgaria',
    'GR': 'Greece',
    'PT': 'Portugal',
    'IE': 'Ireland',
    'HR': 'Croatia',
    'RS': 'Serbia',
    'BA': 'Bosnia',
    'MK': 'North Macedonia',
    'ME': 'Montenegro',
    'SI': 'Slovenia'
  };
  
  // Try to detect country from name patterns (rough heuristic based on common names)
  const turkishNames = ['Eren', 'Metin', 'Aziz', 'Hayrettin', 'Gamze', 'DURSUN', 'Umut', 'Gülnur', 'Bahçe', 'ŞIHLAR', 'Arzu', 'Selin', 'wolf'];
  const germanNames = ['Stefanie', 'Bedri'];
  const albanianNames = ['Ymer', 'Xhensila', 'Meriton', 'Elion', 'Elvir'];
  const italianNames = ['Andrea', 'Paolo', 'PAOLO', 'Marta'];
  const englishNames = ['Gregory', 'Colin', 'Aidan', 'Louisa'];
  const czechNames = ['Tereza', 'Dalibor', 'Jakub', 'Natalia'];
  const finnishNames = ['Mikael', 'Micco'];
  const swedishNames = ['Sebastian'];
  const spanishNames = ['Mariela', 'Ignacio'];
  const frenchNames = ['Jean-Marc', 'Jeansebastien'];
  const dutchNames = ['Bjarne'];
  
  const firstName = name.split(' ')[0];
  
  if (turkishNames.some(n => name.includes(n))) return '🇹🇷 Turkey';
  if (germanNames.some(n => name.includes(n))) return '🇩🇪 Germany';
  if (albanianNames.some(n => name.includes(n))) return '🇦🇱 Albania';
  if (italianNames.some(n => name.includes(n))) return '🇮🇹 Italy';
  if (englishNames.some(n => name.includes(n))) return '🇬🇧 UK';
  if (czechNames.some(n => name.includes(n))) return '🇨🇿 Czech Republic';
  if (finnishNames.some(n => name.includes(n))) return '🇫🇮 Finland';
  if (swedishNames.some(n => name.includes(n))) return '🇸🇪 Sweden';
  if (spanishNames.some(n => name.includes(n))) return '🇪🇸 Spain';
  if (frenchNames.some(n => name.includes(n))) return '🇫🇷 France';
  if (dutchNames.some(n => name.includes(n))) return '🇳🇱 Netherlands';
  
  return null; // Unknown country
}

// Helper function to get color for profile picture background (only for initials)
function getProfileColor(index: number): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];
  return colors[index % colors.length];
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps & { index?: number }) {
  const { language } = useLanguage();
  
  const isGoogle = review.platform === 'Google';
  const googleReview = isGoogle ? (review as GoogleReview) : null;
  const bookingReview = !isGoogle ? (review as BookingReview) : null;
  
  // Get rating stars (out of 5)
  const stars = isGoogle 
    ? getRatingStars(googleReview!.rating, 'Google')
    : Math.round(getBookingAverageRating(bookingReview!) / 2);
  
  // Get numeric rating for display
  const numericRating = isGoogle
    ? googleReview!.rating.split('/')[0]
    : bookingReview!.rating;
  
  // Format date
  const formattedDate = isGoogle
    ? googleReview!.date
    : formatReviewDate(bookingReview!.date);
  
  // Get country - for Booking reviews, use detected country; for Google, try to extract from name
  const country = isGoogle 
    ? getCountryFromName(googleReview!.name)
    : bookingReview!.country || null;
  
  // Get profile picture background color (only for initials)
  const backgroundColor = getProfileColor(index);
  
  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-200">
      {/* Header: Profile + Platform */}
      <div className="flex items-start gap-4 mb-4">
        {/* Profile Picture - colored background only for initials, no border */}
        <div className={`relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ${
          isGoogle && googleReview!.profileImage ? 'bg-neutral-200' : backgroundColor
        }`}>
          {isGoogle && googleReview!.profileImage ? (
            <Image
              src={googleReview!.profileImage}
              alt={googleReview!.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
              {(isGoogle ? googleReview!.name : bookingReview!.name || 'A')[0].toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Name, Rating, Platform */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">
                {isGoogle ? googleReview!.name : (bookingReview!.name || 'Anonymous')}
              </h3>
              {country && (
                <p className="text-xs text-neutral-600 mt-0.5">{country}</p>
              )}
              {isGoogle && googleReview!.reviews && (
                <p className="text-xs text-neutral-500">{googleReview!.reviews}</p>
              )}
            </div>
            
            {/* Platform Logo */}
            <div className="flex items-center gap-2">
              {isGoogle ? (
                <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded px-2 py-1">
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                  <span className="text-xs font-medium text-neutral-700">Google</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded px-2 py-1">
                  <img 
                    src="/images/logo/Booking Icon.svg" 
                    alt="Booking.com" 
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium text-neutral-700">Booking</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Stars and Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < stars ? 'fill-current' : 'fill-neutral-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-neutral-700">
              {isGoogle ? googleReview!.rating : `${numericRating}/10`}
            </span>
          </div>
          
          {/* Date */}
          <p className="text-xs text-neutral-500 mt-1">{formattedDate}</p>
        </div>
      </div>
      
      {/* Review Content */}
      <div className="text-sm text-neutral-700">
        {isGoogle ? (
          <p className="italic">&quot;{googleReview!.comment}&quot;</p>
        ) : (
          <div className="space-y-2">
            {bookingReview!.positiveComment && (
              <div>
                <span className="font-semibold text-green-700">
                  {language === 'en' ? '✓ Positive: ' : '✓ Pozitive: '}
                </span>
                <span className="italic">&quot;{bookingReview!.positiveComment}&quot;</span>
              </div>
            )}
            {bookingReview!.negativeComment && (
              <div>
                <span className="font-semibold text-orange-600">
                  {language === 'en' ? '− Negative: ' : '− Negative: '}
                </span>
                <span className="italic">&quot;{bookingReview!.negativeComment}&quot;</span>
              </div>
            )}
            {!bookingReview!.positiveComment && !bookingReview!.negativeComment && (
              <p className="text-neutral-500 italic">
                {language === 'en' ? 'No written review' : 'Asnjë rishikim i shkruar'}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Booking.com Category Scores */}
      {!isGoogle && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="grid grid-cols-3 gap-2 text-xs">
            {bookingReview!.staff && (
              <div className="flex justify-between">
                <span className="text-neutral-600">{language === 'en' ? 'Staff' : 'Stafi'}:</span>
                <span className="font-semibold">{bookingReview!.staff}</span>
              </div>
            )}
            {bookingReview!.cleanliness && (
              <div className="flex justify-between">
                <span className="text-neutral-600">{language === 'en' ? 'Clean' : 'Pastërtia'}:</span>
                <span className="font-semibold">{bookingReview!.cleanliness}</span>
              </div>
            )}
            {bookingReview!.location && (
              <div className="flex justify-between">
                <span className="text-neutral-600">{language === 'en' ? 'Location' : 'Vendndodhja'}:</span>
                <span className="font-semibold">{bookingReview!.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
