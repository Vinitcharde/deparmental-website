import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Camera,
  Sparkles,
  Trophy,
  Calendar,
  MapPin,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Check,
  LayoutGrid,
  Filter,
  Heart,
} from 'lucide-react';

export interface MemoryItem {
  id: string;
  title: string;
  category: 'stage' | 'arena' | 'team';
  categoryLabel: string;
  priorityBadge?: string;
  isPriorityOne?: boolean;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  thumbSrc: string;
  aspect: 'landscape' | 'portrait' | 'square';
  featured?: boolean;
  attendees?: string;
  accentColor: string;
  tags: string[];
}

export const MEMORIES_DATA: MemoryItem[] = [
  // ─── 1ST PRIORITY: IMG-20251010-WA0645.jpg ───
  {
    id: 'mem-1',
    title: '4th Year Seniors: Passout Batch Fellowship',
    category: 'team',
    categoryLabel: 'Senior Fellowship',
    priorityBadge: '#1 FEATURED HIGHLIGHT',
    isPriorityOne: true,
    date: '10th October 2025',
    time: '05:30 PM',
    location: 'Central Atrium Stage',
    description:
      'Honoring our respected 4th-year seniors (now proud graduated alumni)! The guiding vanguard of CSE (Data Science) gathered together in joyful triumph, celebrating their legacy and unforgettable fellowship with the department.',
    imageSrc: '/memories/memory_1.jpg',
    thumbSrc: '/memories/thumb_1.jpg',
    aspect: 'landscape',
    featured: true,
    attendees: '4th Year Senior Batch',
    accentColor: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/50',
    tags: ['#1 Highlight', '4th Year Seniors', 'Passout Batch', 'Senior Fellowship'],
  },

  // ─── 2ND PRIORITY: IMG-20251010-WA0463.jpg ───
  {
    id: 'mem-2',
    title: 'Morning Influx & Registration Hub',
    category: 'arena',
    categoryLabel: 'Registration Desk',
    priorityBadge: '#2 PRIORITY MOMENT',
    date: '10th October 2025',
    time: '09:00 AM',
    location: 'Department Entrance & Foyer',
    description:
      'Delegates and eager participants from colleges across the region streaming into the campus, receiving tournament badges, welcome kits, and battle schedules.',
    imageSrc: '/memories/memory_2.jpg',
    thumbSrc: '/memories/thumb_2.jpg',
    aspect: 'landscape',
    featured: true,
    attendees: '500+ Registrations',
    accentColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/50',
    tags: ['#2 Priority', 'Welcome Hub', 'Morning Influx'],
  },

  // ─── 3RD PRIORITY: 20251010_115230.jpg.jpeg ───
  {
    id: 'mem-3',
    title: 'Data Science Code Sprint & Analytics Arena',
    category: 'arena',
    categoryLabel: 'Data Labs',
    priorityBadge: '#3 ARENA SHOWCASE',
    date: '10th October 2025',
    time: '11:52 AM',
    location: 'Data Analytics Center',
    description:
      'Warriors locked into high-intensity analytics combat! Teams crunching multi-dimensional datasets, engineering predictive machine learning models, and racing against the countdown clock.',
    imageSrc: '/memories/memory_3.jpg',
    thumbSrc: '/memories/thumb_3.jpg',
    aspect: 'landscape',
    featured: true,
    attendees: '85 Competing Teams',
    accentColor: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/50',
    tags: ['#3 Priority', 'Code Sprint', 'Analytics Combat'],
  },

  // ─── 4TH PRIORITY: GRAND STAGES AND AWARDS (3 Auditorium Stage Photos) ───
  {
    id: 'mem-4',
    title: 'Stage Honors: Champions Felicitated',
    category: 'stage',
    categoryLabel: 'Grand Stage',
    priorityBadge: 'STAGE TRILOGY I',
    date: '10th October 2025',
    time: '04:34 PM',
    location: 'Main Auditorium Stage',
    description:
      'Proud podium honors! Respected faculty members felicitating championship winners with achievement plaques and cash prizes before the illuminated 3D DATADIVE stage letters.',
    imageSrc: '/memories/memory_4.jpg',
    thumbSrc: '/memories/thumb_4.jpg',
    aspect: 'portrait',
    featured: true,
    attendees: 'Auditorium Crowd',
    accentColor: 'from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/50',
    tags: ['Grand Stage & Awards', 'Faculty Honors', 'Cash Prizes'],
  },
  {
    id: 'mem-5',
    title: 'Victory Spotlight & Distinctions',
    category: 'stage',
    categoryLabel: 'Grand Stage',
    priorityBadge: 'STAGE TRILOGY II',
    date: '10th October 2025',
    time: '04:35 PM',
    location: 'Main Auditorium Stage',
    description:
      'Beaming winners receive their prestigious medals, citations of distinction, and certificates as the entire auditorium erupts into standing applause.',
    imageSrc: '/memories/memory_5.jpg',
    thumbSrc: '/memories/thumb_5.jpg',
    aspect: 'portrait',
    featured: true,
    attendees: 'Prize Winners',
    accentColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/50',
    tags: ['Grand Stage & Awards', 'Gold Medalists', 'Celebration'],
  },
  {
    id: 'mem-6',
    title: 'Master of Ceremonies & Keynote Stage',
    category: 'stage',
    categoryLabel: 'Keynote Stage',
    priorityBadge: 'STAGE TRILOGY III',
    date: '10th October 2025',
    time: '04:36 PM',
    location: 'Auditorium Stage Podium',
    description:
      'Our charismatic student anchors keeping the hall energized, celebrating each arena breakdown and introducing esteemed departmental dignitaries.',
    imageSrc: '/memories/memory_6.jpg',
    thumbSrc: '/memories/thumb_6.jpg',
    aspect: 'portrait',
    featured: true,
    attendees: 'Auditorium Assembly',
    accentColor: 'from-cyan-500/20 to-sky-500/20 text-cyan-300 border-cyan-500/50',
    tags: ['Grand Stage & Awards', 'Anchoring', 'Auditorium Podium'],
  },

  // ─── REMAINING EVENT MOMENTS ───
  {
    id: 'mem-7',
    title: 'Department Core Organizing Committee',
    category: 'team',
    categoryLabel: 'Core Council',
    priorityBadge: 'CORE COUNCIL & FACULTY',
    date: '10th October 2025',
    time: '05:10 PM',
    location: 'CSE (Data Science) Foyer',
    description:
      'The masterminds behind the magic! Student leads, event managers, and faculty coordinators in classic formal blazers gathered for the historic legacy portrait.',
    imageSrc: '/memories/memory_7.jpg',
    thumbSrc: '/memories/thumb_7.jpg',
    aspect: 'landscape',
    featured: true,
    attendees: 'Core Council & Faculty',
    accentColor: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/50',
    tags: ['Core Leads', 'Faculty Leadership', 'Department Legacy'],
  },
  {
    id: 'mem-8',
    title: 'High-Octane Arena Battle Station',
    category: 'arena',
    categoryLabel: 'Arena Setup',
    priorityBadge: 'ARENA SUITES',
    date: '10th October 2025',
    time: '09:18 AM',
    location: 'Computing Suites & Labs',
    description:
      'The calm before the digital tempest. Multi-terminal battle stations primed with glowing ambient RGB arrays, networked clusters, and live leaderboards.',
    imageSrc: '/memories/memory_8.jpg',
    thumbSrc: '/memories/thumb_8.jpg',
    aspect: 'landscape',
    featured: false,
    attendees: '120+ Battle Stations',
    accentColor: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/50',
    tags: ['Computing Suites', 'Terminal Arrays', 'Setup Phase'],
  },
  {
    id: 'mem-9',
    title: 'Survival Showdown Console Arena',
    category: 'arena',
    categoryLabel: 'Esports Arena',
    priorityBadge: 'ESPORTS SHOWDOWN',
    date: '10th October 2025',
    time: '11:22 AM',
    location: 'Gaming Pavilion',
    description:
      'Intense tactical combat underway! Gamers locked into the Survival Showdown tournament as crowds gather around the spectator monitors.',
    imageSrc: '/memories/memory_9.jpg',
    thumbSrc: '/memories/thumb_9.jpg',
    aspect: 'landscape',
    featured: false,
    attendees: '64 Competitors',
    accentColor: 'from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/50',
    tags: ['Survival Showdown', 'Esports', 'Controller Clash', 'Gaming Arena'],
  },
];

