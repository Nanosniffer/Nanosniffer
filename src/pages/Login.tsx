import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, KeyRound, Eye, EyeOff, Radio, CheckCircle, Cpu } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('agent.vance@interpol.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      setLoading(false);
      setError('Invalid cryptographic clearance tokens.');
    }
  };

  const handleQuickFill = () => {
    setEmail('agent.vance@interpol.gov');
    setPassword('Delta-Strike-7701');
  };

  return (
    <div className="min-h-screen bg-agency-950 flex flex-col justify-center items-center px-4 relative overflow-hidden cyber-grid">
      {/* Tactical radar scanning beam animation */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-cyber-cyan/10 pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-cyber-purple/10 pointer-events-none" />

      {/* Cyber scanning line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent animate-scanline pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Intelligence Agency Logo & Branding */}
        <div className="text-center mb-8 space-y-2">
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
          <h1 className="text-2xl font-extrabold tracking-wider text-slate-100 uppercase">
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
              <KeyRound className="w-4 h-4 text-cyber-cyan" /> OFFICER AUTHENTICATION
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> GATEWAY ONLINE
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                GOVERNMENT / INTERPOL ID EMAIL
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@agency.gov"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                ENCRYPTED PASSKEY
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
                <span>Remember Terminal</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact Task Force Security Operations Center (SOC) to request a physical RSA token reset.'); }} className="text-cyber-cyan hover:underline">
                Forgot Token?
              </a>
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
                  AUTHENTICATING TELEMETRY...
                </span>
              ) : (
                'INITIALIZE COMMAND SESSION'
              )}
            </Button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full py-2 px-3 rounded-lg bg-agency-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center justify-center gap-2 transition"
            >
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Quick-Fill Demo Agent Credentials</span>
            </button>
          </div>
        </div>

        {/* Security Warning Notice */}
        <p className="mt-6 text-center text-[10px] font-mono text-slate-500 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. ALL PACKETS ENCRYPTED VIA AES-256.
        </p>
      </div>
    </div>
  );
};
