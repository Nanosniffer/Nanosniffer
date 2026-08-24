import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ShieldAlert,
  Activity,
  Cpu,
  Clock,
  Crown,
  UserCheck,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, PRESET_OPERATOR_ACCOUNTS } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationCenter } from '../common/NotificationCenter';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, switchRole, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toUTCString().replace('GMT', 'UTC');
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'INVESTIGATOR':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40';
      case 'ANALYST':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <header className="h-16 sticky top-0 z-30 bg-agency-950/80 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle + Global search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger bar */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-agency-900/90 border border-slate-800/90 hover:border-cyber-cyan/50 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyber-cyan transition-colors" />
            <span className="hidden sm:inline">Search suspects, phones, vehicles, bank accounts (Cmd + K)...</span>
            <span className="sm:hidden">Search entities...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-agency-950 border border-slate-700/60 rounded">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right side: Clock, AI Telemetry status, Theme toggle, Notification bell, User badge */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Live Tactical UTC Clock */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-agency-900/80 border border-slate-800 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>{currentTime || 'SYNCHRONIZING...'}</span>
        </div>

        {/* Neural AI Core Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>NEURAL ACTIVE</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Tactical Dark Mode'}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Tactical Notifications"
            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-neon-crimson animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User Clearance Indicator & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 pl-2 border-l border-slate-800 text-left hover:opacity-90 transition"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Operator'}
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            <div className="hidden sm:flex flex-col text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRoleBadgeColor(user?.role)}`}>
                  {user?.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{user?.agency}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Quick Switch Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-agency-950 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 font-mono text-xs">
              <div className="p-2 border-b border-slate-800 mb-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">ACTIVE OPERATOR SESSION</p>
                <p className="text-xs font-bold text-slate-200">{user?.name}</p>
                <p className="text-[10px] text-cyber-cyan">{user?.clearanceLevel}</p>
              </div>

              <div className="space-y-1 py-1">
                <p className="text-[9px] text-slate-500 px-2 py-0.5 uppercase tracking-wider">SWITCH ROLE CLEARANCE</p>
                
                <button
                  onClick={() => { switchRole('admin'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                    user?.role === 'ADMIN' ? 'bg-purple-950/50 text-purple-300 border border-purple-500/40' : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">👑 Admin (Director)</span>
                  {user?.role === 'ADMIN' && <span className="text-[10px] text-purple-400 font-bold">ACTIVE</span>}
                </button>

                <button
                  onClick={() => { switchRole('investigator'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                    user?.role === 'INVESTIGATOR' ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/40' : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">🕵️ Investigator (Lead)</span>
                  {user?.role === 'INVESTIGATOR' && <span className="text-[10px] text-cyan-400 font-bold">ACTIVE</span>}
                </button>

                <button
                  onClick={() => { switchRole('analyst'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                    user?.role === 'ANALYST' ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40' : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">📊 Analyst (Telemetry)</span>
                  {user?.role === 'ANALYST' && <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-950/30 flex items-center gap-2 transition"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
