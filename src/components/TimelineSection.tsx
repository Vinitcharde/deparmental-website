import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Trophy,
  ChevronRight,
  ExternalLink,
  X,
  CheckCircle2,
  Users,
  Copy,
  Check,
  Maximize2,
} from 'lucide-react';
import { EVENTS, EventItem } from '../data/eventsData';
import { odysseyAudio } from '../utils/audioSynth';

// Map event IDs to their schedule slots
const EVENT_SCHEDULE: Record<string, { time: string; location: string; act: string; category: string }> = {
  dataverse: {
    act: 'ACT I',
    time: '11:30 AM – 01:00 PM',
    location: 'Data Science Computing Suites',
    category: 'Data Science & Machine Learning',
  },
  vizminds: {
    act: 'ACT II',
    time: '01:45 PM – 03:30 PM',
    location: 'Data Lab 3 & Visual Studio',
    category: 'Visual Intelligence & BI Analytics',
  },
  'founders-gone-wild': {
    act: 'ACT III',
    time: '02:00 PM – 04:00 PM',
    location: 'Innovation Hub & Pitch Deck Studio',
    category: 'Entrepreneurship & Innovation',
  },
  'game-of-bids': {
    act: 'ACT IV',
    time: '03:30 PM – 05:15 PM',
    location: 'Seminar Hall B – Auction Floor',
    category: 'Sports, E-Gaming & Strategy',
  },
  'survival-showdown': {
    act: 'ACT V',
    time: '02:00 PM – 04:30 PM',
    location: 'The Colosseum Arena (Gaming Lab)',
    category: 'Sports & Gaming Tournament',
  },
};

type TimelineEvent = Omit<EventItem, 'category'> & { time: string; location: string; act: string; category: string };

/* ─────────────────────────── EVENT DETAIL MODAL ─────────────────────────── */
const EventDetailModal: React.FC<{
  event: TimelineEvent;
  onClose: () => void;
}> = ({ event, onClose }) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<{
    src: string;
    name: string;
    role: string;
    phone: string;
  } | null>(null);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPoster) {
          setSelectedPoster(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, onClose]);

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    odysseyAudio.playChime(660, 'sine', 0.15);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-500/10 my-8 overflow-hidden">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10 hover:border-white/30 transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable body */}
        <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* ── Header: Category badge + date ── */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${event.color.badgeBg}`}>
              {event.categoryLabel}
            </span>
            <span className="text-xs font-mono text-slate-400">Date: {event.date}</span>
          </div>

          {/* ── Title + Subtitle ── */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-odyssey text-white mb-1 leading-tight">
              {event.title}
            </h3>
            <p className={`font-mono text-sm ${event.color.textAccent}`}>{event.subtitle}</p>
          </div>

          {/* ── Description ── */}
          <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>

          {/* ── Pre-Event Workshop (if available) ── */}
          {event.workshopInfo && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
              <div className="font-bold font-mono uppercase text-[11px] tracking-widest mb-1.5 text-cyan-400">
                Pre-Event Hands-On Workshop:
              </div>
              <p className="text-sm leading-relaxed">{event.workshopInfo}</p>
            </div>
          )}

          {/* ── Tournament Format (if available) ── */}
          {event.format && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200">
              <div className="font-bold font-mono uppercase text-[11px] tracking-widest mb-1.5 text-red-400">
                Tournament Structure:
              </div>
              <p className="text-sm leading-relaxed">{event.format}</p>
            </div>
          )}

          {/* ── Why Participate ── */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold uppercase text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Why Participate in This Arena?</span>
            </div>
            <ul className="space-y-2">
              {event.whyJoin.map((w, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Takeaways (if available) ── */}
          {event.takeaways && (
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold uppercase text-emerald-400">What You Take Away:</div>
              <ul className="space-y-2">
                {event.takeaways.map((t, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── REGISTRATION TIERS ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono text-xs font-bold uppercase text-slate-300">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Registration Tiers</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Certificates for all</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {event.pricing.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center hover:border-amber-500/30 transition-colors"
                >
                  <div className={`text-[11px] font-mono mb-1 ${event.color.textAccent}`}>{tier.type}</div>
                  <div className="text-2xl font-black font-mono text-white">₹{tier.price}</div>
                </div>
              ))}
            </div>

            {/* Prize pool highlight */}
            <div className="flex items-center justify-center space-x-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-bold text-amber-300 text-sm">
                Prize Pool: <span className="text-amber-400">{event.prizePool}</span>
              </span>
            </div>
          </div>

          {/* ── EVENT COORDINATORS ── */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Event Coordinators:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.coordinators.map((c, idx) => (
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
                  className={`group flex items-center justify-between p-3.5 rounded-2xl bg-black/50 border border-white/8 transition-all relative ${
                    c.image
                      ? 'cursor-pointer hover:border-amber-400/60 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-amber-500/10'
                      : ''
                  }`}
                  title={c.image ? `Click to view full poster of ${c.name}` : undefined}
                >
                  <div className="flex items-center space-x-3">
                    {c.image && (
                      <div className="relative flex-shrink-0">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover object-top border border-amber-400/40 shadow-md group-hover:scale-105 group-hover:border-amber-400 transition-all"
                        />
                        <div className="absolute inset-0 rounded-xl bg-amber-400/0 group-hover:bg-amber-400/15 transition-colors flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-sm text-slate-200 group-hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                        <span>{c.name}</span>
                        {c.image && (
                          <span className="text-[10px] text-amber-400/70 font-mono font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                            (View Poster)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-amber-400">{c.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[11px] font-mono text-slate-300 tracking-wider">{c.phone}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyPhone(c.phone);
                      }}
                      className={`p-1.5 rounded-lg transition-all flex items-center space-x-1 text-[10px] font-mono ${
                        copiedPhone === c.phone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10'
                      }`}
                      title="Copy Phone Number"
                      aria-label={`Copy ${c.name}'s phone number`}
                    >
                      {copiedPhone === c.phone ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-6 rounded-xl font-mono text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black text-center flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/30 transition-all"
            >
              <span>Open Official Registration Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="py-3.5 px-6 rounded-xl font-mono text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-white/20 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>

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
                onClick={() => copyPhone(selectedPoster.phone)}
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
    </div>
  );
};

