"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function BookingPoliciesPage() {
  const checkinSection = useScrollAnimation(0.1);
  const cancellationSection = useScrollAnimation(0.1);
  const paymentSection = useScrollAnimation(0.1);
  const rulesSection = useScrollAnimation(0.1);
  const damageSection = useScrollAnimation(0.1);
  const requestsSection = useScrollAnimation(0.1);
  const contactSection = useScrollAnimation(0.1);
  const ctaSection = useScrollAnimation(0.1);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Booking Policies & Guidelines</h1>
          <p className="text-xl text-primary-100">Clear & Transparent Information for Your Stay</p>
        </div>
      </section>

      {/* Check-in/Check-out */}
      <section
        ref={checkinSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-8 px-4 bg-neutral-50 ${
          checkinSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              Check-in & Check-out
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2C5530]">Check-in Time</h3>
                <p className="text-gray-700 mb-2"><strong>Standard:</strong> 2:00 PM (14:00)</p>
                <p className="text-gray-600 text-sm">
                  Early check-in may be available upon request, subject to availability. Please contact us in advance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2C5530]">Check-out Time</h3>
                <p className="text-gray-700 mb-2"><strong>Standard:</strong> 11:00 AM</p>
                <p className="text-gray-600 text-sm">
                  Late check-out may be arranged for an additional fee, subject to availability.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-primary-50 border-l-4 border-primary-700 p-4">
              <p className="text-neutral-700">
                <strong>Note:</strong> Valid photo ID and credit card are required at check-in for all guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section
        ref={cancellationSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-neutral-50 ${
          cancellationSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              Cancellation Policy
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Standard Cancellation</h3>
                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                  <li>Free cancellation up to <strong>48 hours</strong> before arrival</li>
                  <li>Cancellations within 48 hours: First night charged</li>
                  <li>No-shows: Full reservation amount charged</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Special Rates & Packages</h3>
                <p className="text-neutral-600">
                  Non-refundable rates and special promotional packages may have different cancellation terms. 
                  Please review the specific terms during booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Modification Policy</h3>
                <p className="text-neutral-600">
                  Reservation modifications are subject to availability. Changes to dates or room types may affect pricing.
                  Contact us at least 48 hours before arrival for modifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section
        ref={paymentSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-white ${
          paymentSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              Payment Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Accepted Payment Methods</h3>
                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                  <li>Cash (Euro €)</li>
                  <li>Major credit cards (Visa, Mastercard)</li>
                  <li>Bank transfer (advance booking only)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Payment Schedule</h3>
                <p className="text-neutral-600 mb-2">
                  <strong>Standard Bookings:</strong> Payment due at check-in or check-out
                </p>
                <p className="text-neutral-600">
                  <strong>Extended Stays:</strong> Weekly payments may be arranged with advance notice
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">Deposit Policy</h3>
                <p className="text-neutral-600">
                  A security deposit may be required at check-in to cover incidental charges. 
                  This will be refunded upon check-out if no damages or additional charges are incurred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section
        ref={rulesSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-neutral-50 ${
          rulesSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              House Rules
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-900">General Rules</h3>
                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                  <li>Quiet hours: 10:00 PM - 8:00 AM</li>
                  <li>Smoking is not permitted inside the hotel (outdoor areas available)</li>
                  <li>Pets are not allowed</li>
                  <li>Visitors must register at the front desk</li>
                  <li>Parties and events require prior approval</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-900">Age Requirements</h3>
                <p className="text-neutral-600">
                  Guests must be at least 18 years old to check in. Minors must be accompanied by an adult.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-900">Maximum Occupancy</h3>
                <p className="text-neutral-600 mb-2">
                  Maximum occupancy varies by room type:
                </p>
                <ul className="list-disc list-inside text-neutral-600 space-y-1">
                  <li>Double Rooms: 2 guests</li>
                  <li>Twin Rooms: 2 guests</li>
                  <li>Luxury Apartments: Up to 4 guests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Damage & Liability */}
      <section
        ref={damageSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-white ${
          damageSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              Damage & Liability
            </h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                Guests are responsible for any damage caused to the room, furniture, or hotel property during their stay.
                Charges for repairs or replacements will be applied to the guest&apos;s account.
              </p>
              <p>
                Hotel Xhema is not liable for loss or damage to guests&apos; personal belongings. We recommend using in-room safes
                for valuables (where available) or securing items at the front desk.
              </p>
              <p>
                Please report any pre-existing damage or issues immediately upon check-in to avoid being held responsible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Requests */}
      <section
        ref={requestsSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-neutral-50 ${
          requestsSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">
              Special Requests
            </h2>
            <div className="space-y-4 text-neutral-600">
              <p>
                We strive to accommodate special requests such as:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Specific room preferences (high/low floor, quiet location)</li>
                <li>Extra amenities (additional pillows, blankets)</li>
                <li>Accessibility needs</li>
                <li>Celebration arrangements (birthdays, anniversaries)</li>
              </ul>
              <p className="mt-4">
                <strong>Please note:</strong> Special requests are subject to availability and cannot be guaranteed. 
                Contact us in advance to discuss your needs, and we&apos;ll do our best to accommodate them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section
        ref={contactSection.ref as React.RefObject<HTMLElement>}
        className={`pt-8 pb-8 px-4 bg-white ${
          contactSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900">Questions About Our Policies?</h2>
            <p className="text-neutral-600 mb-6">
              If you have any questions about our booking policies or need clarification, please don&apos;t hesitate to contact us.
            </p>
            <div className="space-y-3">
              <p className="text-lg text-neutral-700">
                <strong className="text-primary-700">Phone:</strong> +383 44 177 665
              </p>
              <p className="text-lg text-neutral-700">
                <strong className="text-primary-700">Email:</strong> hotelxhema2323@gmail.com
              </p>
              <p className="text-lg text-neutral-700">
                <strong className="text-primary-700">Front Desk:</strong> Available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          ctaSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Ready to Book Your Stay?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Experience comfort and hospitality at Hotel Xhema
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-block px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border-2 border-primary-700 text-primary-700 hover:bg-primary-50 rounded-lg font-semibold transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
