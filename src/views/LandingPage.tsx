import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Activity,
  FileText,
  AlertTriangle,
  Zap,
  Globe2,
  CheckCircle,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { SAMPLE_TARGETS, INDIAN_ECOSYSTEM_STATS } from '../constants/presets';

interface LandingPageProps {
  onStartAudit: (url: string) => void;
  onExploreDashboard: () => void;
  onConfigureDevices: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAudit,
  onExploreDashboard,
  onConfigureDevices
}) => {
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onStartAudit(urlInput.trim());
    }
  };

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center pt-6 pb-12">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Indian Flag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-violet-500/30 text-violet-300 text-xs font-semibold shadow-inner mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>India Smartphone & Network Reality Lab</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">PS T1.2 Measurement & Data</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Does Your Web App Survive a{' '}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            ₹5,000 Phone on Slow 2G?
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Over 500 million Indian smartphone users browse on 2GB RAM devices (Unisoc & MediaTek chips) over congested cellular networks. Test your website against real-world Indian conditions, detect breaking UI and RAM crashes, and rank issues by customer impact.
        </p>

        {/* URL Input Form */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl focus-within:border-violet-500 transition"
          >
            <div className="flex items-center gap-2.5 px-3 flex-1 w-full text-slate-300">
              <Globe2 className="w-5 h-5 text-violet-400 shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter website URL (e.g. flipkart.com, myapp.in, localhost:5173)"
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-slate-500 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition active:scale-95 shrink-0"
            >
              <span>Test Budget Phone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-500 font-medium">Quick benchmarks:</span>
            {SAMPLE_TARGETS.slice(0, 4).map((target) => (
              <button
                key={target.url}
                onClick={() => onStartAudit(target.url)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <span>{target.name.split(' (')[0]}</span>
                <span className="text-[10px] text-violet-400 font-mono">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <button
            onClick={onExploreDashboard}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Open Performance Dashboard</span>
          </button>
          <button
            onClick={onConfigureDevices}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Explore Indian Device & Network Lab</span>
          </button>
        </div>
      </section>

      {/* Indian Ecosystem Benchmark Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest">
            The Indian Mobile Reality Check
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Why Standard Lighthouse & Chrome DevTools Fall Short
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDIAN_ECOSYSTEM_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-violet-500/40 transition"
            >
              <div className="text-3xl font-black font-mono bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mb-1">{stat.label}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{stat.desc}</p>
              <div className="text-[10px] text-violet-400/80 font-mono">
                Source: {stat.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Automated Testing Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Built from the Ground Up for Indian Smartphone Conditions
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Every test runs real network benchmarks while mathematically simulating CPU core throttling, thermal degradation, and network packet loss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-violet-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Budget Android Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Simulate JioPhone Next (Unisoc SC9863A), Xiaomi Redmi 9A, and 1GB RAM Android Go devices. Uncover single-core JS blocking, RAM exhaustion, and Android Low Memory Killer (LMK) tab terminations.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1GB - 2GB RAM Heap Stress</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>6x CPU Throttling on 28nm Chips</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Small 360px & 320px Viewport Fitting</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-indigo-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Indian Cellular Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Emulate Slow 2G (Edge: 56 kbps, 1850ms RTT), Tier-3 Rural 3G, and congested peak-hour 4G. Experience real packet drops, DNS delays, and asset timeouts.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>15% Packet Loss & Jitter Emulation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>High Latency (Up to 1,850ms RTT)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Post-FUP 128 kbps Bandwidth Cap</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-cyan-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI-Powered User Impact Ranking</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Integrated with Gemini 3.8 Flash to prioritize detected issues by estimated Indian revenue loss, Tier-2/Tier-3 city drop-offs, and produce ready-to-merge code fixes.
            </p>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Tier 1 vs 2 vs 3 Drop-Off Projection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>OTP & UPI Input Friction Audits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Downloadable Executive PDF Reports</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-violet-900/60 via-indigo-900/40 to-slate-900 border border-violet-500/30 text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-300">
              Zero Setup Required
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
              Ready to verify if your web app works for the Next Billion Users?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Run automated browser tests, review live device telemetry, and obtain AI recommendations in seconds.
            </p>
            <button
              onClick={() => onStartAudit('https://m.flipkart.com')}
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-2xl transition active:scale-95 inline-flex items-center gap-2"
            >
              <span>Run Sample Benchmark Audit</span>
              <ArrowRight className="w-4 h-4 text-violet-600" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
