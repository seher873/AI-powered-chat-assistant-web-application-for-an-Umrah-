"use client"

export default function TypingIndicator() {
  return (
    <div className="mb-3 flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-emerald-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
