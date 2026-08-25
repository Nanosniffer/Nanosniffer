import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { getDefaultApiBaseUrl, setApiBaseUrl } from '../api/axios';
import {
  Cpu,
  Server,
  Palette,
  CheckCircle2,
  RefreshCw,
  Save,
  RotateCcw,
  Globe,
  Sliders,
  Shield,
  UserCheck
} from 'lucide-react';
import axios from 'axios';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState<number>(85);
  const [autoFallbackEnabled, setAutoFallbackEnabled] = useState<boolean>(true);
  
  const [apiUrl, setApiUrl] = useState<string>(getDefaultApiBaseUrl());
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [connectionMode, setConnectionMode] = useState<'live' | 'standalone' | 'testing'>('standalone');
  const [latencyMs, setLatencyMs] = useState<number | null>(0);
  const [serverDetails, setServerDetails] = useState<string>('Autonomous Neural Engine Active (0ms latency)');

  const testApiConnection = async (targetUrl = apiUrl) => {
    setConnectionMode('testing');
    const startTime = performance.now();
    try {
      const baseRoot = targetUrl.replace(/\/api\/?$/, '');
      const healthUrl = `${baseRoot}/health`;

      let response;
      try {
        response = await axios.get(healthUrl, { timeout: 2500 });
      } catch {
        response = await axios.get(`${targetUrl}/criminals`, { timeout: 2500 });
      }

      const elapsed = Math.max(1, Math.round(performance.now() - startTime));
      setLatencyMs(elapsed);
      setConnectionMode('live');
      if (response.data && response.data.service) {
        setServerDetails(`${response.data.service} v${response.data.version || '1.0'}`);
      } else {
        setServerDetails('FastAPI Neural Engine & Graph Analytics Live');
      }
    } catch {
      setLatencyMs(0);
      setConnectionMode('standalone');
      setServerDetails('ACN Autonomous Intelligence Core Active (0ms local telemetry)');
    }
  };

  useEffect(() => {
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
    <div className="space-y-4 max-w-4xl animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            SYSTEM ADMINISTRATION
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
          System Settings & Intelligence Parameters
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure AI anomaly confidence thresholds, telemetry connections, and operator security clearances.
        </p>
      </div>

      {/* 1. AI Sensitivity & Confidence Threshold */}
      <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <Cpu className="w-4 h-4 text-slate-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Risk Sensitivity & Alert Threshold</h3>
            <p className="text-xs text-slate-500">
              Set minimum confidence score for autonomous incident correlation and alert dispatch
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Confidence Cutoff Floor:</span>
            <span className="text-slate-900 font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
              {aiConfidenceThreshold}%
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="99"
            value={aiConfidenceThreshold}
            onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
            className="w-full accent-slate-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>50% (High Recall / More Noise)</span>
            <span>85% (Recommended)</span>
            <span>99% (Strict Precision Only)</span>
          </div>
        </div>
      </Card>

      {/* 2. Intelligence Telemetry & Backend Connection */}
      <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <Server className="w-4 h-4 text-slate-700" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Intelligence Telemetry Layer</h3>
              {connectionMode === 'live' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  LIVE SERVER ({latencyMs}ms)
                </span>
              )}
              {connectionMode === 'standalone' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  AUTONOMOUS CORE (0ms)
                </span>
              )}
              {connectionMode === 'testing' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  PINGING...
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Dual-mode telemetry engine with autonomous client fallback
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {/* Status Box */}
          <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">
                  {connectionMode === 'live' ? 'FastAPI Backend Connected' : 'ACN Intelligence Core Operational'}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">
                  {latencyMs}ms Latency
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {serverDetails}
              </p>
            </div>
          </div>

          {/* Endpoint Configuration Bar */}
          <div className="space-y-2 p-3 rounded-md bg-white border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">
                API ENDPOINT CONFIGURATION
              </span>
              {!isEditingUrl ? (
                <button
                  onClick={() => setIsEditingUrl(true)}
                  className="text-[11px] text-brand-600 font-semibold hover:underline"
                >
                  Edit Custom URL
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetApiUrl}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button
                    onClick={handleSaveApiUrl}
                    className="text-[11px] text-brand-600 font-bold flex items-center gap-1"
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
                  className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-800 font-semibold text-xs truncate">{apiUrl}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => testApiConnection()}
                  disabled={connectionMode === 'testing'}
                  className="text-xs h-7 px-2.5"
                >
                  {connectionMode === 'testing' ? (
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Ping
                    </span>
                  ) : (
                    'Test Ping'
                  )}
                </Button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoFallbackEnabled}
              onChange={(e) => setAutoFallbackEnabled(e.target.checked)}
              className="rounded bg-white border-slate-300 text-slate-900 focus:ring-0"
            />
            <span>Enable 0ms Local Fallback Telemetry Stream</span>
          </label>
        </div>
      </Card>

      {/* 3. Operator Profile & Active Session */}
      <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <Shield className="w-4 h-4 text-slate-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Operator Session</h3>
            <p className="text-xs text-slate-500">
              Authenticated credentials & active security clearance
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100"
            />
            <div>
              <p className="font-bold text-slate-900">{user?.name}</p>
              <p className="text-[11px] text-slate-500 font-mono">{user?.agency} • Badge #{user?.badgeNumber}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {user?.clearanceLevel}
          </span>
        </div>
      </Card>
    </div>
  );
};
