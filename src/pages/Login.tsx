import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const BASE_URL = import.meta.env.BASE_URL || '/';
const LOGO_SRC = `${BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/'}images/logo.png`;

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-10 sm:py-12">
      <div className="w-full max-w-md space-y-4 sm:space-y-5">
        {/* Branding Header with Second NanoSniffer Shield Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <img 
              src={LOGO_SRC} 
              alt="NanoSniffer Shield Logo" 
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-md transition-transform duration-200 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './images/nanosniffer_logo.png';
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 uppercase tracking-wider flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>CLASSIFIED ACCESS</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              DEFCON 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            NanoSniffer
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            AI Criminal Network Analysis & Intelligence Surveillance System
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
              className="w-full font-bold h-10 shadow-sm"
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
        </div>

        {/* Security Warning Notice */}
        <p className="text-center text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. PROTECTED VIA HS256 JWT & AES-256 ENCRYPTION.
        </p>
      </div>
    </div>
  );
};
