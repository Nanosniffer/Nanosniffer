import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  ShieldAlert,
  Share2,
  TrendingUp,
  FileText,
  User,
  Building,
  CreditCard,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { Button } from '../ui/button';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  dataCard?: {
    type: 'connections' | 'risk_assessment' | 'financial_anomaly' | 'centrality';
    title: string;
    entities?: Array<{ name: string; type: string; risk: string; link?: string }>;
    score?: number;
    details: string;
    confidence: number;
  };
}

const PRESET_QUERIES = [
  'Show connections between Elena Rostova and Viktor Kozlov',
  'Why is Elena Rostova considered CRITICAL risk?',
  'Show recent suspicious financial transactions and laundering loops',
  'Which individual has the highest network centrality influence?',
];

export const AiInvestigatorDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Greetings, Officer. I am the NETRA AI Intelligence Assistant. Ask any question about criminal syndicates, entity linkages, financial transaction paths, or risk anomalies.',
      timestamp: 'Just now',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse: Message;
      const lower = q.toLowerCase();

      if (lower.includes('connection') || lower.includes('elena') || lower.includes('viktor')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'Analysis complete. Elena Rostova and Viktor Kozlov share 3 high-confidence links including a direct $1.8M offshore wire transfer through Bank of Cyprus and a shared logistics warehouse at Port of Miami.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          dataCard: {
            type: 'connections',
            title: 'Syndicate Link Topology',
            entities: [
              { name: 'Elena Rostova', type: 'Person (Leader)', risk: 'CRITICAL' },
              { name: 'Viktor Kozlov', type: 'Person (Broker)', risk: 'CRITICAL' },
              { name: 'Nautilus Shipping LLC', type: 'Front Organization', risk: 'HIGH' },
            ],
            details: 'Direct money transfer ($1,800,000) • Cross-referenced via Intercept #INT-9921',
            confidence: 96.8,
          },
        };
      } else if (lower.includes('risk') || lower.includes('why')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'Subject Elena Rostova holds a multi-factor risk score of 94.5/100 (CRITICAL). This score is driven by 3 active international warrants, 14 confirmed syndicate connections, and direct link to high-value arms trafficking telemetry.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          dataCard: {
            type: 'risk_assessment',
            title: 'Risk Factor Decomposition',
            score: 94.5,
            details: 'Warrant Severity: +25% • Centrality Metric: +15% • Associate Risk Floor: +54.5%',
            confidence: 98.2,
          },
        };
      } else if (lower.includes('financial') || lower.includes('transaction') || lower.includes('money')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'Detected rapid capital dispersion loop: $4.2M originated from Apex Crypto Holdings, routed across 3 intermediary shell entities, and consolidated into Swiss Alps Vault within 96 minutes.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          dataCard: {
            type: 'financial_anomaly',
            title: 'Circular Laundering Loop #FIN-881',
            entities: [
              { name: 'Apex Crypto Holdings', type: 'Origin', risk: 'HIGH' },
              { name: 'Swiss Alps Vault', type: 'Destination', risk: 'CRITICAL' },
            ],
            details: 'Total volume: $4,200,000 USD • Burst frequency: 12 transactions/hr',
            confidence: 93.4,
          },
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'Based on global graph topology, Subject Viktor Kozlov exhibits the highest Betweenness Centrality (0.842). Removing or intercepting this broker node will disrupt 67% of syndicate inter-group communications.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          dataCard: {
            type: 'centrality',
            title: 'Network Bottleneck Identification',
            entities: [
              { name: 'Viktor Kozlov', type: 'Broker Node', risk: 'CRITICAL' },
            ],
            details: 'Betweenness Centrality: 0.842 • Direct Bridge between 4 regional cartels',
            confidence: 95.0,
          },
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-semibold text-slate-900">AI Intelligence Assistant</h2>
              <p className="text-[10px] text-slate-500">Autonomous Evidence Analysis & Correlation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3 rounded-lg text-xs max-w-[90%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-subtle'
                }`}
              >
                {msg.text}
              </div>

              {/* Rich Data Card */}
              {msg.dataCard && (
                <div className="mt-2 w-full p-3 rounded-lg bg-white border border-slate-200 shadow-card text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-900 text-[11px] flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-brand-600" />
                      {msg.dataCard.title}
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {msg.dataCard.confidence}% Confidence
                    </span>
                  </div>

                  {msg.dataCard.entities && (
                    <div className="space-y-1">
                      {msg.dataCard.entities.map((e, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100 text-[11px]"
                        >
                          <span className="font-medium text-slate-800">{e.name}</span>
                          <span className="text-[10px] text-slate-500">{e.type}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[11px] text-slate-600 bg-slate-50/70 p-2 rounded border border-slate-100">
                    {msg.dataCard.details}
                  </p>

                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-[11px] h-6"
                      onClick={() => {
                        onClose();
                        navigate('/network');
                      }}
                    >
                      <Share2 className="w-3 h-3 mr-1" /> View in Graph
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-[11px] h-6"
                      onClick={() => {
                        onClose();
                        navigate('/criminals');
                      }}
                    >
                      <User className="w-3 h-3 mr-1" /> View Dossier
                    </Button>
                  </div>
                </div>
              )}

              <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-slate-500 text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 w-fit animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
              <span>Analyzing graph relationships & intelligence logs...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1.5 shrink-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            SUGGESTED INVESTIGATION PROMPTS
          </p>
          <div className="flex flex-col gap-1">
            {PRESET_QUERIES.map((pq, i) => (
              <button
                key={i}
                onClick={() => handleSend(pq)}
                className="text-left text-[11px] text-slate-600 hover:text-slate-900 p-1.5 rounded hover:bg-slate-100 transition truncate border border-slate-200/60 bg-white"
              >
                • {pq}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="p-3 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask about connections, risk, financial loops..."
              className="flex-1 px-3 py-1.5 text-xs rounded-md border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
            />
            <Button type="submit" variant="default" size="sm" className="h-8 px-3">
              <Send className="w-3 h-3" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
