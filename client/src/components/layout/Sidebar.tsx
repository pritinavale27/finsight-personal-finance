import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TrendingUp, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { navigationItems } from './navigation';
import { useAuth } from '../../hooks/useAuth';
import { getUserDisplayName, getUserInitials } from '../../types/auth';
import { cn } from '../../utils/cn';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(displayName);
  const email = user?.email ?? '';
  const avatarUrl = (user?.user_metadata?.avatar_url as string) || null;

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 w-64 select-none',
        className
      )}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
            FinSight
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              PRO
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Understand your money</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Platform Menu
        </div>

        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      'h-4 w-4 transition-transform duration-150 group-hover:scale-110',
                      isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          {/* Avatar or Initials */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30 shrink-0">
              {initials}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-100 truncate">{displayName}</p>
            <p className="text-[10px] text-slate-400 truncate">{email}</p>
          </div>

          <button
            id="sidebar-signout-button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shrink-0"
            title="Sign out"
            aria-label="Sign out"
          >
            {signingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 text-[10px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span>FinSight v1.0 • Bank-Grade RLS</span>
        </div>
      </div>
    </aside>
  );
};
