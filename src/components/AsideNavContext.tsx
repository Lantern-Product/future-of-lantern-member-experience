"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

interface AsideNav {
  /** Jumps to any step id (e.g. "profile", "past-chats", "appointments"). */
  open: (id: string) => void;
}

export const AsideNavContext = createContext<AsideNav | null>(null);

/**
 * Inside the guided tour (JourneyApp), this jumps within the SPA and remembers
 * where to return to. On a standalone /journey/[id] page there's no provider,
 * so it falls back to a plain route change instead.
 */
export function useAsideNav(): AsideNav {
  const ctx = useContext(AsideNavContext);
  const router = useRouter();
  if (ctx) return ctx;
  return {
    open: (id: string) => router.push(`/journey/${id}`),
  };
}
