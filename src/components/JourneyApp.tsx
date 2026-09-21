"use client";

import { useState } from "react";
import PhoneFrame from "./PhoneFrame";
import BottomNav from "./BottomNav";
import PhaseMenu from "./PhaseMenu";
import LockScreenMock from "./LockScreenMock";
import { AsideNavContext } from "./AsideNavContext";
import { FlowContext, SurgeonId } from "./FlowContext";
import { STEPS } from "@/lib/journey";
import { SCREEN_COMPONENTS } from "@/screens/screens";

export default function JourneyApp() {
  const [index, setIndex] = useState(-1); // -1 = entry lock screen
  const [menuOpen, setMenuOpen] = useState(false);
  // Indices to return to when a jump (menu or profile icon) is undone with Back.
  const [returnStack, setReturnStack] = useState<number[]>([]);
  const [selectedSurgeonId, setSelectedSurgeonId] = useState<SurgeonId | null>(
    null
  );
  const [chosenSlot, setChosenSlot] = useState<string | null>(null);
  const [connectedApps, setConnectedApps] = useState<string[]>([]);

  function toggleApp(id: string) {
    setConnectedApps((apps) =>
      apps.includes(id) ? apps.filter((a) => a !== id) : [...apps, id]
    );
  }

  const step = index >= 0 ? STEPS[index] : null;
  const Screen = step ? SCREEN_COMPONENTS[step.id] : null;

  function jumpTo(id: string) {
    const i = STEPS.findIndex((s) => s.id === id);
    if (i < 0) return;
    setReturnStack((st) => [...st, index]);
    setIndex(i);
  }

  function goTo(id: string) {
    jumpTo(id);
    setMenuOpen(false);
  }

  function goHome() {
    setIndex(-1);
    setMenuOpen(false);
  }

  // Skip past steps marked inSequence: false — they're reachable via More, but
  // Back/Next only walk the default walkthrough.
  function nextVisibleIndex(from: number) {
    let i = from + 1;
    while (i < STEPS.length && STEPS[i].inSequence === false) i++;
    return i;
  }

  function prevVisibleIndex(from: number) {
    let i = from - 1;
    while (i >= 0 && STEPS[i].inSequence === false) i--;
    return i;
  }

  function handleNext() {
    setIndex((i) => Math.min(STEPS.length - 1, nextVisibleIndex(i)));
  }

  // -1 is a valid target: it's the entry lock-screen notification, so Back
  // from the first step returns there instead of dead-ending. If we got here
  // via a jump (menu or profile icon), Back unwinds that instead.
  function handleBack() {
    if (returnStack.length > 0) {
      const target = returnStack[returnStack.length - 1];
      setReturnStack((st) => st.slice(0, -1));
      setIndex(target);
      return;
    }
    setIndex((i) => prevVisibleIndex(i));
  }

  const canNext = index >= 0 && nextVisibleIndex(index) < STEPS.length;
  const canBack = index >= 0;

  const asideNav = { open: jumpTo };
  const flowState = {
    selectedSurgeonId,
    setSelectedSurgeonId,
    chosenSlot,
    setChosenSlot,
    connectedApps,
    toggleApp,
  };

  return (
    <div className="flex-1 flex items-center justify-center gap-10 py-10 px-6 flex-wrap">
      <PhoneFrame>
        {index === -1 ? (
          <AwarenessLockscreen onStart={() => setIndex(0)} />
        ) : (
          <AsideNavContext.Provider value={asideNav}>
            <FlowContext.Provider value={flowState}>
              <div className="relative flex-1 min-h-0 flex flex-col">
                {Screen && <Screen onNext={handleNext} />}
                {menuOpen && (
                  <PhaseMenu
                    currentId={step!.id}
                    onSelect={goTo}
                    onGoHome={goHome}
                    onClose={() => setMenuOpen(false)}
                  />
                )}
              </div>
              <BottomNav
                canBack={canBack}
                canNext={canNext}
                onBack={handleBack}
                onNext={handleNext}
                onMenu={() => setMenuOpen(true)}
              />
            </FlowContext.Provider>
          </AsideNavContext.Provider>
        )}
      </PhoneFrame>

      <AnnotationPanel
        step={step}
        onRestart={() => {
          setIndex(-1);
          setReturnStack([]);
        }}
      />
    </div>
  );
}

function AwarenessLockscreen({ onStart }: { onStart: () => void }) {
  return (
    <LockScreenMock
      message={
        <>
          Back pain, surgery, something else – it's covered and free. Tap to
          learn more.
        </>
      }
      onTap={onStart}
    />
  );
}

function AnnotationPanel({
  step,
  onRestart,
}: {
  step: { phase: string; title: string; demonstrates: string } | null;
  onRestart: () => void;
}) {
  return (
    <div className="w-[320px] shrink-0 flex flex-col gap-4">
      <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-500">
        For reviewers
      </div>
      {step ? (
        <>
          <div className="text-xs uppercase tracking-wide text-neutral-400 font-heading font-semibold">
            {step.phase}
          </div>
          <h3 className="font-heading font-semibold text-lg -mt-2">
            {step.title}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {step.demonstrates}
          </p>
        </>
      ) : (
        <p className="text-sm text-neutral-600 leading-relaxed">
          Tap the notification to begin. From there, use{" "}
          <span className="font-semibold">Next / Back</span> to move through
          the story in order, or <span className="font-semibold">More</span>{" "}
          to jump to any moment. This panel explains which PRFAQ bet or
          principle each screen is demonstrating — it isn't part of the
          wireframe itself.
        </p>
      )}
      <button
        onClick={onRestart}
        className="text-sm text-neutral-500 underline w-fit"
      >
        Restart from the beginning
      </button>
    </div>
  );
}
