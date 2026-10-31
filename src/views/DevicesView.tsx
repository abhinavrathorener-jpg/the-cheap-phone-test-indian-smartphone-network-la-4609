import React from 'react';
import {
  Smartphone,
  Wifi,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldAlert
} from 'lucide-react';
import { DEVICE_PROFILES, NETWORK_PROFILES, INDIAN_ECOSYSTEM_STATS } from '../constants/presets';
import { DeviceProfile } from '../types';

interface DevicesViewProps {
  onSelectDeviceForTest: (device: DeviceProfile) => void;
}

export const DevicesView: React.FC<DevicesViewProps> = ({ onSelectDeviceForTest }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
          Next Billion Users Hardware Lab
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Indian Smartphone & Network Topology Profiles
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive specifications of the sub-₹10,000 Android devices and cellular network topologies that power the majority of consumer web traffic across Bharat.
        </p>
      </div>

      {/* Device Profiles Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">Target Device Fleet Specifications</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {DEVICE_PROFILES.length} Verified Indian Profiles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEVICE_PROFILES.map((dev) => (
            <div
              key={dev.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-violet-400 block tracking-wider">
                      {dev.brand}
                    </span>
                    <h3 className="text-base font-bold text-white">{dev.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-violet-950/80 text-violet-300 border border-violet-800/60 px-2 py-0.5 rounded-full">
                    {dev.priceSegment}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 mb-4">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">SoC / Processor:</span>
                    <span className="font-semibold text-slate-200">{dev.chipset}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">RAM Allocation:</span>
                    <span className="font-mono text-cyan-300 font-bold">{dev.ram}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">Screen Viewport:</span>
                    <span className="font-mono text-slate-300">{dev.screen}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">Operating System:</span>
                    <span className="text-slate-300">{dev.os}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">CPU Throttling Factor:</span>
                    <span className="font-mono text-amber-400 font-bold">{dev.cpuThrottlingMultiplier}x</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Popular In:</span>
                    <span className="text-violet-300 text-[11px] font-medium">{dev.popularIn}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 mb-4 leading-relaxed">
                  <span className="font-semibold text-slate-200 block mb-0.5">Indian Market Impact:</span>
                  Accounts for ~{dev.marketShareIndiaPct}% of active mobile web traffic. Single-thread V8 JavaScript compilation locks up UI thread under heavy bundling.
                </div>
              </div>

              <button
                onClick={() => onSelectDeviceForTest(dev)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Audit on this Hardware</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Network Profiles Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Indian Cellular Topologies</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {NETWORK_PROFILES.length} Carrier Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NETWORK_PROFILES.map((net) => (
            <div
              key={net.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-white">{net.name}</h3>
                <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                  {net.technology}
                </span>
              </div>

              <div className="space-y-1.5 text-xs mb-4 font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-500 font-sans">Simulated Speed:</span>
                  <span className="text-cyan-300 font-bold">{net.speed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-500 font-sans">Round Trip Time (RTT):</span>
                  <span className="text-slate-200 font-bold">{net.rtt} ms</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-500 font-sans">Packet Drop Rate:</span>
                  <span className="text-rose-400 font-bold">{net.packetLoss}%</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {net.description}
              </p>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Typical: {net.typicalLocation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
