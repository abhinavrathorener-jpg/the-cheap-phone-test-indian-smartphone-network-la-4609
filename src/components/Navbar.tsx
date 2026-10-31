import React, { useState, useEffect } from 'react';
import { Smartphone, Activity, History, PlusCircle, Sparkles, User, Wifi, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  user: UserAccount | null;
  onOpenAuth: () => void;
  onOpenNewTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onOpenAuth,
  onOpenNewTest,
}) => {
  const [serverHealth, setServerHealth] = useState<{ hasGeminiKey: boolean; status: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerHealth(data))
      .catch(() => setServerHealth({ hasGeminiKey: false, status: 'offline' }));
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'new-test', label: 'Run Audit', icon: PlusCircle },
    { id: 'devices', label: 'Device & Network Lab', icon: Layers },
    { id: 'history', label: 'Audit History', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 p-0.5 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-violet-400 group-hover:scale-110 transition" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                The Cheap Phone Test
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-violet-950/80 text-violet-300 border border-violet-800/50 px-2 py-0.5 rounded-full">
                India Lab 🇮🇳
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Simulating Real-World Indian Smartphone & Network Realities
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/70">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: AI Badge, New Test Button, User Profile */}
        <div className="flex items-center gap-3">
          {/* Gemini AI Status indicator */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
            title={serverHealth?.hasGeminiKey ? 'Gemini 3.8 Flash AI Engine Active' : 'Heuristic Engine Ready'}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="font-medium">
              {serverHealth?.hasGeminiKey ? 'Gemini 3.8 Flash' : 'AI Engine Ready'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Quick Action Button */}
          <button
            onClick={onOpenNewTest}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Start New Test</span>
            <span className="sm:hidden">Test</span>
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 text-[11px] font-bold">
              {user ? user.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="hidden sm:inline truncate max-w-[100px]">
              {user ? user.name : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
