"use client";

import { useState, useMemo, useEffect } from "react";
import { Match } from "@/lib/mockData";
import MatchCard from "./MatchCard";
import { Search, Calendar, History, Play, ShieldAlert, Loader2 } from "lucide-react";

interface DashboardClientProps {
  initialMatches: Match[];
}

export default function DashboardClient({ initialMatches }: DashboardClientProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [isLoading, setIsLoading] = useState(initialMatches.length === 0);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('upcoming');
  const [stageFilter, setStageFilter] = useState<'all' | 'group' | 'knockout'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadMatches() {
      if (matches.length === 0) {
        setIsLoading(true);
      }
      
      try {
        // 1. Try local API proxy first
        const res = await fetch("/api/matches");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMatches(data);
            setError(null);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Local API proxy failed, falling back to direct API fetch...", err);
      }

      // 2. Direct external API fallback
      try {
        const { fetchWorldCupMatches } = await import("@/lib/apiClient");
        const data = await fetchWorldCupMatches();
        if (Array.isArray(data) && data.length > 0) {
          setMatches(data);
          setError(null);
        } else if (matches.length === 0) {
          setError("No match data returned from the API.");
        }
      } catch (err) {
        console.error("Direct API fetch failed:", err);
        if (matches.length === 0) {
          setError("Failed to load matches. Please check your internet connection.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMatches();
    const interval = setInterval(loadMatches, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, [matches.length]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // 1. Status Filter
      if (match.status !== activeTab) return false;

      // 2. Stage Filter
      const isKnockout = match.groupOrStage.toLowerCase().includes("round") || 
                         match.groupOrStage.toLowerCase().includes("quarter") || 
                         match.groupOrStage.toLowerCase().includes("semi") || 
                         match.groupOrStage.toLowerCase().includes("third") || 
                         match.groupOrStage.toLowerCase().includes("final");
      
      if (stageFilter === 'group' && isKnockout) return false;
      if (stageFilter === 'knockout' && !isKnockout) return false;

      // 3. Search Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const homeName = match.homeTeam.name.toLowerCase();
        const awayName = match.awayTeam.name.toLowerCase();
        const homeLabel = match.homeTeamLabel?.toLowerCase() || "";
        const awayLabel = match.awayTeamLabel?.toLowerCase() || "";
        const stage = match.groupOrStage.toLowerCase();

        return homeName.includes(query) || 
               awayName.includes(query) || 
               homeLabel.includes(query) || 
               awayLabel.includes(query) ||
               stage.includes(query);
      }

      return true;
    });
  }, [matches, activeTab, stageFilter, searchQuery]);

  // Sort matches accordingly
  const sortedMatches = useMemo(() => {
    return [...filteredMatches].sort((a, b) => {
      const timeA = new Date(a.kickoffTime).getTime();
      const timeB = new Date(b.kickoffTime).getTime();
      
      if (activeTab === 'completed') {
        // Show most recent results first
        return timeB - timeA;
      }
      // Show earliest upcoming/live matches first
      return timeA - timeB;
    });
  }, [filteredMatches, activeTab]);

  // Count matches in each tab for badges
  const tabCounts = useMemo(() => {
    return {
      live: matches.filter(m => m.status === 'live').length,
      upcoming: matches.filter(m => m.status === 'upcoming').length,
      completed: matches.filter(m => m.status === 'completed').length,
    };
  }, [matches]);

  return (
    <div className="space-y-8">
      {/* Search and Filters bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-sport-card border border-white/5 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sport-muted" />
          <input
            type="text"
            placeholder="Search teams or stages (e.g. Argentina, Group I)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sport-dark/60 pl-11 pr-4 py-2.5 rounded-xl text-sm placeholder:text-sport-muted/60 border border-white/10 focus:border-sport-accent/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Stage Filters */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-bold text-sport-muted uppercase tracking-wider mr-2">Stage:</span>
          <button
            onClick={() => setStageFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              stageFilter === 'all'
                ? 'bg-sport-accent text-sport-dark border-sport-accent shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                : 'bg-sport-dark/40 hover:bg-sport-dark/80 text-sport-muted border-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStageFilter('group')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              stageFilter === 'group'
                ? 'bg-sport-accent text-sport-dark border-sport-accent shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                : 'bg-sport-dark/40 hover:bg-sport-dark/80 text-sport-muted border-white/10'
            }`}
          >
            Group Stage
          </button>
          <button
            onClick={() => setStageFilter('knockout')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              stageFilter === 'knockout'
                ? 'bg-sport-accent text-sport-dark border-sport-accent shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                : 'bg-sport-dark/40 hover:bg-sport-dark/80 text-sport-muted border-white/10'
            }`}
          >
            Knockouts
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 pb-4 px-6 border-b-2 font-bold text-sm transition-all relative ${
            activeTab === 'live'
              ? 'border-sport-accent text-sport-accent'
              : 'border-transparent text-sport-muted hover:text-sport-text'
          }`}
        >
          <Play className={`w-4 h-4 ${activeTab === 'live' ? 'fill-current animate-pulse' : ''}`} />
          <span>Live Now</span>
          {tabCounts.live > 0 ? (
            <span className="bg-sport-danger text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
              {tabCounts.live}
            </span>
          ) : (
            <span className="bg-white/10 text-sport-muted text-[10px] px-2 py-0.5 rounded-full">0</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 pb-4 px-6 border-b-2 font-bold text-sm transition-all ${
            activeTab === 'upcoming'
              ? 'border-sport-accent text-sport-accent'
              : 'border-transparent text-sport-muted hover:text-sport-text'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming Fixtures</span>
          <span className="bg-white/10 text-sport-muted text-[10px] px-2 py-0.5 rounded-full">
            {tabCounts.upcoming}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 pb-4 px-6 border-b-2 font-bold text-sm transition-all ${
            activeTab === 'completed'
              ? 'border-sport-accent text-sport-accent'
              : 'border-transparent text-sport-muted hover:text-sport-text'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Completed Results</span>
          <span className="bg-white/10 text-sport-muted text-[10px] px-2 py-0.5 rounded-full">
            {tabCounts.completed}
          </span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && matches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl border border-white/5">
          <Loader2 className="w-10 h-10 text-sport-accent animate-spin mb-4" />
          <h3 className="text-lg font-bold">Loading Live Fixtures...</h3>
          <p className="text-sport-muted text-sm">Fetching real-time World Cup data...</p>
        </div>
      )}

      {/* Error State */}
      {error && matches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl border border-sport-danger/20 bg-sport-danger/5">
          <ShieldAlert className="w-12 h-12 text-sport-danger mb-4" />
          <h3 className="text-xl font-bold text-sport-danger mb-1">Failed to Connect</h3>
          <p className="text-sport-muted text-sm max-w-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-sport-danger text-white font-bold rounded-xl hover:bg-sport-danger/80 transition-colors shadow-lg shadow-sport-danger/20"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Match Cards Grid */}
      {!isLoading && !error && sortedMatches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}

      {/* No Matches Found */}
      {!isLoading && !error && sortedMatches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl border border-white/5">
          <ShieldAlert className="w-12 h-12 text-sport-muted/40 mb-4" />
          <h3 className="text-xl font-bold mb-1">No Matches Found</h3>
          <p className="text-sport-muted text-sm max-w-sm">
            There are currently no {activeTab} matches that match your filters.
          </p>
        </div>
      )}
    </div>
  );
}
