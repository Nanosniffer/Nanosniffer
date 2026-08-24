import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, CheckCheck, Trash2, ShieldAlert, AlertTriangle, Lightbulb, FileText } from 'lucide-react';
import { useNotifications, TacticalNotification } from '../../context/NotificationContext';
import { RiskBadge } from './StatusBadge';
import { Button } from '../ui/button';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type: TacticalNotification['type']) => {
    switch (type) {
      case 'risk':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'suspect':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'ai_insight':
        return <Lightbulb className="w-4 h-4 text-cyber-cyan" />;
      case 'investigation':
        return <FileText className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 max-w-[95vw] bg-agency-900 border border-slate-700/80 rounded-xl shadow-2xl glass-panel z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-agency-950/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-sm font-semibold text-slate-100">Live Incident Alerts</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllAsRead}
            title="Mark all as read"
            className="p-1 text-slate-400 hover:text-cyber-cyan text-xs rounded hover:bg-slate-800 transition"
          >
            <CheckCheck className="w-4 h-4" />
          </button>
          <button
            onClick={clearNotifications}
            title="Clear all"
            className="p-1 text-slate-400 hover:text-red-400 text-xs rounded hover:bg-slate-800 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No active tactical notifications.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markAsRead(item.id);
                if (item.link) {
                  navigate(item.link);
                  onClose();
                }
              }}
              className={`p-3 transition-colors cursor-pointer hover:bg-slate-800/60 flex items-start gap-3 ${
                !item.isRead ? 'bg-cyber-cyan/5 border-l-2 border-cyber-cyan' : ''
              }`}
            >
              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-800/80 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <RiskBadge level={item.severity} className="text-[10px] py-0" />
                  {!item.isRead && (
                    <span className="text-[10px] text-cyber-cyan font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" /> New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-agency-950/90 border-t border-slate-800 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            navigate('/alerts');
            onClose();
          }}
          className="w-full text-xs text-cyber-cyan hover:text-cyber-cyan-bright"
        >
          View Full AI Alert Center →
        </Button>
      </div>
    </div>
  );
};
