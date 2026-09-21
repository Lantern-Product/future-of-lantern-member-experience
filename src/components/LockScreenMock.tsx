import { ReactNode } from "react";

export default function LockScreenMock({
  message,
  hint,
  onTap,
}: {
  message: ReactNode;
  hint?: string;
  onTap: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col bg-neutral-300 px-6 pt-10 pb-8">
      <div className="flex flex-col items-center gap-1">
        <div className="text-6xl font-heading font-semibold text-neutral-900">
          9:41
        </div>
        <div className="text-sm text-neutral-600">Wednesday, October 12</div>
      </div>

      <button
        onClick={onTap}
        className="w-full text-left bg-neutral-50/95 border border-neutral-400 rounded-2xl px-4 py-3 flex gap-3 items-start shadow-sm mt-6 cursor-pointer active:bg-neutral-100"
      >
        <div className="w-9 h-9 rounded-lg bg-neutral-900 shrink-0 flex items-center justify-center text-white text-xs font-heading font-semibold">
          L
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-neutral-600">
              Lantern
            </span>
            <span className="text-xs text-neutral-400">now</span>
          </div>
          <div className="text-sm text-neutral-900 leading-snug mt-0.5">
            {message}
          </div>
        </div>
      </button>

      {hint && (
        <div className="text-center text-xs text-neutral-500 mt-3">
          {hint}
        </div>
      )}

      <div className="flex-1" />
    </div>
  );
}
