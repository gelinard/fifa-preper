"use client";

import { Team, TeamSpotlight } from "@/lib/mockData";
import { Trophy, Zap, Newspaper } from "lucide-react";

export default function TeamTrivia({ homeTeam, awayTeam }: { homeTeam: Team; awayTeam: Team }) {
  return (
    <div className="mt-12 mb-16">
      <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
        <span className="w-2 h-8 bg-sport-accent rounded-full inline-block"></span>
        Team Spotlight & History
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Home Team Spotlights */}
        <div>
          <h4 className="font-bold text-lg text-sport-accent border-b border-white/10 pb-2 mb-6">
            {homeTeam.name} Spotlight
          </h4>
          <div className="space-y-4">
            {homeTeam.trivia && homeTeam.trivia.length > 0 ? (
              homeTeam.trivia.map((spotlight) => (
                <SpotlightCard key={spotlight.id} spotlight={spotlight} />
              ))
            ) : (
              <p className="text-sport-muted text-sm italic">No spotlight details loaded.</p>
            )}
          </div>
        </div>

        {/* Away Team Spotlights */}
        <div>
          <h4 className="font-bold text-lg text-sport-gold border-b border-white/10 pb-2 mb-6">
            {awayTeam.name} Spotlight
          </h4>
          <div className="space-y-4">
            {awayTeam.trivia && awayTeam.trivia.length > 0 ? (
              awayTeam.trivia.map((spotlight) => (
                <SpotlightCard key={spotlight.id} spotlight={spotlight} />
              ))
            ) : (
              <p className="text-sport-muted text-sm italic">No spotlight details loaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightCard({ spotlight }: { spotlight: TeamSpotlight }) {
  const getSpotlightIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('hist') || t.includes('milestone') || t.includes('past') || t.includes('champion') || t.includes('finish')) {
      return <Trophy className="w-5 h-5 text-sport-gold" />;
    }
    if (t.includes('tact') || t.includes('style') || t.includes('play') || t.includes('philosoph') || t.includes('formation') || t.includes('press')) {
      return <Zap className="w-5 h-5 text-sport-accent" />;
    }
    return <Newspaper className="w-5 h-5 text-sport-muted" />;
  };

  return (
    <div className="glass-card p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex gap-4 items-start">
      <div className="p-3 bg-sport-dark/80 rounded-lg shrink-0 border border-white/5">
        {getSpotlightIcon(spotlight.title)}
      </div>
      <div>
        <h5 className="font-bold text-sm tracking-wide text-sport-text mb-1.5 uppercase">
          {spotlight.title}
        </h5>
        <p className="text-sm text-sport-muted leading-relaxed">
          {spotlight.content}
        </p>
      </div>
    </div>
  );
}
