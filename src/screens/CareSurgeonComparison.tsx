"use client";

import { useRouter } from "next/navigation";
import { CardScreen, WireBox, Placeholder } from "@/components/ScreenShell";
import { useFlowState, SurgeonId } from "@/components/FlowContext";

const SURGEONS: { id: SurgeonId; name: string; note: string }[] = [
  { id: "reyes", name: "Dr. Reyes", note: "Your cousin's rec — checked for you" },
  { id: "whitfield", name: "Dr. Whitfield", note: "Nearby, highly rated for this procedure" },
  { id: "anand", name: "Dr. Anand", note: "Shortest wait time" },
];

export default function CareSurgeonComparison({
  onNext,
}: {
  onNext?: () => void;
}) {
  const { setSelectedSurgeonId } = useFlowState();
  const router = useRouter();

  function pick(id: SurgeonId) {
    setSelectedSurgeonId(id);
    if (onNext) {
      onNext();
    } else {
      router.push("/journey/care-recommendation");
    }
  }

  return (
    <CardScreen title="Choose a surgeon" subtitle="All in-network · $0 to you">
      <div className="flex flex-col gap-3">
        {SURGEONS.map((s) => (
          <button
            key={s.id}
            onClick={() => pick(s.id)}
            className="text-left"
          >
            <WireBox className="flex flex-col gap-2">
              <span className="font-heading font-semibold text-sm">
                {s.name}
              </span>
              <div className="text-xs text-neutral-500">{s.note}</div>
              <Placeholder lines={2} />
            </WireBox>
          </button>
        ))}
      </div>
      <div className="text-xs text-neutral-500 mt-auto">
        Tap a surgeon to hear what Lantern thinks.
      </div>
    </CardScreen>
  );
}
