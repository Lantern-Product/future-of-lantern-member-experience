export type Phase =
  | "Learn"
  | "Connect"
  | "Receive Care"
  | "Post-Care"
  | "Case Closed"
  | "Account";

export interface StepMeta {
  id: string;
  phase: Phase;
  title: string;
  /** What this screen demonstrates, for the reviewer-facing annotation panel only — not shown inside the phone frame. */
  demonstrates: string;
  /** False = not part of the default Back/Next walkthrough yet; still reachable via the More menu. Defaults to true. */
  inSequence?: boolean;
}

export const PHASES: Phase[] = [
  "Learn",
  "Connect",
  "Receive Care",
  "Post-Care",
  "Case Closed",
  "Account",
];

export const STEPS: StepMeta[] = [
  {
    id: "learn-email",
    phase: "Learn",
    title: "Email: benefit awareness",
    demonstrates:
      "FAQ #3: whatever channel she first heard from Lantern in becomes hers. Email is an alternate entry point to the same outreach — same content, arriving where she happens to be looking.",
  },
  {
    id: "learn-outreach",
    phase: "Learn",
    title: "Proactive outreach",
    demonstrates:
      "Bet: \"We reach her before she asks.\" Lantern infers journey stage from state, not a calendar, and reaches out in Maria's preferred language at the moment worry becomes real.",
  },
  {
    id: "learn-confidence",
    phase: "Learn",
    title: "Building confidence",
    demonstrates:
      "\"What's always true — Learn\": Maria needs to quickly tell whether Lantern can help her before investing more effort.",
  },
  {
    id: "connect-setup",
    phase: "Connect",
    title: "Getting set up",
    demonstrates:
      "Bet: permanent memory / no re-explaining. Lantern already holds context from the outreach thread — Maria never restates herself. Connecting MyChart/Apple Health is an explicit, skippable opt-in for deeper personalization — consent stays hers, not assumed.",
  },
  {
    id: "connect-next-steps",
    phase: "Connect",
    title: "What happens next",
    demonstrates:
      "\"What's always true — Connect\": after setup, Maria should know exactly what to do first without feeling overwhelmed.",
  },
  {
    id: "connect-tracker",
    phase: "Connect",
    title: "Journey tracker",
    demonstrates:
      "A standing view of where she is in her own journey — always legible, so she never has to wonder what's happening or what's next.",
    inSequence: false,
  },
  {
    id: "connect-recap",
    phase: "Connect",
    title: "Session recap",
    demonstrates:
      "\"What's always true — Connect\": after a session, Maria should leave confident, not worried she missed something.",
  },
  {
    id: "care-education",
    phase: "Receive Care",
    title: "Personalized education",
    demonstrates:
      "Vision: her situation, her plan, her options — not a generic pamphlet. Sets her up to not start from zero with her surgeon.",
  },
  {
    id: "care-surgeon-comparison",
    phase: "Receive Care",
    title: "Surgeon comparison",
    demonstrates:
      "Comparison surfaces when Maria is ready to decide, not on a fixed day. Autonomy posture: Lantern suggests — the choice stays hers. Superseded by the earlier in-quiz version on the Proactive outreach screen — kept here for reference.",
    inSequence: false,
  },
  {
    id: "care-recommendation",
    phase: "Receive Care",
    title: "Lantern's recommendation",
    demonstrates:
      "FAQ #6: Lantern nudges with a clear point of view and visible reasoning — it doesn't decide for her, and doesn't hide behind a neutral menu.",
  },
  {
    id: "care-cost",
    phase: "Receive Care",
    title: "Cost, up front",
    demonstrates:
      "Bet: inferring what she won't say. Cost is shown before commitment, unprompted — \"she never gets a bill she didn't see coming.\"",
  },
  {
    id: "care-scheduling",
    phase: "Receive Care",
    title: "Scheduling handled",
    demonstrates:
      "Autonomy posture: Lantern acted. Cheap-to-undo action taken on her behalf once she's signaled direction — shown in one line, reversible in one tap.",
  },
  {
    id: "care-reschedule",
    phase: "Receive Care",
    title: "Life happens — reschedule",
    demonstrates:
      "FAQ #5: Lantern runs on her clock, not its own. Her journey steps back and Lantern re-orients with her — nothing lapses or closes.",
  },
  {
    id: "care-lockscreen",
    phase: "Receive Care",
    title: "Reminder on lock screen",
    demonstrates:
      "State-triggered, not a fixed drip. It reaches her without requiring her to open an app — the notification itself, in the channel she's already looking at.",
  },
  {
    id: "care-reminder",
    phase: "Receive Care",
    title: "Pre-appointment reminder",
    demonstrates:
      "State-triggered, not a fixed drip. A door held open in case she needs it, otherwise out of her way.",
  },
  {
    id: "care-textmessage",
    phase: "Receive Care",
    title: "Reminder via text message",
    demonstrates:
      "FAQ #3: whatever channel she first heard from Lantern in becomes hers. Same reminder, same reschedule option — this time arriving as a plain text thread instead of the in-app conversation.",
  },
  {
    id: "care-dayof",
    phase: "Receive Care",
    title: "Day of surgery",
    demonstrates:
      "FAQ #7: whatever Lantern told her matches, exactly, what the provider's own team tells her in person — no conflicting instructions.",
  },
  {
    id: "postcare-checkin",
    phase: "Post-Care",
    title: "Recovery check-in",
    demonstrates:
      "\"What's always true — Post care\": check-ins triggered by moments that actually raise a question, not a fixed schedule.",
  },
  {
    id: "postcare-escalation",
    phase: "Post-Care",
    title: "When it's a human's turn",
    demonstrates:
      "FAQ #8/#9: a human is brought in where a human is the experience — and the AI/human seam is always visible, never hidden.",
  },
  {
    id: "closed-summary",
    phase: "Case Closed",
    title: "Case closed, plainly",
    demonstrates:
      "A real close, not a fade into silence: what happened, a full record, and the thread stays open if anything comes up again.",
  },
  {
    id: "closed-reentry",
    phase: "Case Closed",
    title: "Coming back, months later",
    demonstrates:
      "\"What's always true — Case closed\": Maria can return anytime without starting over, trusting Lantern as a lasting part of how she manages her health.",
  },
  {
    id: "profile",
    phase: "Account",
    title: "Your profile",
    demonstrates:
      "Bet: we remember her permanently. A standing view of the signals Lantern has collected — from quiz answers to stated preferences — so she never has to re-explain herself. Reachable from the profile icon on any conversation.",
    inSequence: false,
  },
  {
    id: "past-chats",
    phase: "Account",
    title: "Past chats",
    demonstrates:
      "FAQ #5 / persistence bet: her episodes don't vanish when a case closes — she can see her history and pick any thread back up without starting over.",
    inSequence: false,
  },
  {
    id: "appointments",
    phase: "Account",
    title: "Manage appointments",
    demonstrates:
      "Gives Maria direct visibility and control over her logistics — upcoming and past appointments, and a reschedule path that doesn't require going back through the conversation.",
    inSequence: false,
  },
  {
    id: "visit-summary",
    phase: "Account",
    title: "Visit summary",
    demonstrates:
      "\"What's always true\": after a visit, Maria should be able to see what happened in plain language, on her own, whenever she wants to look back.",
    inSequence: false,
  },
];

export function stepsForPhase(phase: Phase): StepMeta[] {
  return STEPS.filter((s) => s.phase === phase);
}
