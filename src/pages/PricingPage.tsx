import { ArrowUpRight, Check } from 'lucide-react';
import { PACKAGE_TIERS, PackageTier, RoutePath, STUDIO_INFO } from '../data/studioData';

interface PricingPageProps {
  onNavigate: (path: RoutePath, query?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const getTint = (tint: PackageTier['tint']) => {
    if (tint === 'magenta') return 'tint-magenta-top';
    if (tint === 'cyan') return 'tint-cyan-top';
    return 'tint-orange-top';
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ TRANSPARENT ENGAGEMENT TIERS ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Packages scoped to your exact{' '}
            <span className="font-editorial font-normal text-[#EE7104]">ambition.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Every brand has different deliverables and timelines. Choose a package tier below to request a tailored quote directly from Grafino Studio.
          </p>
        </div>

        {/* 3-Column Comparison Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PACKAGE_TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`flex flex-col justify-between rounded-2xl border p-7 sm:p-8 ${getTint(
                tier.tint
              )} ${
                tier.featured
                  ? 'border-[#EE7104] bg-[#FFFFFF] dark:bg-[#141414]'
                  : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono-tech text-[10px]">
                  <span className="text-[#D46200] dark:text-[#EE7104]">
                    [ {tier.index} ] · SUBSCRIPTION TIER
                  </span>
                  {tier.featured && (
                    <span className="text-[#D46200] dark:text-[#EE7104] font-semibold">
                      MOST REQUESTED
                    </span>
                  )}
                </div>

                <h2 className="mt-5 font-display text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] dark:text-white">
                  {tier.name}
                </h2>

                <div className="mt-5 border-y border-[#E5E7EB] dark:border-[#262626] py-5">
                  <p className="font-display text-3xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white">
                    {tier.priceLabel}
                  </p>
                  <p className="mt-1 font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                    REQUEST PRICING · TAILORED TO SCOPE
                  </p>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  {tier.summary}
                </p>

                <p className="mt-4 text-xs font-medium text-[#0A0A0A] dark:text-white">
                  Ideal for: <span className="text-[#52525B] dark:text-[#9CA3AF] font-normal">{tier.idealFor}</span>
                </p>

                <ul className="mt-6 space-y-3 border-t border-[#E5E7EB] dark:border-[#262626] pt-6">
                  {tier.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#0A0A0A] dark:text-[#E5E7EB]"
                    >
                      <Check className="h-4 w-4 text-[#EE7104] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(
                      '/subscription-package',
                      `?tier=${encodeURIComponent(tier.name)}`
                    )
                  }
                  className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-mono-tech text-xs font-semibold transition-colors cursor-pointer ${
                    tier.featured
                      ? 'bg-[#EE7104] text-white hover:bg-[#d86502]'
                      : 'border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104]'
                  }`}
                >
                  <span>{tier.ctaLabel.toUpperCase()}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Add-On Custom Quote Banner */}
        <div className="mt-12 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 sm:p-10 tint-orange-top flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
              [ BESPOKE BUNDLES ]
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] dark:text-white">
              Need a Custom Package across specific services?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#52525B] dark:text-[#9CA3AF]">
              Combine Graphic Design, Custom Software, Print Marketing, Video Production, or Custom Song Creation into a single project quote. {STUDIO_INFO.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/subscription-package', '?tab=custom')}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-6 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
            >
              <span>BUILD CUSTOM PACKAGE</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/appointments')}
              className="inline-flex min-h-[46px] items-center rounded-full border border-[#E5E7EB] dark:border-[#262626] px-6 py-3 font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer"
            >
              BOOK PRICING CALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
