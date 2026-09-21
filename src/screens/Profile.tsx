"use client";

import { CardScreen, WireBox, Toggle } from "@/components/ScreenShell";
import { useAsideNav } from "@/components/AsideNavContext";
import { useFlowState, CONNECTABLE_APPS } from "@/components/FlowContext";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="text-neutral-900 text-right">{value}</span>
    </div>
  );
}

export default function Profile() {
  const { open } = useAsideNav();
  const { connectedApps, toggleApp } = useFlowState();
  const connected = CONNECTABLE_APPS.filter((a) =>
    connectedApps.includes(a.id)
  );
  const notConnected = CONNECTABLE_APPS.filter(
    (a) => !connectedApps.includes(a.id)
  );

  return (
    <CardScreen
      title="Your profile"
      subtitle="What Lantern has learned, so you never have to repeat it"
    >
      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          ABOUT YOU
        </div>
        <Row label="Preferred language" value="Spanish" />
        <Row label="Preferred channel" value="Text message" />
        <Row label="Member since" value="Aug 2026" />
      </WireBox>

      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          CARE SIGNALS
        </div>
        <Row label="Reported symptom" value="Back pain" />
        <Row label="Seen a doctor" value="Yes — Dr. Alvarez" />
        <Row label="Network status" value="In network ✓" />
      </WireBox>

      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          WHAT MATTERS TO YOU
        </div>
        <Row label="Provider preferences" value="Close to home" />
        <Row label="" value="Highest patient ratings" />
        <Row label="Language match" value="Se habla español" />
      </WireBox>

      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          CONNECTED APPS
        </div>
        {connected.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No apps connected yet.
          </p>
        ) : (
          connected.map((app) => <Row key={app.id} label={app.name} value="Connected ✓" />)
        )}
      </WireBox>

      <WireBox className="flex flex-col gap-3">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          CONNECT MORE FOR PERSONALIZED RESPONSES
        </div>
        {notConnected.map((app) => (
          <div key={app.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-neutral-900 font-medium">
                {app.name}
              </div>
              <div className="text-xs text-neutral-500">
                {app.description}
              </div>
            </div>
            <Toggle on={false} onToggle={() => toggleApp(app.id)} />
          </div>
        ))}
        {notConnected.length === 0 && (
          <p className="text-sm text-neutral-500">
            You&apos;ve connected everything available right now.
          </p>
        )}
      </WireBox>

      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={() => open("appointments")}
          className="text-sm text-neutral-800 border border-neutral-400 rounded-full px-4 py-2 self-start"
        >
          Manage appointments →
        </button>
        <button
          onClick={() => open("past-chats")}
          className="text-sm text-neutral-800 border border-neutral-400 rounded-full px-4 py-2 self-start"
        >
          View past chats →
        </button>
      </div>

      <div className="text-xs text-neutral-500 mt-auto">
        This profile carries forward across every conversation and every
        episode of care — nothing here needs to be re-entered.
      </div>
    </CardScreen>
  );
}
