"use client";

import { useRouter } from "next/navigation";
import LockScreenMock from "@/components/LockScreenMock";

export default function CareLockscreen({ onNext }: { onNext?: () => void }) {
  const router = useRouter();

  function handleTap() {
    if (onNext) {
      onNext();
    } else {
      router.push("/journey/care-reminder");
    }
  }

  return (
    <LockScreenMock
      message={
        <>
          Your appointment with Dr. Reyes is in 2 days at 7am. Everything's
          set on our end.
        </>
      }
      hint="Tap the notification to open the conversation"
      onTap={handleTap}
    />
  );
}
