import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Share2,
  Radio,
  ShieldAlert,
  FileText,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Criminal Profiles', path: '/criminals', icon: Users, badge: '20' },
    { label: 'Network Analysis', path: '/network', icon: Share2, highlight: true },
    { label: 'Intelligence Feed', path: '/feed', icon: Radio, pulse: true },
    { label: 'Alerts & Risk Detection', path: '/alerts', icon: ShieldAlert, badge: unreadCount > 0 ? `${unreadCount}` : undefined, badgeColor: 'bg-red-500/80' },
    { label: 'Investigation Reports', path: '/reports', icon: FileText },
    { label: 'Evidence Timeline', path: '/timeline', icon: Clock, badge: '100' },
    { label: 'System Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-agency-950/95 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan via-blue-600 to-cyber-purple p-0.5 shadow-neon-cyan shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-agency-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyber-cyan-bright" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-wider text-slate-100 flex items-center gap-1.5">
                  A.E.G.I.S.
                  <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyber-cyan font-mono border border-cyan-500/30">
                    INTEL
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight truncate">
                  CRIMINAL NETWORK ANALYSIS
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* System Threat Telemetry Banner */}
        {!collapsed && (
          <div className="mx-3 my-3 p-2.5 rounded-lg bg-gradient-to-r from-red-950/40 via-agency-900 to-agency-900 border border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-mono text-red-400 font-medium">THREAT LVL 4: CRITICAL</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">DEFCON 2</span>
          </div>
        )}

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyber-cyan/20 to-blue-600/10 text-cyber-cyan-bright border border-cyber-cyan/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`
                }
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${item.highlight ? 'text-cyber-cyan' : ''}`} />
                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono text-white ${item.badgeColor || 'bg-slate-800 border border-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
                {!collapsed && item.pulse && (
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User profile footer */}
        <div className="p-3 border-t border-slate-800/80 bg-agency-950/80">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-2`}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative shrink-0">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover border border-cyber-cyan/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-agency-950" />
              </div>
              {!collapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {user?.name || 'Agent Vance'}
                  </span>
                  <span className="text-[10px] font-mono text-cyber-cyan truncate">
                    {user?.badgeNumber || 'AGY-7701'} • {user?.clearanceLevel || 'TOP SECRET'}
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Log Out Session"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800/60 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
