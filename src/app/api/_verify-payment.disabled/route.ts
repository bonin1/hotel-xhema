import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Payment was successful
      // Here you can send confirmation email using the metadata
      const metadata = session.metadata;

      // Send email to hotel and customer
      // (You can integrate with your existing email API here)
      
      return NextResponse.json({
        success: true,
        bookingDetails: metadata,
        paymentStatus: session.payment_status,
      });
    } else {
      return NextResponse.json({
        success: false,
        paymentStatus: session.payment_status,
      });
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
