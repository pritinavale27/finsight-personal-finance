import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { navigationItems } from './navigation';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [unreadNotifications] = useState(3);

  // Match active nav item for page title & description
  const currentNav = navigationItems.find(
    (item) => item.href === location.pathname
  );
  const pageTitle = currentNav?.title || 'Dashboard';
  const pageDescription = currentNav?.description || 'Personal finance intelligence';

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Drawer Trigger & Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open navigation drawer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">{pageTitle}</h2>
          <p className="hidden sm:block text-xs text-slate-400 font-medium">{pageDescription}</p>
        </div>
      </div>

      {/* Right: Search, Notifications, Theme Toggle, Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 text-xs w-64 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/60 transition-all">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, merchants..."
            className="bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none w-full text-xs"
            aria-label="Search platform"
          />
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-slate-700/60 text-slate-400 rounded border border-slate-600/60">
            ⌘K
          </kbd>
        </div>

        {/* Notifications Icon with Unread Count */}
        <button
          className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
          aria-label={`View notifications (${unreadNotifications} unread)`}
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-300" />
          )}
        </button>

        {/* User Profile Menu Avatar */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30 cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-100">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
