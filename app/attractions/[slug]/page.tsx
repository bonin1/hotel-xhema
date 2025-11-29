"use client";

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const attractionsData = {
  "newborn-monument": {
    name: "Newborn Monument",
    category: "Landmark",
    distance: "8 min walk",
    description: "The NEWBORN monument is one of Pristina's most iconic landmarks and a symbol of Kosovo's independence. Unveiled on February 17, 2008, the day Kosovo declared independence, this massive yellow steel sculpture spelling 'NEWBORN' has become a must-visit attraction.",
    fullDescription: "Each year on Independence Day, the monument is repainted with a new design reflecting current themes and messages. The tradition has made it a living piece of art that evolves with the nation. Visitors love to take photos with the monument, and it's especially vibrant during national celebrations. The area around the monument often hosts events, concerts, and gatherings, making it a dynamic public space in the heart of the city.",
    highlights: [
      "Symbol of Kosovo's independence since 2008",
      "Repainted annually with creative new designs",
      "Popular photo spot for tourists and locals",
      "Surrounded by cafes and public spaces",
      "Host to cultural events and celebrations"
    ],
    tips: [
      "Best to visit during golden hour for photos",
      "Check if there are any special events scheduled",
      "Nearby cafes offer great views of the monument",
      "Independence Day (Feb 17) features special celebrations"
    ],
    images: [
      "/images/attractions/newborn/newborn-monument1.jpg",
      "/images/attractions/newborn/newborn2.jpg",
      "/images/attractions/newborn/newborn-monument3.jpg"
    ]
  },
  "mother-teresa-cathedral": {
    name: "Mother Teresa Cathedral",
    category: "Religious Site",
    distance: "12 min walk",
    description: "The Cathedral of Saint Mother Teresa is a stunning example of modern religious architecture in Pristina. Completed in 2010, this Roman Catholic cathedral honors the legacy of Mother Teresa, who was of Albanian descent.",
    fullDescription: "The cathedral features beautiful stained glass windows, modern architectural elements, and a peaceful atmosphere perfect for reflection. Its distinctive bell tower can be seen from various points in the city. The interior is spacious and filled with natural light, creating a serene environment. Regular masses are held in Albanian and other languages, and the cathedral welcomes visitors of all faiths. The surrounding area includes a small park and plaza, making it a pleasant spot to visit.",
    highlights: [
      "Modern architecture with traditional elements",
      "Beautiful stained glass windows",
      "Dedicated to Mother Teresa",
      "Active place of worship",
      "Peaceful gardens and plaza"
    ],
    tips: [
      "Dress modestly when entering",
      "Check mass times if interested in attending",
      "Photography allowed but be respectful",
      "Visit the small museum inside"
    ],
    images: [
      "/images/attractions/cathedral/la-cattedrale1.jpg",
      "/images/attractions/cathedral/la-cattedrale2.jpg",
      "/images/attractions/cathedral/la-cattedrale3.jpg",
      "/images/attractions/cathedral/mother-teresa-cathedral4.jpg",
      "/images/attractions/cathedral/Cathedral 5.webp"
    ]
  },
  "national-library": {
    name: "National Library of Kosovo",
    category: "Architecture",
    distance: "15 min walk",
    description: "The National Library of Kosovo is one of the most distinctive buildings in the Balkans. Designed by Croatian architect Andrija Mutnjaković and completed in 1982, its unique brutalist architecture covered in metal netting has made it an architectural landmark.",
    fullDescription: "The building's unusual design has sparked both admiration and controversy over the years. Its 99 white domes are covered with a metal lattice, creating a striking visual effect. The library houses an extensive collection of books, manuscripts, and historical documents. While the exterior is the main attraction for most visitors, the interior reading rooms and exhibition spaces are worth exploring. The building has been proposed for UNESCO World Heritage status due to its unique architectural significance.",
    highlights: [
      "Unique brutalist architecture",
      "99 distinctive white domes",
      "Metal lattice covering",
      "Extensive book collection",
      "Proposed UNESCO World Heritage site"
    ],
    tips: [
      "Best photographed from outside",
      "Interior tours available during opening hours",
      "Nearby university campus worth exploring",
      "Interesting architectural details throughout"
    ],
    images: [
      "/images/attractions/library/Libraria1.webp",
      "/images/attractions/library/Libraria 2.webp",
      "/images/attractions/library/Libraria 3.webp",
      "/images/attractions/library/Libraria 4.webp",
      "/images/attractions/library/Libraria 5.webp"
    ]
  },
  "germia-park": {
    name: "Germia Park",
    category: "Nature",
    distance: "10 min drive",
    description: "Germia Park is Pristina's largest green space, offering a natural escape from the urban environment. This vast park covers over 1,000 hectares and features forests, hiking trails, picnic areas, and recreational facilities.",
    fullDescription: "The park is a favorite destination for locals and tourists seeking outdoor activities. Well-maintained trails wind through forests of oak and beech trees, leading to scenic viewpoints. During summer, the park's swimming pool complex is a popular attraction. Several restaurants and cafes within the park serve traditional cuisine. The park also features sports facilities, playgrounds for children, and open spaces perfect for picnics and gatherings. In winter, parts of the park transform into a winter wonderland, popular for winter sports.",
    highlights: [
      "Over 1,000 hectares of nature",
      "Hiking and walking trails",
      "Swimming pool complex (summer)",
      "Restaurants with traditional cuisine",
      "Sports facilities and playgrounds"
    ],
    tips: [
      "Bring comfortable walking shoes",
      "Swimming pool open in summer months",
      "Pack a picnic for day trips",
      "Several entry points with parking",
      "Popular on weekends - arrive early"
    ],
    images: [
      "/images/attractions/germia/Germia 1.webp",
      "/images/attractions/germia/Germia 2.webp",
      "/images/attractions/germia/Germia 3.webp",
      "/images/attractions/germia/Germia 4.webp"
    ]
  },
  "kosovo-museum": {
    name: "Kosovo Museum",
    category: "Museum",
    distance: "10 min walk",
    description: "The Kosovo Museum showcases the rich archaeological, ethnological, and cultural heritage of Kosovo. Located in a historic building, the museum offers insights into the region's history from prehistoric times to the present day.",
    fullDescription: "The museum's collections include archaeological artifacts from Neolithic settlements, Roman and Byzantine periods, and medieval Kosovo. The ethnographic section displays traditional costumes, jewelry, household items, and tools that illustrate the daily life and customs of Kosovo's diverse communities. Temporary exhibitions often feature contemporary art and special historical themes. The building itself is of historical significance, having served various purposes throughout Kosovo's complex history.",
    highlights: [
      "Archaeological artifacts from various periods",
      "Traditional costumes and crafts",
      "Ethnographic collections",
      "Temporary art exhibitions",
      "Historic building"
    ],
    tips: [
      "Allow 1-2 hours for full visit",
      "Guided tours available in multiple languages",
      "Photography rules vary by exhibition",
      "Check for temporary exhibitions",
      "Small entrance fee"
    ],
    images: [
      "/images/attractions/museum/Museum 1.webp",
      "/images/attractions/museum/Museum 2.webp",
      "/images/attractions/museum/Museum 3.webp",
      "/images/attractions/museum/Museum 4.webp",
      "/images/attractions/museum/Museum 5.webp"
    ]
  },
  "city-center": {
    name: "Pristina City Center",
    category: "Shopping",
    distance: "7 min walk",
    description: "Pristina City Center is the largest shopping mall in Kosovo, offering a modern shopping and entertainment experience. This multi-story complex features international brands, restaurants, cafes, and a cinema.",
    fullDescription: "The mall has become a central gathering place for both shopping and socializing. With over 100 stores, it offers everything from fashion and electronics to home goods and beauty products. The food court features both international chains and local restaurants, while the rooftop area includes cafes with city views. The cinema shows the latest international releases. The mall also hosts events, exhibitions, and seasonal celebrations throughout the year.",
    highlights: [
      "100+ stores and boutiques",
      "Modern cinema complex",
      "Diverse dining options",
      "Rooftop cafes with views",
      "Regular events and activities"
    ],
    tips: [
      "Open daily until late evening",
      "Free parking available",
      "Currency exchange services inside",
      "Free WiFi throughout the mall",
      "Less crowded on weekday mornings"
    ],
    images: [
      "/images/attractions/citycenter/Center 1.webp",
      "/images/attractions/citycenter/Center 2.webp",
      "/images/attractions/citycenter/Center 3.webp",
      "/images/attractions/citycenter/Center 4.webp"
    ]
  },
  "skanderbeg-square": {
    name: "Skanderbeg Square",
    category: "Public Space",
    distance: "8 min walk",
    description: "Skanderbeg Square is one of Pristina's main public spaces, named after the Albanian national hero Gjergj Kastrioti Skanderbeg. The square features an impressive equestrian statue and is surrounded by important government buildings and cafes.",
    fullDescription: "The square serves as a central meeting point and hosts various events, protests, and celebrations throughout the year. The statue of Skanderbeg on horseback is a prominent landmark and popular photo spot. Surrounding the square are numerous cafes and restaurants where you can enjoy a coffee while people-watching. The area comes alive in the evenings, especially during summer months when outdoor seating fills with locals and tourists. Several important buildings including government offices frame the square, adding to its significance as a political and social hub.",
    highlights: [
      "Historic equestrian statue",
      "Central public gathering space",
      "Surrounded by cafes and restaurants",
      "Government buildings nearby",
      "Regular events and activities"
    ],
    tips: [
      "Great for people-watching",
      "Many photo opportunities",
      "Cafes offer outdoor seating",
      "Sometimes hosts public events",
      "Safe and well-lit in evenings"
    ],
    images: [
      "/images/attractions/skanderbeg/Skanderbeg 1.jpg",
      "/images/attractions/skanderbeg/Skanderbeg 2.jpg",
      "/images/attractions/skanderbeg/Skanderbeg 3.jpg"
    ]
  },
  "ethnographic-museum": {
    name: "Ethnographic Museum",
    category: "Museum",
    distance: "10 min walk",
    description: "The Ethnographic Museum is housed in a beautifully preserved Ottoman-era building, offering a glimpse into traditional Kosovo lifestyle and architecture. The museum showcases authentic furnishings, traditional crafts, and cultural artifacts.",
    fullDescription: "The building itself is a museum piece - a traditional Kosovar house (kulla) that exemplifies Ottoman-period residential architecture. Each room is furnished with period-appropriate items, including traditional carpets, copper utensils, wooden furniture, and textile crafts. The museum provides insight into how Kosovo families lived in the 18th and 19th centuries. Displays include traditional clothing, jewelry, musical instruments, and household tools. The architecture features characteristic elements like the čardak (wooden balcony) and distinctive room layouts that reflect both functional needs and cultural values.",
    highlights: [
      "Authentic Ottoman-era architecture",
      "Traditional furnishings and decor",
      "Cultural artifacts and crafts",
      "Period clothing and jewelry",
      "Well-preserved historical building"
    ],
    tips: [
      "Guided tours enhance the experience",
      "Small entrance fee",
      "Photography allowed in most areas",
      "Combine with nearby Kosovo Museum",
      "Interesting gift shop with traditional crafts"
    ],
    images: [
      "/images/attractions/ethnographic/Ethno 1.jpg",
      "/images/attractions/ethnographic/Ethno 2.JPG",
      "/images/attractions/ethnographic/Ethno 3.jpg"
    ]
  }
};

