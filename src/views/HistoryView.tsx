import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Smartphone,
  Wifi,
  ArrowRight,
  GitCompare,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  Plus
} from 'lucide-react';
import { TestRun } from '../types';
import { generatePdfReport } from '../utils/pdfExport';

interface HistoryViewProps {
  tests: TestRun[];
  onSelectTest: (test: TestRun) => void;
  onDeleteTest: (id: string) => void;
  onNewTest: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  tests,
  onSelectTest,
  onDeleteTest,
  onNewTest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState<'all' | 'critical' | 'degraded' | 'optimal'>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filtering
  const filteredTests = tests.filter((t) => {
    const matchesSearch =
      t.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.siteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.deviceProfile.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterScore === 'critical') return t.overallScore < 50;
    if (filterScore === 'degraded') return t.overallScore >= 50 && t.overallScore < 75;
    if (filterScore === 'optimal') return t.overallScore >= 75;

    return true;
  });

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const testA = tests.find((t) => t.id === selectedForCompare[0]);
  const testB = tests.find((t) => t.id === selectedForCompare[1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <History className="w-6 h-6 text-violet-400" />
            <span>Indian Audit History & Fleet Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse previous test audits or select any two to compare hardware & network deltas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedForCompare.length === 2 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 animate-bounce"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare Selected (2)</span>
            </button>
          )}

          <button
            onClick={onNewTest}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Test</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by URL, site title, or device..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>
          {[
            { id: 'all', label: 'All Audits' },
            { id: 'critical', label: 'Critical (<50)' },
            { id: 'degraded', label: 'Degraded (50-74)' },
            { id: 'optimal', label: 'Optimal (≥75)' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterScore(f.id as any)}
              className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
                filterScore === f.id
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audits Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        {filteredTests.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm">No matching audits found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3 pl-2 w-10 text-center">Compare</th>
                  <th className="pb-3">Site Title & URL</th>
                  <th className="pb-3">Device Spec</th>
                  <th className="pb-3">Network Profile</th>
                  <th className="pb-3 text-center">Score</th>
                  <th className="pb-3 text-center">LCP</th>
                  <th className="pb-3 text-center">TBT (CPU)</th>
                  <th className="pb-3 text-center">Date</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTests.map((test) => {
                  const isChecked = selectedForCompare.includes(test.id);
                  const scoreColor =
                    test.overallScore >= 75
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : test.overallScore >= 50
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

                  return (
                    <tr
                      key={test.id}
                      onClick={() => onSelectTest(test)}
                      className={`hover:bg-slate-800/40 cursor-pointer transition ${
                        isChecked ? 'bg-violet-950/20' : ''
                      }`}
                    >
                      <td
                        className="py-3.5 pl-2 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCompare(test.id)}
                          className="w-4 h-4 accent-violet-600 rounded cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 max-w-[220px]">
                        <div className="font-bold text-slate-200 truncate">{test.siteTitle}</div>
                        <div className="text-[11px] text-slate-500 font-mono truncate">{test.url}</div>
                      </td>

                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Smartphone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span className="truncate max-w-[130px]">{test.deviceProfile.name}</span>
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

                      <td className="py-3.5 text-center text-slate-400 font-mono text-[11px]">
                        {new Date(test.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </td>

                      <td className="py-3.5 pr-2 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => generatePdfReport(test)}
                            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                            title="Download PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTest(test.id)}
                            className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {showCompareModal && testA && testB && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Side-by-Side Indian Hardware Audit Delta</h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compared Entities Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              {/* Test A */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-violet-500/30">
                <span className="text-[10px] uppercase font-bold text-violet-400 block mb-1">Baseline Audit A</span>
                <div className="font-bold text-slate-200 text-sm truncate">{testA.siteTitle}</div>
                <div className="text-slate-400 mt-1">{testA.deviceProfile.name}</div>
                <div className="text-cyan-400 text-[11px]">{testA.networkProfile.name}</div>
                <div className="mt-3 text-2xl font-black font-mono text-violet-300">
                  {testA.overallScore} <span className="text-xs text-slate-500">/ 100</span>
                </div>
              </div>

              {/* Test B */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">Comparison Audit B</span>
                <div className="font-bold text-slate-200 text-sm truncate">{testB.siteTitle}</div>
                <div className="text-slate-400 mt-1">{testB.deviceProfile.name}</div>
                <div className="text-cyan-400 text-[11px]">{testB.networkProfile.name}</div>
                <div className="mt-3 text-2xl font-black font-mono text-indigo-300">
                  {testB.overallScore} <span className="text-xs text-slate-500">/ 100</span>
                </div>
              </div>
            </div>

            {/* Comparison Metrics Delta Table */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Core Metric Deltas</h4>
              <div className="space-y-1.5 font-mono">
                {[
                  {
                    name: 'Largest Contentful Paint (LCP)',
                    valA: `${(testA.metrics.lcp / 1000).toFixed(1)}s`,
                    valB: `${(testB.metrics.lcp / 1000).toFixed(1)}s`,
                    delta: `${((testB.metrics.lcp - testA.metrics.lcp) / 1000).toFixed(1)}s`,
                    isBetter: testB.metrics.lcp < testA.metrics.lcp
                  },
                  {
                    name: 'Total Blocking Time (TBT CPU)',
                    valA: `${testA.metrics.tbt}ms`,
                    valB: `${testB.metrics.tbt}ms`,
                    delta: `${testB.metrics.tbt - testA.metrics.tbt}ms`,
                    isBetter: testB.metrics.tbt < testA.metrics.tbt
                  },
                  {
                    name: 'Peak Memory Footprint',
                    valA: `${testA.metrics.memoryPeakMb}MB`,
                    valB: `${testB.metrics.memoryPeakMb}MB`,
                    delta: `${testB.metrics.memoryPeakMb - testA.metrics.memoryPeakMb}MB`,
                    isBetter: testB.metrics.memoryPeakMb < testA.metrics.memoryPeakMb
                  },
                  {
                    name: 'Total Payload Weight',
                    valA: `${testA.metrics.totalWeightKb}KB`,
                    valB: `${testB.metrics.totalWeightKb}KB`,
                    delta: `${testB.metrics.totalWeightKb - testA.metrics.totalWeightKb}KB`,
                    isBetter: testB.metrics.totalWeightKb < testA.metrics.totalWeightKb
                  }
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300"
                  >
                    <span className="font-sans font-medium text-slate-200">{row.name}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-slate-400">{row.valA}</span>
                      <span className="text-slate-400">{row.valB}</span>
                      <span className={`font-bold ${row.isBetter ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
