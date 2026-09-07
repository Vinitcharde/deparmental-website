import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FEST_DATA } from '../data/eventsData';

import frame01 from '../assets/images/odyssey_hero_warrior_1788549289398.jpg';
import frame02 from '../assets/images/odyssey_warrior_leap_1788549490456.jpg';
import frame03 from '../assets/images/frame_leap_arch_1788550891476.jpg';
import frame04 from '../assets/images/odyssey_cosmic_arch_1788549314257.jpg';
import frame05 from '../assets/images/frame_portal_runes_1788550919257.jpg';
import frame06 from '../assets/images/odyssey_runic_vortex_1788549332371.jpg';
import frame07 from '../assets/images/frame_stargate_warp_1788550954888.jpg';
import frame08 from '../assets/images/frame_cyber_sol_1788550986790.jpg';
import frame09 from '../assets/images/odyssey_cyber_nexus_1788549359116.jpg';

import dataverseLogo from '../assets/images/logo_dataverse_1788549411571.jpg';
import vizmindsLogo from '../assets/images/logo_vizminds_1788549433316.jpg';
import survivalLogo from '../assets/images/logo_survival_showdown_1788549451061.jpg';
import gameOfBidsLogo from '../assets/images/logo_game_of_bids_1788549469054.jpg';
import foundersWildLogo from '../assets/images/logo_founders_wild_1788597820429.jpg';

// The 9 high-fidelity anchor frames representing the 40-frame Odyssey video sequence
const KEYFRAME_SRCS = [
  frame01, // 01: Spartan warrior in ember battlefield (Frames 01-06)
  frame02, // 02: Warrior prepares sword & leaps upward (Frames 07-12)
  frame03, // 03: Leaping into deep space towards colossal archway (Frames 13-18)
  frame04, // 04: Approaching monumental stone archway in nebula (Frames 19-24)
  frame05, // 05: Golden astrological runes wheel inside the arch (Frames 25-30)
  frame06, // 06: Close-up rotating golden runes vortex (Frames 31-34) - Gate circle opens
  frame07, // 07: Diving into golden stargate at warp speed (Frames 35-37) - Inside circle
  frame08, // 08: Emerging onto cyber platform overlooking giant sun (Frames 38-39) - Sun platform
  frame09, // 09: Panoramic Cyber Nexus of Ithaca 2026 (Frame 40)
];

