import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { AiInvestigatorDrawer } from '../ai/AiInvestigatorDrawer';
import { AddSuspectWizardModal } from '../modals/AddSuspectWizardModal';
import { Criminal } from '../../types';

export const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSuspectCreated = (newSuspect: Criminal) => {
    queryClient.invalidateQueries({ queryKey: ['criminals'] });
    navigate('/criminals');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main App Workspace */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onOpenIntake={() => setIntakeOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          <Outlet />
        </main>
      </div>

      {/* Global Command Palette */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* AI Investigator Assistant Drawer */}
      <AiInvestigatorDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* 5-Step Guided Suspect Addition Wizard Modal */}
      <AddSuspectWizardModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
        onSuccess={handleSuspectCreated}
      />
    </div>
  );
};
