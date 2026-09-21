"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ChipRow, MessageInput } from "@/components/ScreenShell";

const RESCHEDULE_SLOTS = [
  "Fri, Oct 18 · 7:00am",
  "Mon, Oct 21 · 9:00am",
  "Tue, Oct 22 · 7:30am",
];

function Bubble({
  from,
  children,
}: {
  from: "them" | "me";
  children: ReactNode;
}) {
  const isMe = from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
          isMe
            ? "bg-neutral-900 text-white rounded-br-sm"
            : "bg-neutral-200 text-neutral-900 rounded-bl-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function CareTextMessage() {
  const [confirmedSlot, setConfirmedSlot] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<{ id: number; node: ReactNode }[]>(
    []
  );
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [timeline]);

  function push(node: ReactNode) {
    const id = nextId.current++;
    setTimeline((t) => [...t, { id, node }]);
  }

  function pickSlot(slot: string) {
    setConfirmedSlot(slot);
    push(<Bubble from="me">{slot}</Bubble>);
    push(
      <Bubble from="them">
        Got it — moved to {slot}. You&apos;re all set, nothing else to do.
      </Bubble>
    );
  }

  function handleSend(text: string) {
    push(<Bubble from="me">{text}</Bubble>);
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      {/* Messages app chrome — decorative, not wired to app navigation */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-neutral-200">
        <span className="text-2xl text-neutral-400 leading-none px-1">
          ‹
        </span>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-xs font-heading font-semibold text-neutral-700">
            L
          </div>
          <span className="text-xs font-heading font-semibold text-neutral-900 mt-0.5">
            Lantern
          </span>
        </div>
        <span className="w-7" />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-2 bg-white"
      >
        <div className="text-center text-[11px] text-neutral-400 mb-1">
          Text Message · Today 9:41 AM
        </div>
        <Bubble from="them">
          Your appointment with Dr. Reyes is in 2 days — Thu, Oct 17 at
          9:00am. Everything&apos;s set on our end.
        </Bubble>
        <Bubble from="them">
          Reply if anything&apos;s changed, or tap a time below to move it.
        </Bubble>

        {timeline.map((t) => (
          <div key={t.id} className="contents">
            {t.node}
          </div>
        ))}
      </div>

      {!confirmedSlot && (
        <ChipRow chips={RESCHEDULE_SLOTS} onPick={pickSlot} />
      )}

      <MessageInput onSend={handleSend} />
    </div>
  );
}
