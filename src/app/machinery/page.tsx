import { client } from "@/sanity/lib/client";
import { machineryQuery } from "@/sanity/lib/queries";
import MachineryClient from "@/components/MachineryClient";

export const revalidate = 60;

const MOCK_MACHINERY = [
  {
    _id: "m1",
    pressName: "HEIDELBERG SPEEDMASTER CX 102",
    capacity: "16,500 sheets/hour",
    technicalSpecs: ["6 Colors", "Aqueous Coating", "UV Curable"],
    placeholderImageUrl: "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "m2",
    pressName: "KOMORI LITHRONE G40",
    capacity: "15,000 sheets/hour",
    technicalSpecs: ["8 Colors", "Perfector", "H-UV"],
    placeholderImageUrl: "https://images.unsplash.com/photo-1541695286523-2cb0cdeecb6d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "m3",
    pressName: "HP INDIGO 12000",
    capacity: "4,600 sheets/hour",
    technicalSpecs: ["Digital Offset", "7 Colors", "B2 Format"],
    placeholderImageUrl: "https://images.unsplash.com/photo-1601666496464-e1b99a6cf71b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "m4",
    pressName: "BOBST EXPERTCUT 106",
    capacity: "9,000 sheets/hour",
    technicalSpecs: ["Die-cutting", "Stripping", "Blanking"],
    placeholderImageUrl: "https://images.unsplash.com/photo-1565439390234-fc0db3f47c32?q=80&w=2070&auto=format&fit=crop",
  }
];

export default async function MachineryPage() {
  let machinery;
  try {
    machinery = await client.fetch(machineryQuery);
  } catch(e) {
    console.warn("Sanity fetch failed");
  }

  const activeMachinery = machinery?.length ? machinery : MOCK_MACHINERY;

  return <MachineryClient machinery={activeMachinery} />;
}
