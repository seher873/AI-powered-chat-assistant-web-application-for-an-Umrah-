"use client"

import { useState } from "react"
import Image from "next/image"

export interface Message {
  id: string
  role: "user" | "bot"
  text: string
  quickReplies?: string[]
  action?: "none" | "whatsapp" | "call"
  timestamp?: Date
}

interface ChatMessageProps {
  message: Message
  onQuickReply: (value: string) => void
  onSpeak?: (text: string) => void
}

export default function ChatMessage({ message, onQuickReply, onSpeak }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"
  const time = message.timestamp || new Date()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement("textarea")
      ta.value = message.text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`group flex gap-3 ${isUser ? "flex-row-reverse" : ""} mb-5`}>
      {/* Avatar */}
      <div className="flex shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
            U
          </div>
        ) : (
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-emerald-500/20">
            <Image
              src="/logo.jpeg"
              alt="Bot"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] sm:max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-br-sm bg-emerald-600 text-white"
              : "rounded-bl-sm border border-emerald-100 bg-white text-gray-800 dark:border-emerald-900/40 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          <div className="whitespace-pre-wrap">
            {message.text.split(/(\*[^*]+\*)/g).map((part, i) => {
              if (part.startsWith("*") && part.endsWith("*")) {
                return (
                  <strong
                    key={i}
                    className={isUser ? "text-amber-200" : "text-emerald-700 dark:text-emerald-400"}
                  >
                    {part.slice(1, -1)}
                  </strong>
                )
              }
              return <span key={i}>{part}</span>
            })}
          </div>
        </div>

        {/* Timestamp + actions row */}
        <div
          className={`mt-1 flex items-center gap-2 px-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            title={copied ? "Copied!" : "Copy message"}
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-emerald-500">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3 w-3 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            )}
          </button>

          {/* Speak button (for bot messages) */}
          {!isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.text)}
              className="opacity-0 transition-opacity hover:text-emerald-600 group-hover:opacity-100"
              title="Read aloud"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-gray-400">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Buttons (WhatsApp / Call) */}
        {!isUser && (
          <div className="mt-2 flex gap-2">
            {(message.action === "whatsapp" ||
              (!message.action && message.quickReplies?.some((q) => q.includes("WhatsApp")))) && (
              <a
                href={`https://wa.me/923122020800`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
              >
                💬 WhatsApp
              </a>
            )}
            {(message.action === "call" ||
              (!message.action && message.quickReplies?.some((q) => q.includes("Call")))) && (
              <a
                href="tel:+923122020800"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700"
              >
                📞 Call Now
              </a>
            )}
          </div>
        )}

        {/* Quick Replies */}
        {!isUser && message.quickReplies && message.quickReplies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.quickReplies.map((reply) => {
              if (reply.includes("WhatsApp") || reply.includes("Call Now")) return null
              return (
                <button
                  key={reply}
                  onClick={() => onQuickReply(reply)}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-sm active:scale-95 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
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
