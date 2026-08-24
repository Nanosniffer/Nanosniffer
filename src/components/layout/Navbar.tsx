import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ShieldAlert,
  Activity,
  Cpu,
  Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationCenter } from '../common/NotificationCenter';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

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

        {/* User Clearance Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
            <span className="text-[10px] font-mono text-slate-400">{user?.agency}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
