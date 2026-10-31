import React, { useState } from 'react';
import {
  Globe2,
  Smartphone,
  Wifi,
  Sliders,
  Play,
  Layers,
  Cpu,
  Zap,
  Info,
  CheckCircle2,
  Check,
  AlertCircle
} from 'lucide-react';
import { DeviceProfile, NetworkProfile } from '../types';
import { DEVICE_PROFILES, NETWORK_PROFILES, SAMPLE_TARGETS } from '../constants/presets';

interface NewTestViewProps {
  initialUrl?: string;
  onRunTest: (url: string, device: DeviceProfile, network: NetworkProfile, options: any) => void;
}

export const NewTestView: React.FC<NewTestViewProps> = ({
  initialUrl = '',
  onRunTest
}) => {
  const [url, setUrl] = useState(initialUrl || 'https://m.flipkart.com');
  const [selectedDevice, setSelectedDevice] = useState<DeviceProfile>(DEVICE_PROFILES[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProfile>(NETWORK_PROFILES[0]);
  const [isCustomHardware, setIsCustomHardware] = useState(false);
  const [customCpuThrottling, setCustomCpuThrottling] = useState(6.0);
  const [customRamMb, setCustomRamMb] = useState(2048);
  const [customScreenWidth, setCustomScreenWidth] = useState(360);

  const [options, setOptions] = useState({
    checkBrokenAssets: true,
    checkFormsAndOtp: true,
    checkMemoryLmk: true,
    checkViewportOverflow: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let deviceToUse = selectedDevice;
    if (isCustomHardware) {
      deviceToUse = {
        ...selectedDevice,
        id: 'custom-device',
        name: `Custom Budget Spec (${(customRamMb / 1024).toFixed(1)}GB RAM, ${customCpuThrottling}x CPU)`,
        ram: `${(customRamMb / 1024).toFixed(1)}GB RAM`,
        ramMb: customRamMb,
        screenWidth: customScreenWidth,
        screenHeight: Math.round(customScreenWidth * 2),
        cpuThrottlingMultiplier: customCpuThrottling
      };
    }

    onRunTest(url.trim(), deviceToUse, selectedNetwork, options);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
          Indian Testing Suite
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Configure Indian Mobile & Network Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Simulate budget hardware constraints, 1-2GB RAM limits, and cellular topologies across Indian Tier-2/3 regions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Website URL */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-xs font-bold text-violet-300">
              1
            </div>
            <h2 className="text-base font-bold text-white">Target Web Application URL</h2>
          </div>

          <div className="relative">
            <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 font-mono transition"
            />
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-2">Or select a popular Indian benchmark target:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SAMPLE_TARGETS.map((sample) => (
                <button
                  key={sample.url}
                  type="button"
                  onClick={() => setUrl(sample.url)}
                  className={`p-2 rounded-lg text-left border text-xs transition ${
                    url === sample.url
                      ? 'bg-violet-950/60 border-violet-500 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold truncate">{sample.name.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-500 truncate">{sample.hint}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Low-End Smartphone Device Profile */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-xs font-bold text-violet-300">
                2
              </div>
              <h2 className="text-base font-bold text-white">Select Budget Smartphone Profile</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCustomHardware(!isCustomHardware)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition flex items-center gap-1.5 self-start sm:self-auto ${
                isCustomHardware
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCustomHardware ? 'Using Custom Spec' : 'Custom Hardware Tuning'}</span>
            </button>
          </div>

          {/* Custom Hardware Sliders */}
          {isCustomHardware && (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-4">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Custom Hardware Virtualization Parameters</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* CPU Throttling Slider */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>CPU Slowdown:</span>
                    <span className="font-mono font-bold text-violet-400">{customCpuThrottling}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={customCpuThrottling}
                    onChange={(e) => setCustomCpuThrottling(Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">6x simulates Unisoc 28nm Quad-core</span>
                </div>

                {/* RAM Allocation */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Device RAM:</span>
                    <span className="font-mono font-bold text-violet-400">{customRamMb / 1024} GB</span>
                  </div>
                  <input
                    type="range"
                    min="512"
                    max="4096"
                    step="512"
                    value={customRamMb}
                    onChange={(e) => setCustomRamMb(Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">1GB triggers Android Go Low Memory Killer</span>
                </div>

                {/* Screen Width */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Screen CSS Width:</span>
                    <span className="font-mono font-bold text-violet-400">{customScreenWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="320"
                    max="412"
                    step="10"
                    value={customScreenWidth}
                    onChange={(e) => setCustomScreenWidth(Number(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">320px/360px are dominant in India</span>
                </div>
              </div>
            </div>
          )}

          {/* Device Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DEVICE_PROFILES.map((dev) => {
              const isSelected = selectedDevice.id === dev.id && !isCustomHardware;
              return (
                <div
                  key={dev.id}
                  onClick={() => {
                    setSelectedDevice(dev);
                    setIsCustomHardware(false);
                  }}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition relative ${
                    isSelected
                      ? 'bg-violet-950/40 border-violet-500 shadow-md shadow-violet-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <Smartphone className="w-4 h-4 text-violet-400" />
                    <span className="font-bold text-slate-200">{dev.name}</span>
                  </div>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <div>
                      <span className="text-slate-500">Chipset:</span> {dev.chipset}
                    </div>
                    <div>
                      <span className="text-slate-500">RAM:</span> {dev.ram}
                    </div>
                    <div>
                      <span className="text-slate-500">Screen:</span> {dev.screen}
                    </div>
                    <div>
                      <span className="text-slate-500">Market Share:</span>{' '}
                      <span className="text-violet-300 font-semibold">{dev.marketShareIndiaPct}% in India</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Indian Cellular Network Profile */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-xs font-bold text-violet-300">
              3
            </div>
            <h2 className="text-base font-bold text-white">Select Indian Network Simulation</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NETWORK_PROFILES.map((net) => {
              const isSelected = selectedNetwork.id === net.id;
              return (
                <div
                  key={net.id}
                  onClick={() => setSelectedNetwork(net)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition relative ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <Wifi className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-slate-200">{net.name}</span>
                  </div>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Speed:</span>
                      <span className="font-mono text-cyan-300 font-bold">{net.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Latency (RTT):</span>
                      <span className="font-mono text-slate-200">{net.rtt}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Packet Loss:</span>
                      <span className="font-mono text-rose-400">{net.packetLoss}%</span>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-1 leading-tight">{net.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Audit Inspection Options */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Inspection Checks to Run
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={options.checkBrokenAssets}
                onChange={(e) => setOptions({ ...options, checkBrokenAssets: e.target.checked })}
                className="w-4 h-4 accent-violet-600 rounded"
              />
              <span className="text-slate-200">Detect Broken Links, Missing Images & Heavy Assets</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={options.checkFormsAndOtp}
                onChange={(e) => setOptions({ ...options, checkFormsAndOtp: e.target.checked })}
                className="w-4 h-4 accent-violet-600 rounded"
              />
              <span className="text-slate-200">Indian Form Usability (OTP Autofill & Numeric Keypads)</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={options.checkMemoryLmk}
                onChange={(e) => setOptions({ ...options, checkMemoryLmk: e.target.checked })}
                className="w-4 h-4 accent-violet-600 rounded"
              />
              <span className="text-slate-200">RAM Pressure & Android Low Memory Killer (LMK) Risk</span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={options.checkViewportOverflow}
                onChange={(e) => setOptions({ ...options, checkViewportOverflow: e.target.checked })}
                className="w-4 h-4 accent-violet-600 rounded"
              />
              <span className="text-slate-200">Horizontal Overflow & Small Touch Targets (&lt;48px)</span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition active:scale-98"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Automated Indian Smartphone Audit</span>
          </button>
        </div>
      </form>
    </div>
  );
};
