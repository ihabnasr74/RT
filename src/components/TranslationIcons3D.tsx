import React from 'react';
import { Send, Calculator, Landmark, Languages, FileCheck2 } from 'lucide-react';

export function IconCompanyProfile({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="15" r="7" stroke="#26b5be" strokeWidth="2.5" fill="rgba(38,181,190,0.18)" />
      <circle cx="12" cy="19" r="5" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
      <circle cx="36" cy="19" r="5" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
      <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#26b5be" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 38c0-4.8 3.2-8.8 7.6-9.7M44 38c0-4.8-3.2-8.8-7.6-9.7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

export function IconDiamond({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <polygon
        points="24,42 6,18 14,8 34,8 42,18"
        stroke="#26b5be"
        strokeWidth="2.5"
        fill="rgba(38,181,190,0.18)"
        strokeLinejoin="round"
      />
      <line x1="6" y1="18" x2="42" y2="18" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
      <polyline points="14,8 20,18 24,42 28,18 34,8" stroke="#26b5be" strokeWidth="1.8" opacity="0.9" />
    </svg>
  );
}

export function IconGears({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="19" cy="20" r="6" stroke="#26b5be" strokeWidth="2.5" fill="rgba(38,181,190,0.2)" />
      <path
        d="M19 9v3M19 28v3M8 20h3M27 20h3M11.2 12.2l2.1 2.1M24.7 25.7l2.1 2.1M26.8 12.2l-2.1 2.1M13.3 25.7l-2.1 2.1"
        stroke="#26b5be"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="33" cy="32" r="4.5" stroke="#ffffff" strokeWidth="2.2" fill="rgba(255,255,255,0.12)" />
      <path
        d="M33 24v2M33 38v2M25 32h2M39 32h2M27.3 26.3l1.5 1.5M37.2 36.2l1.5 1.5M38.7 26.3l-1.5 1.5M28.8 36.2l-1.5 1.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconTransactions({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="6" width="24" height="32" rx="3" stroke="#26b5be" strokeWidth="2.5" fill="rgba(38,181,190,0.15)" />
      <line x1="15" y1="14" x2="29" y2="14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="20" x2="29" y2="20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="26" x2="23" y2="26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="33" cy="33" r="8" fill="#0d5c68" stroke="#26b5be" strokeWidth="2.5" />
      <polyline points="29.5,33 32,35.5 37,30.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTranslationProcessDoc({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Document Frame */}
      <rect
        x="8"
        y="5"
        width="28"
        height="36"
        rx="4"
        stroke="#67e8f9"
        strokeWidth="2.4"
        fill="rgba(38,181,190,0.16)"
      />
      {/* Gear inside Document */}
      <circle cx="22" cy="18" r="5" stroke="#ffffff" strokeWidth="2.2" fill="rgba(13,92,104,0.4)" />
      <path
        d="M22 10.5v2M22 23.5v2M14.5 18h2M27.5 18h2M16.7 12.7l1.4 1.4M25.9 21.9l1.4 1.4M27.3 12.7l-1.4 1.4M18.1 21.9l-1.4 1.4"
        stroke="#67e8f9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Document Lines */}
      <line x1="14" y1="29" x2="27" y2="29" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="34" x2="23" y2="34" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
      {/* Cursor Pointer Arrow */}
      <path
        d="M29 28l11 4.5-4.8 1.8 3.6 5.2-2.4 1.6-3.6-5.2-3.2 3.5L29 28z"
        fill="#0d5c68"
        stroke="#67e8f9"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTarget({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="17" stroke="#26b5be" strokeWidth="2.4" fill="rgba(38,181,190,0.12)" />
      <circle cx="24" cy="24" r="10" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
      <circle cx="24" cy="24" r="4" fill="#26b5be" />
      <line x1="38" y1="10" x2="25" y2="23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="38,10 43,9 39,14" fill="#26b5be" />
    </svg>
  );
}

export function IconShieldLock({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 5L9 11v12c0 10.5 6.4 18.8 15 21 8.6-2.2 15-10.5 15-21V11L24 5z"
        stroke="#26b5be"
        strokeWidth="2.5"
        fill="rgba(38,181,190,0.15)"
      />
      <rect x="18" y="22" width="12" height="10" rx="2" stroke="#ffffff" strokeWidth="2.2" fill="#0d5c68" />
      <path d="M20.5 22v-3a3.5 3.5 0 0 1 7 0v3" stroke="#26b5be" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="#26b5be" strokeWidth="2.5" fill="rgba(38,181,190,0.15)" />
      <polyline points="24,13 24,24 31,28" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="2.5" fill="#26b5be" />
    </svg>
  );
}

export function IconStepHexagon({
  stepNumber,
  className = 'w-20 h-20',
}: {
  stepNumber: number;
  className?: string;
}) {
  const palette: Record<number, { ring: string; accent: string; glow: string }> = {
    1: { ring: '#34d399', accent: '#6ee7b7', glow: 'rgba(52, 211, 153, 0.25)' },
    2: { ring: '#fbbf24', accent: '#fde68a', glow: 'rgba(251, 191, 36, 0.25)' },
    3: { ring: '#38bdf8', accent: '#bae6fd', glow: 'rgba(56, 189, 248, 0.25)' },
    4: { ring: '#22d3ee', accent: '#a5f3fc', glow: 'rgba(34, 211, 238, 0.28)' },
    5: { ring: '#fb7185', accent: '#fecdd3', glow: 'rgba(251, 113, 133, 0.25)' },
  };
  const theme = palette[stepNumber] || palette[4];

  const renderGlyph = () => {
    switch (stepNumber) {
      case 1:
        return <Send className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]" strokeWidth={2.2} />;
      case 2:
        return <Calculator className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]" strokeWidth={2.2} />;
      case 3:
        return <Landmark className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]" strokeWidth={2.2} />;
      case 4:
        return <Languages className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" strokeWidth={2.2} />;
      case 5:
      default:
        return <FileCheck2 className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(251,113,133,0.9)]" strokeWidth={2.2} />;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer 3D Gyroscope Orbital SVG */}
      <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={theme.ring}
          strokeWidth="1.5"
          strokeDasharray="6 5"
          opacity="0.7"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="18"
          stroke={theme.accent}
          strokeWidth="1.4"
          transform="rotate(-28 50 50)"
          opacity="0.55"
        />
        <polygon
          points="50,8 86,29 86,71 50,92 14,71 14,29"
          fill="rgba(5, 34, 42, 0.92)"
          stroke={theme.ring}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon
          points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
          fill={theme.glow}
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="8" r="2.8" fill={theme.accent} />
        <circle cx="50" cy="92" r="2.8" fill={theme.accent} />
      </svg>

      {/* Precision Vector Glyph Core */}
      <div className="relative z-10 flex items-center justify-center">
        {renderGlyph()}
      </div>
    </div>
  );
}

export function IconContactChannel({
  type,
  className = 'w-12 h-12',
}: {
  type: 'Email' | 'Whatsapp' | 'Hotline';
  className?: string;
}) {
  if (type === 'Email') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <rect x="6" y="10" width="36" height="28" rx="5" fill="rgba(38,181,190,0.18)" stroke="#26b5be" strokeWidth="2.5" />
        <polyline points="8,13 24,26 40,13" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'Whatsapp') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="rgba(38,181,190,0.18)" stroke="#26b5be" strokeWidth="2.5" />
        <path
          d="M15 33l2.2-6.2a12 12 0 1 1 4.5 4.4L15 33z"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M20 18c-.5 0-1.3.4-1.5 1.3-.2 1 .4 2.8 2.2 4.6 1.8 1.8 3.6 2.4 4.6 2.2.9-.2 1.3-1 1.3-1.5 0-.4-.8-1-1.4-1.2-.5-.2-.9 0-1.2.4-.3.3-.6.4-1 .2-.7-.3-1.8-1-2.5-1.7-.7-.7-1.4-1.8-1.7-2.5-.2-.4-.1-.7.2-1 .4-.3.6-.7.4-1.2-.2-.6-.8-1.4-1.2-1.4z"
          fill="#26b5be"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M12 24a12 12 0 0 1 24 0" stroke="#26b5be" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="8" y="22" width="6" height="11" rx="3" fill="#26b5be" />
      <rect x="34" y="22" width="6" height="11" rx="3" fill="#26b5be" />
      <circle cx="24" cy="21" r="6" stroke="#ffffff" strokeWidth="2.2" fill="rgba(38,181,190,0.15)" />
      <path d="M15 39c1.8-4.5 5-7 9-7s7.2 2.5 9 7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M36 33c0 4-4 6-10 6" stroke="#26b5be" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function WideWorldParallaxBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ambient Deep Turquoise & Cyan Radial Glows */}
      <div
        data-gsap-bg-parallax="-90"
        className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(38,181,190,0.22) 0%, rgba(38,181,190,0) 70%)',
        }}
      />
      <div
        data-gsap-bg-parallax="110"
        className="absolute top-[28%] -right-28 w-[580px] h-[580px] rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(24,164,173,0.2) 0%, rgba(13,92,104,0) 70%)',
        }}
      />
      <div
        data-gsap-bg-parallax="-120"
        className="absolute bottom-10 left-[12%] w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(38,181,190,0.2) 0%, rgba(38,181,190,0) 70%)',
        }}
      />

      {/* Wide-World Geodesic & Translation Exchange Emblem 1 (Top Right) */}
      <svg
        data-gsap-bg-parallax="-140"
        data-gsap-bg-rotate="24"
        viewBox="0 0 320 320"
        fill="none"
        className="absolute top-[10%] right-[4%] w-64 h-64 sm:w-80 sm:h-80 opacity-22"
      >
        <circle cx="160" cy="160" r="130" stroke="#38d3de" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="160" cy="160" r="98" stroke="#26b5be" strokeWidth="1.8" />
        <ellipse cx="160" cy="160" rx="130" ry="52" stroke="#38d3de" strokeWidth="1.8" />
        <ellipse cx="160" cy="160" rx="52" ry="130" stroke="#38d3de" strokeWidth="1.8" />
        <rect x="62" y="62" width="76" height="62" rx="14" stroke="#67e8f9" strokeWidth="3" fill="rgba(13,92,104,0.35)" />
        <rect x="182" y="196" width="76" height="62" rx="14" stroke="#26b5be" strokeWidth="3" fill="rgba(13,92,104,0.35)" />
        <path d="M150 86h52l-14-14M170 234h-52l14 14" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Colorful 3D Speech Bubbles Cluster (Matching Center of Portfolio Images) */}
      <svg
        data-gsap-bg-parallax="160"
        data-gsap-bg-rotate="-15"
        viewBox="0 0 360 280"
        fill="none"
        className="absolute top-[42%] left-[5%] w-72 h-56 sm:w-96 sm:h-72 opacity-22"
      >
        <rect x="30" y="24" width="160" height="102" rx="22" fill="#f4b4b8" stroke="#e17c83" strokeWidth="2.5" />
        <polygon points="70,126 55,156 102,126" fill="#f4b4b8" />
        <circle cx="78" cy="75" r="8" fill="#ffffff" />
        <circle cx="110" cy="75" r="8" fill="#ffffff" />
        <circle cx="142" cy="75" r="8" fill="#ffffff" />

        <rect x="165" y="68" width="155" height="96" rx="22" fill="#a7dbb8" stroke="#5bb377" strokeWidth="2.5" />
        <polygon points="275,164 295,192 248,164" fill="#a7dbb8" />
        <circle cx="212" cy="116" r="7.5" fill="#ffffff" />
        <circle cx="242" cy="116" r="7.5" fill="#ffffff" />
        <circle cx="272" cy="116" r="7.5" fill="#ffffff" />

        <rect x="95" y="138" width="145" height="90" rx="20" fill="#a3c9e2" stroke="#5393bd" strokeWidth="2.5" />
        <polygon points="145,228 132,254 172,228" fill="#a3c9e2" />
        <circle cx="138" cy="183" r="7" fill="#ffffff" />
        <circle cx="168" cy="183" r="7" fill="#ffffff" />
        <circle cx="198" cy="183" r="7" fill="#ffffff" />
      </svg>

      {/* Wide-World Translation Meridian Ring 2 (Bottom Right) */}
      <svg
        data-gsap-bg-parallax="-180"
        data-gsap-bg-rotate="-28"
        viewBox="0 0 320 320"
        fill="none"
        className="absolute bottom-[8%] right-[6%] w-64 h-64 sm:w-80 sm:h-80 opacity-22"
      >
        <circle cx="160" cy="160" r="136" stroke="#26b5be" strokeWidth="2" />
        <circle cx="160" cy="160" r="104" stroke="#67e8f9" strokeWidth="1.8" strokeDasharray="10 6" />
        <ellipse cx="160" cy="160" rx="136" ry="58" stroke="#26b5be" strokeWidth="1.8" transform="rotate(30 160 160)" />
        <ellipse cx="160" cy="160" rx="136" ry="58" stroke="#67e8f9" strokeWidth="1.8" transform="rotate(-30 160 160)" />
      </svg>
    </div>
  );
}

