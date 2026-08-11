import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const ImportDataPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Import Bank Statements</h1>
        <p className="text-xs text-slate-400">Upload CSV bank statements with automatic category suggestions.</p>
      </div>

      <EmptyState
        icon={FileSpreadsheet}
        title="CSV Bank Statement Importer"
        description="Drag-and-drop CSV parser with interactive column mapping, validation preview, and smart merchant categorization in Phase 10 & 11."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 10 & 11
          </span>
        }
      />
    </div>
  );
};
