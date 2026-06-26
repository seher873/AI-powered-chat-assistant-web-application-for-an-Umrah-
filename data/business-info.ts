// ============================================================
// BUSINESS INFORMATION CONFIGURATION
// ============================================================
// Edit this file to update all company information, packages,
// services, and FAQ answers. The chatbot logic reads from this
// file — no need to touch any other code.
// ============================================================

export interface Package {
  id: string
  name: string
  duration: string
  price: string
  hotel: string
  transport: string
  includes: string[]
  pricing?: { label: string; price: string }[]
  departure?: string
  return?: string
  airline?: string
  baggage?: string
  gifts?: string[]
}

export interface BusinessInfo {
  companyName: string
  tagline: string
  phone: string
  phone2?: string
  phone3?: string
  whatsapp: string
  email: string
  address: string
  website: string
  logoText: string
  businessHours: string
}

export interface VisaInfo {
  requirements: string[]
  processingTime: string
  fee: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface BusinessData {
  business: BusinessInfo
  packages: Package[]
  visa: VisaInfo
  bookingProcedure: string[]
  paymentPolicy: string[]
  refundPolicy: string[]
  faqs: FAQ[]
  welcomeMessage: string
  fallbackMessage: string
}

const businessData: BusinessData = {
  // ============================================================
  // COMPANY INFORMATION
  // ============================================================
  business: {
    companyName: "Karwan-e-Malik & Abu Amara Umrah Group",
    tagline: "🌙 Rabi-ul-Awwal ki barkatain — 20 Days Special Umrah Package",
    phone: "+92 312-2020800",
    phone2: "0333-3762600",
    phone3: "0313-2809738",
    whatsapp: "923122020800",
    email: "info@karwanemalik.com",
    address: "Karachi, Pakistan",
    website: "www.karwanemalik.com",
    logoText: "Karwan-e-Malik & Abu Amara",
    businessHours: "24/7 Customer Support",
  },

  // ============================================================
  // UMRAH PACKAGES
  // ============================================================
  packages: [
    {
      id: "special20",
      name: "🌙 20 Days Special Umrah Package — Rabi-ul-Awwal",
      duration: "20 Days (12 Din Makkah + Madina)",
      price: "Sharing: PKR 270,000 per person",
      hotel: "Makkah: Ibrahim Khalil Road (Shuttle Hotel), Madina: 500 meter faaslay par",
      transport: "Full Transport by Bus — Airport se hotel tak, Ziyarat ke liye, aur wapsi",
      includes: [
        "✈️ Fly Jinnah — Direct Flights (Karachi to Jeddah)",
        "🏨 Comfortable Stay — Makkah 12 din qiyam",
        "🕌 Madina Munawwara mein 12 Rabi-ul-Awwal — Roza-e-Rasool ﷺ ki hazri",
        "🧳 20 kg baggage + 7 kg hand carry allowance",
        "🕋 Taif aur Badar Ziyarat",
        "🕋 Makkah aur Madina Ziyarat",
        "🚌 Full Transport by Bus",
        "👨‍🏫 Tajurbakaar Guide ki Rehnumai",
      ],
      pricing: [
        { label: "Sharing (4-Share)", price: "PKR 270,000 per person" },
        { label: "Quad Sharing", price: "PKR 280,000 per person" },
        { label: "Triple Sharing", price: "PKR 300,000 per person" },
        { label: "Double Sharing", price: "PKR 320,000 per person" },
      ],
      departure: "20 August — Karachi se Jeddah ravangi",
      return: "8 September — Jeddah se Karachi wapsi",
      airline: "Fly Jinnah — Direct Flights",
      baggage: "20 kg baggage + 7 kg hand carry",
      gifts: [
        "🕋 Ihram",
        "🧣 Ladies Scarf",
        "👜 Hand Carry Bag",
        "🪪 Passport Bag",
        "👟 Shoes Bag",
      ],
    },
    {
      id: "economy",
      name: "Economy Umrah Package",
      duration: "10 Days / 9 Nights",
      price: "$1,299 per person",
      hotel: "3-star hotels in Makkah (500m from Haram) & Madinah (800m from Masjid Nabawi)",
      transport: "Shared airport transfers + AC bus for Ziyarat",
      includes: [
        "Return airfare (economy class)",
        "Visa processing fees",
        "3-star hotel accommodation",
        "Daily breakfast & dinner",
        "Ziyarat tours in Makkah & Madinah",
        "Guidance by professional mutawwif",
      ],
    },
    {
      id: "premium",
      name: "Premium Umrah Package",
      duration: "14 Days / 13 Nights",
      price: "$2,499 per person",
      hotel: "5-star hotels in Makkah (200m from Haram) & Madinah (300m from Masjid Nabawi)",
      transport: "Private airport transfers + luxury AC van for Ziyarat",
      includes: [
        "Return airfare (business class upgrade available)",
        "Express visa processing",
        "5-star hotel accommodation",
        "All meals (breakfast, lunch, dinner)",
        "Private Ziyarat tours",
        "Dedicated tour guide",
        "Zamzam water delivery to hotel",
      ],
    },
    {
      id: "family",
      name: "Family Umrah Package",
      duration: "12 Days / 11 Nights",
      price: "Contact for family pricing (discounts available for groups of 4+)",
      hotel: "4-star family suites in Makkah & Madinah (adjacent rooms available)",
      transport: "Private minibus + children-friendly transport",
      includes: [
        "Return airfare for all family members",
        "Family visa processing",
        "Connecting family suites",
        "All meals included",
        "Family-friendly Ziyarat tours",
        "Children activity program",
        "Baby sitting service available",
        "Group discount pricing",
      ],
    },
  ],

  // ============================================================
  // VISA INFORMATION
  // ============================================================
  visa: {
    requirements: [
      "Valid passport (minimum 6 months validity)",
      "Completed visa application form",
      "2 recent passport-size photographs (white background)",
      "Confirmed return flight tickets",
      "Hotel booking confirmation",
      "Travel insurance (recommended)",
      "COVID-19 vaccination certificate (if applicable)",
      "Non-refundable visa processing fee",
    ],
    processingTime: "5 - 7 business days (express service available in 48 hours)",
    fee: "Included in package price. Standalone visa: PKR 30,000 per person.",
  },

  // ============================================================
  // BOOKING PROCEDURE
  // ============================================================
  bookingProcedure: [
    "Contact us via phone, WhatsApp, or email to discuss your requirements.",
    "Choose your preferred package or customize your own itinerary.",
    "Receive a detailed quotation with all inclusions and pricing.",
    "Pay the booking deposit (50% of total amount) to confirm your reservation.",
    "Submit scanned copies of passports and required documents.",
    "We process your visa and book flights & hotels.",
    "Pay the remaining balance 2 weeks before departure.",
    "Receive your travel itinerary, visa, and welcome kit.",
    "Begin your blessed journey with 24/7 support throughout your trip.",
  ],

  // ============================================================
  // PAYMENT POLICY
  // ============================================================
  paymentPolicy: [
    "50% deposit required to confirm booking.",
    "Remaining 50% due 14 days before departure.",
    "Payments accepted: Bank Transfer, JazzCash, EasyPaisa, Credit/Debit Card.",
    "Installment plans available (up to 4 monthly payments).",
    "All payments are non-refundable unless otherwise stated in our refund policy.",
  ],

  // ============================================================
  // REFUND POLICY
  // ============================================================
  refundPolicy: [
    "Cancellations made 30+ days before departure: 75% refund (minus visa & processing fees).",
    "Cancellations made 15-29 days before departure: 50% refund.",
    "Cancellations made 7-14 days before departure: 25% refund.",
    "Cancellations made less than 7 days before departure: No refund.",
    "Visa rejection (non-refundable visa fee applies): Full refund minus visa fee.",
    "Force majeure or travel bans: Full credit toward future travel within 12 months.",
  ],

  // ============================================================
  // FREQUENTLY ASKED QUESTIONS
  // ============================================================
  faqs: [
    {
      question: "20 Days Special Umrah Package kya hai?",
      answer:
        "Ye 20 din ka khaas Umrah package hai jisme aap 12 Rabi-ul-Awwal Madina Munawwara mein guzar sakte hain aur Roza-e-Rasool ﷺ ki hazri ki sa'adat hasil kar sakte hain. Isme Makkah mein 12 din qiyam, Fly Jinnah ki direct flights, aur mukhtalif sharing options hain.",
    },
    {
      question: "20 Days Special Umrah Package ki qeemat kya hai?",
      answer:
        "Hmare Special 20 Days Umrah Package ki qeemat:\n• Sharing (4-Share): PKR 270,000 per person\n• Quad Sharing: PKR 280,000 per person\n• Triple Sharing: PKR 300,000 per person\n• Double Sharing: PKR 320,000 per person",
    },
    {
      question: "What is included in the Umrah package?",
      answer:
        "All our Umrah packages include return airfare, visa processing, hotel accommodation, airport transfers, Ziyarat tours, and guidance by a professional mutawwif. Specific inclusions vary by package tier — please see the package details above.",
    },
    {
      question: "Do I need a visa for Umrah?",
      answer:
        "Yes, all travelers need a valid Umrah visa. We handle the entire visa process for you. Required documents include a passport with 6+ months validity, passport photos, and completed application forms. Processing takes 5-7 business days.",
    },
    {
      question: "What hotels do you provide?",
      answer:
        "We partner with a wide range of hotels in Makkah and Madinah. Our Special 20 Days package includes Makkah Ibrahim Khalil Road par shuttle hotel aur Madina mein 500 meter faaslay par hotel. Budget se luxury tak har option available hai.",
    },
    {
      question: "Do you provide transport services?",
      answer:
        "Yes! All packages include airport pickup and drop-off. Special 20 Days package mein full transport by bus — airport se hotel, Ziyarat ke liye, aur wapsi tak. Comfortable AC buses with professional drivers.",
    },
    {
      question: "How can I book a package?",
      answer:
        "Booking is easy! You can call us, send a WhatsApp message, or email your requirements. We'll help you choose the right package, provide a quote, and guide you through the process. A 50% deposit confirms your booking.",
    },
    {
      question: "What is your contact number?",
      answer:
        "You can reach us at:\n📞 +92 312-2020800\n📞 0333-3762600\n📞 0313-2809738\n💬 WhatsApp: +92 312-2020800\n📧 Email: info@karwanemalik.com\n\nWe're available 24/7 for your assistance.",
    },
    {
      question: "Can I customize my Umrah package?",
      answer:
        "Absolutely! We specialize in tailor-made Umrah packages. You can choose your preferred hotel star rating, room type, flight class, and add extra Ziyarat tours. Contact us for a personalized quote.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Bank Transfer, JazzCash, EasyPaisa, and Credit/Debit Cards. We also offer interest-free installment plans of up to 4 monthly payments.",
    },
    {
      question: "Special 20 Days package mein kya kya shamil hai?",
      answer:
        "Is package mein shamil hai:\n✅ Fly Jinnah ki direct flights\n✅ 12 din Makkah mein qiyam (Ibrahim Khalil Road, shuttle hotel)\n✅ Madina mein 500 meter faaslay par hotel\n✅ 12 Rabi-ul-Awwal Roza-e-Rasool ﷺ ki hazri\n✅ Taif aur Badar Ziyarat\n✅ Makkah aur Madina Ziyarat\n✅ Full Transport by Bus\n✅ Tajurbakaar Guide\n✅ 20 kg baggage + 7 kg hand carry\n🎁 Gifts: Ihram, Ladies Scarf, Hand Carry Bag, Passport Bag, Shoes Bag",
    },
    {
      question: "Special 20 Days package kab hai?",
      answer:
        "Departure: 20 August ko Karachi se Jeddah ravangi. Wapsi: 8 September ko Jeddah se Karachi. 12 Rabi-ul-Awwal Madina Munawwara mein guzarein.",
    },
    {
      question: "Rabi-ul-Awwal package kya hai?",
      answer:
        "Ye ek khaas 20 din ka Umrah package hai jo aapko 12 Rabi-ul-Awwal Madina Munawwara mein guzarne ka mauqa deta hai. Is din Roza-e-Rasool ﷷ ki hazri ki sa'adat hasil karein. Fly Jinnah direct flights, comfortable stay, aur tamam sahulat shamil hain.",
    },
    {
      question: "Is travel insurance included?",
      answer:
        "Travel insurance is not automatically included but is highly recommended. We can add comprehensive travel insurance to your package for an additional fee. Please ask our agents for details.",
    },
    {
      question: "What is the best time for Umrah?",
      answer:
        "Umrah can be performed year-round. The most popular months are Ramadan (especially the last 10 days), Rabi-ul-Awwal (for special blessings), and during school breaks. Prices vary by season — contact us for the best rates.",
    },
  ],

  // ============================================================
  // CHATBOT MESSAGES
  // ============================================================
  welcomeMessage: `Assalamu Alaikum! 🌙

Karwan-e-Malik & Abu Amara Umrah Group mein aapka khush amdeed!

Mein aapka virtual travel assistant hoon. Main aapki madad kar sakta hoon:

🌙 Rabi-ul-Awwal Special 20 Days Umrah Package
🕋 Umrah Packages & Pricing
🏨 Hotel Options in Makkah & Madinah
📄 Visa Information & Requirements
🚌 Transport Services
📋 Booking Process
🎁 Package Details & Gifts

Kripya neeche diye gaye sawaalon mein se koi ek chunein ya apna sawaal type karein.`,

  fallbackMessage: `Shukriya aapke sawaal ke liye. Mazeed tafseel aur personal assistance ke liye, barah-e-karam hmare travel consultant se raabta karein:

📞 Call: +92 312-2020800
📞 Phone 2: 0333-3762600
📞 Phone 3: 0313-2809738
💬 WhatsApp: +92 312-2020800
📧 Email: info@karwanemalik.com

Hum aap ki har qadam par madad ke liye maujood hain. Allah aap ke safar ko mubarak kare! 🤲`,
}

export default businessData
