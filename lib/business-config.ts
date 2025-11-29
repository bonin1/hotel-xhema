/**
 * Business Configuration - Single Source of Truth
 * Hotel Xhema - Pristina, Kosovo
 * Central business information for SEO, schema markup, and application-wide usage
 */

export interface ServiceItem {
  name: string;
  url: string;
  description?: string;
  subServices?: ServiceItem[];
}

export interface Location {
  city: string;
  state: string;
  url?: string;
}

export interface ContactInfo {
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  areaCode: string;
  phone: string;
  email: string;
  addressVisibility: 'HIDDEN' | 'VISIBLE';
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  pinterest?: string;
  nextdoor?: string;
  yelp?: string;
  instagram?: string;
  youtube?: string;
}

export interface GoogleMaps {
  shortLink: string;
  fullUrl: string;
  embedCode: string;
  latitude: string;
  longitude: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// ==========================================
// BUSINESS INFORMATION
// ==========================================
export const BUSINESS_INFO = {
  name: "Hotel Xhema",
  websiteUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hotelxhema.com',
  tone: "Warm and Welcoming",
  logoUrl: "/images/logo/logo.png",
  tagline: "Your Home Away from Home in Pristina",
  primaryKeyword: "Hotel in Pristina",
  ctaText: "Book your stay today!",
} as const;

// ==========================================
// BUSINESS CATEGORIES
// ==========================================
export const BUSINESS_CATEGORIES = {
  primary: "Hotel",
  secondary: [
    "Accommodation",
    "Lodging",
    "Hospitality",
    "Tourist Accommodation",
    "Travel"
  ],
} as const;

// ==========================================
// CORE SERVICES
// ==========================================
export const CORE_SERVICES: ServiceItem[] = [
  {
    name: "Accommodation",
    url: "/rooms/",
    description: "Comfortable rooms and luxury apartments in the heart of Pristina",
    subServices: [
      { name: "Luxury Apartments", url: "/rooms/luxury-apartment-1/", description: "Spacious apartments with city views" },
      { name: "Double Rooms", url: "/rooms/double-room-1/", description: "Comfortable double occupancy rooms" },
      { name: "Twin Rooms", url: "/rooms/twin-room-1/", description: "Twin bed configurations for friends or colleagues" }
    ],
  },
  {
    name: "Booking Services",
    url: "/booking/",
    description: "Easy online booking with instant confirmation",
    subServices: [
      { name: "Online Reservations", url: "/booking/", description: "Book directly online" },
      { name: "Group Bookings", url: "/contact/", description: "Special rates for groups" },
      { name: "Long-term Stays", url: "/contact/", description: "Extended stay packages" }
    ],
  },
  {
    name: "Local Attractions", 
    url: "/attractions/",
    description: "Discover Pristina's best attractions near Hotel Xhema",
  },
  {
    name: "Guest Services",
    url: "/contact/",
    description: "24/7 front desk and concierge services",
  }
];

// Flattened arrays for quick access
export const CORE_SERVICE_NAMES = CORE_SERVICES.map(s => s.name);
export const CORE_SERVICE_URLS = CORE_SERVICES.map(s => s.url);

// All services including sub-services
export const ALL_SERVICES = CORE_SERVICES.flatMap(service => [
  { name: service.name, url: service.url, description: service.description },
  ...(service.subServices || []),
]);

// ==========================================
// SERVICE AREAS / LOCATIONS
// ==========================================
export const LOCATIONS: Location[] = [
  { city: "Pristina", state: "Kosovo", url: "/" },
];

// Helper to get top locations (first location is Pristina)
export const TOP_LOCATIONS = LOCATIONS.slice(0, 1);

// Helper to format location string
export const formatLocation = (location: Location): string => 
  `${location.city}, ${location.state}`;

// ==========================================
// CONTACT INFORMATION
// ==========================================
export const CONTACT: ContactInfo = {
  address: "Maliq Pashë Gjinolli, Prishtina 10000",
  street: "Maliq Pashë Gjinolli",
  city: "Prishtina",
  state: "Kosovo",
  zip: "10000",
  areaCode: "044",
  phone: "044177665",
  email: "hotelxhema2323@gmail.com",
  addressVisibility: "VISIBLE",
};

// ==========================================
// BUSINESS HOURS
// ==========================================
export const BUSINESS_HOURS: BusinessHours = {
  monday: "24 Hours",
  tuesday: "24 Hours",
  wednesday: "24 Hours",
  thursday: "24 Hours",
  friday: "24 Hours",
  saturday: "24 Hours",
  sunday: "24 Hours",
};

// Helper to format business hours for schema
export const BUSINESS_HOURS_SCHEMA = "Mo-Su 00:00-24:00";

// ==========================================
// GOOGLE MAPS
// ==========================================
export const GOOGLE_MAPS: GoogleMaps = {
  shortLink: "https://maps.app.goo.gl/hotelxhema",
  fullUrl: "https://www.google.com/maps/place/Hotel+Xhema",
  embedCode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.5!2d21.1649933965909!3d42.66988853272513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDQwJzExLjYiTiAyMcKwMDknNTQuMCJF!5e0!3m2!1sen!2s!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  latitude: "42.669889",
  longitude: "21.164993",
};

// ==========================================
// SOCIAL MEDIA
// ==========================================
export const SOCIAL_MEDIA: SocialMedia = {
  facebook: undefined,
  twitter: undefined,
  linkedin: undefined,
  pinterest: undefined,
  instagram: undefined,
  youtube: undefined
};

// Filter out undefined social media links
export const ACTIVE_SOCIAL_MEDIA = Object.entries(SOCIAL_MEDIA)
  .filter(([_, url]) => url)
  .reduce((acc, [key, url]) => ({ ...acc, [key]: url }), {}) as SocialMedia;

// ==========================================
// BLOG TOPICS
// ==========================================
export const BLOG_TOPICS = [
  "Things to Do in Pristina",
  "Kosovo Travel Guide",
  "Best Restaurants in Pristina",
  "Cultural Attractions Near Hotel Xhema",
  "Travel Tips for Kosovo"
] as const;

// ==========================================
// META INFORMATION
// ==========================================
export const META = {
  title: "Hotel Xhema - Comfortable Accommodation in Pristina, Kosovo",
  description: "Stay at Hotel Xhema in the heart of Pristina. Comfortable rooms, luxury apartments, and excellent service. Walking distance to major attractions. Book now!",
  keywords: "hotel pristina, accommodation kosovo, hotel xhema, pristina hotels, kosovo lodging, pristina city center hotel",
} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get services formatted for navigation/footer
 */
export const getServicesForNavigation = () => {
  return CORE_SERVICES.map(service => ({
    name: service.name,
    href: service.url,
  }));
};

/**
 * Get locations formatted for navigation/footer
 */
export const getLocationsForNavigation = (limit?: number) => {
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(location => ({
    name: formatLocation(location),
    href: location.url || `/${location.city.toLowerCase().replace(/\s+/g, '-')}-${location.state.toLowerCase()}/`,
  }));
};

/**
 * Get company links for footer/navigation
 */
export const getCompanyLinks = () => [
  { name: "About Us", href: "/about/" },
  { name: "Blog", href: "/blog/" },
  { name: "Contact", href: "/contact/" },
  { name: "Portfolio", href: "/portfolio/" },
  { name: "Service Areas", href: "/service-areas/" },
];

/**
 * Get legal links for footer
 */
export const getLegalLinks = () => [
  { name: "Privacy Policy", href: "/privacy-policy/" },
  { name: "Terms & Conditions", href: "/terms/" },
];

/**
 * Format phone number for display (555-123-4567)
 */
export const formatPhoneDisplay = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    const withoutCountryCode = digits.slice(1);
    return `${withoutCountryCode.slice(0, 3)}-${withoutCountryCode.slice(3, 6)}-${withoutCountryCode.slice(6)}`;
  }
  return phone;
};

