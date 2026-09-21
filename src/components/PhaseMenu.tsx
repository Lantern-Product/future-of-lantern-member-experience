import { PHASES, stepsForPhase } from "@/lib/journey";

export default function PhaseMenu({
  currentId,
  onSelect,
  onGoHome,
  onClose,
}: {
  currentId: string;
  onSelect: (id: string) => void;
  /** Jumps to the entry lock-screen notification — not a real step, so it's injected at the top of Learn. */
  onGoHome: () => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-neutral-200">
        <h2 className="font-heading font-semibold text-lg">Maria's journey</h2>
        <button
          onClick={onClose}
          className="text-sm border border-neutral-300 rounded-full px-3 py-1"
        >
          Close
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {PHASES.map((phase) => (
          <div key={phase} className="mb-5">
            <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-500 mb-2">
              {phase}
            </div>
            <div className="flex flex-col gap-1.5">
              {phase === "Learn" && (
                <button
                  onClick={onGoHome}
                  className="text-left text-sm rounded-lg px-3 py-2 border border-neutral-200"
                >
                  Home screen
                </button>
              )}
              {stepsForPhase(phase).map((step) => (
                <button
                  key={step.id}
                  onClick={() => onSelect(step.id)}
                  className={`text-left text-sm rounded-lg px-3 py-2 border ${
                    step.id === currentId
                      ? "border-neutral-900 bg-neutral-100 font-semibold"
                      : "border-neutral-200"
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
