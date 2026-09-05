import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  X,
  Phone,
  ShieldCheck,
  Layers,
  Play,
  Pause,
} from 'lucide-react';
import { FEST_DATA } from '../data/eventsData';
import { odysseyAudio } from '../utils/audioSynth';
import snehaPoster from '../assets/images/coordinator_sneha_agrawal.png';
import ananyaPoster from '../assets/images/coordinator_ananya_pathak.png';
import vedangPoster from '../assets/images/coordinator_vedang_pathak.png';
import atharvaPoster from '../assets/images/coordinator_atharva_andhare.png';
import alanPoster from '../assets/images/coordinator_alan_biju.png';
import fallgoonPoster from '../assets/images/coordinator_fallgoon.png';
import manthanPoster from '../assets/images/coordinator_manthan_udasi.png';
import vedPoster from '../assets/images/coordinator_ved_nair.png';
import sarthakPoster from '../assets/images/coordinator_sarthak_pande.png';
import stephenPoster from '../assets/images/coordinator_stephen_dhanvajir.png';
import kelvinPoster from '../assets/images/lead_kelvin_cherian.png';
import umangPoster from '../assets/images/lead_umang_tagde.png';
import aryanPoster from '../assets/images/lead_aryan_paul.png';
import asawariPoster from '../assets/images/lead_asawari_fuse.png';
import yashPoster from '../assets/images/core_yash_gupta.png';
import harshalPoster from '../assets/images/core_harshal_lokhande.png';
import mrunalPoster from '../assets/images/core_mrunal_patil.png';
import eshitaPoster from '../assets/images/core_eshita_fender.png';
import vinitPoster from '../assets/images/core_vinit_charde.png';

