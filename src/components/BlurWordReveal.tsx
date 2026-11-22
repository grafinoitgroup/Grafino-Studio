import { useEffect, useRef, useState } from 'react';

interface BlurWordRevealProps {
  text: string;
  accentWords?: string[];
  className?: string;
}

/**
 * Progressive scroll-linked dim-to-bright and blur-to-sharp word-by-word reveal.
 * Renders immediately crisp and legible if prefers-reduced-motion is enabled.
 */
export function BlurWordReveal({
  text,
  accentWords = ['digital', 'confidence.'],
  className = '',
}: BlurWordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0.35);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setRevealProgress(1);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const raw = (vh * 0.88 - rect.top) / (vh * 0.62);
      setRevealProgress(Math.min(Math.max(raw, 0.2), 1));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = text.split(' ');
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase()));

  return (
    <div ref={containerRef} className={className}>
      <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.18] tracking-tight text-balance">
        {words.map((word, idx) => {
          const threshold = idx / Math.max(words.length - 1, 1);
          const localAlpha = reduced
            ? 1
            : Math.min(Math.max((revealProgress - threshold * 0.72) / 0.28, 0.22), 1);
          const blurPx = reduced ? 0 : (1 - localAlpha) * 4;
          const isAccent = accentSet.has(word.toLowerCase());

          return (
            <span
              key={`${word}-${idx}`}
              style={{
                opacity: localAlpha,
                filter: blurPx > 0.15 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
                transition: 'opacity 180ms ease-out, filter 180ms ease-out',
              }}
              className={`inline-block mr-[0.26em] ${
                isAccent
                  ? 'font-editorial font-normal text-[#EE7104]'
                  : 'text-[#0A0A0A] dark:text-white'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}
