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
import { useAsideNav } from "@/components/AsideNavContext";
import { useFlowState, SurgeonId, SURGEON_NAMES } from "@/components/FlowContext";
import { SLOT_OPTIONS } from "@/lib/recommendationCopy";

type Stage =
  | "symptoms"
  | "seenDoctor"
  | "awaitingDoctorName"
  | "preferences"
  | "selectingSurgeon"
  | "pickingSlot"
  | "complete";

const SYMPTOM_CHIPS = [
  "Pain when bending",
  "Pain at rest",
  "Sharp or shooting pain",
  "Numbness or tingling",
  "Comes and goes",
  "Other",
];
const PREFERENCE_OPTIONS = [
  "Close to home",
  "Most experienced with this procedure",
  "Highest patient ratings",
  "Earliest availability",
  "Se habla español",
];

export default function LearnOutreach() {
  const [stage, setStage] = useState<Stage>("symptoms");
  const [timeline, setTimeline] = useState<{ id: number; node: ReactNode }[]>(
    []
  );
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { open } = useAsideNav();
  const { setSelectedSurgeonId, setChosenSlot } = useFlowState();
  const [currentDoctor, setCurrentDoctor] = useState<SurgeonId | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [timeline]);

  function push(node: ReactNode) {
    const id = nextId.current++;
    setTimeline((t) => [...t, { id, node }]);
  }

  function pickSymptom(area: string) {
    push(<MessageBubble sender="member">{area}</MessageBubble>);
    push(
      <MessageBubble sender="ai">
        Got it. Have you already seen a doctor for this?
      </MessageBubble>
    );
    setStage("seenDoctor");
  }

  function pickSeenDoctor(answer: string) {
    push(<MessageBubble sender="member">{answer}</MessageBubble>);
    if (answer === "Yes") {
      push(
        <MessageBubble sender="ai">
          Which doctor have you seen? You can just type their name below.
        </MessageBubble>
      );
      setStage("awaitingDoctorName");
    } else {
      push(
        <MessageBubble sender="ai">
          No problem — I can help you find the right fit. What matters most
          to you when choosing a surgeon? Select all that apply.
        </MessageBubble>
      );
      push(<PreferenceChecklist onSubmit={handlePreferencesSubmit} />);
      setStage("preferences");
    }
  }

  function handleDoctorLookup(name: string) {
    push(<MessageBubble sender="member">{name}</MessageBubble>);
    push(
      <MessageBubble sender="ai">
        Looking them up to see if they&apos;re in network
        <LoadingDots />
      </MessageBubble>
    );
    setStage("complete");
    setTimeout(() => {
      push(
        <MessageBubble sender="ai">
          Good news — {name} is in your network, so this can move forward at
          no cost to you. Here&apos;s how they compare to a couple of other
          highly-rated options nearby:
        </MessageBubble>
      );
      push(
        <MatchResults
          title="IN-NETWORK OPTIONS"
          matches={[
            { name, note: "Your current doctor — in network" },
            { name: "Dr. Whitfield", note: "Most experienced with this procedure" },
            { name: "Dr. Anand", note: "Earliest availability" },
          ]}
        />
      );
    }, 900);
  }

  function handlePreferencesSubmit(selected: string[]) {
    push(
      <MessageBubble sender="member">
        {selected.length ? selected.join(", ") : "No preference"}
      </MessageBubble>
    );
    push(
      <MessageBubble sender="ai">
        Here's how the surgeons compare, based on what matters to you:
      </MessageBubble>
    );
    push(<SurgeonSelectCards onSelect={handleSurgeonSelect} />);
    setStage("selectingSurgeon");
  }

  function handleSurgeonSelect(id: SurgeonId) {
    setCurrentDoctor(id);
    setSelectedSurgeonId(id);
    push(
      <MessageBubble sender="member">
        Selected {SURGEON_NAMES[id]}
      </MessageBubble>
    );
    push(
      <MessageBubble sender="ai">
        Great — {SURGEON_NAMES[id]} it is. Here&apos;s what they have open:
      </MessageBubble>
    );
    setStage("pickingSlot");
  }

  function handleSlotPick(slot: string) {
    if (!currentDoctor) return;
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
    setStage("complete");
  }

  function handleGenericSend(text: string) {
    if (stage === "awaitingDoctorName") {
      handleDoctorLookup(text);
    } else {
      push(<MessageBubble sender="member">{text}</MessageBubble>);
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 min-h-0">
      <ScreenHeader
        title="Lantern"
        subtitle="New message · en Español"
        onProfileClick={() => open("profile")}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
      >
        <MessageBubble sender="ai">
          Hola Maria — noticed you might be dealing with some back pain
          that&apos;s been getting worse. If it&apos;d help, this is fully
          covered by your plan and won&apos;t cost you anything. I can walk
          you through it, whenever you&apos;re ready.
        </MessageBubble>
        <MessageBubble sender="member">how did you know that</MessageBubble>
        <MessageBubble sender="ai">
          Lantern is a free benefit your employer already offers — not
          something tracking you. We can help connect you with a specialist
          to get it looked at, whenever you&apos;re ready. How would you
          describe the pain?
        </MessageBubble>

        {timeline.map((t) => (
          <div key={t.id} className="contents">
            {t.node}
          </div>
        ))}
      </div>

      {stage === "symptoms" && (
        <ChipRow chips={SYMPTOM_CHIPS} onPick={pickSymptom} />
      )}
      {stage === "seenDoctor" && (
        <ChipRow chips={["Yes", "No"]} onPick={pickSeenDoctor} />
      )}
      {stage === "pickingSlot" && (
        <ChipRow chips={SLOT_OPTIONS} onPick={handleSlotPick} />
      )}

      <MessageInput onSend={handleGenericSend} />
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1 align-middle">
      <span className="w-1 h-1 rounded-full bg-neutral-400 animate-pulse" />
      <span
        className="w-1 h-1 rounded-full bg-neutral-400 animate-pulse"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-1 h-1 rounded-full bg-neutral-400 animate-pulse"
        style={{ animationDelay: "300ms" }}
      />
    </span>
  );
}

