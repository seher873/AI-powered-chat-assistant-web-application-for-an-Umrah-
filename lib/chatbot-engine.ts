// ============================================================
// CHATBOT ENGINE — Keyword / Intent Matching
// ============================================================
// This engine uses keyword matching to map user messages to
// predefined intents. No external AI services or APIs are used.
// All responses come from the business-info.ts config file.
// ============================================================

import businessData, { type Package } from "@/data/business-info"

// ---- Types ----

export interface ChatResponse {
  text: string
  quickReplies?: string[]
  action?: "none" | "whatsapp" | "call"
}

type IntentHandler = () => ChatResponse

// ---- Intent Detection Helpers ----

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw))
}

function hasAll(text: string, keywords: string[]): boolean {
  return keywords.every((kw) => text.includes(kw))
}

// ---- Package Lookup ----

function findPackage(text: string): Package | undefined {
  const pkg = businessData.packages.find((p) => text.includes(p.id))
  if (pkg) return pkg

  // fallback: search by name keywords
  const nameWords: { key: string; id: string }[] = [
    { key: "economy", id: "economy" },
    { key: "basic", id: "economy" },
    { key: "standard", id: "economy" },
    { key: "premium", id: "premium" },
    { key: "deluxe", id: "premium" },
    { key: "vip", id: "premium" },
    { key: "luxury", id: "premium" },
    { key: "family", id: "family" },
    { key: "20", id: "special20" },
    { key: "rabi", id: "special20" },
    { key: "special", id: "special20" },
  ]
  for (const { key, id } of nameWords) {
    if (text.includes(key)) {
      return businessData.packages.find((p) => p.id === id)
    }
  }
  return undefined
}

function formatPackage(pkg: Package): string {
  let msg = `📦 *${pkg.name}*
━━━━━━━━━━━━━━━━━━
⏱ Duration: ${pkg.duration}
💰 Price: ${pkg.price}
🏨 Hotel: ${pkg.hotel}
🚌 Transport: ${pkg.transport}`

  if (pkg.airline) {
    msg += `\n✈️ Airline: ${pkg.airline}`
  }
  if (pkg.departure) {
    msg += `\n📅 Departure: ${pkg.departure}`
  }
  if (pkg.return) {
    msg += `\n📅 Return: ${pkg.return}`
  }
  if (pkg.baggage) {
    msg += `\n🧳 Baggage: ${pkg.baggage}`
  }

  if (pkg.pricing && pkg.pricing.length > 0) {
    msg += `\n\n*💰 Pricing Options:*`
    for (const opt of pkg.pricing) {
      msg += `\n• ${opt.label}: ${opt.price}`
    }
  }

  msg += `\n\n*Includes:*`
  for (const i of pkg.includes) {
    msg += `\n✅ ${i}`
  }

  if (pkg.gifts && pkg.gifts.length > 0) {
    msg += `\n\n*🎁 Free Gifts:*`
    for (const g of pkg.gifts) {
      msg += `\n${g}`
    }
  }

  return msg
}

function getAllPackagesSummary(): string {
  const lines = businessData.packages.map((pkg) => {
    let line = `📦 *${pkg.name}*\n💲 ${pkg.price}\n⏱ ${pkg.duration}`
    if (pkg.hotel) line += `\n🏨 ${pkg.hotel.split("(")[0].trim()}`
    if (pkg.airline) line += `\n✈️ ${pkg.airline}`
    return line
  })
  return `*Hamare Umrah Packages*\n━━━━━━━━━━━━━━━━━━\n\n${lines.join("\n\n")}\n\nKisi bhi package ki tafseel ke liye us ka naam likhein jaise \"20 din\", \"economy\", \"premium\", ya \"family\".`
}

// ---- Intent Handlers ----

