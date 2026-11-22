import { useState } from 'react';
import { ArrowUpRight, Check, Search } from 'lucide-react';
import { CORE_SERVICES, RoutePath, STUDIO_INFO, ServiceItem } from '../data/studioData';
import { filterServices } from '../utils/studioLogic';
import { TeamQuoteCarousel } from '../components/TeamQuoteCarousel';

interface ServicesPageProps {
  onNavigate: (path: RoutePath, query?: string) => void;
}

const CATEGORIES = ['All', 'Design', 'Engineering', 'Marketing', 'Production'] as const;

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleServices = filterServices(CORE_SERVICES, selectedCategory, searchQuery);

  const getTint = (tint: ServiceItem['tint']) => {
    if (tint === 'magenta') return 'tint-magenta-top';
    if (tint === 'cyan') return 'tint-cyan-top';
    return 'tint-orange-top';
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ 09 CORE DISCIPLINES + GRAFINO AI ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Full-spectrum services built for{' '}
            <span className="font-editorial font-normal text-[#EE7104]">execution.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            {STUDIO_INFO.tagline} Every core discipline includes a Free Demo option so you can verify craft before committing.
          </p>
        </div>

        {/* Interactive Filter Controls & Search */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-y border-[#E5E7EB] dark:border-[#262626] py-5">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter services by discipline">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-full px-4 py-2 font-mono-tech text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#EE7104] text-white'
                      : 'border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52525B] dark:text-[#9CA3AF]" />
            <input
              id="service-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or deliverables..."
              className="w-full min-h-[42px] rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] pl-10 pr-4 py-2 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
            />
          </div>
        </div>

        {/* Services Grid */}
        {visibleServices.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-12 text-center">
            <p className="text-sm text-[#52525B] dark:text-[#9CA3AF]">
              No services matched your current filter. Reset your search to inspect all 9 core offerings.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex min-h-[42px] items-center rounded-full bg-[#EE7104] px-5 py-2 font-mono-tech text-[11px] font-semibold text-white cursor-pointer"
            >
              SHOW ALL SERVICES
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleServices.map((service) => (
              <article
                key={service.id}
                className={`flex flex-col justify-between rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-7 ${getTint(
                  service.tint
                )} transition-colors hover:border-[#EE7104]/70`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px]">
                    <span className="text-[#D46200] dark:text-[#EE7104] tabular-nums">
                      [ {service.index} ] · {service.shortTag}
                    </span>
                    {service.freeDemo && (
                      <span className="text-[#0A0A0A] dark:text-white font-semibold">
                        FREE DEMO AVAILABLE
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] dark:text-white">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#E5E7EB] dark:border-[#262626] pt-4">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-xs text-[#0A0A0A] dark:text-[#E5E7EB]"
                      >
                        <Check className="h-3.5 w-3.5 text-[#EE7104] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E5E7EB] dark:border-[#262626] pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        '/appointments',
                        `?service=${encodeURIComponent(service.title)}`
                      )
                    }
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#EE7104] px-4 py-2 font-mono-tech text-[10px] font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
                  >
                    <span>REQUEST FREE DEMO</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        '/contact',
                        `?subject=${encodeURIComponent(`Quote Request: ${service.title}`)}`
                      )
                    }
                    className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] hover:text-[#EE7104] transition-colors cursor-pointer"
                  >
                    GET QUOTE
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Grafino AI Solutions Highlight Strip */}
        <div className="mt-12 rounded-2xl border border-[#EE7104]/50 bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-10 tint-orange-top flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
              [ 10 ] · PAKISTAN&apos;S 1ST AI PLATFORM
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] dark:text-white">
              Grafino AI Solutions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#52525B] dark:text-[#9CA3AF]">
              Extend your design and engineering pipeline with our dedicated AI platform built by Grafino Studio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
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
              className="inline-flex min-h-[46px] items-center rounded-full border border-[#E5E7EB] dark:border-[#262626] px-6 py-3 font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer"
            >
              AI DETAILS
            </button>
          </div>
        </div>

        {/* Leadership Quote Carousel */}
        <div className="mt-16">
          <TeamQuoteCarousel />
        </div>

        {/* Verified Delivery Commitment */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#E5E7EB] dark:border-[#262626] pt-12">
          <div>
            <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
              [ PARTNER STANDARD 01 ]
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-[#0A0A0A] dark:text-white">
              Direct Specialist Access
            </h3>
            <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
              Collaborate directly with design, programming, and SEO leadership without handoff friction.
            </p>
          </div>
          <div>
            <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
              [ PARTNER STANDARD 02 ]
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-[#0A0A0A] dark:text-white">
              Transparent Custom Quotes
            </h3>
            <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
              Scope-matched proposals for Starter, Growth, Premium, or bespoke multi-service bundles.
            </p>
          </div>
          <div>
            <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
              [ PARTNER STANDARD 03 ]
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-[#0A0A0A] dark:text-white">
              85% Repeat Client Retention
            </h3>
            <p className="mt-1.5 text-sm text-[#52525B] dark:text-[#9CA3AF]">
              Proven long-term delivery across 2,000 happy clients and 1,200 completed projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
