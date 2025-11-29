"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(language === 'en' 
          ? 'Thank you! Your message has been sent successfully.' 
          : 'Faleminderit! Mesazhi juaj u dërgua me sukses.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitMessage(language === 'en' 
          ? 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
          : 'Na vjen keq, pati një gabim gjatë dërgimit të mesazhit. Ju lutemi provoni përsëri ose na kontaktoni drejtpërdrejt.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage(language === 'en' 
        ? 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
        : 'Na vjen keq, pati një gabim gjatë dërgimit të mesazhit. Ju lutemi provoni përsëri ose na kontaktoni drejtpërdrejt.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Mobile navbar: 10vh + 8vh = 18vh total height */}
      {/* Desktop navbar: 12vh total height */}
      {/* Using pt-16 for mobile and desktop standard spacing */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('getInTouchTitle', language)}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t('getInTouchSubtitle', language)}
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      {/* Contact Information and Form */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">{t('getInTouch', language)}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">{t('address', language)}</h3>
                  <p className="text-neutral-600 mt-1">
                    Hotel Xhema<br />
                    Maliq pash Gjinolli<br />
                    Pristina, Kosovo<br />
                    5-10 {t('minutesWalkFromCenter', language)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">{t('phoneNumber', language)}</h3>
                  <p className="text-neutral-600 mt-1">
                    +383 44 177 665<br />
                    {t('available247', language)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">{t('emailAddress', language)}</h3>
                  <p className="text-neutral-600 mt-1">
                    hotelxhema2323@gmail.com<br />
                    {t('respondWithin24Hours', language)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">{t('receptionHours', language)}</h3>
                  <p className="text-neutral-600 mt-1">
                    {t('frontDesk247', language)}<br />
                    {t('checkInFrom2PM', language)}<br />
                    {t('checkOutUntil12PM', language)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('quickReservation', language)}</h3>
              <p className="text-neutral-600 mb-4">
                {t('readyToBookQuestion', language)}
              </p>
              <a
                href="/booking"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('bookNow', language)}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{language === 'en' ? 'Send Us a Message' : 'Dërgoni një Mesazh'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  {language === 'en' ? 'Your Name' : 'Emri Juaj'} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                  placeholder={language === 'en' ? 'John Doe' : 'Emri Mbiemri'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  {language === 'en' ? 'Email Address' : 'Adresa Email'} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                  placeholder={language === 'en' ? 'john.doe@example.com' : 'emri.mbiemri@example.com'}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  {language === 'en' ? 'Phone Number' : 'Numri Telefonit'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                  placeholder="+383 44 177 665"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                  {language === 'en' ? 'Subject' : 'Titulli'} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                  placeholder={language === 'en' ? 'How can we help you?' : 'Si mund t\'ju ndihmojmë?'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  {language === 'en' ? 'Message' : 'Mesazhi'} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                  placeholder={language === 'en' ? 'Tell us more about your inquiry...' : 'Tregoni më shumë për kërkesën tuaj...'}
                ></textarea>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you') || submitMessage.includes('Faleminderit') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (language === 'en' ? 'Sending...' : 'Duke dërguar...') : (language === 'en' ? 'Send Message' : 'Dërgo Mesazhin')}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">{language === 'en' ? 'Our Location' : 'Vendndodhja Jonë'}</h2>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="w-full rounded-lg overflow-hidden h-[70vh] sm:h-96 md:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=42.66988853272513,21.1649933965909&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Xhema Location - Maliq pash Gjinolli, Pristina"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-neutral-700 font-semibold">Maliq pash Gjinolli, {language === 'en' ? 'Pristina, Kosovo' : 'Prishtinë, Kosovë'}</p>
              <p className="text-sm text-neutral-600 mt-1">{language === 'en' ? '5-10 minutes walk from Pristina city center' : '5-10 minuta ecje nga qendra e qytetit të Prishtinës'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

