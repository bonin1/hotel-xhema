import { BUSINESS_CATEGORIES, BUSINESS_INFO } from "./business-config";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
  language?: string;
  geoRegion?: string;
  geoPosition?: string;
  geoPlacename?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // LinkedIn specific fields
  linkedinTitle?: string;
  linkedinDescription?: string;
  linkedinImage?: string;
  linkedinAuthor?: string;
  // Facebook specific fields
  facebookAppId?: string;
  facebookAdmins?: string[];
  // Additional social media fields
  socialImage?: string; // Alternative social sharing image
  socialTitle?: string; // Alternative social sharing title
  socialDescription?: string; // Alternative social sharing description
  // Schema.org fields
  articleSection?: string;
  articleTag?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  favicon: string;
  themeColor: string;
  author: string;
  copyright: string;
  social: {
    facebook?: string;
    facebookAppId?: string;
    twitter?: string;
    twitterHandle?: string; // Just the handle without @
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
    tiktok?: string;
    pinterest?: string;
    snapchat?: string;
    telegram?: string;
    nextdoor?: string;
    yelp?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: string;
  services: string[];
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

/*
Note from SEB: When doing the seo config make sure to change the url to match our website url this way the og image will reference the correct image on build
Remember on localhost the url will be http://localhost:3000 but in production it will be another one.
*/

export const siteConfig: SiteConfig = {
  name: "Hotel Xhema",
  url: typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://hotelxhema.com'),
  description: "Stay at Hotel Xhema in the heart of Pristina, Kosovo. Comfortable rooms, luxury apartments with city views, and excellent hospitality. Walking distance to major attractions. Book your stay today!",
  logo: "/images/logo/logo.png",
  favicon: "/favicon.ico",
  themeColor: "#F1C338",
  author: "Hotel Xhema",
  copyright: "© 2024 Hotel Xhema. All rights reserved.",
  social: {
    facebook: undefined,
    twitter: undefined,
    twitterHandle: undefined,
    instagram: undefined,
    linkedin: undefined,
    youtube: undefined,
    pinterest: undefined
  },
  contact: {
    phone: "044177665",
    email: "hotelxhema2323@gmail.com",
    address: "Maliq Pashë Gjinolli",
    city: "Prishtina",
    state: "Kosovo",
    zipCode: "10000",
    country: "Kosovo"
  },
  businessHours: "24 Hours",
  services: ["Accommodation", "Room Booking", "Luxury Apartments", "Double Rooms", "Twin Rooms", "Concierge Services"],
  coordinates: {
    latitude: "42.669889",
    longitude: "21.164993"
  }
};

export const seoConfigs: Record<string, SEOConfig> = {
  "/": {
    title: "Hotel Xhema - Comfortable Accommodation in Pristina, Kosovo",
    description: "Stay at Hotel Xhema in the heart of Pristina. Comfortable rooms, luxury apartments with city views, and warm hospitality. Walking distance to major attractions. Book now!",
    keywords: ["hotel pristina", "accommodation kosovo", "hotel xhema", "pristina hotels", "kosovo lodging", "pristina city center hotel", "hotels in pristina"],
    canonical: `${siteConfig.url}/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Hotel Xhema - Your Home Away from Home in Pristina",
    linkedinDescription: "Experience comfort and hospitality at Hotel Xhema. Modern rooms and luxury apartments in the heart of Pristina, Kosovo.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Hotel Xhema - Comfortable Accommodation in Pristina, Kosovo",
    socialDescription: "Comfortable accommodation in Pristina's city center. Book your stay at Hotel Xhema today.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Hotel Services",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url }
    ]
  },

  "/rooms/": {
    title: "Rooms - Hotel Xhema Pristina",
    description: "Explore our comfortable rooms and luxury apartments at Hotel Xhema. From twin rooms to spacious apartments with city views. Book your perfect accommodation.",
    keywords: ["hotel rooms pristina", "luxury apartments kosovo", "hotel xhema rooms", "accommodation pristina"],
    canonical: `${siteConfig.url}/rooms/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Hotel Xhema Rooms - Comfort Meets Style",
    linkedinDescription: "Discover our range of accommodations from cozy rooms to luxury apartments.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Rooms - Hotel Xhema Pristina",
    socialDescription: "Modern amenities, comfortable spaces, and stunning city views.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` }
    ]
  },

  "/contact/": {
    title: "Contact Us - Hotel Xhema Pristina",
    description: "Get in touch with Hotel Xhema. Located at Maliq Pashë Gjinolli, Prishtina 10000. Call us at 044177665 or email hotelxhema2323@gmail.com for bookings and inquiries.",
    keywords: ["contact hotel xhema", "pristina hotel contact", "hotel booking kosovo", "hotel xhema phone", "hotel xhema address"],
    canonical: `${siteConfig.url}/contact/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Contact Hotel Xhema - Book Your Stay in Pristina",
    linkedinDescription: "Ready to experience Pristina? Get in touch with our friendly team for bookings and inquiries.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Contact Us - Hotel Xhema Pristina",
    socialDescription: "We're here to help plan your perfect stay in Pristina. Contact us today - 24/7 front desk service.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Contact Information",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Contact", url: `${siteConfig.url}/contact/` }
    ]
  },
  "/attractions/": {
    title: "Attractions Near Hotel Xhema - Explore Pristina",
    description: "Discover the best attractions near Hotel Xhema. Walking distance to Newborn Monument, Mother Teresa Cathedral, National Library, and more Pristina landmarks.",
    keywords: ["pristina attractions", "things to do pristina", "kosovo tourism", "newborn monument", "pristina landmarks", "hotel xhema location"],
    canonical: `${siteConfig.url}/attractions/`,
    ogImage: "/images/attractions/newborn/newborn-monument1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Explore Pristina from Hotel Xhema",
    linkedinDescription: "Perfect location to explore all major Pristina attractions on foot.",
    linkedinImage: "/images/attractions/newborn/newborn-monument1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Attractions Near Hotel Xhema - Explore Pristina",
    socialDescription: "Stay at Hotel Xhema and walk to the city's most iconic landmarks.",
    socialImage: "/images/attractions/newborn/newborn-monument1.jpg",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` }
    ]
  },
  "/booking/": {
    title: "Book Your Stay - Hotel Xhema Pristina",
    description: "Book your room at Hotel Xhema online. Easy booking process, instant confirmation, and competitive rates. Luxury apartments and comfortable rooms in Pristina.",
    keywords: ["book hotel pristina", "hotel xhema booking", "online reservation kosovo", "pristina hotel booking"],
    canonical: `${siteConfig.url}/booking/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Book Your Stay at Hotel Xhema",
    linkedinDescription: "Secure your accommodation in Pristina with easy online booking.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Book Your Stay - Hotel Xhema Pristina",
    socialDescription: "Quick and easy booking. Best rates guaranteed.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Booking",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Booking", url: `${siteConfig.url}/booking/` }
    ]
  },
  "/booking/success/": {
    title: "Booking Confirmed - Hotel Xhema Pristina",
    description: "Thank you for your booking at Hotel Xhema. Your reservation has been confirmed. We look forward to welcoming you to Pristina!",
    keywords: ["hotel xhema booking confirmation", "reservation confirmed pristina", "hotel booking success"],
    canonical: `${siteConfig.url}/booking/success/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    noIndex: true,
    noFollow: true,
    linkedinTitle: "Booking Confirmed - Hotel Xhema",
    linkedinDescription: "Your reservation at Hotel Xhema has been successfully confirmed.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Booking Confirmed - Hotel Xhema Pristina",
    socialDescription: "Thank you for choosing Hotel Xhema. See you soon!",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Booking",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Booking", url: `${siteConfig.url}/booking/` },
      { name: "Success", url: `${siteConfig.url}/booking/success/` }
    ]
  },
  "/things-to-do/": {
    title: "Things to Do in Pristina - Complete Guide | Hotel Xhema",
    description: "Discover the best things to do in Pristina, Kosovo. From cultural attractions and historical landmarks to dining, shopping, and nightlife. Your complete guide from Hotel Xhema.",
    keywords: ["things to do pristina", "pristina activities", "kosovo tourism", "pristina attractions guide", "what to do in pristina", "pristina travel guide"],
    canonical: `${siteConfig.url}/things-to-do/`,
    ogImage: "/images/attractions/newborn/newborn-monument1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Things to Do in Pristina - Complete Travel Guide",
    linkedinDescription: "Explore Pristina like a local with our comprehensive guide to attractions, dining, and activities.",
    linkedinImage: "/images/attractions/newborn/newborn-monument1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Things to Do in Pristina - Complete Guide | Hotel Xhema",
    socialDescription: "Your complete guide to exploring Pristina: attractions, restaurants, shopping, and more.",
    socialImage: "/images/attractions/newborn/newborn-monument1.jpg",
    articleSection: "Travel Guide",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Things to Do", url: `${siteConfig.url}/things-to-do/` }
    ]
  },
  "/amenities/": {
    title: "Hotel Amenities - Comfort & Convenience | Hotel Xhema Pristina",
    description: "Explore all amenities at Hotel Xhema. Free WiFi, air conditioning, 24/7 front desk, private balconies, jacuzzi suites, and more. Everything for a comfortable stay in Pristina.",
    keywords: ["hotel xhema amenities", "pristina hotel facilities", "hotel services kosovo", "hotel xhema features"],
    canonical: `${siteConfig.url}/amenities/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Hotel Xhema Amenities - Comfort & Convenience",
    linkedinDescription: "Discover all the amenities and services that make Hotel Xhema your perfect home in Pristina.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Hotel Amenities - Comfort & Convenience | Hotel Xhema Pristina",
    socialDescription: "Free WiFi, jacuzzi suites, 24/7 service, and more. Everything for your comfort.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Hotel Information",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Amenities", url: `${siteConfig.url}/amenities/` }
    ]
  },
  "/booking-policies/": {
    title: "Booking Policies & Guidelines - Hotel Xhema Pristina",
    description: "Review Hotel Xhema's booking policies: check-in/check-out times, cancellation policy, payment methods, house rules, and guest guidelines. Book with confidence.",
    keywords: ["hotel xhema booking policy", "cancellation policy pristina hotel", "check-in check-out times", "hotel rules kosovo"],
    canonical: `${siteConfig.url}/booking-policies/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Hotel Xhema Booking Policies",
    linkedinDescription: "Clear and transparent booking policies for a smooth reservation experience.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Booking Policies & Guidelines - Hotel Xhema Pristina",
    socialDescription: "Check-in, cancellation, and guest policies. Book with confidence.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Policies",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Booking Policies", url: `${siteConfig.url}/booking-policies/` }
    ]
  },
  "/privacy/": {
    title: "Privacy Policy - Hotel Xhema Pristina",
    description: "Hotel Xhema's privacy policy outlines how we collect, use, and protect your personal information. Your privacy and data security are important to us.",
    keywords: ["hotel xhema privacy policy", "data protection", "guest information security"],
    canonical: `${siteConfig.url}/privacy/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    noIndex: true,
    noFollow: true,
    linkedinTitle: "Privacy Policy - Hotel Xhema",
    linkedinDescription: "How we protect and handle your personal information.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Privacy Policy - Hotel Xhema Pristina",
    socialDescription: "Your privacy matters to us. Read our data protection policy.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Legal",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Privacy Policy", url: `${siteConfig.url}/privacy/` }
    ]
  },
  "/terms/": {
    title: "Terms and Conditions - Hotel Xhema Pristina",
    description: "Hotel Xhema's terms and conditions for booking and staying at our property. Please review before making a reservation.",
    keywords: ["hotel xhema terms", "booking terms and conditions", "hotel terms of service"],
    canonical: `${siteConfig.url}/terms/`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    noIndex: true,
    noFollow: true,
    linkedinTitle: "Terms and Conditions - Hotel Xhema",
    linkedinDescription: "Terms and conditions for booking and staying at Hotel Xhema.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Terms and Conditions - Hotel Xhema Pristina",
    socialDescription: "Read our terms and conditions before booking.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Legal",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Terms and Conditions", url: `${siteConfig.url}/terms/` }
    ]
  },
};

// Room SEO configurations
export const roomsSEOData: Record<string, SEOConfig & {name: string; price: string; amenities: string[]}> = {
  "luxury-apartment-1": {
    name: "Luxury Apartment 1",
    title: "Luxury Apartment 1 - Premium Accommodation | Hotel Xhema Pristina",
    description: "Experience luxury in our spacious apartment featuring a king bed, private balcony with stunning city views, and jacuzzi. Perfect for families or groups seeking premium accommodation in Pristina.",
    keywords: ["luxury apartment pristina", "apartment with jacuzzi pristina", "hotel xhema luxury", "family accommodation pristina", "apartment city views kosovo"],
    canonical: `${siteConfig.url}/rooms/luxury-apartment-1`,
    ogImage: "/images/rooms/apartment1/JacuziView2.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Luxury Apartment 1 - Hotel Xhema",
    linkedinDescription: "Spacious luxury apartment with jacuzzi and city views in Pristina.",
    linkedinImage: "/images/rooms/apartment1/JacuziView2.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Luxury Apartment 1 - Premium Accommodation | Hotel Xhema Pristina",
    socialDescription: "Experience luxury with our spacious apartment featuring jacuzzi and stunning city views.",
    socialImage: "/images/rooms/apartment1/JacuziView2.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Luxury Apartment 1", url: `${siteConfig.url}/rooms/luxury-apartment-1` }
    ],
    price: "€40-120",
    amenities: ["King Bed", "Private Balcony", "Jacuzzi", "City Views", "Free WiFi", "Air Conditioning", "TV"]
  },
  "luxury-apartment-2": {
    name: "Luxury Apartment 2",
    title: "Luxury Apartment 2 - Spacious Suite | Hotel Xhema Pristina",
    description: "Our second luxury apartment offers exceptional comfort with modern amenities, jacuzzi, balcony, and premium furnishings. Ideal for travelers seeking space and flexibility.",
    keywords: ["luxury suite pristina", "spacious apartment kosovo", "hotel xhema apartments", "premium accommodation pristina"],
    canonical: `${siteConfig.url}/rooms/luxury-apartment-2`,
    ogImage: "/images/rooms/apartment2/Main View.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Luxury Apartment 2 - Hotel Xhema",
    linkedinDescription: "Exceptional comfort with modern amenities and premium furnishings.",
    linkedinImage: "/images/rooms/apartment2/Main View.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Luxury Apartment 2 - Spacious Suite | Hotel Xhema Pristina",
    socialDescription: "Spacious luxury apartment with jacuzzi, balcony, and premium amenities.",
    socialImage: "/images/rooms/apartment2/Main View.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Luxury Apartment 2", url: `${siteConfig.url}/rooms/luxury-apartment-2` }
    ],
    price: "€40-120",
    amenities: ["King Bed", "Private Balcony", "Jacuzzi", "City Views", "Free WiFi", "Air Conditioning", "TV"]
  },
  "twin-room-1": {
    name: "Twin Room 1",
    title: "Twin Room 1 - Comfortable Shared Room | Hotel Xhema Pristina",
    description: "Perfect for friends or colleagues traveling together, our Twin Room features two comfortable single beds, private balcony, and modern amenities in the heart of Pristina.",
    keywords: ["twin room pristina", "two beds hotel kosovo", "shared room pristina", "business travel hotel kosovo"],
    canonical: `${siteConfig.url}/rooms/twin-room-1`,
    ogImage: "/images/rooms/twin1/Main View.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Twin Room 1 - Hotel Xhema",
    linkedinDescription: "Perfect for friends or colleagues with two single beds and private balcony.",
    linkedinImage: "/images/rooms/twin1/Main View.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Twin Room 1 - Comfortable Shared Room | Hotel Xhema Pristina",
    socialDescription: "Two comfortable single beds with private balcony and modern amenities.",
    socialImage: "/images/rooms/twin1/Main View.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Twin Room 1", url: `${siteConfig.url}/rooms/twin-room-1` }
    ],
    price: "€28-39",
    amenities: ["Two Single Beds", "Private Balcony", "Free WiFi", "Air Conditioning", "TV", "Work Desk"]
  },
  "twin-room-2": {
    name: "Twin Room 2",
    title: "Twin Room 2 - Budget-Friendly Twin Room | Hotel Xhema Pristina",
    description: "Our second Twin Room provides the same comfortable setup with two single beds, balcony access, and all essential amenities for a pleasant stay.",
    keywords: ["budget twin room pristina", "affordable accommodation kosovo", "twin beds hotel pristina"],
    canonical: `${siteConfig.url}/rooms/twin-room-2`,
    ogImage: "/images/rooms/twin2/Main View.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Twin Room 2 - Hotel Xhema",
    linkedinDescription: "Comfortable twin room with balcony access and modern amenities.",
    linkedinImage: "/images/rooms/twin2/Main View.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Twin Room 2 - Budget-Friendly Twin Room | Hotel Xhema Pristina",
    socialDescription: "Comfortable setup with two single beds and all essential amenities.",
    socialImage: "/images/rooms/twin2/Main View.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Twin Room 2", url: `${siteConfig.url}/rooms/twin-room-2` }
    ],
    price: "€28-39",
    amenities: ["Two Single Beds", "Balcony Access", "Free WiFi", "Air Conditioning", "TV", "Work Desk"]
  },
  "double-room-1": {
    name: "Double Room 1",
    title: "Double Room 1 - Cozy Room for Couples | Hotel Xhema Pristina",
    description: "Cozy and comfortable, our Double Room features a comfortable double bed and warm ambiance. Perfect for couples or solo travelers seeking quality accommodations.",
    keywords: ["double room pristina", "couples accommodation kosovo", "romantic hotel pristina", "cozy room hotel xhema"],
    canonical: `${siteConfig.url}/rooms/double-room-1`,
    ogImage: "/images/rooms/double1/Main View.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Double Room 1 - Hotel Xhema",
    linkedinDescription: "Cozy double room perfect for couples or solo travelers.",
    linkedinImage: "/images/rooms/double1/Main View.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Double Room 1 - Cozy Room for Couples | Hotel Xhema Pristina",
    socialDescription: "Comfortable double bed with warm ambiance and quality amenities.",
    socialImage: "/images/rooms/double1/Main View.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Double Room 1", url: `${siteConfig.url}/rooms/double-room-1` }
    ],
    price: "€28-39",
    amenities: ["Double Bed", "Free WiFi", "Air Conditioning", "TV", "Private Bathroom"]
  },
  "double-room-2": {
    name: "Double Room 2",
    title: "Double Room 2 - Modern Double Room with City Views | Hotel Xhema Pristina",
    description: "Our second Double Room offers elegant design with modern comfort, double bed, city views, and all essential amenities for a memorable stay.",
    keywords: ["modern double room pristina", "city view room kosovo", "elegant accommodation pristina"],
    canonical: `${siteConfig.url}/rooms/double-room-2`,
    ogImage: "/images/rooms/double2/Main View.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Double Room 2 - Hotel Xhema",
    linkedinDescription: "Elegant double room with modern comfort and city views.",
    linkedinImage: "/images/rooms/double2/Main View.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Double Room 2 - Modern Double Room with City Views | Hotel Xhema Pristina",
    socialDescription: "Elegant design with city views and all essential amenities.",
    socialImage: "/images/rooms/double2/Main View.jpg",
    articleSection: "Accommodations",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Rooms", url: `${siteConfig.url}/rooms/` },
      { name: "Double Room 2", url: `${siteConfig.url}/rooms/double-room-2` }
    ],
    price: "€28-39",
    amenities: ["Double Bed", "City Views", "Free WiFi", "Air Conditioning", "TV", "Private Bathroom"]
  }
};

// Attraction SEO configurations
export const attractionsSEOData: Record<string, SEOConfig & {name: string; category: string; distance: string; address: string}> = {
  "newborn-monument": {
    name: "Newborn Monument",
    title: "Newborn Monument - Kosovo Independence Symbol | Hotel Xhema Guide",
    category: "Landmark",
    description: "The NEWBORN monument is one of Pristina's most iconic landmarks and a symbol of Kosovo's independence. Painted yearly with new designs celebrating Kosovo's progress.",
    keywords: ["newborn monument pristina", "kosovo independence monument", "pristina landmarks", "things to do pristina"],
    canonical: `${siteConfig.url}/attractions/newborn-monument`,
    ogImage: "/images/attractions/newborn/newborn-monument1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Newborn Monument - Kosovo's Icon",
    linkedinDescription: "Pristina's most iconic landmark celebrating Kosovo's independence.",
    linkedinImage: "/images/attractions/newborn/newborn-monument1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Newborn Monument - Kosovo Independence Symbol | Hotel Xhema Guide",
    socialDescription: "Visit the iconic NEWBORN monument, 8 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/newborn/newborn-monument1.jpg",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Newborn Monument", url: `${siteConfig.url}/attractions/newborn-monument` }
    ],
    distance: "8 min walk from Hotel Xhema",
    address: "Sheshi Nënë Tereza, Prishtina 10000, Kosovo"
  },
  "mother-teresa-cathedral": {
    name: "Mother Teresa Cathedral",
    title: "Mother Teresa Cathedral - Beautiful Church in Pristina | Hotel Xhema Guide",
    category: "Religious Site",
    description: "A stunning modern cathedral dedicated to Mother Teresa, one of Pristina's most beautiful religious buildings with impressive architecture and peaceful atmosphere.",
    keywords: ["mother teresa cathedral", "pristina church", "religious sites kosovo", "catholic cathedral pristina"],
    canonical: `${siteConfig.url}/attractions/mother-teresa-cathedral`,
    ogImage: "/images/attractions/cathedral/la-cattedrale1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Mother Teresa Cathedral - Pristina",
    linkedinDescription: "Stunning modern cathedral with impressive architecture.",
    linkedinImage: "/images/attractions/cathedral/la-cattedrale1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Mother Teresa Cathedral - Beautiful Church in Pristina | Hotel Xhema Guide",
    socialDescription: "Visit the beautiful Mother Teresa Cathedral, 10 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/cathedral/la-cattedrale1.jpg",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Mother Teresa Cathedral", url: `${siteConfig.url}/attractions/mother-teresa-cathedral` }
    ],
    distance: "10 min walk from Hotel Xhema",
    address: "Rruga Luan Haradinaj, Prishtina 10000, Kosovo"
  },
  "national-library": {
    name: "National Library of Kosovo",
    title: "National Library of Kosovo - Unique Architecture | Hotel Xhema Guide",
    category: "Architecture",
    description: "An architectural marvel with its unique cube design covered in metal mesh, one of the most photographed buildings in Kosovo. A must-see for architecture enthusiasts.",
    keywords: ["national library kosovo", "brutalist architecture pristina", "unique buildings kosovo", "pristina architecture"],
    canonical: `${siteConfig.url}/attractions/national-library`,
    ogImage: "/images/attractions/library/Libraria1.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "National Library of Kosovo",
    linkedinDescription: "Architectural marvel with unique cube design.",
    linkedinImage: "/images/attractions/library/Libraria1.webp",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "National Library of Kosovo - Unique Architecture | Hotel Xhema Guide",
    socialDescription: "Visit the iconic National Library, 12 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/library/Libraria1.webp",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "National Library", url: `${siteConfig.url}/attractions/national-library` }
    ],
    distance: "12 min walk from Hotel Xhema",
    address: "Rruga e Dëshmorëve, Prishtina 10000, Kosovo"
  },
  "kosovo-museum": {
    name: "Kosovo Museum",
    title: "Kosovo Museum - History & Culture | Hotel Xhema Guide",
    category: "Museum",
    description: "Explore Kosovo's rich history and cultural heritage through extensive collections and exhibitions spanning from ancient times to modern day.",
    keywords: ["kosovo museum", "pristina museums", "kosovo history", "cultural attractions pristina"],
    canonical: `${siteConfig.url}/attractions/kosovo-museum`,
    ogImage: "/images/attractions/museum/Museum 1.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Kosovo Museum - Pristina",
    linkedinDescription: "Explore Kosovo's rich history and cultural heritage.",
    linkedinImage: "/images/attractions/museum/Museum 1.webp",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Kosovo Museum - History & Culture | Hotel Xhema Guide",
    socialDescription: "Visit Kosovo Museum, just 7 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/museum/Museum 1.webp",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Kosovo Museum", url: `${siteConfig.url}/attractions/kosovo-museum` }
    ],
    distance: "7 min walk from Hotel Xhema",
    address: "Sheshi Nënë Tereza, Prishtina 10000, Kosovo"
  },
  "ethnographic-museum": {
    name: "Ethnographic Museum",
    title: "Ethnographic Museum - Traditional Kosovo Culture | Hotel Xhema Guide",
    category: "Museum",
    description: "Housed in a traditional Ottoman-era building, this museum showcases Kosovo's cultural traditions, crafts, and traditional way of life.",
    keywords: ["ethnographic museum pristina", "traditional kosovo culture", "ottoman architecture kosovo"],
    canonical: `${siteConfig.url}/attractions/ethnographic-museum`,
    ogImage: "/images/attractions/ethnographic/Ethno 1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Ethnographic Museum - Pristina",
    linkedinDescription: "Traditional Ottoman-era building showcasing Kosovo's culture.",
    linkedinImage: "/images/attractions/ethnographic/Ethno 1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Ethnographic Museum - Traditional Kosovo Culture | Hotel Xhema Guide",
    socialDescription: "Discover traditional Kosovo culture, 11 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/ethnographic/Ethno 1.jpg",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Ethnographic Museum", url: `${siteConfig.url}/attractions/ethnographic-museum` }
    ],
    distance: "11 min walk from Hotel Xhema",
    address: "Emin Duraku, Prishtina 10000, Kosovo"
  },
  "skanderbeg-square": {
    name: "Skanderbeg Square",
    title: "Skanderbeg Square - City Center Landmark | Hotel Xhema Guide",
    category: "Landmark",
    description: "A prominent square honoring the Albanian national hero Skanderbeg, located in the city center. Popular gathering place with cafes and shopping nearby.",
    keywords: ["skanderbeg square pristina", "city center pristina", "albanian hero monument", "pristina landmarks"],
    canonical: `${siteConfig.url}/attractions/skanderbeg-square`,
    ogImage: "/images/attractions/skanderbeg/Skanderbeg 1.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Skanderbeg Square - Pristina",
    linkedinDescription: "Prominent square honoring Albanian national hero Skanderbeg.",
    linkedinImage: "/images/attractions/skanderbeg/Skanderbeg 1.jpg",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Skanderbeg Square - City Center Landmark | Hotel Xhema Guide",
    socialDescription: "Visit Skanderbeg Square, 9 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/skanderbeg/Skanderbeg 1.jpg",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Skanderbeg Square", url: `${siteConfig.url}/attractions/skanderbeg-square` }
    ],
    distance: "9 min walk from Hotel Xhema",
    address: "Sheshi Skënderbeu, Prishtina 10000, Kosovo"
  },
  "germia-park": {
    name: "Germia Park",
    title: "Germia Park - Nature & Recreation | Hotel Xhema Guide",
    category: "Nature",
    description: "Pristina's largest park offering hiking trails, picnic areas, swimming pool, and beautiful nature - perfect for outdoor recreation and family activities.",
    keywords: ["germia park pristina", "hiking pristina", "nature parks kosovo", "family activities pristina"],
    canonical: `${siteConfig.url}/attractions/germia-park`,
    ogImage: "/images/attractions/germia/Germia 1.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Germia Park - Pristina",
    linkedinDescription: "Pristina's largest park with hiking, picnic areas, and nature.",
    linkedinImage: "/images/attractions/germia/Germia 1.webp",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Germia Park - Nature & Recreation | Hotel Xhema Guide",
    socialDescription: "Explore Germia Park, 15 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/germia/Germia 1.webp",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "Germia Park", url: `${siteConfig.url}/attractions/germia-park` }
    ],
    distance: "15 min drive from Hotel Xhema",
    address: "Germia, Prishtina 10000, Kosovo"
  },
  "city-center": {
    name: "Pristina City Center",
    title: "Pristina City Center - Shopping & Dining | Hotel Xhema Guide",
    category: "Shopping",
    description: "The main pedestrian boulevard and heart of the city, lined with cafes, restaurants, shops, and cultural attractions. Perfect for evening strolls.",
    keywords: ["pristina city center", "shopping pristina", "mother teresa boulevard", "pristina restaurants"],
    canonical: `${siteConfig.url}/attractions/city-center`,
    ogImage: "/images/attractions/citycenter/Center 1.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "XK",
    geoPosition: "42.669889;21.164993",
    geoPlacename: "Prishtina, Kosovo",
    linkedinTitle: "Pristina City Center",
    linkedinDescription: "Heart of the city with cafes, restaurants, and shopping.",
    linkedinImage: "/images/attractions/citycenter/Center 1.webp",
    linkedinAuthor: "Hotel Xhema",
    socialTitle: "Pristina City Center - Shopping & Dining | Hotel Xhema Guide",
    socialDescription: "Explore city center, just 5 minutes from Hotel Xhema.",
    socialImage: "/images/attractions/citycenter/Center 1.webp",
    articleSection: "Local Attractions",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Attractions", url: `${siteConfig.url}/attractions/` },
      { name: "City Center", url: `${siteConfig.url}/attractions/city-center` }
    ],
    distance: "5 min walk from Hotel Xhema",
    address: "Mother Teresa Boulevard, Prishtina 10000, Kosovo"
  }
};

export const defaultSEO: SEOConfig = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["hotel pristina", "accommodation kosovo", "hotel xhema", "pristina hotels", "kosovo lodging"],
  canonical: siteConfig.url,
  ogImage: `${siteConfig.url}/images/rooms/apartment1/JacuziView2.jpg`,
  ogType: "website",
  twitterCard: "summary_large_image",
  language: "en-US",
  geoRegion: "XK",
  geoPosition: "42.669889;21.164993",
  geoPlacename: "Prishtina, Kosovo",
  linkedinTitle: siteConfig.name,
  linkedinDescription: siteConfig.description,
  linkedinImage: `${siteConfig.url}/images/rooms/apartment1/JacuziView2.jpg`,
  linkedinAuthor: siteConfig.author,
  facebookAppId: siteConfig.social.facebookAppId,
  socialTitle: siteConfig.name,
  socialDescription: siteConfig.description,
  socialImage: `${siteConfig.url}/images/rooms/apartment1/JacuziView2.jpg`,
  articleSection: "Hotel Services",
  breadcrumbs: [
    { name: "Home", url: siteConfig.url }
  ]
};

export function getSEOConfig(pathname: string): SEOConfig {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return seoConfigs[normalizedPath] || defaultSEO;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "Customer Support",
      "areaServed": siteConfig.contact.country,
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0522",
      "longitude": "-118.2437"
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": siteConfig.contact.city
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getServiceSchema(pathname: string) {
  const seoConfig = getSEOConfig(pathname);
  
  // Map pathnames to service types
  const serviceMap: { [key: string]: string } = {
      "service1": "Service One",
      "service2": "Service Two",
      "service3": "Service Three",
      "service4": "Service Four"
  };

  const serviceType = serviceMap[pathname];
  if (!serviceType) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceType} Services`,
    "description": seoConfig.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": [
        "Sausalito", "Mill Valley", "Tiburon", "Belvedere", "Corte Madera", 
        "Larkspur", "Kentfield", "Ross", "San Anselmo", "San Rafael", 
        "Paradise Cay", "Strawberry", "Marin City", "Greenbrae", 
        "Tamalpais Valley", "Muir Beach", "Golden Gate Heights", 
        "Sea Cliff", "Presidio Heights", "Pacific Heights"
      ],
      "url": seoConfig.canonical
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.8591,
        "longitude": -122.4853
      },
      "geoRadius": "50000"
    },
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceType.toLowerCase()} services with free consultation`,
      "priceCurrency": "USD"
    }
  };
}

/**
 * Generate LocalBusiness schema for city/location pages
 * ONLY applies to the actual city where the business is located, NOT for service areas
 * For service areas, use getCityPlaceSchema instead
 */
export function getCityLocalBusinessSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
  servicesOffered?: string[];
  isBusinessLocation?: boolean; // New flag to indicate if this is the actual business location
}) {
  // Only return LocalBusiness schema if this is the actual business location
  if (!cityData.isBusinessLocation) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${siteConfig.name} - ${cityData.name}, ${cityData.state}`,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": cityData.description || `Professional services in ${cityData.name}, ${cityData.state}`,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services in ${cityData.name}`,
      "itemListElement": (cityData.servicesOffered || siteConfig.services).map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "areaServed": {
            "@type": "City",
            "name": cityData.name
          }
        }
      }))
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "100"
    }
  };
}

