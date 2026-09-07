import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Trophy,
  ExternalLink,
  Film,
  CheckCircle2,
  ChevronRight,
  Share2,
  Check,
  X,
  Copy,
  Send,
  Mail,
  MessageCircle,
  Globe,
  Smartphone,
} from 'lucide-react';
import dataverseLogo from '../assets/images/logo_dataverse_1788549411571.jpg';
import vizmindsLogo from '../assets/images/logo_vizminds_1788549433316.jpg';
import survivalLogo from '../assets/images/logo_survival_showdown_1788549451061.jpg';
import gameOfBidsLogo from '../assets/images/logo_game_of_bids_1788549469054.jpg';
import foundersWildLogo from '../assets/images/logo_founders_wild_1788597820429.jpg';
import { odysseyAudio } from '../utils/audioSynth';
import { triggerRegistrationGateway } from './RegistrationGatewayModal';

export interface TrailerItem {
  id: string;
  arena: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  videoSrc: string;
  thumbnail: string;
  prizePool: string;
  date: string;
  venue: string;
  registerUrl: string;
  description: string;
  highlights: string[];
  themeColor: {
    accent: string;
    border: string;
    glow: string;
    badge: string;
    text: string;
    ambient: string;
    button: string;
  };
}

export const TRAILERS: TrailerItem[] = [
  {
    id: 'dataverse',
    arena: 'ARENA 01',
    title: 'DATAVERSE 5.0',
    subtitle: 'From Raw Data to Real Insights!',
    tagline: 'Where Data Meets Logic, Accuracy & Creativity',
    category: 'Data & Analytics',
    videoSrc: '/videos/Dataverse.mp4',
    thumbnail: dataverseLogo,
    prizePool: '₹3,000',
    date: '10th September 2026',
    venue: 'Computing Suites A & B',
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf7UOYZxnSZ-c6XOj8Fy8Cti3-qYRz8iiFgZ6IlTX6dRoS9VQ/viewform?usp=dialog',
    description:
      'Transform raw, unstructured datasets into sharp predictive insights with DataVerse 5.0. 100% beginner-friendly data quiz, cleaning challenges, and executive dashboards.',
    highlights: [
      'Beginner-friendly data quiz & logic puzzles',
      'Hands-on data cleaning & sorting challenges',
      'Transform numbers into stunning charts',
      'Verified participation certificate for all',
    ],
    themeColor: {
      accent: 'from-amber-500 to-yellow-500',
      border: 'border-amber-500/40 hover:border-amber-400',
      glow: 'rgba(245, 158, 11, 0.35)',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
      text: 'text-amber-400',
      ambient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      button: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black',
    },
  },
  {
    id: 'vizminds',
    arena: 'ARENA 02',
    title: 'VIZMINDS 3.0',
    subtitle: 'From Raw Data to Real Decisions',
    tagline: 'Where Data Stops Being Just Numbers, and Starts Becoming Decisions',
    category: 'Power BI & Visual Intelligence',
    videoSrc: '/videos/vizmind.mp4',
    thumbnail: vizmindsLogo,
    prizePool: 'Upto ₹3,000',
    date: '10th September 2026',
    venue: 'Data Lab 3 & Visual Studio',
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf6gOKzb7tomvNfGi-ImY3ghqsHbuCwwPLvQia0cIzqj962Og/viewform?usp=dialog',
    description:
      'Harness the executive power of Microsoft Power BI! Build interactive dashboards that uncover trends, visualize metrics, and drive strategic board-level decisions.',
    highlights: [
      'Zero prior coding required — creative & analytical focus',
      'Pre-event hands-on Power BI dashboard workshop',
      'Two-stage tournament format rewarding real skill',
      'Executive dashboard certificates & trophies',
    ],
    themeColor: {
      accent: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/40 hover:border-cyan-400',
      glow: 'rgba(6, 182, 212, 0.35)',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
      text: 'text-cyan-400',
      ambient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      button: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black',
    },
  },
  {
    id: 'survival-showdown',
    arena: 'ARENA 03',
    title: 'SURVIVAL SHOWDOWN 2.0',
    subtitle: 'Survive Together. Fight Together. Become the Top Dog.',
    tagline: 'Colosseum of the Titans — WWE 2K26 Championship',
    category: 'WWE 2K26 Esports Championship',
    videoSrc: '/videos/survival-showdown.mp4',
    thumbnail: survivalLogo,
    prizePool: '₹1,500',
    date: '10th September 2026',
    venue: 'The Colosseum Arena (Gaming Lab)',
    registerUrl: 'https://forms.gle/MCvDKne2eYeYivBz6',
    description:
      'Step into the ring with your tag-team partner for the ultimate WWE 2K26 esports clash! Brutal knockout duos tournament played on massive high-refresh gaming rigs.',
    highlights: [
      'High-octane WWE 2K26 tag-team duos gameplay',
      'Live commentary & electrifying audience atmosphere',
      'Knockout tournament leading to grand finale title match',
      'Cash prize + championship bragging rights',
    ],
    themeColor: {
      accent: 'from-red-600 to-rose-600',
      border: 'border-red-500/40 hover:border-red-400',
      glow: 'rgba(239, 68, 68, 0.35)',
      badge: 'bg-red-500/15 text-red-300 border-red-500/40',
      text: 'text-red-400',
      ambient: 'from-red-600/20 via-rose-600/10 to-transparent',
      button: 'bg-gradient-to-r from-red-600 to-rose-600 text-white',
    },
  },
  {
    id: 'game-of-bids',
    arena: 'ARENA 04',
    title: 'GAME OF BIDS 2026',
    subtitle: 'The Ultimate IPL Auction Experience',
    tagline: 'Manage Your ₹80 Crore Purse & Build Your Dream Playing XI',
    category: 'IPL Auction & Financial Strategy',
    videoSrc: '/videos/game-of-bids.mp4',
    thumbnail: gameOfBidsLogo,
    prizePool: 'Upto ₹4,000',
    date: '10th September 2026',
    venue: 'Seminar Hall B – Auction Floor',
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf23nPsZzyjIz3qmb9YI8LDc3Xv_WldMmVQ5oX7PIPM6YygQQ/viewform?usp=dialog',
    description:
      'Feel the adrenaline of a live IPL auction gavel! Manage an ₹80 Crore budget, set bidding traps, outsmart rival franchise owners, and draft the ultimate championship squad.',
    highlights: [
      'Real-time paddle bidding with live auctioneer & ticking clock',
      'Manage ₹80 Crore purse balance & RTM cards',
      'Overseas slots, Indian uncapped gems & team chemistry',
      'Grand trophies for Champions and Top Strategist',
    ],
    themeColor: {
      accent: 'from-emerald-500 to-teal-500',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      glow: 'rgba(16, 185, 129, 0.35)',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
      text: 'text-emerald-400',
      ambient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      button: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black',
    },
  },
  {
    id: 'founders-gone-wild',
    arena: 'ARENA 05',
    title: 'FOUNDERS GONE WILD 🎪✨',
    subtitle: 'Where Ridiculous Ideas Become Brilliant!',
    tagline: 'You don’t bring an idea. You earn it.',
    category: 'Startup Circus & AI Ideation',
    videoSrc: '/videos/founders-gone-wild.mp4',
    thumbnail: foundersWildLogo,
    prizePool: 'Upto ₹3,000',
    date: '10th September 2026',
    venue: 'Innovation Hub & Pitch Deck Studio',
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform?usp=dialog',
    description:
      'No pitch decks brought from home! Earn venture points through rapid-fire quizzes, shop for wild concept cards (AI + Banana 🍌, Cyber + Rubber Duck 🦆), and pitch a viral startup.',
    highlights: [
      'Crazy gamified startup card combination format',
      'Generative AI tools allowed to draft pitches live',
      'Wildcard store: steal cards & trigger investor surprises',
      'Cash prizes + incubation acceleration certificates',
    ],
    themeColor: {
      accent: 'from-purple-600 via-fuchsia-600 to-amber-500',
      border: 'border-purple-500/40 hover:border-purple-400',
      glow: 'rgba(168, 85, 247, 0.35)',
      badge: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
      text: 'text-purple-400',
      ambient: 'from-purple-600/20 via-fuchsia-600/10 to-transparent',
      button: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
    },
  },
];

