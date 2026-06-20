"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Match } from "@/lib/mockData";
import { useState, useEffect } from "react";

// Quick formatting helper
const formatMatchTime = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  }).format(date);
};

export default function MatchCard({ match }: { match: Match }) {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    setLocalTime(formatMatchTime(match.kickoffTime));
  }, [match.kickoffTime]);

  return (
    <Link href={`/match/${match.id}`} className="block group">
      <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:bg-sport-card-hover hover:scale-[1.02] border border-white/5 hover:border-sport-accent/30 shadow-lg relative overflow-hidden">
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sport-green via-sport-accent to-sport-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold tracking-wider text-sport-accent uppercase bg-sport-green/30 px-3 py-1 rounded-full">
            {match.groupOrStage}
          </span>
          <div className="flex items-center text-sport-muted text-sm font-medium">
            <Clock className="w-4 h-4 mr-1.5" />
            {localTime || "Calculating time..."}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 rounded-full bg-sport-dark flex items-center justify-center text-2xl mb-3 border-2 border-white/10 group-hover:border-sport-accent/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               {/* In a real app, use next/image with actual flags. Using flagCode placeholder for now */}
               {match.homeTeam.flagCode}
            </div>
            <span className="font-bold text-lg text-center tracking-tight">{match.homeTeam.name}</span>
          </div>

          <div className="flex flex-col items-center px-6">
            <span className="text-2xl font-black italic text-sport-muted opacity-50">VS</span>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 rounded-full bg-sport-dark flex items-center justify-center text-2xl mb-3 border-2 border-white/10 group-hover:border-sport-accent/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               {match.awayTeam.flagCode}
            </div>
            <span className="font-bold text-lg text-center tracking-tight">{match.awayTeam.name}</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between text-sm text-sport-muted/80">
           <div className="flex items-center gap-1">
             <MapPin className="w-3.5 h-3.5" /> FIFA World Cup 2026
           </div>
           <div className="text-sport-accent group-hover:text-sport-accent/80 font-semibold transition-colors flex items-center">
             Match Prep &rarr;
           </div>
        </div>
      </div>
    </Link>
  );
}
