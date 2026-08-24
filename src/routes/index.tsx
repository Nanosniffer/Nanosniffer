import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { CriminalProfiles } from '../pages/CriminalProfiles';
import { NetworkAnalysis } from '../pages/NetworkAnalysis';
import { IntelligenceFeed } from '../pages/IntelligenceFeed';
import { Alerts } from '../pages/Alerts';
import { InvestigationReports } from '../pages/InvestigationReports';
import { EvidenceTimeline } from '../pages/EvidenceTimeline';
import { Settings } from '../pages/Settings';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Root redirect: Goes straight to /login if unauthenticated, or /dashboard if logged in */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/criminals" element={<CriminalProfiles />} />
        <Route path="/network" element={<NetworkAnalysis />} />
        <Route path="/feed" element={<IntelligenceFeed />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<InvestigationReports />} />
        <Route path="/timeline" element={<EvidenceTimeline />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};
