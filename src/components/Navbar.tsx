import React, { useState, useEffect } from 'react';
import { Menu, X, Trophy, Sparkles, Users, Film, Camera } from 'lucide-react';
import { DataDiveChipLogo } from './DataDiveChipLogo';

export interface NavbarProps {
  onOpenTrailers?: () => void;
  isTrailersActive?: boolean;
  onOpenMemories?: () => void;
  isMemoriesActive?: boolean;
  onNavigateHome?: (hashTarget?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrailers,
  isTrailersActive = false,
  onOpenMemories,
  isMemoriesActive = false,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Flagship Events',
      href: '#schedule',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      badge: '5',
    },
    {
      name: 'Coordinators',
      href: '#contact-lead-team',
      icon: Users,
      iconColor: 'text-purple-400',
    },
    {
      name: 'Events Trailer',
      href: '#trailers',
      icon: Film,
      iconColor: 'text-rose-400',
      badge: 'TRAILER',
      isTrailers: true,
    },
    {
      name: 'Memories',
      href: '#memories',
      icon: Camera,
      iconColor: 'text-cyan-400',
      badge: 'ARCHIVES',
      isMemories: true,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-[#05070D]/92 backdrop-blur-2xl border-b border-amber-500/20 py-2 sm:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-[#05070D]/95 via-[#05070D]/80 to-transparent backdrop-blur-md py-2.5 sm:py-4 border-b border-white/5'
          }`}
      >
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 via-cyan-400/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a
            href="#hero"
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome('#hero');
              }
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0"
          >
            {/* Crystal Clear Vector DataDive Circuit Logo */}
            <div className="group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center">
              <DataDiveChipLogo className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <div className="relative flex items-center">
              <span className="font-odyssey font-black text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-[length:250%_auto] bg-gradient-to-r from-yellow-400 via-amber-400 via-yellow-300 to-amber-500 group-hover:bg-[position:right_center] group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_16px_rgba(245,158,11,0.85)] transition-all duration-300 whitespace-nowrap leading-none">
                DATADIVE 5.0
              </span>
              {/* Laser underline accent on hover */}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1.5px] bg-gradient-to-r from-amber-400 via-cyan-400 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
            </div>
          </a>

          {/* Desktop Central Interactive Nav Island (lg and up) */}
          <div
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
            className="hidden lg:flex items-center p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner shadow-black/40 space-x-1"
          >
            {navLinks.map((link, idx) => {
              const isTrailerItem = link.href === '#trailers';
              const isMemoriesItem = link.href === '#memories';
              const isCoordinators = link.href === '#contact-lead-team';
              const isActive =
                (isTrailerItem && isTrailersActive) ||
                (isMemoriesItem && isMemoriesActive);

              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => {
                    if (isCoordinators) {
                      window.dispatchEvent(new CustomEvent('reset-lead-swapper'));
                    }
                    if (isMemoriesItem && onOpenMemories) {
                      e.preventDefault();
                      onOpenMemories();
                    } else if (isTrailerItem && onOpenTrailers) {
                      e.preventDefault();
                      onOpenTrailers();
                    } else if (!isTrailerItem && !isMemoriesItem && onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome(link.href);
                    }
                  }}
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  className={`group relative flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-[15px] transition-all duration-200 ${isActive
                      ? isMemoriesItem
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/30'
                      : isMemoriesItem
                        ? 'text-cyan-300/90 hover:text-white hover:bg-cyan-500/10'
                        : isTrailerItem
                          ? 'text-rose-300/90 hover:text-white hover:bg-rose-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                >
                  <span className="tracking-wide font-medium">{link.name}</span>
                  {link.badge && (
                    <span
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold border ${isMemoriesItem
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : isTrailerItem
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Right CTA Area (sm and up) */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="#schedule"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome('#schedule');
                }
              }}
              className="group relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-black tracking-wider bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden shrink-0 cursor-pointer"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <Trophy className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="text-black font-black">REGISTER NOW</span>
            </a>
          </div>

          {/* Mobile Right Controls (< lg) */}
          <div className="flex lg:hidden items-center space-x-2 shrink-0">
            <a
              href="#schedule"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome('#schedule');
                }
              }}
              className="sm:hidden px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-mono font-bold text-xs flex items-center space-x-1 shadow-md shadow-amber-500/25 active:scale-95 transition-transform cursor-pointer"
              title="Register for Events"
            >
              <Trophy className="w-3.5 h-3.5 text-black shrink-0" />
              <span className="hidden xs:inline text-black font-bold">REGISTER</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 hover:text-white hover:bg-slate-800 transition-colors shadow-sm"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Glassmorphic Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070a14]/98 border-b border-amber-500/30 px-4 py-5 space-y-3 font-mono text-sm backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Quick Navigation
              </span>
              <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                10th Sept 2026
              </span>
            </div>

            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isTrailerItem = link.href === '#trailers';
              const isMemoriesItem = link.href === '#memories';
              const isCoordinators = link.href === '#contact-lead-team';
              const isActive =
                (isTrailerItem && isTrailersActive) ||
                (isMemoriesItem && isMemoriesActive);

              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (isCoordinators) {
                      window.dispatchEvent(new CustomEvent('reset-lead-swapper'));
                    }
                    if (isMemoriesItem && onOpenMemories) {
                      e.preventDefault();
                      onOpenMemories();
                    } else if (isTrailerItem && onOpenTrailers) {
                      e.preventDefault();
                      onOpenTrailers();
                    } else if (!isTrailerItem && !isMemoriesItem && onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome(link.href);
                    }
                  }}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl border transition-colors ${isActive
                      ? isMemoriesItem
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] active:bg-amber-500/10 text-slate-200 hover:text-amber-400 border-white/5'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    <span className="text-xs sm:text-sm font-medium">{link.name}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${isMemoriesItem
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : isTrailerItem
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2">
              <a
                href="#schedule"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome('#schedule');
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black font-mono text-xs shadow-lg shadow-amber-500/30 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-black" />
                <span className="text-black font-black">EXPLORE ARENAS & REGISTER (₹15K+)</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
