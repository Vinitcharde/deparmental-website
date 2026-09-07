import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Users,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  X,
  Maximize2,
} from 'lucide-react';
import { EVENTS, EventItem } from '../data/eventsData';
import { odysseyAudio } from '../utils/audioSynth';
import { triggerRegistrationGateway } from './RegistrationGatewayModal';

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'data' | 'gaming' | 'strategy' | 'startup'>('all');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<{
    src: string;
    name: string;
    role: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPoster) {
          setSelectedPoster(null);
        } else if (selectedEventModal) {
          setSelectedEventModal(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, selectedEventModal]);

  const filteredEvents =
    activeCategory === 'all'
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    odysseyAudio.playChime(660, 'sine', 0.15);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <section id="events-hub" className="py-24 bg-[#07090E] relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 5 SACRED ODYSSEY ARENAS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-odyssey text-white tracking-wide mb-4">
            FLAGSHIP EVENT ARENAS
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Choose your arena, assemble your vanguard, and claim your share of the ₹15,000 prize pool. All participants receive verified certificates of participation.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-8">
            {[
              { id: 'all', label: 'All 5 Arenas' },
              { id: 'data', label: 'Data & Analytics (2)' },
              { id: 'startup', label: 'Founders Gone Wild (1)' },
              { id: 'gaming', label: 'WWE 2K26 Esports (1)' },
              { id: 'strategy', label: 'IPL Auction (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  odysseyAudio.playFrameTick(500);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                  activeCategory === tab.id
                    ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/30'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              id={`event-card-${evt.id}`}
              className="group relative flex flex-col bg-slate-950/80 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Top Image Banner with 3D Custom Logo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-slate-900 to-black">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md ${evt.color.badgeBg}`}>
                    {evt.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
                    10 Sept 2026
                  </span>
                </div>

                {/* Prize Pool Floating Badge */}
                <div className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur-md text-black px-3.5 py-1.5 rounded-full text-xs font-mono font-black shadow-lg flex items-center space-x-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>PRIZE: {evt.prizePool}</span>
                </div>

                {/* Title & Subtitle overlayed at bottom of image */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                    {evt.mythologicalArchetype}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-odyssey text-white">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
                    {evt.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {evt.description}
                </p>

                {/* Why Participate highlights */}
                <div className="space-y-2 bg-slate-900/60 rounded-2xl p-4 border border-white/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Arena Highlights</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evt.whyJoin.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {evt.whyJoin.length > 3 && (
                    <button
                      onClick={() => setSelectedEventModal(evt)}
                      className="text-[11px] font-mono text-amber-400 hover:underline pt-1 block"
                    >
                      + View all {evt.whyJoin.length} benefits & details
                    </button>
                  )}
                </div>

                {/* Entry Fees Selector */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Registration Tiers</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans">
                      Certificates for all
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {evt.pricing.map((tier, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-center"
                      >
                        <div className="text-[11px] text-slate-400 font-mono">{tier.type}</div>
                        <div className="text-lg font-bold text-white font-mono">₹{tier.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coordinators Contact Bar */}
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Event Coordinators:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {evt.coordinators.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (c.image) {
                            setSelectedPoster({
                              src: c.image,
                              name: c.name,
                              role: c.role,
                              phone: c.phone,
                            });
                            odysseyAudio.playFrameTick(500);
                          }
                        }}
                        className={`group flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 transition-all relative ${
                          c.image
                            ? 'cursor-pointer hover:border-amber-400/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-amber-500/10'
                            : ''
                        }`}
                        title={c.image ? `Click to view full poster of ${c.name}` : undefined}
                      >
                        <div className="flex items-center space-x-2.5">
                          {c.image && (
                            <div className="relative flex-shrink-0">
                              <img
                                src={c.image}
                                alt={c.name}
                                className="w-9 h-9 rounded-lg object-cover object-top border border-amber-400/40 shadow-sm group-hover:scale-105 group-hover:border-amber-400 transition-all"
                              />
                              <div className="absolute inset-0 rounded-lg bg-amber-400/0 group-hover:bg-amber-400/15 transition-colors flex items-center justify-center">
                                <Maximize2 className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity" />
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center space-x-1">
                              <span>{c.name}</span>
                              {c.image && (
                                <span className="text-[9px] text-amber-400/70 font-mono font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                                  (Poster)
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-amber-400/90">{c.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[11px] font-mono text-slate-300">{c.phone}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(c.phone);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1"
                            title="Copy Phone Number"
                            aria-label={`Copy ${c.name}'s phone number`}
                          >
                            {copiedPhone === c.phone ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      triggerRegistrationGateway({
                        url: evt.registerUrl,
                        title: evt.title,
                        category: evt.categoryLabel || evt.category,
                        prizePool: evt.prizePool,
                      });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer group"
                  >
                    <span>REGISTER NOW</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setSelectedEventModal(evt)}
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-mono bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/30 transition-all"
                  >
                    Details & Rules
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${selectedEventModal.color.badgeBg}`}>
                {selectedEventModal.categoryLabel}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Date: {selectedEventModal.date}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-odyssey text-white mb-2">
              {selectedEventModal.title}
            </h3>
            <p className="text-amber-400 font-mono text-sm mb-4">
              {selectedEventModal.subtitle}
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 mb-6">
              <p>{selectedEventModal.description}</p>

              {selectedEventModal.workshopInfo && (
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                  <div className="font-bold font-mono uppercase text-[11px] mb-1">
                    Pre-Event Hands-On Workshop:
                  </div>
                  <div>{selectedEventModal.workshopInfo}</div>
                </div>
              )}

              {selectedEventModal.format && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200">
                  <div className="font-bold font-mono uppercase text-[11px] mb-1">
                    Tournament Structure:
                  </div>
                  <div>{selectedEventModal.format}</div>
                </div>
              )}

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase text-amber-400">
                  Why Participate in This Arena?
                </div>
                <ul className="space-y-1.5">
                  {selectedEventModal.whyJoin.map((w, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedEventModal.takeaways && (
                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold uppercase text-emerald-400">
                    What You Take Away:
                  </div>
                  <ul className="space-y-1.5">
                    {selectedEventModal.takeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
                <div className="font-mono text-xs text-slate-400">ENTRY FEES & PRIZES:</div>
                <div className="flex flex-wrap gap-3 font-mono">
                  {selectedEventModal.pricing.map((p, i) => (
                    <span key={i} className="px-3 py-1 rounded bg-black/60 border border-white/10 text-white">
                      {p.type}: <strong className="text-amber-400">₹{p.price}</strong>
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded bg-amber-500/20 border border-amber-400 text-amber-300 font-bold">
                    Prize Pool: {selectedEventModal.prizePool}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  triggerRegistrationGateway({
                    url: selectedEventModal.registerUrl,
                    title: selectedEventModal.title,
                    category: selectedEventModal.categoryLabel || selectedEventModal.category,
                    prizePool: selectedEventModal.prizePool,
                  });
                }}
                className="flex-1 py-3 px-6 rounded-xl font-mono text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black text-center flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/30 cursor-pointer group"
              >
                <span>OPEN OFFICIAL REGISTRATION FORM</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="py-3 px-6 rounded-xl font-mono text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Image 2 Poster Zoom Lightbox Modal ── */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPoster(null);
          }}
        >
          <div className="relative max-w-md w-full bg-slate-950 border border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 my-auto animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-slate-300 hover:text-white border border-white/20 hover:border-amber-400/50 transition-colors"
              aria-label="Close poster modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Image */}
            <div className="p-3 bg-slate-900 flex items-center justify-center">
              <img
                src={selectedPoster.src}
                alt={selectedPoster.name}
                className="w-full max-h-[72vh] object-contain rounded-2xl"
              />
            </div>

            {/* Footer Bar */}
            <div className="p-5 flex items-center justify-between bg-slate-950 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block mb-1">
                  {selectedPoster.role}
                </span>
                <h4 className="text-xl font-bold font-odyssey text-white">
                  {selectedPoster.name}
                </h4>
              </div>

              <button
                onClick={() => copyToClipboard(selectedPoster.phone)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-mono text-xs font-bold hover:brightness-110 flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                {copiedPhone === selectedPoster.phone ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{selectedPoster.phone}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
