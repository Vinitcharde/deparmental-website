import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Lock,
  X,
  RefreshCw,
  Globe,
  Terminal,
  Layers,
} from 'lucide-react';
import { odysseyAudio } from '../utils/audioSynth';
import odysseyCyberHelm from '../assets/images/odyssey_cyber_helm.jpg';

export interface RegistrationGatewayData {
  url: string;
  title: string;
  category?: string;
  prizePool?: string;
  venue?: string;
  badge?: string;
}

export const REGISTRATION_GATEWAY_EVENT = 'open-registration-gateway';

/**
 * Global utility to open the registration gateway modal from anywhere in the app.
 */
export function triggerRegistrationGateway(data: RegistrationGatewayData) {
  window.dispatchEvent(
    new CustomEvent<RegistrationGatewayData>(REGISTRATION_GATEWAY_EVENT, {
      detail: data,
    })
  );
}

const STAGES = [
  {
    pct: 22,
    status: 'INITIALIZING SECURE PROTOCOL...',
    detail: 'Connecting to DataDive 5.0 Registration Gateway',
    log: '[NET] TLS 1.3 handshake established • Endpoint authenticated',
  },
  {
    pct: 54,
    status: 'ALLOCATING PARTICIPANT MATRIX...',
    detail: 'Verifying entry criteria and slot availability',
    log: '[GATEWAY] Verifying event slot allocation & team quotas',
  },
  {
    pct: 82,
    status: 'SYNCHRONIZING OFFICIAL GOOGLE FORMS...',
    detail: 'Generating one-time secure session token',
    log: '[AUTH] Session token verified • Gateway routing locked',
  },
  {
    pct: 100,
    status: 'GATEWAY AUTHORIZED. LAUNCHING FORM...',
    detail: 'Redirecting to the official registration interface',
    log: '[DISPATCH] 200 OK — Launching official registration portal',
  },
];

