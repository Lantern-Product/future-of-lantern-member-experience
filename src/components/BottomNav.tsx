export default function BottomNav({
  onBack,
  onNext,
  onMenu,
  canBack,
  canNext,
}: {
  onBack: () => void;
  onNext: () => void;
  onMenu: () => void;
  canBack: boolean;
  canNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 bg-white">
      <button
        onClick={onBack}
        disabled={!canBack}
        className="text-sm font-heading font-medium px-3 py-1.5 rounded-full border border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        onClick={onMenu}
        className="text-sm font-heading font-medium px-3 py-1.5 rounded-full border border-neutral-300"
      >
        More
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="text-sm font-heading font-medium px-3 py-1.5 rounded-full bg-neutral-900 text-white disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
