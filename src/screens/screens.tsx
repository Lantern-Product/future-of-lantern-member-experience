import { ChatScreen, CardScreen, WireBox, Placeholder } from "@/components/ScreenShell";
import MessageBubble from "@/components/MessageBubble";
import { ComponentType } from "react";
import CareLockscreen from "./CareLockscreen";
import LearnEmail from "./LearnEmail";
import LearnOutreach from "./LearnOutreach";
import Profile from "./Profile";
import PastChats from "./PastChats";
import Appointments from "./Appointments";
import VisitSummary from "./VisitSummary";
import CareSurgeonComparison from "./CareSurgeonComparison";
import CareRecommendation from "./CareRecommendation";
import CareScheduling from "./CareScheduling";
import CareReschedule from "./CareReschedule";
import CareTextMessage from "./CareTextMessage";
import ConnectSetup from "./ConnectSetup";

interface ScreenProps {
  /** Advances the guided tour to the next screen — only used by screens with their own tappable trigger (e.g. a notification). */
  onNext?: () => void;
}

// ---------- Learn ----------

function LearnConfidence() {
  return (
    <ChatScreen title="Lantern">
      <MessageBubble sender="member">
        ok. it's been about 2 months and its getting worse
      </MessageBubble>
      <MessageBubble sender="ai">
        Thanks for telling me. Here's what I can do: this is covered by your
        plan at no cost to you, I can connect you with a spine specialist
        near you, and I'll stay with you through the whole thing — you won't
        have to explain this again to anyone else.
      </MessageBubble>
      <WireBox>
        <div className="text-xs font-heading font-semibold text-neutral-500 mb-2">
          WHAT LANTERN CAN DO
        </div>
        <Placeholder lines={3} />
      </WireBox>
    </ChatScreen>
  );
}

// ---------- Connect ----------

function ConnectNextSteps() {
  return (
    <CardScreen title="You're set up" subtitle="Here's what happens next">
      <WireBox className="flex flex-col gap-2">
        <div className="text-sm font-heading font-semibold">1. Learn about your options</div>
        <Placeholder lines={2} />
      </WireBox>
      <WireBox className="flex flex-col gap-2">
        <div className="text-sm font-heading font-semibold">2. Compare surgeons near you</div>
        <Placeholder lines={2} />
      </WireBox>
      <WireBox className="flex flex-col gap-2">
        <div className="text-sm font-heading font-semibold">3. Get scheduled — we handle it</div>
        <Placeholder lines={2} />
      </WireBox>
      <div className="mt-auto text-xs text-neutral-500">
        Nothing to download. This thread is where you'll find everything.
      </div>
    </CardScreen>
  );
}

type TrackerStatus = "done" | "current" | "upcoming";

