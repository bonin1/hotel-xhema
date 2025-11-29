import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const reviewsDir = path.join(process.cwd(), 'data', 'reviews');
    
    // Check Google CSV
    const googlePath = path.join(reviewsDir, 'google.csv');
    const googleExists = await fs.access(googlePath).then(() => true).catch(() => false);
    const googleContent = googleExists ? await fs.readFile(googlePath, 'utf-8') : '';
    const googleLines = googleContent.split('\n').length;
    
    // Check Booking CSV  
    const bookingPath = path.join(reviewsDir, 'Booking.csv');
    const bookingExists = await fs.access(bookingPath).then(() => true).catch(() => false);
    const bookingContent = bookingExists ? await fs.readFile(bookingPath, 'utf-8') : '';
    const bookingLines = bookingContent.split('\n').length;
    
    return NextResponse.json({
      status: 'OK',
      files: {
        google: {
          exists: googleExists,
          path: googlePath,
          lines: googleLines
        },
        booking: {
          exists: bookingExists,
          path: bookingPath,
          lines: bookingLines
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
