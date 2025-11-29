"use client";

import Link from "next/link";
import { Wifi, Snowflake, Tv, Coffee, Car, Shield, Clock, Users } from "lucide-react";
import { useScrollAnimation } from "../../lib/useScrollAnimation";

const roomAmenities = [
  {
    icon: <Wifi className="w-8 h-8" />,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed wireless internet throughout the hotel and in all rooms."
  },
  {
    icon: <Snowflake className="w-8 h-8" />,
    title: "Air Conditioning",
    description: "Individual climate control in every room for your comfort year-round."
  },
  {
    icon: <Tv className="w-8 h-8" />,
    title: "Flat-Screen TV",
    description: "Modern flat-screen televisions with cable channels in all rooms."
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Private Balconies",
    description: "Most rooms feature private balconies with city views - perfect for morning coffee or evening relaxation."
  }
];

const propertyAmenities = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Front Desk",
    description: "Round-the-clock service for check-in, assistance, and local recommendations."
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: "Parking Available",
    description: "Convenient parking options nearby - ask our staff for details and directions."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Property",
    description: "Safety and security measures throughout the property for your peace of mind."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Concierge Service",
    description: "Our friendly staff assists with tour bookings, restaurant reservations, and local guidance."
  }
];

const luxuryFeatures = [
  {
    title: "Jacuzzi Suites",
    description: "Our luxury apartments feature private jacuzzis for ultimate relaxation after exploring the city.",
    available: "Available in Luxury Apartments"
  },
  {
    title: "City Views",
    description: "Wake up to stunning views of Pristina from your private balcony.",
    available: "Select rooms and apartments"
  },
  {
    title: "Spacious Layouts",
    description: "From cozy double rooms to expansive apartments accommodating families and groups.",
    available: "All room types"
  },
  {
    title: "Modern Bathrooms",
    description: "Clean, modern bathrooms with hot water, fresh towels, and complimentary toiletries.",
    available: "All rooms"
  }
];

export default function AmenitiesPage() {
  const roomSection = useScrollAnimation(0.1);
  const propertySection = useScrollAnimation(0.1);
  const luxurySection = useScrollAnimation(0.1);
  const locationSection = useScrollAnimation(0.1);
  const servicesSection = useScrollAnimation(0.1);
  const ctaSection = useScrollAnimation(0.1);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Hotel Amenities</h1>
          <p className="text-xl text-primary-100">Comfort & Convenience at Hotel Xhema</p>
        </div>
      </section>

      {/* In-Room Amenities */}
      <section
        ref={roomSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          roomSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">In-Room Amenities</h2>
            <p className="text-base text-neutral-600">Modern comforts in every room</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomAmenities.map((amenity, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-primary-700 mb-4 flex justify-center">{amenity.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">{amenity.title}</h3>
                <p className="text-neutral-600 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Amenities */}
      <section
        ref={propertySection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-white ${
          propertySection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Property Amenities & Services</h2>
            <p className="text-base text-neutral-600">Everything you need for a comfortable stay</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyAmenities.map((amenity, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-primary-700 mb-4 flex justify-center">{amenity.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">{amenity.title}</h3>
                <p className="text-neutral-600 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Features */}
      <section
        ref={luxurySection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          luxurySection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Premium Features</h2>
            <p className="text-base text-neutral-600">Elevated experiences for discerning guests</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {luxuryFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary-700">{feature.title}</h3>
                <p className="text-neutral-600 mb-4">{feature.description}</p>
                <p className="text-sm text-primary-700 font-medium">{feature.available}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Benefits */}
      <section
        ref={locationSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-white ${
          locationSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Prime Location Benefits</h2>
            <p className="text-base text-neutral-600">Perfectly positioned in the heart of Pristina</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">City Center Location</h3>
              <p className="text-neutral-600">
                Walk to major attractions, restaurants, and shopping within minutes from Hotel Xhema.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🚶</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Walking Distance</h3>
              <p className="text-neutral-600">
                Newborn Monument (8 min), Mother Teresa Cathedral (10 min), National Library (12 min).
              </p>
            </div>
            <div className="bg-neutral-50 rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Dining & Nightlife</h3>
              <p className="text-neutral-600">
                Surrounded by Pristina&apos;s best restaurants, cafes, bars, and entertainment venues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section
        ref={servicesSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          servicesSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Additional Services Available</h2>
            <p className="text-base text-neutral-600">Extra support for your convenience</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900">✓ Luggage Storage</h3>
              <p className="text-neutral-600">Store your bags before check-in or after check-out.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900">✓ Tour Assistance</h3>
              <p className="text-neutral-600">Help planning and booking local tours and activities.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900">✓ Transportation Arrangements</h3>
              <p className="text-neutral-600">Taxi bookings and airport transfer assistance.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2 text-neutral-900">✓ Local Recommendations</h3>
              <p className="text-neutral-600">Our staff shares insider tips on restaurants and hidden gems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-white ${
          ctaSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Experience Comfort at Hotel Xhema</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Book your room today and enjoy all our amenities and services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-block px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              Book Now
            </Link>
            <Link
              href="/rooms"
              className="inline-block px-8 py-3 border-2 border-primary-700 text-primary-700 hover:bg-primary-50 rounded-lg font-semibold transition-colors text-sm"
            >
              View Our Rooms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
