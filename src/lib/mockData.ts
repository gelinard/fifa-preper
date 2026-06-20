export interface Player {
  id: string;
  name: string;
  position: string;
  club: string;
  league: string;
  description: string;
  avatarUrl: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface Team {
  id: string;
  name: string;
  flagCode: string; // Used for flag icons/images
  fifaRanking: number;
  tournamentStanding: string;
  form: ('W' | 'D' | 'L')[];
  playersToWatch: Player[];
  trivia: TriviaQuestion[];
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
}

export const mockMatches: Match[] = [
  {
    id: "m1",
    groupOrStage: "Group F",
    kickoffTime: "2026-06-20T18:48:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_ned",
      name: "Netherlands",
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
          question: "How many times have the Netherlands reached the World Cup final?",
          answer: "Three times (1974, 1978, 2010), but they have never won the tournament."
        },
        {
          id: "tr_ned_2",
          question: "Who is the all-time leading goalscorer for the Netherlands?",
          answer: "Robin van Persie with 50 goals."
        },
        {
          id: "tr_ned_3",
          question: "What is the famous tactical system associated with Dutch football?",
          answer: "Total Football, pioneered by Rinus Michels and Johan Cruyff in the 1970s."
        }
      ]
    },
    awayTeam: {
      id: "t_swe",
      name: "Sweden",
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
          question: "What is Sweden's best ever finish at a FIFA World Cup?",
          answer: "Runners-up in 1958 when they hosted the tournament, losing to Brazil in the final."
        },
        {
          id: "tr_swe_2",
          question: "Who holds the record for most appearances for the Swedish national team?",
          answer: "Anders Svensson with 148 caps."
        },
        {
          id: "tr_swe_3",
          question: "Which Swedish player famously scored a spectacular bicycle kick from 30 yards against England in 2012?",
          answer: "Zlatan Ibrahimović."
        }
      ]
    },
    history: {
      summary: "Netherlands and Sweden have a long-standing European rivalry, having met numerous times in qualifiers and major tournaments. The Dutch have historically edged the encounters, but Sweden is known for pulling off gritty upsets.",
      firstMeeting: false,
      memorableClashes: [
        "Euro 2004 Quarter-final: Netherlands won on penalties after a tense 0-0 draw.",
        "2018 World Cup Qualifiers: Sweden famously edged the Netherlands out of the playoffs on goal difference."
      ]
    }
  },
  {
    id: "m2",
    groupOrStage: "Group E",
    kickoffTime: "2026-06-20T22:00:00Z",
    winProbability: { home: 65, draw: 20, away: 15 },
    homeTeam: {
      id: "t_ecu",
      name: "Ecuador",
      flagCode: "EC",
      fifaRanking: 32,
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
          question: "When did Ecuador make their FIFA World Cup debut?",
          answer: "In 2002, held in South Korea and Japan."
        },
        {
          id: "tr_ecu_2",
          question: "Who is Ecuador's all-time top scorer in World Cup history?",
          answer: "Enner Valencia."
        },
        {
          id: "tr_ecu_3",
          question: "What is the nickname of the Ecuadorian national team?",
          answer: "La Tri."
        }
      ]
    },
    awayTeam: {
      id: "t_cuw",
      name: "Curaçao",
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
          question: "Is this Curaçao's first ever World Cup appearance?",
          answer: "Yes! 2026 marks their historic World Cup debut as an independent nation."
        },
        {
          id: "tr_cuw_2",
          question: "What confederation does Curaçao play in?",
          answer: "CONCACAF."
        },
        {
          id: "tr_cuw_3",
          question: "Which famous Dutch manager previously coached the Curaçao national team?",
          answer: "Guus Hiddink."
        }
      ]
    },
    history: {
      summary: "This is a historic first meeting between the two nations on the World Cup stage. Ecuador comes in as heavy favorites, while Curaçao looks to pull off a massive upset in their debut tournament.",
      firstMeeting: true,
      memorableClashes: []
    }
  },
  {
    id: "m3",
    groupOrStage: "Group E",
    kickoffTime: "2026-06-20T14:00:00Z",
    winProbability: { home: 55, draw: 25, away: 20 },
    homeTeam: {
      id: "t_ger",
      name: "Germany",
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
          question: "How many FIFA World Cup titles has Germany won?",
          answer: "Four (1954, 1974, 1990, 2014)."
        },
        {
          id: "tr_ger_2",
          question: "Who is the all-time top goalscorer in FIFA World Cup history?",
          answer: "Miroslav Klose with 16 goals."
        },
        {
          id: "tr_ger_3",
          question: "What is the team's official nickname?",
          answer: "Die Mannschaft (The Team)."
        }
      ]
    },
    awayTeam: {
      id: "t_civ",
      name: "Ivory Coast",
      flagCode: "CI",
      fifaRanking: 39,
      tournamentStanding: "3rd in Group H",
      form: ['W', 'W', 'W', 'L', 'D'],
      playersToWatch: [
        {
          id: "p_civ_1",
          name: "Sébastien Haller",
          position: "Forward",
          club: "Borussia Dortmund",
          league: "Bundesliga",
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
          question: "What is the nickname of the Ivory Coast national team?",
          answer: "The Elephants (Les Éléphants)."
        },
        {
          id: "tr_civ_2",
          question: "Who is Ivory Coast's all-time leading goalscorer?",
          answer: "Didier Drogba with 65 goals."
        },
        {
          id: "tr_civ_3",
          question: "How many Africa Cup of Nations (AFCON) titles have they won?",
          answer: "Three (1992, 2015, and 2023)."
        }
      ]
    },
    history: {
      summary: "This is a rare clash of styles. Germany's structured tactical approach meets the Ivory Coast's physical dominance and flair. They have only met once before in a friendly.",
      firstMeeting: false,
      memorableClashes: [
        "2009 International Friendly: An entertaining 2-2 draw where Lukas Podolski scored a late equalizer."
      ]
    }
  }