function TrackerStep({
  label,
  status,
  description,
  isLast,
}: {
  label: string;
  status: TrackerStatus;
  description?: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs ${
            status === "done"
              ? "bg-neutral-900 text-white"
              : status === "current"
              ? "border-2 border-neutral-900 bg-white"
              : "border border-neutral-300 bg-white"
          }`}
        >
          {status === "done" && "✓"}
          {status === "current" && (
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
          )}
        </div>
        {!isLast && <div className="w-px flex-1 bg-neutral-300 my-1" />}
      </div>
      <div className={isLast ? "" : "pb-6"}>
        <div
          className={`text-sm ${
            status === "upcoming"
              ? "text-neutral-400"
              : "text-neutral-900 font-heading font-semibold"
          }`}
        >
          {label}
        </div>
        {description && (
          <div className="text-xs text-neutral-500 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}

function ConnectTracker() {
  return (
    <CardScreen
      title="Setting up your journey"
      subtitle="We'll let you know as each step is ready"
    >
      <div className="flex flex-col mt-2">
        <TrackerStep label="Learn about options" status="current" description="Putting together your personalized education now." />
        <TrackerStep label="Compare surgeons" status="upcoming" />
        <TrackerStep label="Get scheduled" status="upcoming" />
        <TrackerStep label="Upcoming appointment" status="upcoming" isLast />
      </div>
      <div className="text-xs text-neutral-500 mt-auto">
        Nothing for you to check on — we'll reach out the moment there's
        something to see.
      </div>
    </CardScreen>
  );
}

function ConnectRecap() {
  return (
    <CardScreen title="Session complete" subtitle="Here's what we covered">
      <WireBox className="flex flex-col gap-2">
        <Placeholder lines={1} />
        <div className="text-xs text-neutral-500">✓ Coverage confirmed — $0 to you</div>
        <div className="text-xs text-neutral-500">✓ Preferred language + channel set</div>
        <div className="text-xs text-neutral-500">✓ Next: personalized education</div>
      </WireBox>
      <div className="text-sm text-neutral-700">
        Nothing left for you to track. I'll reach back out when it's time
        for the next step.
      </div>
    </CardScreen>
  );
}

// ---------- Receive Care ----------

function CareEducation() {
  return (
    <CardScreen title="About your back pain" subtitle="Personalized for you">
      <WireBox>
        <div className="text-xs font-heading font-semibold text-neutral-500 mb-2">
          YOUR SITUATION
        </div>
        <Placeholder lines={3} />
      </WireBox>
      <WireBox>
        <div className="text-xs font-heading font-semibold text-neutral-500 mb-2">
          YOUR TREATMENT OPTIONS
        </div>
        <Placeholder lines={3} />
      </WireBox>
      <div className="text-xs text-neutral-500">
        Written in plain language, in Spanish, based on your scan and history —
        not a generic pamphlet.
      </div>
    </CardScreen>
  );
}


function CareCost() {
  return (
    <CardScreen title="What this will cost" subtitle="Before you decide anything">
      <WireBox className="flex flex-col items-center py-6">
        <div className="text-3xl font-heading font-semibold">$0</div>
        <div className="text-xs text-neutral-500 mt-1">
          Fully covered by your plan
        </div>
      </WireBox>
      <div className="flex flex-col gap-2">
        {["Surgeon fees", "Facility fees", "Anesthesia"].map((row) => (
          <div key={row} className="flex items-center justify-between text-sm">
            <span className="text-neutral-700">{row}</span>
            <span className="text-neutral-500">$0</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-neutral-500 mt-auto">
        No surprise bills later — anything outside this gets flagged to you
        before it happens, not after.
      </div>
    </CardScreen>
  );
}

function CareReminder() {
  return (
    <ChatScreen
      title="Lantern"
      chips={["All set", "Need to reschedule"]}
    >
      <MessageBubble sender="ai">
        Your appointment with Dr. Reyes is in 2 days at 7am. Everything's
        set on our end. If anything's changed, or you need to move it, just
        tell me and I'll handle it.
      </MessageBubble>
    </ChatScreen>
  );
}

function CareDayOf() {
  return (
    <CardScreen title="Today: surgery day" subtitle="Dr. Reyes · 7:00am">
      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          WHAT DR. REYES'S TEAM KNOWS
        </div>
        <Placeholder lines={2} />
      </WireBox>
      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          WHAT LANTERN TOLD YOU
        </div>
        <Placeholder lines={2} />
      </WireBox>
      <div className="text-xs text-neutral-500">
        Same information, both sides — no conflicting instructions when you
        walk in.
      </div>
    </CardScreen>
  );
}

// ---------- Post-Care ----------

function PostcareCheckin() {
  return (
    <ChatScreen title="Lantern">
      <MessageBubble sender="ai">
        How's the incision looking today? A little redness is normal — a
        lot, or fever, isn't. Just tell me what you're seeing.
      </MessageBubble>
      <MessageBubble sender="member">
        looks ok i think, still sore
      </MessageBubble>
      <MessageBubble sender="ai">
        That tracks with day 4. I'll check back at the next point it's
        actually worth checking — not on a fixed schedule.
      </MessageBubble>
    </ChatScreen>
  );
}

function PostcareEscalation() {
  return (
    <ChatScreen title="Lantern">
      <MessageBubble sender="member">
        theres a lot more swelling today and it hurts more
      </MessageBubble>
      <MessageBubble sender="ai">
        That's worth a person, not me. Connecting you with your care
        navigator now — you'll know exactly who you're talking to.
      </MessageBubble>
      <MessageBubble sender="human">
        Hi Maria, this is Ana, your care navigator. I see what you flagged —
        let's get you seen today.
      </MessageBubble>
    </ChatScreen>
  );
}

// ---------- Case Closed ----------

function ClosedSummary() {
  return (
    <CardScreen title="You're through it" subtitle="Case closed">
      <WireBox className="flex flex-col gap-2">
        <div className="text-xs font-heading font-semibold text-neutral-500">
          WHAT HAPPENED
        </div>
        <Placeholder lines={3} />
      </WireBox>
      <div className="text-sm text-neutral-700">
        Full record saved. This conversation isn't going anywhere — come
        back anytime, for anything.
      </div>
    </CardScreen>
  );
}

function ClosedReentry() {
  return (
    <ChatScreen
      title="Lantern"
      chips={["Swollen and stiff", "Sharp pain bending", "Just aching"]}
    >
      <div className="text-center text-xs text-neutral-400 my-2">
        4 months later
      </div>
      <MessageBubble sender="member">
        hi, my knee has been bothering me now
      </MessageBubble>
      <MessageBubble sender="ai">
        Good to hear from you, Maria. I still have your full history from
        your back surgery — no need to start over. Tell me what's going on
        with your knee.
      </MessageBubble>
    </ChatScreen>
  );
}

export const SCREEN_COMPONENTS: Record<string, ComponentType<ScreenProps>> = {
  "learn-email": LearnEmail,
  "learn-outreach": LearnOutreach,
  "learn-confidence": LearnConfidence,
  "connect-setup": ConnectSetup,
  "connect-next-steps": ConnectNextSteps,
  "connect-tracker": ConnectTracker,
  "connect-recap": ConnectRecap,
  "care-education": CareEducation,
  "care-surgeon-comparison": CareSurgeonComparison,
  "care-recommendation": CareRecommendation,
  "care-cost": CareCost,
  "care-scheduling": CareScheduling,
  "care-reschedule": CareReschedule,
  "care-lockscreen": CareLockscreen,
  "care-reminder": CareReminder,
  "care-textmessage": CareTextMessage,
  "care-dayof": CareDayOf,
  "postcare-checkin": PostcareCheckin,
  "postcare-escalation": PostcareEscalation,
  "closed-summary": ClosedSummary,
  "closed-reentry": ClosedReentry,
  "profile": Profile,
  "past-chats": PastChats,
  "appointments": Appointments,
  "visit-summary": VisitSummary,
};