/**
 * Generate City/Place schema for service area pages (not business location)
 * Use this for cities that are service areas, not where the business is located
 */
export function getCityPlaceSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${cityData.name}, ${cityData.state}`,
    "description": cityData.description || `${siteConfig.name} serves ${cityData.name}, ${cityData.state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "additionalType": "City"
  };
}

/**
 * Generate City/Place schema for "Things to Do" pages
 * NO TouristDestination schema - use City/Place schema instead
 */
export function getThingsToDoSchema(thingsToDoData: {
  cityName: string;
  state: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
  attractions: Array<{
    name: string;
    address: string;
    description: string;
    type: string;
    category: string;
    mapUrl?: string;
  }>;
  totalAttractions?: number;
}) {
  return [
    // City/Place schema for the city
    {
      "@context": "https://schema.org",
      "@type": "City",
      "name": `${thingsToDoData.cityName}`,
      "description": thingsToDoData.description,
      "url": thingsToDoData.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": thingsToDoData.cityName,
        "addressRegion": thingsToDoData.state,
        "addressCountry": "USA"
      },
      ...(thingsToDoData.latitude && thingsToDoData.longitude && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": thingsToDoData.latitude,
          "longitude": thingsToDoData.longitude
        }
      }),
      "containedInPlace": {
        "@type": "State",
        "name": thingsToDoData.state
      }
    },
    // ItemList schema with all attractions
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Things to Do in ${thingsToDoData.cityName}, ${thingsToDoData.state}`,
      "description": `Top attractions and activities in ${thingsToDoData.cityName}`,
      "numberOfItems": thingsToDoData.totalAttractions || thingsToDoData.attractions.length,
      "itemListElement": thingsToDoData.attractions.map((attraction, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Place",
          "name": attraction.name,
          "description": attraction.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": attraction.address,
            "addressLocality": thingsToDoData.cityName,
            "addressRegion": thingsToDoData.state,
            "addressCountry": "USA"
          },
          "additionalType": attraction.type,
          ...(attraction.mapUrl && {
            "hasMap": attraction.mapUrl
          })
        }
      }))
    }
  ];
}

/**
 * Generate Service schema for individual service pages
 * More flexible than the existing getServiceSchema
 */
export function getServicePageSchema(serviceData: {
  name: string;
  description: string;
  url: string;
  category?: string;
  price?: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.name,
    "description": serviceData.description,
    "url": serviceData.url,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": serviceData.areaServed || [
        {
          "@type": "City",
          "name": siteConfig.contact.city,
          "addressRegion": siteConfig.contact.state
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "100"
      }
    },
    "serviceType": serviceData.serviceType || serviceData.category || serviceData.name,
    "category": serviceData.category,
    "areaServed": serviceData.areaServed || [
      {
        "@type": "City",
        "name": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state
      }
    ],
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceData.name.toLowerCase()} with free consultation`,
      "priceCurrency": "USD",
      "price": serviceData.price || "0",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": serviceData.price || "0"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "image": `${siteConfig.url}${siteConfig.logo}`
  };
}

