import React from 'react';

interface DataDiveChipLogoProps {
  className?: string;
}

export const DataDiveChipLogo: React.FC<DataDiveChipLogoProps> = ({
  className = 'w-10 h-10 sm:w-11 sm:h-11',
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden p-[1.5px] sm:p-[2px] bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 shadow-md shadow-amber-500/30 shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full rounded-[9px] sm:rounded-[10px] bg-[#030712]"
        aria-label="DataDive 5.0 Circuit Chip Logo"
      >
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="die-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#082245" />
            <stop offset="100%" stopColor="#020815" />
          </radialGradient>
        </defs>

        {/* Outer Dark PCB Surface */}
        <rect width="100" height="100" fill="#040814" />

        {/* Glowing Circuit Bus Traces */}
        <g stroke="#00e5ff" strokeWidth="1.6" opacity="0.9" filter="url(#neon-glow)">
          {/* Top Traces */}
          <path d="M50 0 V16" />
          <path d="M34 0 V10 L26 18" />
          <path d="M66 0 V10 L74 18" />
          <path d="M16 0 V8 L8 16" />
          <path d="M84 0 V8 L92 16" />

          {/* Bottom Traces */}
          <path d="M50 100 V84" />
          <path d="M34 100 V90 L26 82" />
          <path d="M66 100 V90 L74 82" />
          <path d="M16 100 V92 L8 84" />
          <path d="M84 100 V92 L92 84" />

          {/* Left Traces */}
          <path d="M0 50 H16" />
          <path d="M0 34 H10 L18 26" />
          <path d="M0 66 H10 L18 74" />

          {/* Right Traces */}
          <path d="M100 50 H84" />
          <path d="M100 34 H90 L82 26" />
          <path d="M100 66 H90 L82 74" />
        </g>

        {/* Circuit Solder Pad Nodes */}
        <g fill="#38bdf8" filter="url(#neon-glow)">
          <circle cx="50" cy="8" r="1.6" />
          <circle cx="26" cy="18" r="1.5" />
          <circle cx="74" cy="18" r="1.5" />
          <circle cx="50" cy="92" r="1.6" />
          <circle cx="26" cy="82" r="1.5" />
          <circle cx="74" cy="82" r="1.5" />
          <circle cx="8" cy="50" r="1.6" />
          <circle cx="92" cy="50" r="1.6" />
        </g>

        {/* Central Microprocessor Die (Dominant area for high text visibility) */}
        <rect
          x="18"
          y="18"
          width="64"
          height="64"
          rx="8"
          fill="url(#die-grad)"
          stroke="#00e5ff"
          strokeWidth="2"
          filter="url(#neon-glow)"
        />

        {/* Inner Die Border Accent */}
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="5"
          fill="none"
          stroke="#0369a1"
          strokeWidth="0.8"
          opacity="0.8"
        />

        {/* Bold High-Contrast Text */}
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="13.5"
          fontWeight="900"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          letterSpacing="0.4"
          filter="url(#neon-glow)"
        >
          DataDive
        </text>
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fill="#00f0ff"
          fontSize="14.5"
          fontWeight="900"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          letterSpacing="0.8"
          filter="url(#neon-glow)"
        >
          5.0
        </text>
      </svg>
    </div>
  );
};
