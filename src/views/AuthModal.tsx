import React, { useState } from 'react';
import { X, User, ShieldCheck, Mail, Lock, Building, Check, Sparkles } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onClose
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const demoAccounts: UserAccount[] = [
    {
      id: 'usr-1',
      name: 'Abhinav Rathore',
      email: 'abhinavrathorener@gmail.com',
      company: 'BharatCommerce Labs',
      role: 'Staff Frontend Architect',
      isGuest: false
    },
    {
      id: 'usr-2',
      name: 'Priya Sharma',
      email: 'priya@fintech-pay.in',
      company: 'PayBharat UPI',
      role: 'Head of Mobile Web & Checkout',
      isGuest: false
    },
    {
      id: 'usr-guest',
      name: 'Guest Mobile Tester',
      email: 'guest@cheapphonetest.in',
      company: 'Independent Developer',
      role: 'Web Performance Tester',
      isGuest: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onLogin({
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || 'Software Team',
      role: 'Engineering Lead',
      isGuest: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {currentUser ? 'User Profile & Fleet Workspace' : isRegister ? 'Create Tester Account' : 'Sign In to Workspace'}
              </h3>
              <p className="text-[11px] text-slate-400">The Cheap Phone Test Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentUser ? (
          // Logged in state
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Engineer:</span>
                <span className="font-bold text-white text-sm">{currentUser.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-300 font-mono">{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Organization:</span>
                <span className="text-violet-300 font-semibold">{currentUser.company}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Role:</span>
                <span className="text-slate-300">{currentUser.role}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold transition"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          // Logged out form
          <div className="space-y-5">
            {/* Quick Demo Accounts */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick 1-Click Demo Profiles:
              </span>
              <div className="space-y-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      onLogin(acc);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left text-xs transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-slate-200 group-hover:text-violet-300 transition">
                        {acc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{acc.email}</div>
                    </div>
                    <span className="text-[10px] text-violet-400 font-medium">{acc.company}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <div className="h-px bg-slate-800 flex-1" />
              <span>or enter custom credentials</span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Mehta"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.in"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Company / Team (Optional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Zepto, Flipkart, Freelance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition mt-2"
              >
                Continue to Testing Fleet
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
