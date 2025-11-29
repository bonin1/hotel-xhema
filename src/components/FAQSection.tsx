"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  question: { en: string; sq: string };
  answer: { en: string; sq: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      en: "What is the check-in and check-out time?",
      sq: "Cili është koha e check-in dhe check-out?"
    },
    answer: {
      en: "Check-in time is from 2:00 PM and check-out time is until 12:00 PM (noon). Early check-in and late check-out may be available upon request, subject to availability.",
      sq: "Koha e check-in është nga ora 14:00 dhe koha e check-out është deri në ora 12:00 (mesditë). Check-in i hershëm dhe check-out i vonuar mund të jenë të disponueshëm me kërkesë, në varësi të disponueshmërisë."
    }
  },
  {
    question: {
      en: "Is WiFi available in the hotel?",
      sq: "A ka WiFi në hotel?"
    },
    answer: {
      en: "Yes, we offer free high-speed WiFi throughout the hotel, including all rooms and common areas. The network is available 24/7.",
      sq: "Po, ne ofrojmë WiFi falas me shpejtësi të lartë në të gjithë hotelin, duke përfshirë të gjitha dhomat dhe zonat e përbashkëta. Rrjeti është i disponueshëm 24/7."
    }
  },
  {
    question: {
      en: "Where is Hotel Xhema located?",
      sq: "Ku ndodhet Hotel Xhema?"
    },
    answer: {
      en: "Hotel Xhema is located at Maliq Pashë Gjinolli, Prishtina 10000, Kosovo. We are in the heart of Pristina, within walking distance of major attractions like the Newborn Monument, Mother Teresa Cathedral, and the city center.",
      sq: "Hotel Xhema ndodhet në Maliq Pashë Gjinolli, Prishtinë 10000, Kosovë. Ne jemi në zemër të Prishtinës, në distancë këmbësorësh nga atraksionet kryesore si Monumenti Newborn, Katedralja Nënë Tereza dhe qendra e qytetit."
    }
  },
  {
    question: {
      en: "Is parking available?",
      sq: "A ka parking të disponueshëm?"
    },
    answer: {
      en: "Yes, we offer free parking for our guests. Please inform us in advance if you need parking space, and we will ensure availability for your vehicle.",
      sq: "Po, ne ofrojmë parking falas për mysafirët tanë. Ju lutemi na informoni paraprakisht nëse keni nevojë për hapësirë parkimi dhe ne do të sigurohemi që të keni disponueshmëri për automjetin tuaj."
    }
  },
  {
    question: {
      en: "What amenities are included in the rooms?",
      sq: "Çfarë amenitetesh janë të përfshira në dhoma?"
    },
    answer: {
      en: "All rooms include free WiFi, air conditioning, TV, private bathroom with shower, toiletries, and daily housekeeping. Some rooms feature city views, balconies, and luxury amenities like jacuzzis.",
      sq: "Të gjitha dhomat përfshijnë WiFi falas, ajër të kondicionuar, TV, banjo private me dush, artikuj higjienik dhe pastrimi ditor. Disa dhoma kanë pamje nga qyteti, ballkone dhe amenitete luksoze si xhakuzi."
    }
  },
  {
    question: {
      en: "How far is Hotel Xhema from the airport?",
      sq: "Sa larg është Hotel Xhema nga aeroporti?"
    },
    answer: {
      en: "Pristina International Airport (Adem Jashari) is approximately 15 km from the hotel, about a 20-minute drive. We can arrange airport transfers upon request.",
      sq: "Aeroporti Ndërkombëtar i Prishtinës (Adem Jashari) është afërsisht 15 km nga hoteli, rreth 20 minuta me makinë. Ne mund të organizojmë transferim nga aeroporti me kërkesë."
    }
  },
  {
    question: {
      en: "Can I cancel or modify my reservation?",
      sq: "A mund ta anuloj ose modifikoj rezervimin tim?"
    },
    answer: {
      en: "Yes, reservations can be cancelled or modified. Cancellation policies vary depending on the rate and time of booking. Please contact us directly for specific details about your reservation.",
      sq: "Po, rezervimet mund të anulohen ose modifikohen. Politikat e anulimit ndryshojnë në varësi të tarifës dhe kohës së rezervimit. Ju lutemi na kontaktoni direkt për detaje specifike rreth rezervimit tuaj."
    }
  },
  {
    question: {
      en: "Is breakfast included?",
      sq: "A është mëngjesi i përfshirë?"
    },
    answer: {
      en: "Breakfast options depend on the rate you book. Some rates include breakfast, while others offer it as an optional add-on. Please check your booking details or contact us for clarification.",
      sq: "Opsionet e mëngjesit varen nga tarifa që rezervoni. Disa tarifa përfshijnë mëngjes, ndërsa të tjerat e ofrojnë si një shtesë opsionale. Ju lutemi kontrolloni detajet e rezervimit ose na kontaktoni për sqarim."
    }
  },
  {
    question: {
      en: "Are pets allowed at Hotel Xhema?",
      sq: "A lejohen kafshët shtëpiake në Hotel Xhema?"
    },
    answer: {
      en: "Pet policies vary by room type and availability. Please contact us in advance if you plan to bring a pet, and we will do our best to accommodate your request.",
      sq: "Politikat për kafshët shtëpiake ndryshojnë sipas llojit të dhomës dhe disponueshmërisë. Ju lutemi na kontaktoni paraprakisht nëse planifikoni të sillni një kafshë shtëpiake dhe ne do të bëjmë maksimumin për të përshtatur kërkesën tuaj."
    }
  },
  {
    question: {
      en: "Is there a 24-hour front desk?",
      sq: "A ka recepsion 24-orësh?"
    },
    answer: {
      en: "Yes, our front desk is available 24/7 to assist you with check-in, check-out, local recommendations, and any other needs during your stay.",
      sq: "Po, recepsioni ynë është i disponueshëm 24/7 për t'ju ndihmuar me check-in, check-out, rekomandime lokale dhe çdo nevojë tjetër gjatë qëndrimit tuaj."
    }
  }
];

export default function FAQSection() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {language === 'sq' ? 'Pyetje të Shpeshta' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg text-gray-900 pr-4">
                  {language === 'sq' ? item.question.sq : item.question.en}
                </span>
                <svg
                  className={`w-6 h-6 text-primary transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {language === 'sq' ? item.answer.sq : item.answer.en}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
