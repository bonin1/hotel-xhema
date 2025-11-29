import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phone,
      roomType,
      numberOfGuests,
      checkIn,
      checkOut,
      specialRequests,
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !roomType || !checkIn || !checkOut) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'hotelxhema2323@gmail.com',
      subject: 'New Booking Request - Hotel Xhema',
      html: `
        <h2>New Booking Request</h2>
        <h3>Guest Information:</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
        <p><strong>Check-in Date:</strong> ${checkIn}</p>
        <p><strong>Check-out Date:</strong> ${checkOut}</p>
        
        ${specialRequests ? `<h3>Special Requests:</h3><p>${specialRequests}</p>` : ''}
        
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from the Hotel Xhema website booking form.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Booking request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending booking email:', error);
    return NextResponse.json(
      { message: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}
