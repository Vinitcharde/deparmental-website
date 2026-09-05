import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Shield, Award, Users, ChevronDown, Trophy, Sparkles } from 'lucide-react';
import { FEST_DATA } from '../data/eventsData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-09-10T09:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#05070B]">
      {/* Background Mythic Star Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Interactive Big Impact Headline */}
        <div className="relative group inline-block cursor-pointer select-none mb-3 px-4 py-2">
          {/* Radial Golden & Cosmic Cyan Aura that blooms on hover */}
          <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-amber-500/0 via-amber-400/25 via-cyan-400/20 to-amber-500/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Cosmic Sparkles that flare on hover */}
          <div className="absolute -top-2 -left-2 sm:-left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none">
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 sm:-right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none">
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-300 animate-pulse" />
          </div>

          <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-odyssey tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 via-yellow-300 to-amber-500 datadive-title-interactive drop-shadow-lg">
            DATADIVE 5.0
          </h1>

          {/* Laser Horizon Beam expanding across the base on hover */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-0 group-hover:w-4/5 bg-gradient-to-r from-transparent via-amber-400 via-cyan-400 to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-[0_0_14px_#38bdf8] pointer-events-none" />
        </div>

        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500" />
          <span className="text-sm sm:text-xl font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
            THE ODYSSEY
          </span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500" />
        </div>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed mb-8">
          Where <span className="text-amber-300 font-medium">Ancient Greek Mythology</span> bridges the stars with{' '}
          <span className="text-cyan-300 font-medium">Futuristic Data Exploration</span>. Five legendary trials. Over ₹15,000 in glory.
        </p>

        {/* Live Countdown Timer */}
        <div className="max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-3 flex items-center justify-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>COMMENCING SEPTEMBER 10, 2026</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 sm:p-3 text-center"
              >
                <div className="text-2xl sm:text-4xl font-bold text-amber-300">
                  {String(unit.val).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 tracking-wider mt-0.5">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#odyssey-experience"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-mono font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>START THE ODYSSEY SCROLL</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#schedule"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-mono font-bold bg-slate-900/80 hover:bg-slate-800 text-white border border-amber-500/30 hover:border-amber-400 shadow-xl flex items-center justify-center space-x-2 transition-all"
          >
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>BROWSE 5 FLAGSHIP EVENTS</span>
          </a>
        </div>

        {/* High-Impact Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">₹15,000+</div>
              <div className="text-xs text-slate-400">Total Prize Pool</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">5 Arenas</div>
              <div className="text-xs text-slate-400">Data, Startup, Esports, Bids</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">100% Verified</div>
              <div className="text-xs text-slate-400">Certificates for All</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">No Code Req.</div>
              <div className="text-xs text-slate-400">Beginner Friendly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="text-center pt-8">
        <a
          href="#odyssey-experience"
          className="inline-flex flex-col items-center text-xs font-mono text-slate-500 hover:text-amber-400 transition-colors"
        >
          <span>ENTER THE VOYAGE</span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
        </a>
      </div>
    </section>
  );
};