function PreferenceChecklist({
  onSubmit,
}: {
  onSubmit: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggle(option: string) {
    if (submitted) return;
    setSelected((s) =>
      s.includes(option) ? s.filter((x) => x !== option) : [...s, option]
    );
  }

  return (
    <WireBox className="flex flex-col gap-2">
      {PREFERENCE_OPTIONS.map((option) => {
        const checked = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => toggle(option)}
            disabled={submitted}
            className="flex items-center gap-2 text-left text-sm text-neutral-800"
          >
            <span
              className={`w-4 h-4 rounded shrink-0 flex items-center justify-center text-[10px] border ${
                checked
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "border-neutral-400"
              }`}
            >
              {checked && "✓"}
            </span>
            {option}
          </button>
        );
      })}
      {!submitted && (
        <button
          onClick={() => {
            setSubmitted(true);
            onSubmit(selected);
          }}
          className="mt-2 bg-neutral-900 text-white text-sm font-heading font-medium rounded-full px-4 py-2 self-start"
        >
          See my matches
        </button>
      )}
    </WireBox>
  );
}

const SURGEON_OPTIONS: { id: SurgeonId; name: string; note: string }[] = [
  { id: "reyes", name: "Dr. Reyes", note: "Your cousin's rec — checked for you" },
  { id: "whitfield", name: "Dr. Whitfield", note: "Nearby, highly rated for this procedure" },
  { id: "anand", name: "Dr. Anand", note: "Shortest wait time" },
];

function SurgeonSelectCards({
  onSelect,
}: {
  onSelect: (id: SurgeonId) => void;
}) {
  const [selectedId, setSelectedId] = useState<SurgeonId | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {SURGEON_OPTIONS.map((s) => (
        <WireBox key={s.id} className="flex flex-col gap-2">
          <span className="font-heading font-semibold text-sm">{s.name}</span>
          <div className="text-xs text-neutral-500">{s.note}</div>
          <Placeholder lines={2} />
          <button
            onClick={() => {
              setSelectedId(s.id);
              onSelect(s.id);
            }}
            disabled={selectedId !== null}
            className="self-start mt-1 bg-neutral-900 text-white text-sm font-heading font-medium rounded-full px-4 py-1.5 disabled:opacity-30"
          >
            {selectedId === s.id ? "Selected" : "Select"}
          </button>
        </WireBox>
      ))}
    </div>
  );
}

const PROVIDER_BIOS: Record<string, string> = {
  "Dr. Reyes":
    "Spine surgeon with 12+ years of experience and one of the highest procedure volumes in the network for this exact surgery.",
  "Dr. Whitfield":
    "Fellowship-trained orthopedic surgeon known for thorough pre-op planning and strong patient outcomes.",
  "Dr. Anand":
    "Board-certified surgeon with flexible scheduling and consistently high patient satisfaction scores.",
};

const DEFAULT_BIO =
  "Your current doctor — we've confirmed they're in network, so you can continue with them at no change in cost.";

function MatchResults({
  title,
  matches,
}: {
  title: string;
  matches: { name: string; note: string }[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <WireBox className="flex flex-col gap-1">
      <div className="text-xs font-heading font-semibold text-neutral-500 mb-1">
        {title}
      </div>
      {matches.map((m) => {
        const isOpen = expanded === m.name;
        return (
          <button
            key={m.name}
            onClick={() => setExpanded(isOpen ? null : m.name)}
            className="text-left border-t border-neutral-200 first:border-0 pt-2 first:pt-0 pb-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-heading font-semibold">
                {m.name}
              </span>
              <span className="text-xs text-neutral-400">
                {isOpen ? "Hide bio" : "View bio"}
              </span>
            </div>
            <span className="text-xs text-neutral-500">{m.note}</span>
            {isOpen && (
              <p className="text-xs text-neutral-600 leading-relaxed mt-2">
                {PROVIDER_BIOS[m.name] ?? DEFAULT_BIO}
              </p>
            )}
          </button>
        );
      })}
    </WireBox>
  );
}
