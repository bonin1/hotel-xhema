/**
 * Review Schema Generator
 * Creates JSON-LD structured data for reviews and ratings
 */

export interface ReviewData {
  author: string;
  rating: number;
  comment?: string;
  date: string;
}

export interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

/**
 * Generate Review Schema for a single review
 */
export const generateReviewSchema = (review: ReviewData, itemName: string) => {
  return {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "10",
      "worstRating": "1"
    },
    ...(review.comment && {
      "reviewBody": review.comment
    }),
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": itemName
    }
  };
};

/**
 * Generate Aggregate Rating Schema
 */
export const generateAggregateRatingSchema = (data: AggregateRatingData) => {
  return {
    "@type": "AggregateRating",
    "ratingValue": data.ratingValue.toFixed(1),
    "reviewCount": data.reviewCount,
    "bestRating": (data.bestRating || 10).toString(),
    "worstRating": (data.worstRating || 1).toString()
  };
};

/**
 * Calculate aggregate rating from review scores
 * Based on Booking.com and Google reviews data
 */
export const calculateAggregateRating = (): AggregateRatingData => {
  // Sample data from reviews - in production, parse from CSV
  // Booking.com reviews (from CSV sample):
  const bookingReviews = [10, 9, 6, 10, 10, 8, 8, 1, 10, 5, 10, 10, 7, 6, 9, 5, 10, 7, 10, 4, 6, 10, 10, 9, 10, 7, 8, 10, 10, 7];
  
  // Google reviews (from CSV sample):
  const googleReviews = [4, 5, 5, 5, 5, 4, 5, 5, 5, 3]; // Converted from 5-star to 10-point scale
  const googleReviewsScaled = googleReviews.map(r => r * 2);
  
  const allReviews = [...bookingReviews, ...googleReviewsScaled];
  const total = allReviews.reduce((sum, rating) => sum + rating, 0);
  const average = total / allReviews.length;
  
  return {
    ratingValue: average,
    reviewCount: allReviews.length,
    bestRating: 10,
    worstRating: 1
  };
};

/**
 * Get recent reviews for display
 */
export const getRecentReviews = (limit: number = 5): ReviewData[] => {
  // Sample recent reviews from both sources
  return [
    {
      author: "Gregory",
      rating: 10,
      comment: "Clean and comfortable room, great location, very friendly staff.",
      date: "2024-10-04"
    },
    {
      author: "Bonin Ferizi",
      rating: 10,
      comment: "I can confidently say this is the best hotel I have been. Staff is very friendly and super energetic, also about the location is very close to the city center.",
      date: "2024-06-01"
    },
    {
      author: "Colin",
      rating: 9,
      comment: "The room was very clean, quiet and the location was great. Friendly staff. Has everything you need if you're looking for a cheap private room.",
      date: "2024-06-27"
    },
    {
      author: "Leon Marges",
      rating: 10,
      comment: "Best hotel in town, friendly and help you really good.",
      date: "2024-01-01"
    },
    {
      author: "Tarik Musić",
      rating: 10,
      comment: "Great location and the staff was so friendly! Hotel is in old town of Pristina and I highly recommend it.",
      date: "2022-11-01"
    }
  ].slice(0, limit);
};
