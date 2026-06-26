"use client"

import { QUICK_QUESTIONS } from "@/lib/chatbot-engine"

interface QuickActionsProps {
  onSelect: (value: string) => void
}

export default function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="border-t border-emerald-100 bg-white p-3">
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-emerald-500">
        Quick Questions
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q.value}
            onClick={() => onSelect(q.value)}
            className="rounded-full border border-emerald-200 bg-emerald-50/50 px-2.5 py-1 text-xs text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-sm active:scale-95"
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  )
}
