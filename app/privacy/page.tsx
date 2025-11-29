"use client";

import Link from "next/link";
import { useScrollAnimation } from "../../lib/useScrollAnimation";

export default function PrivacyPolicyPage() {
  const introSection = useScrollAnimation(0.1);
  const collectionSection = useScrollAnimation(0.1);
  const usageSection = useScrollAnimation(0.1);
  const sharingSection = useScrollAnimation(0.1);
  const securitySection = useScrollAnimation(0.1);
  const rightsSection = useScrollAnimation(0.1);
  const contactSection = useScrollAnimation(0.1);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-xl text-primary-100">Your privacy is important to us</p>
          <p className="text-sm text-primary-200 mt-2">Last Updated: November 22, 2025</p>
        </div>
      </section>

      {/* Introduction */}
      <section
        ref={introSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-8 px-4 bg-neutral-50 ${
          introSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#2C5530]">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Hotel Xhema (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
              or stay at our property. Please read this policy carefully.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2C5530]">Personal Information</h3>
                <p className="text-gray-700 mb-2">We may collect personal information that you provide to us, including:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Name, email address, phone number</li>
                  <li>Passport or ID information (required for registration)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Booking preferences and special requests</li>
                  <li>Communication history with our hotel</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2C5530]">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-2">When you visit our website, we may automatically collect:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                  <li>Device type and operating system</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Process and manage your bookings and reservations</li>
              <li>Provide customer service and respond to inquiries</li>
              <li>Send booking confirmations and updates</li>
              <li>Process payments and prevent fraudulent transactions</li>
              <li>Comply with legal obligations (registration, tax reporting)</li>
              <li>Improve our services and website experience</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Analyze usage patterns and conduct market research</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Service Providers</h3>
                <p className="text-gray-700">
                  We may share information with third-party service providers who assist us in operating our business
                  (payment processors, booking platforms, website hosting).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Legal Requirements</h3>
                <p className="text-gray-700">
                  We may disclose information when required by law, such as to comply with local regulations,
                  court orders, or government requests (e.g., Kosovo tourism registration requirements).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">Business Transfers</h3>
                <p className="text-gray-700">
                  If Hotel Xhema is involved in a merger, acquisition, or sale of assets, your information may be
                  transferred as part of that transaction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#2C5530]">With Your Consent</h3>
                <p className="text-gray-700">
                  We may share your information for any other purpose with your explicit consent.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              from unauthorized access, disclosure, alteration, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Secure servers and encrypted data transmission (SSL)</li>
              <li>Access controls and authentication procedures</li>
              <li>Regular security assessments and updates</li>
              <li>Staff training on data protection practices</li>
            </ul>
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your
              information, we cannot guarantee absolute security.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Objection:</strong> Object to the processing of your information for marketing purposes</li>
              <li><strong>Portability:</strong> Request a copy of your information in a structured format</li>
              <li><strong>Withdrawal of Consent:</strong> Withdraw consent for data processing at any time</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic,
              and serve personalized content. Cookies are small data files stored on your device.
            </p>
            <p className="text-gray-700 mb-4">
              You can control cookie preferences through your browser settings. However, disabling cookies may affect
              website functionality and your user experience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Data Retention
            </h2>
            <p className="text-gray-700">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
              unless a longer retention period is required or permitted by law. Guest registration information may be retained
              for several years to comply with Kosovo&apos;s tourism and tax regulations.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information
              from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2C5530] border-b-2 border-[#F1C338] pb-2">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              We will notify you of any material changes by posting the updated policy on our website with a revised &quot;Last Updated&quot; date.
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#2C5530] to-[#1e3d21] text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-200 mb-6">
              If you have questions or concerns about this Privacy Policy or how we handle your personal information,
              please contact us:
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
