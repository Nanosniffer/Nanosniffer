import React from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { PoliceDatabaseProvider } from './context/PoliceDatabaseContext';
import { PoliceDatabaseModal } from './components/modals/PoliceDatabaseModal';
import { AppRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 0, // Always fetch fresh data instantly
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <PoliceDatabaseProvider>
              <HashRouter>
                <AppRoutes />
                <PoliceDatabaseModal />
              </HashRouter>
            </PoliceDatabaseProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
