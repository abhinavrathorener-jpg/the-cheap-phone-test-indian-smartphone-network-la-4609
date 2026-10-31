export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface DeviceProfile {
  id: string;
  name: string;
  brand: string;
  chipset: string;
  ram: string;
  ramMb: number;
  screen: string;
  screenWidth: number;
  screenHeight: number;
  os: string;
  cpuThrottlingMultiplier: number;
  marketShareIndiaPct: number;
  priceSegment: string;
  popularIn: string;
}

export interface NetworkProfile {
  id: string;
  name: string;
  technology: string;
  speed: string;
  speedKbps: number;
  rtt: number; // round trip time in ms
  packetLoss: number; // percentage
  description: string;
  typicalLocation: string;
}

export interface TestMetrics {
  ttfb: number; // ms
  fcp: number; // ms
  lcp: number; // ms
  tbt: number; // ms
  cls: number;
  speedIndex: number;
  domNodes: number;
  totalWeightKb: number;
  jsWeightKb: number;
  imageWeightKb: number;
  cssWeightKb: number;
  memoryPeakMb: number;
  assetsBreakdown?: {
    scripts: number;
    styles: number;
    images: number;
    forms: number;
    buttons: number;
    inputs: number;
  };
}

export interface DetectedIssue {
  id: string;
  title: string;
  category: string;
  severity: SeverityLevel;
  impactScore: number; // 0-100
  affectedUsersPct: number; // % of Indian budget phone users
  description: string;
  solution: string;
  codeSnippet?: string;
}

export interface AiAnalysisReport {
  executiveSummary: string;
  tierImpact: {
    tier1MetroPct: number;
    tier2TownsPct: number;
    tier3RuralPct: number;
    estimatedMonthlyRevenueRisk: string;
  };
  topRemediations: Array<{
    priority: 'P0' | 'P1' | 'P2';
    issueTitle: string;
    rootCause: string;
    impactPercentage: number;
    codeSnippet: string;
    expectedGain: string;
  }>;
  deviceStressAnalysis: {
    chipsetThermalAndJank: string;
    lmkKillRisk: string;
    touchResponsiveness: string;
  };
  networkOptimizationRoadmap: string[];
}

export interface TestRun {
  id: string;
  url: string;
  siteTitle: string;
  timestamp: string;
  statusCode?: number;
  deviceProfile: DeviceProfile;
  networkProfile: NetworkProfile;
  overallScore: number; // 0 - 100
  loadTimeMs: number;
  metrics: TestMetrics;
  issues: DetectedIssue[];
  aiSummary?: {
    verdict: string;
    keyFinding: string;
  };
  aiReport?: AiAnalysisReport;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  isGuest: boolean;
}
