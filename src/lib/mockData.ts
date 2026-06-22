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
  },
  "Argentina": {
    flagCode: "AR",
    fifaRanking: 1,
    tournamentStanding: "1st in Group J",
    form: ['W', 'W', 'W', 'D', 'W'],
    playersToWatch: [
      {
        id: "p_arg_1",
        name: "Lionel Messi",
        position: "Forward",
        club: "Inter Miami",
        league: "MLS",
        description: "The legendary captain, still a magician with the ball, known for his playmaking and clinical free kicks.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_arg_2",
        name: "Lautaro Martínez",
        position: "Forward",
        club: "Inter Milan",
        league: "Serie A",
        description: "A clinical finisher and hard-working striker who leads the line with strength.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_arg_1",
        title: "World Cup Finals History",
        content: "Argentina has won three World Cup titles, most recently in 2022 led by Lionel Messi in Qatar."
      },
      {
        id: "tr_arg_2",
        title: "Possession Style",
        content: "Plays a fluid possession game, focusing on passing lanes to Messi and rapid counter-pressing in midfield."
      },
      {
        id: "tr_arg_3",
        title: "Reigning Champions",
        content: "Argentina enters the match as reigning world champions, looking to maintain their dominant form."
      }
    ]
  },
  "France": {
    flagCode: "FR",
    fifaRanking: 2,
    tournamentStanding: "1st in Group I",
    form: ['W', 'D', 'W', 'W', 'D'],
    playersToWatch: [
      {
        id: "p_fra_1",
        name: "Kylian Mbappé",
        position: "Forward",
        club: "Real Madrid",
        league: "La Liga",
        description: "One of the fastest and most clinical forwards in the world, capable of winning games single-handedly.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_fra_2",
        name: "Antoine Griezmann",
        position: "Midfielder",
        club: "Atlético Madrid",
        league: "La Liga",
        description: "The engine room of France's attack, linking midfield and defense with superb workrate.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_fra_1",
        title: "Two-Time Champions",
        content: "France are two-time World Cup winners (1998, 2018) and reached the final in 2006 and 2022."
      },
      {
        id: "tr_fra_2",
        title: "Deschamps' Tactics",
        content: "Under Didier Deschamps, Les Bleus play a highly disciplined defensive shape, executing explosive counters through Mbappé."
      },
      {
        id: "tr_fra_3",
        title: "Mbappé's Era",
        content: "Kylian Mbappé leads the golden generation, aiming to secure another historic trophy."
      }
    ]
  },
  "Brazil": {
    flagCode: "BR",
    fifaRanking: 4,
    tournamentStanding: "1st in Group C",
    form: ['W', 'D', 'W', 'L', 'W'],
    playersToWatch: [
      {
        id: "p_bra_1",
        name: "Vinícius Júnior",
        position: "Forward",
        club: "Real Madrid",
        league: "La Liga",
        description: "An explosive winger with world-class dribbling, speed, and goalscoring ability.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_bra_2",
        name: "Rodrygo",
        position: "Forward",
        club: "Real Madrid",
        league: "La Liga",
        description: "A versatile attacker with great intelligence, technique, and clinical finishes.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_bra_1",
        title: "Pentacampeões",
        content: "Brazil is the most successful nation in World Cup history, having won a record five titles."
      },
      {
        id: "tr_bra_2",
        title: "Joga Bonito",
        content: "Plays classic 'Joga Bonito' with rapid wing play, high individual flair, and structured defensive midfield support."
      },
      {
        id: "tr_bra_3",
        title: "High Pressure",
        content: "The Seleção are under high pressure to reclaim their spot at the pinnacle of international football."
      }
    ]
  },
  "England": {
    flagCode: "EN",
    fifaRanking: 5,
    tournamentStanding: "1st in Group L",
    form: ['W', 'D', 'W', 'W', 'D'],
    playersToWatch: [
      {
        id: "p_eng_1",
        name: "Harry Kane",
        position: "Forward",
        club: "Bayern Munich",
        league: "Bundesliga",
        description: "An elite target man and clinical finisher who also drops deep to playmake.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_eng_2",
        name: "Jude Bellingham",
        position: "Midfielder",
        club: "Real Madrid",
        league: "La Liga",
        description: "A dynamic box-to-box midfielder with exceptional physicality, goals, and leadership.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_eng_1",
        title: "1966 Champions",
        content: "England won their sole World Cup title in 1966 on home soil and recently reached the semi-finals in 2018."
      },
      {
        id: "tr_eng_2",
        title: "Controlled Possession",
        content: "Focuses on controlled possession, utilizing creative wingers and solid double-pivot midfield stability."
      },
      {
        id: "tr_eng_3",
        title: "Star-Studded Squad",
        content: "The Three Lions are highly favored with one of the most valuable squads in the tournament."
      }
    ]
  },
  "Spain": {
    flagCode: "ES",
    fifaRanking: 8,
    tournamentStanding: "1st in Group H",
    form: ['W', 'D', 'W', 'W', 'W'],
    playersToWatch: [
      {
        id: "p_esp_1",
        name: "Lamine Yamal",
        position: "Forward",
        club: "FC Barcelona",
        league: "La Liga",
        description: "A teenage sensation with exceptional dribbling, creativity, and maturity beyond his years.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_esp_2",
        name: "Rodri",
        position: "Midfielder",
        club: "Manchester City",
        league: "Premier League",
        description: "The tactical anchor of the team, controlling the tempo and orchestrating play.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_esp_1",
        title: "Tiki-Taka Era",
        content: "Spain won their first World Cup in 2010 in South Africa, dominating international football from 2008 to 2012."
      },
      {
        id: "tr_esp_2",
        title: "Modern Passing",
        content: "Plays a modern variation of 'Tiki-Taka' with high pressing, quick passing, and dynamic wingers."
      },
      {
        id: "tr_esp_3",
        title: "Nations League Winners",
        content: "La Roja enters the tournament with high expectations after winning the UEFA Nations League."
      }
    ]
  },
  "Portugal": {
    flagCode: "PT",
    fifaRanking: 7,
    tournamentStanding: "1st in Group K",
    form: ['W', 'W', 'L', 'W', 'W'],
    playersToWatch: [
      {
        id: "p_por_1",
        name: "Bruno Fernandes",
        position: "Midfielder",
        club: "Manchester United",
        league: "Premier League",
        description: "A creative playmaker with exceptional passing range, workrate, and long-range shooting.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_por_2",
        name: "Rafael Leão",
        position: "Forward",
        club: "AC Milan",
        league: "Serie A",
        description: "A powerful and fast winger known for his dribbling and dynamic attacks.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_por_1",
        title: "1966 Legacy",
        content: "Portugal's best World Cup finish was 3rd place in 1966 led by Eusébio."
      },
      {
        id: "tr_por_2",
        title: "Wing Play",
        content: "Plays a fluid, attacking style that relies on technical midfielders to feed fast, creative wingers."
      },
      {
        id: "tr_por_3",
        title: "Squad Depth",
        content: "Portugal boasts a deep squad combining elite young talent and veteran experience."
      }
    ]
  },
  "Norway": {
    flagCode: "NO",
    fifaRanking: 44,
    tournamentStanding: "3rd in Group I",
    form: ['W', 'D', 'L', 'W', 'W'],
    playersToWatch: [
      {
        id: "p_nor_1",
        name: "Erling Haaland",
        position: "Forward",
        club: "Manchester City",
        league: "Premier League",
        description: "An absolute goal machine with incredible speed, strength, and clinical finishing.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_nor_2",
        name: "Martin Ødegaard",
        position: "Midfielder",
        club: "Arsenal FC",
        league: "Premier League",
        description: "The creative mastermind, orchestrating the attack with world-class vision.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_nor_1",
        title: "World Cup Returns",
        content: "Norway has qualified for the World Cup three times, notably reaching the Round of 16 in 1998."
      },
      {
        id: "tr_nor_2",
        title: "Haaland's Targets",
        content: "Focuses on defensive stability, quickly counter-attacking to release Haaland in space."
      },
      {
        id: "tr_nor_3",
        title: "Golden Duo",
        content: "Haaland and Ødegaard look to guide Norway deep into their first tournament in over two decades."
      }
    ]
  },
  "Iraq": {
    flagCode: "IQ",
    fifaRanking: 55,
    tournamentStanding: "4th in Group I",
    form: ['L', 'W', 'D', 'W', 'L'],
    playersToWatch: [
      {
        id: "p_irq_1",
        name: "Aymen Hussein",
        position: "Forward",
        club: "Al-Khor",
        league: "Qatar Stars League",
        description: "A tall, physical striker who is highly effective in aerial duels and finishing.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_irq_2",
        name: "Ali Jasim",
        position: "Midfielder",
        club: "Como",
        league: "Serie A",
        description: "A highly creative winger known for his agility, dribbling, and speed.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_irq_1",
        title: "1986 Debut",
        content: "Iraq qualified for their first and only World Cup in 1986 in Mexico."
      },
      {
        id: "tr_irq_2",
        title: "Defensive Block",
        content: "Plays a highly structured defensive system, utilizing quick transitions and long balls to Hussein."
      },
      {
        id: "tr_irq_3",
        title: "Lions of Mesopotamia",
        content: "The Lions of Mesopotamia have strong support from passionate fans traveling in large numbers."
      }
    ]
  },
  "Austria": {
    flagCode: "AT",
    fifaRanking: 25,
    tournamentStanding: "3rd in Group J",
    form: ['W', 'D', 'W', 'L', 'W'],
    playersToWatch: [
      {
        id: "p_aut_1",
        name: "Marcel Sabitzer",
        position: "Midfielder",
        club: "Borussia Dortmund",
        league: "Bundesliga",
        description: "A versatile midfielder with exceptional workrate, leadership, and shooting.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_aut_2",
        name: "Konrad Laimer",
        position: "Midfielder",
        club: "Bayern Munich",
        league: "Bundesliga",
        description: "A tireless runner who excels in high-pressing and winning back possession.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_aut_1",
        title: "1954 Podiums",
        content: "Austria's best World Cup finish was 3rd place in 1954 in Switzerland."
      },
      {
        id: "tr_aut_2",
        title: "Gegenpressing",
        content: "Plays a signature high-pressing 'Red Bull' style, suffocating opponents in midfield."
      },
      {
        id: "tr_aut_3",
        title: "Dark Horses",
        content: "Austria enters the tournament as a dark horse capable of upsetting top-tier teams."
      }
    ]
  },
  "Senegal": {
    flagCode: "SN",
    fifaRanking: 17,
    tournamentStanding: "2nd in Group I",
    form: ['W', 'W', 'L', 'W', 'D'],
    playersToWatch: [
      {
        id: "p_sen_1",
        name: "Sadio Mané",
        position: "Forward",
        club: "Al-Nassr",
        league: "Saudi Pro League",
        description: "The legendary winger, known for his incredible pace, dribbling, and goalscoring instinct.",
        avatarUrl: "/avatars/placeholder.jpg"
      },
      {
        id: "p_sen_2",
        name: "Nicolas Jackson",
        position: "Forward",
        club: "Chelsea FC",
        league: "Premier League",
        description: "A dynamic and hard-working forward who excels in link-up play and running in behind.",
        avatarUrl: "/avatars/placeholder.jpg"
      }
    ],
    trivia: [
      {
        id: "tr_sen_1",
        title: "2002 Quarter-Finalists",
        content: "Senegal reached the quarter-finals in their debut World Cup in 2002, famously defeating reigning champions France."
      },
      {
        id: "tr_sen_2",
        title: "Physical Counter",
        content: "Plays a high-tempo, physical counter-attacking style with quick transitions to release fast wingers."
      },
      {
        id: "tr_sen_3",
        title: "Teranga Lions",
        content: "The Teranga Lions look to build on their AFCON successes and make a deep run in 2026."
      }
    ]
  }
};

export const mockMatches: Match[] = [];