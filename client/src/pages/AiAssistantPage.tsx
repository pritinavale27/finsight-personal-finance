import React from 'react';
import { Bot } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const AiAssistantPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          AI Financial Assistant
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            LLM Powered
          </span>
        </h1>
        <p className="text-xs text-slate-400">Ask questions about your spending and receive automated financial insights.</p>
      </div>

      <EmptyState
        icon={Bot}
        title="AI Financial Q&A Assistant"
        description="Ask 'Where did I spend the most this month?' or 'Can I save ₹10,000 this month?' with secure server-side LLM analysis in Phase 12 & 13."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 12 & 13
          </span>
        }
      />
    </div>
  );
};
