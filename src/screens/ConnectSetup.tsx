"use client";

import { useRef } from "react";
import { ChatScreen, WireBox, Toggle } from "@/components/ScreenShell";
import MessageBubble from "@/components/MessageBubble";
import { useFlowState } from "@/components/FlowContext";

const GET_STARTED_ITEMS = [
  {
    title: "Connect your medical records",
    description:
      "Ask about your clinical notes, medical history, and health metrics.",
  },
  {
    title: "Understand your lab results",
    description: "Upload a lab report, and I'll break it down for you.",
  },
  {
    title: "Ask a health question",
    description:
      "For example, “What should I focus on for my back pain recovery?”",
  },
];

const CONFIRMED_ITEMS = [
  "Preferred language",
  "Best way to reach you",
  "Confirm coverage",
];

export default function ConnectSetup() {
  const { connectedApps, toggleApp } = useFlowState();
  const myChart = connectedApps.includes("mychart");
  const appleHealth = connectedApps.includes("appleHealth");
  const toggleSectionRef = useRef<HTMLDivElement>(null);

  return (
    <ChatScreen title="Getting set up">
      <MessageBubble sender="ai">
        I already have what you told me about your back pain — no need to
        repeat it. I just need to confirm a couple things to get you moving.
      </MessageBubble>
      <WireBox>
        <div className="flex flex-col gap-3">
          {CONFIRMED_ITEMS.map((label) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">{label}</span>
              <span className="text-xs border border-neutral-900 rounded-full px-2 py-0.5">
                Confirmed
              </span>
            </div>
          ))}
        </div>
      </WireBox>

      <MessageBubble sender="ai">
        Optional: connect your health records for more personalized
        education, so you don&apos;t have to repeat your history yourself.
      </MessageBubble>
      <WireBox ref={toggleSectionRef} className="flex flex-col gap-3">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          PERSONALIZE YOUR EDUCATION · OPTIONAL
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-900 font-medium">
              Connect to MyChart
            </div>
            <div className="text-xs text-neutral-500">
              {myChart ? "Connected" : "Not connected"}
            </div>
          </div>
          <Toggle on={myChart} onToggle={() => toggleApp("mychart")} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-900 font-medium">
              Connect to Apple Health
            </div>
            <div className="text-xs text-neutral-500">
              {appleHealth ? "Connected" : "Not connected"}
            </div>
          </div>
          <Toggle on={appleHealth} onToggle={() => toggleApp("appleHealth")} />
        </div>
        <div className="text-xs text-neutral-400">
          You can skip this and connect later — nothing else waits on it.
        </div>
      </WireBox>

      <div className="text-xs font-heading font-semibold text-neutral-500 px-1">
        GET STARTED
      </div>
      <div className="flex flex-col gap-3">
        {GET_STARTED_ITEMS.map((item, i) => {
          const content = (
            <WireBox className="flex flex-col gap-1">
              <span className="text-sm font-heading font-semibold">
                {item.title}
              </span>
              <span className="text-xs text-neutral-500">
                {item.description}
              </span>
            </WireBox>
          );
          if (i === 0) {
            return (
              <button
                key={item.title}
                onClick={() =>
                  toggleSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                className="text-left"
              >
                {content}
              </button>
            );
          }
          return <div key={item.title}>{content}</div>;
        })}
      </div>
    </ChatScreen>
  );
}
