import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  ChevronDown,
  LogOut,
  Shield,
  Clock,
  PlusCircle,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationCenter } from '../common/NotificationCenter';
import { Button } from '../ui/button';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenAiAssistant: () => void;
  onOpenIntake?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenMobileMenu,
  onOpenAiAssistant,
  onOpenIntake,
}) => {
  const { user, switchRole, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC').split(' ').slice(1, 5).join(' '));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBreadcrumbs = () => {
    const p = location.pathname;
    if (p.includes('network')) return { section: 'Investigations', page: 'Network Analysis' };
    if (p.includes('criminals')) return { section: 'Investigations', page: 'Criminal Profiles' };
    if (p.includes('collect-evidence') || p.includes('intake')) return { section: 'Investigations', page: 'Add Suspect Profile' };
    if (p.includes('feed')) return { section: 'Intelligence', page: 'Intelligence Feed' };
    if (p.includes('alerts')) return { section: 'Intelligence', page: 'Risk & Alerts' };
    if (p.includes('timeline')) return { section: 'Intelligence', page: 'Evidence Timeline' };
    if (p.includes('reports')) return { section: 'Analytics', page: 'Investigation Reports' };
    if (p.includes('settings')) return { section: 'System', page: 'Settings & Config' };
    return { section: 'Overview', page: 'Investigation Overview' };
  };

  const breadcrumbs = getBreadcrumbs();

  const handleSwitchRoleWithRelogin = (roleKey: 'admin' | 'investigator' | 'analyst') => {
    setShowRoleMenu(false);
    logout();
    const roleTitles = {
      admin: 'Director Clearance (Admin)',
      investigator: 'Lead Tactical Investigator',
      analyst: 'Senior Intelligence Analyst'
    };
    navigate('/login', { 
      state: { 
        preselectedRole: roleKey,
        notice: `Clearance transfer requested: Please re-authenticate as ${roleTitles[roleKey]}.`
      } 
    });
  };

  return (
    <header className="h-14 sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu toggle + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Clean Breadcrumb Trail */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
          <span className="text-slate-400 font-normal">{breadcrumbs.section}</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900 truncate">{breadcrumbs.page}</span>
        </div>
      </div>

      {/* Middle: Global Search trigger */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-500 text-xs transition shadow-subtle group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="text-[11px] text-slate-400">Search suspects, phones, vehicles, cases...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-subtle">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right side: AI Investigator, Status, Notifications, Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Mobile Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Police Data Intake / Add Suspect Profile Button */}
        {onOpenIntake && (
          <Button
            variant="default"
            size="sm"
            onClick={onOpenIntake}
            className="gap-1.5 h-7 px-2.5 bg-brand-600 hover:bg-brand-700 text-white shadow-sm font-semibold border-transparent"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="text-[11px]">Add Suspect Profile</span>
          </Button>
        )}

        {/* AI Investigator Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenAiAssistant}
          className="gap-1.5 h-7 px-2.5 bg-slate-900 hover:bg-slate-800 text-white border-transparent shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-brand-300" />
          <span className="hidden sm:inline text-[11px]">AI Investigator</span>
        </Button>

        {/* Live Status Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>LIVE INTEL</span>
        </div>

        {/* Tactical Clock */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-slate-500 px-2 py-1 rounded bg-slate-50 border border-slate-100">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{currentTime || 'UTC'}</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Intelligence Alerts"
            className="relative p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 text-left hover:opacity-90 transition"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user?.name || 'Officer'}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                {user?.name || 'Agent Marcus Vance'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {user?.clearanceLevel || 'TOP SECRET // SCI'}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Quick Role Switcher Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-60 rounded-lg bg-white border border-slate-200 shadow-popover p-1.5 z-50 animate-in fade-in zoom-in-95 text-xs">
              <div className="p-2 border-b border-slate-100 mb-1">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">ACTIVE OPERATOR</p>
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{user?.role} • {user?.badgeNumber}</p>
              </div>

              <div className="space-y-0.5 py-1">
                <p className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 uppercase tracking-wider">
                  SWITCH CLEARANCE (REQUIRES RE-AUTHENTICATION)
                </p>
                <button
                  onClick={() => handleSwitchRoleWithRelogin('admin')}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition ${
                    user?.role === 'ADMIN' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>👑 Director (Admin)</span>
                  {user?.role === 'ADMIN' ? (
                    <span className="text-[10px] text-slate-900 font-bold">ACTIVE</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">Re-login →</span>
                  )}
                </button>
                <button
                  onClick={() => handleSwitchRoleWithRelogin('investigator')}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition ${
                    user?.role === 'INVESTIGATOR' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🕵️ Lead Investigator</span>
                  {user?.role === 'INVESTIGATOR' ? (
                    <span className="text-[10px] text-slate-900 font-bold">ACTIVE</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">Re-login →</span>
                  )}
                </button>
                <button
                  onClick={() => handleSwitchRoleWithRelogin('analyst')}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition ${
                    user?.role === 'ANALYST' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>📊 Senior Analyst</span>
                  {user?.role === 'ANALYST' ? (
                    <span className="text-[10px] text-slate-900 font-bold">ACTIVE</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">Re-login →</span>
                  )}
                </button>
              </div>

              <div className="pt-1.5 border-t border-slate-100 mt-1">
                <button
                  onClick={() => handleSwitchRoleWithRelogin(user?.role?.toLowerCase() === 'admin' ? 'investigator' : 'admin')}
                  className="w-full text-left px-2 py-1.5 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-2 transition text-xs"
                >
                  <LogOut className="w-3.5 h-3.5" /> End Session & Re-login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