export const TeamSection: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<{
    src: string;
    name: string;
    role: string;
    phone: string;
  } | null>(null);

  const [activeLeadIndex, setActiveLeadIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isAutoSwapPaused, setIsAutoSwapPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [autoSwapKey, setAutoSwapKey] = useState(0);

  const leadMarshals = [
    {
      id: 'kelvin',
      name: 'Kelvin Cherian',
      role: 'Lead Mentor',
      badge: 'LEAD MENTOR',
      subtitle: 'DataDive 5.0 • Department of CSE (Data Science)',
      image: kelvinPoster,
      phone: 'Lead Council Desk',
      color: 'border-amber-500/40 text-amber-300',
      badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
      glow: 'shadow-amber-500/10',
      btnStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      id: 'umang',
      name: 'Umang Tagde',
      role: 'Lead Coordinator',
      badge: 'LEAD COORDINATOR',
      subtitle: 'DataDive 5.0 • Department of CSE (Data Science)',
      image: umangPoster,
      phone: 'Lead Council Desk',
      color: 'border-cyan-500/40 text-cyan-300',
      badgeBg: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
      glow: 'shadow-cyan-500/10',
      btnStyle: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      id: 'aryan',
      name: 'Aryan Paul',
      role: 'Lead Coordinator',
      badge: 'LEAD COORDINATOR',
      subtitle: 'DataDive 5.0 • Department of CSE (Data Science)',
      image: aryanPoster,
      phone: 'Lead Council Desk',
      color: 'border-indigo-500/40 text-indigo-300',
      badgeBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
      glow: 'shadow-indigo-500/10',
      btnStyle: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    {
      id: 'asawari',
      name: 'Asawari Fuse',
      role: 'Lead Co-coordinator',
      badge: 'LEAD CO-COORDINATOR',
      subtitle: 'DataDive 5.0 • Department of CSE (Data Science)',
      image: asawariPoster,
      phone: 'Lead Council Desk',
      color: 'border-rose-500/40 text-rose-300',
      badgeBg: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      glow: 'shadow-rose-500/10',
      btnStyle: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
  ];

  const coreTeamHeads = [
    {
      id: 'vinit',
      name: 'Vinit Charde',
      role: 'Technical Head',
      badge: 'TECHNICAL HEAD',
      wing: 'Technical Operations Wing',
      image: vinitPoster,
      color: 'border-cyan-500/40 text-cyan-300',
      badgeBg: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
      glow: 'shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-400',
      btnStyle: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
      posterGlow: 'group-hover:shadow-cyan-500/20',
      viewBadgeBorder: 'border-cyan-500/40',
      viewBadgeText: 'text-cyan-300',
      viewBadgeHover: 'group-hover:border-cyan-400',
    },
    {
      id: 'eshita',
      name: 'Eshita Fender',
      role: 'Registration Head',
      badge: 'REGISTRATION HEAD',
      wing: 'Registration Desk Wing',
      image: eshitaPoster,
      color: 'border-amber-500/40 text-amber-300',
      badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
      glow: 'shadow-amber-500/10 hover:shadow-amber-500/20 hover:border-amber-400',
      btnStyle: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30',
      posterGlow: 'group-hover:shadow-amber-500/20',
      viewBadgeBorder: 'border-amber-500/40',
      viewBadgeText: 'text-amber-300',
      viewBadgeHover: 'group-hover:border-amber-400',
    },
    {
      id: 'yash',
      name: 'Yash Gupta',
      role: 'Media Head',
      badge: 'MEDIA HEAD',
      wing: 'Media & Production Wing',
      image: yashPoster,
      color: 'border-rose-500/40 text-rose-300',
      badgeBg: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      glow: 'shadow-rose-500/10 hover:shadow-rose-500/20 hover:border-rose-400',
      btnStyle: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30',
      posterGlow: 'group-hover:shadow-rose-500/20',
      viewBadgeBorder: 'border-rose-500/40',
      viewBadgeText: 'text-rose-300',
      viewBadgeHover: 'group-hover:border-rose-400',
    },
    {
      id: 'harshal',
      name: 'Harshal Lokhande',
      role: 'Documentation Head',
      badge: 'DOCUMENTATION HEAD',
      wing: 'Records & Documentation Wing',
      image: harshalPoster,
      color: 'border-indigo-500/40 text-indigo-300',
      badgeBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
      glow: 'shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:border-indigo-400',
      btnStyle: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
      posterGlow: 'group-hover:shadow-indigo-500/20',
      viewBadgeBorder: 'border-indigo-500/40',
      viewBadgeText: 'text-indigo-300',
      viewBadgeHover: 'group-hover:border-indigo-400',
    },
    {
      id: 'mrunal',
      name: 'Mrunal Patil',
      role: 'Decoration Head',
      badge: 'DECORATION HEAD',
      wing: 'Aesthetics & Decoration Wing',
      image: mrunalPoster,
      color: 'border-purple-500/40 text-purple-300',
      badgeBg: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
      glow: 'shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-400',
      btnStyle: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30',
      posterGlow: 'group-hover:shadow-purple-500/20',
      viewBadgeBorder: 'border-purple-500/40',
      viewBadgeText: 'text-purple-300',
      viewBadgeHover: 'group-hover:border-purple-400',
    },
  ];

  // Automatic card swapping every 7 seconds (pauses on hover, pause toggle, or when lightbox is open)
  useEffect(() => {
    if (isAutoSwapPaused || isHovered || selectedPoster !== null) return;
    const interval = setInterval(() => {
      setActiveLeadIndex((prev) => (prev + 1) % leadMarshals.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoSwapPaused, isHovered, selectedPoster, leadMarshals.length, autoSwapKey]);

  // Reset sweeping sequence to Lead Mentor Kelvin Cherian (index 0) whenever Coordinators in ribbon is clicked
  useEffect(() => {
    const handleResetToMentor = () => {
      setActiveLeadIndex(0);
      setAutoSwapKey((prev) => prev + 1);
      setIsAutoSwapPaused(false);
      setIsHovered(false);
    };

    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#contact-lead-team') {
        handleResetToMentor();
      }
    };

    window.addEventListener('reset-lead-swapper', handleResetToMentor);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('reset-lead-swapper', handleResetToMentor);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Manual card swapping handlers (resets the 4s auto-swap timer)
  const handleNextLead = () => {
    setActiveLeadIndex((prev) => (prev + 1) % leadMarshals.length);
    setAutoSwapKey((prev) => prev + 1);
    odysseyAudio.playFrameTick(550);
  };

  const handlePrevLead = () => {
    setActiveLeadIndex((prev) => (prev - 1 + leadMarshals.length) % leadMarshals.length);
    setAutoSwapKey((prev) => prev + 1);
    odysseyAudio.playFrameTick(480);
  };

  const handleSelectLead = (idx: number) => {
    setActiveLeadIndex(idx);
    setAutoSwapKey((prev) => prev + 1);
    odysseyAudio.playFrameTick(500);
  };

  const faqs = [
    {
      q: 'Do I need prior coding experience to join DataVerse 5.0, VizMinds 3.0, or Founders Gone Wild?',
      a: 'No prior coding experience is required! All events are beginner-friendly. Founders Gone Wild lets you combine wild ideas and use AI tools, while DataVerse and VizMinds focus on logic, data cleaning, and dashboards.',
    },
    {
      q: 'Will everyone receive a certificate of participation?',
      a: 'Yes, 100%! Every registered participant in all 5 events (DataVerse, VizMinds, Survival Showdown, Game of Bids, and Founders Gone Wild) receives an official verified Certificate of Participation issued by the Department of CSE (Data Science).',
    },
    {
      q: 'Can I participate in multiple events?',
      a: 'Yes! The schedule on 10th September 2026 has been carefully structured to minimize venue clashes between morning data arenas and afternoon strategy, startup, and gaming tournaments.',
    },
    {
      q: 'How do team registrations work?',
      a: 'Depending on the event, you can register as Solo, Duo, Trio, or 3-5 member teams (or a 2-4 member table for Game of Bids). The team representative simply fills out the official Google Form and enters the teammate details.',
    },
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    odysseyAudio.playChime(700, 'sine', 0.2);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <section id="contact-lead-team" className="py-24 bg-[#070A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>COMMAND HIERARCHY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-odyssey text-white tracking-wide mb-4">
            LEAD TEAM & COORDINATORS
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Organized with pride by the <strong className="text-amber-300">{FEST_DATA.department}</strong>. Reach out directly to any event coordinator with queries regarding rules, kits, or team entries.
          </p>
        </div>

        {/* ── Apex Leadership Swappable Showcase (Kelvin Cherian, Umang Tagde, Aryan Paul, Asawari Fuse) ── */}
        <div className="mb-24">
          {/* Center Card Swapper Area (Hovering pauses auto-swap) */}
          <div
            className="relative max-w-md mx-auto px-4 sm:px-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Auto-Swap Timing Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                key={`${activeLeadIndex}-${autoSwapKey}-${isAutoSwapPaused || isHovered}`}
                className={`h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full ${
                  !isAutoSwapPaused && !isHovered && selectedPoster === null ? 'animate-lead-progress' : 'w-full opacity-30'
                }`}
              />
            </div>

            {/* Left Prev Arrow Button (Manual Swapping) */}
            <button
              onClick={handlePrevLead}
              className="absolute -left-4 sm:-left-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-slate-800 hover:border-amber-400 transition-all flex items-center justify-center shadow-xl shadow-black/60 hover:scale-110 active:scale-95"
              aria-label="Previous Leader Card"
              title="Previous Leader (Manual Swap)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Next Arrow Button (Manual Swapping) */}
            <button
              onClick={handleNextLead}
              className="absolute -right-4 sm:-right-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-slate-800 hover:border-amber-400 transition-all flex items-center justify-center shadow-xl shadow-black/60 hover:scale-110 active:scale-95"
              aria-label="Next Leader Card"
              title="Next Leader (Manual Swap)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Card Deck Layers (Realistic 3D Stack Effect) */}
            <div className="relative">
              {/* Stack Backdrop 2 */}
              <div className="absolute inset-0 translate-y-4 scale-[0.92] rounded-3xl bg-slate-950/60 border border-white/5 pointer-events-none -z-20 transition-all duration-300" />
              {/* Stack Backdrop 1 */}
              <div className="absolute inset-0 translate-y-2 scale-[0.96] rounded-3xl bg-slate-900/70 border border-white/10 pointer-events-none -z-10 transition-all duration-300" />

              {/* Active Foreground Card (Exactly matching Image 1 format) */}
              {(() => {
                const currentLeader = leadMarshals[activeLeadIndex];
                return (
                  <div
                    key={currentLeader.id}
                    onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                      if (touchStartX === null) return;
                      const diff = touchStartX - e.changedTouches[0].clientX;
                      if (diff > 40) handleNextLead();
                      if (diff < -40) handlePrevLead();
                      setTouchStartX(null);
                    }}
                    className={`group relative rounded-3xl bg-slate-950/95 border ${currentLeader.color} p-5 shadow-2xl ${currentLeader.glow} transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      {/* High-res uncropped poster */}
                      <div
                        onClick={() => {
                          setSelectedPoster({
                            src: currentLeader.image,
                            name: currentLeader.name,
                            role: currentLeader.role,
                            phone: currentLeader.phone,
                          });
                          odysseyAudio.playFrameTick(500);
                        }}
                        className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer bg-[#eae5dc]"
                      >
                        <img
                          src={currentLeader.image}
                          alt={`${currentLeader.name} - ${currentLeader.role}`}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-mono text-amber-300 flex items-center space-x-1.5 shadow-lg group-hover:border-amber-400 transition-colors">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Full Poster</span>
                        </div>
                      </div>

                      {/* Content Section below poster matching Image 1 */}
                      <div className="mt-5">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${currentLeader.badgeBg}`}>
                            {currentLeader.badge}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            0{activeLeadIndex + 1} / 0{leadMarshals.length}
                          </span>
                          {isHovered && !isAutoSwapPaused && (
                            <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              Paused on Hover
                            </span>
                          )}
                        </div>
                        <h4 className="text-2xl font-bold font-odyssey text-white mt-2 tracking-wide">
                          {currentLeader.name}
                        </h4>
                        <p className="text-xs font-mono text-slate-400 mt-1">
                          {currentLeader.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Bottom action row */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold tracking-wider">Apex Lead Council</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPoster({
                            src: currentLeader.image,
                            name: currentLeader.name,
                            role: currentLeader.role,
                            phone: currentLeader.phone,
                          });
                          odysseyAudio.playFrameTick(500);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${currentLeader.btnStyle}`}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Full Poster</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bottom Controls & Swapping Indicators (Manual Swapping) */}
            <div className="flex items-center justify-between mt-5 px-1">
              <button
                onClick={handlePrevLead}
                className="text-xs font-mono text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
                title="Previous Leader (Manual)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Leader</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center space-x-2">
                {leadMarshals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectLead(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      activeLeadIndex === idx
                        ? 'w-6 h-2 bg-amber-400 shadow-md shadow-amber-400/50'
                        : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    title={`Swap to 0${idx + 1} • ${leadMarshals[idx].name}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextLead}
                className="text-xs font-mono text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
                title="Next Leader (Manual)"
              >
                <span>Next Leader</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Featured Arena 01 Coordinators Showcase (Image 2 & Image 3) ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARENA 01 • DATAVERSE 5.0 LEADERSHIP</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Event Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Official posters and coordinator command vanguard for DataVerse 5.0 at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sneha Agrawal Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-cyan-500/40 p-5 shadow-2xl shadow-cyan-500/10 hover:border-cyan-400 hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: snehaPoster,
                      name: 'Sneha Agrawal',
                      role: 'Event Coordinator',
                      phone: '8080550340',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-cyan-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={snehaPoster}
                    alt="Sneha Agrawal - Event Coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center space-x-1.5 shadow-lg group-hover:border-cyan-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Event Coordinator
                  </span>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Sneha Agrawal
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    DataVerse 5.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold tracking-wider">8080550340</span>
                </div>
                <button
                  onClick={() => handleCopy('8080550340')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '8080550340'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {copiedNumber === '8080550340' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ananya Pathak Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-cyan-500/40 p-5 shadow-2xl shadow-cyan-500/10 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: ananyaPoster,
                      name: 'Ananya Pathak',
                      role: 'Event Co-coordinator',
                      phone: '8275372331',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-cyan-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={ananyaPoster}
                    alt="Ananya Pathak - Event Co-coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center space-x-1.5 shadow-lg group-hover:border-cyan-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Event Co-coordinator
                  </span>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Ananya Pathak
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    DataVerse 5.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold tracking-wider">8275372331</span>
                </div>
                <button
                  onClick={() => handleCopy('8275372331')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '8275372331'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {copiedNumber === '8275372331' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Featured Arena 02 Coordinators Showcase (VizMinds 3.0) ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARENA 02 • VIZMINDS 3.0 LEADERSHIP</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Event Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Official posters and coordinator command vanguard for VizMinds 3.0 at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vedang Pathak Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-cyan-500/40 p-5 shadow-2xl shadow-cyan-500/10 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: vedangPoster,
                      name: 'Vedang Pathak',
                      role: 'Coordinator',
                      phone: '9540494095',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-cyan-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={vedangPoster}
                    alt="Vedang Pathak - Coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center space-x-1.5 shadow-lg group-hover:border-cyan-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Coordinator
                  </span>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Vedang Pathak
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    VizMinds 3.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold tracking-wider">9540494095</span>
                </div>
                <button
                  onClick={() => handleCopy('9540494095')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9540494095'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {copiedNumber === '9540494095' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Atharva Andhare Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-blue-500/40 p-5 shadow-2xl shadow-blue-500/10 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: atharvaPoster,
                      name: 'Atharva Andhare',
                      role: 'Co-coordinator',
                      phone: '8446321781',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-blue-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={atharvaPoster}
                    alt="Atharva Andhare - Co-coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-blue-500/40 text-[11px] font-mono text-blue-300 flex items-center space-x-1.5 shadow-lg group-hover:border-blue-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Co-coordinator
                  </span>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Atharva Andhare
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    VizMinds 3.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold tracking-wider">8446321781</span>
                </div>
                <button
                  onClick={() => handleCopy('8446321781')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '8446321781'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {copiedNumber === '8446321781' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Featured Arena 03 Coordinators Showcase (Survival Showdown 2.0) ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARENA 03 • SURVIVAL SHOWDOWN 2.0 LEADERSHIP</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Event Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Official posters and coordinator command vanguard for Survival Showdown 2.0 at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Alan K. Biju Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-red-500/40 p-5 shadow-2xl shadow-red-500/10 hover:border-red-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: alanPoster,
                      name: 'Alan K. Biju',
                      role: 'Promotion Head / Coordinator',
                      phone: '9643728841',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-red-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={alanPoster}
                    alt="Alan K. Biju - Coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-red-500/40 text-[11px] font-mono text-red-300 flex items-center space-x-1.5 shadow-lg group-hover:border-red-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/15 text-red-300 border border-red-500/30">
                      Promotion Head
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-400 border border-white/10">
                      Coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Alan K. Biju
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Survival Showdown 2.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-semibold tracking-wider">9643728841</span>
                </div>
                <button
                  onClick={() => handleCopy('9643728841')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9643728841'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {copiedNumber === '9643728841' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fallgoon Motghare Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-rose-500/40 p-5 shadow-2xl shadow-rose-500/10 hover:border-rose-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: fallgoonPoster,
                      name: 'Fallgoon Motghare',
                      role: 'Requirements Head / Co-coordinator',
                      phone: '9022915399',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-rose-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={fallgoonPoster}
                    alt="Fallgoon Motghare - Co-coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-rose-500/40 text-[11px] font-mono text-rose-300 flex items-center space-x-1.5 shadow-lg group-hover:border-rose-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      Requirements Head
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-400 border border-white/10">
                      Co-coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Fallgoon Motghare
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Survival Showdown 2.0 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-semibold tracking-wider">9022915399</span>
                </div>
                <button
                  onClick={() => handleCopy('9022915399')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9022915399'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {copiedNumber === '9022915399' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Featured Arena 04 Coordinators Showcase (Game of Bids 2026) ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARENA 04 • GAME OF BIDS 2026 LEADERSHIP</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Event Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Official posters and auction strategy commanders for Game of Bids 2026 at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Manthan Udasi Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-emerald-500/40 p-5 shadow-2xl shadow-emerald-500/10 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: manthanPoster,
                      name: 'Manthan Udasi',
                      role: 'Coordinator',
                      phone: '9302294096',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-emerald-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={manthanPoster}
                    alt="Manthan Udasi - Coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300 flex items-center space-x-1.5 shadow-lg group-hover:border-emerald-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Manthan Udasi
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Game of Bids 2026 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold tracking-wider">9302294096</span>
                </div>
                <button
                  onClick={() => handleCopy('9302294096')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9302294096'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {copiedNumber === '9302294096' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ved Nair Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-teal-500/40 p-5 shadow-2xl shadow-teal-500/10 hover:border-teal-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: vedPoster,
                      name: 'Ved Nair',
                      role: 'Co-coordinator',
                      phone: '9307678510',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-teal-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={vedPoster}
                    alt="Ved Nair - Co-coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-500/40 text-[11px] font-mono text-teal-300 flex items-center space-x-1.5 shadow-lg group-hover:border-teal-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      Co-coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Ved Nair
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Game of Bids 2026 • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold tracking-wider">9307678510</span>
                </div>
                <button
                  onClick={() => handleCopy('9307678510')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9307678510'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  }`}
                >
                  {copiedNumber === '9307678510' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Featured Arena 05 Coordinators Showcase (Founders Gone Wild) ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARENA 05 • FOUNDERS GONE WILD LEADERSHIP</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Event Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
              Official posters and venture catalyst commanders for Founders Gone Wild at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sarthak Pande Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-purple-500/40 p-5 shadow-2xl shadow-purple-500/10 hover:border-purple-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: sarthakPoster,
                      name: 'Sarthak Pande',
                      role: 'Coordinator',
                      phone: '9977744879',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-purple-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={sarthakPoster}
                    alt="Sarthak Pande - Coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-purple-500/40 text-[11px] font-mono text-purple-300 flex items-center space-x-1.5 shadow-lg group-hover:border-purple-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      Coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Sarthak Pande
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Founders Gone Wild • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold tracking-wider">9977744879</span>
                </div>
                <button
                  onClick={() => handleCopy('9977744879')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '9977744879'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {copiedNumber === '9977744879' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stephen Dhanvajir Card */}
            <div className="group relative rounded-3xl bg-slate-950/90 border border-fuchsia-500/40 p-5 shadow-2xl shadow-fuchsia-500/10 hover:border-fuchsia-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div
                  onClick={() => {
                    setSelectedPoster({
                      src: stephenPoster,
                      name: 'Stephen Dhanvajir',
                      role: 'Co-coordinator',
                      phone: '7768820280',
                    });
                    odysseyAudio.playFrameTick(500);
                  }}
                  className="relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-fuchsia-500/20 cursor-pointer bg-[#eae5dc]"
                >
                  <img
                    src={stephenPoster}
                    alt="Stephen Dhanvajir - Co-coordinator"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-fuchsia-500/40 text-[11px] font-mono text-fuchsia-300 flex items-center space-x-1.5 shadow-lg group-hover:border-fuchsia-400 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Poster</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                      Co-coordinator
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                    Stephen Dhanvajir
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Founders Gone Wild • Department of CSE (Data Science)
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span className="font-semibold tracking-wider">7768820280</span>
                </div>
                <button
                  onClick={() => handleCopy('7768820280')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${
                    copiedNumber === '7768820280'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                  }`}
                >
                  {copiedNumber === '7768820280' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spotlight: Official Core Team Heads Section (Below Official Event Coordinators) ── */}
        <div className="mb-24 pt-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CORE OPERATIONS VANGUARD • DATADIVE 5.0</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-odyssey text-white">
              Official Core Team Heads
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
              The operational leadership vanguard steering technical infrastructure, registration desks, media production, documentation records, and atmospheric aesthetics for DataDive 5.0 at St. Vincent Pallotti College of Engineering &amp; Technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {coreTeamHeads.map((head) => (
              <div
                key={head.id}
                className={`group relative rounded-3xl bg-slate-950/90 border ${head.color} p-5 shadow-2xl ${head.glow} transition-all duration-300 flex flex-col justify-between w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm`}
              >
                <div>
                  {/* High-res uncropped poster */}
                  <div
                    onClick={() => {
                      setSelectedPoster({
                        src: head.image,
                        name: head.name,
                        role: head.role,
                        phone: head.wing,
                      });
                      odysseyAudio.playFrameTick(500);
                    }}
                    className={`relative aspect-[2/3] max-h-[460px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg ${head.posterGlow} cursor-pointer bg-[#eae5dc]`}
                  >
                    <img
                      src={head.image}
                      alt={`${head.name} - ${head.role}`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border ${head.viewBadgeBorder} text-[11px] font-mono ${head.viewBadgeText} flex items-center space-x-1.5 shadow-lg ${head.viewBadgeHover} transition-colors`}>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Full Poster</span>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${head.badgeBg}`}>
                        {head.badge}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold font-odyssey text-white mt-2">
                      {head.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      DataDive 5.0 • Department of CSE (Data Science)
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold tracking-wider text-[11px] text-slate-300 truncate max-w-[130px] sm:max-w-[150px]">
                      {head.wing}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPoster({
                        src: head.image,
                        name: head.name,
                        role: head.role,
                        phone: head.wing,
                      });
                      odysseyAudio.playFrameTick(500);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 font-mono text-xs font-bold ${head.btnStyle}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Poster</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-mono mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>COMMONLY SOUGHT INTEL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-odyssey text-white">
              Frequently Asked Questions
            </h3>
          </div>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    setOpenFaq(isOpen ? null : idx);
                    odysseyAudio.playFrameTick(400);
                  }}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-200">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transform transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-white/5 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox Modal for Poster Zoom ── */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setSelectedPoster(null)}
        >
          <div className="relative max-w-md w-full bg-slate-950 border border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 my-auto">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-slate-300 hover:text-white border border-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-3 bg-slate-900 flex items-center justify-center">
              <img
                src={selectedPoster.src}
                alt={selectedPoster.name}
                className="w-full max-h-[72vh] object-contain rounded-2xl"
              />
            </div>

            <div className="p-5 flex items-center justify-between bg-slate-950 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  {selectedPoster.role}
                </span>
                <h4 className="text-xl font-bold font-odyssey text-white">
                  {selectedPoster.name}
                </h4>
              </div>

              {/\d{5,}/.test(selectedPoster.phone) ? (
                <button
                  onClick={() => handleCopy(selectedPoster.phone)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-mono text-xs font-bold hover:brightness-110 flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  {copiedNumber === selectedPoster.phone ? (
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
              ) : (
                <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedPoster.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
