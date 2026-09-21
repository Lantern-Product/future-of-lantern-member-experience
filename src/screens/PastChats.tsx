import { CardScreen, WireBox } from "@/components/ScreenShell";

const CHATS = [
  {
    title: "Lower back pain & surgery",
    status: "Closed",
    date: "Resolved Nov 2026",
  },
  {
    title: "Knee pain",
    status: "Open",
    date: "Started Mar 2027",
  },
];

export default function PastChats() {
  return (
    <CardScreen
      title="Past chats"
      subtitle="Every conversation, kept — nothing to start over"
    >
      <div className="flex flex-col gap-3">
        {CHATS.map((chat) => (
          <WireBox key={chat.title} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-heading font-semibold">
                {chat.title}
              </span>
              <span className="text-xs border border-neutral-400 rounded-full px-2 py-0.5 text-neutral-600">
                {chat.status}
              </span>
            </div>
            <span className="text-xs text-neutral-500">{chat.date}</span>
          </WireBox>
        ))}
      </div>
      <div className="text-xs text-neutral-500 mt-auto">
        Illustrative — represents Maria's full history across episodes, not
        just this one.
      </div>
    </CardScreen>
  );
}
