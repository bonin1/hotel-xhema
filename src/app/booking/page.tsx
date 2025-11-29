"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

// Room type configurations
const roomConfig = {
  "luxury-apartment": { maxGuests: 8, name: "Luxury Apartment" },
  "twin-room": { maxGuests: 2, name: "Twin Room" },
  "double-room": { maxGuests: 2, name: "Double Room" },
};

// Comprehensive country codes list
const countryCodes = [
  { code: "+93", country: "Afghanistan", abbr: "AFG" },
  { code: "+355", country: "Albania", abbr: "ALB" },
  { code: "+213", country: "Algeria", abbr: "DZA" },
  { code: "+376", country: "Andorra", abbr: "AND" },
  { code: "+244", country: "Angola", abbr: "AGO" },
  { code: "+54", country: "Argentina", abbr: "ARG" },
  { code: "+374", country: "Armenia", abbr: "ARM" },
  { code: "+61", country: "Australia", abbr: "AUS" },
  { code: "+43", country: "Austria", abbr: "AUT" },
  { code: "+994", country: "Azerbaijan", abbr: "AZE" },
  { code: "+973", country: "Bahrain", abbr: "BHR" },
  { code: "+880", country: "Bangladesh", abbr: "BGD" },
  { code: "+375", country: "Belarus", abbr: "BLR" },
  { code: "+32", country: "Belgium", abbr: "BEL" },
  { code: "+501", country: "Belize", abbr: "BLZ" },
  { code: "+229", country: "Benin", abbr: "BEN" },
  { code: "+975", country: "Bhutan", abbr: "BTN" },
  { code: "+591", country: "Bolivia", abbr: "BOL" },
  { code: "+387", country: "Bosnia and Herzegovina", abbr: "BIH" },
  { code: "+267", country: "Botswana", abbr: "BWA" },
  { code: "+55", country: "Brazil", abbr: "BRA" },
  { code: "+673", country: "Brunei", abbr: "BRN" },
  { code: "+359", country: "Bulgaria", abbr: "BGR" },
  { code: "+226", country: "Burkina Faso", abbr: "BFA" },
  { code: "+257", country: "Burundi", abbr: "BDI" },
  { code: "+855", country: "Cambodia", abbr: "KHM" },
  { code: "+237", country: "Cameroon", abbr: "CMR" },
  { code: "+1", country: "Canada / USA", abbr: "CAN/USA" },
  { code: "+238", country: "Cape Verde", abbr: "CPV" },
  { code: "+236", country: "Central African Republic", abbr: "CAF" },
  { code: "+235", country: "Chad", abbr: "TCD" },
  { code: "+56", country: "Chile", abbr: "CHL" },
  { code: "+86", country: "China", abbr: "CHN" },
  { code: "+57", country: "Colombia", abbr: "COL" },
  { code: "+269", country: "Comoros", abbr: "COM" },
  { code: "+242", country: "Congo", abbr: "COG" },
  { code: "+506", country: "Costa Rica", abbr: "CRI" },
  { code: "+385", country: "Croatia", abbr: "HRV" },
  { code: "+53", country: "Cuba", abbr: "CUB" },
  { code: "+357", country: "Cyprus", abbr: "CYP" },
  { code: "+420", country: "Czech Republic", abbr: "CZE" },
  { code: "+45", country: "Denmark", abbr: "DNK" },
  { code: "+253", country: "Djibouti", abbr: "DJI" },
  { code: "+593", country: "Ecuador", abbr: "ECU" },
  { code: "+20", country: "Egypt", abbr: "EGY" },
  { code: "+503", country: "El Salvador", abbr: "SLV" },
  { code: "+240", country: "Equatorial Guinea", abbr: "GNQ" },
  { code: "+291", country: "Eritrea", abbr: "ERI" },
  { code: "+372", country: "Estonia", abbr: "EST" },
  { code: "+251", country: "Ethiopia", abbr: "ETH" },
  { code: "+679", country: "Fiji", abbr: "FJI" },
  { code: "+358", country: "Finland", abbr: "FIN" },
  { code: "+33", country: "France", abbr: "FRA" },
  { code: "+241", country: "Gabon", abbr: "GAB" },
  { code: "+220", country: "Gambia", abbr: "GMB" },
  { code: "+995", country: "Georgia", abbr: "GEO" },
  { code: "+49", country: "Germany", abbr: "DEU" },
  { code: "+233", country: "Ghana", abbr: "GHA" },
  { code: "+30", country: "Greece", abbr: "GRC" },
  { code: "+502", country: "Guatemala", abbr: "GTM" },
  { code: "+224", country: "Guinea", abbr: "GIN" },
  { code: "+245", country: "Guinea-Bissau", abbr: "GNB" },
  { code: "+592", country: "Guyana", abbr: "GUY" },
  { code: "+509", country: "Haiti", abbr: "HTI" },
  { code: "+504", country: "Honduras", abbr: "HND" },
  { code: "+852", country: "Hong Kong", abbr: "HKG" },
  { code: "+36", country: "Hungary", abbr: "HUN" },
  { code: "+354", country: "Iceland", abbr: "ISL" },
  { code: "+91", country: "India", abbr: "IND" },
  { code: "+62", country: "Indonesia", abbr: "IDN" },
  { code: "+98", country: "Iran", abbr: "IRN" },
  { code: "+964", country: "Iraq", abbr: "IRQ" },
  { code: "+353", country: "Ireland", abbr: "IRL" },
  { code: "+972", country: "Israel", abbr: "ISR" },
  { code: "+39", country: "Italy", abbr: "ITA" },
  { code: "+81", country: "Japan", abbr: "JPN" },
  { code: "+962", country: "Jordan", abbr: "JOR" },
  { code: "+7", country: "Kazakhstan / Russia", abbr: "KAZ/RUS" },
  { code: "+254", country: "Kenya", abbr: "KEN" },
  { code: "+383", country: "Kosovo", abbr: "KOS" },
  { code: "+965", country: "Kuwait", abbr: "KWT" },
  { code: "+996", country: "Kyrgyzstan", abbr: "KGZ" },
  { code: "+856", country: "Laos", abbr: "LAO" },
  { code: "+371", country: "Latvia", abbr: "LVA" },
  { code: "+961", country: "Lebanon", abbr: "LBN" },
  { code: "+266", country: "Lesotho", abbr: "LSO" },
  { code: "+231", country: "Liberia", abbr: "LBR" },
  { code: "+218", country: "Libya", abbr: "LBY" },
  { code: "+423", country: "Liechtenstein", abbr: "LIE" },
  { code: "+370", country: "Lithuania", abbr: "LTU" },
  { code: "+352", country: "Luxembourg", abbr: "LUX" },
  { code: "+853", country: "Macau", abbr: "MAC" },
  { code: "+389", country: "North Macedonia", abbr: "MKD" },
  { code: "+261", country: "Madagascar", abbr: "MDG" },
  { code: "+265", country: "Malawi", abbr: "MWI" },
  { code: "+60", country: "Malaysia", abbr: "MYS" },
  { code: "+960", country: "Maldives", abbr: "MDV" },
  { code: "+223", country: "Mali", abbr: "MLI" },
  { code: "+356", country: "Malta", abbr: "MLT" },
  { code: "+222", country: "Mauritania", abbr: "MRT" },
  { code: "+230", country: "Mauritius", abbr: "MUS" },
  { code: "+52", country: "Mexico", abbr: "MEX" },
  { code: "+373", country: "Moldova", abbr: "MDA" },
  { code: "+377", country: "Monaco", abbr: "MCO" },
  { code: "+976", country: "Mongolia", abbr: "MNG" },
  { code: "+382", country: "Montenegro", abbr: "MNE" },
  { code: "+212", country: "Morocco", abbr: "MAR" },
  { code: "+258", country: "Mozambique", abbr: "MOZ" },
  { code: "+95", country: "Myanmar", abbr: "MMR" },
  { code: "+264", country: "Namibia", abbr: "NAM" },
  { code: "+977", country: "Nepal", abbr: "NPL" },
  { code: "+31", country: "Netherlands", abbr: "NLD" },
  { code: "+64", country: "New Zealand", abbr: "NZL" },
  { code: "+505", country: "Nicaragua", abbr: "NIC" },
  { code: "+227", country: "Niger", abbr: "NER" },
  { code: "+234", country: "Nigeria", abbr: "NGA" },
  { code: "+850", country: "North Korea", abbr: "PRK" },
  { code: "+47", country: "Norway", abbr: "NOR" },
  { code: "+968", country: "Oman", abbr: "OMN" },
  { code: "+92", country: "Pakistan", abbr: "PAK" },
  { code: "+970", country: "Palestine", abbr: "PSE" },
  { code: "+507", country: "Panama", abbr: "PAN" },
  { code: "+675", country: "Papua New Guinea", abbr: "PNG" },
  { code: "+595", country: "Paraguay", abbr: "PRY" },
  { code: "+51", country: "Peru", abbr: "PER" },
  { code: "+63", country: "Philippines", abbr: "PHL" },
  { code: "+48", country: "Poland", abbr: "POL" },
  { code: "+351", country: "Portugal", abbr: "PRT" },
  { code: "+974", country: "Qatar", abbr: "QAT" },
  { code: "+40", country: "Romania", abbr: "ROU" },
  { code: "+966", country: "Saudi Arabia", abbr: "SAU" },
  { code: "+221", country: "Senegal", abbr: "SEN" },
  { code: "+381", country: "Serbia", abbr: "SRB" },
  { code: "+248", country: "Seychelles", abbr: "SYC" },
  { code: "+232", country: "Sierra Leone", abbr: "SLE" },
  { code: "+65", country: "Singapore", abbr: "SGP" },
  { code: "+421", country: "Slovakia", abbr: "SVK" },
  { code: "+386", country: "Slovenia", abbr: "SVN" },
  { code: "+252", country: "Somalia", abbr: "SOM" },
  { code: "+27", country: "South Africa", abbr: "ZAF" },
  { code: "+82", country: "South Korea", abbr: "KOR" },
  { code: "+211", country: "South Sudan", abbr: "SSD" },
  { code: "+34", country: "Spain", abbr: "ESP" },
  { code: "+94", country: "Sri Lanka", abbr: "LKA" },
  { code: "+249", country: "Sudan", abbr: "SDN" },
  { code: "+597", country: "Suriname", abbr: "SUR" },
  { code: "+268", country: "Eswatini", abbr: "SWZ" },
  { code: "+46", country: "Sweden", abbr: "SWE" },
  { code: "+41", country: "Switzerland", abbr: "CHE" },
  { code: "+963", country: "Syria", abbr: "SYR" },
  { code: "+886", country: "Taiwan", abbr: "TWN" },
  { code: "+992", country: "Tajikistan", abbr: "TJK" },
  { code: "+255", country: "Tanzania", abbr: "TZA" },
  { code: "+66", country: "Thailand", abbr: "THA" },
  { code: "+228", country: "Togo", abbr: "TGO" },
  { code: "+216", country: "Tunisia", abbr: "TUN" },
  { code: "+90", country: "Turkey", abbr: "TUR" },
  { code: "+993", country: "Turkmenistan", abbr: "TKM" },
  { code: "+256", country: "Uganda", abbr: "UGA" },
  { code: "+380", country: "Ukraine", abbr: "UKR" },
  { code: "+971", country: "United Arab Emirates", abbr: "UAE" },
  { code: "+44", country: "United Kingdom", abbr: "GBR" },
  { code: "+598", country: "Uruguay", abbr: "URY" },
  { code: "+998", country: "Uzbekistan", abbr: "UZB" },
  { code: "+58", country: "Venezuela", abbr: "VEN" },
  { code: "+84", country: "Vietnam", abbr: "VNM" },
  { code: "+967", country: "Yemen", abbr: "YEM" },
  { code: "+260", country: "Zambia", abbr: "ZMB" },
  { code: "+263", country: "Zimbabwe", abbr: "ZWE" }
];

