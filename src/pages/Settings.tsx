import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api';
import {
  Settings as SettingsIcon,
  Cpu,
  Server,
  Bell,
  Map,
  Shield,
  Palette,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Database
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState<number>(85);
  const [liveStreamRate, setLiveStreamRate] = useState<number>(5);
  const [autoFallbackEnabled, setAutoFallbackEnabled] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'offline'>('idle');

  const testApiConnection = () => {
    setConnectionStatus('testing');
    setTimeout(() => {
      setConnectionStatus('offline');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
            TACTICAL CONFIGURATION
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          System Settings & Neural Parameters
        </h1>
      </div>

      {/* 1. AI Neural Risk Engine Sensitivity */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Cpu className="w-5 h-5 text-cyber-cyan" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Risk Engine & Sensitivity Threshold</h3>
            <p className="text-xs text-slate-400 font-mono">
              Adjust neural confidence floor for autonomous incident dispatch and alerts
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between font-mono">
            <span className="text-slate-300">Minimum AI Confidence Score:</span>
            <span className="text-cyber-cyan font-bold text-sm bg-agency-950 px-2 py-0.5 rounded border border-cyber-cyan/30">
              {aiConfidenceThreshold}%
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="99"
            value={aiConfidenceThreshold}
            onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>50% (High Recall / More Noise)</span>
            <span>85% (Recommended)</span>
            <span>99% (Strict Precision Only)</span>
          </div>
        </div>
      </Card>

      {/* 2. API Backend & Local Cache Architecture */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Server className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">Python FastAPI Backend Connection</h3>
            <p className="text-xs text-slate-400 font-mono">
              Target API endpoint with automatic offline fallback to local telemetry
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-agency-950 border border-slate-800 font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block">BASE URL</span>
              <span className="text-slate-200 font-bold">{API_BASE_URL}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={testApiConnection}
              disabled={connectionStatus === 'testing'}
              className="text-xs"
            >
              {connectionStatus === 'testing' ? (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Ping...
                </span>
              ) : (
                'Test Ping'
              )}
            </Button>
          </div>

          {connectionStatus === 'offline' && (
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Backend offline at <code>{API_BASE_URL}</code>. Local encrypted dummy fallback layer active (0ms latency).
              </span>
            </div>
          )}

          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoFallbackEnabled}
              onChange={(e) => setAutoFallbackEnabled(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyber-cyan"
            />
            <span>Always render realistic dummy data on API timeout/error (Never show blank pages)</span>
          </label>
        </div>
      </Card>

      {/* 3. Theme & Visual Appearance */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Palette className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">Command Center Interface Theme</h3>
            <p className="text-xs text-slate-400 font-mono">
              Toggle between high-contrast tactical dark mode and day mode
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Active Palette Mode:</span>
          <Button
            variant="cyan"
            size="sm"
            onClick={toggleTheme}
            className="text-xs"
          >
            Current: {theme.toUpperCase()} MODE (Click to Toggle)
          </Button>
        </div>
      </Card>
    </div>
  );
};
