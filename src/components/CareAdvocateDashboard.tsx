"use client";

import { ReactNode, useState } from "react";

interface Member {
  id: string;
  name: string;
  queueTag: string;
}

const MEMBERS: Member[] = [
  { id: "maria", name: "Maria Delgado", queueTag: "Awaiting scheduling" },
  { id: "james", name: "James Carter", queueTag: "New referral" },
  { id: "priya", name: "Priya Nair", queueTag: "Post-op recovery" },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5 border-b border-neutral-100 last:border-0">
      <span className="text-neutral-500">{label}</span>
      <span className="text-neutral-900 font-medium text-right">{value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-neutral-300 rounded-xl bg-white p-5">
      <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-500 mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function StatusTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border border-neutral-300 rounded-lg px-3 py-2">
      <span className="text-[10px] uppercase tracking-wide text-neutral-500 font-heading font-semibold">
        {label}
      </span>
      <span className="text-sm text-neutral-900 font-medium">{value}</span>
    </div>
  );
}

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9a6 6 0 1112 0c0 3.5 1 5 1.5 6H4.5C5 14 6 12.5 6 9z" />
      <path d="M10 19a2 2 0 004 0" />
    </svg>
  );
}

interface Notification {
  title: string;
  detail: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    title: "Maria Delgado rescheduled",
    detail: "Moved her appointment to Thu, Oct 17 · 9:00am",
    time: "2 min ago",
  },
];

function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center"
      >
        <BellIcon className="w-4 h-4 text-neutral-700" />
        {NOTIFICATIONS.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center">
            {NOTIFICATIONS.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 border border-neutral-300 rounded-xl bg-white shadow-md z-20 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-neutral-200 text-xs font-heading font-semibold uppercase tracking-wide text-neutral-500">
            Notifications
          </div>
          {NOTIFICATIONS.map((n, i) => (
            <div
              key={i}
              className="px-4 py-3 border-b border-neutral-100 last:border-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-heading font-semibold text-neutral-900">
                  {n.title}
                </span>
                <span className="text-xs text-neutral-400">{n.time}</span>
              </div>
              <p className="text-sm text-neutral-600 mt-0.5">{n.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type TimelineStatus = "done" | "current" | "upcoming";

function TimelineStep({
  label,
  status,
  isLast,
}: {
  label: string;
  status: TimelineStatus;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
            status === "done"
              ? "bg-neutral-900 text-white"
              : status === "current"
              ? "border-2 border-neutral-900 bg-white"
              : "border border-neutral-300 bg-white"
          }`}
        >
          {status === "done" && "✓"}
        </div>
        {!isLast && <div className="w-px flex-1 bg-neutral-300 my-1" />}
      </div>
      <div className={isLast ? "" : "pb-4"}>
        <span
          className={`text-sm ${
            status === "upcoming"
              ? "text-neutral-400"
              : "text-neutral-900 font-medium"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function CareAdvocateDashboard() {
  const [selectedId, setSelectedId] = useState("maria");
  const selected = MEMBERS.find((m) => m.id === selectedId)!;

  return (
    <div className="flex-1 min-h-0 overflow-auto p-8 bg-neutral-200">
      <div className="h-full max-w-6xl mx-auto flex flex-col min-h-0 border border-neutral-300 rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* top bar */}
      <div className="shrink-0 flex items-center justify-between border-b border-neutral-300 px-6 py-3">
        <h1 className="font-heading font-semibold text-base text-neutral-900">
          Care Advocate Dashboard
        </h1>
        <NotificationBell />
      </div>

      <div className="flex flex-1 min-h-0">
      {/* member queue */}
      <div className="w-64 shrink-0 border-r border-neutral-300 bg-white flex flex-col py-5 px-3 gap-1 overflow-y-auto">
        <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-400 px-2 mb-2">
          My Members ({MEMBERS.length})
        </div>
        {MEMBERS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`text-left rounded-lg px-3 py-2 ${
              selectedId === m.id
                ? "bg-neutral-900 text-white"
                : "text-neutral-800 hover:bg-neutral-100"
            }`}
          >
            <div className="text-sm font-heading font-semibold">
              {m.name}
            </div>
            <div
              className={`text-xs mt-0.5 ${
                selectedId === m.id ? "text-neutral-300" : "text-neutral-500"
              }`}
            >
              {m.queueTag}
            </div>
          </button>
        ))}
      </div>

      {selected.id !== "maria" ? (
        <div className="flex-1 flex items-center justify-center px-10">
          <div className="max-w-sm text-center border border-neutral-300 rounded-xl bg-white p-6">
            <div className="text-sm font-heading font-semibold text-neutral-900 mb-1">
              No demo data yet for {selected.name}
            </div>
            <p className="text-sm text-neutral-500">
              This prototype only has full case detail wired up for Maria
              Delgado.
            </p>
            <button
              onClick={() => setSelectedId("maria")}
              className="mt-4 bg-neutral-900 text-white text-sm font-heading font-medium rounded-full px-4 py-2"
            >
              View Maria's case
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* key info sidebar */}
          <div className="w-72 shrink-0 border-r border-neutral-300 bg-neutral-50 py-6 px-5 overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center text-lg font-heading font-semibold mb-2">
                M
              </div>
              <div className="font-heading font-semibold text-neutral-900">
                Maria Delgado
              </div>
              <div className="text-xs text-neutral-500">Case #10492</div>
            </div>
            <div className="flex flex-col gap-2">
              <StatusTag label="Case phase" value="Receive Care" />
              <StatusTag
                label="Case status"
                value="Rescheduled — Thu, Oct 17"
              />
              <StatusTag label="Network" value="In network ✓" />
              <StatusTag label="Reported symptom" value="Back pain" />
            </div>
          </div>

          {/* main detail column */}
          <div className="flex-1 overflow-y-auto py-6 px-8">
            <div className="max-w-2xl flex flex-col gap-6">
              <div className="flex items-start gap-3 border border-neutral-400 rounded-xl bg-neutral-50 p-4">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <BellIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-heading font-semibold text-neutral-900">
                    Maria Delgado rescheduled her appointment
                  </div>
                  <div className="text-sm text-neutral-600 mt-0.5">
                    Moved from Tue, Oct 14 · 7:00am to Thu, Oct 17 · 9:00am
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">2 min ago</div>
                </div>
              </div>

              <Card title="Member Profile">
                <Field label="Preferred language" value="Spanish" />
                <Field label="Preferred channel" value="Text message" />
                <Field label="Member since" value="Aug 2026" />
              </Card>

              <Card title="Preferences">
                <Field label="Provider preference" value="Close to home" />
                <Field
                  label="Provider preference"
                  value="Highest patient ratings"
                />
                <Field label="Language match" value="Se habla español" />
              </Card>

              <Card title="Case Timeline">
                <div className="flex flex-col mt-1">
                  <TimelineStep label="Symptom reported" status="done" />
                  <TimelineStep label="Provider match generated" status="done" />
                  <TimelineStep
                    label="Surgeon recommended: Dr. Reyes"
                    status="done"
                  />
                  <TimelineStep label="Scheduling in progress" status="done" />
                  <TimelineStep
                    label="Appointment confirmed: Tue, Oct 14"
                    status="done"
                  />
                  <TimelineStep
                    label="Rescheduled by member to Thu, Oct 17 · 9:00am"
                    status="current"
                    isLast
                  />
                </div>
              </Card>

              <p className="text-xs text-neutral-400">
                Illustrative placeholder — a starting point to iterate on with
                real advocate workflows.
              </p>
            </div>
          </div>
        </>
      )}
      </div>
      </div>
    </div>
  );
}
