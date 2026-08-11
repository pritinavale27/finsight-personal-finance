import React from 'react';
import { cn } from '../../../utils/cn';

export const SkeletonList: React.FC<{ rows?: number; className?: string }> = ({
  rows = 4,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse space-y-4 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="h-4 w-32 bg-slate-800 rounded-md" />
        <div className="h-4 w-16 bg-slate-800/60 rounded-md" />
      </div>

      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-slate-800 rounded-xl" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-28 bg-slate-800 rounded-md" />
                <div className="h-2.5 w-20 bg-slate-800/60 rounded-md" />
              </div>
            </div>
            <div className="h-4 w-16 bg-slate-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
