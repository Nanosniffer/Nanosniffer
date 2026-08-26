import React, { createContext, useContext, useState, useEffect } from 'react';
import { RiskLevel } from '../types';

export interface TacticalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'suspect' | 'risk' | 'ai_insight' | 'investigation' | 'system';
  severity: RiskLevel;
  isRead: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: TacticalNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<TacticalNotification, 'id' | 'time' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const STORAGE_KEY = 'acn_notifications_cache';

const INITIAL_NOTIFICATIONS: TacticalNotification[] = [
  {
    id: 'notif-01',
    title: 'High Risk Spike Detected',
    message: 'Port of Rotterdam Terminal threat probability updated to 98% (CRITICAL)',
    time: '2m ago',
    type: 'risk',
    severity: 'CRITICAL',
    isRead: false,
    link: '/alerts'
  },
  {
    id: 'notif-02',
    title: 'New Suspect Associate Linked',
    message: 'Biometric hit linked Gabriel Mendoza to Cali-Medellin Maritime Coalition',
    time: '14m ago',
    type: 'suspect',
    severity: 'HIGH',
    isRead: false,
    link: '/criminals'
  },
  {
    id: 'notif-03',
    title: 'AI Neural Insight Generated',
    message: 'Disruption simulation predicts 78% network collapse upon Vance-Mansoor interdiction',
    time: '42m ago',
    type: 'ai_insight',
    severity: 'HIGH',
    isRead: false,
    link: '/reports'
  },
  {
    id: 'notif-04',
    title: 'Investigation Phase Completed',
    message: 'Financial audit completed for Operation Ghost Vault ($18.4M traced)',
    time: '1h ago',
    type: 'investigation',
    severity: 'MEDIUM',
    isRead: true,
    link: '/dashboard'
  }
];

const getStoredNotifications = (): TacticalNotification[] => {
  try {
    if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error(err);
  }
  return INITIAL_NOTIFICATIONS;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<TacticalNotification[]>(getStoredNotifications);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      }
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Listen for cross-component notification broadcasts
  useEffect(() => {
    const handleCustomNotif = (e: any) => {
      if (e?.detail) {
        const item = e.detail;
        const newNotif: TacticalNotification = {
          ...item,
          id: `notif-${Date.now()}`,
          time: 'Just now',
          isRead: false,
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    };

    window.addEventListener('acn_broadcast_notification', handleCustomNotif);
    return () => window.removeEventListener('acn_broadcast_notification', handleCustomNotif);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (item: Omit<TacticalNotification, 'id' | 'time' | 'isRead'>) => {
    const newNotif: TacticalNotification = {
      ...item,
      id: `notif-${Date.now()}`,
      time: 'Just now',
      isRead: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
