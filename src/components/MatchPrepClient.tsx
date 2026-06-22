"use client";

import { useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import MatchupHeader from "@/components/MatchupHeader";
import RankingAndForm from "@/components/RankingAndForm";
import PredictionBar from "@/components/PredictionBar";
import HistoricalRivalry from "@/components/HistoricalRivalry";
import PlayersToWatch from "@/components/PlayersToWatch";
import TeamTrivia from "@/components/TeamTrivia";
import { Match } from "@/lib/mockData";

// Define the schema to match what the API streams (using title and content for spotlights)
const matchSchema = z.object({
  history: z.object({
    summary: z.string(),
    firstMeeting: z.boolean(),
    memorableClashes: z.array(z.string())
  }),
  homePlayersToWatch: z.array(z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    club: z.string(),
    league: z.string(),
    description: z.string()
  })),
  awayPlayersToWatch: z.array(z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    club: z.string(),
    league: z.string(),
    description: z.string()
  })),
  homeTrivia: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
  })),
  awayTrivia: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
  })),
  winProbability: z.object({
    home: z.number(),
    draw: z.number(),
    away: z.number()
  })
});

export default function MatchPrepClient({ matchData }: { matchData: Match }) {
  const isUndecided = matchData.homeTeam.flagCode === "TBD" || matchData.awayTeam.flagCode === "TBD";

  const { object, submit, isLoading } = useObject({
    api: "/api/match-prep",
    schema: matchSchema,
  });

  // Automatically start the streaming when the component mounts and the matchup is decided
  useEffect(() => {
    if (isUndecided) return;

    submit({
      homeTeam: matchData.homeTeam.name,
      awayTeam: matchData.awayTeam.name
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUndecided]);

  if (isUndecided) {
    return (
      <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sport-muted hover:text-sport-accent transition-colors mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <div className="glass-card p-12 rounded-3xl border border-white/5 max-w-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sport-accent"></div>
          <h2 className="text-3xl font-black mb-4">Matchup Not Yet Decided</h2>
          <p className="text-sport-muted leading-relaxed mb-6">
            The qualified teams for this knockout stage match are still being determined. Once the group stage matches finish and standings are locked, the teams will be scheduled, and AI Match Prep details will be generated.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-sport-accent text-sport-dark font-extrabold px-6 py-3 rounded-xl hover:bg-sport-accent/80 transition-colors shadow-lg shadow-sport-accent/20"
          >
            Check Schedule
          </Link>
        </div>
      </main>
    );
  }

  // Use the streaming object to override initial data where available
  const history = object?.history ? {
    summary: object.history.summary || "",
    firstMeeting: object.history.firstMeeting || false,
    memorableClashes: object.history.memorableClashes || []
  } : matchData.history;

  const winProbability = object?.winProbability ? {
    home: object.winProbability.home || 33,
    draw: object.winProbability.draw || 33,
    away: object.winProbability.away || 34
  } : matchData.winProbability;

  const homeTeam = {
    ...matchData.homeTeam,
    playersToWatch: object?.homePlayersToWatch || matchData.homeTeam.playersToWatch,
    trivia: object?.homeTrivia || matchData.homeTeam.trivia
  };

  const awayTeam = {
    ...matchData.awayTeam,
    playersToWatch: object?.awayPlayersToWatch || matchData.awayTeam.playersToWatch,
    trivia: object?.awayTrivia || matchData.awayTeam.trivia
  };

  // Construct the full match to pass to subcomponents
  const fullMatch = {
    ...matchData,
    history,
    winProbability,
    homeTeam,
    awayTeam
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sport-muted hover:text-sport-accent transition-colors mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{matchData.status === 'completed' ? 'Match Center' : 'Match Prep'}</h2>
        {isLoading && (
          <div className="flex items-center gap-2 text-sport-accent text-sm font-semibold bg-sport-green/20 px-4 py-2 rounded-full border border-sport-green/30">
            <Loader2 className="w-4 h-4 animate-spin" />
            AI Generating Insights...
          </div>
        )}
      </div>

      <MatchupHeader match={fullMatch as any} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-sport-muted uppercase tracking-wider mb-2">
            {homeTeam.name} Overview
          </h3>
          <RankingAndForm team={homeTeam as any} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-sport-muted uppercase tracking-wider mb-2">
            {awayTeam.name} Overview
          </h3>
          <RankingAndForm team={awayTeam as any} />
        </div>
      </div>

      <PredictionBar match={fullMatch as any} />
      
      <HistoricalRivalry history={history as any} />
      
      <PlayersToWatch homeTeam={homeTeam as any} awayTeam={awayTeam as any} />
      
      <TeamTrivia homeTeam={homeTeam as any} awayTeam={awayTeam as any} />
    </main>
  );
}