export const RegistrationGatewayModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventData, setEventData] = useState<RegistrationGatewayData | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [sessionToken, setSessionToken] = useState('');

  const animTimerRef = useRef<number | null>(null);
  const audioTickThrottleRef = useRef<number>(0);

  // Listen for registration events across the site
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<RegistrationGatewayData>;
      if (customEvent.detail && customEvent.detail.url) {
        startGateway(customEvent.detail);
      }
    };

    window.addEventListener(REGISTRATION_GATEWAY_EVENT, handleTrigger);
    return () => {
      window.removeEventListener(REGISTRATION_GATEWAY_EVENT, handleTrigger);
    };
  }, []);

  const startGateway = (data: RegistrationGatewayData) => {
    // Generate pseudo-random session token
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const token = `DD5-ODYSSEY-${randomHex}`;
    setSessionToken(token);

    setEventData(data);
    setProgress(0);
    setStageIndex(0);
    setIsCompleted(false);
    setLogs([
      `[GATEWAY] Initializing portal for: ${data.title.toUpperCase()}`,
      `[TOKEN] Session ID: ${token}`,
    ]);
    setIsOpen(true);

    // Audio cue
    odysseyAudio.playChime(520, 'sine', 0.15);
  };

  const closeGateway = () => {
    if (animTimerRef.current) {
      clearInterval(animTimerRef.current);
      animTimerRef.current = null;
    }
    setIsOpen(false);
    setProgress(0);
    setIsCompleted(false);
  };

  // Run the progress animation
  useEffect(() => {
    if (!isOpen || isCompleted || !eventData) return;

    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds for high-tech, cinematic suspense

    animTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawPct);

      // Audio micro-tick every ~20%
      const now = Date.now();
      if (now - audioTickThrottleRef.current > 380) {
        audioTickThrottleRef.current = now;
        odysseyAudio.playFrameTick(480 + rawPct * 3);
      }

      // Stage tracking
      if (rawPct >= 85 && stageIndex < 3) {
        setStageIndex(3);
        setLogs((prev) => [...prev, STAGES[3].log]);
      } else if (rawPct >= 55 && stageIndex < 2) {
        setStageIndex(2);
        setLogs((prev) => [...prev, STAGES[2].log]);
      } else if (rawPct >= 25 && stageIndex < 1) {
        setStageIndex(1);
        setLogs((prev) => [...prev, STAGES[1].log]);
      }

      // Finished loading
      if (rawPct >= 100) {
        if (animTimerRef.current) {
          clearInterval(animTimerRef.current);
          animTimerRef.current = null;
        }

        setIsCompleted(true);
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] Official Registration Form Window Dispatched.`,
        ]);

        // Triumph chime
        odysseyAudio.playChime(660, 'triangle', 0.2);
        setTimeout(() => odysseyAudio.playChime(880, 'sine', 0.3), 150);

        // Open official registration form in new window
        window.open(eventData.url, '_blank', 'noopener,noreferrer');
      }
    }, 45);

    return () => {
      if (animTimerRef.current) {
        clearInterval(animTimerRef.current);
      }
    };
  }, [isOpen, isCompleted, eventData, stageIndex]);

  const handleSkipAndOpen = () => {
    if (!eventData) return;
    if (animTimerRef.current) {
      clearInterval(animTimerRef.current);
      animTimerRef.current = null;
    }
    setProgress(100);
    setStageIndex(3);
    setIsCompleted(true);
    setLogs((prev) => [...prev, `[USER_OVERRIDE] Instant launch executed.`]);
    odysseyAudio.playChime(880, 'sine', 0.25);
    window.open(eventData.url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectReopen = () => {
    if (!eventData) return;
    odysseyAudio.playFrameTick(600);
    window.open(eventData.url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen || !eventData) return null;

  const currentStage = STAGES[stageIndex] || STAGES[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeGateway();
      }}
    >
      {/* Sci-Fi Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative w-full max-w-xl bg-slate-950/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Glowing Ambient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]" />

        {/* Close Button */}
        <button
          onClick={closeGateway}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-amber-400/50 transition-colors"
          title="Close Gateway"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Secure Registration Gateway</span>
          </span>
          <span className="font-mono text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5">
            ID: <span className="text-amber-400/90">{sessionToken}</span>
          </span>
        </div>

        {/* Event Banner */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase mb-1">
                TARGET EVENT REGISTRATION
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-sans tracking-wide text-white flex items-center space-x-2">
                <span>{eventData.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono font-medium">
                  {eventData.category || 'DataDive 5.0'}
                </span>
              </h3>
            </div>
            {eventData.prizePool && (
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-mono text-slate-400">PRIZE POOL</div>
                <div className="text-sm font-mono font-bold text-amber-300">{eventData.prizePool}</div>
              </div>
            )}
          </div>
        </div>

        {/* ── CENTRAL ANIMATED HOLOGRAPHIC LOADER / RADAR ── */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center mb-5">
            {/* Outer Spinning Dashed Orbit */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed ${
                isCompleted ? 'border-emerald-500/60' : 'border-amber-500/50'
              } transition-colors duration-500`}
              style={{
                animation: isCompleted ? 'none' : 'spin 8s linear infinite',
              }}
            />

            {/* Inner Counter-Spinning Cyber Ring */}
            <div
              className={`absolute inset-2.5 rounded-full border border-dotted ${
                isCompleted ? 'border-emerald-400/80' : 'border-cyan-400/60'
              } transition-colors duration-500`}
              style={{
                animation: isCompleted ? 'none' : 'spin 4s linear infinite reverse',
              }}
            />

            {/* Pulsing Core Glow Behind Helm */}
            <div
              className={`absolute inset-6 rounded-full blur-xl opacity-75 transition-all duration-700 pointer-events-none ${
                isCompleted
                  ? 'bg-emerald-500 shadow-[0_0_50px_#10b981]'
                  : 'bg-amber-500 shadow-[0_0_50px_#f59e0b]'
              }`}
            />

            {/* ── SPARTAN HELM 360° ROTATION NODE ── */}
            <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <div
                className={`relative w-full h-full rounded-full overflow-hidden p-1 bg-black border-2 transition-all duration-500 flex items-center justify-center ${
                  isCompleted
                    ? 'border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.8)] scale-105'
                    : 'border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.6)]'
                }`}
              >
                {/* 360° Rotating Spartan Helmet */}
                <div
                  className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                    !isCompleted ? 'animate-helm-3d-spin' : 'transition-transform duration-500'
                  }`}
                >
                  <img
                    src={odysseyCyberHelm}
                    alt="DataDive Odyssey Helm"
                    className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                  />
                </div>

                {/* Cyber Holographic Scanning Sweep */}
                {!isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent pointer-events-none animate-pulse rounded-full" />
                )}

                {/* Ready Checkmark Overlay on Completion */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[2px] rounded-full flex flex-col items-center justify-center animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_12px_#10b981]" />
                    <span className="text-[10px] font-mono font-black tracking-widest text-emerald-200 mt-1">
                      READY
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Percentage HUD Pill */}
              {!isCompleted && (
                <div className="absolute -bottom-2.5 z-20 px-3 py-0.5 rounded-full bg-slate-950/95 border border-amber-400/80 text-amber-300 text-[11px] font-mono font-black tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.6)] flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>{progress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Status Text */}
          <div className="text-center px-4">
            <div
              className={`font-mono text-sm sm:text-base font-bold tracking-wider transition-colors duration-300 ${
                isCompleted ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {isCompleted ? 'OFFICIAL REGISTRATION PORTAL READY' : currentStage.status}
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              {isCompleted
                ? 'Official Google Form launched in a new tab. Complete your details to secure your spot.'
                : currentStage.detail}
            </p>
          </div>
        </div>

        {/* ── HIGH-TECH PROGRESS BAR ── */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>HANDSHAKE PROGRESS</span>
            </span>
            <span className="font-bold text-slate-200">{progress}%</span>
          </div>

          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className={`h-full rounded-full transition-all duration-150 relative ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 shadow-[0_0_12px_#10b981]'
                  : 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_12px_#f59e0b]'
              }`}
              style={{ width: `${progress}%` }}
            >
              {/* Scanline light streak moving across the bar */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* ── CYBER TELEMETRY TERMINAL READOUT ── */}
        <div className="mt-5 rounded-xl bg-black/70 border border-white/10 p-3 font-mono text-[11px] text-slate-300 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2 text-[10px] text-slate-500">
            <span className="flex items-center space-x-1">
              <Terminal className="w-3 h-3 text-amber-400/80" />
              <span>GATEWAY_TELEMETRY.LOG</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400">LIVE</span>
            </span>
          </div>
          <div className="space-y-1 max-h-20 overflow-y-auto pr-1 select-text">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`transition-opacity duration-200 ${
                  idx === logs.length - 1
                    ? 'text-amber-300 font-medium'
                    : 'text-slate-400/80'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* ── MODAL ACTIONS & FALLBACKS ── */}
        <div className="mt-6 pt-2 flex flex-col sm:flex-row gap-3">
          {isCompleted ? (
            <>
              <button
                type="button"
                onClick={handleDirectReopen}
                className="flex-1 py-3.5 px-6 rounded-xl font-mono text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black text-center flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>OPEN FORM DIRECTLY</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={closeGateway}
                className="py-3.5 px-6 rounded-xl font-mono text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                Done
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSkipAndOpen}
                className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-center flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Skip Animation & Open Now</span>
              </button>
              <button
                type="button"
                onClick={closeGateway}
                className="py-3 px-5 rounded-xl font-mono text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {isCompleted && (
          <p className="text-center font-mono text-[11px] text-slate-500 mt-3">
            Pop-up didn't open? Tap <span className="text-amber-400 font-semibold cursor-pointer underline" onClick={handleDirectReopen}>Open Form Directly</span> above.
          </p>
        )}
      </div>
    </div>
  );
};
