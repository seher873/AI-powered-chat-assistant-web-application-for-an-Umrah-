"use client"

import Image from "next/image"
import businessData from "@/data/business-info"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onQuickReply: (value: string) => void
}

export default function Sidebar({ isOpen, onClose, onQuickReply }: SidebarProps) {
  const { business, packages, faqs } = businessData

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300 dark:bg-gray-900 dark:shadow-gray-950/50 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Company Info */}
        <div className="flex flex-col items-center gap-2 border-b border-emerald-100 p-5 dark:border-emerald-900/50">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-emerald-500/20">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-center text-sm font-bold text-gray-800 dark:text-gray-100">
            {business.companyName}
          </h2>
          <p className="text-center text-[10px] leading-tight text-gray-500 dark:text-gray-400">
            {business.tagline}
          </p>
          <div className="mt-1 flex gap-2">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
            >
              💬 WhatsApp
            </a>
            <a
              href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}
              className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-700"
            >
              📞 Call
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {/* Packages */}
          <div className="mb-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <span>🕋</span> Packages
            </h3>
            <div className="space-y-1">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    onQuickReply(pkg.name)
                    onClose()
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-gray-700 transition-colors hover:bg-emerald-50 dark:text-gray-300 dark:hover:bg-emerald-900/30"
                >
                  <span className="font-medium">{pkg.name}</span>
                  <span className="ml-2 text-[10px] text-gray-400">{pkg.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <span>❓</span> FAQ
            </h3>
            <div className="space-y-1">
              {faqs.slice(0, 5).map((faq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onQuickReply(faq.question)
                    onClose()
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs text-gray-600 transition-colors hover:bg-emerald-50 dark:text-gray-400 dark:hover:bg-emerald-900/30"
                >
                  {faq.question.length > 40
                    ? faq.question.slice(0, 40) + "..."
                    : faq.question}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <span>📞</span> Contact
            </h3>
            <div className="space-y-1.5 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📞 {business.phone}
              </p>
              {business.phone2 && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  📞 {business.phone2}
                </p>
              )}
              {business.phone3 && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  📞 {business.phone3}
                </p>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-400">
                💬 {business.whatsapp}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📧 {business.email}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                🕐 {business.businessHours}
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
