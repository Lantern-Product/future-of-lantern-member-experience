"use client";

import { ChatScreen, WireBox } from "@/components/ScreenShell";
import MessageBubble from "@/components/MessageBubble";
import { useFlowState, SURGEON_NAMES } from "@/components/FlowContext";

export default function CareScheduling() {
  const { selectedSurgeonId, chosenSlot } = useFlowState();
  const surgeonName = selectedSurgeonId
    ? SURGEON_NAMES[selectedSurgeonId]
    : "Dr. Reyes";
  const slot = chosenSlot ?? "Tue, Oct 14 at 7:00am";

  return (
    <ChatScreen title="Lantern">
      <MessageBubble sender="ai">
        You're set with {surgeonName} — {slot}. I've already held the slot
        and started your paperwork. All you need to do is show up.
      </MessageBubble>
      <WireBox className="flex items-center justify-between">
        <span className="text-sm">Undo this booking</span>
        <span className="text-xs border border-neutral-900 rounded-full px-3 py-1">
          Tap to reverse
        </span>
      </WireBox>
    </ChatScreen>
  );
}
