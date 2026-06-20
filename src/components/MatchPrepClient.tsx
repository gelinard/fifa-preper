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

// Define the schema to match what the API streams
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
    question: z.string(),
    answer: z.string()
  })),
  awayTrivia: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string()
  })),
  winProbability: z.object({
    home: z.number(),
    draw: z.number(),
    away: z.number()
  })
});

export default function MatchPrepClient({ matchData }: { matchData: Match }) {
  const { object, submit, isLoading } = useObject({
    api: "/api/match-prep",
    schema: matchSchema,
  });

  // Automatically start the streaming when the component mounts
  useEffect(() => {
    submit({
      homeTeam: matchData.homeTeam.name,
      awayTeam: matchData.awayTeam.name
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use the streaming object to override the initial mockData
  // If object is partially loading, use its values, falling back to empty/mock values as needed
  
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

  // We need to construct the full match to pass to some components
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
        <h2 className="text-2xl font-bold">Match Prep</h2>
        {isLoading && (
          <div className="flex items-center gap-2 text-sport-accent text-sm font-semibold bg-sport-green/20 px-4 py-2 rounded-full">
            <Loader2 className="w-4 h-4 animate-spin" />
            AI Generating Insights...
          </div>
        )}
      </div>

      <MatchupHeader match={fullMatch as any} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-sport-muted uppercase tracking-wider mb-2">
            {homeTeam.name} Overview
          </h3>
          <RankingAndForm team={homeTeam as any} />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-sport-muted uppercase tracking-wider mb-2">
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
