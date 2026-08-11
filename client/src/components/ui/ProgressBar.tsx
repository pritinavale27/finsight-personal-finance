import React from 'react';
import { cn } from '../../utils/cn';
import { BudgetStatus } from '../../types/dashboard';

interface ProgressBarProps {
  value: number; // Percentage 0-100+
  status?: BudgetStatus;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  status = 'normal',
  color,
  showLabel = false,
  size = 'md',
  className,
}) => {
  // Cap visual width at 100% for progress bar container, but handle exceeded percentage text
  const clampedWidth = Math.min(Math.max(value, 0), 100);

  // Status color mapping
  const statusColors: Record<BudgetStatus, { bar: string; text: string; bg: string }> = {
    normal: {
      bar: 'bg-emerald-500',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    warning: {
      bar: 'bg-amber-500',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    critical: {
      bar: 'bg-rose-500',
      text: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    exceeded: {
      bar: 'bg-rose-600 animate-pulse',
      text: 'text-rose-500 font-bold',
      bg: 'bg-rose-600/20 border-rose-500/30',
    },
  };

  const currentStatus = statusColors[status] || statusColors.normal;

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400 uppercase tracking-wider text-[10px]">
            {status.toUpperCase()}
          </span>
          <span className={cn('text-xs font-bold', currentStatus.text)}>
            {value.toFixed(1)}%
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div
        className={cn(
          'w-full rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50 p-0.5',
          sizeClasses[size],
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${value.toFixed(1)}%`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            color ? '' : currentStatus.bar
          )}
          style={{
            width: `${clampedWidth}%`,
            ...(color ? { backgroundColor: color } : {}),
          }}
        />
      </div>
    </div>
  );
};
