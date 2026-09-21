import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[390px] h-[844px] rounded-[48px] border-4 border-neutral-900 bg-white shadow-xl overflow-hidden shrink-0">
      {/* status bar */}
      <div className="flex items-center px-6 pt-3 pb-1 text-[13px] font-heading font-semibold text-neutral-900">
        <span>9:41</span>
      </div>

      {/* notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl" />

      {/* screen content */}
      <div className="h-[calc(100%-32px-28px)] flex flex-col">{children}</div>

      {/* home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-neutral-400" />
    </div>
  );
}
