"use client";

import Link from "next/link";
import { Clock, MapPin, Play } from "lucide-react";
import { Match } from "@/lib/mockData";
import { useState, useEffect } from "react";

// Formatting helper
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

  const isUndecided = match.homeTeam.flagCode === "TBD" || match.awayTeam.flagCode === "TBD";

  const renderFlag = (flagCode: string) => {
    if (flagCode === "TBD") {
      return (
        <span className="text-sport-muted text-lg font-bold opacity-60">?</span>
      );
    }
    return <span className="font-black text-sport-text">{flagCode}</span>;
  };

  const cardContent = (
    <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:bg-sport-card-hover hover:scale-[1.02] border border-white/5 hover:border-sport-accent/30 shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
      {/* Accent Top Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 transition-opacity ${
        match.status === 'live' 
          ? 'bg-sport-danger opacity-100'
          : 'bg-gradient-to-r from-sport-green via-sport-accent to-sport-green opacity-0 group-hover:opacity-100'
      }`}></div>
      
      <div>
        <div className="flex justify-between items-center mb-5">
          <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${
            match.status === 'live' 
              ? 'bg-sport-danger/20 text-sport-danger border border-sport-danger/30'
              : match.status === 'completed'
              ? 'bg-white/10 text-sport-muted border border-white/5'
              : 'bg-sport-green/30 text-sport-accent border border-sport-green/20'
          }`}>
            {match.groupOrStage}
          </span>
          
          <div className="flex items-center text-sport-muted text-xs font-semibold">
            {match.status === 'live' ? (
              <span className="flex items-center gap-1.5 text-sport-danger font-black animate-pulse">
                <span className="w-2 h-2 rounded-full bg-sport-danger"></span>
                LIVE NOW
              </span>
            ) : match.status === 'completed' ? (
              <span className="text-sport-muted font-bold">FINISHED</span>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 mr-1.5 text-sport-accent" />
                {localTime || "Calculating time..."}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between my-4">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1 max-w-[40%]">
            <div className={`w-14 h-14 rounded-full bg-sport-dark flex items-center justify-center text-lg mb-3 border-2 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
              isUndecided ? 'border-white/5' : 'border-white/10 group-hover:border-sport-accent/50'
            }`}>
              {renderFlag(match.homeTeam.flagCode)}
            </div>
            <span className={`font-bold text-sm text-center tracking-tight line-clamp-2 leading-tight ${
              isUndecided ? 'text-sport-muted' : 'text-sport-text'
            }`}>
              {match.homeTeam.name}
            </span>
          </div>

          {/* Score or VS */}
          <div className="flex flex-col items-center px-2 flex-1 justify-center">
            {match.status !== 'upcoming' && match.score ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-wider text-shadow-glow text-sport-text">
                  {match.score.home} - {match.score.away}
                </span>
                {match.status === 'live' && (
                  <span className="text-[10px] font-black text-sport-danger tracking-widest mt-1 uppercase flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    LIVE
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xl font-black italic text-sport-muted opacity-40">VS</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1 max-w-[40%]">
            <div className={`w-14 h-14 rounded-full bg-sport-dark flex items-center justify-center text-lg mb-3 border-2 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
              isUndecided ? 'border-white/5' : 'border-white/10 group-hover:border-sport-accent/50'
            }`}>
              {renderFlag(match.awayTeam.flagCode)}
            </div>
            <span className={`font-bold text-sm text-center tracking-tight line-clamp-2 leading-tight ${
              isUndecided ? 'text-sport-muted' : 'text-sport-text'
            }`}>
              {match.awayTeam.name}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-xs text-sport-muted/80 items-center">
        <div className="flex items-center gap-1 font-medium">
          <MapPin className="w-3.5 h-3.5 text-sport-accent" /> 
          <span className="truncate max-w-[150px]">{match.venue || "FIFA WC 2026"}</span>
        </div>
        
        {isUndecided ? (
          <span className="text-[10px] font-bold text-white/20 bg-white/5 px-2 py-1 rounded">
            Awaiting Matchup
          </span>
        ) : (
          <span className="text-sport-accent group-hover:text-sport-accent/80 font-bold transition-colors flex items-center gap-0.5">
            {match.status === 'completed' ? 'Match Center' : 'Match Prep'} &rarr;
          </span>
        )}
      </div>
    </div>
  );

  if (isUndecided) {
    return <div className="block h-full cursor-not-allowed opacity-75">{cardContent}</div>;
  }

  return (
    <Link href={`/match/${match.id}`} className="block group h-full">
      {cardContent}
    </Link>
  );
}
