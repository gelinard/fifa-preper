import { MatchHistory } from "@/lib/mockData";
import { History, Swords } from "lucide-react";

export default function HistoricalRivalry({ history }: { history: MatchHistory }) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-sport-danger rounded-full inline-block"></span>
        Historical Rivalry
      </h3>

      <div className="flex gap-4 items-start mb-6">
        <div className="mt-1 p-3 bg-sport-danger/20 rounded-xl text-sport-danger shrink-0">
          <History className="w-6 h-6" />
        </div>
        <div>
          {history.firstMeeting ? (
            <p className="text-sport-text font-medium leading-relaxed">
              <span className="text-sport-accent font-bold">Historic First Meeting!</span>{" "}
              {history.summary}
            </p>
          ) : (
            <p className="text-sport-text/90 leading-relaxed">
              {history.summary}
            </p>
          )}
        </div>
      </div>

      {!history.firstMeeting && history.memorableClashes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <h4 className="text-sm font-bold text-sport-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Swords className="w-4 h-4" /> Memorable Clashes
          </h4>
          <ul className="space-y-3">
            {history.memorableClashes.map((clash, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-sport-accent mt-0.5 opacity-70">❖</span>
                <span className="text-sport-text/80">{clash}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
