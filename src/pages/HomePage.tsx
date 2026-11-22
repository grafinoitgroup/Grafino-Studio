import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import {
  HOME_CAPABILITIES,
  HOME_FAQS,
  PHILOSOPHY_STATEMENT,
  RoutePath,
  STUDIO_INFO,
  StudioMetric,
  VERIFIED_METRICS,
} from '../data/studioData';
import { SubmissionSummary, formatStudioClock } from '../utils/studioLogic';
import { BlurWordReveal } from '../components/BlurWordReveal';
import { ContactInquiryForm } from '../components/ContactInquiryForm';
import { EditorialImage } from '../components/EditorialImage';
import { FaqAccordion } from '../components/FaqAccordion';
import { HorizontalTrack } from '../components/HorizontalTrack';
import { TeamQuoteCarousel } from '../components/TeamQuoteCarousel';
import { ThreeDShowcase } from '../components/ThreeDShowcase';

interface HomePageProps {
  theme: 'dark' | 'light';
  onNavigate: (path: RoutePath) => void;
  onSubmitted: (summary: SubmissionSummary) => void;
  onSocialPlaceholderClick: (network: string) => void;
}

function AnimatedMetricCard({ metric, index }: { metric: StudioMetric; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(metric.displayValue);
  const animatedOnceRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(metric.displayValue);
      return;
    }

    const node = cardRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !animatedOnceRef.current) {
          animatedOnceRef.current = true;
          const duration = 900;
          const start = performance.now();
          const target = metric.numericValue;

          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(target * eased);
            const formatted =
              target >= 1000 ? current.toLocaleString('en-US') : String(current);
            setDisplay(`${formatted}${metric.suffix}`);
            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(metric.displayValue);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [metric]);

  const tintClasses = ['tint-orange-top', 'tint-cyan-top', 'tint-magenta-top'];

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-7 ${
        tintClasses[index % 3]
      } transition-colors hover:border-[#EE7104]/60`}
    >
      <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
        <span className="text-[#D46200] dark:text-[#EE7104] tabular-nums">
          [ {String(index + 1).padStart(2, '0')} ]
        </span>
        <span>VERIFIED MILESTONE</span>
      </div>
      <p className="mt-5 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white tabular-nums">
        {display}
      </p>
      <h3 className="mt-2 font-display text-lg font-bold text-[#0A0A0A] dark:text-white">
        {metric.label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
        {metric.detail}
      </p>
    </div>
  );
}

