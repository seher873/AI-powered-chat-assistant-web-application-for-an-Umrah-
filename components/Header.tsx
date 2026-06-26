"use client"

import Image from "next/image"
import businessData from "@/data/business-info"

export default function Header() {
  const { companyName, tagline, phone, whatsapp } = businessData.business

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-l from-emerald-700 via-emerald-800 to-emerald-900 text-white shadow-lg">
      {/* Top bar with contact info - hidden on mobile */}
      <div className="hidden sm:flex items-center justify-end gap-4 bg-emerald-900/60 px-4 py-1 text-xs">
        <span>📞 {phone}</span>
        <span>💬 {whatsapp}</span>
      </div>

      {/* Main header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Logo */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-emerald-400/20">
          <Image
            src="/logo.jpeg"
            alt="Company Logo"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold leading-tight">{companyName}</h1>
          <p className="truncate text-[11px] text-emerald-200/80">{tagline}</p>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 gap-1.5">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-emerald-500/30 px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-emerald-500/50"
          >
            💬
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1 rounded-lg bg-amber-500/30 px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-amber-500/50"
          >
            📞
            <span className="hidden sm:inline">Call</span>
          </a>
        </div>
      </div>
    </header>
  )
}