const intents: { match: (text: string) => boolean; handler: IntentHandler }[] = [
  // ---- Special 20 Days Package ----
  {
    match: (text) =>
      hasAny(text, ["20 din", "20 day", "rabi", "rabi-ul-awwal", "special 20", "special package", "12 rabi"]) &&
      hasAny(text, ["package", "umrah", "qeemat", "price", "detail", "kya hai", "maloomat", "includes"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "special20")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["📞 Contact Agent", "💬 WhatsApp", "Booking Process"],
      }
    },
  },
  {
    match: (text) =>
      hasAll(text, ["20", "package"]) || hasAll(text, ["rabi", "package"]) || text.includes("special package") || text.includes("20 din"),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "special20")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["📞 Contact Agent", "💬 WhatsApp", "Booking Process"],
      }
    },
  },
  // ---- All Packages ----
  {
    match: (text) =>
      hasAny(text, ["all packages", "all umrah", "show packages", "list packages", "what packages", "sab package", "tamam", "package list"]),
    handler: () => ({
      text: getAllPackagesSummary(),
      quickReplies: ["20 Days Special", "Economy Package", "Premium Package", "Family Package"],
    }),
  },
  // ---- Economy ----
  {
    match: (text) =>
      hasAny(text, ["economy", "basic", "standard", "cheapest", "low cost", "budget", "sasta"]) &&
      hasAny(text, ["package", "umrah", "price", "cost", "pricing", "rate", "qeemat"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "economy")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["20 Days Special", "Premium Package", "Family Package", "📞 Contact Agent"],
      }
    },
  },
  // ---- Premium ----
  {
    match: (text) =>
      hasAny(text, ["premium", "deluxe", "vip", "luxury", "best", "acha"]) &&
      hasAny(text, ["package", "umrah", "price", "cost", "pricing", "rate"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "premium")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["20 Days Special", "Economy Package", "Family Package", "📞 Contact Agent"],
      }
    },
  },
  // ---- Family ----
  {
    match: (text) =>
      hasAny(text, ["family", "group", "children", "kids", "family package", "khandaan"]) &&
      hasAny(text, ["package", "umrah", "price", "cost", "pricing", "rate"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "family")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["20 Days Special", "Economy Package", "Premium Package", "📞 Contact Agent"],
      }
    },
  },
  // ---- General Package Info ----
  {
    match: (text) =>
      hasAny(text, ["package", "umrah package", "pricing", "price", "cost", "how much", "qeemat", "kitna"]) &&
      !hasAny(text, ["visa", "hotel", "transport", "book"]),
    handler: () => ({
      text: getAllPackagesSummary(),
      quickReplies: ["20 Days Special", "Economy Package", "Premium Package", "Family Package"],
    }),
  },
  // ---- Visa ----
  {
    match: (text) => hasAny(text, ["visa", "document", "passport", "requirement", "needed for umrah", "dastavej"]),
    handler: () => ({
      text: `*Visa Information*
━━━━━━━━━━━━━━━━━━

*Required Documents:*
${businessData.visa.requirements.map((r) => `📄 ${r}`).join("\n")}

⏱ *Processing Time:* ${businessData.visa.processingTime}
💰 *Fee:* ${businessData.visa.fee}

We handle all visa paperwork for you!`,
      quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
    }),
  },
  // ---- Hotels ----
  {
    match: (text) =>
      hasAny(text, ["hotel", "accommodation", "stay", "room", "makkah", "madinah", "where to stay", "rahne"]),
    handler: () => {
      const hotelInfo = businessData.packages
        .map((pkg) => `🏨 *${pkg.name}:* ${pkg.hotel.split("(")[0].trim()}`)
        .join("\n")
      return {
        text: `*Hotel Options*
━━━━━━━━━━━━━━━━━━
Hum aap ko behtareen hotel options dete hain:

${hotelInfo}

Contact us for specific hotel names and room availability.`,
        quickReplies: ["20 Days Special", "Economy Package", "Premium Package"],
      }
    },
  },
  // ---- Transport ----
  {
    match: (text) =>
      hasAny(text, ["transport", "transfer", "airport", "bus", "car", "pickup", "drop", "ziyarat", "travel", "safar", "bus"]),
    handler: () => {
      const transportInfo = businessData.packages
        .map((pkg) => `🚌 *${pkg.name}:* ${pkg.transport}`)
        .join("\n")
      return {
        text: `*Transport Services*
━━━━━━━━━━━━━━━━━━
Hum safar ki tamam sahulat faraham karte hain:

${transportInfo}

All our vehicles are air-conditioned, comfortable, and driven by experienced professionals.`,
        quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
      }
    },
  },
  // ---- Booking ----
  {
    match: (text) =>
      hasAny(text, ["book", "booking", "reserve", "reservation", "how to", "process", "register", "sign up", "tareeqa", "booking kaise"]),
    handler: () => ({
      text: `*Booking Procedure*
━━━━━━━━━━━━━━━━━━
Booking ka amal bohat asan hai:

${businessData.bookingProcedure.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Ready to start? Contact us now!`,
      quickReplies: ["💬 WhatsApp", "📞 Call Now", "20 Days Special"],
    }),
  },
  // ---- Gifts / Hadaya ----
  {
    match: (text) => hasAny(text, ["gift", "hadaya", "free", "ihram", "scarf", "bag", "shoe"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "special20")
      if (pkg?.gifts) {
        return {
          text: `*🎁 Free Gifts — Special 20 Days Package*
━━━━━━━━━━━━━━━━━━
Jab aap Special 20 Days Umrah Package book karein to ye gifts free payein:

${pkg.gifts.map((g) => g).join("\n")}

Yeh gifts sirf hmare Special 20 Days Package ke sath hain!`,
          quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
        }
      }
      return {
        text: "Gifts hmare Special 20 Days Umrah Package ke sath shamil hain. Mazeed maloomat ke liye contact karein.",
        quickReplies: ["20 Days Special", "Contact Agent"],
      }
    },
  },
  // ---- Pricing ----
  {
    match: (text) =>
      hasAny(text, ["270", "280", "300", "320", "270000", "280000", "300000", "320000", "sharing", "quad", "triple", "double"]) &&
      hasAny(text, ["price", "qeemat", "kitna", "rupay", "pkr"]),
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "special20")
      if (pkg?.pricing) {
        const pricingText = pkg.pricing.map((p) => `• ${p.label}: ${p.price}`).join("\n")
        return {
          text: `*💰 Special 20 Days Package — Pricing*
━━━━━━━━━━━━━━━━━━
${pricingText}

Sabhi rates per person hain. Family ya group discounts ke liye contact karein.`,
          quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
        }
      }
      return { text: businessData.fallbackMessage }
    },
  },
  // ---- Payment ----
  {
    match: (text) => hasAny(text, ["payment", "pay", "deposit", "installment", "card", "bank", "jazzcash", "easypaisa", "adaiagi"]),
    handler: () => ({
      text: `*Payment Policy*
━━━━━━━━━━━━━━━━━━
${businessData.paymentPolicy.map((s) => `• ${s}`).join("\n")}

Kisi bhi qisam ki payment ke liye rabta karein.`,
      quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
    }),
  },
  // ---- Refund / Cancellation ----
  {
    match: (text) =>
      hasAny(text, ["refund", "cancel", "cancellation", "money back", "return", "wapsi", "mansookh"]),
    handler: () => ({
      text: `*Refund & Cancellation Policy*
━━━━━━━━━━━━━━━━━━
${businessData.refundPolicy.map((s) => `• ${s}`).join("\n")}

For any questions, please contact us directly.`,
      quickReplies: ["20 Days Special", "Payment Policy", "Contact Agent"],
    }),
  },
  // ---- Contact ----
  {
    match: (text) =>
      hasAny(text, ["contact", "phone", "number", "call", "email", "address", "office", "reach", "talk", "agent", "consultant", "support", "help", "raabta", "madad"]),
    handler: () => ({
      text: `*Contact Information*
━━━━━━━━━━━━━━━━━━
🏢 ${businessData.business.companyName}
📍 ${businessData.business.address}
📞 ${businessData.business.phone}
💬 WhatsApp: ${businessData.business.whatsapp}
📧 ${businessData.business.email}
🌐 ${businessData.business.website}
🕐 ${businessData.business.businessHours}

Hum aap ki madad ke liye 24/7 maujood hain!`,
      quickReplies: ["💬 WhatsApp", "📞 Call Now"],
      action: "none",
    }),
  },
  // ---- Greetings ----
  {
    match: (text) =>
      hasAny(text, ["assalamu", "salam", "hello", "hi", "hey", "good morning", "good evening", "peace", "adaab", "khush amdeed"]),
    handler: () => ({
      text: `Wa Alaikum Assalam! ${businessData.business.companyName} mein aapka khush amdeed! 🕋

Kya aap hmare Special 20 Days Umrah Package ke baare mein jaanna chahte hain?`,
      quickReplies: [
        "20 Days Special",
        "Umrah Packages",
        "Visa Information",
        "Booking Process",
      ],
    }),
  },
  // ---- Thanks ----
  {
    match: (text) => hasAny(text, ["thank", "thanks", "jazzak", "barak", "shukran", "shukriya", "meherbani"]),
    handler: () => ({
      text: `Aap ka bohat bohat shukriya! 🤲

Allah aap ke Umrah ko qubool farmaye aur aap ko mazeed barkatein ata kare. Agar kisi aur madad ki zaroorat ho to hum yahan hain!`,
      quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
    }),
  },
  // ---- Specific Quick Questions (for exact match) ----
  {
    match: (text) => text.includes("20 days special") || text.includes("20 din special") || text === "special20",
    handler: () => {
      const pkg = businessData.packages.find((p) => p.id === "special20")
      return {
        text: pkg ? formatPackage(pkg) : businessData.fallbackMessage,
        quickReplies: ["📞 Contact Agent", "💬 WhatsApp", "Booking Process"],
      }
    },
  },
  {
    match: (text) => text === "umrah packages",
    handler: () => ({
      text: getAllPackagesSummary(),
      quickReplies: ["20 Days Special", "Economy Package", "Premium Package", "Family Package"],
    }),
  },
  {
    match: (text) => text === "visa information",
    handler: () => ({
      text: `*Visa Information*
━━━━━━━━━━━━━━━━━━

*Required Documents:*
${businessData.visa.requirements.map((r) => `📄 ${r}`).join("\n")}

⏱ *Processing Time:* ${businessData.visa.processingTime}
💰 *Fee:* ${businessData.visa.fee}`,
      quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
    }),
  },
  {
    match: (text) => text === "hotel details",
    handler: () => ({
      text: `*Our Hotel Partners*
━━━━━━━━━━━━━━━━━━

${businessData.packages
  .map((pkg) => `🏨 *${pkg.name}:* ${pkg.hotel}`)
  .join("\n\n")}

All hotels are within walking distance to the Haram.`,
      quickReplies: ["20 Days Special", "Economy Package", "Premium Package"],
    }),
  },
  {
    match: (text) => text === "transport services",
    handler: () => ({
      text: `*Transport Services*
━━━━━━━━━━━━━━━━━━

${businessData.packages
  .map((pkg) => `🚌 *${pkg.name}:* ${pkg.transport}`)
  .join("\n\n")}

Comfortable, AC vehicles with professional drivers.`,
      quickReplies: ["20 Days Special", "Booking Process", "Contact Agent"],
    }),
  },
  {
    match: (text) => text === "booking process",
    handler: () => ({
      text: `*Booking Procedure*
━━━━━━━━━━━━━━━━━━

${businessData.bookingProcedure.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
      quickReplies: ["💬 WhatsApp", "📞 Call Now", "20 Days Special"],
    }),
  },
  {
    match: (text) => text === "contact agent",
    handler: () => ({
      text: `*Contact Information*
━━━━━━━━━━━━━━━━━━
🏢 ${businessData.business.companyName}
📍 ${businessData.business.address}
📞 ${businessData.business.phone}
💬 WhatsApp: ${businessData.business.whatsapp}
📧 ${businessData.business.email}
🕐 ${businessData.business.businessHours}`,
      quickReplies: ["💬 WhatsApp", "📞 Call Now"],
      action: "none",
    }),
  },
  // ---- Fallback (must be last) ----
]

// ---- Main Engine ----

export function getChatResponse(message: string): ChatResponse {
  const text = normalize(message)

  // Edge case: FAQ matching
  const matchedFaq = businessData.faqs.find((faq) => {
    const q = normalize(faq.question)
    const keywords = q.split(" ").filter((w) => w.length > 3)
    return keywords.length > 0 && keywords.some((kw) => text.includes(kw))
  })

  if (matchedFaq) {
    return {
      text: matchedFaq.answer,
      quickReplies: ["20 Days Special", "Umrah Packages", "Booking Process", "Contact Agent"],
    }
  }

  // Check registered intents
  for (const intent of intents) {
    if (intent.match(text)) {
      return intent.handler()
    }
  }

  // No match found
  return {
    text: businessData.fallbackMessage,
    quickReplies: ["20 Days Special", "Umrah Packages", "Contact Agent", "💬 WhatsApp"],
    action: "none",
  }
}

// ---- Quick Reply helpers for the UI ----

export const QUICK_QUESTIONS = [
  { label: "🌙 20 Days Special", value: "20 Days Special" },
  { label: "🕋 Umrah Packages", value: "Umrah Packages" },
  { label: "💰 Economy Package", value: "Economy Package" },
  { label: "⭐ Premium Package", value: "Premium Package" },
  { label: "👨‍👩‍👧‍👦 Family Package", value: "Family Package" },
  { label: "📄 Visa Information", value: "Visa Information" },
  { label: "🏨 Hotel Details", value: "Hotel Details" },
  { label: "🚌 Transport Services", value: "Transport Services" },
  { label: "📋 Booking Process", value: "Booking Process" },
  { label: "📞 Contact Agent", value: "Contact Agent" },
]