export default function AttractionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const attraction = attractionsData[slug as keyof typeof attractionsData];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (attraction && attraction.images) {
      setCurrentImageIndex((prev) => (prev + 1) % attraction.images.length);
    }
  };

  const prevImage = () => {
    if (attraction && attraction.images) {
      setCurrentImageIndex((prev) => (prev - 1 + attraction.images.length) % attraction.images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attraction]);

  if (!attraction) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Attraction Not Found</h1>
          <Link href="/attractions" className="text-primary-800 hover:text-primary-900 underline">
            Back to Pristina Guide
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      {/* Mobile: pt-16 standard spacing */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white pt-[22vh] md:pt-[12vh] pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Link href="/attractions" className="text-primary-200 hover:text-white mb-4 inline-block">
            ← Back to Pristina Guide
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{attraction.name}</h1>
              <p className="text-xl text-primary-100">{attraction.category}</p>
            </div>
            <div className="md:text-right">
              <div className="bg-primary-400 px-4 py-2 rounded-lg inline-block">
                <div className="text-lg font-bold text-white">{attraction.distance}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attraction Details Section */}
      {/* Mobile: pt-12 pb-12 for equal spacing */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-12 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery - Carousel */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="relative h-96 rounded-lg overflow-hidden group">
                <Image
                  src={attraction.images[currentImageIndex]}
                  alt={`${attraction.name} - View ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {currentImageIndex + 1} / {attraction.images.length}
                </div>
                
                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  {attraction.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About</h2>
              <p className="text-neutral-700 leading-relaxed mb-6">{attraction.description}</p>
              <p className="text-neutral-700 leading-relaxed">{attraction.fullDescription}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {attraction.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start text-neutral-700">
                    <svg className="w-6 h-6 text-primary-800 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-primary-50 rounded-xl p-8 border border-primary-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Visitor Tips</h2>
              <ul className="space-y-3">
                {attraction.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-neutral-700">
                    <svg className="w-6 h-6 text-accent-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-800 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-neutral-900">Distance</div>
                      <div className="text-sm text-neutral-600">{attraction.distance} from hotel</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-primary-800 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-neutral-900">Category</div>
                      <div className="text-sm text-neutral-600">{attraction.category}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Plan Your Visit</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Make Hotel Xhema your base for exploring Pristina. We&apos;re perfectly located for visiting all major attractions.
                </p>
                <Link
                  href="/booking"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Your Stay
                </Link>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Need Help?</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Our staff can provide directions, recommendations, and assistance planning your visit.
                </p>
                <a
                  href="tel:+38344177665"
                  className="flex items-center text-primary-800 hover:text-primary-900 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  +383 44 177 665
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Attractions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">More Places to Visit</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(attractionsData)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, attr]) => (
                <Link key={key} href={`/attractions/${key}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48">
                    <Image src={attr.images[0]} alt={attr.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">{attr.name}</h3>
                    <p className="text-sm text-neutral-600 mb-3">{attr.category}</p>
                    <div className="flex items-center text-sm text-primary-700">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {attr.distance}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center">
            <Link
              href="/attractions"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Attractions
            </Link>
          </div>
        </div>

        {/* Hotel CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Stay at Hotel Xhema</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Make our hotel your home base for exploring Pristina. We&apos;re within walking distance of all major attractions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms" className="bg-white text-primary-800 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Our Rooms
            </Link>
            <Link href="/booking" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
