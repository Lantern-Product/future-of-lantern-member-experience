"use client";

import { useState } from "react";
import { CardScreen, WireBox } from "@/components/ScreenShell";
import { useAsideNav } from "@/components/AsideNavContext";

type Tab = "upcoming" | "past";

const RESCHEDULE_OPTIONS = [
  "Wed, Oct 16 · 7:00am",
  "Thu, Oct 17 · 9:00am",
  "Fri, Oct 18 · 7:00am",
];

export default function Appointments() {
  const { open } = useAsideNav();
  const [tab, setTab] = useState<Tab>("upcoming");
  const [appointmentTime, setAppointmentTime] = useState("Tue, Oct 14 · 7:00am");
  const [rescheduling, setRescheduling] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [justUpdated, setJustUpdated] = useState(false);

  function confirmReschedule() {
    if (!selectedSlot) return;
    setAppointmentTime(selectedSlot);
    setRescheduling(false);
    setSelectedSlot(null);
    setJustUpdated(true);
  }

  return (
    <CardScreen
      title="Appointments"
      subtitle="Everything scheduled, in one place"
    >
      <div className="flex gap-2">
        {(["upcoming", "past"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-sm font-heading font-medium rounded-full px-4 py-1.5 border ${
              tab === t
                ? "bg-neutral-900 text-white border-neutral-900"
                : "border-neutral-300 text-neutral-700"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      {tab === "upcoming" ? (
        <WireBox className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-heading font-semibold">
              Consult — Dr. Reyes
            </span>
            <span className="text-xs border border-neutral-400 rounded-full px-2 py-0.5 text-neutral-600">
              Confirmed
            </span>
          </div>
          <span className="text-sm text-neutral-700">{appointmentTime}</span>

          {justUpdated && !rescheduling && (
            <div className="text-xs text-neutral-500 border-t border-neutral-200 pt-2 mt-1">
              Updated — we&apos;ll let Dr. Reyes&apos;s office know.
            </div>
          )}

          {!rescheduling ? (
            <button
              onClick={() => {
                setRescheduling(true);
                setJustUpdated(false);
              }}
              className="text-sm text-neutral-800 border border-neutral-400 rounded-full px-4 py-1.5 self-start mt-1"
            >
              Reschedule
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-1 border-t border-neutral-200 pt-3">
              <div className="text-xs font-heading font-semibold text-neutral-500">
                CHOOSE A NEW TIME
              </div>
              <div className="flex flex-col gap-1.5">
                {RESCHEDULE_OPTIONS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-left text-sm rounded-lg px-3 py-2 border ${
                      selectedSlot === slot
                        ? "border-neutral-900 bg-white font-medium"
                        : "border-neutral-300 bg-white text-neutral-700"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={confirmReschedule}
                  disabled={!selectedSlot}
                  className="bg-neutral-900 text-white text-sm font-heading font-medium rounded-full px-4 py-1.5 disabled:opacity-30"
                >
                  Confirm new time
                </button>
                <button
                  onClick={() => {
                    setRescheduling(false);
                    setSelectedSlot(null);
                  }}
                  className="text-sm text-neutral-600 rounded-full px-4 py-1.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </WireBox>
      ) : (
        <WireBox className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-heading font-semibold">
              Initial consultation — Dr. Reyes
            </span>
            <span className="text-xs border border-neutral-400 rounded-full px-2 py-0.5 text-neutral-600">
              Completed
            </span>
          </div>
          <span className="text-sm text-neutral-700">Wed, Sep 24 · 10:00am</span>
          <button
            onClick={() => open("visit-summary")}
            className="text-sm text-neutral-800 border border-neutral-400 rounded-full px-4 py-1.5 self-start mt-1"
          >
            View visit summary →
          </button>
        </WireBox>
      )}

      <div className="text-xs text-neutral-500 mt-auto">
        Anything you change here is reflected everywhere — no need to also
        tell us in the conversation.
      </div>
    </CardScreen>
  );
}
