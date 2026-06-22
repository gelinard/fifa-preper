import { fetchWorldCupMatches } from "@/lib/apiClient";
import { notFound } from "next/navigation";
import MatchPrepClient from "@/components/MatchPrepClient";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const matches = await fetchWorldCupMatches();
  const match = matches.find((m) => m.id === resolvedParams.id);

  if (!match) {
    notFound();
  }

  return <MatchPrepClient matchData={match} />;
}
