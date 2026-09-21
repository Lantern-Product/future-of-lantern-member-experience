# The Future of Lantern — Member Experience Prototype

## Purpose
Low-fidelity, click-through prototype dramatizing Maria Delgado's surgical care journey as described in the PRFAQ (`Kelly Miller, Aug 2026`). Goal is to make the five bets and the "what Maria never experiences again" spec tangible enough to react to — not a production UI.

This is a **wireframe**, not a visual design. Grayscale only, low-fidelity shapes (boxes, lines, placeholder text/icons), no color, no imagery, no polish. The point is to test flow, structure, and the *feel* of the bets — not aesthetics.

## Source material
- PRFAQ: "The Future of the Lantern Member Experience, 2030" (pasted into this conversation, not yet saved as a file in-repo — see open question below)
- Five bets (Appendix A): proactive inference, channel choice / no human required, inferring the unsaid, permanent memory, acting before confirmation
- "What's Always Going to Be True" — five journey phases used as our screen groupings

## Decisions locked in
| Area | Decision |
|---|---|
| Platform | Native-mobile-first look, built as a web app (mobile-frame simulated, not a real native app or React Native) |
| Framework | Next.js + Tailwind CSS |
| Visual style | Low-fidelity wireframe, grayscale only |
| Typography | Poppins for headers, DM Sans for body |
| Scope | Full journey — all key PRFAQ moments, not just a slice |
| Interactivity | Simulated chat + light state (scripted bot messages, a journey-stage variable driving what's visible), plus traditional navigable app screens |
| UI metaphor (v1) | Traditional app screens (home/tabs/detail views) — **not** the chat-thread-as-primary-UI. Chat-thread-as-spine is an explicitly deferred v2 (see below) |
| Screen structure | Grouped by the 5 "Always Going to Be True" journey phases, each containing sub-states/screens for the specific PRFAQ beats within it |
| Bet visibility | Annotate wireframes with (a) AI vs. human indicator on every message/interaction, (b) an autonomy-posture tag: **Lantern acted** / **Lantern suggests** / **Your decision** |

## Deferred / v2 (explicitly out of scope for now)
- Chat-thread-as-primary-interface version (the PRFAQ's actual channel-agnostic vision — "no app, one continuous thread"). Kelly wants to see this eventually; building traditional screens first as the foundation.
- Real backend, real state persistence, real auth
- Visual design system / color / branding
- Multi-persona dial variations (Silicon Valley exec, Manhattan vs. rural Colorado, frightened vs. logistics-driven) — FAQ #11. Maria is the only persona for v1.

## Proposed screen map (by journey phase)

### 1. Learn (member discovers/evaluates Lantern)
- Proactive outreach message (the "reach her before she asks" moment — arrives in Maria's preferred language, non-scheduled trigger)
- Quick "can Lantern help me" confidence-building response

### 2. Connect (onboarding without overwhelm)
- Setup / first response flow — no re-explaining, no long intake form
- "Here's what happens next" confirmation
- End-of-session recap ("here's what we accomplished, here's what's next")

### 3. Receive Care (the bulk of the journey — most sub-states)
- Ambient education (personalized, not generic pamphlet)
- Surgeon comparison (appears when she's ready, not on a fixed day)
- Lantern's recommendation + reasoning shown (nudge posture)
- Cost transparency screen (shown before commitment, not after)
- Scheduling / paperwork handled automatically (act-for-her posture, reversible in one tap)
- Reschedule flow (journey "steps back" with her — sick kid scenario)
- Pre-appointment reminder (2 days out)
- Day-of: alignment with provider's own team, no conflicting info

### 4. Post-Care
- Recovery check-ins triggered by state, not fixed schedule
- "Is this normal" moment-based support

### 5. Case Closed
- Explicit closure screen ("you're through it," full record, thread stays open)
- Re-entry moment (member returns later, no re-explaining) — demonstrates permanent memory bet

## Wireframe conventions to establish
- **AI vs. human indicator**: small label/icon on every message or card (e.g. "Lantern AI" vs "Care Navigator — [Name]")
- **Autonomy posture tag**: every proactive action or suggestion tagged as one of:
  - `Lantern acted` (reversible action already taken, one-tap undo shown)
  - `Lantern suggests` (recommendation + reasoning, member decides)
  - `Your decision` (irreversible/emotional, Lantern waits)
- **Journey-stage state**: a simple variable (e.g. `journeyStage`) drives which chat messages/screens are "unlocked" — used to simulate the state-based (not calendar-based) triggering described in the PRFAQ

## Additional decisions
| Area | Decision |
|---|---|
| PRFAQ source text | Not stored in-repo — background context only, not pulled into the app |
| FAQ/bets rationale | Lives in this plan doc, not the UI. May inform annotation copy (e.g. autonomy-posture tag wording) where it naturally fits, but no dedicated "why this screen" UI layer |
| Grid | 8px grid for spacing/layout |
| Audience | Internal stakeholder review — should support a guided, narrative click-through rather than open-ended free exploration |
| Target viewport | Standard iPhone viewport only (single size, no responsive range) |
