"use client";

import { useRouter } from "next/navigation";
import { ScreenHeader, WireBox } from "@/components/ScreenShell";

export default function LearnEmail({ onNext }: { onNext?: () => void }) {
  const router = useRouter();

  function handleGetStarted() {
    if (onNext) {
      onNext();
    } else {
      router.push("/journey/learn-outreach");
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <ScreenHeader title="Mail" subtitle="1 new message" />
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="px-5 py-4 border-b border-neutral-200 flex gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-900 shrink-0 flex items-center justify-center text-white text-xs font-heading font-semibold">
            L
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-heading font-semibold text-neutral-900">
                Lantern
              </span>
              <span className="text-xs text-neutral-400">9:41 AM</span>
            </div>
            <div className="text-xs text-neutral-500">
              to maria.delgado@email.com
            </div>
            <div className="text-sm font-heading font-semibold text-neutral-900 mt-2">
              Maria, your back surgery is fully covered
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-4">
          <p className="text-sm text-neutral-700 leading-relaxed">
            Hi Maria,
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            We noticed you might be dealing with ongoing back pain. If it'd
            help, your plan fully covers evaluation and treatment — including
            surgery, if that's what it comes to — at no cost to you.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            You don't have to sort this out on your own. Lantern can walk you
            through every step, from finding the right specialist to handling
            the paperwork, whenever you're ready.
          </p>
          <WireBox>
            <div className="text-xs font-heading font-semibold text-neutral-500 mb-2">
              YOUR BENEFIT
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-neutral-700">Cost to you</span>
              <span className="font-heading font-semibold">$0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">Covered under</span>
              <span className="text-neutral-500">Your Lantern plan</span>
            </div>
          </WireBox>
          <p className="text-sm text-neutral-700 leading-relaxed">
            — The Lantern Care Team
          </p>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={handleGetStarted}
            className="w-full bg-neutral-900 text-white font-heading font-medium rounded-full px-6 py-2.5 text-sm"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