/* ─────────────────────────── MAIN SECTION ─────────────────────────── */
export const TimelineSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const eventOrder = ['dataverse', 'vizminds', 'founders-gone-wild', 'game-of-bids', 'survival-showdown'];
  const timelineEvents: TimelineEvent[] = eventOrder.map((id) => {
    const evt = EVENTS.find((e) => e.id === id)!;
    const sched = EVENT_SCHEDULE[id];
    return { ...evt, ...sched };
  });

  const openModal = (evt: TimelineEvent) => {
    setSelectedEvent(evt);
    odysseyAudio.playFrameTick(500);
  };

  return (
    <>
      <section id="schedule" className="py-24 bg-[#05070B] border-t border-white/5 relative overflow-hidden scroll-mt-20">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/4 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/4 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-5">
              <Clock className="w-3.5 h-3.5" />
              <span>SEPTEMBER 10, 2026 — SYMPOSIUM SCHEDULE &amp; TIMELINE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-odyssey text-white tracking-wide mb-5">
              CHRONOLOGY OF THE ODYSSEY
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Mark your calendars. A seamless, adrenaline-fueled single-day expedition scheduled to test your intellect,
              strategy, and reflexes across 5 legendary arenas.
            </p>
          </div>

          {/* Alternating Timeline */}
          <div className="relative">

            {/* Central vertical line — desktop only */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />

            <div className="space-y-16 lg:space-y-24">
              {timelineEvents.map((evt, index) => {
                const isEven = index % 2 === 0;
                const numLabel = String(index + 1).padStart(2, '0');

                return (
                  <div key={evt.id} id={`timeline-event-${evt.id}`} className="relative scroll-mt-28">

                    {/* Center node — desktop */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 items-center justify-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-black font-mono text-lg border-2 bg-slate-950 border-amber-400/70 text-amber-300 shadow-xl shadow-amber-500/30"
                      >
                        {numLabel}
                      </div>
                    </div>

                    {/* Row: content + image alternating */}
                    <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                      {/* ── CONTENT SIDE ── */}
                      <div className={`w-full lg:w-[calc(50%-3.5rem)] ${isEven ? 'lg:pr-10' : 'lg:pl-10'}`}>
                        <div className="group relative bg-slate-950/80 border border-white/10 hover:border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:shadow-amber-500/10">
                          {/* Subtle radial glow on hover */}
                          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at top left, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />

                          {/* Act + category badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${evt.color.badgeBg}`}>
                              {evt.act}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono text-slate-400 bg-slate-900/80 border border-white/10">
                              {evt.category}
                            </span>
                            {/* Mobile only number */}
                            <span className="lg:hidden ml-auto px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              {numLabel}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl sm:text-3xl font-extrabold font-odyssey text-white group-hover:text-amber-300 transition-colors mb-1 leading-tight">
                            {evt.title}
                          </h3>

                          {/* Subtitle */}
                          <p className="text-amber-400/80 font-mono text-xs mb-4">{evt.subtitle}</p>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-3 mb-4 text-[11px] font-mono text-slate-400">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              <span>{evt.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span>{evt.location}</span>
                            </span>
                          </div>

                          {/* Description preview */}
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                            {evt.description}
                          </p>

                          {/* Prize + CTA */}
                          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/8">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-amber-400" />
                              <span className="font-mono font-bold text-white text-sm">{evt.prizePool}</span>
                            </div>
                            {/* ── Button now opens modal ── */}
                            <button
                              onClick={() => openModal(evt)}
                              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 hover:border-amber-400 transition-all duration-200 group/btn"
                            >
                              <span>Examine Details &amp; Rules</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ── SPACER for center node ── */}
                      <div className="hidden lg:block w-28 flex-shrink-0" />

                      {/* ── IMAGE SIDE ── */}
                      <div className={`w-full lg:w-[calc(50%-3.5rem)] ${isEven ? 'lg:pl-10' : 'lg:pr-10'}`}>
                        <div
                          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] cursor-pointer"
                          onClick={() => openModal(evt)}
                          title="Click to view details"
                        >
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Bottom label */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">
                              {evt.mythologicalArchetype}
                            </div>
                            <div className={`text-sm font-bold font-mono ${evt.color.textAccent}`}>
                              {evt.categoryLabel}
                            </div>
                          </div>

                          {/* Hover overlay hint */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[1px]">
                            <span className="px-4 py-2 rounded-full bg-amber-500/90 text-black font-mono font-bold text-xs">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile divider */}
                    {index < timelineEvents.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-8">
                        <div className="w-[2px] h-10 bg-gradient-to-b from-amber-500/50 to-transparent" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom finale block */}
            <div className="relative mt-20 lg:mt-24 flex justify-center">
              <div className="text-center max-w-lg bg-slate-950/80 border border-amber-500/30 rounded-3xl p-8 shadow-2xl shadow-amber-500/10">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                  <Trophy className="w-8 h-8 text-black" />
                </div>
                <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-2">
                  05:30 PM – 06:30 PM • Main Auditorium
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-odyssey text-white mb-2">
                  Grand Valedictory &amp; Prize Distribution
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Honoring the champions of each arena with ₹15,000+ in cash prizes and verified certificates of
                  participation for all attendees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Detail Modal ── */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
};
