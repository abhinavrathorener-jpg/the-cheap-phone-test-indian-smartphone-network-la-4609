import React from 'react';
import { Smartphone, ExternalLink, ShieldCheck, Heart, Terminal, Cpu } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 text-slate-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-200 text-sm">The Cheap Phone Test</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                v2.4 LTS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mb-3">
              Automated testing suite emulating low-end Android smartphones (Unisoc, MediaTek 2GB RAM), congested 2G/3G Indian cellular topologies, high latency, and memory pressure.
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>Optimized for Indian Next Billion Users (NBU) ecosystem</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </p>
          </div>

          {/* Col 2: Testing Modules */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Testing Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('devices')}
                  className="hover:text-slate-200 transition flex items-center gap-1.5"
                >
                  <Cpu className="w-3 h-3 text-violet-400" />
                  <span>JioPhone & Redmi 9A Lab</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('devices')}
                  className="hover:text-slate-200 transition"
                >
                  Slow 2G & Congested 4G Emulation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-slate-200 transition"
                >
                  Indian User Impact Scoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-test')}
                  className="hover:text-slate-200 transition"
                >
                  Live Browser DOM Inspection
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Benchmarks */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Research & Standards
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>TRAI Mobile Broadband Latency Reports</li>
              <li>Google Next Billion Users (NBU) Guidelines</li>
              <li>Chrome DevTools Protocol & Lighthouse</li>
              <li>Gemini 3.8 Flash AI Diagnostics</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Built with precision for developer teams targeting Bharat & Global Emerging Markets</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Node.js Express • Vite React • Tailwind CSS • Gemini API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
