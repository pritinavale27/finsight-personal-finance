import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertOctagon } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-200 mt-1">Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          The view or route you requested does not exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md"
      >
        <Home className="h-4 w-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
