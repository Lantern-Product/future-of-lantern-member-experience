"use client";

import { ReactNode, forwardRef, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useAsideNav } from "./AsideNavContext";

export function ScreenHeader({
  title,
  subtitle,
  onProfileClick,
}: {
  title: string;
  subtitle?: string;
  /** Shows a small profile icon top-right, e.g. on chat screens where Maria has an ongoing identity Lantern remembers. */
  onProfileClick?: () => void;
}) {
  return (
    <div className="px-5 pt-2 pb-3 border-b border-neutral-200 bg-white flex items-start justify-between gap-3">
      <div>
        <h1 className="font-heading font-semibold text-lg text-neutral-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {onProfileClick && (
        <button
          onClick={onProfileClick}
          aria-label="Your profile"
          className="shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-heading font-semibold mt-0.5"
        >
          M
        </button>
      )}
    </div>
  );
}

export function ChatScreen({
  title,
  subtitle,
  chips,
  children,
}: {
  title: string;
  subtitle?: string;
  /** Quick-reply options shown above the input, for screens where Lantern's last message is a question awaiting Maria's answer. Disappear once she replies. */
  chips?: string[];
  children: ReactNode;
}) {
  const [sent, setSent] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { open } = useAsideNav();

  function handleSend(text: string) {
    setSent((s) => [...s, text]);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [sent]);

  const showChips = !!chips?.length && sent.length === 0;

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 min-h-0">
      <ScreenHeader
        title={title}
        subtitle={subtitle}
        onProfileClick={() => open("profile")}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
      >
        {children}
        {sent.map((text, i) => (
          <MessageBubble key={i} sender="member">
            {text}
          </MessageBubble>
        ))}
      </div>
      {showChips && <ChipRow chips={chips!} onPick={handleSend} />}
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export function ChipRow({
  chips,
  onPick,
}: {
  chips: string[];
  onPick: (text: string) => void;
}) {
  return (
    <div className="shrink-0 flex flex-wrap gap-2 px-3 pt-2 pb-1 bg-neutral-50">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onPick(chip)}
          className="text-sm text-neutral-800 border border-neutral-400 rounded-full px-3 py-1.5 bg-white active:bg-neutral-100"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

export function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  function handleMicTap() {
    if (recording) {
      setRecording(false);
      setText("Sounds good, thank you.");
    } else {
      setRecording(true);
    }
  }

  return (
    <div className="shrink-0 border-t border-neutral-200 bg-white px-3 py-1.5 flex items-center gap-2">
      {recording ? (
        <div className="flex-1 flex items-center gap-2 bg-neutral-100 border border-neutral-300 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
          <span className="text-sm text-neutral-500 flex-1">
            Recording… tap to stop
          </span>
        </div>
      ) : (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type a message"
          className="flex-1 min-w-0 bg-neutral-100 border border-neutral-300 rounded-full px-4 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
      )}
      <button
        onClick={handleMicTap}
        aria-label={recording ? "Stop recording" : "Use voice"}
        className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${
          recording
            ? "bg-neutral-900 border-neutral-900"
            : "border-neutral-300"
        }`}
      >
        {recording ? (
          <span className="w-2.5 h-2.5 bg-white rounded-sm" />
        ) : (
          <MicIcon className="w-4 h-4 text-neutral-600" />
        )}
      </button>
      <button
        onClick={handleSend}
        disabled={recording || !text.trim()}
        className="shrink-0 bg-neutral-900 text-white text-sm font-heading font-medium rounded-full px-4 py-1.5 disabled:opacity-30"
      >
        Send
      </button>
    </div>
  );
}

function MicIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 15.75a3 3 0 003-3V4.5a3 3 0 10-6 0v8.25a3 3 0 003 3z" />
      <path d="M18.75 11.25v1.5a6.75 6.75 0 01-13.5 0v-1.5M12 19.5v3M8.25 22.5h7.5" />
    </svg>
  );
}

export function CardScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <ScreenHeader title={title} subtitle={subtitle} />
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`w-9 h-5 rounded-full shrink-0 relative transition-colors ${
        on ? "bg-neutral-900" : "bg-neutral-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
          on ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export const WireBox = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; className?: string }
>(function WireBox({ children, className = "" }, ref) {
  return (
    <div
      ref={ref}
      className={`border border-neutral-300 rounded-xl bg-neutral-50 p-4 ${className}`}
    >
      {children}
    </div>
  );
});

export function Placeholder({ lines = 2 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded bg-neutral-200"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}
