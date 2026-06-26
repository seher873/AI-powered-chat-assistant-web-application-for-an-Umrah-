"use client"

import { type ReactNode } from "react"

export interface Message {
  id: string
  role: "user" | "bot"
  text: string
  quickReplies?: string[]
  action?: "none" | "whatsapp" | "call"
}

interface ChatMessageProps {
  message: Message
  onQuickReply: (value: string) => void
}

export default function ChatMessage({ message, onQuickReply }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "order-1" : "order-1"}`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-br-md bg-emerald-600 text-white"
              : "rounded-bl-md border border-emerald-100 bg-white text-gray-800"
          }`}
        >
          {/* Render text with line breaks and bold markers */}
          <div className="whitespace-pre-wrap">
            {message.text.split(/(\*[^*]+\*)/g).map((part, i) => {
              if (part.startsWith("*") && part.endsWith("*")) {
                return (
                  <strong key={i} className={isUser ? "text-amber-200" : "text-emerald-700"}>
                    {part.slice(1, -1)}
                  </strong>
                )
              }
              // Check for emoji bullets at start of lines
              const lines = part.split("\n")
              return lines.map((line, j) => {
                const trimmed = line.trim()
                if (trimmed.startsWith("✅") || trimmed.startsWith("📄") || trimmed.startsWith("•")) {
                  return (
                    <span key={`${i}-${j}`}>
                      {line}
                      {"\n"}
                    </span>
                  )
                }
                return j < lines.length - 1 ? (
                  <span key={`${i}-${j}`}>
                    {line}
                    {"\n"}
                  </span>
                ) : (
                  <span key={`${i}-${j}`}>{line}</span>
                )
              })
            })}
          </div>
        </div>

        {/* Action Buttons (WhatsApp / Call) - only for bot messages */}
        {!isUser && message.action !== "none" && (
          <div className="mt-2 flex gap-2">
            {message.action === "whatsapp" || (!message.action && message.quickReplies?.some((q) => q.includes("WhatsApp"))) ? (
              <a
                href={`https://wa.me/15551234567`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-600"
              >
                💬 WhatsApp
              </a>
            ) : null}
            {message.action === "call" || (!message.action && message.quickReplies?.some((q) => q.includes("Call"))) ? (
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-600"
              >
                📞 Call Now
              </a>
            ) : null}
          </div>
        )}

        {/* Quick Replies */}
        {!isUser && message.quickReplies && message.quickReplies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.quickReplies.map((reply) => {
              // Skip action buttons that are rendered above
              if (reply.includes("WhatsApp") || reply.includes("Call Now")) return null
              return (
                <button
                  key={reply}
                  onClick={() => onQuickReply(reply)}
                  className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-sm active:scale-95"
                >
                  {reply}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