// 5 Flagship Event Logos configured to pop up one by one AFTER entering inside the circular stargate portal (2nd image)
// and remain displayed through the giant sun cyber platform (1st image)
const POPUP_EVENTS = [
  {
    id: 'vizminds',
    title: 'VIZMINDS 3.0',
    subtitle: 'BI & Analytics Arena',
    prize: '₹3,000',
    logo: vizmindsLogo,
    start: 0.63,
    end: 0.68,
    glow: 'rgba(56, 189, 248, 0.5)',
    border: 'border-cyan-400/80',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  {
    id: 'founders-gone-wild',
    title: 'FOUNDERS GONE WILD',
    subtitle: 'Startup Challenge Circus',
    prize: '₹3,000',
    logo: foundersWildLogo,
    start: 0.68,
    end: 0.73,
    glow: 'rgba(168, 85, 247, 0.5)',
    border: 'border-purple-400/80',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'dataverse',
    title: 'DATAVERSE 5.0',
    subtitle: 'AI & Data Science Arena',
    prize: '₹3,000',
    logo: dataverseLogo,
    start: 0.73,
    end: 0.78,
    glow: 'rgba(245, 158, 11, 0.5)',
    border: 'border-amber-400/80',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'survival-showdown',
    title: 'SURVIVAL SHOWDOWN',
    subtitle: 'WWE 2K26 Esports',
    prize: '₹1,500',
    logo: survivalLogo,
    start: 0.78,
    end: 0.83,
    glow: 'rgba(244, 63, 94, 0.5)',
    border: 'border-rose-400/80',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'game-of-bids',
    title: 'GAME OF BIDS',
    subtitle: 'IPL Strategy Auction',
    prize: '₹4,000',
    logo: gameOfBidsLogo,
    start: 0.83,
    end: 0.88,
    glow: 'rgba(16, 185, 129, 0.5)',
    border: 'border-emerald-400/80',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
];

const TOTAL_FRAMES = 40;

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: string;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroCloud {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  speedY: number;
  driftX: number;
  opacity: number;
  hue: 'purple' | 'blue' | 'slate';
}

interface FlameSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export const OdysseyScrollJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [warpSpeed, setWarpSpeed] = useState(1);
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const heroCloudsRef = useRef<HeroCloud[]>([]);
  const flameSparksRef = useRef<FlameSpark[]>([]);
  const lastScrollTime = useRef<number>(Date.now());
  const lastScrollY = useRef<number>(0);

  // Initialize and autoplay hero warrior video for Frame 1
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = true;
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
    tryPlay();
    window.addEventListener('scroll', tryPlay, { once: true });
    window.addEventListener('click', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
    return () => {
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
  }, []);

  // Live countdown to 10th September 2026
  useEffect(() => {
    const targetDate = new Date('2026-09-10T09:00:00');
    const updateTime = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Preload all 9 keyframe images
  useEffect(() => {
    let count = 0;
    const loadedList: HTMLImageElement[] = [];

    KEYFRAME_SRCS.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        loadedList[idx] = img;
        if (count === KEYFRAME_SRCS.length) {
          imagesRef.current = loadedList;
          setImagesLoaded(true);
        }
      };
    });

    // Preload event logo assets
    [dataverseLogo, vizmindsLogo, survivalLogo, gameOfBidsLogo].forEach((src) => {
      const logoImg = new Image();
      logoImg.src = src;
    });

    // Initialize 130 3D hyperspace warp particles
    const particles: Particle[] = [];
    for (let i = 0; i < 130; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1000 + 1,
        size: Math.random() * 2.8 + 0.6,
        speed: Math.random() * 14 + 5,
        color: Math.random() > 0.6 ? '#F59E0B' : Math.random() > 0.3 ? '#38BDF8' : '#FFFFFF',
      });
    }
    particlesRef.current = particles;

    // Initialize 32 atmospheric clouds that fly from DOWN to UP across the sky
    const clouds: HeroCloud[] = [];
    for (let i = 0; i < 32; i++) {
      clouds.push({
        x: Math.random() * 2600 - 400,
        y: Math.random() * 850 - 50, // distributed vertically across sky and horizon
        radiusX: 180 + Math.random() * 240,
        radiusY: 60 + Math.random() * 90,
        speedY: 1.1 + Math.random() * 1.6, // Active vertical rise from down to up side
        driftX: (Math.random() - 0.45) * 0.4,
        opacity: 0.10 + Math.random() * 0.15, // Visible majestic presence
        hue: Math.random() > 0.6 ? 'purple' : Math.random() > 0.3 ? 'blue' : 'slate',
      });
    }
    heroCloudsRef.current = clouds;
  }, []);

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const currentY = -rect.top;

    let progress = currentY / totalHeight;
    progress = Math.max(0, Math.min(1, progress));

    setScrollProgress(progress);

    // Map progress directly to frame 1 - 40
    const frameNumber = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    setCurrentFrameNum(frameNumber);

    // Calculate dynamic warp velocity
    const now = Date.now();
    const dt = Math.max(16, now - lastScrollTime.current);
    const dy = Math.abs(window.scrollY - lastScrollY.current);
    const velocity = (dy / dt) * 16;
    setWarpSpeed(Math.min(15, Math.max(1, velocity)));

    lastScrollTime.current = now;
    lastScrollY.current = window.scrollY;

    // Pause hero video when scrolled past Frame 1 to save GPU, resume when back at Frame 1
    if (heroVideoRef.current) {
      if (progress > 0.12) {
        if (!heroVideoRef.current.paused) heroVideoRef.current.pause();
      } else {
        if (heroVideoRef.current.paused) heroVideoRef.current.play().catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || imagesRef.current.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      // We have 9 keyframes. We map the 0..1 progress across the 9 images.
      const totalKeyframes = imagesRef.current.length;
      const exactPos = scrollProgress * (totalKeyframes - 1);
      const baseIdx = Math.floor(exactPos);
      const nextIdx = Math.min(totalKeyframes - 1, baseIdx + 1);
      const blend = exactPos - baseIdx;

      const imgA = imagesRef.current[baseIdx];
      const imgB = imagesRef.current[nextIdx];

      // Deep celestial backdrop
      ctx.fillStyle = '#05070B';
      ctx.fillRect(0, 0, width, height);

      // Draw helper function with 'cover' aspect ratio & camera zoom
      let lastCoverRenderW = width;
      let lastCoverRenderH = height;
      let lastCoverOffsetX = 0;
      let lastCoverOffsetY = 0;

      const drawCover = (
        img: HTMLImageElement | HTMLVideoElement,
        alpha: number,
        scaleMultiplier: number = 1
      ) => {
        if (!img) return;
        ctx.save();
        ctx.globalAlpha = alpha;

        const imgWidth = 'videoWidth' in img ? (img.videoWidth || 1920) : img.width;
        const imgHeight = 'videoHeight' in img ? (img.videoHeight || 1080) : img.height;

        const imgRatio = imgWidth / imgHeight;
        const screenRatio = width / height;
        let renderW: number;
        let renderH: number;

        if (screenRatio > imgRatio) {
          renderW = width * scaleMultiplier;
          renderH = (width / imgRatio) * scaleMultiplier;
        } else {
          renderH = height * scaleMultiplier;
          renderW = height * imgRatio * scaleMultiplier;
        }

        // Camera shake during warp dive (frames 32 - 38)
        let shakeX = 0;
        let shakeY = 0;
        if (currentFrameNum >= 32 && currentFrameNum <= 38) {
          shakeX = (Math.random() - 0.5) * 6 * (warpSpeed / 5);
          shakeY = (Math.random() - 0.5) * 6 * (warpSpeed / 5);
        }

        const offsetX = (width - renderW) / 2 + shakeX;
        const offsetY = (height - renderH) / 2 + shakeY;

        lastCoverRenderW = renderW;
        lastCoverRenderH = renderH;
        lastCoverOffsetX = offsetX;
        lastCoverOffsetY = offsetY;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
        ctx.restore();
      };

      // Check if hero warrior video is ready and playing
      const heroVideo = heroVideoRef.current;
      const isVideoPlaying = Boolean(
        heroVideo && heroVideo.readyState >= 2 && !heroVideo.paused
      );

      // Hero Frame: Draw authentic video on Image 1, with imgA as seamless instant fallback
      const zoomA = baseIdx === 0 ? 1.0 : 1.0 + blend * 0.06;
      const zoomB = 1.06 - blend * 0.06;

      if (baseIdx === 0) {
        if (isVideoPlaying && heroVideo) {
          drawCover(heroVideo, 1 - blend, 1.0);
        } else if (imgA) {
          drawCover(imgA, 1 - blend, 1.0);
        }
      } else {
        if (imgA) drawCover(imgA, 1 - blend, zoomA);
      }

      if (imgB && blend > 0) drawCover(imgB, blend, zoomB);

      // --- PROCEDURAL ANIMATIONS (Active only if video is NOT playing) ---
      const animAlpha = 1 - blend;
      if (!isVideoPlaying && baseIdx === 0 && animAlpha > 0.01) {
        const renderW = lastCoverRenderW;
        const renderH = lastCoverRenderH;
        const offsetX = lastCoverOffsetX;
        const offsetY = lastCoverOffsetY;

        // 1. CLOUD FLY ANIMATION (Clouds flying from DOWN to UP side)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        heroCloudsRef.current.forEach((c) => {
          // Fly from down to up!
          c.y -= c.speedY;
          c.x += c.driftX;

          // Wrap around: when exiting above the top of screen, restart below horizon
          const skyBottom = offsetY + 0.58 * renderH;
          if (c.y + c.radiusY < -120) {
            c.y = skyBottom + c.radiusY + Math.random() * 60;
            c.x = Math.random() * (width + 500) - 250;
          }

          if (c.y > -150 && c.y < height * 0.75) {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.scale(1, c.radiusY / c.radiusX);

            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, c.radiusX);
            const clr =
              c.hue === 'purple'
                ? `rgba(185, 165, 235, ${c.opacity * animAlpha})`
                : c.hue === 'blue'
                ? `rgba(145, 195, 245, ${c.opacity * animAlpha})`
                : `rgba(205, 220, 235, ${c.opacity * animAlpha})`;
            const midClr =
              c.hue === 'purple'
                ? `rgba(125, 105, 185, ${c.opacity * 0.55 * animAlpha})`
                : `rgba(95, 135, 185, ${c.opacity * 0.55 * animAlpha})`;

            grad.addColorStop(0, clr);
            grad.addColorStop(0.55, midClr);
            grad.addColorStop(1, 'rgba(5, 7, 11, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, c.radiusX, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
        ctx.restore();

        // 2. ODYSSEY HERO WARRIOR CAPE FLY ANIMATION (Seamless 2D Cloth Mesh Physics)
        // Cape bounds in imgA (1376x768): x: 745 to 1085, y: 345 to 635
        const capeSrcX = 745;
        const capeSrcY = 345;
        const capeSrcW = 340;
        const capeSrcH = 290;

        const capeScreenX = offsetX + (capeSrcX / 1376) * renderW;
        const capeScreenY = offsetY + (capeSrcY / 768) * renderH;
        const capeScreenW = (capeSrcW / 1376) * renderW;
        const capeScreenH = (capeSrcH / 768) * renderH;

        const time = Date.now() * 0.007;

        // 2D grid resolution for seamless cloth deformation
        const cols = 28;
        const rows = 18;
        const srcCellW = capeSrcW / cols;
        const srcCellH = capeSrcH / rows;
        const screenCellW = capeScreenW / cols;
        const screenCellH = capeScreenH / rows;

        // Dynamic wind gust cycle matching the video's dramatic wind
        const windGust = 1 + Math.sin(time * 2.8) * 0.35 + Math.cos(time * 5.5) * 0.15;

        ctx.save();
        ctx.globalAlpha = animAlpha;

        // Draw 2D cloth grid with mathematically continuous edge pinning:
        // Pinning factor is strictly 0 at all 4 outer boundaries (top, bottom, shield-left, smoke-right)
        // Therefore, NO rectangular edges, seams, or cuts can EVER appear!
        for (let r = 0; r < rows; r++) {
          const v = (r + 0.5) / rows;
          // Smooth vertical pin: 0 at top edge (sky), 0 at bottom edge (ground/sword), peak in middle
          const pinY = Math.sin(v * Math.PI);

          for (let c = 0; c < cols; c++) {
            const u = (c + 0.5) / cols;
            // Smooth horizontal pin: 0 at shield rim, builds outward, smoothly tapers to 0 at smoke boundary
            const pinX = Math.sin(u * Math.PI * 0.5) * (u < 0.82 ? 1.0 : Math.max(0, 1.0 - (u - 0.82) / 0.18));

            const edgePin = Math.max(0, pinX * pinY);

            // Multi-frequency wind flutter wave matching the video
            const waveY =
              (Math.sin(time * 6.5 - u * 5.2 + v * 1.5) * 15 +
               Math.sin(time * 12.5 - u * 9.0) * 6.5 +
               Math.sin(time * 18 - u * 13.0) * 2.5) *
              edgePin *
              windGust;

            const waveX =
              (Math.cos(time * 5.2 - u * 4.5) * 7.0 +
               Math.sin(time * 10.5 - u * 7.5) * 3.5) *
              edgePin *
              windGust;

            const srcX = capeSrcX + c * srcCellW;
            const srcY = capeSrcY + r * srcCellH;
            const dx = capeScreenX + c * screenCellW + waveX;
            const dy = capeScreenY + r * screenCellH + waveY;
            const dw = screenCellW + 0.8;
            const dh = screenCellH + 0.8;

            if (imgA) {
              ctx.drawImage(
                imgA,
                srcX,
                srcY,
                srcCellW,
                srcCellH,
                dx,
                dy,
                dw,
                dh
              );
            }
          }
        }

        // Draw pristine static shield rim right over the junction so shield stays 100% rigid & motionless
        const shieldRimSrcX = 720;
        const shieldRimSrcW = 55;
        const shieldRimScreenX = offsetX + (shieldRimSrcX / 1376) * renderW;
        const shieldRimScreenW = (shieldRimSrcW / 1376) * renderW;
        if (imgA) {
          ctx.drawImage(
            imgA,
            shieldRimSrcX,
            capeSrcY,
            shieldRimSrcW,
            capeSrcH,
            shieldRimScreenX,
            capeScreenY,
            shieldRimScreenW + 0.5,
            capeScreenH
          );
        }
        ctx.restore();

        // 3. FLAME ANIMATION (Spear tip blazing fire + battlefield bonfires)
        // Ground war bonfires (Left: u=0.145, v=0.74, Right: u=0.835, v=0.77)
        const g1X = offsetX + 0.145 * renderW;
        const g1Y = offsetY + 0.74 * renderH;
        const g2X = offsetX + 0.835 * renderW;
        const g2Y = offsetY + 0.77 * renderH;

        [
          { x: g1X, y: g1Y, r: 42 },
          { x: g2X, y: g2Y, r: 36 },
        ].forEach((fire) => {
          const fPulse = 1 + Math.sin(time * 5 + fire.x) * 0.2 + Math.cos(time * 11) * 0.1;
          const fGrad = ctx.createRadialGradient(fire.x, fire.y, 0, fire.x, fire.y, fire.r * fPulse);
          fGrad.addColorStop(0, `rgba(255, 175, 45, ${0.48 * animAlpha})`);
          fGrad.addColorStop(0.5, `rgba(255, 75, 5, ${0.22 * animAlpha})`);
          fGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = fGrad;
          ctx.beginPath();
          ctx.arc(fire.x, fire.y, fire.r * fPulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Spearhead coordinates (spear blade: u=0.373, v=0.735, tip: u=0.354, v=0.768)
        const spearX = offsetX + 0.373 * renderW;
        const spearY = offsetY + 0.735 * renderH;
        const tipX = offsetX + 0.354 * renderW;
        const tipY = offsetY + 0.768 * renderH;

        // Radiant golden/amber spearhead glow aura
        const flarePulse = 1 + Math.sin(time * 7) * 0.16 + Math.cos(time * 13) * 0.08;
        const flareRadius = 48 * flarePulse;
        const flareGrad = ctx.createRadialGradient(spearX, spearY, 2, spearX, spearY, flareRadius);
        flareGrad.addColorStop(0, `rgba(255, 255, 220, ${0.95 * animAlpha})`);
        flareGrad.addColorStop(0.25, `rgba(255, 185, 35, ${0.75 * animAlpha})`);
        flareGrad.addColorStop(0.6, `rgba(255, 85, 10, ${0.35 * animAlpha})`);
        flareGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(spearX, spearY, flareRadius, 0, Math.PI * 2);
        ctx.fill();

        // Multi-tongue licking fire flames rising from the spearhead
        const flameTongues = [
          { offsetX: -3, offsetY: -5, height: 42, width: 15, speed: 8, sway: 5, clr: 'rgba(255, 90, 10,' },
          { offsetX: 4, offsetY: -3, height: 36, width: 12, speed: 10, sway: -4, clr: 'rgba(255, 140, 20,' },
          { offsetX: 0, offsetY: -8, height: 48, width: 14, speed: 7, sway: 6, clr: 'rgba(255, 210, 50,' },
          { offsetX: 1, offsetY: -4, height: 28, width: 9, speed: 12, sway: 3, clr: 'rgba(255, 255, 210,' },
        ];

        flameTongues.forEach((t) => {
          const sway = Math.sin(time * t.speed + t.offsetX) * t.sway;
          const curH = t.height * (1 + Math.sin(time * (t.speed + 3)) * 0.18);
          const topX = spearX + t.offsetX + sway;
          const topY = spearY + t.offsetY - curH;

          const tongueGrad = ctx.createLinearGradient(spearX, spearY, topX, topY);
          tongueGrad.addColorStop(0, `${t.clr} ${0.95 * animAlpha})`);
          tongueGrad.addColorStop(0.6, `${t.clr} ${0.65 * animAlpha})`);
          tongueGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');

          ctx.fillStyle = tongueGrad;
          ctx.beginPath();
          ctx.moveTo(spearX + t.offsetX - t.width / 2, spearY + t.offsetY);
          ctx.quadraticCurveTo(spearX + t.offsetX - t.width / 4, spearY - curH * 0.5, topX, topY);
          ctx.quadraticCurveTo(spearX + t.offsetX + t.width / 4, spearY - curH * 0.5, spearX + t.offsetX + t.width / 2, spearY + t.offsetY);
          ctx.closePath();
          ctx.fill();
        });
        ctx.restore();

        // Spawn 2 new sparks/embers per frame along the spear blade
        if (flameSparksRef.current.length < 45) {
          for (let i = 0; i < 2; i++) {
            const lerp = Math.random();
            const spawnX = spearX * (1 - lerp) + tipX * lerp + (Math.random() - 0.5) * 6;
            const spawnY = spearY * (1 - lerp) + tipY * lerp + (Math.random() - 0.5) * 6;
            flameSparksRef.current.push({
              x: spawnX,
              y: spawnY,
              vx: (Math.random() - 0.45) * 1.8,
              vy: -Math.random() * 2.8 - 1.2,
              size: Math.random() * 3.2 + 1.2,
              life: 0,
              maxLife: 25 + Math.random() * 30,
              color: Math.random() > 0.6 ? '#FEF08A' : Math.random() > 0.3 ? '#F59E0B' : '#EF4444',
            });
          }
        }

        // Update and draw rising sparks/embers
        for (let i = flameSparksRef.current.length - 1; i >= 0; i--) {
          const spark = flameSparksRef.current[i];
          spark.x += spark.vx + (Math.random() - 0.5) * 0.6;
          spark.y += spark.vy;
          spark.life++;

          if (spark.life >= spark.maxLife) {
            flameSparksRef.current.splice(i, 1);
            continue;
          }

          const progress = spark.life / spark.maxLife;
          const currentAlpha = (1 - progress) * animAlpha;
          const curSize = spark.size * (1 - progress * 0.6);

          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, curSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();
      }

      // Atmospheric vignette
      const radialGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.82
      );
      radialGrad.addColorStop(0, 'rgba(5, 7, 11, 0.1)');
      radialGrad.addColorStop(0.65, 'rgba(5, 7, 11, 0.45)');
      radialGrad.addColorStop(1, 'rgba(5, 7, 11, 0.94)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Hyperspace warp star particles
      particlesRef.current.forEach((p) => {
        p.z -= p.speed * warpSpeed * 0.42;
        if (p.z <= 1) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * 2200;
          p.y = (Math.random() - 0.5) * 2200;
        }

        const k = 260 / p.z;
        const px = p.x * k + width / 2;
        const py = p.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const trailLength = Math.min(50, (1000 / p.z) * (warpSpeed * 0.85));
          const prevK = 260 / (p.z + trailLength);
          const prevX = p.x * prevK + width / 2;
          const prevY = p.y * prevK + height / 2;

          ctx.save();
          const pAlpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 800));
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = pAlpha * 0.8;
          ctx.lineWidth = Math.max(1, p.size * (200 / p.z));
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, p.size * (200 / p.z)), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Subtle CRT / holographic scanlines
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.2);
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, imagesLoaded, warpSpeed, currentFrameNum]);

  // Opacity for the Hero overlay at the very beginning (scroll 0.0 - 0.14)
  const heroOpacity = Math.max(0, 1 - scrollProgress * 7.5);
  const heroTranslateY = -scrollProgress * 200;

  // Opacity for the floating Arenas button during animation scrolling (scroll 0.08 - 1.0)
  const arenasButtonOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.06) * 7));

  // Opacity for Stargate Event Logos popup:
  // Starts ONLY after entering inside the circular stargate portal (scrollProgress >= 0.63)
  // Reaches full presence as we dive into hyperspace, and stays shown through the giant sun cyber platform (until ~0.94)
  // Fades out gently as scroll completes and approaches events hub (~0.95 -> 0.98)
  const popupContainerOpacity =
    scrollProgress < 0.63
      ? 0
      : scrollProgress < 0.67
      ? (scrollProgress - 0.63) / 0.04
      : scrollProgress <= 0.94
      ? 1
      : scrollProgress <= 0.98
      ? 1 - (scrollProgress - 0.94) / 0.04
      : 0;

  // Individual card pop-up animation helper (scale, translateY, opacity with spring overshoot)
  const getCardPopupStyle = (progress: number, start: number, end: number) => {
    if (progress < start) {
      return {
        opacity: 0,
        transform: 'scale(0.2) translateY(50px)',
        pointerEvents: 'none' as const,
      };
    }
    const ratio = Math.min(1, (progress - start) / (end - start));
    // Dynamic pop: expands to 1.08 then settles at 1.0
    const scale =
      ratio < 0.75
        ? 0.2 + (ratio / 0.75) * 0.88
        : 1.08 - ((ratio - 0.75) / 0.25) * 0.08;
    const translateY = (1 - ratio) * 50;

    return {
      opacity: ratio,
      transform: `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`,
      pointerEvents: ratio > 0.4 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#05070B]"
      style={{ height: '580vh' }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* The 40-Frame Interactive Canvas */}
        <canvas
          ref={canvasRef}
          id="odyssey-canvas"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Authentic Hero Warrior Video for Image 1 Frame */}
        <video
          ref={heroVideoRef}
          src="/odyssey_hero_warrior.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '1px',
            height: '1px',
            opacity: 0,
            zIndex: -100,
          }}
        />

        {/* TOP LAYER: HERO SECTION (Visible at the very beginning from scroll 0.0 to 0.14) */}
        {heroOpacity > 0.01 && (
          <div
            id="hero-header-overlay"
            className="absolute inset-0 z-20 flex flex-col justify-between pt-16 sm:pt-20 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-opacity duration-150"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroTranslateY}px)`,
              pointerEvents: heroOpacity > 0.4 ? 'auto' : 'none',
            }}
          >
            {/* Top Title Group: Shifted up to sit gracefully in the celestial sky */}
            <div className="flex flex-col items-center text-center mt-1 sm:mt-2">
              {/* Interactive Main Headline with Dynamic Cosmic Hover Aura, Laser Beam, & Sparkles */}
              <div className="relative group inline-block cursor-pointer select-none mb-2 px-4 py-1 sm:py-2">
                {/* Radial Golden & Cosmic Cyan Aura that blooms on hover */}
                <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-amber-500/0 via-amber-400/25 via-cyan-400/20 to-amber-500/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Cosmic Sparkles that flare on hover */}
                <div className="absolute -top-2 -left-2 sm:-left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none">
                  <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300 animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 sm:-right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none">
                  <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-300 animate-pulse" />
                </div>

                {/* Main Headline with Holographic Shimmer and Spatial Lift */}
                <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-odyssey tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 via-yellow-300 to-amber-500 datadive-title-interactive drop-shadow-lg">
                  DATADIVE 5.0
                </h1>

                {/* Laser Horizon Beam expanding across the base on hover */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-0 group-hover:w-4/5 bg-gradient-to-r from-transparent via-amber-400 via-cyan-400 to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-[0_0_14px_#38bdf8] pointer-events-none" />
              </div>

              {/* Theme Subtitle */}
              <div className="flex items-center justify-center space-x-3">
                <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-xs sm:text-base md:text-lg font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold">
                  THE ODYSSEY
                </span>
                <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
            </div>

            {/* Bottom Group: Countdown Clock & Arenas Button moved down directly above the Scroll Indicator */}
            <div className="flex flex-col items-center text-center mt-auto pb-2">
              {/* Countdown Clock */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3.5 max-w-md w-full mb-3.5 sm:mb-4">
                {[
                  { label: 'DAYS', val: countdown.days },
                  { label: 'HOURS', val: countdown.hours },
                  { label: 'MINUTES', val: countdown.minutes },
                  { label: 'SECONDS', val: countdown.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-amber-500/30 backdrop-blur-md shadow-lg"
                  >
                    <span className="text-xl sm:text-3xl font-black font-mono text-amber-400">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-slate-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button: Arenas */}
              <div className="flex items-center justify-center mb-4 sm:mb-5">
                <a
                  id="hero-jump-arenas-btn"
                  href="#schedule"
                  className="inline-flex items-center space-x-2 px-8 py-3 rounded-full font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 transition-all shadow-xl shadow-amber-500/30 active:scale-95 cursor-pointer"
                >
                  <span>5 FLAGSHIP ARENAS</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Scroll Indicator Prompt */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-amber-300/80 uppercase mb-1.5 animate-pulse">
                  SCROLL TO EXPERIENCE THE 40-FRAME ODYSSEY
                </span>
                <div className="w-6 h-10 rounded-full border-2 border-amber-500/40 flex items-start justify-center p-1.5 backdrop-blur-sm bg-black/40">
                  <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ON THE ANIMATION SCROLLING SECTION: ONLY THE ARENAS BUTTON */}
        {arenasButtonOpacity > 0.01 && (
          <div
            id="scrolling-arenas-button-container"
            className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 pointer-events-auto transition-opacity duration-200"
            style={{ opacity: arenasButtonOpacity }}
          >
            <a
              id="hud-jump-arenas-link"
              href="#schedule"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-mono font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-xl shadow-amber-500/30 active:scale-95 flex items-center space-x-2 cursor-pointer"
            >
              <span>ARENAS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* EVENT LOGOS POPUP: Gate opens, warrior dives into circle vortex (2nd image) -> logos popup as we scroll -> shown until the giant sun cyber platform (1st image) */}
        {popupContainerOpacity > 0.01 && (
          <div
            id="portal-event-logos-overlay"
            className="absolute inset-x-0 bottom-3 sm:bottom-7 z-30 flex flex-col items-center justify-end px-3 sm:px-6 pointer-events-none transition-opacity duration-200"
            style={{ opacity: popupContainerOpacity }}
          >
            {/* Holographic Radar Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-amber-500/50 backdrop-blur-xl shadow-xl shadow-amber-500/10 mb-2 sm:mb-3 pointer-events-auto">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
                PORTAL SYNCHRONIZED • 5 FLAGSHIP ARENAS
              </span>
            </div>

            {/* Responsive 5-Column Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 max-w-6xl w-full">
              {POPUP_EVENTS.map((evt) => {
                const cardStyle = getCardPopupStyle(scrollProgress, evt.start, evt.end);
                return (
                  <a
                    key={evt.id}
                    id={`popup-logo-btn-${evt.id}`}
                    href={`#timeline-event-${evt.id}`}
                    className="group relative flex flex-col items-center p-2.5 sm:p-4 rounded-2xl bg-slate-950/90 border border-white/15 hover:border-amber-400/90 backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden text-center active:scale-95"
                    style={{
                      opacity: cardStyle.opacity,
                      transform: cardStyle.transform,
                      pointerEvents: cardStyle.pointerEvents,
                      boxShadow: cardStyle.opacity > 0.4 ? `0 12px 32px ${evt.glow}` : undefined,
                    }}
                  >
                    {/* Ambient Radial Glow in background of card */}
                    <div
                      className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
                      style={{ backgroundColor: evt.glow }}
                    />

                    {/* Event 3D Logo Crest */}
                    <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 border ${evt.border} shadow-lg mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform duration-300 bg-slate-900`}>
                      <img
                        src={evt.logo}
                        alt={evt.title}
                        className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Event Title */}
                    <h4 className="text-[11px] sm:text-xs md:text-sm font-black font-odyssey text-white group-hover:text-amber-300 tracking-wide transition-colors line-clamp-1">
                      {evt.title}
                    </h4>

                    {/* Subtitle / Category */}
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors line-clamp-1 mb-1">
                      {evt.subtitle}
                    </span>

                    {/* Prize Badge */}
                    <div className={`px-2 py-0.5 rounded-md border text-[8px] sm:text-[9px] font-mono font-bold tracking-wider ${evt.badge}`}>
                      PRIZE {evt.prize}
                    </div>

                    {/* Interactive prompt */}
                    <span className="mt-1 text-[8px] sm:text-[9px] font-mono text-amber-400 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>ENTER ARENA</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
