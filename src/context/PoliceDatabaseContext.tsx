import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { POLICE_GATEWAYS, POLICE_DATABASE_RECORDS, PoliceGatewayInfo } from '../data/dummy/policeDatabaseSync';
import { saveMultipleCustomCriminals, saveCustomCriminal } from '../api/criminals';
import { Criminal } from '../types';

interface SyncLogEntry {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

interface PoliceDatabaseContextType {
  isConnected: boolean;
  selectedGateway: PoliceGatewayInfo;
  setSelectedGatewayId: (id: string) => void;
  unitCode: string;
  setUnitCode: (code: string) => void;
  officerBadge: string;
  setOfficerBadge: (badge: string) => void;
  clearanceLevel: string;
  setClearanceLevel: (clearance: string) => void;
  lastSyncTime: string | null;
  isConnecting: boolean;
  isSyncing: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  syncLogs: SyncLogEntry[];
  autoSyncEnabled: boolean;
  setAutoSyncEnabled: (enabled: boolean) => void;
  connectGateway: (customParams?: { gatewayId?: string; unitCode?: string; badge?: string; clearance?: string }) => Promise<boolean>;
  disconnectGateway: () => void;
  syncPoliceData: () => Promise<{ importedCount: number; message: string }>;
  importSingleRecord: (criminal: Criminal) => Promise<boolean>;
}

const PoliceDatabaseContext = createContext<PoliceDatabaseContextType | undefined>(undefined);

const STORAGE_CONNECTED_KEY = 'acn_police_db_connected';
const STORAGE_GATEWAY_KEY = 'acn_police_db_gateway';
const STORAGE_UNIT_KEY = 'acn_police_db_unit';
const STORAGE_BADGE_KEY = 'acn_police_db_badge';
const STORAGE_SYNC_TIME_KEY = 'acn_police_db_last_sync';

export const PoliceDatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_CONNECTED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [gatewayId, setGatewayId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_GATEWAY_KEY) || 'CCTNS_NCRB';
    } catch {
      return 'CCTNS_NCRB';
    }
  });

  const [unitCode, setUnitCode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_UNIT_KEY) || 'DL-SPEC-CELL-01';
    } catch {
      return 'DL-SPEC-CELL-01';
    }
  });

  const [officerBadge, setOfficerBadge] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_BADGE_KEY) || 'IPS-2019-DL-9841';
    } catch {
      return 'IPS-2019-DL-9841';
    }
  });

  const [clearanceLevel, setClearanceLevel] = useState<string>('DEFCON 2 - CLASSIFIED');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_SYNC_TIME_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>([
    {
      id: 'init-1',
      time: new Date().toLocaleTimeString('en-IN', { hour12: true }),
      message: 'Police Database Intelligence Gateway subsystem initialized.',
      type: 'info',
    }
  ]);

  const selectedGateway = POLICE_GATEWAYS.find(g => g.id === gatewayId) || POLICE_GATEWAYS[0];

  const addLog = (message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const newEntry: SyncLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString('en-IN', { hour12: true }),
      message,
      type,
    };
    setSyncLogs(prev => [newEntry, ...prev.slice(0, 49)]);
  };

  const connectGateway = async (customParams?: { gatewayId?: string; unitCode?: string; badge?: string; clearance?: string }): Promise<boolean> => {
    setIsConnecting(true);
    const targetGateway = customParams?.gatewayId ? (POLICE_GATEWAYS.find(g => g.id === customParams.gatewayId) || selectedGateway) : selectedGateway;
    const targetUnit = customParams?.unitCode || unitCode;
    const targetBadge = customParams?.badge || officerBadge;

    addLog(`Initiating secure handshake with ${targetGateway.name}...`, 'info');
    
    // Multi-step simulated government handshake
    await new Promise(r => setTimeout(r, 600));
    addLog(`Negotiating TLS 1.3 / AES-256-GCM encrypted tunnel to ${targetGateway.endpointUrl}...`, 'info');
    
    await new Promise(r => setTimeout(r, 700));
    addLog(`Validating Officer Badge [${targetBadge}] & Station Unit [${targetUnit}]...`, 'info');
    
    await new Promise(r => setTimeout(r, 600));
    addLog(`Clearance validated: DEFCON 2 / NCRB Federated Intelligence Node Authorized.`, 'success');

    const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' IST';
    
    setIsConnected(true);
    setLastSyncTime(nowStr);
    setIsConnecting(false);

    try {
      localStorage.setItem(STORAGE_CONNECTED_KEY, 'true');
      localStorage.setItem(STORAGE_GATEWAY_KEY, targetGateway.id);
      localStorage.setItem(STORAGE_UNIT_KEY, targetUnit);
      localStorage.setItem(STORAGE_BADGE_KEY, targetBadge);
      localStorage.setItem(STORAGE_SYNC_TIME_KEY, nowStr);
    } catch (e) {
      console.error(e);
    }

    addLog(`Successfully connected to ${targetGateway.shortCode} database (Latency: ${targetGateway.latencyMs}ms).`, 'success');
    return true;
  };

  const disconnectGateway = () => {
    setIsConnected(false);
    try {
      localStorage.setItem(STORAGE_CONNECTED_KEY, 'false');
    } catch (e) {
      console.error(e);
    }
    addLog(`Disconnected from ${selectedGateway.name}. Offline cache active.`, 'warn');
  };

  const syncPoliceData = async (): Promise<{ importedCount: number; message: string }> => {
    if (!isConnected) {
      await connectGateway();
    }

    setIsSyncing(true);
    addLog(`Syncing with ${selectedGateway.name}: Polling latest active FIRs, warrants, and biometric hashes...`, 'info');
    
    await new Promise(r => setTimeout(r, 1200));

    // Save and merge new police records into custom criminals
    const imported = saveMultipleCustomCriminals(POLICE_DATABASE_RECORDS);

    const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' IST';
    setLastSyncTime(nowStr);
    setIsSyncing(false);

    try {
      localStorage.setItem(STORAGE_SYNC_TIME_KEY, nowStr);
    } catch (e) {
      console.error(e);
    }

    addLog(`Ingestion complete: ${imported} verified police dossiers merged into active investigation grid.`, 'success');
    return {
      importedCount: imported,
      message: `Successfully synchronized ${imported} high-profile suspect files from ${selectedGateway.shortCode}.`,
    };
  };

  const importSingleRecord = async (criminal: Criminal): Promise<boolean> => {
    addLog(`Importing suspect file [${criminal.criminalId}: ${criminal.name}] from ${selectedGateway.shortCode}...`, 'info');
    saveCustomCriminal(criminal);
    addLog(`Suspect dossier [${criminal.name}] merged into local classified database.`, 'success');
    return true;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PoliceDatabaseContext.Provider
      value={{
        isConnected,
        selectedGateway,
        setSelectedGatewayId: (id) => {
          setGatewayId(id);
          try {
            localStorage.setItem(STORAGE_GATEWAY_KEY, id);
          } catch {}
        },
        unitCode,
        setUnitCode: (c) => {
          setUnitCode(c);
          try {
            localStorage.setItem(STORAGE_UNIT_KEY, c);
          } catch {}
        },
        officerBadge,
        setOfficerBadge: (b) => {
          setOfficerBadge(b);
          try {
            localStorage.setItem(STORAGE_BADGE_KEY, b);
          } catch {}
        },
        clearanceLevel,
        setClearanceLevel,
        lastSyncTime,
        isConnecting,
        isSyncing,
        isModalOpen,
        setIsModalOpen,
        openModal,
        closeModal,
        syncLogs,
        autoSyncEnabled,
        setAutoSyncEnabled,
        connectGateway,
        disconnectGateway,
        syncPoliceData,
        importSingleRecord,
      }}
    >
      {children}
    </PoliceDatabaseContext.Provider>
  );
};

export const usePoliceDatabase = () => {
  const context = useContext(PoliceDatabaseContext);
  if (!context) {
    throw new Error('usePoliceDatabase must be used within a PoliceDatabaseProvider');
  }
  return context;
};
