import React, { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto shadow-sm',
        className
      )}
    >
      <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
        <Icon className="h-7 w-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-100 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{description}</p>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