,

  {
    id: "m4",
    groupOrStage: "Group G",
    kickoffTime: "2026-06-21T12:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_spain",
      name: "Spain",
      flagCode: "SP",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_saudiarabia",
      name: "Saudi Arabia",
      flagCode: "SA",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m5",
    groupOrStage: "Group G",
    kickoffTime: "2026-06-21T15:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_belgium",
      name: "Belgium",
      flagCode: "BE",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_iran",
      name: "Iran",
      flagCode: "IR",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m6",
    groupOrStage: "Group H",
    kickoffTime: "2026-06-22T13:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_argentina",
      name: "Argentina",
      flagCode: "AR",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_austria",
      name: "Austria",
      flagCode: "AU",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m7",
    groupOrStage: "Group I",
    kickoffTime: "2026-06-22T17:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_france",
      name: "France",
      flagCode: "FR",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_iraq",
      name: "Iraq",
      flagCode: "IR",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m8",
    groupOrStage: "Group J",
    kickoffTime: "2026-06-23T13:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_portugal",
      name: "Portugal",
      flagCode: "PO",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_uzbekistan",
      name: "Uzbekistan",
      flagCode: "UZ",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m9",
    groupOrStage: "Group K",
    kickoffTime: "2026-06-23T16:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_england",
      name: "England",
      flagCode: "EN",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_ghana",
      name: "Ghana",
      flagCode: "GH",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m10",
    groupOrStage: "Group L",
    kickoffTime: "2026-06-24T15:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_switzerland",
      name: "Switzerland",
      flagCode: "SW",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_canada",
      name: "Canada",
      flagCode: "CA",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m11",
    groupOrStage: "Group A",
    kickoffTime: "2026-06-24T18:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_scotland",
      name: "Scotland",
      flagCode: "SC",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_brazil",
      name: "Brazil",
      flagCode: "BR",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m12",
    groupOrStage: "Group E",
    kickoffTime: "2026-06-25T16:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_ecuador",
      name: "Ecuador",
      flagCode: "EC",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_germany",
      name: "Germany",
      flagCode: "GE",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m13",
    groupOrStage: "Group C",
    kickoffTime: "2026-06-25T22:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_turkiye",
      name: "Turkiye",
      flagCode: "TU",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_usa",
      name: "USA",
      flagCode: "US",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m14",
    groupOrStage: "Group I",
    kickoffTime: "2026-06-26T15:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_norway",
      name: "Norway",
      flagCode: "NO",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_france",
      name: "France",
      flagCode: "FR",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  },
  {
    id: "m15",
    groupOrStage: "Group K",
    kickoffTime: "2026-06-27T17:00:00Z",
    winProbability: { home: 45, draw: 25, away: 30 },
    homeTeam: {
      id: "t_panama",
      name: "Panama",
      flagCode: "PA",
      fifaRanking: 10,
      tournamentStanding: "TBD",
      form: ['W', 'D', 'W', 'W', 'D'],
      playersToWatch: [],
      trivia: []
    },
    awayTeam: {
      id: "t_england",
      name: "England",
      flagCode: "EN",
      fifaRanking: 20,
      tournamentStanding: "TBD",
      form: ['L', 'D', 'W', 'L', 'W'],
      playersToWatch: [],
      trivia: []
    },
    history: {
      summary: "AI will generate history.",
      firstMeeting: false,
      memorableClashes: []
    }
  }
];