import MatchCard from "@/components/MatchCard";
import { mockMatches } from "@/lib/mockData";
import { Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 flex items-center justify-center md:justify-start gap-4">
          <Trophy className="w-10 h-10 md:w-12 md:h-12 text-sport-gold" />
          <span>Match <span className="text-sport-accent">Prep</span> 2026</span>
        </h1>
        <p className="text-sport-muted text-lg max-w-2xl">
          Your ultimate companion for the upcoming FIFA World Cup. Get stats, win probabilities, historical rivalries, and player spotlights before kickoff.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-sport-accent rounded-full inline-block"></span>
            Upcoming Matches
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...mockMatches]
            .sort((a, b) => new Date(a.kickoffTime).getTime() - new Date(b.kickoffTime).getTime())
            .map((match) => (
              <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}
