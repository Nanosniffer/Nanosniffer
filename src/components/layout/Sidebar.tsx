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
  Briefcase,
  BarChart3,
  LogOut,
  Sparkles,
  PlusCircle,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useQuery } from '@tanstack/react-query';
import { getCriminals } from '../../api';
import nanoSnifferLogo from '../../assets/nanosniffer_logo.png';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavSection {
  title: string;
  items: {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
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
  const [sidebarIST, setSidebarIST] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setSidebarIST(new Intl.DateTimeFormat('en-IN', opts).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const totalCriminals = criminalsRes?.data?.length ?? 20;

  const sections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'INVESTIGATIONS',
      items: [
        { label: 'Network Analysis', path: '/network', icon: Share2, badge: 'Active', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
        { label: 'Criminal Profiles', path: '/criminals', icon: Users, badge: `${totalCriminals}` },
        { label: 'Add Suspect Profile', path: '/collect-evidence', icon: UserPlus, badge: 'Intake', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Intelligence Feed', path: '/feed', icon: Radio },
        { label: 'Risk & Alerts', path: '/alerts', icon: ShieldAlert, badge: unreadCount > 0 ? `${unreadCount}` : undefined, badgeColor: 'bg-red-50 text-red-700 border-red-200' },
        { label: 'Evidence Timeline', path: '/timeline', icon: Clock },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Investigation Reports', path: '/reports', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings & Config', path: '/settings', icon: Settings },
      ],
    },
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
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-60'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-3.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-0.5 shrink-0 shadow-subtle">
              <img src={nanoSnifferLogo} alt="NanoSniffer Logo" className="w-7 h-7 object-contain" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-tight text-slate-900 leading-none">
                  Nano<span className="text-blue-600">Sniffer</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight truncate mt-0.5">
                  Intelligence Grid
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <p className="px-2.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  {section.title}
                </p>
              )}
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group relative ${
                        isActive
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-slate-700" />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${
                          item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Indian Standard Time (IST) Live Widget in Sidebar */}
        {!collapsed ? (
          <div className="mx-2.5 mb-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/90 text-slate-700 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <span>🇮🇳</span> INDIAN TIME (IST)
              </span>
              <span className="text-[9px] bg-amber-200 text-amber-950 px-1 py-0.2 rounded font-mono font-bold">
                UTC+5:30
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse shrink-0" />
              <span>{sidebarIST || 'IST'}</span>
            </div>
          </div>
        ) : (
          <div 
            title={`Indian Standard Time: ${sidebarIST}`}
            className="mx-auto mb-2 w-9 h-9 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center text-sm cursor-help"
          >
            🇮🇳
          </div>
        )}

        {/* User Session Footer */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50/70">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-2`}>
            <div className="flex items-center gap-2 overflow-hidden min-w-0">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-slate-900 truncate">
                    {user?.name || 'Officer'}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {user?.role || 'INVESTIGATOR'} • {user?.badgeNumber || 'AGY-7701'}
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Log Out Session"
                className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-md transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
