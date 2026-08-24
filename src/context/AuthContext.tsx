import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  role: string;
  clearanceLevel: 'TOP SECRET // SCI' | 'SECRET' | 'CONFIDENTIAL';
  avatarUrl: string;
  agency: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-001',
  name: 'Agent Marcus Vance',
  email: 'agent.vance@interpol.gov',
  badgeNumber: 'AGY-7701',
  role: 'Lead Intelligence Analyst',
  clearanceLevel: 'TOP SECRET // SCI',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  agency: 'Interpol Counter-Syndicate Cyber Task Force',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aegis_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for smooth exploration, can logout to test Login page
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aegis_auth_token') !== 'false';
  });

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // Simulated authentication API response
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('aegis_auth_user', JSON.stringify(loggedUser));
    localStorage.setItem('aegis_auth_token', 'jwt_fake_token_aegis_2026');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aegis_auth_user');
    localStorage.setItem('aegis_auth_token', 'false');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
