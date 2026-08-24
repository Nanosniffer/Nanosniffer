import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getDefaultApiBaseUrl, setApiBaseUrl } from '../api/axios';
import {
  Settings as SettingsIcon,
  Cpu,
  Server,
  Bell,
  Map,
  Shield,
  Palette,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  Database,
  ExternalLink,
  Save,
  RotateCcw
} from 'lucide-react';
import axios from 'axios';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState<number>(85);
  const [liveStreamRate, setLiveStreamRate] = useState<number>(5);
  const [autoFallbackEnabled, setAutoFallbackEnabled] = useState<boolean>(true);
  
  const [apiUrl, setApiUrl] = useState<string>(getDefaultApiBaseUrl());
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'online' | 'offline'>('idle');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [serverDetails, setServerDetails] = useState<string | null>(null);

  const testApiConnection = async (targetUrl = apiUrl) => {
    setConnectionStatus('testing');
    setLatencyMs(null);
    setServerDetails(null);

    const startTime = performance.now();
    try {
      // Try health endpoint first, fallback to /criminals
      const baseRoot = targetUrl.replace(/\/api\/?$/, '');
      const healthUrl = `${baseRoot}/health`;

      let response;
      try {
        response = await axios.get(healthUrl, { timeout: 3000 });
      } catch {
        // Try fallback to /criminals endpoint
        response = await axios.get(`${targetUrl}/criminals`, { timeout: 3000 });
      }

      const elapsed = Math.round(performance.now() - startTime);
      setLatencyMs(elapsed);
      setConnectionStatus('online');
      if (response.data && response.data.service) {
        setServerDetails(`${response.data.service} v${response.data.version || '1.0'}`);
      } else {
        setServerDetails('FastAPI Neural Engine Operational');
      }
    } catch (err: any) {
      setConnectionStatus('offline');
    }
  };

  useEffect(() => {
    // Initial ping on load
    testApiConnection();
  }, []);

  const handleSaveApiUrl = () => {
    setApiBaseUrl(apiUrl);
    setIsEditingUrl(false);
    testApiConnection(apiUrl);
  };

  const handleResetApiUrl = () => {
    localStorage.removeItem('aegis_api_base_url');
    const defaultUrl = window.location.port === '8000' ? '/api' : 'http://localhost:8000/api';
    setApiUrl(defaultUrl);
    setApiBaseUrl(defaultUrl);
    setIsEditingUrl(false);
    testApiConnection(defaultUrl);
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
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100">Python FastAPI Backend Connection</h3>
              {connectionStatus === 'online' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CONNECTED ({latencyMs}ms)
                </span>
              )}
              {connectionStatus === 'offline' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  OFFLINE FALLBACK ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live PostgreSQL + Neo4j backend with seamless offline encrypted fallback telemetry
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-2 p-3 rounded-lg bg-agency-950 border border-slate-800 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] block font-semibold uppercase">API BASE URL ENDPOINT</span>
              {!isEditingUrl ? (
                <button
                  onClick={() => setIsEditingUrl(true)}
                  className="text-[11px] text-cyber-cyan hover:underline"
                >
                  Edit URL
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetApiUrl}
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button
                    onClick={handleSaveApiUrl}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <Save className="w-3 h-3" /> Save & Test
                  </button>
                </div>
              )}
            </div>

            {isEditingUrl ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:8000/api"
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-bold text-sm truncate">{apiUrl}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testApiConnection()}
                  disabled={connectionStatus === 'testing'}
                  className="text-xs shrink-0 ml-2"
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
            )}
          </div>

          {connectionStatus === 'online' && (
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">FastAPI Backend Operational & Connected</p>
                <p className="text-[11px] text-emerald-400/80">
                  Round-trip latency: {latencyMs}ms • {serverDetails || 'Database & Graph engine active'}
                </p>
              </div>
            </div>
          )}

          {connectionStatus === 'offline' && (
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-mono space-y-1.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">Backend Offline at {apiUrl}</span>
              </div>
              <p className="text-[11px] text-amber-200/80 pl-6 leading-relaxed">
                The local encrypted fallback dataset is actively serving all dossiers, network topology graphs, and risk analytics with 0ms latency.
              </p>
              <div className="pl-6 pt-1 text-[11px] text-slate-400 flex flex-wrap gap-2 items-center">
                <span>To connect live backend:</span>
                <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyber-cyan">
                  uvicorn app.main:app --port 8000
                </code>
              </div>
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
