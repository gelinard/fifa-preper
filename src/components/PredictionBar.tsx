import { Match } from "@/lib/mockData";

export default function PredictionBar({ match }: { match: Match }) {
  const { home, draw, away } = match.winProbability;

  return (
    <div className="glass-card p-6 rounded-2xl my-8">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-sport-accent rounded-full inline-block"></span>
        AI Win Probability
      </h3>
      
      <div className="relative h-4 w-full rounded-full overflow-hidden flex mb-4 border border-white/10 shadow-inner">
        <div 
          className="bg-sport-accent h-full transition-all duration-1000 ease-out"
          style={{ width: `${home}%` }}
        />
        <div 
          className="bg-sport-muted h-full transition-all duration-1000 ease-out"
          style={{ width: `${draw}%` }}
        />
        <div 
          className="bg-sport-gold h-full transition-all duration-1000 ease-out"
          style={{ width: `${away}%` }}
        />
      </div>

      <div className="flex justify-between text-sm font-bold mt-4">
        <div className="flex flex-col items-start w-1/3">
          <span className="text-sport-accent">{home}%</span>
          <span className="text-sport-muted uppercase tracking-wider text-xs">{match.homeTeam.name}</span>
        </div>
        <div className="flex flex-col items-center w-1/3 border-l border-r border-white/5">
          <span className="text-sport-text">{draw}%</span>
          <span className="text-sport-muted uppercase tracking-wider text-xs">Draw</span>
        </div>
        <div className="flex flex-col items-end w-1/3">
          <span className="text-sport-gold">{away}%</span>
          <span className="text-sport-muted uppercase tracking-wider text-xs">{match.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}
