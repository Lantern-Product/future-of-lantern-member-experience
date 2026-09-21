"use client";

import { createContext, useContext } from "react";

export type SurgeonId = "reyes" | "whitfield" | "anand";

export const SURGEON_NAMES: Record<SurgeonId, string> = {
  reyes: "Dr. Reyes",
  whitfield: "Dr. Whitfield",
  anand: "Dr. Anand",
};

export interface ConnectableApp {
  id: string;
  name: string;
  description: string;
}

export const CONNECTABLE_APPS: ConnectableApp[] = [
  {
    id: "mychart",
    name: "MyChart",
    description: "Clinical notes, visit history, and medications.",
  },
  {
    id: "appleHealth",
    name: "Apple Health",
    description: "Activity, vitals, and health metrics from your phone.",
  },
  {
    id: "myFitnessPal",
    name: "MyFitnessPal",
    description: "Nutrition and activity logs, for more relevant guidance.",
  },
  {
    id: "fitbit",
    name: "Fitbit",
    description: "Movement and sleep data, to spot patterns worth flagging.",
  },
];

interface FlowState {
  /** Which surgeon card Maria tapped on the comparison screen, if any. */
  selectedSurgeonId: SurgeonId | null;
  setSelectedSurgeonId: (id: SurgeonId) => void;
  /** The time slot she picked once she committed to a surgeon, if any. */
  chosenSlot: string | null;
  setChosenSlot: (slot: string) => void;
  /** Ids of third-party apps/records she's connected, from CONNECTABLE_APPS. */
  connectedApps: string[];
  toggleApp: (id: string) => void;
}

const defaultState: FlowState = {
  selectedSurgeonId: null,
  setSelectedSurgeonId: () => {},
  chosenSlot: null,
  setChosenSlot: () => {},
  connectedApps: [],
  toggleApp: () => {},
};

export const FlowContext = createContext<FlowState>(defaultState);

export function useFlowState() {
  return useContext(FlowContext);
}
