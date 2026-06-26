"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Header from "./Header"
import ChatMessage, { type Message } from "./ChatMessage"
import TypingIndicator from "./TypingIndicator"
import QuickActions from "./QuickActions"
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
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Generate unique IDs
  const genId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  // Handle sending a message
  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      // Hide quick actions once user engages
      setShowQuickActions(false)

      // Add user message
      const userMsg: Message = {
        id: genId(),
        role: "user",
        text: trimmed,
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      // Simulate bot thinking delay
      setTimeout(() => {
        const response = getChatResponse(trimmed)
        const botMsg: Message = {
          id: genId(),
          role: "bot",
          text: response.text,
          quickReplies: response.quickReplies,
          action: response.action,
        }
        setMessages((prev) => [...prev, botMsg])
        setIsTyping(false)
      }, 600 + Math.random() * 600)
    },
    []
  )

  // Handle quick reply clicks
  const handleQuickReply = useCallback(
    (value: string) => {
      handleSend(value)
    },
    [handleSend]
  )

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  // Handle Enter key (Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  // Clear chat
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
      },
    ])
    setShowQuickActions(true)
    inputRef.current?.focus()
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <Header />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-3xl">
          {/* Promotional Banner - shown at top when no messages except welcome */}
          {messages.length <= 1 && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src="/pic.jpeg"
                  alt="Umrah Package Promotion 1"
                  width={300}
                  height={200}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-sm">
                <Image
                  src="/img.jpeg"
                  alt="Umrah Package Promotion 2"
                  width={300}
                  height={200}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onQuickReply={handleQuickReply} />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Invisible anchor for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions (shown initially) */}
      {showQuickActions && messages.length <= 1 && (
        <QuickActions onSelect={handleQuickReply} />
      )}

      {/* Input Area */}
      <div className="border-t border-emerald-100 bg-white px-4 py-3">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-2">
          {/* Clear button */}
          <button
            type="button"
            onClick={handleClearChat}
            title="Clear chat"
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Input */}
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Apna sawaal type karein..."
              rows={1}
              className="w-full resize-none rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-2.5 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
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
        </form>

        {/* Hint text */}
        <p className="mt-1.5 text-center text-[10px] text-gray-400">
          Enter dabayein bhejne ke liye · Shift+Enter nayi line ke liye · {businessData.business.companyName}
        </p>
      </div>
    </div>
  )
}
