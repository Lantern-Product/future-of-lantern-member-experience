"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ScreenHeader,
  WireBox,
  ChipRow,
  MessageInput,
} from "@/components/ScreenShell";
import MessageBubble from "@/components/MessageBubble";
import { useFlowState } from "@/components/FlowContext";

const RESCHEDULE_SLOTS = [
  "Mon, Oct 21 · 7:00am",
  "Wed, Oct 23 · 9:00am",
  "Fri, Oct 25 · 7:30am",
];

export default function CareReschedule() {
  const { setChosenSlot } = useFlowState();
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
    setChosenSlot(slot);
    setConfirmedSlot(slot);
    push(<MessageBubble sender="member">{slot}</MessageBubble>);
    push(
      <MessageBubble sender="ai">
        You're all set — moved to {slot}. Nothing else needed from you.
      </MessageBubble>
    );
  }

  function handleGenericSend(text: string) {
    push(<MessageBubble sender="member">{text}</MessageBubble>);
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 min-h-0">
      <ScreenHeader title="Lantern" />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
      >
        <MessageBubble sender="member">
          my daughter is sick, i need to push this back
        </MessageBubble>
        <MessageBubble sender="ai">
          Got it — nothing is lost and nothing has closed. Whenever
          you&apos;re ready, here are a few times that could work:
        </MessageBubble>
        <WireBox className="flex items-center justify-between">
          <span className="text-sm">Status</span>
          <span className="text-xs text-neutral-500">
            {confirmedSlot
              ? `Confirmed — ${confirmedSlot}`
              : "Paused — waiting on you"}
          </span>
        </WireBox>

        {timeline.map((t) => (
          <div key={t.id} className="contents">
            {t.node}
          </div>
        ))}
      </div>

      {!confirmedSlot && (
        <ChipRow chips={RESCHEDULE_SLOTS} onPick={pickSlot} />
      )}

      <MessageInput onSend={handleGenericSend} />
    </div>
  );
}
