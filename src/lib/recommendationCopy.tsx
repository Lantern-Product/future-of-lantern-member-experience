import { ReactNode } from "react";
import MessageBubble from "@/components/MessageBubble";
import { SurgeonId, SURGEON_NAMES } from "@/components/FlowContext";

export const SLOT_OPTIONS = [
  "Tue, Oct 14 · 7:00am",
  "Wed, Oct 15 · 9:00am",
  "Thu, Oct 16 · 7:30am",
];

const WHY_SHE_LOOKED: Record<SurgeonId, string> = {
  reyes: "your cousin's rec checking out",
  whitfield: "being nearby and highly rated for this exact procedure",
  anand: "having the shortest wait time",
};

export function introFor(id: SurgeonId): ReactNode {
  if (id === "reyes") {
    return (
      <MessageBubble sender="ai">
        Based on your situation, Dr. Reyes looks like the strongest fit —
        highest volume for this exact procedure, closest to you, and your
        cousin's rec checks out. Here's why, in full:
      </MessageBubble>
    );
  }
  return (
    <MessageBubble sender="ai">
      You were looking at {SURGEON_NAMES[id]} — solid pick, especially for{" "}
      {WHY_SHE_LOOKED[id]}. That said, based on everything in your file, Dr.
      Reyes still looks like the strongest overall fit — highest volume for
      this exact procedure, and your cousin's rec checks out. Here's why, in
      full:
    </MessageBubble>
  );
}

export function chipsFor(id: SurgeonId): string[] {
  return [
    `Go with ${SURGEON_NAMES[id]}`,
    ...(Object.keys(SURGEON_NAMES) as SurgeonId[])
      .filter((other) => other !== id)
      .map((other) => `See ${SURGEON_NAMES[other]} instead`),
  ];
}