// ============================================================================
// 9. SEMI-TRANSPARENT VEIL OVER 3D EARTH + CENTRAL VOLUMETRIC LIGHT BEAM
//    + SUBTLE FLOATING DUST MOTES (z-[2], directly above ThreeWorldCanvas z-[1])
// ============================================================================
const LIGHT_BEAM_DUST_MOTES = [
  { left: '48.5%', top: '7%', size: 3.5, delay: '0s', dur: '9s', parallax: -60, color: '#ffffff' },
  { left: '52.2%', top: '12%', size: 2.5, delay: '1.2s', dur: '11s', parallax: -90, color: '#a5f3fc' },
  { left: '46.0%', top: '16%', size: 4.0, delay: '2.4s', dur: '10s', parallax: -45, color: '#fde68a' },
  { left: '54.1%', top: '21%', size: 2.8, delay: '0.7s', dur: '12s', parallax: -110, color: '#ffffff' },
  { left: '49.8%', top: '26%', size: 3.2, delay: '3.1s', dur: '8.5s', parallax: -75, color: '#67e8f9' },
  { left: '44.4%', top: '31%', size: 2.2, delay: '1.8s', dur: '10.5s', parallax: -55, color: '#ffffff' },
  { left: '55.6%', top: '35%', size: 3.8, delay: '4.0s', dur: '9.5s', parallax: -130, color: '#fde68a' },
  { left: '47.9%', top: '40%', size: 2.6, delay: '2.1s', dur: '11.5s', parallax: -80, color: '#a5f3fc' },
  { left: '51.5%', top: '44%', size: 4.2, delay: '0.4s', dur: '10s', parallax: -95, color: '#ffffff' },
  { left: '43.2%', top: '49%', size: 2.4, delay: '3.6s', dur: '12.5s', parallax: -65, color: '#67e8f9' },
  { left: '56.8%', top: '53%', size: 3.0, delay: '1.5s', dur: '9s', parallax: -115, color: '#ffffff' },
  { left: '49.1%', top: '58%', size: 3.6, delay: '2.9s', dur: '10.8s', parallax: -70, color: '#fde68a' },
  { left: '53.0%', top: '63%', size: 2.5, delay: '0.9s', dur: '11.2s', parallax: -105, color: '#a5f3fc' },
  { left: '45.5%', top: '68%', size: 3.4, delay: '4.2s', dur: '9.8s', parallax: -85, color: '#ffffff' },
  { left: '51.0%', top: '73%', size: 2.8, delay: '1.7s', dur: '10.4s', parallax: -60, color: '#67e8f9' },
  { left: '47.2%', top: '78%', size: 3.9, delay: '3.3s', dur: '11.8s', parallax: -120, color: '#fde68a' },
  { left: '54.4%', top: '83%', size: 2.4, delay: '2.0s', dur: '9.2s', parallax: -75, color: '#ffffff' },
  { left: '48.8%', top: '88%', size: 3.2, delay: '0.5s', dur: '10.6s', parallax: -90, color: '#a5f3fc' },
  { left: '52.0%', top: '93%', size: 2.6, delay: '2.7s', dur: '11.0s', parallax: -50, color: '#ffffff' },
];

export function EarthVeilAndLightBeam() {
  return (
    <div
      data-testid="earth-veil-and-light-beam"
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Semi-Transparent Dark-Turquoise Veil directly over the 3D Earth Globe for crisp text clarity */}
      <div className="earth-translucent-veil absolute inset-0" />

      {/* 2. Central Volumetric Light Beam streaming down the middle of the page */}
      <div className="volumetric-light-beam-outer absolute inset-0" />
      <div className="volumetric-light-beam-core absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[540px] md:w-[720px]" />
      <div className="volumetric-light-crown absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] sm:w-[820px] h-[380px]" />

      {/* 3. Subtle Shimmering Dust Motes suspended inside the Central Light Beam */}
      {LIGHT_BEAM_DUST_MOTES.map((mote, idx) => (
        <span
          key={idx}
          data-gsap-bg-parallax={String(mote.parallax)}
          className="light-beam-dust-mote absolute rounded-full"
          style={{
            left: mote.left,
            top: mote.top,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            backgroundColor: mote.color,
            boxShadow: `0 0 ${mote.size * 3.5}px ${mote.color}`,
            animationDelay: mote.delay,
            animationDuration: mote.dur,
          }}
        />
      ))}
    </div>
  );
}

