import { notFound } from "next/navigation";
import PhoneFrame from "@/components/PhoneFrame";
import { STEPS } from "@/lib/journey";
import { SCREEN_COMPONENTS } from "@/screens/screens";

export function generateStaticParams() {
  return STEPS.map((s) => ({ id: s.id }));
}

export default async function JourneyScreenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const step = STEPS.find((s) => s.id === id);
  const Screen = step ? SCREEN_COMPONENTS[id] : null;

  if (!step || !Screen) notFound();

  return (
    <div className="flex-1 flex items-center justify-center bg-neutral-200 py-10">
      <PhoneFrame>
        <Screen />
      </PhoneFrame>
    </div>
  );
}
