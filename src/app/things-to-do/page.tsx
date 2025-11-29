"use client";

import Link from "next/link";
import { attractionsSEOData } from "@/lib/seo-config";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const thingsToDo = [
  {
    title: "Cultural Landmarks",
    items: [
      {
        slug: "newborn-monument",
        name: attractionsSEOData["newborn-monument"].name,
        distance: attractionsSEOData["newborn-monument"].distance,
        description: "Kosovo's iconic independence symbol, painted yearly with new designs."
      },
      {
        slug: "mother-teresa-cathedral",
        name: attractionsSEOData["mother-teresa-cathedral"].name,
        distance: attractionsSEOData["mother-teresa-cathedral"].distance,
        description: "Stunning modern cathedral with beautiful architecture."
      },
      {
        slug: "skanderbeg-square",
        name: attractionsSEOData["skanderbeg-square"].name,
        distance: attractionsSEOData["skanderbeg-square"].distance,
        description: "City center square honoring Albanian national hero."
      }
    ]
  },
  {
    title: "Museums & Culture",
    items: [
      {
        slug: "kosovo-museum",
        name: attractionsSEOData["kosovo-museum"].name,
        distance: attractionsSEOData["kosovo-museum"].distance,
        description: "Explore Kosovo's history from ancient times to modern day."
      },
      {
        slug: "ethnographic-museum",
        name: attractionsSEOData["ethnographic-museum"].name,
        distance: attractionsSEOData["ethnographic-museum"].distance,
        description: "Traditional Ottoman-era building showcasing Kosovo's culture."
      }
    ]
  },
  {
    title: "Architecture & Unique Sites",
    items: [
      {
        slug: "national-library",
        name: attractionsSEOData["national-library"].name,
        distance: attractionsSEOData["national-library"].distance,
        description: "Architectural marvel with unique cube design - must-see for architecture enthusiasts."
      }
    ]
  },
  {
    title: "Nature & Recreation",
    items: [
      {
        slug: "germia-park",
        name: attractionsSEOData["germia-park"].name,
        distance: attractionsSEOData["germia-park"].distance,
        description: "Pristina's largest park with hiking, swimming, and picnic areas."
      }
    ]
  },
  {
    title: "Shopping & Dining",
    items: [
      {
        slug: "city-center",
        name: attractionsSEOData["city-center"].name,
        distance: attractionsSEOData["city-center"].distance,
        description: "Main pedestrian boulevard with cafes, restaurants, and shops."
      }
    ]
  }
];

const additionalActivities = [
  {
    title: "Dining Experiences",
    description: "Explore Pristina's vibrant culinary scene with traditional Kosovo cuisine, Turkish influences, and international restaurants. Don't miss trying flija (traditional layered pastry), qebapa (grilled meat), and local wines."
  },
  {
    title: "Nightlife",
    description: "Pristina comes alive at night with numerous bars, clubs, and live music venues along Mother Teresa Boulevard and Zona Industrial. Experience the city's youthful energy and vibrant social scene."
  },
  {
    title: "Shopping",
    description: "From modern shopping malls like Albi Mall and KIKA to traditional markets, Pristina offers diverse shopping experiences. Find local crafts, traditional filigree jewelry, and modern boutiques."
  },
  {
    title: "Day Trips",
    description: "Use Hotel Xhema as your base to explore nearby attractions: Gadime Cave, Bear Sanctuary, Rugova Canyon, and the historic cities of Prizren and Peja are all within driving distance."
  }
];

export default function ThingsToDoPage() {
  const attractionsSection = useScrollAnimation(0.1);
  const activitiesSection = useScrollAnimation(0.1);
  const tipsSection = useScrollAnimation(0.1);
  const ctaSection = useScrollAnimation(0.1);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Things to Do in Pristina</h1>
          <p className="text-xl text-primary-100">Your Complete Guide from Hotel Xhema</p>
        </div>
      </section>

      {/* Attractions Section */}
      <section
        ref={attractionsSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          attractionsSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Attractions Near Hotel Xhema</h2>
            <p className="text-base text-neutral-600">Explore Pristina&apos;s best landmarks within walking distance</p>
          </div>
          {thingsToDo.map((category, idx) => (
            <div key={idx} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-neutral-900">{category.title}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/attractions/${item.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                  >
                    <h4 className="text-xl font-semibold mb-2 text-primary-700">{item.name}</h4>
                    <p className="text-sm text-primary-600 font-medium mb-3">{item.distance}</p>
                    <p className="text-neutral-600 mb-4">{item.description}</p>
                    <span className="inline-block text-primary-700 hover:text-primary-800 font-semibold text-sm">
                      Learn more →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Activities */}
      <section
        ref={activitiesSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-white ${
          activitiesSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">More Things to Do</h2>
            <p className="text-base text-neutral-600">Additional experiences in Pristina</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {additionalActivities.map((activity, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-900">{activity.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Tips */}
      <section
        ref={tipsSection.ref as React.RefObject<HTMLElement>}
        className={`pt-16 md:pt-16 pb-16 px-4 bg-neutral-50 ${
          tipsSection.isVisible ? 'animate-on-scroll' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Local Tips from Hotel Xhema</h2>
            <p className="text-base text-neutral-600">Essential information for your visit</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Best Time to Visit</h3>
              <p className="text-neutral-600">
                Spring (April-June) and Fall (September-October) offer pleasant weather. Summers are warm and perfect for outdoor activities,
                while winters can be cold but festive with holiday markets.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Getting Around</h3>
              <p className="text-neutral-600">
                Most attractions are within walking distance from Hotel Xhema. For longer distances, taxis and ride-sharing apps are
                affordable and readily available. Our front desk can arrange transportation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Language</h3>
              <p className="text-neutral-600">
                Albanian is the main language, but English is widely spoken in tourist areas, restaurants, and hotels.
                Young people are especially fluent in English.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Currency</h3>
              <p className="text-neutral-600">
                Euro (€) is the official currency. ATMs are widely available, and credit cards are accepted in most establishments.
                Always carry some cash for smaller vendors.
              </p>
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
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Ready to Explore Pristina?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Book your stay at Hotel Xhema and experience the best of Kosovo&apos;s capital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-block px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              Book Now
            </Link>
            <Link
              href="/attractions"
              className="inline-block px-8 py-3 border-2 border-primary-700 text-primary-700 hover:bg-primary-50 rounded-lg font-semibold transition-colors text-sm"
            >
              View All Attractions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
