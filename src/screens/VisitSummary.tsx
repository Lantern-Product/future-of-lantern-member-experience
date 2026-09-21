import { CardScreen, WireBox } from "@/components/ScreenShell";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="text-neutral-900 text-right">{value}</span>
    </div>
  );
}

export default function VisitSummary() {
  return (
    <CardScreen title="Visit summary" subtitle="Initial consultation">
      <WireBox className="flex flex-col gap-2">
        <Row label="Date" value="Wed, Sep 24" />
        <Row label="Provider" value="Dr. Reyes" />
        <Row label="Reason for visit" value="Ongoing lower back pain" />
      </WireBox>

      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          WHAT HAPPENED
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Dr. Reyes reviewed your scan and history. Based on how long the pain
          has lasted and what it's not responding to, surgery is the
          recommended next step — fully covered, at no cost to you.
        </p>
      </WireBox>

      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          NEXT STEPS
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Surgery scheduled for Oct 14. No action needed from you before
          then — Lantern is handling the paperwork.
        </p>
      </WireBox>

      <div className="text-xs text-neutral-500 mt-auto">
        Written in plain language, saved here permanently — come back to it
        anytime.
      </div>
    </CardScreen>
  );
}
