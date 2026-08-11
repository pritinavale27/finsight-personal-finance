import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ChevronRight, Calendar } from 'lucide-react';
import { SavingsGoal } from '../../types/dashboard';
import { ProgressBar } from '../ui/ProgressBar';

interface SavingsGoalCardProps {
  goals: SavingsGoal[];
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goals }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 tracking-tight">Savings Goals</h3>
          <p className="text-xs text-slate-400 font-medium">Target funds & milestone progress</p>
        </div>
        <Link
          to="/goals"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
        >
          <span>All goals</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-3 hover:border-slate-700/60 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Target className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {goal.targetDate}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-100">{goal.name}</h4>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-black text-indigo-400">
                    ₹{goal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    of ₹{goal.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <ProgressBar value={goal.percentage} color={goal.color} size="md" />
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>{goal.percentage}% Completed</span>
                <span>₹{goal.remainingAmount.toLocaleString()} remaining</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
