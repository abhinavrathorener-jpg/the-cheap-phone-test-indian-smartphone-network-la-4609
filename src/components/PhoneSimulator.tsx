import React, { useState } from 'react';
import { RotateCw, Smartphone, Wifi, WifiOff, Battery, Volume2, Shield, RefreshCw, ZoomIn, ZoomOut, Eye, AlertTriangle } from 'lucide-react';
import { DeviceProfile, NetworkProfile } from '../types';

interface PhoneSimulatorProps {
  url: string;
  device: DeviceProfile;
  network: NetworkProfile;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  url,
  device,
  network,
  isLoading = false,
  onRefresh
}) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.85);
  const [showTftFilter, setShowTftFilter] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'logs'>('preview');

  const width = isLandscape ? device.screenHeight : device.screenWidth;
  const height = isLandscape ? device.screenWidth : device.screenHeight;

  // Signal badge text based on network profile
  const getSignalBadge = () => {
    if (network.id.includes('2g')) return 'E';
    if (network.id.includes('3g')) return '3G';
    if (network.id.includes('fup')) return '128k';
    return '4G';
  };

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url || 'https://m.flipkart.com')}`;

  const reloadFrame = () => {
    setIframeKey(k => k + 1);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 mb-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold text-slate-200">{device.name}</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
            {width}x{height}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={() => setZoomScale(s => Math.max(0.65, Number((s - 0.1).toFixed(2))))}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 w-8 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            onClick={() => setZoomScale(s => Math.min(1.1, Number((s + 0.1).toFixed(2))))}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Orientation toggle */}
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className={`p-1.5 rounded transition flex items-center gap-1 text-xs ${
              isLandscape ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title="Rotate phone orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* TFT Screen simulation */}
          <button
            onClick={() => setShowTftFilter(!showTftFilter)}
            className={`p-1.5 rounded transition text-xs flex items-center gap-1 ${
              showTftFilter ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title="Simulate low-contrast budget TFT screen"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px]">TFT Glare</span>
          </button>
        </div>
      </div>

      {/* Scaled Device Wrapper */}
      <div
        className="transition-all duration-300 flex justify-center items-center py-2"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: 'top center',
          marginBottom: `-${Math.round((1 - zoomScale) * (height + 100))}px`
        }}
      >
        {/* Outer Phone Bezel Chassis */}
        <div
          className="relative bg-slate-950 rounded-[42px] p-3 shadow-2xl phone-frame-bezel border-[3px] border-slate-700/80 transition-all duration-300"
          style={{
            width: `${width + 24}px`,
            minHeight: `${height + 56}px`
          }}
        >
          {/* Top Speaker Grill & Camera Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            <div className="w-12 h-1 bg-slate-800 rounded-full" />
            <div className="w-3 h-3 bg-black rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-900/60 rounded-full" />
            </div>
          </div>

          {/* Side Buttons (Volume / Power) */}
          <div className="absolute -left-[5px] top-28 w-1 h-10 bg-slate-700 rounded-l" />
          <div className="absolute -left-[5px] top-42 w-1 h-14 bg-slate-700 rounded-l" />
          <div className="absolute -right-[5px] top-32 w-1 h-12 bg-slate-700 rounded-r" />

          {/* Inner Phone Screen */}
          <div
            className={`relative bg-black rounded-[32px] overflow-hidden flex flex-col ${showTftFilter ? 'budget-screen-filter' : ''}`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            {/* Android Status Bar */}
            <div className="h-6 bg-slate-900/95 text-slate-300 px-3 flex items-center justify-between text-[11px] font-mono border-b border-slate-800/80 z-20">
              <div className="flex items-center gap-1.5 font-medium">
                <span>05:24</span>
                <span className="text-[9px] text-slate-500 font-sans">Jio 4G</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-1 rounded border border-amber-800/40">
                  {getSignalBadge()}
                </span>
                <Wifi className="w-3 h-3 text-slate-300" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[9px]">42%</span>
                  <Battery className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Android Chrome Go Address Bar */}
            <div className="h-10 bg-slate-900 px-2.5 flex items-center gap-2 border-b border-slate-800 z-20">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex-1 bg-slate-950 text-slate-300 rounded-lg px-2.5 py-1 text-[11px] font-mono truncate border border-slate-800">
                {url ? new URL(url).hostname : 'enter-url.in'}
              </div>
              <button
                onClick={reloadFrame}
                className="p-1 text-slate-400 hover:text-slate-200 transition"
                title="Reload page on simulated device"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-violet-400' : ''}`} />
              </button>
            </div>

            {/* Simulated Cellular Loading Bar */}
            {isLoading && (
              <div className="h-1 w-full bg-slate-800 overflow-hidden z-20">
                <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 animate-pulse w-3/4" />
              </div>
            )}

            {/* Viewport Frame Content */}
            <div className="relative flex-1 bg-slate-950 overflow-hidden flex flex-col">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-violet-400">
                      {getSignalBadge()}
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">Simulating Network Handshake</h4>
                  <p className="text-xs text-slate-400 max-w-[240px]">
                    Applying {network.name} ({network.speed}, {network.rtt}ms RTT, {network.packetLoss}% packet drop) to {device.name}...
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-1 rounded">
                    <AlertTriangle className="w-3 h-3" />
                    <span>CPU throttled {device.cpuThrottlingMultiplier}x</span>
                  </div>
                </div>
              ) : (
                <iframe
                  key={iframeKey}
                  src={proxyUrl}
                  title="Simulated Indian Mobile Viewport"
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              )}
            </div>

            {/* Android Navigation Bar (Back, Home, Recents) */}
            <div className="h-7 bg-black px-8 flex items-center justify-between text-slate-500 z-20 border-t border-slate-900">
              {/* Back Triangle */}
              <div className="w-3.5 h-3.5 border-l-2 border-b-2 border-slate-500 -rotate-45" />
              {/* Home Circle */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-500" />
              {/* Recents Square */}
              <div className="w-3.5 h-3.5 rounded-sm border-2 border-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
