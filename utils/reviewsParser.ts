// Utility functions for parsing and working with review data

export interface GoogleReview {
  profileImage: string;
  name: string;
  reviews: string;
  rating: string;
  date: string;
  platform: 'Google';
  comment: string;
}

export interface BookingReview {
  date: string;
  name: string;
  rating: string;
  staff: string;
  cleanliness: string;
  location: string;
  facilities: string;
  comfort: string;
  valueForMoney: string;
  positiveComment: string;
  negativeComment: string;
  platform: 'Booking.com';
  country?: string; // Detected from name or review content
}

export type Review = GoogleReview | BookingReview;

// Parse Google Reviews CSV
export function parseGoogleReviews(csvContent: string): GoogleReview[] {
  const lines = csvContent.split('\n');
  if (lines.length < 2) return [];
  
  const reviews: GoogleReview[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line (handle quoted strings)
    const values = parseCSVLine(line);
    if (values.length < 9) continue;
    
    const profileImage = values[0] || '';
    const name = values[1] || 'Anonymous';
    const reviewsCount = values[2] || '';
    const rating = values[4] || '5/5';
    const date = values[5] || '';
    const comment = values[8] || '';
    
    // Only add reviews with actual comments
    if (comment && comment.trim()) {
      reviews.push({
        profileImage,
        name,
        reviews: reviewsCount,
        rating,
        date,
        platform: 'Google',
        comment
      });
    }
  }
  
  return reviews;
}

// Parse Booking Reviews CSV
export function parseBookingReviews(csvContent: string): BookingReview[] {
  const lines = csvContent.split('\n');
  if (lines.length < 2) return [];
  
  const reviews: BookingReview[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line
    const values = parseCSVLine(line);
    if (values.length < 7) continue;
    
    const date = values[0] || '';
    const name = values[1] || 'Anonymous';
    const rating = values[6] || '';
    const staff = values[7] || '';
    const cleanliness = values[8] || '';
    const location = values[9] || '';
    const facilities = values[10] || '';
    const comfort = values[11] || '';
    const valueForMoney = values[12] || '';
    const positiveComment = values[4] || '';
    const negativeComment = values[5] || '';
    
    // Detect country from name and review content
    const country = detectCountry(name, positiveComment, negativeComment);
    
    // Only add reviews with rating
    if (rating) {
      reviews.push({
        date,
        name,
        rating,
        staff,
        cleanliness,
        location,
        facilities,
        comfort,
        valueForMoney,
        positiveComment,
        negativeComment,
        platform: 'Booking.com',
        country: country || undefined
      });
    }
  }
  
  return reviews;
}

// Helper to parse CSV line with quoted strings
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current);
  return values;
}

// Detect country from name or review content
function detectCountry(name: string, positiveComment: string, negativeComment: string): string | null {
  const text = `${name} ${positiveComment} ${negativeComment}`.toLowerCase();
  
  // Turkish indicators
  if (
    /[ğüşıöç]/.test(text) || // Turkish characters
    /(güzel|çok|yoktu|vardı|değil|olarak|için|kadar|daha|bile|bütün|her|hiç|şey|zaman|gün|yıl|ay|hafta|saat|dakika|saniye)/i.test(text)
  ) {
    return '🇹🇷 Turkey';
  }
  
  // German indicators
  if (
    /[äöüß]/.test(text) ||
    /(die|der|das|ist|war|sehr|gut|schön|nicht|oder|und|auch|aber|von|zu|mit|bei|nach|für|auf|über|durch|gegen|ohne)/i.test(text)
  ) {
    return '🇩🇪 Germany';
  }
  
  // Finnish indicators
  if (
    /(hyvä|oli|on|ja|ei|että|mutta|vaan|kuin|kun|jos|koska|mikä|mitä|kuka|missä|minne|mistä|milloin|paljon|vähän|hyvin|huonosti)/i.test(text) ||
    /[äö]{2,}/.test(text) // Double ä or ö common in Finnish
  ) {
    return '🇫🇮 Finland';
  }
  
  // Czech indicators
  if (
    /[čřšžýáíéůú]/.test(text) ||
    /(dobrý|velmi|ale|nebo|také|byl|byla|bylo|jsem|jste|jsou|mají|můžete|musí|chci|chtěl|rád|lokace|parkovani)/i.test(text)
  ) {
    return '🇨🇿 Czech Republic';
  }
  
  // Italian indicators
  if (
    /(sono|è|era|molto|bene|buono|ottimo|posizione|vicino|centro|posto|non|anche|ma|con|per|rapporto|qualità|prezzo|pulizia|staff)/i.test(text)
  ) {
    return '🇮🇹 Italy';
  }
  
  // Swedish indicators
  if (
    /(bra|var|är|och|inte|men|över|från|till|för|med|kvällen|trevlig)/i.test(text) ||
    /[åäö]/.test(text)
  ) {
    return '🇸🇪 Sweden';
  }
  
  // French indicators
  if (
    /(très|bien|bon|excellent|mais|avec|pour|dans|sur|sous|sans|aussi|encore|toujours|jamais|tout|tous|était|étaient)/i.test(text)
  ) {
    return '🇫🇷 France';
  }
  
  // Albanian indicators (common Albanian words/names)
  if (
    /(ymer|xhensila|meriton|elion|elvir|mirlinda)/i.test(name)
  ) {
    return '🇦🇱 Albania';
  }
  
  // English indicators (check last to avoid false positives)
  if (
    /(very|great|good|excellent|clean|staff|friendly|location|room|hotel|walk|center|close|quiet|was|were|the|and|but|with|from|for|price|would|recommend)/i.test(text)
  ) {
    return '🇬🇧 UK';
  }
  
  // Dutch indicators
  if (
    /(zeer|goed|mooi|niet|maar|met|van|voor|naar|uit|bij|door|onder|tussen|zoals)/i.test(text) ||
    /[ëïö]/.test(text)
  ) {
    return '🇳🇱 Netherlands';
  }
  
  return null;
}

// Convert rating to number of stars (out of 5)
export function getRatingStars(rating: string, platform: 'Google' | 'Booking.com'): number {
  if (platform === 'Google') {
    // Google ratings are "X/5"
    const match = rating.match(/(\d+)/);
    return match ? parseInt(match[1]) : 5;
  } else {
    // Booking ratings are out of 10, convert to 5
    const num = parseFloat(rating);
    return isNaN(num) ? 5 : Math.round(num / 2);
  }
}

// Get average rating from Booking.com categories
export function getBookingAverageRating(review: BookingReview): number {
  const ratings = [
    parseFloat(review.staff),
    parseFloat(review.cleanliness),
    parseFloat(review.location),
    parseFloat(review.facilities),
    parseFloat(review.comfort),
    parseFloat(review.valueForMoney)
  ].filter(r => !isNaN(r));
  
  if (ratings.length === 0) return parseFloat(review.rating);
  
  const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  return Math.round(avg * 10) / 10;
}

// Format date
export function formatReviewDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  } catch {
    return dateStr;
  }
}
