import { Team } from "@/lib/mockData";
import { Trophy, TrendingUp } from "lucide-react";

export default function RankingAndForm({ team }: { team: Team }) {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-3 bg-sport-green/30 rounded-lg text-sport-accent">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm text-sport-muted uppercase tracking-wider font-semibold">FIFA Ranking</div>
          <div className="text-2xl font-black">#{team.fifaRanking}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-3 bg-sport-green/30 rounded-lg text-sport-accent">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm text-sport-muted uppercase tracking-wider font-semibold">Standing</div>
          <div className="text-lg font-bold">{team.tournamentStanding}</div>
        </div>
      </div>

      <div>
        <div className="text-sm text-sport-muted uppercase tracking-wider font-semibold mb-3">Recent Form</div>
        <div className="flex gap-2">
          {team.form.map((result, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                result === 'W' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                result === 'D' ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