export default function BookingPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);
  const [maxGuests, setMaxGuests] = useState(8);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+383",
    phone: "",
    roomType: "",
    guests: "1",
    specialRequests: "",
  });

  // Update max guests when room type changes
  useEffect(() => {
    if (formData.roomType) {
      const config = roomConfig[formData.roomType as keyof typeof roomConfig];
      if (config) {
        setMaxGuests(config.maxGuests);
        // Reset guests if current selection exceeds new max
        if (parseInt(formData.guests) > config.maxGuests) {
          setFormData(prev => ({ ...prev, guests: "1" }));
        }
      }
    }
  }, [formData.roomType, formData.guests]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show summary popup instead of direct redirect
    setShowSummary(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const bookingData = {
        ...formData,
        checkIn: checkIn?.toISOString().split('T')[0] || '',
        checkOut: checkOut?.toISOString().split('T')[0] || '',
      };

      // Calculate price based on room type (example prices in EUR)
      const roomPrices: { [key: string]: number } = {
        'luxury-apartment': 150,
        'twin-room': 80,
        'double-room': 90,
      };

      const basePrice = roomPrices[formData.roomType] || 100;
      
      // Calculate number of nights
      const nights = checkIn && checkOut ? 
        Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
      
      const totalAmount = basePrice * nights;

      // TODO: Stripe integration disabled for now
      // Temporarily bypass payment and go directly to success page
      // In production, this should process payment via Stripe
      
      // Send confirmation email without payment processing
      const contactResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          message: `Booking Request:\nRoom: ${formData.roomType === 'luxury-apartment' ? 'Luxury Apartment' :
                    formData.roomType === 'twin-room' ? 'Twin Room' : 'Double Room'}\nCheck-in: ${checkIn?.toLocaleDateString()}\nCheck-out: ${checkOut?.toLocaleDateString()}\nGuests: ${formData.guests}\nSpecial Requests: ${formData.specialRequests || 'None'}\nTotal: €${totalAmount}`,
          subject: 'Hotel Booking Request',
        }),
      });

      if (contactResponse.ok) {
        // Redirect to success page
        window.location.href = '/booking/success';
      } else {
        throw new Error('Failed to send booking confirmation');
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Sorry, there was an error processing your booking. Please try again or contact us directly at +383 44 177 665.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return language === 'en' ? 'Select date' : 'Zgjidhni datën';
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stay</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Complete the form below to reserve your room at Hotel Xhema
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      {/* Mobile: pt-12 pb-12 standard spacing */}
            {/* Booking Form */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-12 md:pt-12 lg:pt-16 pb-12 md:pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 border border-primary-200">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900 mb-4 sm:mb-6">{t('reservationDetails', language)}</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4">{t('personalInformation', language)}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('firstName', language)} *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('lastName', language)} *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('emailAddressLabel', language)} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('phoneNumberLabel', language)} *
                      </label>
                      <div className="flex gap-1.5 sm:gap-2">
                        <div className="relative w-20 sm:w-24">
                          <select
                            id="countryCode"
                            name="countryCode"
                            required
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="w-full px-2 sm:px-3 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer text-neutral-900"
                            aria-label="Country Code"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code} className="text-neutral-900">
                                {country.code}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                          placeholder="44 177 665"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="border-t border-neutral-200 pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4">{t('bookingDetails', language)}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="roomType" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('roomTypeLabel', language)} *
                      </label>
                      <select
                        id="roomType"
                        name="roomType"
                        required
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        <option value="" className="text-neutral-900">{t('selectRoomType', language)}</option>
                        <option value="luxury-apartment" className="text-neutral-900">{t('luxuryApartmentOption', language)}</option>
                        <option value="twin-room" className="text-neutral-900">{t('twinRoomOption', language)}</option>
                        <option value="double-room" className="text-neutral-900">{t('doubleRoomOption', language)}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('numberOfGuestsLabel', language)} *
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                      >
                        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num} className="text-neutral-900">
                            {num} {num === 1 ? (language === 'en' ? 'Guest' : 'Mysafir') : (language === 'en' ? 'Guests' : 'Mysafirë')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('checkInDate', language)} *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 py-3 h-auto rounded-lg"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDateDisplay(checkIn)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                            className="bg-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-neutral-600 mt-1">{t('checkInFrom', language)}</p>
                    </div>
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('checkOutDate', language)} *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-white border border-neutral-300 hover:bg-neutral-50 px-4 py-3 h-auto rounded-lg"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDateDisplay(checkOut)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) => {
                              const today = new Date(new Date().setHours(0, 0, 0, 0));
                              if (date < today) return true;
                              if (checkIn && date <= checkIn) return true;
                              return false;
                            }}
                            initialFocus
                            className="bg-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-neutral-600 mt-1">{t('checkOutUntil', language)}</p>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="border-t border-neutral-200 pt-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('specialRequests', language)}
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900"
                    placeholder={t('specialRequestsPlaceholder', language)}
                  ></textarea>
                  <p className="text-xs text-neutral-600 mt-1">
                    {t('accommodateRequests', language)}
                  </p>
                </div>

                {/* Hotel Location Map */}
                <div className="border-t border-neutral-200 pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4">{t('hotelLocation', language)}</h3>
                  <div className="rounded-lg overflow-hidden border border-neutral-300">
                    <iframe
                      src="https://www.google.com/maps?q=42.66988853272513,21.1649933965909&hl=en&z=16&output=embed"
                      width="100%"
                      height="300"
                      className="h-[70vh] sm:h-[300px] md:h-[500px]"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hotel Xhema Location"
                    ></iframe>
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">
                    Hotel Xhema - Maliq pash Gjinolli, Pristina, Kosovo
                  </p>
                </div>

                {/* Submit Button */}
                <div className="border-t border-neutral-200 pt-4 sm:pt-6">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors"
                  >
                    {t('completeReservation', language)}
                  </button>
                  <p className="text-xs text-neutral-600 text-center mt-3 sm:mt-4">
                    {t('agreeTerms', language)}
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-accent-50 via-white to-primary-50 rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-32 border border-accent-200">
              <h3 className="text-xl font-bold text-accent-900 mb-4">{t('bookingInformation', language)}</h3>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-2">{t('checkInCheckOut', language)}</h4>
                  <p className="text-sm text-neutral-600">{t('checkInTime', language)}</p>
                  <p className="text-sm text-neutral-600">{t('checkOutTime', language)}</p>
                </div>

                <div className="pb-4 border-b border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-2">{t('cancellationPolicy', language)}</h4>
                  <p className="text-sm text-neutral-600">
                    {t('cancellationPolicyText', language)}
                  </p>
                </div>

                <div className="pb-4 border-b border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-2">{t('payment', language)}</h4>
                  <p className="text-sm text-neutral-600">
                    {t('paymentText', language)}
                  </p>
                </div>

                <div className="pb-4 border-b border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-2">{t('includedAmenities', language)}</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• {language === 'en' ? 'Free WiFi' : 'WiFi Falas'}</li>
                    <li>• {language === 'en' ? 'Free Parking' : 'Parking Falas'}</li>
                    <li>• {language === 'en' ? 'Smart TV with Netflix' : 'Smart TV me Netflix'}</li>
                    <li>• {language === 'en' ? 'Air Conditioning' : 'Ajër i Kondicionuar'}</li>
                    <li>• {language === 'en' ? 'Daily Housekeeping' : 'Pastrimi i Përditshëm'}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{t('needHelp', language)}</h4>
                  <p className="text-sm text-neutral-600 mb-2">
                    {t('contactAssistance', language)}
                  </p>
                  <p className="text-sm text-primary-800 font-semibold">
                    {t('phone', language)}: +383 44 177 665
                  </p>
                  <p className="text-sm text-primary-800 font-semibold">
                    Email: hotelxhema2323@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Popup */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('reviewYourBooking', language)}</h2>
              
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('personalInformation', language)}</h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('firstName', language)} / {t('lastName', language)}:</span> <span className="text-neutral-900">{formData.firstName} {formData.lastName}</span></p>
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('yourEmail', language)}:</span> <span className="text-neutral-900">{formData.email}</span></p>
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('phone', language)}:</span> <span className="text-neutral-900">{formData.countryCode} {formData.phone}</span></p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('bookingDetails', language)}</h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('roomTypeLabel', language)}:</span> <span className="text-neutral-900">
                    {formData.roomType === 'luxury-apartment' && t('luxuryApartmentOption', language)}
                    {formData.roomType === 'twin-room' && t('twinRoomOption', language)}
                    {formData.roomType === 'double-room' && t('doubleRoomOption', language)}
                  </span></p>
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('numberOfGuestsLabel', language)}:</span> <span className="text-neutral-900">{formData.guests} {formData.guests === '1' ? t('guest', language) : t('guests', language)}</span></p>
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('checkInDate', language)}:</span> <span className="text-neutral-900">{checkIn?.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', { month: 'short', day: 'numeric', year: 'numeric' })}</span></p>
                  <p className="text-sm"><span className="font-medium text-neutral-700">{t('checkOutDate', language)}:</span> <span className="text-neutral-900">{checkOut?.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', { month: 'short', day: 'numeric', year: 'numeric' })}</span></p>
                </div>
              </div>

              {/* Special Requests */}
              {formData.specialRequests && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('specialRequests', language)}</h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-900">{formData.specialRequests || t('noSpecialRequests', language)}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowSummary(false)}
                  className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                >
                  {t('editBooking', language)}
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {t('confirmBooking', language)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

