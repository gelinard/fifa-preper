"use client";

import { useState, useMemo } from "react";
import { Match } from "@/lib/mockData";
import MatchCard from "./MatchCard";
import { Search, Calendar, History, Play, ShieldAlert } from "lucide-react";

interface DashboardClientProps {
  initialMatches: Match[];
}

export default function DashboardClient({ initialMatches }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>('upcoming');
  const [stageFilter, setStageFilter] = useState<'all' | 'group' | 'knockout'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = useMemo(() => {
    return initialMatches.filter((match) => {
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
  }, [initialMatches, activeTab, stageFilter, searchQuery]);

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
      live: initialMatches.filter(m => m.status === 'live').length,
      upcoming: initialMatches.filter(m => m.status === 'upcoming').length,
      completed: initialMatches.filter(m => m.status === 'completed').length,
    };
  }, [initialMatches]);

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

      {/* Match Cards Grid */}
      {sortedMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
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
