"use client";

import { useState } from "react";
import Sidebar, { View } from "./Sidebar";
import JourneyApp from "./JourneyApp";
import CareAdvocateDashboard from "./CareAdvocateDashboard";

export default function AppShell() {
  const [view, setView] = useState<View>("member");

  return (
    <div className="flex-1 flex min-h-0">
      <Sidebar active={view} onSelect={setView} />
      {view === "member" ? <JourneyApp /> : <CareAdvocateDashboard />}
    </div>
  );
}
