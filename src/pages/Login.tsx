import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, PRESET_OPERATOR_ACCOUNTS } from '../context/AuthContext';
import { 
  Shield, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Radio, 
  CheckCircle, 
  Cpu, 
  Crown, 
  Search, 
  LineChart,
  UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'investigator' | 'analyst'>('investigator');
  const [email, setEmail] = useState(PRESET_OPERATOR_ACCOUNTS.investigator.profile.email);
  const [password, setPassword] = useState(PRESET_OPERATOR_ACCOUNTS.investigator.defaultPass);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey: 'admin' | 'investigator' | 'analyst') => {
    setSelectedRole(roleKey);
    const preset = PRESET_OPERATOR_ACCOUNTS[roleKey];
    setEmail(preset.profile.email);
    setPassword(preset.defaultPass);
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

  return (
    <div className="min-h-screen bg-agency-950 flex flex-col justify-center items-center px-4 relative overflow-hidden cyber-grid py-12">
      {/* Tactical radar scanning beam animation */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-cyber-cyan/10 pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-cyber-purple/10 pointer-events-none" />

      {/* Cyber scanning line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent animate-scanline pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Intelligence Agency Logo & Branding */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan via-blue-600 to-cyber-purple p-0.5 shadow-neon-cyan mb-2">
            <div className="w-full h-full bg-agency-950 rounded-[14px] flex items-center justify-center">
              <Shield className="w-8 h-8 text-cyber-cyan-bright" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xs text-cyber-cyan px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 font-semibold">
              CLASSIFIED ACCESS
            </span>
            <span className="font-mono text-[11px] text-slate-400">DEFCON 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-100 uppercase">
            A.E.G.I.S. Command
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Autonomous Criminal Network & Threat Intelligence System
          </p>
        </div>

        {/* Login Glassmorphism Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-cyber-cyan" /> OFFICER AUTHENTICATION GATEWAY
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> ONLINE
            </span>
          </div>

          {/* 1-Click Role Selection Tab */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              SELECT OPERATOR CLEARANCE ROLE
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Admin Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-purple-950/40 border-purple-500/80 text-purple-300 shadow-sm shadow-purple-500/20'
                    : 'bg-agency-950 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crown className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold font-mono">ADMIN</span>
                <span className="text-[9px] text-slate-500 font-mono">Director</span>
              </button>

              {/* Investigator Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('investigator')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'investigator'
                    ? 'bg-cyan-950/40 border-cyan-500/80 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'bg-agency-950 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Search className={`w-4 h-4 ${selectedRole === 'investigator' ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold font-mono">INVESTIGATOR</span>
                <span className="text-[9px] text-slate-500 font-mono">Lead Agent</span>
              </button>

              {/* Analyst Button */}
              <button
                type="button"
                onClick={() => handleSelectRole('analyst')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1.5 ${
                  selectedRole === 'analyst'
                    ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300 shadow-sm shadow-emerald-500/20'
                    : 'bg-agency-950 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <LineChart className={`w-4 h-4 ${selectedRole === 'analyst' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold font-mono">ANALYST</span>
                <span className="text-[9px] text-slate-500 font-mono">Telemetry</span>
              </button>
            </div>
          </div>

          {/* Active Profile Summary */}
          <div className="p-3 rounded-xl bg-agency-950 border border-slate-800 flex items-center gap-3">
            <img
              src={PRESET_OPERATOR_ACCOUNTS[selectedRole].profile.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-lg object-cover border border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-100 truncate">
                  {PRESET_OPERATOR_ACCOUNTS[selectedRole].profile.name}
                </p>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyber-cyan">
                  {PRESET_OPERATOR_ACCOUNTS[selectedRole].profile.badgeNumber}
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 truncate">
                {PRESET_OPERATOR_ACCOUNTS[selectedRole].profile.agency}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] font-mono font-semibold text-emerald-400">
                  {PRESET_OPERATOR_ACCOUNTS[selectedRole].profile.clearanceLevel}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                GOVERNMENT / INTERPOL EMAIL
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@interpol.gov"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                ENCRYPTED PASSKEY / CREDENTIAL
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security key..."
                  icon={<Lock className="w-4 h-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyber-cyan focus:ring-0"
                />
                <span>Remember Session</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Role: <strong className="text-cyber-cyan">{selectedRole.toUpperCase()}</strong>
              </span>
            </div>

            <Button
              type="submit"
              variant="cyan"
              size="lg"
              disabled={loading}
              className="w-full font-bold shadow-neon-cyan"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  AUTHENTICATING CREDENTIALS...
                </span>
              ) : (
                `LOGIN AS ${selectedRole.toUpperCase()}`
              )}
            </Button>
          </form>
        </div>

        {/* Security Warning Notice */}
        <p className="mt-6 text-center text-[10px] font-mono text-slate-500 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. ALL SESSIONS PROTECTED VIA HS256 JWT & AES-256 ENCRYPTION.
        </p>
      </div>
    </div>
  );
};
