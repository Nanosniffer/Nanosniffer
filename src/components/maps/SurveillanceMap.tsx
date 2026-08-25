import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationEntity, Criminal } from '../../types';
import { RiskBadge } from '../common/StatusBadge';
import { MapPin, ShieldAlert, Video, Radio, Building2 } from 'lucide-react';

interface SurveillanceMapProps {
  locations: LocationEntity[];
  criminals?: Criminal[];
}

// Custom Leaflet DivIcons with glowing pulse styling
const createTacticalIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-tactical-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #0b152d;
        box-shadow: 0 0 12px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        color: #030712;
        font-weight: bold;
        font-size: 10px;
        font-family: monospace;
      ">
        ${label}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export const SurveillanceMap: React.FC<SurveillanceMapProps> = ({ locations, criminals = [] }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WAREHOUSE' | 'SAFEHOUSE' | 'PORT'>('ALL');

  const filteredLocations = locations.filter((loc) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'WAREHOUSE') return loc.type === 'Warehouse';
    if (activeFilter === 'SAFEHOUSE') return loc.type === 'Safehouse';
    if (activeFilter === 'PORT') return loc.type === 'Port / Terminal';
    return true;
  });

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-agency-950 shadow-2xl flex flex-col">
      {/* Map Header Toolbar */}
      <div className="p-3 bg-agency-950/90 border-b border-slate-800 z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono font-bold text-slate-200">TACTICAL SURVEILLANCE GEOMAP</span>
          <span className="text-[10px] font-mono text-slate-500">({filteredLocations.length} SITES MONITORED)</span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1">
          {['ALL', 'SAFEHOUSE', 'WAREHOUSE', 'PORT'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition ${
                activeFilter === f
                  ? 'bg-cyber-cyan/20 text-cyber-cyan-bright border border-cyber-cyan/60'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Canvas */}
      <div className="relative flex-1 w-full h-full">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full dark-tiles"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map((loc) => {
            const color =
              loc.riskLevel === 'CRITICAL'
                ? '#ef4444'
                : loc.riskLevel === 'HIGH'
                ? '#f59e0b'
                : '#06b6d4';

            const icon = createTacticalIcon(color, loc.type[0]);

            return (
              <React.Fragment key={loc.id}>
                <Marker position={loc.coordinates} icon={icon}>
                  <Popup>
                    <div className="p-1 space-y-1.5 font-sans min-w-[200px]">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
                        <span className="font-mono text-xs font-bold text-cyber-cyan">{loc.name}</span>
                        <RiskBadge level={loc.riskLevel} />
                      </div>
                      <p className="text-xs text-slate-300 font-mono">{loc.address}, {loc.city}</p>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 pt-1">
                        <div>TYPE: <span className="text-slate-200">{loc.type}</span></div>
                        <div>SUSPECTS: <span className="text-cyber-cyan font-bold">{loc.associatedSuspectsCount}</span></div>
                        <div>CCTV: <span className="text-emerald-400">{loc.surveillanceCameraInstalled ? 'ONLINE' : 'NONE'}</span></div>
                        <div>LAST EVENT: <span className="text-slate-300">{loc.lastIncidentDate || 'N/A'}</span></div>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {loc.riskLevel === 'CRITICAL' && (
                  <Circle
                    center={loc.coordinates}
                    radius={150000}
                    pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
