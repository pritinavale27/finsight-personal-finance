import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Info, Bot } from 'lucide-react';
import { AIInsight, InsightType } from '../../types/dashboard';
import { cn } from '../../utils/cn';

interface AIInsightsProps {
  insights: AIInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: InsightType) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />;
      case 'neutral':
        return <Info className="h-4 w-4 text-indigo-400 shrink-0" />;
      default:
        return <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />;
    }
  };

  const getInsightBorder = (type: InsightType) => {
    switch (type) {
      case 'positive':
        return 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50';
      case 'warning':
        return 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50';
      case 'neutral':
        return 'border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500/50';
      default:
        return 'border-slate-800 bg-slate-900/50';
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Smart Insights
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                AI Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Automated financial observations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              'p-4 rounded-xl border transition-all duration-200 flex items-start gap-3',
              getInsightBorder(insight.type)
            )}
          >
            {getInsightIcon(insight.type)}

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-100 truncate">{insight.title}</h4>
                {insight.metric && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {insight.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{insight.description}</p>
              <p className="text-[10px] text-slate-400 pt-0.5 font-medium">{insight.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
