import { z } from 'zod';
import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';

const matchSchema = z.object({
  history: z.object({
    summary: z.string().describe("A 2-3 sentence summary of the historical rivalry between the two teams."),
    firstMeeting: z.boolean().describe("True if these two teams have never played each other in a major tournament or friendly."),
    memorableClashes: z.array(z.string()).describe("A list of 1-3 memorable past encounters or matches between them. Empty if firstMeeting is true.")
  }),
  homePlayersToWatch: z.array(z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    club: z.string(),
    league: z.string(),
    description: z.string().describe("A short sentence describing their playstyle and importance to the team.")
  })).max(2).min(1),
  awayPlayersToWatch: z.array(z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    club: z.string(),
    league: z.string(),
    description: z.string()
  })).max(2).min(1),
  homeTrivia: z.array(z.object({
    id: z.string(),
    title: z.string().describe("The spotlight category name (e.g., 'History & Milestones', 'Tactical Style', 'Latest News')."),
    content: z.string().describe("Detailed, informational paragraph focusing on this spotlight category.")
  })).length(3).describe("Provide fascinating spotlight highlights. The first item MUST focus on the team's history and key milestones. The second item MUST focus on the team's tactical style and philosophy. The third item MUST focus on recent news or team spotlights."),
  awayTrivia: z.array(z.object({
    id: z.string(),
    title: z.string().describe("The spotlight category name (e.g., 'History & Milestones', 'Tactical Style', 'Latest News')."),
    content: z.string().describe("Detailed, informational paragraph focusing on this spotlight category.")
  })).length(3).describe("Provide fascinating spotlight highlights. The first item MUST focus on the team's history and key milestones. The second item MUST focus on the team's tactical style and philosophy. The third item MUST focus on recent news or team spotlights."),
  winProbability: z.object({
    home: z.number().min(0).max(100),
    draw: z.number().min(0).max(100),
    away: z.number().min(0).max(100)
  }).describe("Must sum exactly to 100")
});

export async function POST(req: Request) {
  const { homeTeam, awayTeam } = await req.json();

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing GOOGLE_GENERATIVE_AI_API_KEY" }), { status: 500 });
  }

  const result = streamObject({
    model: google('gemini-1.5-pro-latest'),
    schema: matchSchema,
    prompt: `Generate a comprehensive match prep report for the upcoming FIFA World Cup 2026 match between ${homeTeam} and ${awayTeam}. 
    Provide realistic, accurate historical data, current real-world star players (with their actual current clubs and leagues), and interesting trivia.
    Calculate realistic win probabilities based on their current world standing.`
  });

  return result.toTextStreamResponse();
}
