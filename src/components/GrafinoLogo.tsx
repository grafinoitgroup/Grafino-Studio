import { useState } from 'react';
import { STUDIO_INFO } from '../data/studioData';

interface GrafinoLogoProps {
  size?: number;
  className?: string;
}

/**
 * Renders the Grafino Studio emblem.
 * If STUDIO_INFO.logoSrc is set (e.g. './logo.webp' or '/Grafino studio.webp'),
 * it loads the image asset cleanly; otherwise it renders the crisp geometric emblem
 * crafted in the exact brand palette (#EE7104, #EB448B, #30B7F5).
 */
export function GrafinoLogo({ size = 32, className = '' }: GrafinoLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (STUDIO_INFO.logoSrc && !imgFailed) {
    return (
      <img
        src={STUDIO_INFO.logoSrc}
        alt="Grafino Studio logo"
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`object-contain shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="10"
        className="fill-[#0B0B0B] dark:fill-[#111111] stroke-[#262626]"
        strokeWidth="1.5"
      />
      {/* Architectural G monogram geometry in verified logo hues */}
      <path
        d="M32.5 16.2C30.4 13.7 27.3 12.2 23.8 12.2C17.4 12.2 12.2 17.4 12.2 23.8C12.2 30.2 17.4 35.4 23.8 35.4C29.4 35.4 34.1 31.4 35.1 26.1H24.2"
        stroke="#EE7104"
        strokeWidth="3.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M24.2 22.4H35.5V26.2"
        stroke="#30B7F5"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <rect x="31.5" y="13.5" width="4.5" height="4.5" fill="#EB448B" />
    </svg>
  );
}
