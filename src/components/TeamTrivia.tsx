"use client";

import { useState } from "react";
import { Team, TriviaQuestion } from "@/lib/mockData";
import { BrainCircuit, ChevronDown } from "lucide-react";

export default function TeamTrivia({ homeTeam, awayTeam }: { homeTeam: Team; awayTeam: Team }) {
  return (
    <div className="mt-12 mb-16">
      <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
        <span className="w-2 h-8 bg-sport-accent rounded-full inline-block"></span>
        Knowledge Prep (Trivia)
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold text-lg text-sport-text mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-sport-accent" />
            {homeTeam.name} Trivia
          </h4>
          <div className="space-y-3">
            {homeTeam.trivia.map((q) => (
              <TriviaAccordion key={q.id} trivia={q} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg text-sport-text mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-sport-gold" />
            {awayTeam.name} Trivia
          </h4>
          <div className="space-y-3">
            {awayTeam.trivia.map((q) => (
              <TriviaAccordion key={q.id} trivia={q} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TriviaAccordion({ trivia }: { trivia: TriviaQuestion }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-sm pr-4">{trivia.question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-sport-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-3 border-t border-white/10 text-sm text-sport-accent font-medium leading-relaxed">
          {trivia.answer}
        </div>
      </div>
    </div>
  );
}
