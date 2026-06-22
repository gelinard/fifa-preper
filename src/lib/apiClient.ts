import { 
  Match, 
  Team, 
  TEAM_FLAG_MAP, 
  FIFA_RANKING_MAP, 
  KNOWN_TEAM_PROFILES, 
  DEFAULT_FORM 
} from "./mockData";

// Helper to parse "MM/DD/YYYY HH:mm" date string from the API (assumed to be in Eastern Time EDT, UTC-4)
const parseLocalDate = (dateStr: string): string => {
  try {
    const [datePart, timePart] = dateStr.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    
    // Parse as Eastern Daylight Time (UTC -04:00)
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    
    const isoString = `${year}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}:00-04:00`;
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date.toISOString();
  } catch (e) {
    console.error("Error parsing date:", dateStr, e);
    // Return a default date if parsing fails
    return new Date().toISOString();
  }
};

// Helper to parse scorers string (e.g. "{\"J. Quiñones 9'\",\"R. Jiménez 67'\"}" or "null")
const parseScorers = (scorersStr: string | null | undefined): string[] => {
  if (!scorersStr || scorersStr === "null" || scorersStr.trim() === "") return [];
  try {
    // Replace curved quotes with standard double quotes and remove braces
    const cleaned = scorersStr
      .replace(/[\{\}]/g, '')
      .replace(/[“”"']/g, '"')
      .trim();
    
    const matches = cleaned.match(/"([^"]+)"/g);
    if (matches) {
      return matches.map(m => m.replace(/"/g, '').trim());
    }
    
    return cleaned.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (e) {
    console.error("Error parsing scorers:", scorersStr, e);
    return [];
  }
};

export async function fetchWorldCupMatches(): Promise<Match[]> {
  try {
    const res = await fetch("https://worldcup26.ir/get/games", {
      next: { revalidate: 60 }, // Cache on server for 60 seconds
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch matches: ${res.statusText}`);
    }
    
    const data = await res.json();
    const games: any[] = data.games || [];
    const now = Date.now();
    
    return games.map((game: any) => {
      const kickoffISO = parseLocalDate(game.local_date);
      const kickoffTime = new Date(kickoffISO).getTime();
      
      // Determine status: completed, live, or upcoming
      let status: 'upcoming' | 'live' | 'completed' = 'upcoming';
      const finishedStr = String(game.finished).toUpperCase();
      const timeElapsedStr = String(game.time_elapsed).toLowerCase();
      
      if (finishedStr === 'TRUE' || timeElapsedStr === 'finished') {
        status = 'completed';
      } else if (timeElapsedStr === 'live') {
        status = 'live';
      } else {
        // Fallback checks
        if (now >= kickoffTime && now < kickoffTime + 2.5 * 60 * 60 * 1000) {
          status = 'live';
        } else if (now >= kickoffTime + 2.5 * 60 * 60 * 1000) {
          status = 'completed';
        }
      }
      
      // Check if teams are placeholders (unresolved knockouts)
      const isHomePlaceholder = !game.home_team_name_en || game.home_team_id === "0";
      const isAwayPlaceholder = !game.away_team_name_en || game.away_team_id === "0";
      
      const homeName = isHomePlaceholder ? (game.home_team_label || "TBD") : game.home_team_name_en;
      const awayName = isAwayPlaceholder ? (game.away_team_label || "TBD") : game.away_team_name_en;
      
      // Look up flags and rankings
      const homeFlag = isHomePlaceholder ? "TBD" : (TEAM_FLAG_MAP[homeName] || "TBD");
      const awayFlag = isAwayPlaceholder ? "TBD" : (TEAM_FLAG_MAP[awayName] || "TBD");
      
      const homeRank = isHomePlaceholder ? 999 : (FIFA_RANKING_MAP[homeName] || 50);
      const awayRank = isAwayPlaceholder ? 999 : (FIFA_RANKING_MAP[awayName] || 50);
      
      // Construct Home Team
      const homeProfile = KNOWN_TEAM_PROFILES[homeName];
      const homeTeam: Team = {
        id: isHomePlaceholder ? `placeholder_h_${game.id}` : game.home_team_id,
        name: homeName,
        flagCode: homeFlag,
        fifaRanking: homeRank,
        tournamentStanding: isHomePlaceholder ? "TBD" : `${game.group ? "Group " + game.group : "Knockout Stage"}`,
        form: isHomePlaceholder ? [] : (homeProfile?.form || DEFAULT_FORM),
        playersToWatch: isHomePlaceholder ? [] : (homeProfile?.playersToWatch || []),
        trivia: isHomePlaceholder ? [] : (homeProfile?.trivia || [])
      };
      
      // Construct Away Team
      const awayProfile = KNOWN_TEAM_PROFILES[awayName];
      const awayTeam: Team = {
        id: isAwayPlaceholder ? `placeholder_a_${game.id}` : game.away_team_id,
        name: awayName,
        flagCode: awayFlag,
        fifaRanking: awayRank,
        tournamentStanding: isAwayPlaceholder ? "TBD" : `${game.group ? "Group " + game.group : "Knockout Stage"}`,
        form: isAwayPlaceholder ? [] : (awayProfile?.form || DEFAULT_FORM),
        playersToWatch: isAwayPlaceholder ? [] : (awayProfile?.playersToWatch || []),
        trivia: isAwayPlaceholder ? [] : (awayProfile?.trivia || [])
      };
      
      // Map stages
      let stage = `Group ${game.group}`;
      if (game.type === "r32") stage = "Round of 32";
      if (game.type === "r16") stage = "Round of 16";
      if (game.type === "qf") stage = "Quarter-finals";
      if (game.type === "sf") stage = "Semi-finals";
      if (game.type === "3rd") stage = "Third Place Play-off";
      if (game.type === "final") stage = "Final";
      
      // Win probabilities: default to balanced if not known, or lookup
      const winProbability = {
        home: homeRank < awayRank ? 45 : (homeRank > awayRank ? 30 : 35),
        draw: 25,
        away: homeRank < awayRank ? 30 : (homeRank > awayRank ? 45 : 40)
      };
      // Normalize to sum to 100
      const totalProb = winProbability.home + winProbability.draw + winProbability.away;
      if (totalProb !== 100) {
        winProbability.away += (100 - totalProb);
      }
      
      const parsedHomeScore = game.home_score !== null && game.home_score !== "null" ? Number(game.home_score) : 0;
      const parsedAwayScore = game.away_score !== null && game.away_score !== "null" ? Number(game.away_score) : 0;
      
      return {
        id: game.id,
        homeTeam,
        awayTeam,
        groupOrStage: stage,
        kickoffTime: kickoffISO,
        winProbability,
        history: {
          summary: `Historical matchup details between ${homeName} and ${awayName}.`,
          firstMeeting: false,
          memorableClashes: []
        },
        status,
        score: status !== 'upcoming' ? { home: parsedHomeScore, away: parsedAwayScore } : undefined,
        homeScorers: parseScorers(game.home_scorers),
        awayScorers: parseScorers(game.away_scorers),
        venue: `Stadium ${game.stadium_id || "TBD"}`
      };
    });
  } catch (error) {
    console.error("Error fetching World Cup matches:", error);
    return [];
  }
}