interface MemoriesPageProps {
  onBack: () => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stage' | 'arena' | 'team'>('all');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Filtered photos
  const filteredMemories = MEMORIES_DATA.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  // Open modal
  const openModal = (idx: number) => {
    setActivePhotoIdx(idx);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = useCallback(() => {
    setActivePhotoIdx(null);
    document.body.style.overflow = 'unset';
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIdx === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev + 1) % filteredMemories.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev - 1 + filteredMemories.length) % filteredMemories.length : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx, filteredMemories.length, closeModal]);

  // Handle Share / Copy Link
  const handleShare = async (e: React.MouseEvent, item: MemoryItem) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#memories`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    } catch {
      // ignore
    }
  };

  // Toggle Like heart micro-interaction
  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden pt-20 sm:pt-24 pb-24">
      {/* Mythic Ambient Cosmic Backing Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 left-1/3 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 shadow-lg text-slate-300 hover:text-amber-300 font-mono text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ODYSSEY</span>
          </button>

          {/* Quick Stat Counter Badges */}
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center space-x-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>9 CAPTURED MOMENTS</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>500+ WARRIORS</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>10TH OCT 2025</span>
            </span>
          </div>
        </div>

        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-4 shadow-sm shadow-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>ARCHIVES & TIME CAPSULE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-odyssey tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_4px_24px_rgba(245,158,11,0.4)] mb-4">
            DATADIVE MEMORIES
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Step into the arena vault. Relive the adrenaline-fueled hackathons, esports
            clashes, faculty honors, and camaraderie that defined previous chapters of{' '}
            <span className="text-amber-400 font-semibold font-mono">DATADIVE</span>.
          </p>
        </div>

        {/* Controls Toolbar: Category Filters & Bento Badge (Exclusive Bento Mosaic Layout) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 sm:mb-10 shadow-2xl">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="hidden md:flex items-center text-xs font-mono text-slate-400 pl-3 pr-2">
              <Filter className="w-3.5 h-3.5 mr-1 text-amber-400" />
              Filter:
            </span>

            {[
              { id: 'all', label: 'All Moments (9)' },
              { id: 'stage', label: 'Grand Stage & Awards' },
              { id: 'arena', label: 'Battle Arenas' },
              { id: 'team', label: 'Core Team & Seniors' },
            ].map((cat) => {
              const active = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Bento Mosaic Exclusive Badge */}
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold self-end sm:self-auto shadow-sm shadow-amber-500/15">
            <LayoutGrid className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="tracking-wider uppercase">BENTO MOSAIC ARCHIVE</span>
          </div>
        </div>

        {/* ─── EXCLUSIVE BENTO MOSAIC SHOWCASE GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {filteredMemories.map((item, idx) => {
            // Calculate curated responsive Bento Mosaic column and min-height spans
            let colSpan = 'lg:col-span-6';
            let minHeight = 'min-h-[360px]';

            if (selectedFilter === 'all') {
              if (item.id === 'mem-1') {
                // 1st Priority: #1 Crown Jewel Hero Card (8 cols)
                colSpan = 'lg:col-span-8';
                minHeight = 'min-h-[440px] sm:min-h-[500px]';
              } else if (item.id === 'mem-2') {
                // 2nd Priority: Registration & Influx (4 cols -> 8 + 4 = 12)
                colSpan = 'lg:col-span-4';
                minHeight = 'min-h-[440px] sm:min-h-[500px]';
              } else if (item.id === 'mem-3') {
                // 3rd Priority: Data Science Code Sprint Panoramic (12 cols)
                colSpan = 'lg:col-span-12';
                minHeight = 'min-h-[380px] sm:min-h-[420px]';
              } else if (item.id === 'mem-4' || item.id === 'mem-5' || item.id === 'mem-6') {
                // 4th Priority: The Grand Stage & Awards Trilogy (4 cols each -> 4 + 4 + 4 = 12)
                colSpan = 'lg:col-span-4';
                minHeight = 'min-h-[480px] sm:min-h-[530px]';
              } else if (item.id === 'mem-7') {
                // Remaining: Core Organizing Committee Full Panoramic (12 cols)
                colSpan = 'lg:col-span-12';
                minHeight = 'min-h-[400px] sm:min-h-[460px]';
              } else {
                // Remaining: Battle Station & Esports Arenas (6 cols each -> 6 + 6 = 12)
                colSpan = 'lg:col-span-6';
                minHeight = 'min-h-[340px] sm:min-h-[380px]';
              }
            } else if (selectedFilter === 'stage') {
              colSpan = 'lg:col-span-4';
              minHeight = 'min-h-[480px] sm:min-h-[530px]';
            } else if (selectedFilter === 'team') {
              colSpan = 'lg:col-span-6';
              minHeight = 'min-h-[400px] sm:min-h-[460px]';
            } else if (selectedFilter === 'arena') {
              colSpan = 'lg:col-span-6';
              minHeight = 'min-h-[360px] sm:min-h-[400px]';
            }

            const isLiked = likedMap[item.id];

            return (
              <div
                key={item.id}
                onClick={() => openModal(idx)}
                className={`group relative rounded-2xl overflow-hidden border ${
                  item.isPriorityOne
                    ? 'border-amber-400/60 ring-1 ring-amber-400/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                    : 'border-white/10 hover:border-amber-400/60'
                } bg-slate-900/60 backdrop-blur-md shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end ${minHeight} ${colSpan} hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,158,11,0.25)]`}
              >
                {/* Image Element with smooth hover zoom */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Cinematic Vignette & Info Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/55 to-black/20 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badges (Category, Priority, and Like Button) */}
                <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Priority Badge */}
                    {item.isPriorityOne ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-black tracking-wider uppercase bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-500/40">
                        <Trophy className="w-3 h-3 text-black fill-black" />
                        <span>{item.priorityBadge}</span>
                      </span>
                    ) : item.priorityBadge ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-black/60 border border-amber-500/40 text-amber-300 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{item.priorityBadge}</span>
                      </span>
                    ) : null}

                    {/* Category Label */}
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border backdrop-blur-md ${item.accentColor}`}
                    >
                      <span>{item.categoryLabel}</span>
                    </span>
                  </div>

                  {/* Like heart button */}
                  <button
                    onClick={(e) => toggleLike(e, item.id)}
                    className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                      isLiked
                        ? 'bg-rose-500/30 border-rose-500 text-rose-400 scale-110'
                        : 'bg-black/40 border-white/10 text-white/70 hover:text-rose-400 hover:border-rose-400/40'
                    }`}
                    title={isLiked ? 'Liked' : 'Like photo'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Bottom Captions & Meta */}
                <div className="relative z-10 p-4 sm:p-6 mt-auto">
                  {/* Timestamp & Location */}
                  <div className="flex items-center space-x-3 text-[11px] font-mono text-amber-300/90 mb-1.5">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <h3
                    className={`${
                      item.isPriorityOne ? 'text-lg sm:text-2xl md:text-3xl' : 'text-base sm:text-xl'
                    } font-bold font-odyssey text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1.5`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300/85 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-end pt-2.5 border-t border-white/10 text-xs font-mono text-slate-400">
                    <span className="inline-flex items-center space-x-1.5 text-amber-400 group-hover:text-amber-300 font-bold group-hover:translate-x-1 transition-all">
                      <span>VIEW FULL HD</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Laser Accent Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/40 pointer-events-none transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Invitation */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-amber-500/30 backdrop-blur-2xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-xl sm:text-3xl font-black font-odyssey text-white mb-2">
            BE PART OF THE NEXT CHAPTER IN 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            5 flagship arenas, live hackathons, high-stakes bidding, and ₹15,000+ prize pool await on 10th September 2026.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl font-mono text-xs font-black tracking-wider bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
          >
            ENTER THE ODYSSEY ARENA
          </button>
        </div>
      </div>

      {/* ─── LUXURY LIGHTBOX MODAL (Full-Screen HD Viewer) ─── */}
      {activePhotoIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Top Control Bar */}
          <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 z-20 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Camera className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-bold text-slate-200">
                {activePhotoIdx + 1} / {filteredMemories.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Share button */}
              <button
                onClick={(e) => handleShare(e, filteredMemories[activePhotoIdx])}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all"
                title="Copy Link"
              >
                {copiedId === filteredMemories[activePhotoIdx].id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>

              {/* Direct Download Link */}
              <a
                href={filteredMemories[activePhotoIdx].imageSrc}
                download={`datadive-memory-${activePhotoIdx + 1}.jpg`}
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all"
                title="Download Original HD Photo"
              >
                <Download className="w-4 h-4 text-cyan-300" />
              </a>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="p-2.5 rounded-full bg-white/10 hover:bg-rose-500 text-white backdrop-blur-md border border-white/15 hover:border-rose-400 transition-all"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Previous Photo Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) =>
                prev !== null ? (prev - 1 + filteredMemories.length) % filteredMemories.length : 0
              );
            }}
            className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-amber-500/30 text-white hover:text-amber-300 border border-white/10 hover:border-amber-400/50 backdrop-blur-md transition-all -translate-y-1/2 top-1/2"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIdx((prev) =>
                prev !== null ? (prev + 1) % filteredMemories.length : 0
              );
            }}
            className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-amber-500/30 text-white hover:text-amber-300 border border-white/10 hover:border-amber-400/50 backdrop-blur-md transition-all -translate-y-1/2 top-1/2"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Main Stage Image */}
          <div
            className="relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredMemories[activePhotoIdx].imageSrc}
              alt={filteredMemories[activePhotoIdx].title}
              className="max-h-[70vh] sm:max-h-[74vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-white/15"
            />

            {/* Modal Caption Bar */}
            <div className="mt-3 sm:mt-4 w-full text-center max-w-2xl px-3 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-amber-300 mb-1">
                <span className="font-bold text-white font-odyssey text-sm sm:text-base">
                  {filteredMemories[activePhotoIdx].title}
                </span>
                <span>•</span>
                <span>{filteredMemories[activePhotoIdx].date}</span>
                <span>•</span>
                <span className="text-cyan-300">{filteredMemories[activePhotoIdx].location}</span>
              </div>
              <p className="text-xs text-slate-300/85 line-clamp-2">
                {filteredMemories[activePhotoIdx].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
