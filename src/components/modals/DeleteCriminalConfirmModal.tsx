import React, { useState } from 'react';
import { Criminal } from '../../types';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { RiskBadge, StatusBadge } from '../common/StatusBadge';

interface DeleteCriminalConfirmModalProps {
  isOpen: boolean;
  criminal: Criminal | null;
  onClose: () => void;
  onConfirmDelete: (criminal: Criminal) => Promise<void> | void;
}

export const DeleteCriminalConfirmModal: React.FC<DeleteCriminalConfirmModalProps> = ({
  isOpen,
  criminal,
  onClose,
  onConfirmDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !criminal) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirmDelete(criminal);
      setIsDeleting(false);
      onClose();
    } catch (err) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-xl border border-red-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-950">Confirm Subject Expungement</h3>
              <p className="text-[11px] text-red-700">Permanent Intelligence Database Deletion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 rounded-md text-red-400 hover:text-red-700 hover:bg-red-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Profile Card */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3.5">
            <img
              src={criminal.photoUrl}
              alt={criminal.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
              }}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-mono font-bold text-slate-800 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                  {criminal.criminalId}
                </span>
                <StatusBadge status={criminal.status} />
                <RiskBadge level={criminal.riskLevel} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">{criminal.name}</h4>
              <p className="text-xs text-slate-500 truncate">
                "{criminal.alias}" • {criminal.crimeCategory}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Irreversible Action Warning</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Are you sure you want to permanently delete this suspect profile from active intelligence dossiers? This will purge all associated telemetry, vehicle logs, and network ties.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="h-8 px-3 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 px-3 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white gap-1.5 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting Profile...' : 'Confirm Expungement'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
