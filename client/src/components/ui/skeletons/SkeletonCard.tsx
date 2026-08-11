import React from 'react';
import { cn } from '../../../utils/cn';

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'p-5 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse space-y-4 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 bg-slate-800 rounded-md" />
        <div className="h-4 w-12 bg-slate-800 rounded-full" />
      </div>
      <div className="h-7 w-32 bg-slate-800 rounded-lg" />
      <div className="h-3 w-28 bg-slate-800/60 rounded-md" />
    </div>
  );
};
