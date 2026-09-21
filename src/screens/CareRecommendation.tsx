"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ScreenHeader,
  WireBox,
  Placeholder,
  ChipRow,
  MessageInput,
} from "@/components/ScreenShell";
import MessageBubble from "@/components/MessageBubble";
import {
  useFlowState,
  SurgeonId,
  SURGEON_NAMES,
} from "@/components/FlowContext";
import { introFor, chipsFor, SLOT_OPTIONS } from "@/lib/recommendationCopy";

type Stage = "choosing" | "pickingSlot" | "booked";

export default function CareRecommendation() {
  const { selectedSurgeonId, setSelectedSurgeonId, setChosenSlot } =
    useFlowState();
  const [currentDoctor, setCurrentDoctor] = useState<SurgeonId>(
    selectedSurgeonId ?? "reyes"
  );
  const [stage, setStage] = useState<Stage>("choosing");
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

  function handleChipPick(chip: string) {
    if (chip.startsWith("Go with")) {
      setSelectedSurgeonId(currentDoctor);
      push(<MessageBubble sender="member">{chip}</MessageBubble>);
      push(
        <MessageBubble sender="ai">
          Great — here's what {SURGEON_NAMES[currentDoctor]} has open:
        </MessageBubble>
      );
      setStage("pickingSlot");
      return;
    }

    // "See Dr. X instead" — switch who we're looking at, keep exploring.
    const newDoctor = (Object.keys(SURGEON_NAMES) as SurgeonId[]).find(
      (id) => chip.includes(SURGEON_NAMES[id])
    )!;
    setCurrentDoctor(newDoctor);
    push(<MessageBubble sender="member">{chip}</MessageBubble>);
    push(introFor(newDoctor));
  }

  function handleSlotPick(slot: string) {
    setChosenSlot(slot);
    push(<MessageBubble sender="member">{slot}</MessageBubble>);
    push(
      <MessageBubble sender="ai">
        You're set with {SURGEON_NAMES[currentDoctor]} — {slot}. I've already
        held the slot and started your paperwork. All you need to do is show
        up.
      </MessageBubble>
    );
    push(
      <WireBox className="flex items-center justify-between">
        <span className="text-sm">Undo this booking</span>
        <span className="text-xs border border-neutral-900 rounded-full px-3 py-1">
          Tap to reverse
        </span>
      </WireBox>
    );
    setStage("booked");
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
        {introFor(currentDoctor)}
        <WireBox>
          <Placeholder lines={3} />
        </WireBox>
        <MessageBubble sender="ai">
          It's still your call either way — happy to set you up with
          whichever of the three feels right for you.
        </MessageBubble>

        {timeline.map((t) => (
          <div key={t.id} className="contents">
            {t.node}
          </div>
        ))}
      </div>

      {stage === "choosing" && (
        <ChipRow chips={chipsFor(currentDoctor)} onPick={handleChipPick} />
      )}
      {stage === "pickingSlot" && (
        <ChipRow chips={SLOT_OPTIONS} onPick={handleSlotPick} />
      )}

      <MessageInput onSend={handleGenericSend} />
    </div>
  );
}
