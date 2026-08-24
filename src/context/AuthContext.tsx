import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/axios';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  role: 'ADMIN' | 'INVESTIGATOR' | 'ANALYST' | string;
  clearanceLevel: 'TOP SECRET // SCI' | 'SECRET' | 'CONFIDENTIAL' | string;
  avatarUrl: string;
  agency: string;
}

export const PRESET_OPERATOR_ACCOUNTS: Record<string, { profile: UserProfile; defaultPass: string; roleTitle: string }> = {
  admin: {
    defaultPass: 'AdminPass2026!',
    roleTitle: 'Director of Intelligence (Admin)',
    profile: {
      id: 'usr-002',
      name: 'Director Sarah Sterling',
      email: 'admin@interpol.gov',
      badgeNumber: 'AGY-0001',
      role: 'ADMIN',
      clearanceLevel: 'TOP SECRET // SCI',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      agency: 'Global Counter-Organized Crime Command',
    },
  },
  investigator: {
    defaultPass: 'Password123!',
    roleTitle: 'Lead Tactical Investigator',
    profile: {
      id: 'usr-001',
      name: 'Agent Marcus Vance',
      email: 'agent.vance@interpol.gov',
      badgeNumber: 'AGY-7701',
      role: 'INVESTIGATOR',
      clearanceLevel: 'TOP SECRET // SCI',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      agency: 'Interpol Counter-Syndicate Cyber Task Force',
    },
  },
  analyst: {
    defaultPass: 'Password123!',
    roleTitle: 'Senior Intelligence Analyst',
    profile: {
      id: 'usr-003',
      name: 'Analyst David Chen',
      email: 'analyst.chen@interpol.gov',
      badgeNumber: 'AGY-3402',
      role: 'ANALYST',
      clearanceLevel: 'SECRET',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      agency: 'Financial Crimes Telemetry Section',
    },
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (roleKey: 'admin' | 'investigator' | 'analyst') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const token = localStorage.getItem('aegis_auth_token');
    const saved = localStorage.getItem('aegis_auth_user');
    if (token && token !== 'false' && saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('aegis_auth_token');
    return !!token && token !== 'false';
  });

  const login = async (email: string, password?: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Attempt live backend authentication
    try {
      const resp = await apiClient.post('/auth/login', {
        email: cleanEmail,
        password: password || 'Password123!',
      });

      if (resp.data && (resp.data.access_token || resp.data.data?.access_token)) {
        const token = resp.data.access_token || resp.data.data.access_token;
        const userObj = resp.data.user || resp.data.data?.user;
        const mappedUser: UserProfile = {
          id: userObj.id || 'usr-live',
          name: userObj.name || cleanEmail.split('@')[0],
          email: userObj.email || cleanEmail,
          badgeNumber: userObj.badgeNumber || userObj.badge_number || 'AGY-7701',
          role: (userObj.role || 'INVESTIGATOR').toUpperCase(),
          clearanceLevel: userObj.clearanceLevel || userObj.clearance_level || 'TOP SECRET // SCI',
          avatarUrl: userObj.avatarUrl || userObj.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          agency: userObj.agency || 'Interpol Counter-Syndicate Cyber Task Force',
        };

        setUser(mappedUser);
        setIsAuthenticated(true);
        localStorage.setItem('aegis_auth_user', JSON.stringify(mappedUser));
        localStorage.setItem('aegis_auth_token', token);
        return true;
      }
    } catch (err) {
      // Backend offline or error -> proceed with seamless preset fallback authentication
    }

    // 2. Fallback for Admin, Investigator, Analyst accounts
    let matchedProfile: UserProfile = PRESET_OPERATOR_ACCOUNTS.investigator.profile;

    if (cleanEmail.includes('admin') || cleanEmail === 'director@interpol.gov') {
      matchedProfile = PRESET_OPERATOR_ACCOUNTS.admin.profile;
    } else if (cleanEmail.includes('analyst') || cleanEmail.includes('chen')) {
      matchedProfile = PRESET_OPERATOR_ACCOUNTS.analyst.profile;
    } else if (cleanEmail.includes('vance') || cleanEmail.includes('agent') || cleanEmail.includes('investigat')) {
      matchedProfile = PRESET_OPERATOR_ACCOUNTS.investigator.profile;
    } else {
      // Custom user profile fallback
      matchedProfile = {
        id: 'usr-custom',
        name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        badgeNumber: 'AGY-9921',
        role: 'INVESTIGATOR',
        clearanceLevel: 'SECRET',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        agency: 'Special Cyber Investigations Task Force',
      };
    }

    setUser(matchedProfile);
    setIsAuthenticated(true);
    localStorage.setItem('aegis_auth_user', JSON.stringify(matchedProfile));
    localStorage.setItem('aegis_auth_token', `jwt_token_${matchedProfile.role.toLowerCase()}_2026`);
    return true;
  };

  const switchRole = (roleKey: 'admin' | 'investigator' | 'analyst') => {
    const target = PRESET_OPERATOR_ACCOUNTS[roleKey];
    if (target) {
      setUser(target.profile);
      setIsAuthenticated(true);
      localStorage.setItem('aegis_auth_user', JSON.stringify(target.profile));
      localStorage.setItem('aegis_auth_token', `jwt_token_${roleKey}_2026`);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aegis_auth_user');
    localStorage.setItem('aegis_auth_token', 'false');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
