import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  status: 'good' | 'warning' | 'critical';
  benchmark: string;
  impactExplanation: string;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  status,
  benchmark,
  impactExplanation,
  badge
}) => {
  const getColors = () => {
    switch (status) {
      case 'good':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-950/20',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2
        };
      case 'warning':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-amber-950/20',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: AlertTriangle
        };
      case 'critical':
      default:
        return {
          border: 'border-rose-500/30',
          bg: 'bg-rose-950/20',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: AlertCircle
        };
    }
  };

  const style = getColors();
  const Icon = style.icon;

  return (
    <div className={`p-4 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm transition-all hover:border-slate-600/80`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</span>
        {badge ? (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${style.badgeBg}`}>
            {badge}
          </span>
        ) : (
          <Icon className={`w-4 h-4 ${style.text}`} />
        )}
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <span className={`text-2xl font-black font-mono tracking-tight ${style.text}`}>
          {value}
        </span>
        {unit && <span className="text-xs font-medium text-slate-400 font-mono">{unit}</span>}
      </div>

      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
        <span>Target:</span>
        <span className="text-slate-300 font-semibold">{benchmark}</span>
      </div>

      <p className="text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/80 leading-relaxed">
        {impactExplanation}
      </p>
    </div>
  );
};
