import React, { useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { getTimelineEvents, getCriminals } from '../api';
import { createCriminal } from '../api/criminals';
import { 
  Criminal, 
  TimelineEvent, 
  TimelineEventType,
  CrimeCategory, 
  RiskLevel, 
  SuspectStatus, 
  PhoneRecord, 
  FinancialAccount, 
  Vehicle 
} from '../types';
import { Button } from '../components/ui/button';
import { RiskBadge, StatusBadge } from '../components/common/StatusBadge';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import {
  Shield,
  User,
  Phone,
  CreditCard,
  Car,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  HelpCircle,
  Building2,
  Check,
  Eye,
  RefreshCw,
  Radio
} from 'lucide-react';

export const EvidenceIntakePage: React.FC = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  // Active Wizard Step: 1 through 6
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [successReceipt, setSuccessReceipt] = useState<{ id: string; type: string; title: string; suspect: Criminal } | null>(null);
  const [selectedCriminalForDrawer, setSelectedCriminalForDrawer] = useState<Criminal | null>(null);

  // Yes / No Questions for Step 2, 3, 4, 5
  const [hasEvidence, setHasEvidence] = useState<boolean | null>(null);
  const [hasWiretaps, setHasWiretaps] = useState<boolean | null>(null);
  const [hasFinance, setHasFinance] = useState<boolean | null>(null);
  const [hasVehicles, setHasVehicles] = useState<boolean | null>(null);

  const { refetch: refetchCriminals } = useQuery({ queryKey: ['criminals'], queryFn: () => getCriminals() });

  // ==========================================
  // STEP 1: SUSPECT PROFILE & BIOMETRICS STATE
  // ==========================================
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300');
  const [age, setAge] = useState<number>(38);
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Indian');
  const [crimeCategory, setCrimeCategory] = useState<CrimeCategory>('Extortion');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('HIGH');
  const [riskScore, setRiskScore] = useState<number>(85);
  const [status, setStatus] = useState<SuspectStatus>('WANTED');
  const [dob, setDob] = useState('1988-05-12');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [fingerprintId, setFingerprintId] = useState(`FP-ACN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [address, setAddress] = useState('Worli Sea Face, Sector 4');
  const [city, setCity] = useState('Mumbai');
  const [country, setCountry] = useState('India');
  const [lat, setLat] = useState<number>(19.0176);
  const [lng, setLng] = useState<number>(72.8150);
  const [biography, setBiography] = useState('');
  const [aiThreatSummary, setAiThreatSummary] = useState('');
  const [tagsInput, setTagsInput] = useState('Hawala, Extortion, Angadia');

  // Avatar presets
  const avatarPresets = [
    { label: 'Male 1 (Don)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
    { label: 'Male 2 (Operative)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
    { label: 'Male 3 (Tech)', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
    { label: 'Female 1 (Financier)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
    { label: 'Female 2 (Broker)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300' },
  ];

  // ==========================================
  // STEP 2: FORENSIC EVIDENCE ITEMS
  // ==========================================
  const [evidenceList, setEvidenceList] = useState<TimelineEvent[]>([
    {
      id: `evt-${Date.now()}-1`,
      title: 'CCTV Surveillance Sighting at Port Warehouse Terminal',
      eventType: 'CCTV Sighting',
      timestamp: new Date().toISOString(),
      location: 'JNPT Port Container Terminal 2, Navi Mumbai',
      description: 'Subject captured meeting secondary logistics operatives near bonded warehouse gate.',
      confidenceScore: 94,
      severity: 'HIGH',
      isVerified: true,
      evidenceFiles: [{ fileName: 'CCTV_JNPT_GATE2.mp4', fileType: 'video' }]
    }
  ]);

  const addEvidenceItem = () => {
    setEvidenceList(prev => [
      ...prev,
      {
        id: `evt-${Date.now()}-${prev.length + 1}`,
        title: 'Physical Evidence & Safehouse Seizure Record',
        eventType: 'Weapon Sighting',
        timestamp: new Date().toISOString(),
        location: `${city || 'Mumbai'}, ${country || 'India'}`,
        description: 'New forensic intelligence event logged by field interdiction officer.',
        confidenceScore: 88,
        severity: riskLevel,
        isVerified: true
      }
    ]);
  };

  const removeEvidenceItem = (index: number) => {
    setEvidenceList(prev => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // STEP 3: WIRETAP & TELECOM RECORDS
  // ==========================================
  const [wiretapList, setWiretapList] = useState<PhoneRecord[]>([
    {
      id: `ph-${Date.now()}-1`,
      phoneNumber: '+91 98201 88492',
      carrier: 'Encrypted Cellular / Satellite VoIP',
      imei: '864920048192041',
      ownerName: 'Primary Target Line',
      status: 'TAPPED',
      totalCallsLogged: 48,
      lastActive: '2026-08-25T14:30:00Z',
      frequentContacts: []
    }
  ]);

  const addWiretapItem = () => {
    setWiretapList(prev => [
      ...prev,
      {
        id: `ph-${Date.now()}-${prev.length + 1}`,
        phoneNumber: '+91 99000 ' + Math.floor(10000 + Math.random() * 90000),
        carrier: 'Encrypted Satellite Telecom',
        imei: '86' + Math.floor(1000000000000 + Math.random() * 9000000000000),
        ownerName: alias || name || 'Burner Line',
        status: 'TAPPED',
        totalCallsLogged: 5,
        lastActive: new Date().toISOString(),
        frequentContacts: []
      }
    ]);
  };

  const removeWiretapItem = (index: number) => {
    setWiretapList(prev => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // STEP 4: FINANCIAL ACCOUNTS & ANOMALIES
  // ==========================================
  const [financialList, setFinancialList] = useState<FinancialAccount[]>([
    {
      id: `fin-${Date.now()}-1`,
      bankName: 'Angadia Hawala Transfer Ledger (Zaveri Vault)',
      accountNumber: 'ACC-HAWALA-9921-MUM',
      accountType: 'OFFSHORE',
      balance: 14500000,
      currency: 'INR',
      holderName: 'Kuber Trading Shell Corp',
      flaggedTransactionsCount: 12,
      status: 'MONITORED'
    }
  ]);

  const addFinancialItem = () => {
    setFinancialList(prev => [
      ...prev,
      {
        id: `fin-${Date.now()}-${prev.length + 1}`,
        bankName: 'Offshore Cryptographic Trust / UAE Banking',
        accountNumber: '0x' + Math.random().toString(16).substring(2, 14),
        accountType: 'CRYPTO_WALLET',
        balance: 500000,
        currency: 'USDT',
        holderName: alias || name || 'Front Entity',
        flaggedTransactionsCount: 3,
        status: 'MONITORED'
      }
    ]);
  };

  const removeFinancialItem = (index: number) => {
    setFinancialList(prev => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // STEP 5: VEHICLE & ASSET DETAILS
  // ==========================================
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([
    {
      id: `veh-${Date.now()}-1`,
      make: 'Toyota',
      model: 'Land Cruiser (Armored B6)',
      year: 2024,
      color: 'Matte Black',
      licensePlate: 'MH-01-EE-9988',
      registeredOwner: 'Frontline Logistics Pvt Ltd',
      status: 'ACTIVE',
      lastSeenLocation: 'Bandra-Worli Sea Link Toll Plaza',
      lastSeenTime: '2026-08-25 21:15'
    }
  ]);

  const addVehicleItem = () => {
    setVehicleList(prev => [
      ...prev,
      {
        id: `veh-${Date.now()}-${prev.length + 1}`,
        make: 'Mahindra',
        model: 'Scorpio-N (Armored Convoy)',
        year: 2025,
        color: 'Pearl White',
        licensePlate: `MH-04-${Math.random().toString(36).substring(2, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        registeredOwner: alias || name || 'Escort Vehicle',
        status: 'ACTIVE',
        lastSeenLocation: `${city || 'Mumbai'} Highway Toll Gate`,
        lastSeenTime: 'Just now'
      }
    ]);
  };

  const removeVehicleItem = (index: number) => {
    setVehicleList(prev => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // AI AUTO-EVALUATION
  // ==========================================
  const handleAiAutoEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setRiskScore(94);
      setRiskLevel('CRITICAL');
      setAiThreatSummary(
        `A.E.G.I.S. neural link analysis classifies ${name || 'Subject'} as a CRITICAL apex operative in the ${crimeCategory} corridor. Direct temporal correlation detected across active wiretaps and high-value Angadia hawala ledger transfers.`
      );
      if (!biography) {
        setBiography(
          `Primary syndicate coordinator operating across ${city || 'Mumbai'}. Flagged by Crime Branch / Task Force intelligence for multi-jurisdictional syndicate orchestration.`
        );
      }
      setIsEvaluating(false);
    }, 600);
  };

  // ==========================================
  // STEP 6: CREATE & DISPATCH SUSPECT DOSSIER
  // ==========================================
  const handleFinalSubmit = async () => {
    if (!name.trim()) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const generatedId = `crm-${Date.now()}`;
    const generatedCriminalId = `CR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCriminal: Criminal = {
      id: generatedId,
      criminalId: generatedCriminalId,
      name: name.trim(),
      alias: alias.trim() || 'Target Operative',
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      age: Number(age) || 38,
      gender: gender || 'Male',
      nationality: nationality || 'Indian',
      crimeCategory,
      riskLevel,
      riskScore: Number(riskScore) || 85,
      status,
      lastKnownLocation: {
        address: address || 'Tactical Grid Sector',
        city: city || 'Mumbai',
        country: country || 'India',
        coordinates: [Number(lat) || 19.0176, Number(lng) || 72.8150]
      },
      lastActivity: new Date().toISOString(),
      knownAssociatesCount: 2,
      activeWarrants: 3,
      biography: biography || `Subject registered in ACN intelligence database under ${crimeCategory} active surveillance directive.`,
      aiThreatSummary: aiThreatSummary || `ACN AI Threat Index ${riskScore}/100. High-risk target operating within ${city || 'Mumbai'} regional syndicate nexus.`,
      personalDetails: {
        dob,
        bloodGroup,
        fingerprintId,
        heightCm: 180,
        eyeColor: 'Dark Brown'
      },
      knownAssociates: [],
      vehicles: hasVehicles ? vehicleList : [],
      phoneNumbers: hasWiretaps ? wiretapList : [],
      financialAccounts: hasFinance ? financialList : [],
      timeline: hasEvidence ? evidenceList : [],
      connectedOrganizations: [
        {
          id: `org-${Date.now()}`,
          name: `${city || 'Western'} Syndicate Network`,
          role: 'Key Operative',
          threatLevel: riskLevel
        }
      ],
      tags: parsedTags.length > 0 ? parsedTags : ['Monitored', 'HighPriority', 'ACN-Target']
    };

    try {
      await createCriminal(newCriminal);
      queryClient.setQueryData(['criminals'], (old: any) => {
        if (!old?.data) return { success: true, data: [newCriminal] };
        return { ...old, data: [newCriminal, ...old.data] };
      });

      // Also append evidence to global timeline if added
      if (hasEvidence && evidenceList.length > 0) {
        queryClient.setQueryData(['timeline'], (old: any) => {
          if (!old?.data) return { success: true, data: evidenceList };
          return { ...old, data: [...evidenceList, ...old.data] };
        });
      }

      refetchCriminals();

      addNotification({
        title: `Official Dossier Dispatched: ${newCriminal.name}`,
        message: `Subject ID ${newCriminal.criminalId} (${newCriminal.alias}) registered under ${newCriminal.crimeCategory}. Clearance verified.`,
        type: 'suspect',
        severity: newCriminal.riskLevel,
      });

      setSuccessReceipt({
        id: newCriminal.criminalId,
        type: 'Target Intelligence Dossier',
        title: newCriminal.name,
        suspect: newCriminal
      });

      // Automatically open the dossier drawer for immediate review!
      setSelectedCriminalForDrawer(newCriminal);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setName('');
    setAlias('');
    setBiography('');
    setAiThreatSummary('');
    setHasEvidence(null);
    setHasWiretaps(null);
    setHasFinance(null);
    setHasVehicles(null);
    setFingerprintId(`FP-ACN-${Math.floor(100000 + Math.random() * 900000)}`);
    setSuccessReceipt(null);
  };

  const wizardSteps = [
    { num: 1, label: '1. Suspect Profile', desc: 'Identity & Biometrics', icon: User },
    { num: 2, label: '2. Forensic Evidence', desc: 'CCTV / FIR / Seizures', icon: Shield },
    { num: 3, label: '3. Wiretaps & Phones', desc: 'VoIP & Burner Lines', icon: Phone },
    { num: 4, label: '4. Financial Anomaly', desc: 'Angadia / Crypto / Shell', icon: CreditCard },
    { num: 5, label: '5. Vehicle & Assets', desc: 'Plates & Armored Fleets', icon: Car },
    { num: 6, label: '6. Review & Dispatch', desc: 'Consolidated Summary', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              POLICE DATA COLLECTION & CASE INTAKE
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              6-Step Guided Protocol
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Add Suspect Profile & Forensic Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Progressive intake wizard: complete each step sequentially to register biometrics, evidence, tapped lines, financial nodes, and mobile assets.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetForm}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Wizard</span>
          </Button>
        </div>
      </div>

      {/* Step Progress Tracker Bar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-card overflow-x-auto">
        <div className="flex items-center justify-between min-w-[720px] gap-2">
          {wizardSteps.map((step) => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div
                key={step.num}
                onClick={() => {
                  if (isCompleted) setCurrentStep(step.num);
                }}
                className={`flex-1 flex items-center gap-2.5 p-2.5 rounded-lg border transition text-left ${
                  isCurrent
                    ? 'bg-slate-900 border-slate-900 text-white shadow-subtle'
                    : isCompleted
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 cursor-pointer hover:bg-emerald-100'
                    : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold truncate">{step.label}</span>
                  </div>
                  <span className={`text-[10px] block truncate ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Receipt Banner */}
      {successReceipt && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-card animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-subtle shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  CLASSIFIED INTELLIGENCE DISPATCHED SUCCESSFULLY
                </span>
                <h3 className="text-sm font-bold text-emerald-950">
                  {successReceipt.title} ({successReceipt.id})
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Subject dossier registered in active law enforcement roster with all forensic links, tapped numbers, and assets.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setSelectedCriminalForDrawer(successReceipt.suspect)}
                className="gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs shadow-subtle"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Official Dossier</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetForm}
                className="text-xs"
              >
                Create Another Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Wizard Form Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 sm:p-6">
        {/* ========================================================================= */}
        {/* STEP 1: SUSPECT PROFILE (PRIMARY IDENTITY & BIOMETRICS) */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-800" /> Step 1: Suspect Profile (Primary Identity & Biometrics)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Enter official identification, biometrics, risk scoring, and location data.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Step 1 of 6
              </span>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="text-slate-700 font-semibold text-xs block mb-1.5">
                Suspect Photo / Surveillance Mugshot
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src={photoUrl}
                  alt="Suspect Preview"
                  className="w-16 h-16 rounded-lg object-cover border-2 border-slate-900 shadow-subtle bg-slate-100"
                />
                <div className="flex-1 min-w-[240px] space-y-1.5">
                  <input
                    type="text"
                    placeholder="Enter custom image URL..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {avatarPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPhotoUrl(preset.url)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition ${
                          photoUrl === preset.url
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawood Ibrahim Kaskar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Street Alias / Code Name
                </label>
                <input
                  type="text"
                  placeholder='e.g. "D-Boss" / "Hawala King"'
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Crime Category</label>
                <select
                  value={crimeCategory}
                  onChange={(e) => setCrimeCategory(e.target.value as CrimeCategory)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:border-slate-400 shadow-subtle"
                >
                  <option value="Extortion">Extortion</option>
                  <option value="Money Laundering">Money Laundering</option>
                  <option value="Drug Trafficking">Drug Trafficking</option>
                  <option value="Cybercrime">Cybercrime</option>
                  <option value="Arms Smuggling">Arms Smuggling</option>
                  <option value="Organized Heist">Organized Heist</option>
                  <option value="Human Trafficking">Human Trafficking</option>
                  <option value="Terrorism Financing">Terrorism Financing</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Current Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SuspectStatus)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:border-slate-400 shadow-subtle"
                >
                  <option value="WANTED">WANTED</option>
                  <option value="UNDER_SURVEILLANCE">UNDER SURVEILLANCE</option>
                  <option value="IN_CUSTODY">IN CUSTODY</option>
                  <option value="BAIL">BAIL</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Threat Level & Risk Score ({riskScore}/100)
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={riskLevel}
                    onChange={(e) => {
                      const lvl = e.target.value as RiskLevel;
                      setRiskLevel(lvl);
                      if (lvl === 'CRITICAL') setRiskScore(95);
                      else if (lvl === 'HIGH') setRiskScore(80);
                      else if (lvl === 'MEDIUM') setRiskScore(60);
                      else setRiskScore(35);
                    }}
                    className="px-2.5 py-2 rounded-md border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:border-slate-400 shadow-subtle"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={riskScore}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRiskScore(val);
                      if (val >= 85) setRiskLevel('CRITICAL');
                      else if (val >= 70) setRiskLevel('HIGH');
                      else if (val >= 45) setRiskLevel('MEDIUM');
                      else setRiskLevel('LOW');
                    }}
                    className="flex-1 accent-slate-900 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Age & Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400"
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-2 py-2 rounded-md border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:border-slate-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="Indian"
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs bg-white focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-semibold block">Auto Fingerprint ID</label>
                  <button
                    type="button"
                    onClick={() => setFingerprintId(`FP-ACN-${Math.floor(100000 + Math.random() * 900000)}`)}
                    className="text-[10px] text-blue-600 hover:underline"
                  >
                    Regenerate
                  </button>
                </div>
                <input
                  type="text"
                  value={fingerprintId}
                  onChange={(e) => setFingerprintId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 font-mono text-xs bg-slate-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Last Known City</label>
                <input
                  type="text"
                  placeholder="Mumbai / Delhi / Kolkata"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-semibold block mb-1">Last Known Address / Safehouse</label>
                <input
                  type="text"
                  placeholder="e.g. Worli Sea Face, Sector 4 Luxury Towers"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-semibold text-xs block">
                  Investigative Biography & Case Summary
                </label>
                <button
                  type="button"
                  onClick={handleAiAutoEvaluate}
                  disabled={isEvaluating}
                  className="text-[10px] font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 transition"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  {isEvaluating ? 'Evaluating...' : '⚡ AI Auto-Generate Summary'}
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Enter intelligence summary, operational history, modus operandi, and interdiction directives..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full p-2.5 rounded-md border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-slate-400 shadow-subtle leading-relaxed"
              />
            </div>

            {/* Navigation to Step 2 */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {name.trim() ? '✓ Primary profile complete' : '⚠️ Please enter Suspect Full Name to proceed'}
              </span>
              <Button
                variant="default"
                size="sm"
                disabled={!name.trim()}
                onClick={() => setCurrentStep(2)}
                className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <span>Proceed to Step 2: Forensic Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: FORENSIC EVIDENCE (YES / NO QUESTION) */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-800" /> Step 2: Forensic Evidence
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Log CCTV sightings, filed FIR records, weapon seizures, and chain-of-custody attachments.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Step 2 of 6
              </span>
            </div>

            {/* Yes / No Question Prompt */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Is forensic evidence available for this subject?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select <strong className="text-slate-700">Yes</strong> to log CCTV sighting timestamps, filed FIR case numbers, weapon seizures, or <strong className="text-slate-700">No</strong> to skip directly to wiretaps.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setHasEvidence(true)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition ${
                    hasEvidence === true
                      ? 'bg-slate-900 text-white shadow-subtle ring-2 ring-slate-900'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Yes, Add Forensic Evidence</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasEvidence(false);
                    setCurrentStep(3);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition ${
                    hasEvidence === false
                      ? 'bg-slate-200 text-slate-800 font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>No, Skip to Wiretaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Evidence Items Editor */}
            {hasEvidence && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Logged Forensic Evidence Items ({evidenceList.length})
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addEvidenceItem}
                    className="gap-1 text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Evidence Item</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {evidenceList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-subtle"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-800">Evidence Record #{idx + 1}</span>
                        {evidenceList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEvidenceItem(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-slate-600 block mb-1 font-semibold">Evidence Title / Sighting</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEvidenceList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, title: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Evidence Type</label>
                          <select
                            value={item.eventType}
                            onChange={(e) => {
                              const val = e.target.value as TimelineEventType;
                              setEvidenceList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, eventType: val } : x))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs bg-white"
                          >
                            <option value="CCTV Sighting">CCTV Sighting</option>
                            <option value="Weapon Sighting">Weapon Sighting</option>
                            <option value="Phone Calls">Phone Calls</option>
                            <option value="Wire Transfer">Financial / Wire Transfer</option>
                            <option value="Meeting">Field Meeting</option>
                            <option value="FIR Filed">FIR Filed</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-slate-600 block mb-1 font-semibold">Location</label>
                          <input
                            type="text"
                            value={item.location}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEvidenceList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, location: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">
                            Confidence Score ({item.confidenceScore}%)
                          </label>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={item.confidenceScore}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setEvidenceList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, confidenceScore: val } : x))
                              );
                            }}
                            className="w-full accent-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="text-slate-600 block mb-1 font-semibold">Description & Findings</label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEvidenceList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, description: val } : x))
                              );
                            }}
                            className="w-full p-2 rounded border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 1</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(3)}
                className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <span>Proceed to Step 3: Wiretaps & Telecommunications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: WIRETAPS & TELECOMMUNICATIONS (YES / NO QUESTION) */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-800" /> Step 3: Wiretaps & Telecommunications
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Monitor intercepted cellular calls, burner lines, satellite VoIP telemetry, and IMEI identities.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Step 3 of 6
              </span>
            </div>

            {/* Yes / No Question Prompt */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Are wiretaps or intercepted phone numbers active for this subject?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select <strong className="text-slate-700">Yes</strong> to log tapped phone numbers, encrypted satellite carriers, IMEI records, or <strong className="text-slate-700">No</strong> to skip directly to financials.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setHasWiretaps(true)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition ${
                    hasWiretaps === true
                      ? 'bg-slate-900 text-white shadow-subtle ring-2 ring-slate-900'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Yes, Add Wiretaps</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasWiretaps(false);
                    setCurrentStep(4);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition ${
                    hasWiretaps === false
                      ? 'bg-slate-200 text-slate-800 font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>No, Skip to Financials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wiretaps Editor */}
            {hasWiretaps && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Intercepted Lines & Wiretaps ({wiretapList.length})
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addWiretapItem}
                    className="gap-1 text-xs text-emerald-700 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Intercepted Line</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {wiretapList.map((ph, idx) => (
                    <div
                      key={ph.id || idx}
                      className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-subtle"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-800">Wiretap Line #{idx + 1}</span>
                        {wiretapList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWiretapItem(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Phone Number / MSISDN</label>
                          <input
                            type="text"
                            value={ph.phoneNumber}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWiretapList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, phoneNumber: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Carrier / VoIP Provider</label>
                          <input
                            type="text"
                            value={ph.carrier}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWiretapList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, carrier: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">IMEI Identifier</label>
                          <input
                            type="text"
                            value={ph.imei}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWiretapList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, imei: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Line Status</label>
                          <select
                            value={ph.status}
                            onChange={(e) => {
                              const val = e.target.value as 'ACTIVE' | 'TAPPED' | 'DISCONNECTED' | 'BURNER';
                              setWiretapList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, status: val } : x))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs bg-white"
                          >
                            <option value="TAPPED">TAPPED (Live Feed)</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="DISCONNECTED">DISCONNECTED</option>
                            <option value="BURNER">BURNER LINE</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-slate-600 block mb-1 font-semibold">Registered Holder / Alias</label>
                          <input
                            type="text"
                            value={ph.ownerName}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWiretapList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, ownerName: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(2)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 2</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(4)}
                className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <span>Proceed to Step 4: Financial Anomaly & Accounts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: FINANCIAL ANOMALY & MONITORED ACCOUNTS (YES / NO QUESTION) */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-800" /> Step 4: Financial Anomaly & Monitored Accounts
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Flag offshore bank accounts, Angadia hawala ledgers, cryptocurrency wallets, shell companies, and illicit fund flows.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Step 4 of 6
              </span>
            </div>

            {/* Yes / No Question Prompt */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Are monitored financial accounts or transaction anomalies identified?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select <strong className="text-slate-700">Yes</strong> to log Angadia hawala ledgers, crypto wallets, offshore bank accounts, or <strong className="text-slate-700">No</strong> to skip directly to vehicles.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setHasFinance(true)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition ${
                    hasFinance === true
                      ? 'bg-slate-900 text-white shadow-subtle ring-2 ring-slate-900'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Yes, Add Financial Accounts</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasFinance(false);
                    setCurrentStep(5);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition ${
                    hasFinance === false
                      ? 'bg-slate-200 text-slate-800 font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>No, Skip to Vehicles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Financial Accounts Editor */}
            {hasFinance && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Monitored Financial Accounts & Ledgers ({financialList.length})
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFinancialItem}
                    className="gap-1 text-xs text-amber-800 border-amber-200 bg-amber-50/50 hover:bg-amber-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Financial Node</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {financialList.map((acc, idx) => (
                    <div
                      key={acc.id || idx}
                      className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-subtle"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-800">Financial Account #{idx + 1}</span>
                        {financialList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFinancialItem(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-slate-600 block mb-1 font-semibold">Bank Name / Ledger Entity</label>
                          <input
                            type="text"
                            value={acc.bankName}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFinancialList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, bankName: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Account Type</label>
                          <select
                            value={acc.accountType}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              setFinancialList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, accountType: val } : x))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs bg-white"
                          >
                            <option value="OFFSHORE">Offshore Account</option>
                            <option value="CRYPTO_WALLET">Crypto Wallet</option>
                            <option value="SHELL_CORP">Shell Company</option>
                            <option value="SAVINGS">Domestic Savings</option>
                            <option value="CHECKING">Current / Checking</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Account Number / Wallet ID</label>
                          <input
                            type="text"
                            value={acc.accountNumber}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFinancialList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, accountNumber: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Estimated Balance Amount</label>
                          <input
                            type="number"
                            value={acc.balance}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setFinancialList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, balance: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Currency</label>
                          <select
                            value={acc.currency}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFinancialList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, currency: val } : x))
                              );
                            }}
                            className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs bg-white"
                          >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="USDT">USDT (Tether)</option>
                            <option value="EUR">EUR (€)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(3)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 3</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(5)}
                className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <span>Proceed to Step 5: Vehicle & Mobile Asset Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: VEHICLE & MOBILE ASSET DETAILS (YES / NO QUESTION) */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-800" /> Step 5: Vehicle & Mobile Asset Details
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Track convoy vehicles, armored SUVs, license plate intercepts, registration entities, and sighting history.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Step 5 of 6
              </span>
            </div>

            {/* Yes / No Question Prompt */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Are vehicles or registered mobile assets identified?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select <strong className="text-slate-700">Yes</strong> to log license plates, vehicle models, colors, registered owners, or <strong className="text-slate-700">No</strong> to advance directly to final review.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setHasVehicles(true)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition ${
                    hasVehicles === true
                      ? 'bg-slate-900 text-white shadow-subtle ring-2 ring-slate-900'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Yes, Add Vehicle Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasVehicles(false);
                    setCurrentStep(6);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition ${
                    hasVehicles === false
                      ? 'bg-slate-200 text-slate-800 font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>No, Skip to Final Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Vehicle Editor */}
            {hasVehicles && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Tracked Vehicles & Assets ({vehicleList.length})
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addVehicleItem}
                    className="gap-1 text-xs text-purple-800 border-purple-200 bg-purple-50/50 hover:bg-purple-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Vehicle Asset</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {vehicleList.map((veh, idx) => (
                    <div
                      key={veh.id || idx}
                      className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5 shadow-subtle"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-slate-800">Vehicle Asset #{idx + 1}</span>
                        {vehicleList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVehicleItem(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Make & Brand</label>
                          <input
                            type="text"
                            value={veh.make}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, make: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Model & Spec</label>
                          <input
                            type="text"
                            value={veh.model}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, model: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">License Plate Number</label>
                          <input
                            type="text"
                            value={veh.licensePlate}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, licensePlate: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Color & Finish</label>
                          <input
                            type="text"
                            value={veh.color}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, color: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Registered Owner</label>
                          <input
                            type="text"
                            value={veh.registeredOwner}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, registeredOwner: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 block mb-1 font-semibold">Last Sighted Location</label>
                          <input
                            type="text"
                            value={veh.lastSeenLocation}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVehicleList((prev) =>
                                prev.map((x, i) => (i === idx ? { ...x, lastSeenLocation: val } : x))
                              );
                            }}
                            className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(4)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 4</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(6)}
                className="gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <span>Proceed to Step 6: Review & Final Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: REVIEW & FINAL DISPATCH */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Step 6: Review & Final Dispatch
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Inspect the consolidated intelligence dossier before committing to the live operational roster.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ready for Dispatch
              </span>
            </div>

            {/* Consolidated Summary Dossier Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              {/* Primary Identity Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-300 shadow-subtle bg-white shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900">{name || 'Unnamed Target'}</h3>
                      {alias && <span className="text-xs text-slate-500 font-mono font-semibold">("{alias}")</span>}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {crimeCategory} • {age} Yrs • {nationality} ({gender})
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      DOB: {dob} • FP: {fingerprintId} • {city}, {country}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <RiskBadge level={riskLevel} />
                    <StatusBadge status={status} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    AI Threat Score: <strong className="text-slate-900">{riskScore}/100</strong>
                  </span>
                </div>
              </div>

              {/* Telemetry Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Forensic Evidence</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {hasEvidence ? `${evidenceList.length} Logged` : 'None / Skipped'}
                  </span>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Active Wiretaps</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {hasWiretaps ? `${wiretapList.length} Intercepted` : 'None / Skipped'}
                  </span>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Monitored Accounts</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {hasFinance ? `${financialList.length} Accounts` : 'None / Skipped'}
                  </span>
                </div>

                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Mobile Assets</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {hasVehicles ? `${vehicleList.length} Vehicles` : 'None / Skipped'}
                  </span>
                </div>
              </div>

              {/* Biography preview */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                <span className="font-bold text-[11px] text-slate-700 block uppercase tracking-wider">
                  Investigative Dossier Summary:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {biography || `Subject registered in ACN intelligence database under ${crimeCategory} active surveillance directive.`}
                </p>
              </div>
            </div>

            {/* Final Dispatch Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(5)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 5</span>
              </Button>

              <Button
                variant="default"
                size="lg"
                disabled={isSubmitting || !name.trim()}
                onClick={handleFinalSubmit}
                className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering & Encrypting Dossier...
                  </span>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Create & Dispatch Suspect Dossier</span>
                    <Check className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Dossier Drawer for Live Inspection */}
      <CriminalProfileDrawer
        criminal={selectedCriminalForDrawer}
        onClose={() => setSelectedCriminalForDrawer(null)}
      />
    </div>
  );
};