export function getArticleSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: { name: string; title: string; avatar: string };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string };
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.seo.metaTitle || postData.title,
    "description": postData.seo.metaDescription || postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "author": {
      "@type": "Person",
      "name": postData.author.name,
      "jobTitle": postData.author.title,
      "image": postData.author.avatar ? `${baseUrl}${postData.author.avatar}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": postData.publishedAt,
    "dateModified": postData.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "articleSection": postData.category,
    "keywords": postData.seo.keywords || postData.tags.join(', '),
    "wordCount": postData.content.split(' ').length,
    "timeRequired": postData.readTime,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "name": `${siteConfig.name} Blog`,
      "url": `${baseUrl}/blog`
    }
  };
}

/**
 * Generate HowTo schema for blog posts with "How to" in the title
 * Use this in addition to Article schema for instructional content
 */
export function getHowToSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  featuredImage?: string;
  steps?: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  // Extract steps from content if not provided
  const steps = postData.steps || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": postData.title,
    "description": postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "url": articleUrl,
    "datePublished": postData.publishedAt,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": `${baseUrl}${step.image}`
      })
    })),
    "totalTime": "PT30M",
    "supply": [],
    "tool": []
  };
}

/**
 * Generate FAQ schema for FAQ pages
 * Use this for pages with frequently asked questions
 */
export function getFAQSchema(faqData: {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function getPortfolioSchema(portfolioData: {
  name: string;
  description: string;
  url: string;
  projects: Array<{
    id: number;
    title: string;
    category: string;
    image: string;
    date?: string;
    location?: string;
    description: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": portfolioData.name,
    "description": portfolioData.description,
    "url": portfolioData.url,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`
    }
  };
}

