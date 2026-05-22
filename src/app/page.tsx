import { client } from "@/sanity/lib/client";
import { heroQuery, machineryQuery, servicesQuery } from "@/sanity/lib/queries";
import HomeClient from "@/components/HomeClient";

// Revalidate every 60 seconds
export const revalidate = 60;

const MOCK_HERO = {
  headline: "AURORA FINE ARTS.",
  subheadline: "A 35-year legacy of industrial printing. Precision, power, and absolute perfection.",
  backgroundMediaUrl: "https://images.unsplash.com/photo-1598301257982-0cf014dff33b?q=80&w=2070&auto=format&fit=crop",
};

const MOCK_SERVICES = [
  {
    _id: "1",
    title: "OFFSET PRINTING",
    description: "High-volume, impeccable color fidelity. The industrial standard.",
    icon: "O/P",
    hoverImageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "2",
    title: "CUSTOM PACKAGING",
    description: "Structural design meeting premium finishing.",
    icon: "C/P",
    hoverImageUrl: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=2071&auto=format&fit=crop",
  },
  {
    _id: "3",
    title: "FINE BINDING",
    description: "Smyth sewing, perfect binding, and foil stamping.",
    icon: "F/B",
    hoverImageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
  },
];

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
];

export default async function Home() {
  let hero, services, machinery;

  try {
    hero = await client.fetch(heroQuery);
    services = await client.fetch(servicesQuery);
    machinery = await client.fetch(machineryQuery);
  } catch (e) {
    console.warn("Sanity fetch failed, using mock data.");
  }

  // Fallback to mock data if empty (e.g. project uninitialized)
  const activeHero = hero || MOCK_HERO;
  const activeServices = services?.length ? services : MOCK_SERVICES;
  const activeMachinery = machinery?.length ? machinery : MOCK_MACHINERY;

  return (
    <HomeClient 
      hero={activeHero} 
      services={activeServices} 
      machinery={activeMachinery} 
    />
  );
}
