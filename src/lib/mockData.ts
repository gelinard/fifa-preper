export interface Player {
  id: string;
  name: string;
  position: string;
  club: string;
  league: string;
  description: string;
  avatarUrl: string;
}

export interface TeamSpotlight {
  id: string;
  title: string;
  content: string;
}

export interface Team {
  id: string;
  name: string;
  flagCode: string;
  fifaRanking: number;
  tournamentStanding: string;
  form: ('W' | 'D' | 'L')[];
  playersToWatch: Player[];
  trivia: TeamSpotlight[]; // Spotlight details
}

export interface MatchHistory {
  summary: string;
  firstMeeting: boolean;
  memorableClashes: string[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  groupOrStage: string;
  kickoffTime: string; // ISO string
  winProbability: {
    home: number;
    draw: number;
    away: number;
  };
  history: MatchHistory;
  
  // Real-time properties
  status: 'upcoming' | 'live' | 'completed';
  score?: {
    home: number;
    away: number;
  };
  homeScorers?: string[];
  awayScorers?: string[];
  venue?: string;
  
  // Placeholder properties for undecided matches
  homeTeamLabel?: string;
  awayTeamLabel?: string;
}

// Maps country name in English to ISO-2 country/flag code
export const TEAM_FLAG_MAP: Record<string, string> = {
  "Mexico": "MX",
  "South Africa": "ZA",
  "South Korea": "KR",
  "Czech Republic": "CZ",
  "Canada": "CA",
  "Bosnia and Herzegovina": "BA",
  "United States": "US",
  "Paraguay": "PY",
  "Haiti": "HT",
  "Scotland": "SC",
  "Australia": "AU",
  "Turkey": "TR",
  "Türkiye": "TR",
  "Brazil": "BR",
  "Morocco": "MA",
  "Qatar": "QA",
  "Switzerland": "CH",
  "Ivory Coast": "CI",
  "Ecuador": "EC",
  "Germany": "DE",
  "Curaçao": "CW",
  "Netherlands": "NL",
  "Japan": "JP",
  "Sweden": "SE",
  "Tunisia": "TN",
  "Iran": "IR",
  "New Zealand": "NZ",
  "Spain": "ES",
  "Cape Verde": "CV",
  "Belgium": "BE",
  "Egypt": "EG",
  "Saudi Arabia": "SA",
  "Uruguay": "UY",
  "France": "FR",
  "Senegal": "SN",
  "Iraq": "IQ",
  "Norway": "NO",
  "Argentina": "AR",
  "Austria": "AT",
  "Jordan": "JO",
  "Algeria": "DZ",
  "Portugal": "PT",
  "DR Congo": "CD",
  "Democratic Republic of the Congo": "CD",
  "England": "EN",
  "Croatia": "HR",
  "Uzbekistan": "UZ",
  "Colombia": "CO",
  "Ghana": "GH",
  "Panama": "PA",
  "TBD": "TBD"
};

// Maps country name in English to FIFA world ranking
export const FIFA_RANKING_MAP: Record<string, number> = {
  "Argentina": 1,
  "France": 2,
  "Belgium": 3,
  "Brazil": 4,
  "England": 5,
  "Netherlands": 6,
  "Portugal": 7,
  "Spain": 8,
  "Croatia": 9,
  "Italy": 10,
  "United States": 11,
  "Colombia": 12,
  "Morocco": 13,
  "Uruguay": 14,
  "Germany": 16,
  "Senegal": 17,
  "Japan": 18,
  "Switzerland": 19,
  "Iran": 20,
  "Sweden": 26,
  "South Korea": 23,
  "Australia": 24,
  "Austria": 25,
  "Turkey": 27,
  "Türkiye": 27,
  "Ecuador": 30,
  "Czech Republic": 31,
  "Egypt": 32,
  "Algeria": 33,
  "Qatar": 34,
  "Panama": 35,
  "Canada": 40,
  "Norway": 44,
  "Saudi Arabia": 53,
  "Iraq": 55,
  "South Africa": 59,
  "DR Congo": 60,
  "Democratic Republic of the Congo": 60,
  "Jordan": 71,
  "Ghana": 64,
  "Cape Verde": 65,
  "Uzbekistan": 66,
  "Bosnia and Herzegovina": 74,
  "Haiti": 85,
  "Curaçao": 89,
  "New Zealand": 104
};

// Seeded form lists for teams if not fetched
export const DEFAULT_FORM: ('W' | 'D' | 'L')[] = ['W', 'D', 'W', 'W', 'L'];

// Predefined profiles for some key teams in the initial database
export const KNOWN_TEAM_PROFILES: Record<string, Omit<Team, 'id' | 'name'>> = {
  "Netherlands": {
    flagCode: "NL",
    fifaRanking: 6,
    tournamentStanding: "1st in Group F",
    form: ['W', 'D', 'W', 'W', 'L'],
    playersToWatch: [
      {
        id: "p_ned_1",
        name: "Virgil van Dijk",
        position: "Defender",
        club: "Liverpool FC",
        league: "Premier League",
        description: "A commanding center-back known for his strength, leadership, and aerial ability.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_ned_2",
        name: "Frenkie de Jong",
        position: "Midfielder",
        club: "FC Barcelona",
        league: "La Liga",
        description: "A versatile midfielder with exceptional dribbling and vision, controlling the tempo of the game.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_ned_1",
        title: "World Cup Finals History",
        content: "The Netherlands have reached the World Cup final three times (1974, 1978, 2010) but have never won the tournament, earning them the title of the greatest team to never win the World Cup."
      },
      {
        id: "tr_ned_2",
        title: "Total Football",
        content: "The Netherlands pioneered 'Total Football' in the 1970s, a tactical system where any outfield player can take over the role of any other player in the team, spearheaded by Johan Cruyff."
      },
      {
        id: "tr_ned_3",
        title: "All-Time Top Scorer",
        content: "Robin van Persie remains the all-time leading scorer for the Dutch national team with 50 goals in 102 appearances."
      }
    ]
  },
  "Sweden": {
    flagCode: "SE",
    fifaRanking: 26,
    tournamentStanding: "2nd in Group F",
    form: ['W', 'L', 'W', 'D', 'W'],
    playersToWatch: [
      {
        id: "p_swe_1",
        name: "Alexander Isak",
        position: "Forward",
        club: "Newcastle United",
        league: "Premier League",
        description: "A tall, agile striker with excellent technical ability and an eye for goal.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_swe_2",
        name: "Dejan Kulusevski",
        position: "Winger/Midfielder",
        club: "Tottenham Hotspur",
        league: "Premier League",
        description: "A creative attacker known for his physical strength, dribbling, and playmaking skills.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_swe_1",
        title: "World Cup Finish",
        content: "Sweden's best ever finish at a FIFA World Cup was runners-up in 1958 when they hosted the tournament, losing to Brazil in the final."
      },
      {
        id: "tr_swe_2",
        title: "Structured 4-4-2",
        content: "Sweden is known for a highly structured, disciplined defense and physical approach, transitioning quickly to feed clinical attackers like Alexander Isak."
      },
      {
        id: "tr_swe_3",
        title: "Spectacular Legacy",
        content: "Swedish legend Zlatan Ibrahimović famously scored a spectacular 30-yard bicycle kick against England in 2012, widely considered one of the best goals ever scored."
      }
    ]
  },
  "Ecuador": {
    flagCode: "EC",
    fifaRanking: 30,
    tournamentStanding: "2nd in Group E",
    form: ['W', 'D', 'L', 'W', 'W'],
    playersToWatch: [
      {
        id: "p_ecu_1",
        name: "Moisés Caicedo",
        position: "Midfielder",
        club: "Chelsea",
        league: "Premier League",
        description: "A dynamic and tough-tackling defensive midfielder who dominates the center of the pitch.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_ecu_2",
        name: "Pervis Estupiñán",
        position: "Defender",
        club: "Brighton & Hove Albion",
        league: "Premier League",
        description: "An incredibly fast and attacking left-back who constantly provides width.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_ecu_1",
        title: "World Cup Debut",
        content: "Ecuador made their FIFA World Cup debut in 2002 (held in South Korea and Japan) and had their best run in 2006, reaching the Round of 16."
      },
      {
        id: "tr_ecu_2",
        title: "Pressing Style",
        content: "La Tri plays with intense high pressing, utilizing the speed of Pervis Estupiñán and the defensive energy of Moisés Caicedo in midfield."
      },
      {
        id: "tr_ecu_3",
        title: "Enner Valencia's Goals",
        content: "Enner Valencia is Ecuador's all-time top scorer in World Cup history and is affectionately nicknamed 'La Tri' along with the team."
      }
    ]
  },
  "Curaçao": {
    flagCode: "CW",
    fifaRanking: 89,
    tournamentStanding: "4th in Group E",
    form: ['L', 'L', 'D', 'W', 'L'],
    playersToWatch: [
      {
        id: "p_cuw_1",
        name: "Leandro Bacuna",
        position: "Midfielder",
        club: "Groningen",
        league: "Eredivisie",
        description: "The veteran leader of the team with extensive European experience.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_cuw_2",
        name: "Jurien Gaari",
        position: "Defender",
        club: "RKC Waalwijk",
        league: "Eredivisie",
        description: "A solid defender who anchors the backline.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_cuw_1",
        title: "Historic Debut",
        content: "The 2026 World Cup marks Curaçao's historic World Cup debut as an independent nation, an incredible milestone for the Caribbean island."
      },
      {
        id: "tr_cuw_2",
        title: "Dutch Connections",
        content: "Coached previously by legends like Guus Hiddink, the team relies on players with Dutch league experience and structured counter-attacking football."
      },
      {
        id: "tr_cuw_3",
        title: "CONCACAF Contender",
        content: "As a member of CONCACAF, Curaçao secured qualification through a rigorous playoff run, making them one of the most exciting underdog stories of the tournament."
      }
    ]
  },
  "Germany": {
    flagCode: "DE",
    fifaRanking: 16,
    tournamentStanding: "2nd in Group H",
    form: ['W', 'D', 'L', 'W', 'W'],
    playersToWatch: [
      {
        id: "p_ger_1",
        name: "Jamal Musiala",
        position: "Midfielder",
        club: "Bayern Munich",
        league: "Bundesliga",
        description: "One of the brightest young talents in world football, known for his elite dribbling and vision.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_ger_2",
        name: "Antonio Rüdiger",
        position: "Defender",
        club: "Real Madrid",
        league: "La Liga",
        description: "An aggressive, fast, and imposing center-back who anchors the German defense.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_ger_1",
        title: "Four-Time Champions",
        content: "Germany is one of the most successful nations in World Cup history, having won four titles (1954, 1974, 1990, 2014)."
      },
      {
        id: "tr_ger_2",
        title: "Nagelsmann's Tactics",
        content: "Under Julian Nagelsmann, Die Mannschaft (The Team) plays a high-tempo possession game centered around technical playmakers like Jamal Musiala."
      },
      {
        id: "tr_ger_3",
        title: "All-Time Top Scorer",
        content: "Miroslav Klose holds the record for the most goals in FIFA World Cup history, scoring 16 goals across four tournaments."
      }
    ]
  },
  "Ivory Coast": {
    flagCode: "CI",
    fifaRanking: 17,
    tournamentStanding: "3rd in Group H",
    form: ['W', 'W', 'W', 'L', 'D'],
    playersToWatch: [
      {
        id: "p_civ_1",
        name: "Sébastien Haller",
        position: "Forward",
        club: "Leganés",
        league: "La Liga",
        description: "A powerful target man known for his incredible comeback story and clinical finishing.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_civ_2",
        name: "Franck Kessié",
        position: "Midfielder",
        club: "Al-Ahli",
        league: "Saudi Pro League",
        description: "A physical and tireless box-to-box midfielder who dictates play.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_civ_1",
        title: "AFCON Pedigree",
        content: "The Elephants (Les Éléphants) won their third Africa Cup of Nations (AFCON) title in 2023, demonstrating their strong pedigree on the continental stage."
      },
      {
        id: "tr_civ_2",
        title: "Physical Dominance",
        content: "Ivory Coast plays a physical, athletic brand of football with fast wingers and strong box-to-box midfielders like Franck Kessié."
      },
      {
        id: "tr_civ_3",
        title: "Drogba's Legacy",
        content: "Didier Drogba remains the country's all-time leading goalscorer with 65 goals, famously leading them to their first World Cup in 2006."
      }
    ]
  }
};

export const mockMatches: Match[] = [];