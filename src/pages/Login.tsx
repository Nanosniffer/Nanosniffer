import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import nanoSnifferLogo from '../assets/nanosniffer_logo.png';

export const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transferNotice, setTransferNotice] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.notice) {
      setTransferNotice(location.state.notice);
    }
  }, [location.state]);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-5">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-md mb-1 hover:scale-105 transition-transform">
            <img 
              src={nanoSnifferLogo} 
              alt="NanoSniffer Logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-sm" 
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 uppercase tracking-wider">
              CLASSIFIED ACCESS
            </span>
            <span className="text-[10px] text-slate-400 font-mono">DEFCON 2</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Nano<span className="text-blue-600">Sniffer</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            AI Criminal Network Analysis & Intelligence Grid
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-semibold text-slate-900">
              Officer Authentication Gateway
            </span>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> System Ready
            </span>
          </div>

          {transferNotice && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs animate-in fade-in flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
              <div>
                <strong className="block text-[11px]">Clearance Re-Authentication Required</strong>
                <span>{transferNotice}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs animate-in shake flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                autoComplete="off"
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
                  placeholder="Enter security passkey..."
                  icon={<Lock className="w-4 h-4" />}
                  autoComplete="off"
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
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full font-bold h-10 shadow-sm bg-slate-900 hover:bg-slate-800 text-white"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating Credentials...
                </span>
              ) : (
                'Authenticate & Access Command'
              )}
            </Button>
          </form>

          {/* Quick Demo Access Roles */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block text-center">
              Quick 1-Click Demo Logins
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('director.rao@cbi.gov.in');
                  setPassword('AdminPass2026!');
                }}
                className="p-2 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition group"
              >
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600">Admin (CBI)</div>
                <div className="text-[9px] text-slate-500 font-mono truncate">director.rao@cbi</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('acp.rathore@mumbaipolice.gov.in');
                  setPassword('Password123!');
                }}
                className="p-2 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition group"
              >
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600">Investigator</div>
                <div className="text-[9px] text-slate-500 font-mono truncate">acp.rathore@mum</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('meera.rao@delhipolice.gov.in');
                  setPassword('Password123!');
                }}
                className="p-2 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition group"
              >
                <div className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600">Analyst</div>
                <div className="text-[9px] text-slate-500 font-mono truncate">meera.rao@delhi</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Warning Notice */}
        <p className="text-center text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. PROTECTED VIA HS256 JWT & AES-256 ENCRYPTION.
        </p>
      </div>
    </div>
  );
};
