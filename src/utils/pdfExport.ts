import { jsPDF } from 'jspdf';
import { TestRun } from '../types';

export function generatePdfReport(test: TestRun): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Bar (Deep Navy with Purple accent)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(124, 58, 237); // violet-600
  doc.rect(0, 26, pageWidth, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(248, 250, 252);
  doc.text('THE CHEAP PHONE TEST', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(196, 181, 253);
  doc.text('Indian Smartphone & Network Web Usability Audit', 14, 18);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const formattedDate = new Date(test.timestamp).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  doc.text(`Report Date: ${formattedDate} | ID: ${test.id}`, pageWidth - 14, 18, { align: 'right' });

  y = 36;

  // Target Site & Score summary box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(test.siteTitle || 'Target Application Audit', 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`URL: ${test.url}`, 20, y + 14);
  doc.text(`Simulated Hardware: ${test.deviceProfile.name} (${test.deviceProfile.chipset})`, 20, y + 19);
  doc.text(`Network Profile: ${test.networkProfile.name} (${test.networkProfile.speed})`, 20, y + 24);

  // Score Badge
  const scoreX = pageWidth - 42;
  const scoreY = y + 4;
  const scoreColor = test.overallScore >= 80 ? [16, 185, 129] : test.overallScore >= 50 ? [245, 158, 11] : [239, 68, 68];
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.roundedRect(scoreX, scoreY, 24, 20, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(String(test.overallScore), scoreX + 12, scoreY + 11, { align: 'center' });
  doc.setFontSize(7);
  doc.text('/ 100 SCORE', scoreX + 12, scoreY + 16, { align: 'center' });

  y += 34;

  // Key Measured Metrics Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Performance Under Indian Conditions', 14, y);

  y += 5;
  const metricsBoxWidth = (pageWidth - 28 - 12) / 4;
  const metricsData = [
    { label: 'Time to First Byte', value: `${test.metrics.ttfb} ms`, note: 'Network latency' },
    { label: 'Largest Contentful Paint', value: `${(test.metrics.lcp / 1000).toFixed(1)} s`, note: 'Visual completion' },
    { label: 'Total Blocking Time', value: `${test.metrics.tbt} ms`, note: 'CPU execution' },
    { label: 'Peak RAM Estimate', value: `${test.metrics.memoryPeakMb} MB`, note: 'Heap footprint' }
  ];

  metricsData.forEach((m, idx) => {
    const mx = 14 + idx * (metricsBoxWidth + 4);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(mx, y, metricsBoxWidth, 18, 1, 1, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, mx + 3, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(m.value, mx + 3, y + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(m.note, mx + 3, y + 15);
  });

  y += 24;

  // Indian Regional Market Impact
  if (test.aiReport?.tierImpact) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(185, 28, 28);
    doc.text('Indian Regional Conversion & Market Viability', 20, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(127, 29, 29);
    const imp = test.aiReport.tierImpact;
    doc.text(
      `Tier-1 Metro: ${imp.tier1MetroPct}% success  |  Tier-2 Towns (Jaipur/Lucknow): ${imp.tier2TownsPct}%  |  Tier-3 Rural (2G/3G): ${imp.tier3RuralPct}%`,
      20,
      y + 11
    );
    doc.setFont('helvetica', 'bold');
    doc.text(`Estimated Monthly Drop-off Risk: ${imp.estimatedMonthlyRevenueRisk}`, 20, y + 16);

    y += 26;
  }

  // Executive AI Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Architecture & Usability Verdict', 14, y);

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = test.aiReport?.executiveSummary || test.aiSummary?.verdict || 'Analysis completed.';
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - 28);
  doc.text(splitSummary, 14, y);
  y += splitSummary.length * 4.5 + 4;

  // Top Ranked Issues
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Ranked Remediation Actions (Priority P0 / P1)', 14, y);
  y += 5;

  const issuesToPrint = test.issues.slice(0, 4);
  issuesToPrint.forEach((iss, index) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pageWidth - 28, 22, 1, 1, 'FD');

    // Priority tag
    const isCrit = iss.severity === 'Critical';
    doc.setFillColor(isCrit ? 239 : 245, isCrit ? 68 : 158, isCrit ? 68 : 11);
    doc.roundedRect(18, y + 4, 16, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(iss.severity.toUpperCase(), 26, y + 7.5, { align: 'center' });

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}. ${iss.title}`, 38, y + 8);

    // Affected Indian users
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Affects ~${iss.affectedUsersPct}% Indian budget devices`, pageWidth - 20, y + 8, { align: 'right' });

    // Description & Solution
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(iss.description, pageWidth - 36);
    doc.text(splitDesc.slice(0, 2), 20, y + 14);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(109, 40, 217); // violet-700
    doc.text(`Fix: ${iss.solution.slice(0, 95)}...`, 20, y + 19);

    y += 26;
  });

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated by The Cheap Phone Test - Built for India\'s Next Billion Users', 14, 287);
  doc.text('Confidential Engineering Audit', pageWidth - 14, 287, { align: 'right' });

  // Save PDF
  const filename = `cheap-phone-test-${new URL(test.url).hostname.replace(/[^a-z0-9]/gi, '_')}.pdf`;
  doc.save(filename);
}
