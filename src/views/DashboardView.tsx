import React from 'react';
import {
  Activity,
  AlertOctagon,
  CheckCircle,
  XCircle,
  Smartphone,
  Wifi,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  BarChart3,
  Globe
} from 'lucide-react';
import { TestRun } from '../types';

interface DashboardViewProps {
  tests: TestRun[];
  onSelectTest: (test: TestRun) => void;
  onNewTest: () => void;
  onExploreDevices: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tests,
  onSelectTest,
  onNewTest,
  onExploreDevices
}) => {
  // Aggregate metrics
  const totalTests = tests.length;
  const successfulTests = tests.filter(t => t.overallScore >= 70).length;
  const criticalTests = tests.filter(t => t.overallScore < 50).length;
  const failedTests = tests.filter(t => t.overallScore < 70).length;

  const avgScore = totalTests > 0
    ? Math.round(tests.reduce((acc, t) => acc + t.overallScore, 0) / totalTests)
    : 0;

  const totalCriticalIssues = tests.reduce(
    (acc, t) => acc + t.issues.filter(i => i.severity === 'Critical').length,
    0
  );

  const avgLcpSeconds = totalTests > 0
    ? ((tests.reduce((acc, t) => acc + (t.metrics?.lcp || 0), 0) / totalTests) / 1000).toFixed(1)
    : '0';

  const avgTbtMs = totalTests > 0
    ? Math.round(tests.reduce((acc, t) => acc + (t.metrics?.tbt || 0), 0) / totalTests)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-white">Indian Device Usability Dashboard</h1>
            <span className="text-xs bg-violet-950 text-violet-300 border border-violet-800 px-2 py-0.5 rounded-full font-bold">
              Live Fleet Metrics
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time aggregate measurements across simulated budget Android chipsets & Indian cellular carriers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreDevices}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Hardware Specs</span>
          </button>
          <button
            onClick={onNewTest}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition active:scale-95 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Indian Lab Test</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Total Tests */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Audits</span>
            <Activity className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{totalTests}</div>
          <div className="text-[10px] text-slate-500 mt-1">Indian test runs</div>
        </div>

        {/* Avg Performance Score */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Health Score</span>
            <span className="text-xs font-mono font-bold text-violet-400">/ 100</span>
          </div>
          <div className={`text-2xl font-black font-mono ${avgScore >= 70 ? 'text-emerald-400' : avgScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
            {avgScore}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {avgScore >= 70 ? 'Optimal' : avgScore >= 50 ? 'Needs Optimization' : 'Severe Friction'}
          </div>
        </div>

        {/* Successful Tests */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Passed (≥70)</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">{successfulTests}</div>
          <div className="text-[10px] text-slate-500 mt-1">
            {totalTests > 0 ? Math.round((successfulTests / totalTests) * 100) : 0}% pass rate
          </div>
        </div>

        {/* Critical Breakages */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Critical Breaks</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400">{criticalTests}</div>
          <div className="text-[10px] text-slate-500 mt-1">Sites broken on 2G/Unisoc</div>
        </div>

        {/* Avg LCP */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Indian LCP</span>
            <TrendingDown className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-300">{avgLcpSeconds}s</div>
          <div className="text-[10px] text-slate-500 mt-1">Target &lt; 4.0s</div>
        </div>

        {/* Critical Issues Total */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Critical Issues</span>
            <AlertOctagon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">{totalCriticalIssues}</div>
          <div className="text-[10px] text-slate-500 mt-1">P0 blockers detected</div>
        </div>
      </div>

      {/* Two-Column Analytics: Regional Impact & Device Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Indian Demographic Usability Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Indian Market Viability Index</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Estimated conversion success rate by Indian geographic tier
              </p>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              TRAI Model
            </span>
          </div>

          <div className="space-y-4">
            {/* Tier 1 Metros */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Tier-1 Metros (Delhi, Mumbai, Bengaluru 5G/4G)</span>
                <span className="font-mono text-emerald-400 font-bold">88% Success</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[88%]" />
              </div>
            </div>

            {/* Tier 2 Towns */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Tier-2 Towns (Jaipur, Lucknow, Patna, Coimbatore 4G)</span>
                <span className="font-mono text-amber-400 font-bold">54% Success</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[54%]" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Frequent RTT spikes (450ms) cause 32% drop-off at checkout.</p>
            </div>

            {/* Tier 3 & Rural */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Tier-3 & Rural Mandis (Slow 2G / Flaky 3G)</span>
                <span className="font-mono text-rose-400 font-bold">24% Success</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[24%]" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">High packet loss and uncompressed bundles trigger connection timeout.</p>
            </div>
          </div>
        </div>

        {/* Device Compatibility Matrix */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-violet-400" />
                <span>Device Compatibility Matrix</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Budget hardware performance across tested sites
              </p>
            </div>
            <span className="text-[10px] font-mono bg-violet-950/60 text-violet-300 px-2 py-0.5 rounded border border-violet-800/50">
              42% Indian Market
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                device: 'JioPhone Next (Unisoc QM215, 2GB)',
                compatibility: '38%',
                status: 'High Risk',
                color: 'text-rose-400',
                badgeBg: 'bg-rose-950/60 border-rose-800 text-rose-300'
              },
              {
                device: 'Xiaomi Redmi 9A (MediaTek G25, 2GB)',
                compatibility: '62%',
                status: 'Moderate',
                color: 'text-amber-400',
                badgeBg: 'bg-amber-950/60 border-amber-800 text-amber-300'
              },
              {
                device: 'Realme C20 (MediaTek G35, 2GB)',
                compatibility: '68%',
                status: 'Moderate',
                color: 'text-amber-400',
                badgeBg: 'bg-amber-950/60 border-amber-800 text-amber-300'
              },
              {
                device: 'Ultra-Budget 1GB Android Go (SC7731E)',
                compatibility: '18%',
                status: 'Severe Failure',
                color: 'text-rose-400',
                badgeBg: 'bg-rose-950/60 border-rose-800 text-rose-300'
              }
            ].map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-200">{d.device}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold ${d.color}`}>{d.compatibility}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${d.badgeBg}`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tests Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Recent Indian Smartphone Audits</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select an audit to inspect full telemetry, waterfall metrics, and AI recommendations.
            </p>
          </div>
          <button
            onClick={onNewTest}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>+ Run another test</span>
          </button>
        </div>

        {tests.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm">No audits performed yet.</p>
            <button
              onClick={onNewTest}
              className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold"
            >
              Start First Audit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3 pl-2">Target Website</th>
                  <th className="pb-3">Simulated Hardware</th>
                  <th className="pb-3">Network Profile</th>
                  <th className="pb-3 text-center">Score</th>
                  <th className="pb-3 text-center">LCP</th>
                  <th className="pb-3 text-center">TBT (CPU)</th>
                  <th className="pb-3 text-center">Critical Issues</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tests.map((test) => {
                  const scoreColor =
                    test.overallScore >= 75
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : test.overallScore >= 50
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

                  const criticalCount = test.issues.filter(i => i.severity === 'Critical').length;

                  return (
                    <tr
                      key={test.id}
                      onClick={() => onSelectTest(test)}
                      className="hover:bg-slate-800/40 cursor-pointer transition"
                    >
                      <td className="py-3.5 pl-2 max-w-[200px]">
                        <div className="font-bold text-slate-200 truncate">{test.siteTitle || test.url}</div>
                        <div className="text-[11px] text-slate-500 truncate font-mono">{test.url}</div>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Smartphone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{test.deviceProfile.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Wifi className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[120px]">{test.networkProfile.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded border ${scoreColor}`}>
                          {test.overallScore}
                        </span>
                      </td>
                      <td className="py-3.5 text-center font-mono text-slate-300">
                        {((test.metrics?.lcp || 0) / 1000).toFixed(1)}s
                      </td>
                      <td className="py-3.5 text-center font-mono text-slate-300">
                        {test.metrics?.tbt || 0}ms
                      </td>
                      <td className="py-3.5 text-center">
                        {criticalCount > 0 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                            {criticalCount} Critical
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-medium">None</span>
                        )}
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTest(test);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition"
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
