import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (title: string, description?: string) => addToast('success', title, description),
    error: (title: string, description?: string) => addToast('error', title, description),
    warning: (title: string, description?: string) => addToast('warning', title, description),
    info: (title: string, description?: string) => addToast('info', title, description),
  };

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
    info: <Info className="h-5 w-5 text-indigo-400 shrink-0" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Render Stack */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border bg-slate-900/95 backdrop-blur-md transition-all duration-300 animate-fade-in',
              t.type === 'success' && 'border-emerald-500/30 text-slate-100',
              t.type === 'error' && 'border-rose-500/30 text-slate-100',
              t.type === 'warning' && 'border-amber-500/30 text-slate-100',
              t.type === 'info' && 'border-indigo-500/30 text-slate-100'
            )}
          >
            {icons[t.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-100">{t.title}</h4>
              {t.description && <p className="text-[11px] text-slate-400 mt-0.5">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-500 hover:text-slate-300 p-0.5 rounded-lg transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