/**
 * Valid Schema.org business types for local businesses
 * Choose the one that best matches your business type
 */
/**
 * Generate dynamic business schema for homepage
 * @param businessType - The Schema.org business type (defaults to value from business config)
 * @param options - Optional configuration for rating, price range, etc.
 */
export function getBusinessSchema(
  businessType?: string
) {
  // Import business config dynamically to avoid circular dependency
  let defaultBusinessType: string = "LocalBusiness";
  try {
    defaultBusinessType = BUSINESS_CATEGORIES.primary as string;
  } catch (e) {
    // Fall back to LocalBusiness if import fails
    console.warn('Could not load BUSINESS_CATEGORIES from business-config, using LocalBusiness as default');
  }

  return {
    "@context": "https://schema.org",
    "@type": businessType || defaultBusinessType,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.coordinates?.latitude,
      "longitude": siteConfig.coordinates?.longitude
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": siteConfig.services.map(() => ({
      "@type": "City",
      "name": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate schema for the services page
 * Includes Organization, Service Catalog (ItemList), and Breadcrumb schemas
 */
export function getServicesPageSchema(services: Array<{
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  isCore: boolean;
}>) {
  const coreServices = services.filter(service => service.isCore);
  
  return [
    // Organization schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "description": siteConfig.description,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phone,
        "contactType": "Customer Support",
        "areaServed": siteConfig.contact.country,
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "sameAs": Object.values(siteConfig.social).filter(Boolean)
    },
    // Service catalog schema (ItemList)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${siteConfig.name} Services`,
      "description": `Comprehensive services offered by ${siteConfig.name}`,
      "numberOfItems": coreServices.length,
      "itemListElement": coreServices.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": `${siteConfig.url}/${service.slug}`,
          "provider": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url
          },
          "serviceType": service.category,
          "offers": {
            "@type": "Offer",
            "description": service.description,
            "priceCurrency": "USD"
          }
        }
      }))
    },
    // Breadcrumb schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${siteConfig.url}/services/`
        }
      ]
    }
  ];
}