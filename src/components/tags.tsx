export type Sender = "ai" | "human" | "system" | "member";

const senderLabel: Record<Sender, string> = {
  ai: "Lantern AI",
  human: "Care Navigator",
  system: "Lantern",
  member: "Maria",
};

export function SenderTag({ sender }: { sender: Sender }) {
  if (sender === "member") return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-heading font-semibold text-neutral-500">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          sender === "human" ? "bg-neutral-900" : "bg-neutral-400"
        }`}
      />
      {senderLabel[sender]}
    </span>
  );
}
