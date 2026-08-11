import React from 'react';
import { cn } from '../../../utils/cn';

export const SkeletonChart: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse space-y-6 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-4 w-36 bg-slate-800 rounded-md" />
          <div className="h-3 w-48 bg-slate-800/60 rounded-md" />
        </div>
        <div className="h-8 w-24 bg-slate-800 rounded-xl" />
      </div>

      <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 border-b border-slate-800">
        {[40, 65, 30, 85, 55, 75, 45].map((height, i) => (
          <div
            key={i}
            className="w-full bg-slate-800/70 rounded-t-lg transition-all"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
};
