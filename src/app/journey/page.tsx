import Link from "next/link";
import { PHASES, stepsForPhase } from "@/lib/journey";

export default function JourneyIndex() {
  return (
    <div className="flex-1 max-w-xl mx-auto w-full px-6 py-10">
      <h1 className="font-heading font-semibold text-2xl mb-1">
        All screens
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Each link is a standalone URL for one screen — open it directly and
        paste it into the html.to.design Figma plugin to bring it in as
        editable layers.
      </p>
      {PHASES.map((phase) => (
        <div key={phase} className="mb-6">
          <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            {phase}
          </div>
          <div className="flex flex-col gap-1.5">
            {stepsForPhase(phase).map((step) => (
              <Link
                key={step.id}
                href={`/journey/${step.id}`}
                className="text-sm underline text-neutral-800"
              >
                {step.title} — /journey/{step.id}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
