import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parseGoogleReviews, parseBookingReviews } from '../../../utils/reviewsParser';

export async function GET() {
  try {
    const reviewsDir = path.join(process.cwd(), 'data', 'reviews');
    
    // Read Google reviews
    const googlePath = path.join(reviewsDir, 'google.csv');
    const googleContent = await fs.readFile(googlePath, 'utf-8');
    const googleReviews = parseGoogleReviews(googleContent);
    console.log('[Reviews API] Google reviews parsed:', googleReviews.length);
    if (googleReviews.length > 0) {
      console.log('[Reviews API] First Google review:', googleReviews[0]);
    }
    
    // Read Booking reviews
    const bookingPath = path.join(reviewsDir, 'Booking.csv');
    const bookingContent = await fs.readFile(bookingPath, 'utf-8');
    const bookingReviews = parseBookingReviews(bookingContent);
    console.log('[Reviews API] Booking reviews parsed:', bookingReviews.length);
    if (bookingReviews.length > 0) {
      console.log('[Reviews API] First Booking review:', bookingReviews[0]);
    }
    
    // Combine reviews
    const allReviews = [...googleReviews, ...bookingReviews];
    console.log('[Reviews API] Total combined reviews before filtering:', allReviews.length);
    
    // Filter reviews: 
    // 1. Only ratings 8+ out of 10 (or 4+ out of 5 for Google)
    // 2. Remove reviews with negative comments
    const filteredReviews = allReviews.filter(review => {
      if (review.platform === 'Google') {
        // Google reviews are X/5, we want 4/5 and 5/5 only
        const stars = parseInt(review.rating.split('/')[0]);
        return stars >= 4;
      } else {
        // Booking reviews are out of 10, we want 8+ only
        const rating = parseFloat(review.rating);
        const hasNegativeComment = review.negativeComment && review.negativeComment.trim().length > 0;
        return rating >= 8 && !hasNegativeComment;
      }
    });
    
    console.log('[Reviews API] Reviews after filtering (8+ rating, no negative comments):', filteredReviews.length);
    
    // Sort reviews by date (most recent first)
    // Note: Google dates are like "3 months ago on" which are not valid Date strings
    // Booking dates are like "2023-08-10 11:10:33" which are valid
    filteredReviews.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      // If both dates are invalid (NaN), keep original order
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      // If only dateA is invalid, put it after dateB
      if (isNaN(dateA)) return 1;
      // If only dateB is invalid, put it after dateA
      if (isNaN(dateB)) return -1;
      
      return dateB - dateA; // Most recent first
    });
    
    const response = {
      reviews: filteredReviews,
      total: filteredReviews.length,
      google: googleReviews.filter(r => parseInt(r.rating.split('/')[0]) >= 4).length,
      booking: bookingReviews.filter(r => {
        const rating = parseFloat(r.rating);
        const hasNegativeComment = r.negativeComment && r.negativeComment.trim().length > 0;
        return rating >= 8 && !hasNegativeComment;
      }).length
    };
    
    console.log('[Reviews API] Returning response:', {
      totalReviews: response.reviews.length,
      total: response.total,
      google: response.google,
      booking: response.booking
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error loading reviews:', error);
    return NextResponse.json(
      { error: 'Failed to load reviews' },
      { status: 500 }
    );
  }
}
