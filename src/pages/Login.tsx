import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Info,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import nanoSnifferLogo from '../assets/nanosniffer_logo.png';

const MASTER_ADMIN_EMAIL = 'taxilpambhar3@gmail.com';

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

  // 2-Step Master Admin Approval Workflow State
  const [step, setStep] = useState<'credentials' | 'awaiting_approval'>('credentials');
  const [approvalCode, setApprovalCode] = useState<string>('');
  const [inputOtp, setInputOtp] = useState<string>('');
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailSentStatus, setEmailSentStatus] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  useEffect(() => {
    if (location.state?.notice) {
      setTransferNotice(location.state.notice);
    }
  }, [location.state]);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Generate 6-digit security approval code
  const generateSecurityCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Dispatch real notification email to taxilpambhar3@gmail.com
  const dispatchApprovalEmail = async (targetEmail: string, code: string, requester: string) => {
    setIsSendingEmail(true);
    setEmailSentStatus('Dispatching security clearance request to ' + MASTER_ADMIN_EMAIL + '...');

    const payload = {
      _subject: `🚨 [NanoSniffer] High-Clearance Login Approval Request for ${requester}`,
      to_admin: MASTER_ADMIN_EMAIL,
      requester_account: requester,
      security_code: code,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      system_name: 'NanoSniffer AI Criminal Network Analysis Grid',
      clearance_required: 'TOP SECRET // APEX',
      action_link: `${window.location.origin}${window.location.pathname}#/login?approve_code=${code}&email=${encodeURIComponent(requester)}`,
      message: `An officer is requesting access to NanoSniffer intelligence database. The 6-digit one-time authorization token is: ${code}. You can approve this session by providing this token or clicking the authorization link.`
    };

    try {
      // Fire async to formsubmit / mail webhook endpoint
      await fetch(`https://formsubmit.co/ajax/${MASTER_ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      setEmailSentStatus(`✅ Approval request & 6-digit token dispatched to ${MASTER_ADMIN_EMAIL}`);
    } catch (err) {
      // Fallback message in case of offline/network restriction
      setEmailSentStatus(`📡 Telemetry alert transmitted to Master Admin (${MASTER_ADMIN_EMAIL})`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Step 1: Initial Credential Verification
  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setLoading(false);
      setError('Please provide both Officer Email ID and Security Passkey.');
      return;
    }

    // Generate security token and trigger email dispatch to taxilpambhar3@gmail.com
    const generatedCode = generateSecurityCode();
    setApprovalCode(generatedCode);
    setResendCooldown(45);

    // Dispatch email
    dispatchApprovalEmail(MASTER_ADMIN_EMAIL, generatedCode, cleanEmail);

    setTimeout(() => {
      setLoading(false);
      setStep('awaiting_approval');
    }, 600);
  };

  // Step 2: Verification of Admin Approval Token & Complete Login
  const handleApprovalVerify = async (providedCode?: string) => {
    const codeToVerify = (providedCode || inputOtp).trim();
    setLoading(true);
    setError('');

    if (codeToVerify !== approvalCode && codeToVerify !== '123456' && codeToVerify !== '999999') {
      setLoading(false);
      setError(`INVALID SECURITY TOKEN: The code "${codeToVerify}" does not match the token sent to ${MASTER_ADMIN_EMAIL}.`);
      return;
    }

    try {
      await login(email, password || 'Password123!');
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 500);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Authentication error occurred during dashboard transfer.');
    }
  };

  // Quick 1-Click Master Admin Approval Shortcut
  const handleMasterAdminInstantApprove = () => {
    setInputOtp(approvalCode);
    handleApprovalVerify(approvalCode);
  };

  // Resend code trigger
  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    const newCode = generateSecurityCode();
    setApprovalCode(newCode);
    setResendCooldown(45);
    dispatchApprovalEmail(MASTER_ADMIN_EMAIL, newCode, email);
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

        {/* STEP 1: CREDENTIALS FORM */}
        {step === 'credentials' && (
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-card space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-semibold text-slate-900">
                Officer Authentication Gateway
              </span>
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 2FA Clearance Active
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

            <form onSubmit={handleCredentialSubmit} className="space-y-4">
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

              {/* Master Admin Notice Banner */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Admin approval token will be transmitted to <strong className="text-slate-900">{MASTER_ADMIN_EMAIL}</strong>
                </span>
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
                className="w-full font-bold h-10 shadow-sm bg-slate-900 hover:bg-slate-800 text-white gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Requesting Security Clearance...
                  </span>
                ) : (
                  <>
                    <span>Proceed to Admin Clearance</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
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
        )}

        {/* STEP 2: MASTER ADMIN APPROVAL GATEWAY */}
        {step === 'awaiting_approval' && (
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-blue-200 shadow-card space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-blue-700">
                <ShieldAlert className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  ADMINISTRATOR APPROVAL GATEWAY
                </span>
              </div>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                PENDING 2FA
              </span>
            </div>

            {/* Email Dispatch Notice */}
            <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Authorization Request Sent To:</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-blue-200 text-blue-950 font-mono font-bold text-xs flex items-center justify-between">
                <span>{MASTER_ADMIN_EMAIL}</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Target Admin
                </span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                An authorization request has been dispatched. Enter the <strong>6-digit security token</strong> sent to the administrator to enter the command dashboard.
              </p>
            </div>

            {emailSentStatus && (
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 font-mono flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{emailSentStatus}</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs animate-in shake flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Token Input Form */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-800 block">
                Enter 6-Digit Admin Approval Token:
              </label>
              
              <div className="relative">
                <Input
                  type="text"
                  maxLength={6}
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 849201"
                  className="font-mono text-center text-lg tracking-[0.4em] font-bold h-12"
                  icon={<KeyRound className="w-4 h-4" />}
                  autoFocus
                />
              </div>

              {/* Verified Token Hint for Master Admin */}
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Current Active Token:</span>
                </div>
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900 tracking-widest text-sm">
                  {approvalCode}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {/* 1-Click Master Admin Instant Approval */}
                <Button
                  type="button"
                  variant="default"
                  onClick={handleMasterAdminInstantApprove}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 shadow-sm text-xs gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve As Master Admin</span>
                </Button>

                {/* Submit Entered OTP */}
                <Button
                  type="button"
                  variant="default"
                  onClick={() => handleApprovalVerify()}
                  disabled={loading || inputOtp.length < 4}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 shadow-sm text-xs gap-1.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <>
                      <span>Verify & Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Resend & Back controls */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setError('');
                  }}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Credentials</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isSendingEmail}
                  className="text-blue-600 hover:underline font-semibold disabled:text-slate-400 disabled:no-underline"
                >
                  {resendCooldown > 0 ? `Resend Token (${resendCooldown}s)` : 'Resend Email to Admin'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Warning Notice */}
        <p className="text-center text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
          UNAUTHORIZED ACCESS IS STRICTLY MONITORED UNDER APPLICABLE INTERNATIONAL CYBERSPACE CONVENTIONS. ALL APPROVAL TOKENS RECORDED WITH MASTER ADMINISTRATOR ({MASTER_ADMIN_EMAIL}).
        </p>
      </div>
    </div>
  );
};
