import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Smartphone,
  Wifi,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Layers
} from 'lucide-react';
import { DeviceProfile, NetworkProfile, TestRun } from '../types';
import { PhoneSimulator } from '../components/PhoneSimulator';

interface LiveRunnerViewProps {
  url: string;
  device: DeviceProfile;
  network: NetworkProfile;
  options: any;
  onTestComplete: (test: TestRun) => void;
  onCancel: () => void;
}

interface TestStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'failed';
  detail?: string;
}

export const LiveRunnerView: React.FC<LiveRunnerViewProps> = ({
  url,
  device,
  network,
  options,
  onTestComplete,
  onCancel
}) => {
  const [progress, setProgress] = useState(12);
  const [completedTest, setCompletedTest] = useState<TestRun | null>(null);
  const [logs, setLogs] = useState<string[]>([
    `[INFO] Initializing Indian Smartphone Sandbox: ${device.name}`,
    `[INFO] Network profile set: ${network.name} (Speed: ${network.speed}, RTT: ${network.rtt}ms, Packet Loss: ${network.packetLoss}%)`,
    `[NET] Dispatching cellular handshake to ${url}...`
  ]);

  const [steps, setSteps] = useState<TestStep[]>([
    { id: '1', label: 'Cellular Gateway Handshake & TTFB', status: 'running', detail: `${network.rtt}ms RTT simulated` },
    { id: '2', label: 'DOM Parsing & Viewport Structure', status: 'pending' },
    { id: '3', label: `CPU Throttling (${device.cpuThrottlingMultiplier}x) & V8 JS Compilation`, status: 'pending' },
    { id: '4', label: 'Asset Payload & 1GB/2GB RAM Memory Stress', status: 'pending' },
    { id: '5', label: 'Indian UX Friction (Forms, Touch Targets, OTP)', status: 'pending' },
    { id: '6', label: 'User Impact Ranking & Indian Market Scoring', status: 'pending' }
  ]);

  useEffect(() => {
    let isCancelled = false;

    async function executeTest() {
      try {
        // Step 1: Handshake
        await new Promise(r => setTimeout(r, 700));
        if (isCancelled) return;
        setProgress(28);
        setLogs(prev => [
          ...prev,
          `[NET] Connection established. Initial latency: ${network.rtt}ms.`,
          `[DOM] Requesting document body. User-Agent: Android 11 Go / Pragati OS`
        ]);
        setSteps(curr => curr.map((s, i) => i === 0 ? { ...s, status: 'done' } : i === 1 ? { ...s, status: 'running' } : s));

        // Step 2: DOM & Network fetch
        const fetchPromise = fetch('/api/test/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, deviceProfile: device, networkProfile: network, options })
        });

        await new Promise(r => setTimeout(r, 800));
        if (isCancelled) return;
        setProgress(48);
        setLogs(prev => [
          ...prev,
          `[CPU] Applying ${device.cpuThrottlingMultiplier}x execution slowdown to simulate ${device.chipset}.`,
          `[MEM] Monitoring heap allocation against ${device.ram} threshold...`
        ]);
        setSteps(curr => curr.map((s, i) => i === 1 ? { ...s, status: 'done' } : i === 2 ? { ...s, status: 'running' } : s));

        await new Promise(r => setTimeout(r, 900));
        if (isCancelled) return;
        setProgress(68);
        setLogs(prev => [
          ...prev,
          `[PERF] Calculating Total Blocking Time (TBT) and input responsiveness lag.`,
          `[UX] Verifying form input modes: Checking numeric keypad and autocomplete.`
        ]);
        setSteps(curr => curr.map((s, i) => i === 2 ? { ...s, status: 'done' } : i === 3 ? { ...s, status: 'running' } : s));

        const res = await fetchPromise;
        const data = await res.json();

        if (isCancelled) return;

        if (data.success && data.test) {
          setProgress(88);
          setLogs(prev => [
            ...prev,
            `[METRIC] LCP: ${(data.test.metrics.lcp / 1000).toFixed(1)}s, TBT: ${data.test.metrics.tbt}ms, Peak Heap: ${data.test.metrics.memoryPeakMb}MB`,
            `[IMPACT] Synthesizing Indian demographic conversion drop-off scores...`
          ]);
          setSteps(curr => curr.map((s, i) => i <= 4 ? { ...s, status: 'done' } : { ...s, status: 'running' }));

          await new Promise(r => setTimeout(r, 800));
          if (isCancelled) return;

          setProgress(100);
          setSteps(curr => curr.map(s => ({ ...s, status: 'done' })));
          setLogs(prev => [
            ...prev,
            `[DONE] Audit complete! Overall Health Score: ${data.test.overallScore}/100.`,
            `[DONE] Detected ${data.test.issues.length} friction points affecting Indian users.`
          ]);

          setCompletedTest(data.test);
        } else {
          throw new Error(data.error || 'Test runner returned failure status');
        }
      } catch (err: any) {
        console.error('Audit execution error:', err);
        setLogs(prev => [...prev, `[ERROR] Audit interrupted: ${err.message || String(err)}`]);
      }
    }

    executeTest();

    return () => {
      isCancelled = true;
    };
  }, [url, device, network, options]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Live Indian Smartphone Audit</h1>
          </div>
          <p className="text-xs text-slate-400 font-mono truncate max-w-xl">
            Target: <span className="text-slate-200">{url}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {completedTest ? (
            <button
              onClick={() => onTestComplete(completedTest)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 active:scale-95 animate-pulse"
            >
              <span>View Full AI Analysis Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition"
            >
              Cancel Audit
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2 mb-8 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Grid: Pipeline & Logs (Left) | Interactive Device Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Test Pipeline & Logs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Configuration Summary Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Device Profile</span>
              <div className="font-semibold text-slate-200 truncate">{device.name}</div>
              <div className="text-[10px] text-slate-400">{device.ram} • {device.chipset}</div>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Network Profile</span>
              <div className="font-semibold text-cyan-300 truncate">{network.name}</div>
              <div className="text-[10px] text-slate-400">{network.speed} • {network.rtt}ms RTT</div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">CPU Throttling</span>
              <div className="font-mono font-bold text-amber-400">{device.cpuThrottlingMultiplier}x Slowdown</div>
              <div className="text-[10px] text-slate-400">Unisoc / MediaTek simulation</div>
            </div>
          </div>

          {/* Step Pipeline Checklist */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Verification Pipeline
            </h3>
            <div className="space-y-2.5">
              {steps.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/50 border border-slate-800/80"
                >
                  <div className="flex items-center gap-2.5">
                    {st.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : st.status === 'running' ? (
                      <div className="w-4 h-4 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900 shrink-0" />
                    )}
                    <span className={st.status === 'done' ? 'text-slate-200' : st.status === 'running' ? 'text-violet-300 font-semibold' : 'text-slate-500'}>
                      {st.label}
                    </span>
                  </div>

                  {st.detail && (
                    <span className="text-[10px] font-mono text-slate-400">{st.detail}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Live Telemetry Console Log */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span>DevTools Cellular Console</span>
              </div>
              <span className="text-[10px] text-slate-500">Live stream</span>
            </div>

            <div className="p-4 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-56 overflow-y-auto">
              {logs.map((log, idx) => {
                const isError = log.includes('[ERROR]');
                const isMetric = log.includes('[METRIC]') || log.includes('[DONE]');
                const isNet = log.includes('[NET]');
                return (
                  <div
                    key={idx}
                    className={`${
                      isError
                        ? 'text-rose-400 font-bold'
                        : isMetric
                        ? 'text-emerald-400 font-semibold'
                        : isNet
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Phone Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <PhoneSimulator
            url={url}
            device={device}
            network={network}
            isLoading={!completedTest}
          />
        </div>
      </div>
    </div>
  );
};