export function HomePage({
  theme,
  onNavigate,
  onSubmitted,
  onSocialPlaceholderClick,
}: HomePageProps) {
  const [clock, setClock] = useState(() => formatStudioClock());
  const [heroScrollY, setHeroScrollY] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatStudioClock()), 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const onScroll = () => {
      setHeroScrollY(Math.min(window.scrollY, 700));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroOpacity = Math.max(1 - heroScrollY / 620, 0.18);
  const heroShift = heroScrollY * 0.16;

  return (
    <div>
      {/* 1. FULL-VIEWPORT HERO */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10">
        {/* Parallax Architectural Crosshair Grid + Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 architectural-grid"
          style={{ transform: `translate3d(0, ${heroScrollY * 0.08}px, 0)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hero-radial-glow"
          style={{ transform: `translate3d(0, ${heroScrollY * 0.14}px, 0)` }}
        />

        {/* Subtle Floating Ambient Particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            className="animate-ambient-particle absolute top-[22%] left-[14%] h-1.5 w-1.5 rounded-full bg-[#EE7104]"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="animate-ambient-particle absolute top-[34%] right-[18%] h-1 w-1 rounded-full bg-[#30B7F5]"
            style={{ animationDelay: '1.6s' }}
          />
          <span
            className="animate-ambient-particle absolute bottom-[28%] left-[24%] h-1 w-1 rounded-full bg-[#EB448B]"
            style={{ animationDelay: '3.1s' }}
          />
          <span
            className="animate-ambient-particle absolute bottom-[32%] right-[12%] h-1.5 w-1.5 rounded-full bg-[#EE7104]"
            style={{ animationDelay: '2.2s' }}
          />
        </div>

        {/* Four #EE7104 Crosshair Corner Registration Marks */}
        <div className="pointer-events-none mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 relative">
          <span aria-hidden="true" className="absolute left-4 sm:left-6 lg:left-10 top-0 font-mono-tech text-sm text-[#EE7104]">+</span>
          <span aria-hidden="true" className="absolute right-4 sm:right-6 lg:right-10 top-0 font-mono-tech text-sm text-[#EE7104]">+</span>
        </div>

        {/* Center Hero Editorial Stack */}
        <div
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 text-center"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroShift}px, 0)`,
          }}
        >
          {/* Top Studio Status Indicator */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF]/90 dark:bg-[#111111]/90 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EE7104]" aria-hidden="true" />
            <span className="font-mono-tech text-[10px] sm:text-[11px] text-[#52525B] dark:text-[#9CA3AF]">
              HAROONABAD · DESIGN, CODE & AI STUDIO
            </span>
          </div>

          {/* Oversized GRAFINO Display Wordmark */}
          <h1
            className="font-display font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-[#0A0A0A] dark:text-white select-none"
            style={{ fontSize: 'clamp(3.6rem, 13.5vw, 11.2rem)' }}
          >
            GRAFINO
          </h1>

          {/* Hairline-flanked italic orange subhead */}
          <div className="mt-4 flex w-full max-w-2xl items-center justify-center gap-4 sm:gap-6">
            <span className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#262626]" aria-hidden="true" />
            <span className="font-editorial text-2xl sm:text-4xl text-[#EE7104] shrink-0">
              creative studio
            </span>
            <span className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#262626]" aria-hidden="true" />
          </div>

          {/* Verified Headline + Tagline */}
          <p className="mt-7 max-w-2xl font-display text-lg sm:text-2xl font-semibold tracking-tight text-[#0A0A0A] dark:text-white text-balance">
            {STUDIO_INFO.heroStatement}
          </p>
          <p className="mt-2.5 max-w-xl text-sm sm:text-base text-[#52525B] dark:text-[#9CA3AF]">
            {STUDIO_INFO.tagline}
          </p>

          {/* Dual Pill CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#EE7104] px-7 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <a
              href="#selected-works"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] px-7 py-3 font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors"
            >
              <span>VIEW WORKS</span>
            </a>
          </div>
        </div>

        {/* 3-Part Hero Bottom Bar */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E7EB] dark:border-[#262626] pt-5">
            <span aria-hidden="true" className="hidden sm:block absolute -top-2.5 left-0 font-mono-tech text-xs text-[#EE7104]">+</span>
            <span aria-hidden="true" className="hidden sm:block absolute -top-2.5 right-0 font-mono-tech text-xs text-[#EE7104]">+</span>

            {/* Live Studio Clock */}
            <div className="font-mono-tech text-[11px] text-[#52525B] dark:text-[#9CA3AF] tabular-nums">
              {clock}
            </div>

            {/* Scroll To Explore */}
            <a
              href="#milestones"
              className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="h-3.5 w-3.5 text-[#EE7104]" />
            </a>

            {/* Minimal Social Outlines */}
            <div className="flex items-center gap-3">
              <a
                href={STUDIO_INFO.socials.instagram}
                aria-label="Grafino Studio Instagram"
                onClick={(e) => {
                  if (STUDIO_INFO.socials.instagram === '#') {
                    e.preventDefault();
                    onSocialPlaceholderClick('Instagram');
                  }
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] hover:text-[#EE7104] transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={STUDIO_INFO.socials.linkedin}
                aria-label="Grafino Studio LinkedIn"
                onClick={(e) => {
                  if (STUDIO_INFO.socials.linkedin === '#') {
                    e.preventDefault();
                    onSocialPlaceholderClick('LinkedIn');
                  }
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] hover:text-[#EE7104] transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={STUDIO_INFO.socials.twitter}
                aria-label="Grafino Studio Twitter"
                onClick={(e) => {
                  if (STUDIO_INFO.socials.twitter === '#') {
                    e.preventDefault();
                    onSocialPlaceholderClick('Twitter / X');
                  }
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] hover:text-[#EE7104] transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY MILESTONE METRICS (6 VERIFIED STATS) */}
      <section
        id="milestones"
        className="scroll-mt-16 border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Sticky Left Editorial Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
                [ VERIFIED TRACK RECORD ]
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[1.02] text-balance">
                Measured outcomes built on{' '}
                <span className="font-editorial font-normal text-[#EE7104]">precision.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF] max-w-md">
                Every brand identity, website, software system, and growth campaign is engineered for lasting performance and repeat client trust.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] px-5 py-2.5 font-mono-tech text-[11px] font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer"
                >
                  <span>EXPLORE ALL 9 SERVICES</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Sequential Metric Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VERIFIED_METRICS.map((metric, idx) => (
                <AnimatedMetricCard key={metric.id} metric={metric} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. A CALL FOR CREATIVE INNOVATION + SCROLL-DRIVEN 3D GEOMETRIC ROTATION */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
                [ CREATIVE TECHNOLOGY / GRAFINO AI ]
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
                A Call for Creative{' '}
                <span className="font-editorial font-normal text-[#EE7104]">Innovation</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF] max-w-xl">
                Beyond graphic craft and full-stack development, Grafino Studio is pioneering Pakistan&apos;s 1st AI platform, combining disciplined human design with practical AI workflows.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-[#E5E7EB] dark:border-[#262626] py-6">
                <div>
                  <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                    [ 01 ] END-TO-END STUDIO
                  </p>
                  <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                    Design, software, print, video, audio, and SEO unified under one roof.
                  </p>
                </div>
                <div>
                  <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                    [ 02 ] GRAFINO AI SOLUTIONS
                  </p>
                  <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                    Live platform at grafinoai.qzz.io accelerating creative speed and clarity.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={STUDIO_INFO.aiPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-6 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors"
                >
                  <span>{STUDIO_INFO.aiPlatformCta.toUpperCase()}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('/our-ai-tools')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] px-6 py-3 font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer"
                >
                  <span>LEARN ABOUT OUR AI TOOLS</span>
                </button>
              </div>
            </div>

            {/* Interactive Scroll-Driven 3D Geometric Orbital Sculpture */}
            <div className="lg:col-span-6">
              <div className="relative h-[380px] sm:h-[460px] rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#0D0D0E] overflow-hidden architectural-grid">
                <ThreeDShowcase theme={theme} className="h-full w-full" />
                <div className="pointer-events-none absolute bottom-3.5 left-10 right-10 flex items-center justify-between font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                  <span>SCROLL + CURSOR REACTIVE 3D</span>
                  <span className="text-[#D46200] dark:text-[#EE7104]">ORBITAL EMBLEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HORIZONTAL SCROLL-LINKED SHOWCASE (PROJECT index) */}
      <HorizontalTrack onNavigate={onNavigate} />

      {/* 5. 4-COLUMN STAGGERED MONOCHROME CAPABILITIES GRID */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
                [ CAPABILITIES ]
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98]">
                WHAT WE{' '}
                <span className="font-editorial font-normal text-[#EE7104]">excel</span> AT
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex min-h-[44px] items-center gap-2 self-start sm:self-auto rounded-full border border-[#E5E7EB] dark:border-[#262626] px-5 py-2.5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer"
            >
              <span>ALL SERVICES + FREE DEMO</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {HOME_CAPABILITIES.map((cap, idx) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => onNavigate(cap.targetPath)}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#111111] text-left cursor-pointer transition-colors hover:border-[#EE7104] ${
                  idx % 2 === 1 ? 'lg:mt-12' : ''
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <EditorialImage
                    src={cap.image}
                    alt={cap.imageAlt}
                    className="h-full w-full object-cover scale-[1.06] grayscale contrast-110 transition-all duration-500 group-hover:scale-[1.11] group-hover:grayscale-0 group-hover:contrast-125"
                  />
                  {/* Balanced Top & Bottom Scrim for guaranteed contrast */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/55"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-tech text-[10px] text-white/90">
                    <span className="text-[#EE7104]">[ {cap.index} ]</span>
                    <span>{cap.category}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-display text-xl font-bold tracking-tight leading-snug">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#D4D4D8]">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SCROLL BLUR-TO-SHARP PHILOSOPHY REVEAL */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
                [ STUDIO PHILOSOPHY ]
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                {STUDIO_INFO.tagline}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/about-us')}
                className="mt-6 inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors cursor-pointer"
              >
                <span>READ OUR STORY</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#EE7104]" />
              </button>
            </div>

            <div className="lg:col-span-8">
              <BlurWordReveal
                text={PHILOSOPHY_STATEMENT}
                accentWords={['digital', 'confidence.']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP QUOTES CAROUSEL & COLLABORATION NOTE */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 space-y-10">
          <TeamQuoteCarousel />

          {/* Clean Partners & Collaboration Strip (No Fabricated Partner Logos) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-8">
            <div>
              <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                [ CLIENT PARTNERSHIPS ]
              </p>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#0A0A0A] dark:text-white">
                Trusted by 2,000 clients across retail, services, media, and technology
              </h3>
              <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                With an 85% repeat business rate, our partnerships grow alongside your business milestones.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/pricing')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] px-5 py-2.5 font-mono-tech text-[11px] font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer"
              >
                <span>COMPARE PACKAGES</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/appointments')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#EE7104] px-5 py-2.5 font-mono-tech text-[11px] font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
              >
                <span>BOOK CONSULTATION</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOVER / CLICK FAQ ACCORDION */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
                [ FREQUENTLY ASKED ]
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98]">
                ANSWERS &amp;{' '}
                <span className="font-editorial font-normal text-[#EE7104]">INSIGHTS</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/help-desk')}
              className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-[#52525B] dark:text-[#9CA3AF] hover:text-[#EE7104] transition-colors cursor-pointer"
            >
              <span>VISIT HELP DESK</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#EE7104]" />
            </button>
          </div>

          <FaqAccordion items={HOME_FAQS} allowHoverDesktop />
        </div>
      </section>

      {/* 9. MARQUEE-TOPPED CONTACT CARD */}
      <section className="border-t border-[#E5E7EB] dark:border-[#262626] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <ContactInquiryForm
            onSubmitted={onSubmitted}
            onSocialPlaceholderClick={onSocialPlaceholderClick}
          />
        </div>
      </section>
    </div>
  );
}
