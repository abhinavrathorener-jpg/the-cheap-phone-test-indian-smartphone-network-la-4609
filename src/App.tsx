import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { NewTestView } from './views/NewTestView';
import { LiveRunnerView } from './views/LiveRunnerView';
import { ReportView } from './views/ReportView';
import { DevicesView } from './views/DevicesView';
import { HistoryView } from './views/HistoryView';
import { AuthModal } from './views/AuthModal';
import { TestRun, DeviceProfile, NetworkProfile, UserAccount } from './types';
import { DEVICE_PROFILES, NETWORK_PROFILES } from './constants/presets';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [tests, setTests] = useState<TestRun[]>([]);
  const [activeTest, setActiveTest] = useState<TestRun | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [newTestInitialUrl, setNewTestInitialUrl] = useState('');

  // Runner state
  const [runnerConfig, setRunnerConfig] = useState<{
    url: string;
    device: DeviceProfile;
    network: NetworkProfile;
    options: any;
  } | null>(null);

  // Authenticated user state
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('cheap_phone_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'usr-1',
      name: 'Abhinav Rathore',
      email: 'abhinavrathorener@gmail.com',
      company: 'BharatCommerce Labs',
      role: 'Staff Frontend Architect',
      isGuest: false
    };
  });

  // Load tests from backend on mount
  useEffect(() => {
    fetch('/api/tests')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.tests)) {
          setTests(data.tests);
        }
      })
      .catch(err => console.error('Failed to load tests:', err));
  }, []);

  const handleUserLogin = (newUser: UserAccount) => {
    setUser(newUser);
    try {
      localStorage.setItem('cheap_phone_user', JSON.stringify(newUser));
    } catch {}
  };

  const handleUserLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('cheap_phone_user');
    } catch {}
  };

  const handleStartAuditFromHero = (url: string) => {
    setNewTestInitialUrl(url);
    setCurrentTab('new-test');
  };

  const handleRunTest = (
    url: string,
    device: DeviceProfile,
    network: NetworkProfile,
    options: any
  ) => {
    setRunnerConfig({ url, device, network, options });
    setCurrentTab('live-runner');
  };

  const handleTestComplete = (completedTest: TestRun) => {
    setActiveTest(completedTest);
    setTests(prev => [completedTest, ...prev.filter(t => t.id !== completedTest.id)]);
    setCurrentTab('report');
  };

  const handleSelectTest = (test: TestRun) => {
    setActiveTest(test);
    setCurrentTab('report');
  };

  const handleDeleteTest = async (id: string) => {
    try {
      await fetch(`/api/tests/${id}`, { method: 'DELETE' });
      setTests(prev => prev.filter(t => t.id !== id));
      if (activeTest?.id === id) {
        setActiveTest(null);
        setCurrentTab('dashboard');
      }
    } catch (e) {
      console.error('Failed to delete test:', e);
    }
  };

  const handleSelectDeviceForTest = (device: DeviceProfile) => {
    setRunnerConfig({
      url: 'https://m.flipkart.com',
      device,
      network: NETWORK_PROFILES[0],
      options: { checkBrokenAssets: true, checkFormsAndOtp: true, checkMemoryLmk: true, checkViewportOverflow: true }
    });
    setCurrentTab('new-test');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-violet-600/30 selection:text-violet-200">
      {/* Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenNewTest={() => {
          setNewTestInitialUrl('');
          setCurrentTab('new-test');
        }}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartAudit={handleStartAuditFromHero}
            onExploreDashboard={() => setCurrentTab('dashboard')}
            onConfigureDevices={() => setCurrentTab('devices')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            tests={tests}
            onSelectTest={handleSelectTest}
            onNewTest={() => setCurrentTab('new-test')}
            onExploreDevices={() => setCurrentTab('devices')}
          />
        )}

        {currentTab === 'new-test' && (
          <NewTestView
            initialUrl={newTestInitialUrl}
            onRunTest={handleRunTest}
          />
        )}

        {currentTab === 'live-runner' && runnerConfig && (
          <LiveRunnerView
            url={runnerConfig.url}
            device={runnerConfig.device}
            network={runnerConfig.network}
            options={runnerConfig.options}
            onTestComplete={handleTestComplete}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'report' && activeTest && (
          <ReportView
            test={activeTest}
            onReRun={() => {
              setNewTestInitialUrl(activeTest.url);
              setCurrentTab('new-test');
            }}
            onBackToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'devices' && (
          <DevicesView
            onSelectDeviceForTest={handleSelectDeviceForTest}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            tests={tests}
            onSelectTest={handleSelectTest}
            onDeleteTest={handleDeleteTest}
            onNewTest={() => setCurrentTab('new-test')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentTab} />

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          currentUser={user}
          onLogin={handleUserLogin}
          onLogout={handleUserLogout}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
};
