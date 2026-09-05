import React from 'react';
import { FEST_DATA, EVENTS } from '../data/eventsData';
import mainEmblem from '../assets/images/datadive_official_logo_1788591290989.jpg';
import { Sparkles, ArrowUpRight, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030407] text-slate-400 border-t border-white/10 relative overflow-hidden">
      {/* Greek decorative border ribbon */}
      <div className="greek-border w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Theme */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-md">
                <img
                  src={mainEmblem}
                  alt="DataDive 5.0"
                  className="w-full h-full object-cover rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold font-odyssey text-white">
                  DATADIVE 5.0 — THE ODYSSEY
                </h4>
                <p className="text-xs font-mono text-amber-400">
                  {FEST_DATA.department}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              The flagship symposium merging ancient Greek mythological grandeur with the frontiers of artificial intelligence, visual analytics, esports combat, and tactical bidding.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 pt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Date: 10th September 2026 • Campus Tech Complex</span>
            </div>
          </div>

          {/* Col 2: Event Registration Direct Links */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              Direct Registration Forms
            </h5>
            <ul className="space-y-2.5 text-xs font-mono">
              {EVENTS.map((evt) => (
                <li key={evt.id}>
                  <a
                    href={evt.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 flex items-center space-x-1.5 transition-colors group"
                  >
                    <span>{evt.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Info & Assurance */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">
              Symposium Standards
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Total Prize Pool: ₹15,000+</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>100% Participation Certificates</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Beginner Friendly Hands-On Training</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>Big-Screen Tournament Arenas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © 2026 DataDive 5.0 • Department of Computer Science & Engineering (Data Science).
          </div>
          <div>
            Curated by <span className="text-amber-400 font-semibold">Lead Team DataDive 5.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
