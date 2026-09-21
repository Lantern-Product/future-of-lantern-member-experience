import { ReactNode } from "react";
import { Sender, SenderTag } from "./tags";

export default function MessageBubble({
  sender,
  children,
}: {
  sender: Sender;
  children: ReactNode;
}) {
  const isMember = sender === "member";
  return (
    <div className={`flex flex-col gap-1 ${isMember ? "items-end" : "items-start"}`}>
      <SenderTag sender={sender} />
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
          isMember
            ? "bg-neutral-900 text-white rounded-br-sm"
            : "bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-bl-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