export const TrailersPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeTrailer = TRAILERS[selectedTrailerIndex];

  // When trailer switches, update source and play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    setCurrentTime(0);
  }, [selectedTrailerIndex]);

  // Handle keyboard shortcuts (Space for play/pause, M for mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'Escape') {
        if (isShareModalOpen) {
          setIsShareModalOpen(false);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isShareModalOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#trailers`
      : 'http://localhost:3000/#trailers';
  const shareTitle = `DataDive 5.0 — ${activeTrailer.title} Official Trailer`;
  const shareText = `🔥 Watch the official ${activeTrailer.title} trailer for DataDive 5.0: The Odyssey at St. Vincent Pallotti College of Engineering & Technology! 🏆 Total Prize Pool ₹15,000+! Witness the action:`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);

  const shareOptions = [
    {
      name: 'WhatsApp',
      description: 'Share with friends & groups',
      icon: MessageCircle,
      color:
        'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400',
      action: () => {
        window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
      },
    },
    {
      name: 'Telegram',
      description: 'Broadcast to channels & chats',
      icon: Send,
      color:
        'bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-400',
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`,
          '_blank'
        );
      },
    },
    {
      name: 'X (Twitter)',
      description: 'Tweet to the timeline',
      icon: Globe,
      color:
        'bg-white/10 text-slate-100 border-white/20 hover:bg-white/15 hover:border-white/40',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodedUrl}&hashtags=DataDive,Odyssey2026,TechFest`,
          '_blank'
        );
      },
    },
    {
      name: 'LinkedIn',
      description: 'Share on professional feed',
      icon: ExternalLink,
      color:
        'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400',
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
      },
    },
    {
      name: 'Email',
      description: 'Send via mail invitation',
      icon: Mail,
      color:
        'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400',
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
            `${shareText}\n\n${shareUrl}`
          )}`,
          '_blank'
        );
      },
    },
  ];

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    odysseyAudio.playChime(660, 'sine', 0.15);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 relative overflow-hidden pt-20 pb-24 selection:bg-amber-500/30 selection:text-amber-200">
      {/* ── Dynamic Ambient Cinema Glow based on selected arena color ── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] blur-[160px] rounded-full pointer-events-none transition-all duration-700 opacity-40 z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${activeTrailer.themeColor.glow} 0%, transparent 70%)`,
        }}
      />
      <div className="fixed -bottom-40 right-10 w-[600px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Top Bar: Back Button, Title Badge, Share & Register ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pt-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                odysseyAudio.playFrameTick(400);
                onBack();
              }}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white transition-all shadow-lg text-xs font-mono font-bold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-amber-400" />
              <span>Back to Odyssey</span>
            </button>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold">ODYSSEY CINEMA REEL</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => {
                odysseyAudio.playFrameTick(450);
                setIsShareModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-mono transition-all shadow-md group"
              title="Share event trailers with friends"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* ── Header Title & Subtitle ── */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>OFFICIAL EVENT TEASERS &amp; TRAILER REEL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-odyssey text-white tracking-wide mb-3">
            THE ODYSSEY EVENT TRAILERS
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Witness the action, the stakes, and the glory. Explore high-octane teasers for all 5 sacred arenas
            before stepping onto the battlefield on 10th September 2026.
          </p>
        </div>

        {/* ── Main Cinema Theater Screen Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* Left / Center: The Big Screen (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div
              className={`relative rounded-3xl overflow-hidden bg-black border ${activeTrailer.themeColor.border} shadow-2xl shadow-black/80 group`}
            >
              {/* Top Arena Bar Overlay */}
              <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
                <div className="flex items-center space-x-2.5 pointer-events-auto">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${activeTrailer.themeColor.badge}`}>
                    {activeTrailer.arena}
                  </span>
                  <span className="text-xs font-mono font-bold text-white drop-shadow">
                    {activeTrailer.title}
                  </span>
                </div>

                <div className="flex items-center space-x-2 pointer-events-auto">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 border border-white/20 text-slate-300 backdrop-blur-md">
                    1080p HD
                  </span>
                </div>
              </div>

              {/* HTML5 Video Element */}
              <div className="relative aspect-video bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={activeTrailer.videoSrc}
                  poster={activeTrailer.thumbnail}
                  className="w-full h-full object-contain"
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Big Center Play / Pause Indicator on Pause or Hover */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 ${activeTrailer.themeColor.button}`}
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Custom Video Control Bar */}
              <div className="p-3 sm:p-4 bg-[#070A12]/95 border-t border-white/10 backdrop-blur-xl flex flex-col gap-2.5 z-20 relative">
                {/* Seek Bar Slider */}
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-400 bg-white/15"
                    aria-label="Video seek bar"
                  />
                  <span className="text-[11px] font-mono text-slate-400 w-10">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
                      title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={restartVideo}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
                      title="Replay from start"
                      aria-label="Replay video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors flex items-center space-x-1.5"
                      title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-amber-400" />
                          <span className="text-[10px] font-mono text-amber-400 font-bold hidden sm:inline">Unmute</span>
                        </>
                      ) : (
                        <Volume2 className="w-4 h-4 text-slate-200" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
                      title="Fullscreen"
                      aria-label="Fullscreen toggle"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trailer switcher dots below the player */}
            <div className="flex items-center justify-center space-x-2 py-2">
              {TRAILERS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTrailerIndex(idx);
                    odysseyAudio.playFrameTick(450);
                  }}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all flex items-center space-x-1.5 ${
                    selectedTrailerIndex === idx
                      ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/30 scale-105'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-white/10'
                  }`}
                >
                  <span className="text-[10px] opacity-80">0{idx + 1}</span>
                  <span className="hidden sm:inline">{item.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Event Dossier & Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-3xl bg-slate-950/90 border border-white/10 shadow-2xl space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${activeTrailer.themeColor.badge}`}>
                    {activeTrailer.arena} • {activeTrailer.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeTrailer.date}
                  </span>
                </div>

                <h2 className="text-2xl font-black font-odyssey text-white">
                  {activeTrailer.title}
                </h2>
                <p className={`text-xs font-mono mt-1 ${activeTrailer.themeColor.text}`}>
                  {activeTrailer.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {activeTrailer.description}
              </p>

              {/* Arena Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Arena Highlights:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {activeTrailer.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prize & Venue Details */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Prize Pool:</span>
                  <span className="text-amber-400 font-bold text-sm">{activeTrailer.prizePool}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Venue:</span>
                  <span className="text-slate-200">{activeTrailer.venue}</span>
                </div>
              </div>

              {/* Primary Register CTA */}
              <button
                type="button"
                onClick={() => {
                  triggerRegistrationGateway({
                    url: activeTrailer.registerUrl,
                    title: activeTrailer.title,
                    category: activeTrailer.category,
                    prizePool: activeTrailer.prizePool,
                    venue: activeTrailer.venue,
                  });
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold text-center flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer ${activeTrailer.themeColor.button}`}
              >
                <span>REGISTER FOR {activeTrailer.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Quick Share This Arena Button */}
              <button
                onClick={() => {
                  odysseyAudio.playFrameTick(450);
                  setIsShareModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl font-mono text-xs text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-amber-400/40 flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Share {activeTrailer.title}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Section: Complete Trailer Reel Selection Grid ── */}
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-odyssey text-white">
                ALL 5 EVENT TRAILERS
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Click any arena card below to instantly stream its official trailer in the theater above.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold hidden sm:inline">
              5 ARENAS • READY TO STREAM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TRAILERS.map((item, idx) => {
              const isActive = selectedTrailerIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedTrailerIndex(idx);
                    odysseyAudio.playFrameTick(500);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className={`group relative rounded-2xl overflow-hidden bg-slate-950/80 border p-3 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/20 scale-[1.02] bg-slate-900'
                      : 'border-white/10 hover:border-white/30 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    {/* Thumbnail with overlay play icon */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play badge / status */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'bg-amber-500 text-black'
                              : 'bg-black/70 text-white border border-white/30'
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Top left badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-amber-300 border border-white/10">
                        {item.arena}
                      </span>
                    </div>

                    <h4 className="font-bold font-odyssey text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400 font-bold">{item.prizePool}</span>
                    <span className={isActive ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {isActive ? '● PLAYING NOW' : 'Watch →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Odyssey Cinema Multi-Option Share Modal ── */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsShareModalOpen(false);
              odysseyAudio.playFrameTick(350);
            }
          }}
        >
          <div className="relative max-w-lg w-full bg-gradient-to-b from-slate-900 via-[#070A10] to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-amber-500/15 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-odyssey text-white">
                    Share Odyssey Trailers
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Broadcast {activeTrailer.title} with your squad &amp; network
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  odysseyAudio.playFrameTick(350);
                }}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close share dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Arena Teaser Preview Card */}
            <div className="my-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center space-x-3.5 relative z-10">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 p-1 flex items-center justify-center">
                <img
                  src={activeTrailer.thumbnail}
                  alt={activeTrailer.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${activeTrailer.themeColor.badge}`}
                  >
                    {activeTrailer.arena}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Prize: {activeTrailer.prizePool}
                  </span>
                </div>
                <h4 className="font-odyssey text-sm sm:text-base font-bold text-white truncate mt-0.5">
                  {activeTrailer.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">
                  {activeTrailer.subtitle}
                </p>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="space-y-3 relative z-10">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Share via App or Platform:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shareOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => {
                        odysseyAudio.playFrameTick(500);
                        opt.action();
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center group active:scale-95 ${opt.color}`}
                    >
                      <Icon className="w-5 h-5 mb-1.5 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs font-bold text-white tracking-wide">
                        {opt.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 opacity-80 mt-0.5 leading-tight">
                        {opt.description}
                      </span>
                    </button>
                  );
                })}

                {/* Native Device Share (if supported) */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    onClick={async () => {
                      odysseyAudio.playFrameTick(500);
                      try {
                        await navigator.share({
                          title: shareTitle,
                          text: shareText,
                          url: shareUrl,
                        });
                      } catch {
                        // User cancelled or not supported
                      }
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 transition-all text-center group active:scale-95"
                  >
                    <Smartphone className="w-5 h-5 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs font-bold text-white tracking-wide">
                      More Apps...
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 opacity-80 mt-0.5 leading-tight">
                      System Share Sheet
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Direct Link Copy Bar */}
            <div className="mt-5 pt-4 border-t border-white/10 relative z-10 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                <span>Or copy direct trailer link:</span>
                {copiedLink && (
                  <span className="text-emerald-400 font-bold flex items-center space-x-1 animate-in fade-in duration-150">
                    <Check className="w-3 h-3" />
                    <span>Copied to clipboard!</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-black/60 border border-white/15 focus-within:border-amber-400/60 transition-colors">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="bg-transparent border-none outline-none font-mono text-xs text-slate-300 px-3 w-full selection:bg-amber-500/30 truncate"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={copyShareLink}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 shrink-0 transition-all active:scale-95 ${
                    copiedLink
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
