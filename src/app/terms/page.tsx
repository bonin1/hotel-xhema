"use client";

import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#2C5530] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-200">
            Please read these terms carefully before booking
          </p>
          <p className="text-sm text-gray-300 mt-4">
            Last Updated: November 22, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#2C5530]">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing our website or booking accommodation at Hotel Xhema (&quot;Hotel,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              you agree to be bound by these Terms and Conditions. If you do not agree to all terms, please do not
              use our services or make a reservation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Reservations and Bookings
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Booking Confirmation</h3>
                <p className="text-gray-700">
                  All reservations are subject to availability and confirmation. We will send you a booking confirmation
                  via email once your reservation is confirmed. This confirmation serves as your agreement to these terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Accuracy of Information</h3>
                <p className="text-gray-700">
                  You are responsible for ensuring that all information provided during booking (name, contact details,
                  payment information) is accurate and complete. Errors may result in booking issues or cancellations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Age Requirement</h3>
                <p className="text-gray-700">
                  Guests must be at least 18 years of age to make a reservation and check in. Valid photo identification
                  is required at check-in for all guests.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Pricing and Payment
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Pricing</h3>
                <p className="text-gray-700 mb-2">
                  All prices are listed in Euros (€) and are subject to change without notice until a reservation is confirmed.
                  Prices may vary based on:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Season and demand</li>
                  <li>Length of stay</li>
                  <li>Room type and availability</li>
                  <li>Special promotions or packages</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Payment Terms</h3>
                <p className="text-gray-700">
                  Payment is due at check-in or check-out unless otherwise specified. We accept cash (Euro) and major
                  credit cards. For extended stays, alternative payment arrangements may be discussed in advance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Taxes and Fees</h3>
                <p className="text-gray-700">
                  All applicable taxes, tourism fees, and service charges are included in the quoted price unless
                  otherwise stated. Additional charges may apply for extra services (late check-out, additional guests, etc.).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Cancellation and Refunds
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Standard Cancellation Policy</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Cancellations made 48 hours or more before check-in: Full refund</li>
                  <li>Cancellations within 48 hours of check-in: First night charge applies</li>
                  <li>No-shows: Full reservation amount charged</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Non-Refundable Rates</h3>
                <p className="text-gray-700">
                  Special promotional rates, discounts, or packages may be non-refundable. These terms will be clearly
                  stated during the booking process and must be accepted before confirmation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Modifications</h3>
                <p className="text-gray-700">
                  Reservation modifications are subject to availability. Changes may affect pricing and are not guaranteed.
                  Contact us at least 48 hours before check-in to request modifications.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Guest Conduct and Responsibilities
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Expected Conduct</h3>
                <p className="text-gray-700 mb-2">Guests are expected to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Respect other guests and hotel property</li>
                  <li>Comply with hotel policies and local laws</li>
                  <li>Observe quiet hours (10:00 PM - 8:00 AM)</li>
                  <li>Not engage in illegal or disruptive activities</li>
                  <li>Not smoke inside the hotel premises</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Right to Refuse Service</h3>
                <p className="text-gray-700">
                  Hotel Xhema reserves the right to refuse service or terminate a guest&apos;s stay without refund if the guest
                  violates these terms, engages in illegal activity, causes disturbances, damages property, or poses a
                  threat to safety or security.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Property Damage</h3>
                <p className="text-gray-700">
                  Guests are financially responsible for any damage to hotel property, furniture, or equipment caused during
                  their stay. Charges for repairs or replacements will be applied to the guest&apos;s account. Please report any
                  pre-existing damage immediately upon check-in.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Liability and Disclaimers
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Personal Belongings</h3>
                <p className="text-gray-700">
                  Hotel Xhema is not liable for loss, theft, or damage to guests&apos; personal belongings, vehicles, or valuables.
                  We recommend using in-room safes (where available) or securing valuables at the front desk. We accept no
                  responsibility for items left behind after check-out.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Personal Injury</h3>
                <p className="text-gray-700">
                  Guests use hotel facilities at their own risk. Hotel Xhema is not liable for injuries, accidents, or illnesses
                  occurring on the premises unless caused by our gross negligence. Guests should exercise caution and report
                  any safety concerns immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Force Majeure</h3>
                <p className="text-gray-700">
                  Hotel Xhema is not liable for failure to perform obligations due to circumstances beyond our reasonable control,
                  including but not limited to natural disasters, pandemics, government actions, utility failures, or other force
                  majeure events.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Service Interruptions</h3>
                <p className="text-gray-700">
                  While we strive to provide uninterrupted service, we are not liable for temporary disruptions to utilities
                  (water, electricity, internet) or amenities due to maintenance, repairs, or circumstances beyond our control.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content on our website, including text, images, logos, graphics, and software, is the property of Hotel Xhema
              or its licensors and is protected by copyright and intellectual property laws. Unauthorized use, reproduction, or
              distribution is prohibited.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Privacy
            </h2>
            <p className="text-gray-700">
              Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect
              your personal information. By using our services, you consent to our privacy practices as described in the{' '}
              <Link href="/privacy" className="text-[#F1C338] hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Governing Law and Disputes
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Governing Law</h3>
                <p className="text-gray-700">
                  These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Kosovo.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Dispute Resolution</h3>
                <p className="text-gray-700">
                  In the event of any dispute arising from these terms or your stay, we encourage you to contact us first
                  to resolve the issue amicably. If a resolution cannot be reached, disputes will be subject to the exclusive
                  jurisdiction of the courts of Kosovo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Changes to Terms and Conditions
            </h2>
            <p className="text-gray-700">
              Hotel Xhema reserves the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting on our website with a revised &quot;Last Updated&quot; date. Your continued use of our services
              after such changes constitutes acceptance of the updated terms. We recommend reviewing these terms periodically.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Severability
            </h2>
            <p className="text-gray-700">
              If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Entire Agreement
            </h2>
            <p className="text-gray-700">
              These Terms and Conditions, together with our Privacy Policy and Booking Policies, constitute the entire agreement
              between you and Hotel Xhema regarding your use of our services and supersede all prior agreements and understandings.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#2C5530] to-[#1e3d21] text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-gray-200 mb-6">
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-3">
              <p className="text-lg">
                <strong className="text-[#F1C338]">Hotel Name:</strong> Hotel Xhema
              </p>
              <p className="text-lg">
                <strong className="text-[#F1C338]">Address:</strong> Maliq Pashë Gjinolli, Prishtina 10000, Kosovo
              </p>
              <p className="text-lg">
                <strong className="text-[#F1C338]">Phone:</strong> +383 44 177 665
              </p>
              <p className="text-lg">
                <strong className="text-[#F1C338]">Email:</strong> hotelxhema2323@gmail.com
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">Related Documents:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="bg-white text-[#2C5530] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/booking-policies"
                className="bg-white text-[#2C5530] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
              >
                Booking Policies
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-[#2C5530] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e3d21] transition-colors shadow-md"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
