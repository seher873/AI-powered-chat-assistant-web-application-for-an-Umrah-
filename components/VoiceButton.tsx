"use client"

import { useSpeech } from "@/hooks/useSpeech"

interface VoiceButtonProps {
  onTranscript: (text: string) => void
}

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const { isListening, startListening, stopListening } = useSpeech()

  const handleClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening(onTranscript)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isListening ? "Stop listening" : "Start voice input"}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
        isListening
          ? "bg-red-500 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-300"
          : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
      }`}
    >
      {/* Microphone icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
      </svg>

      {/* Listening animation rings */}
      {isListening && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-red-400/40" />
          <span className="absolute inset-0 animate-pulse rounded-full bg-red-400/20" />
        </>
      )}
    </button>
  )
}
