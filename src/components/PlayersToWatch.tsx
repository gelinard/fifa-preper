import { Team } from "@/lib/mockData";
import { Star, Shield, Zap } from "lucide-react";

export default function PlayersToWatch({ homeTeam, awayTeam }: { homeTeam: Team; awayTeam: Team }) {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
        <span className="w-2 h-8 bg-sport-gold rounded-full inline-block"></span>
        Players to Watch
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Home Team Players */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-sport-accent border-b border-white/10 pb-2 mb-4">
            {homeTeam.name} Superstars
          </h4>
          {homeTeam.playersToWatch.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Away Team Players */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-sport-gold border-b border-white/10 pb-2 mb-4">
            {awayTeam.name} Superstars
          </h4>
          {awayTeam.playersToWatch.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player }: { player: any }) {
  return (
    <div className="glass-card p-5 rounded-xl flex gap-4 transition-all duration-300 hover:bg-sport-card-hover group">
      <div className="w-16 h-16 rounded-full bg-sport-dark border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-sport-gold/50 transition-colors">
        {/* Fallback to initials if no image */}
        <span className="font-bold text-sport-muted text-xl">{player.name.charAt(0)}</span>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-lg group-hover:text-sport-gold transition-colors">{player.name}</h5>
          <span className="text-xs font-semibold bg-sport-green/50 text-sport-accent px-2 py-1 rounded-md">
            {player.position}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-medium text-sport-muted mt-1 mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>{player.club}</span>
          <span className="opacity-50 mx-1">•</span>
          <span>{player.league}</span>
        </div>
        
        <p className="text-sm text-sport-text/80 leading-snug">
          {player.description}
        </p>
      </div>
    </div>
  );
}
