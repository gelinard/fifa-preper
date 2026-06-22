"use client";

import { useEffect, useState } from "react";
import { Match } from "@/lib/mockData";

export default function MatchupHeader({ match }: { match: Match }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    if (match.status !== 'upcoming') return;

    const calculateTimeLeft = () => {
      const difference = new Date(match.kickoffTime).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [match.kickoffTime, match.status]);

  const renderFlag = (flagCode: string) => {
    if (flagCode === "TBD") {
      return <span className="text-sport-muted font-black opacity-60">?</span>;
    }
    return flagCode;
  };

  const isHomePlaceholder = match.homeTeam.flagCode === "TBD";
  const isAwayPlaceholder = match.awayTeam.flagCode === "TBD";

  return (
    <div className="relative py-16 mb-8 bg-sport-green/20 rounded-3xl overflow-hidden border border-sport-green/30">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sport-accent rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-sport-gold rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <span className="text-sport-gold font-bold tracking-widest uppercase mb-8 flex items-center gap-2 text-sm bg-sport-dark/50 px-4 py-1.5 rounded-full border border-sport-gold/20">
          <span className="w-2 h-2 rounded-full bg-sport-gold animate-pulse"></span>
          {match.groupOrStage}
        </span>

        <div className="flex items-center justify-center w-full max-w-4xl">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sport-dark flex items-center justify-center text-4xl sm:text-5xl font-black border-4 shadow-[0_0_30px_rgba(57,255,20,0.2)] ${
              isHomePlaceholder ? 'border-white/5' : 'border-sport-accent/30'
            }`}>
              {renderFlag(match.homeTeam.flagCode)}
            </div>
            <h1 className={`text-2xl sm:text-4xl font-black mt-4 tracking-tight text-center ${
              isHomePlaceholder ? 'text-sport-muted' : 'text-sport-text'
            }`}>
              {match.homeTeam.name}
            </h1>
            
            {/* Goalscorers */}
            {match.homeScorers && match.homeScorers.length > 0 && (
              <div className="mt-3 text-xs sm:text-sm text-sport-muted/90 text-center space-y-1">
                {match.homeScorers.map((scorer, i) => (
                  <div key={i} className="flex items-center justify-center gap-1.5 font-medium">
                    <span>⚽</span>
                    <span>{scorer}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Score or VS Badge */}
          <div className="mx-4 sm:mx-8 flex flex-col items-center">
             {match.status !== 'upcoming' && match.score ? (
               <div className="text-4xl sm:text-6xl font-black tracking-wider text-shadow-glow text-sport-text px-4 py-2 bg-sport-dark/40 rounded-2xl border border-white/5">
                 {match.score.home} - {match.score.away}
               </div>
             ) : (
               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-sport-dark flex items-center justify-center border-2 border-sport-muted text-xl sm:text-2xl font-black italic shadow-lg">
                 VS
               </div>
             )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sport-dark flex items-center justify-center text-4xl sm:text-5xl font-black border-4 shadow-[0_0_30px_rgba(57,255,20,0.2)] ${
              isAwayPlaceholder ? 'border-white/5' : 'border-sport-accent/30'
            }`}>
              {renderFlag(match.awayTeam.flagCode)}
            </div>
            <h1 className={`text-2xl sm:text-4xl font-black mt-4 tracking-tight text-center ${
              isAwayPlaceholder ? 'text-sport-muted' : 'text-sport-text'
            }`}>
              {match.awayTeam.name}
            </h1>
            
            {/* Goalscorers */}
            {match.awayScorers && match.awayScorers.length > 0 && (
              <div className="mt-3 text-xs sm:text-sm text-sport-muted/90 text-center space-y-1">
                {match.awayScorers.map((scorer, i) => (
                  <div key={i} className="flex items-center justify-center gap-1.5 font-medium">
                    <span>⚽</span>
                    <span>{scorer}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Countdown Timer / Match Status */}
        {match.status === 'upcoming' ? (
          timeLeft && (
            <div className="mt-12 flex items-center gap-3 sm:gap-6 bg-sport-dark/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
              <TimeUnit value={timeLeft.d} label="Days" />
              <span className="text-2xl font-bold text-sport-accent/50">:</span>
              <TimeUnit value={timeLeft.h} label="Hours" />
              <span className="text-2xl font-bold text-sport-accent/50">:</span>
              <TimeUnit value={timeLeft.m} label="Mins" />
              <span className="text-2xl font-bold text-sport-accent/50">:</span>
              <TimeUnit value={timeLeft.s} label="Secs" />
            </div>
          )
        ) : match.status === 'live' ? (
          <div className="mt-12 bg-sport-danger/20 border border-sport-danger/30 text-sport-danger font-black tracking-widest px-8 py-3 rounded-full animate-pulse flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-sport-danger animate-ping"></span>
            <span>LIVE MATCH IN PROGRESS</span>
          </div>
        ) : (
          <div className="mt-12 bg-white/5 border border-white/10 text-sport-muted font-bold tracking-wider px-8 py-3 rounded-full text-sm">
            FULL TIME &bull; FINAL RESULT
          </div>
        )}
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center w-12 sm:w-16">
      <span className="text-2xl sm:text-4xl font-black text-sport-text tabular-nums text-shadow-glow">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs text-sport-muted uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );
}
