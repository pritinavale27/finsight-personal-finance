import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 flex max-w-full">
        <div className="relative w-64 bg-slate-900 shadow-2xl flex flex-col">
          {/* Close button overlay */}
          <button
            onClick={onClose}
            className="absolute top-4 right-3 z-10 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>

          <Sidebar className="w-full border-r-0" onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
};
