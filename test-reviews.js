const fs = require('fs');
const path = require('path');

// Parse CSV line with quoted strings
function parseCSVLine(line) {
  const values = [];
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

// Parse Google Reviews CSV
function parseGoogleReviews(csvContent) {
  const lines = csvContent.split('\n');
  if (lines.length < 2) return [];
  
  const reviews = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line (handle quoted strings)
    const values = parseCSVLine(line);
    if (values.length < 9) {
      console.log(`Line ${i}: Only ${values.length} values, skipping`);
      continue;
    }
    
    const profileImage = values[0] || '';
    const name = values[1] || 'Anonymous';
    const reviewsCount = values[2] || '';
    const rating = values[4] || '5/5';
    const date = values[5] || '';
    const comment = values[8] || '';
    
    console.log(`Line ${i}: Name="${name}", Comment="${comment.substring(0, 50)}..."`);
    
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
function parseBookingReviews(csvContent) {
  const lines = csvContent.split('\n');
  if (lines.length < 2) return [];
  
  const reviews = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line
    const values = parseCSVLine(line);
    if (values.length < 7) {
      console.log(`Booking Line ${i}: Only ${values.length} values, skipping`);
      continue;
    }
    
    const date = values[0] || '';
    const name = values[1] || 'Anonymous';
    const rating = values[6] || '';
    const positiveComment = values[4] || '';
    const negativeComment = values[5] || '';
    
    console.log(`Booking Line ${i}: Name="${name}", Rating="${rating}", Positive="${positiveComment.substring(0, 30)}..."`);
    
    // Only add reviews with rating
    if (rating) {
      reviews.push({
        date,
        name,
        rating,
        positiveComment,
        negativeComment,
        platform: 'Booking.com'
      });
    }
  }
  
  return reviews;
}

// Test
const googlePath = path.join(__dirname, 'data', 'reviews', 'google.csv');
const bookingPath = path.join(__dirname, 'data', 'reviews', 'Booking.csv');

console.log('=== TESTING GOOGLE REVIEWS ===');
const googleContent = fs.readFileSync(googlePath, 'utf-8');
const googleReviews = parseGoogleReviews(googleContent);
console.log(`\nTotal Google reviews parsed: ${googleReviews.length}\n`);

console.log('\n=== TESTING BOOKING REVIEWS ===');
const bookingContent = fs.readFileSync(bookingPath, 'utf-8');
const bookingReviews = parseBookingReviews(bookingContent);
console.log(`\nTotal Booking reviews parsed: ${bookingReviews.length}\n`);

console.log('\n=== SUMMARY ===');
console.log(`Total reviews: ${googleReviews.length + bookingReviews.length}`);
console.log(`Google: ${googleReviews.length}`);
console.log(`Booking: ${bookingReviews.length}`);
