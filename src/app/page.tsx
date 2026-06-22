import DashboardClient from "@/components/DashboardClient";
import { fetchWorldCupMatches } from "@/lib/apiClient";
import { Trophy } from "lucide-react";

export default async function Home() {
  const matches = await fetchWorldCupMatches();

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 flex items-center justify-center md:justify-start gap-4">
          <Trophy className="w-10 h-10 md:w-12 md:h-12 text-sport-gold" />
          <span>Match <span className="text-sport-accent">Prep</span> 2026</span>
        </h1>
        <p className="text-sport-muted text-lg max-w-2xl">
          Your ultimate companion for the FIFA World Cup 2026. Get live scores, stats, win probabilities, historical rivalries, and team spotlights.
        </p>
      </header>

      <section>
        <DashboardClient initialMatches={matches} />
      </section>
    </main>
  );
}
