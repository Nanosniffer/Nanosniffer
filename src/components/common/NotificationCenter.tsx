import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Trash2, ShieldAlert, AlertTriangle, Lightbulb, FileText, ArrowRight } from 'lucide-react';
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
        return <AlertTriangle className="w-3.5 h-3.5 text-red-600" />;
      case 'suspect':
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />;
      case 'ai_insight':
        return <Lightbulb className="w-3.5 h-3.5 text-brand-600" />;
      case 'investigation':
        return <FileText className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[95vw] bg-white border border-slate-200 rounded-lg shadow-popover z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-slate-700" />
          <h3 className="font-semibold text-slate-900">Intelligence Notifications</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllAsRead}
            title="Mark all as read"
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={clearNotifications}
            title="Clear all"
            className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No unread intelligence alerts.
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
              className={`p-3 transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-2.5 ${
                !item.isRead ? 'bg-blue-50/40' : ''
              }`}
            >
              <div className="mt-0.5 p-1.5 rounded-md bg-white border border-slate-200 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-semibold text-slate-900 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-slate-500 line-clamp-2 leading-relaxed text-[11px]">
                  {item.message}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <RiskBadge level={item.severity} className="text-[10px] py-0" />
                  {!item.isRead && (
                    <span className="text-[10px] text-brand-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600" /> New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            navigate('/alerts');
            onClose();
          }}
          className="w-full text-center text-xs font-semibold text-slate-700 hover:text-slate-900 py-1 flex items-center justify-center gap-1"
        >
          <span>View All Risk Alerts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
