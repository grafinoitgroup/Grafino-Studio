import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { RoutePath, SHOWCASE_WORKS, ShowcaseWork } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface HorizontalTrackProps {
  onNavigate: (path: RoutePath) => void;
}

function ShowcaseMockup({ work }: { work: ShowcaseWork }) {
  if (work.image) {
    return (
      <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#0A0A0A]">
        <EditorialImage
          src={work.image}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  if (work.mockupStyle === 'web') {
    return (
      <div className="relative flex h-56 sm:h-64 w-full flex-col justify-between overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#0B0B0C] p-5 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#EE7104]" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </div>
          <span className="font-mono-tech text-[10px] text-[#9CA3AF]">
            WEB ARCHITECTURE
          </span>
        </div>
        <div className="grid grid-cols-12 gap-3 my-auto">
          <div className="col-span-7 space-y-2.5">
            <div className="h-3 w-20 bg-[#EE7104]/80" />
            <div className="h-6 w-full bg-white/90" />
            <div className="h-3 w-4/5 bg-white/20" />
          </div>
          <div className="col-span-5 flex flex-col justify-between border border-white/15 bg-white/5 p-3">
            <span className="font-mono-tech text-[9px] text-[#30B7F5]">PERF</span>
            <span className="font-display text-2xl font-bold tabular-nums">+60%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono-tech text-[9px] text-[#9CA3AF]">
          <span>GRID / 12-COL</span>
          <span>SEO READY</span>
          <span className="text-right text-white">500 LAUNCHED</span>
        </div>
      </div>
    );
  }

  if (work.mockupStyle === 'software') {
    return (
      <div className="relative flex h-56 sm:h-64 w-full flex-col justify-between overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#0B0B0C] p-5 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono-tech text-[10px] text-[#EB448B]">
            SYSTEM MODULES
          </span>
          <span className="font-mono-tech text-[10px] text-[#9CA3AF]">
            API / WORKFLOW
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 my-auto">
          <div className="border border-white/15 bg-white/[0.03] p-3">
            <p className="font-mono-tech text-[9px] text-[#9CA3AF]">CLIENT OPS</p>
            <div className="mt-3 flex items-end gap-1.5 h-14">
              <span className="w-1/4 bg-white/20 h-6" />
              <span className="w-1/4 bg-white/35 h-9" />
              <span className="w-1/4 bg-[#EE7104] h-14" />
              <span className="w-1/4 bg-[#30B7F5] h-11" />
            </div>
          </div>
          <div className="border border-white/15 bg-white/[0.03] p-3 flex flex-col justify-between">
            <p className="font-mono-tech text-[9px] text-[#9CA3AF]">DELIVERY</p>
            <div>
              <p className="font-display text-2xl font-bold tabular-nums">1,200</p>
              <p className="text-[11px] text-[#9CA3AF]">Completed builds</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono-tech text-[9px] text-[#9CA3AF]">
          <span>CUSTOM ARCHITECTURE</span>
          <span className="text-[#EE7104]">TAILORED SCOPE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-56 sm:h-64 w-full flex-col justify-between overflow-hidden rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#0B0B0C] p-5 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-mono-tech text-[10px] text-[#EE7104]">
          PAKISTAN&apos;S 1ST AI
        </span>
        <span className="font-mono-tech text-[10px] text-[#9CA3AF]">
          GRAFINOAI.QZZ.IO
        </span>
      </div>
      <div className="my-auto space-y-3">
        <div className="border border-[#EE7104]/40 bg-[#EE7104]/10 px-3.5 py-2.5">
          <p className="font-mono-tech text-[9px] text-[#EE7104]">GRAFINO AI PLATFORM</p>
          <p className="mt-1 font-display text-sm font-semibold text-white">
            Creative ideation, engineering velocity, and practical automation
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-white/10 p-2 font-mono-tech text-[9px] text-[#9CA3AF]">
            IDEATION
          </div>
          <div className="border border-white/10 p-2 font-mono-tech text-[9px] text-[#9CA3AF]">
            CONTENT
          </div>
          <div className="border border-white/10 p-2 font-mono-tech text-[9px] text-[#9CA3AF]">
            WORKFLOWS
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono-tech text-[9px] text-[#9CA3AF]">
        <span>GRAFINO STUDIO</span>
        <span className="text-white">LIVE PLATFORM</span>
      </div>
    </div>
  );
}

export function HorizontalTrack({ onNavigate }: HorizontalTrackProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      if (window.innerWidth < 1024 || !outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setProgress(ratio);
      setActiveIndex(Math.min(SHOWCASE_WORKS.length - 1, Math.round(ratio * (SHOWCASE_WORKS.length - 1))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stepCard = (dir: -1 | 1) => {
    const next = Math.min(Math.max(activeIndex + dir, 0), SHOWCASE_WORKS.length - 1);
    setActiveIndex(next);
    setProgress(next / Math.max(SHOWCASE_WORKS.length - 1, 1));
    if (mobileRailRef.current && window.innerWidth < 1024) {
      const cardWidth = mobileRailRef.current.clientWidth * 0.85;
      mobileRailRef.current.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
    }
  };

  const getTintClass = (tint: ShowcaseWork['tint']) => {
    if (tint === 'magenta') return 'tint-magenta-top';
    if (tint === 'cyan') return 'tint-cyan-top';
    return 'tint-orange-top';
  };

  return (
    <section
      id="selected-works"
      ref={outerRef}
      className="relative border-t border-[#E5E7EB] dark:border-[#262626] lg:h-[220vh]"
      aria-label="Selected Works and Featured Capabilities"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center overflow-hidden py-20 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Header Row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
                [ SELECTED WORKS / FEATURED TRACKS ]
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98]">
                PROJECT{' '}
                <span className="font-editorial font-normal text-[#EE7104]">index</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-[11px] text-[#52525B] dark:text-[#9CA3AF] tabular-nums mr-2">
                {String(activeIndex + 1).padStart(2, '0')} / {String(SHOWCASE_WORKS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => stepCard(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous featured showcase card"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white disabled:opacity-35 hover:border-[#EE7104] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => stepCard(1)}
                disabled={activeIndex === SHOWCASE_WORKS.length - 1}
                aria-label="Next featured showcase card"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white disabled:opacity-35 hover:border-[#EE7104] transition-colors cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop Scroll-Linked Track */}
          <div className="hidden lg:block overflow-hidden">
            <div
              className="flex gap-6 will-change-transform transition-transform duration-150 ease-out"
              style={{
                transform: `translate3d(-${progress * 42}%, 0, 0)`,
              }}
            >
              {SHOWCASE_WORKS.map((work) => (
                <article
                  key={work.id}
                  className={`group flex w-[460px] shrink-0 flex-col justify-between rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 ${getTintClass(
                    work.tint
                  )} transition-colors hover:border-[#EE7104]/70`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-5 font-mono-tech text-[11px]">
                      <span className="text-[#D46200] dark:text-[#EE7104] tabular-nums">
                        {work.index}
                      </span>
                      <span className="text-[#52525B] dark:text-[#9CA3AF]">
                        {work.category}
                      </span>
                    </div>

                    <ShowcaseMockup work={work} />

                    <div className="mt-6">
                      <p className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                        {work.discipline}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] dark:text-white">
                        {work.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                        {work.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] dark:border-[#262626] pt-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#52525B] dark:text-[#9CA3AF]">
                      {work.highlights.map((h, i) => (
                        <span key={h} className="inline-flex items-center gap-2">
                          <span>{h}</span>
                          {i < work.highlights.length - 1 && <span aria-hidden="true">/</span>}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(work.mockupStyle === 'ai' ? '/our-ai-tools' : '/services')
                      }
                      aria-label={`Explore ${work.title}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#0A0A0A] dark:text-white group-hover:border-[#EE7104] group-hover:text-[#EE7104] transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Touch-Swipe Track */}
          <div
            ref={mobileRailRef}
            className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
          >
            {SHOWCASE_WORKS.map((work) => (
              <article
                key={work.id}
                className={`group flex w-[85vw] sm:w-[400px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-5 ${getTintClass(
                  work.tint
                )}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 font-mono-tech text-[10px]">
                    <span className="text-[#D46200] dark:text-[#EE7104]">{work.index}</span>
                    <span className="text-[#52525B] dark:text-[#9CA3AF]">{work.category}</span>
                  </div>
                  <ShowcaseMockup work={work} />
                  <div className="mt-5">
                    <p className="text-xs text-[#52525B] dark:text-[#9CA3AF]">{work.discipline}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#0A0A0A] dark:text-white">
                      {work.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                      {work.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] dark:border-[#262626] pt-4">
                  <span className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                    {work.highlights[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(work.mockupStyle === 'ai' ? '/our-ai-tools' : '/services')
                    }
                    className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] cursor-pointer"
                  >
                    <span>EXPLORE</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Hairline progress rail */}
          <div className="mt-8 hidden lg:block h-px w-full bg-[#E5E7EB] dark:bg-[#262626]">
            <div
              className="h-full bg-[#EE7104] transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${Math.max(0.15, progress)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
