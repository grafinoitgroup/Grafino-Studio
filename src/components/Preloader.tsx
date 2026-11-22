import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GrafinoLogo } from './GrafinoLogo';

interface PreloaderProps {
  skip?: boolean;
  onComplete: () => void;
}

export function Preloader({ skip = false, onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(!skip);

  useEffect(() => {
    if (skip) {
      setVisible(false);
      onComplete();
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 850);

    return () => window.clearTimeout(timer);
  }, [skip, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="grafino-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-white"
          aria-label="Loading Grafino Studio"
        >
          <div className="flex w-full max-w-2xl items-center justify-center gap-6 px-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'right center' }}
              className="h-px flex-1 bg-[#262626]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 shrink-0"
            >
              <GrafinoLogo size={38} />
              <div className="flex flex-col">
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  GRAFINO
                </span>
                <span className="font-mono-tech text-[10px] text-[#EE7104]">
                  STUDIO
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
              className="h-px flex-1 bg-[#262626]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
