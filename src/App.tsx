import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OdysseyScrollJourney } from './components/OdysseyScrollJourney';
import { TimelineSection } from './components/TimelineSection';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { TrailersPage } from './components/TrailersPage';
import { MemoriesPage } from './components/MemoriesPage';
import { RegistrationGatewayModal } from './components/RegistrationGatewayModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'trailers' | 'memories'>('main');

  useEffect(() => {
    const scrollToTarget = (targetHash: string) => {
      let attempts = 0;
      const checkAndScroll = () => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          if (targetHash === '#contact-lead-team') {
            window.dispatchEvent(new CustomEvent('reset-lead-swapper'));
          }
        } else if (attempts < 20) {
          attempts++;
          setTimeout(checkAndScroll, 50);
        }
      };
      setTimeout(checkAndScroll, 60);
    };

    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#trailers' || hash === '#events-trailer' || hash === '#trailer') {
        setCurrentView('trailers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#memories' || hash === '#gallery' || hash === '#memory' || hash === '#archives') {
        setCurrentView('memories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('main');
        if (hash && hash !== '#hero' && hash !== '#' && hash !== '') {
          scrollToTarget(hash);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openTrailers = () => {
    window.location.hash = '#trailers';
    setCurrentView('trailers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMemories = () => {
    window.location.hash = '#memories';
    setCurrentView('memories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = (targetHash?: string) => {
    setCurrentView('main');
    if (targetHash && targetHash !== '#hero') {
      window.location.hash = targetHash;
      let attempts = 0;
      const checkAndScroll = () => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          if (targetHash === '#contact-lead-team') {
            window.dispatchEvent(new CustomEvent('reset-lead-swapper'));
          }
        } else if (attempts < 20) {
          attempts++;
          setTimeout(checkAndScroll, 50);
        }
      };
      setTimeout(checkAndScroll, 60);
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Fixed Mythic Navigation with Events Trailer & Memories integration */}
      <Navbar
        onOpenTrailers={openTrailers}
        isTrailersActive={currentView === 'trailers'}
        onOpenMemories={openMemories}
        isMemoriesActive={currentView === 'memories'}
        onNavigateHome={navigateHome}
      />

      <main className="flex-1">
        {currentView === 'trailers' ? (
          <TrailersPage onBack={() => navigateHome('#hero')} />
        ) : currentView === 'memories' ? (
          <MemoriesPage onBack={() => navigateHome('#hero')} />
        ) : (
          <>
            {/* The Frame-by-Frame Scroll Driven Odyssey Experience — Starts from the Beginning */}
            <OdysseyScrollJourney />

            {/* 10th September 2026 Chronology / Itinerary */}
            <TimelineSection />

            {/* Lead Team & Event Coordinators Directory + FAQs */}
            <TeamSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Animated Registration Gateway Modal */}
      <RegistrationGatewayModal />
    </div>
  );
}