/**
 * Format phone number for tel: links (+15551234567)
 */
export const formatPhoneTel = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  if (phone.startsWith('+')) {
    return phone;
  }
  return `+1${digits}`;
};

export const getPhoneDisplay = (): string => formatPhoneDisplay(CONTACT.phone);
export const getPhoneTel = (): string => formatPhoneTel(CONTACT.phone);
export const getEmail = (): string => CONTACT.email;
export const getBusinessHours = (): BusinessHours => BUSINESS_HOURS;
export const getBusinessHoursForDay = (day: keyof BusinessHours): string => BUSINESS_HOURS[day];
export const getSocialLinks = (): SocialMedia => ACTIVE_SOCIAL_MEDIA;
export const getSocialLink = (platform: keyof SocialMedia): string | undefined => ACTIVE_SOCIAL_MEDIA[platform];
export const getAddress = (): string => CONTACT.address;
export const getCityState = (): string => `${CONTACT.city}, ${CONTACT.state}`;
export const getGoogleMapsLink = (): string => GOOGLE_MAPS.shortLink;
export const getGoogleMapsUrl = (): string => GOOGLE_MAPS.fullUrl;
export const getBusinessName = (): string => BUSINESS_INFO.name;
export const getTagline = (): string => BUSINESS_INFO.tagline;
export const getPrimaryKeyword = (): string => BUSINESS_INFO.primaryKeyword;
export const getWebsiteUrl = (): string => BUSINESS_INFO.websiteUrl;
export const getTopLocations = (count: number = 4): Location[] => LOCATIONS.slice(0, count);
export const getLocationsString = (limit?: number): string => {
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(loc => formatLocation(loc)).join(', ');
};
export const getPrimaryLocation = (): Location => LOCATIONS[0];
export const getServiceByName = (serviceName: string): ServiceItem | undefined => {
  return CORE_SERVICES.find(service => service.name === serviceName);
};
export const getServiceByUrl = (url: string): ServiceItem | undefined => {
  return CORE_SERVICES.find(service => service.url === url);
};
export const getSubServices = (serviceName: string): ServiceItem[] => {
  const service = getServiceByName(serviceName);
  return service?.subServices || [];
};
export const servesLocation = (city: string, state?: string): boolean => {
  if (state) {
    return LOCATIONS.some(loc => 
      loc.city.toLowerCase() === city.toLowerCase() && 
      loc.state.toLowerCase() === state.toLowerCase()
    );
  }
  return LOCATIONS.some(loc => loc.city.toLowerCase() === city.toLowerCase());
};
export const getMetaInfo = () => ({
  title: META.title,
  description: META.description,
  keywords: META.keywords,
});
export const getBlogTopics = (): readonly string[] => BLOG_TOPICS;
export const getCopyright = (): string => `© ${new Date().getFullYear()} ${BUSINESS_INFO.name}. All rights reserved.`;
export const getBusinessCategories = () => BUSINESS_CATEGORIES;
export const getBusinessDescription = (): string => {
  return `${BUSINESS_INFO.name} - Comfortable accommodation in the heart of Pristina, Kosovo. Modern rooms, luxury apartments, and warm hospitality.`;
};
export const getContactInfo = () => ({
  phone: getPhoneDisplay(),
  email: getEmail(),
  address: getAddress(),
});
export const getSocialLinksFormatted = () => {
  return Object.entries(ACTIVE_SOCIAL_MEDIA).map(([key, href]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    href: href as string,
    key: key as keyof SocialMedia,
  }));
};
export const getDefaultAddresses = () => [
  {
    location: getCityState(),
    address: getAddress(),
  }
];
export const getDefaultMapLocation = () => ({
  id: "main-location",
  name: getCityState(),
  address: getAddress(),
  mapEmbed: GOOGLE_MAPS.embedCode.match(/src="([^"]*)"/)?.[1] || "",
  mapTitle: `${getBusinessName()} ${getCityState()} Location`,
  isMain: true as const,
});
