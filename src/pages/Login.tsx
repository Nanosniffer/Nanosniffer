import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Crown, 
  Search, 
  LineChart,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'investigator' | 'analyst' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey: 'admin' | 'investigator' | 'analyst') => {
    setSelectedRole(prev => prev === roleKey ? null : roleKey);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 400);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'ACCESS DENIED: Incorrect email ID or cryptographic passkey.');
    }
  };

  const getRoleBadge = (role: 'admin' | 'investigator' | 'analyst') => {
    switch (role) {
      case 'admin':
        return {
          title: 'DIRECTOR CLEARANCE (ADMIN)',
          desc: 'Global task force command authority • TOP SECRET // SCI',
          border: 'border-purple-200 bg-purple-50 text-purple-800',
        };
      case 'investigator':
        return {
          title: 'LEAD INVESTIGATOR CLEARANCE',
          desc: 'Case management & operative surveillance • TOP SECRET // SCI',
          border: 'border-blue-200 bg-blue-50 text-blue-800',
        };
      case 'analyst':
        return {
          title: 'SENIOR ANALYST CLEARANCE',
          desc: 'Predictive link analysis & telemetry reporting • SECRET',
          border: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-5">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white shadow-card mb-1">
            <Shield className="w-6 h-6 text-brand-300" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 uppercase tracking-wider">
              CLASSIFIED ACCESS
            </span>
            <span className="text-[10px] text-slate-400 font-mono">DEFCON 2</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            ACN Intelligence System
          </h1>
          <p className="text-xs text-slate-500">
            Autonomous Criminal Network & Threat Intelligence Platform
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-semibold text-slate-900">
              Officer Authentication Gateway
            </span>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> System Ready
            </span>
          </div>

          {/* Role Clearance Selection Buttons */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                SELECT CLEARANCE ROLE TIER
              </label>
              {selectedRole && (
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-[10px] text-slate-400 hover:text-slate-700 underline"
                >
                  Reset Tier
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {/* Admin Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col items-center justify-center gap-1 ${
                  selectedRole === 'admin'
                    ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-subtle ring-1 ring-purple-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Crown className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-purple-700' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">ADMIN</span>
                <span className="text-[9px] text-slate-400">Director</span>
              </button>

              {/* Investigator Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('investigator')}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col items-center justify-center gap-1 ${
                  selectedRole === 'investigator'
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-subtle ring-1 ring-blue-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Search className={`w-4 h-4 ${selectedRole === 'investigator' ? 'text-blue-700' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">INVESTIGATOR</span>
                <span className="text-[9px] text-slate-400">Lead Agent</span>
              </button>

              {/* Analyst Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('analyst')}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col items-center justify-center gap-1 ${
                  selectedRole === 'analyst'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-subtle ring-1 ring-emerald-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <LineChart className={`w-4 h-4 ${selectedRole === 'analyst' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">ANALYST</span>
                <span className="text-[9px] text-slate-400">Telemetry</span>
              </button>
            </div>
          </div>

          {/* Selected Role Clearance Details Banner */}
          {selectedRole && (
            <div className={`p-2.5 rounded-lg border text-xs animate-in fade-in ${getRoleBadge(selectedRole).border}`}>
              <span className="font-bold block text-[11px]">{getRoleBadge(selectedRole).title}</span>
              <p className="text-[11px] opacity-90 mt-0.5">
                {getRoleBadge(selectedRole).desc}
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs animate-in shake flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Government / Interpol Email ID
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter officer email (e.g. name@interpol.gov)"
                icon={<Mail className="w-4 h-4" />}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Encrypted Passkey / Cryptographic Credential
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security key..."
                  icon={<Lock className="w-4 h-4" />}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-slate-900 focus:ring-0"
                />
                <span>Remember Session</span>
              </label>
              {selectedRole && (
                <span className="text-[11px] text-slate-500">
                  Target Tier: <strong className="text-slate-900">{selectedRole.toUpperCase()}</strong>
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full font-bold h-9 shadow-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating Credentials...
                </span>
              ) : selectedRole ? (
                `Authenticate as ${selectedRole.toUpperCase()}`
              ) : (
                'Authenticate & Access Command'
              )}
            </Button>
          </form>
        </div>

        {/* Security Warning Notice */}
        <p className="text-center text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. PROTECTED VIA HS256 JWT & AES-256 ENCRYPTION.
        </p>
      </div>
    </div>
  );
};
