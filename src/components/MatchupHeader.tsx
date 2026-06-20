"use client";

import { useEffect, useState } from "react";
import { Match } from "@/lib/mockData";

export default function MatchupHeader({ match }: { match: Match }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
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
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); // Match started
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [match.kickoffTime]);

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
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sport-dark flex items-center justify-center text-4xl sm:text-5xl font-black border-4 border-sport-accent/30 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
              {match.homeTeam.flagCode}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mt-4 tracking-tight text-center">
              {match.homeTeam.name}
            </h1>
          </div>

          {/* VS Badge */}
          <div className="mx-4 sm:mx-8 flex flex-col items-center">
             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-sport-dark flex items-center justify-center border-2 border-sport-muted text-xl sm:text-2xl font-black italic shadow-lg">
               VS
             </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-sport-dark flex items-center justify-center text-4xl sm:text-5xl font-black border-4 border-sport-accent/30 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
              {match.awayTeam.flagCode}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mt-4 tracking-tight text-center">
              {match.awayTeam.name}
            </h1>
          </div>
        </div>

        {/* Countdown Timer */}
        {timeLeft && (
          <div className="mt-12 flex items-center gap-3 sm:gap-6 bg-sport-dark/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
            <TimeUnit value={timeLeft.d} label="Days" />
            <span className="text-2xl font-bold text-sport-accent/50">:</span>
            <TimeUnit value={timeLeft.h} label="Hours" />
            <span className="text-2xl font-bold text-sport-accent/50">:</span>
            <TimeUnit value={timeLeft.m} label="Mins" />
            <span className="text-2xl font-bold text-sport-accent/50">:</span>
            <TimeUnit value={timeLeft.s} label="Secs" />
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
