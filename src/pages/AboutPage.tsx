import { ArrowUpRight } from 'lucide-react';
import {
  LEADERSHIP_TEAM,
  RoutePath,
  STUDIO_IMAGES,
  STUDIO_INFO,
  VERIFIED_METRICS,
} from '../data/studioData';
import { EditorialImage } from '../components/EditorialImage';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <div className="max-w-4xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ ABOUT GRAFINO STUDIO · {STUDIO_INFO.location.toUpperCase()} ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            {STUDIO_INFO.tagline}
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF] max-w-2xl">
            Grafino Studio unites brand design, responsive web engineering, custom software, SEO, video production, sonic branding, and Grafino AI Solutions into one accountable studio.
          </p>
        </div>

        {/* Full-bleed Editorial Studio Visual */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#111111]">
          <EditorialImage
            src={STUDIO_IMAGES.showcaseEditorial}
            alt="Grafino Studio dark editorial brand and digital design artifacts"
            className="w-full h-[260px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Sticky-Reveal Editorial Split: Who We Are & What We Stand For */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-t border-[#E5E7EB] dark:border-[#262626] pt-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
              [ STUDIO MANIFESTO ]
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[1.02]">
              Crafted with clarity, delivered with{' '}
              <span className="font-editorial font-normal text-[#EE7104]">precision.</span>
            </h2>
            <p className="mt-4 text-sm text-[#52525B] dark:text-[#9CA3AF]">
              Operating from {STUDIO_INFO.location}, partnering with clients locally and internationally.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 sm:p-8 tint-orange-top">
              <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                [ 01 ] · WHO WE ARE
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                A multi-disciplinary creative and technology studio
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Founded by Abdul Basit, Grafino Studio brings graphic designers, software programmers, SEO experts, and media producers together so clients never have to stitch together disconnected freelancers. We take every brief from first concept to final production launch.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 sm:p-8 tint-cyan-top">
              <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                [ 02 ] · WHAT WE STAND FOR
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                Measurable impact and lasting client partnerships
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Across 2,000 happy clients, 1,200 completed projects, and 500 launched websites, our standard remains consistent: responsive communication, Free Demo transparency, technical excellence, and forward-looking innovation through Grafino AI Solutions.
              </p>
            </div>

            {/* Compact Verified Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {VERIFIED_METRICS.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-4"
                >
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] dark:text-white tabular-nums">
                    {m.displayValue}
                  </p>
                  <p className="mt-1 text-xs text-[#52525B] dark:text-[#9CA3AF]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Leadership Cards (Abdul Basit, Naina, Saba Saleem) */}
        <section className="mt-20 border-t border-[#E5E7EB] dark:border-[#262626] pt-16">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
            [ LEADERSHIP TEAM ]
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white mb-10">
            The people driving{' '}
            <span className="font-editorial font-normal text-[#EE7104]">Grafino Studio</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.map((leader, idx) => {
              const tints = ['tint-orange-top', 'tint-magenta-top', 'tint-cyan-top'];
              return (
                <article
                  key={leader.id}
                  className={`flex flex-col justify-between rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 ${tints[idx % 3]}`}
                >
                  <div>
                    <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                      [ 0{idx + 1} ] · {leader.organization.toUpperCase()}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-[#0A0A0A] dark:text-white">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#52525B] dark:text-[#9CA3AF]">
                      {leader.role}
                    </p>
                    <blockquote className="mt-5 border-t border-[#E5E7EB] dark:border-[#262626] pt-5 text-sm leading-relaxed text-[#0A0A0A] dark:text-[#E5E7EB]">
                      &ldquo;{leader.quote}&rdquo;
                    </blockquote>
                  </div>
                  <p className="mt-6 font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                    {leader.focusArea}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0A0A] dark:text-white">
                Ready to build with our team?
              </h3>
              <p className="mt-1 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                Explore all nine core services or schedule a discovery consultation today.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-6 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
