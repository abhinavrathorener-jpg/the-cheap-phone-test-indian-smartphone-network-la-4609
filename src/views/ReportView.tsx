import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Smartphone,
  Wifi,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  Code,
  Copy,
  Check,
  TrendingDown,
  Globe,
  Cpu,
  Layers,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TestRun, AiAnalysisReport } from '../types';
import { MetricCard } from '../components/MetricCard';
import { generatePdfReport } from '../utils/pdfExport';
import { PhoneSimulator } from '../components/PhoneSimulator';

interface ReportViewProps {
  test: TestRun;
  onReRun: () => void;
  onBackToDashboard: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  test,
  onReRun,
  onBackToDashboard
}) => {
  const [aiReport, setAiReport] = useState<AiAnalysisReport | null>(test.aiReport || null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(test.issues[0]?.id || null);

  // Fetch AI analysis from backend if not already attached
  useEffect(() => {
    if (!aiReport) {
      setIsAiLoading(true);
      fetch('/api/test/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test })
      })
        .then(res => res.json())
        .then(data => {
          if (data.report) {
            setAiReport(data.report);
          }
        })
        .catch(err => console.error('AI analysis error:', err))
        .finally(() => setIsAiLoading(false));
    }
  }, [test, aiReport]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShare = () => {
    const summary = `The Cheap Phone Test Audit for ${test.url}:\nScore: ${test.overallScore}/100 on ${test.deviceProfile.name} under ${test.networkProfile.name}.\nLCP: ${(test.metrics.lcp / 1000).toFixed(1)}s, TBT: ${test.metrics.tbt}ms.`;
    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const scoreColor =
    test.overallScore >= 75
      ? 'from-emerald-600 to-teal-500 text-emerald-400'
      : test.overallScore >= 50
      ? 'from-amber-600 to-orange-500 text-amber-400'
      : 'from-rose-600 to-red-600 text-rose-400';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
              showSimulator
                ? 'bg-violet-950 text-violet-300 border-violet-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-violet-400" />
            <span>{showSimulator ? 'Hide Device View' : 'Inspect Live Phone'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedShare ? 'Copied Summary!' : 'Share Audit'}</span>
          </button>

          <button
            onClick={() => generatePdfReport({ ...test, aiReport: aiReport || undefined })}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/25 transition flex items-center gap-2 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Indian Smartphone Performance Audit
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                {new Date(test.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {test.siteTitle || 'Target Application Audit'}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-400 truncate max-w-2xl">
              {test.url}
            </p>

            {/* Hardware & Network tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-violet-400" />
                <span>{test.deviceProfile.name} ({test.deviceProfile.chipset})</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <span>{test.networkProfile.name} ({test.networkProfile.speed})</span>
              </div>
            </div>
          </div>

          {/* Large Overall Score Badge */}
          <div className="flex items-center gap-4 self-start lg:self-center bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                Indian Health Score
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {test.overallScore >= 75 ? 'Optimal for NBU' : test.overallScore >= 50 ? 'Moderate Friction' : 'Severe Indian Drop-off'}
              </span>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center shadow-inner">
              <span className={`text-3xl font-black font-mono leading-none ${scoreColor.split(' ').pop()}`}>
                {test.overallScore}
              </span>
              <span className="text-[9px] font-mono text-slate-500 mt-1">/ 100</span>
            </div>
          </div>
        </div>

        {/* Executive AI Verdict */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-300">
                  AI Architecture Verdict
                </span>
                <span className="text-[10px] font-mono text-slate-500">Gemini 3.8 Flash</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {aiReport?.executiveSummary || test.aiSummary?.verdict || 'Analyzing real-world Indian smartphone telemetry...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Live Phone Simulator Drawer */}
      {showSimulator && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col items-center">
          <div className="text-center mb-4">
            <h3 className="text-sm font-bold text-white">Live Indian Viewport Sandbox</h3>
            <p className="text-xs text-slate-400">Interactively inspect rendering on {test.deviceProfile.name}</p>
          </div>
          <PhoneSimulator
            url={test.url}
            device={test.deviceProfile}
            network={test.networkProfile}
          />
        </div>
      )}

      {/* Indian Geographic Demographic Projection Card */}
      {aiReport?.tierImpact && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-indigo-950/30 border border-indigo-500/30 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Indian Regional Conversion & Market Viability</h3>
            </div>
            <div className="text-xs font-mono text-rose-400 bg-rose-950/50 border border-rose-800/40 px-2.5 py-1 rounded-lg">
              Est. Monthly Drop-Off Risk: <span className="font-bold">{aiReport.tierImpact.estimatedMonthlyRevenueRisk}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Tier 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Tier-1 Metros (Delhi, Mumbai 5G/4G)</div>
              <div className="text-xl font-black font-mono text-emerald-400">
                {aiReport.tierImpact.tier1MetroPct}%
              </div>
              <p className="text-[10px] text-slate-500 mt-1">High bandwidth absorbs heavy JS bundles.</p>
            </div>

            {/* Tier 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Tier-2 Towns (Jaipur, Lucknow 4G)</div>
              <div className="text-xl font-black font-mono text-amber-400">
                {aiReport.tierImpact.tier2TownsPct}%
              </div>
              <p className="text-[10px] text-slate-500 mt-1">450ms RTT causes noticeable payment delays.</p>
            </div>

            {/* Tier 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Tier-3 & Rural (Slow 2G/3G)</div>
              <div className="text-xl font-black font-mono text-rose-400">
                {aiReport.tierImpact.tier3RuralPct}%
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Frequent timeouts trigger 60%+ bounce rate.</p>
            </div>
          </div>
        </div>
      )}

      {/* Core Web Vitals under Indian Conditions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>Real-World Indian Performance Measurements</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Throttled on {test.deviceProfile.chipset}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Largest Contentful Paint (LCP)"
            value={`${(test.metrics.lcp / 1000).toFixed(1)}`}
            unit="s"
            status={test.metrics.lcp <= 3500 ? 'good' : test.metrics.lcp <= 6500 ? 'warning' : 'critical'}
            benchmark="< 3.5s on Indian 4G"
            impactExplanation="On Indian prepaid data, users abandon sessions if main content doesn't paint within 5 seconds."
          />

          <MetricCard
            label="Total Blocking Time (TBT)"
            value={test.metrics.tbt}
            unit="ms"
            status={test.metrics.tbt <= 400 ? 'good' : test.metrics.tbt <= 1500 ? 'warning' : 'critical'}
            benchmark="< 400ms on 28nm CPU"
            impactExplanation="Unisoc & Helio single cores lock up during script execution, rendering buttons and inputs unclickable."
          />

          <MetricCard
            label="Peak RAM Estimate"
            value={test.metrics.memoryPeakMb}
            unit="MB"
            status={test.metrics.memoryPeakMb <= 90 ? 'good' : test.metrics.memoryPeakMb <= 150 ? 'warning' : 'critical'}
            benchmark="< 120MB for 2GB RAM"
            impactExplanation="Android OS Low Memory Killer (LMK) will forcefully kill this tab if background WhatsApp or UPI runs."
          />

          <MetricCard
            label="Total Weight (Over the Air)"
            value={(test.metrics.totalWeightKb / 1024).toFixed(1)}
            unit="MB"
            status={test.metrics.totalWeightKb <= 1200 ? 'good' : test.metrics.totalWeightKb <= 2500 ? 'warning' : 'critical'}
            benchmark="< 1.5MB for 2G/3G"
            impactExplanation={`Payload takes ${Math.round((test.metrics.totalWeightKb * 8) / (test.networkProfile.speedKbps || 450))}s to download on ${test.networkProfile.name}.`}
          />
        </div>
      </div>

      {/* Asset Breakdown Strip */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-semibold text-slate-300">Asset Payload Breakdown</span>
          <span className="text-[11px] text-slate-500 font-mono">Total: {test.metrics.totalWeightKb} KB</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
          <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
            <span className="text-slate-500 block">JavaScript</span>
            <span className="text-violet-300 font-bold">{test.metrics.jsWeightKb} KB</span>
          </div>
          <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
            <span className="text-slate-500 block">Images & Media</span>
            <span className="text-cyan-300 font-bold">{test.metrics.imageWeightKb} KB</span>
          </div>
          <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
            <span className="text-slate-500 block">Stylesheets (CSS)</span>
            <span className="text-indigo-300 font-bold">{test.metrics.cssWeightKb} KB</span>
          </div>
          <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
            <span className="text-slate-500 block">DOM Complexity</span>
            <span className="text-slate-200 font-bold">{test.metrics.domNodes} nodes</span>
          </div>
        </div>
      </div>

      {/* Ranked Issues & AI Remediation Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Prioritized Issues by Indian User Impact</span>
            </h2>
            <p className="text-xs text-slate-400">
              Ranked by severity, % of Indian users affected, and checkout/login criticality.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            {test.issues.length} Issues Identified
          </span>
        </div>

        <div className="space-y-3">
          {test.issues.map((issue, idx) => {
            const isExpanded = expandedIssueId === issue.id;
            const isCrit = issue.severity === 'Critical';

            return (
              <div
                key={issue.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
              >
                {/* Issue Header */}
                <div
                  onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                        isCrit
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {issue.severity.toUpperCase()}
                    </span>

                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{issue.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-violet-400 font-semibold">{issue.category}</span>
                        <span>•</span>
                        <span>
                          Impacts ~<strong className="text-slate-200">{issue.affectedUsersPct}%</strong> of Indian budget phone users
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400 hidden sm:inline">
                      Score: {issue.impactScore}/100
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Root Cause on Budget Devices & Indian Networks
                      </span>
                      <p className="text-slate-300 leading-relaxed">{issue.description}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20">
                      <span className="text-[10px] uppercase font-bold text-violet-300 block mb-1">
                        Recommended Solution
                      </span>
                      <p className="text-violet-200 leading-relaxed">{issue.solution}</p>
                    </div>

                    {/* Actionable Code Fix Snippet */}
                    {aiReport?.topRemediations?.[idx]?.codeSnippet && (
                      <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                        <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Remediation Code Snippet</span>
                          </span>
                          <button
                            onClick={() => handleCopyCode(issue.id, aiReport.topRemediations[idx].codeSnippet)}
                            className="flex items-center gap-1 text-[10px] hover:text-white transition"
                          >
                            {copiedCodeId === issue.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedCodeId === issue.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 font-mono text-[11px] text-cyan-200 overflow-x-auto leading-relaxed">
                          {aiReport.topRemediations[idx].codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hardware Stress & Network Roadmap */}
      {aiReport && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hardware Stress */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>Chipset & Memory Stress Diagnosis</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold block">Thermal & CPU Throttling</span>
                <p className="text-slate-300 mt-0.5">{aiReport.deviceStressAnalysis.chipsetThermalAndJank}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold block">Android Low Memory Killer (LMK) Risk</span>
                <p className="text-slate-300 mt-0.5 font-semibold text-rose-400">
                  Risk Level: {aiReport.deviceStressAnalysis.lmkKillRisk}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold block">Touch & Keyboard Latency</span>
                <p className="text-slate-300 mt-0.5">{aiReport.deviceStressAnalysis.touchResponsiveness}</p>
              </div>
            </div>
          </div>

          {/* Network Roadmap */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>Indian Cellular Resilience Roadmap</span>
            </h3>
            <div className="space-y-2 text-xs">
              {aiReport.networkOptimizationRoadmap.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="w-4 h-4 rounded-full bg-cyan-600/30 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Re-run Bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        <button
          onClick={onBackToDashboard}
          className="text-xs text-slate-400 hover:text-white transition"
        >
          ← Return to Fleet Dashboard
        </button>
        <button
          onClick={onReRun}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-run Test with New Settings</span>
        </button>
      </div>
    </div>
  );
};
