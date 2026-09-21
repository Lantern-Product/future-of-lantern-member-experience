export type View = "member" | "advocate";

const NAV_ITEMS: { id: View; label: string; description: string }[] = [
  {
    id: "member",
    label: "Member Experience",
    description: "Maria's journey",
  },
  {
    id: "advocate",
    label: "Care Advocate",
    description: "Member dashboard",
  },
];

export default function Sidebar({
  active,
  onSelect,
}: {
  active: View;
  onSelect: (view: View) => void;
}) {
  return (
    <div className="w-56 shrink-0 border-r border-neutral-300 bg-white flex flex-col py-6 px-3 gap-1">
      <div className="text-xs font-heading font-semibold uppercase tracking-wide text-neutral-400 px-2 mb-2">
        Prototype
      </div>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`text-left rounded-lg px-3 py-2 ${
            active === item.id
              ? "bg-neutral-900 text-white"
              : "text-neutral-800 hover:bg-neutral-100"
          }`}
        >
          <div className="text-sm font-heading font-semibold">
            {item.label}
          </div>
          <div
            className={`text-xs mt-0.5 ${
              active === item.id ? "text-neutral-300" : "text-neutral-500"
            }`}
          >
            {item.description}
          </div>
        </button>
      ))}
    </div>
  );
}
