"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ChatMessage, { type Message } from "./ChatMessage"
import TypingIndicator from "./TypingIndicator"
import VoiceButton from "./VoiceButton"
import { getChatResponse } from "@/lib/chatbot-engine"
import businessData from "@/data/business-info"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: businessData.welcomeMessage,
      quickReplies: [
        "20 Days Special",
        "Umrah Packages",
        "Visa Information",
        "Booking Process",
      ],
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const genId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMsg: Message = {
        id: genId(),
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      setTimeout(() => {
        const response = getChatResponse(trimmed)
        const botMsg: Message = {
          id: genId(),
          role: "bot",
          text: response.text,
          quickReplies: response.quickReplies,
          action: response.action,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setIsTyping(false)
      }, 600 + Math.random() * 600)
    },
    []
  )

  const handleQuickReply = useCallback(
    (value: string) => {
      handleSend(value)
    },
    [handleSend]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "bot",
        text: businessData.welcomeMessage,
        quickReplies: [
          "20 Days Special",
          "Umrah Packages",
          "Visa Information",
          "Booking Process",
        ],
        timestamp: new Date(),
      },
    ])
    inputRef.current?.focus()
  }

  const handleVoiceTranscript = useCallback(
    (text: string) => {
      setInput(text)
      // Auto-send after a short delay
      setTimeout(() => handleSend(text), 300)
    },
    [handleSend]
  )

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onQuickReply={handleQuickReply}
      />

      {/* Main chat area */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-emerald-50/50 to-white dark:from-gray-900 dark:to-gray-950">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Welcome screen with promotional images */}
            {messages.length === 1 && (
              <div className="mb-6 animate-fadeIn">
                {/* Promo images */}
                <div className="mb-5 grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-900/50">
                    <Image
                      src="/pic.jpeg"
                      alt="Promotion 1"
                      width={400}
                      height={250}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-900/50">
                    <Image
                      src="/honor-pic.jpeg"
                      alt="Promotion 2"
                      width={400}
                      height={250}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>

                {/* Suggested questions cards */}
                <div className="mb-5">
                  <h3 className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Suggested Questions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { icon: "🌙", text: "20 Days Special", desc: "Rabi-ul-Awwal package" },
                      { icon: "🕋", text: "Umrah Packages", desc: "All packages" },
                      { icon: "📄", text: "Visa Info", desc: "Documents & fees" },
                      { icon: "📞", text: "Contact Agent", desc: "Get in touch" },
                    ].map((card) => (
                      <button
                        key={card.text}
                        onClick={() => handleQuickReply(card.text)}
                        className="group rounded-xl border border-emerald-100 bg-white p-3 text-left shadow-sm transition-all hover:border-emerald-300 hover:shadow-md active:scale-[0.98] dark:border-emerald-900/40 dark:bg-gray-800 dark:hover:border-emerald-700"
                      >
                        <span className="block text-xl">{card.icon}</span>
                        <span className="mt-1 block text-xs font-semibold text-gray-800 dark:text-gray-200">
                          {card.text}
                        </span>
                        <span className="block text-[10px] text-gray-400 dark:text-gray-500">
                          {card.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onQuickReply={handleQuickReply}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-emerald-100 bg-white px-4 py-3 dark:border-emerald-900/50 dark:bg-gray-900">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-3xl items-end gap-2"
          >
            {/* Voice button */}
            <VoiceButton onTranscript={handleVoiceTranscript} />

            {/* Input */}
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Apna sawaal type karein..."
                rows={1}
                className="w-full resize-none rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-2.5 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-emerald-600 dark:focus:bg-gray-800"
                style={{ maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.currentTarget
                  target.style.height = "auto"
                  target.style.height = Math.min(target.scrollHeight, 120) + "px"
                }}
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-all hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>

            {/* Clear chat */}
            <button
              type="button"
              onClick={handleClearChat}
              title="Clear conversation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
