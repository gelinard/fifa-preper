import { mockMatches } from "@/lib/mockData";
import { notFound } from "next/navigation";
import MatchPrepClient from "@/components/MatchPrepClient";

export function generateStaticParams() {
  return mockMatches.map((match) => ({
    id: match.id,
  }));
}

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const match = mockMatches.find((m) => m.id === resolvedParams.id);

  if (!match) {
    notFound();
  }

  return <MatchPrepClient matchData={match} />;
}
