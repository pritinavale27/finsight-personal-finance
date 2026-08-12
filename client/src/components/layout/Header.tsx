import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, Menu, LogOut, User, ChevronDown, Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getUserDisplayName, getUserInitials } from '../../types/auth';
import { navigationItems } from './navigation';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [unreadNotifications] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Match active nav item for page title & description
  const currentNav = navigationItems.find((item) => item.href === location.pathname);
  const pageTitle = currentNav?.title || 'Dashboard';
  const pageDescription = currentNav?.description || 'Personal finance intelligence';

  // Derive display name and initials from the authenticated Supabase user
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(displayName);
  const email = user?.email ?? '';
  const avatarUrl = (user?.user_metadata?.avatar_url as string) || null;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProfileOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    setProfileOpen(false);
    await signOut();
    navigate('/login', { replace: true });
  };

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

        {/* Notifications Icon */}
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

        {/* User Profile Dropdown */}
        <div className="relative border-l border-slate-800 pl-3" ref={dropdownRef}>
          <button
            id="header-profile-button"
            onClick={() => setProfileOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
            className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30 shadow-md shrink-0">
                {initials}
              </div>
            )}

            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-100 leading-tight">{displayName}</p>
              <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{email}</p>
            </div>

            <ChevronDown
              className={`hidden xl:block h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div
              role="menu"
              aria-label="Profile menu"
              className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50 animate-in"
            >
              {/* User info header */}
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-sm font-bold text-slate-100 truncate">{displayName}</p>
                <p className="text-xs text-slate-400 truncate">{email}</p>
              </div>

              {/* Menu items */}
              <div className="p-1">
                <button
                  role="menuitem"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors text-left"
                  onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Profile & Settings
                </button>
              </div>

              <div className="p-1 border-t border-slate-800">
                <button
                  id="header-signout-button"
                  role="menuitem"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-left"
                >
                  {signingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  {signingOut ? 'Signing out…' : 'Sign out'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
