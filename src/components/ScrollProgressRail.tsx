import { useEffect, useState } from 'react';

const DOTS = [0, 0.25, 0.5, 0.75, 1];

export function ScrollProgressRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(Math.max(window.scrollY / docHeight, 0), 1));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jumpTo = (ratio: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.round(docHeight * ratio), behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Page scroll progress"
      className="fixed right-4 top-1/2 z-30 hidden xl:flex -translate-y-1/2 flex-col items-center gap-3"
    >
      {DOTS.map((step, idx) => {
        const isActive = Math.abs(progress - step) < 0.14;
        return (
          <button
            key={step}
            type="button"
            onClick={() => jumpTo(step)}
            aria-label={`Jump to section ${idx + 1}`}
            className="group flex h-4 w-4 items-center justify-center cursor-pointer"
          >
            <span
              className={`block rounded-full transition-all duration-200 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-[#EE7104]'
                  : 'h-1.5 w-1.5 bg-[#A1A1AA] dark:bg-[#3F3F46] group-hover:bg-[#EE7104]'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
