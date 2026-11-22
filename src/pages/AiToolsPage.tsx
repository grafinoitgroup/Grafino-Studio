import { useState } from 'react';
import { ArrowUpRight, Cpu, Layers, Workflow, Zap } from 'lucide-react';
import { LEADERSHIP_TEAM, RoutePath, STUDIO_INFO } from '../data/studioData';
import { ThreeDShowcase } from '../components/ThreeDShowcase';

interface AiToolsPageProps {
  theme: 'dark' | 'light';
  onNavigate: (path: RoutePath) => void;
}

const AI_CAPABILITIES = [
  {
    id: 'ai-ideation',
    index: '01',
    title: 'Rapid Creative Ideation',
    icon: Zap,
    summary:
      'Accelerate brand positioning drafts, campaign concepts, and structured creative briefs in minutes instead of days.',
    detail:
      'Built to assist founders, marketers, and studios in generating structured starting points ready for human art direction.',
  },
  {
    id: 'ai-content',
    index: '02',
    title: 'Content & Copy Intelligence',
    icon: Layers,
    summary:
      'Draft SEO-aligned headlines, product descriptions, and multilingual communication tailored to your audience tone.',
    detail:
      'Pairs naturally with Grafino Studio SEO and Content Writing workflows for cohesive multi-channel publishing.',
  },
  {
    id: 'ai-workflow',
    index: '03',
    title: 'Operational Automation',
    icon: Workflow,
    summary:
      'Streamline repetitive support triage, documentation summaries, and internal team workflows with reliable prompts.',
    detail:
      'Designed for growing businesses in Pakistan and internationally looking for practical productivity gains.',
  },
  {
    id: 'ai-custom',
    index: '04',
    title: 'Custom Studio Integration',
    icon: Cpu,
    summary:
      'Connect Grafino AI Solutions with your custom software, web storefront, or customer desk via our engineering team.',
    detail:
      'Backed directly by Grafino Studio programming leadership for reliable deployment and ongoing refinement.',
  },
];

export function AiToolsPage({ theme, onNavigate }: AiToolsPageProps) {
  const [selectedId, setSelectedId] = useState(AI_CAPABILITIES[0].id);
  const ceo = LEADERSHIP_TEAM[0];

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
              [ PAKISTAN&apos;S 1ST AI · GRAFINO AI SOLUTIONS ]
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
              Practical intelligence built for{' '}
              <span className="font-editorial font-normal text-[#EE7104]">creators.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF] max-w-2xl">
              Grafino AI Solutions brings accessible, studio-grade AI workflows directly to founders, marketers, and developers. Launch the live platform to experience what our team is building.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href={STUDIO_INFO.aiPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#EE7104] px-7 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors"
              >
                <span>{STUDIO_INFO.aiPlatformCta.toUpperCase()}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('/appointments')}
                className="inline-flex min-h-[48px] items-center rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] px-7 py-3 font-mono-tech text-xs font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer"
              >
                BOOK AI CONSULTATION
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-[340px] sm:h-[400px] rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#0D0D0E] overflow-hidden architectural-grid">
              <ThreeDShowcase theme={theme} className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* CEO Vision Statement */}
        <section className="mt-16 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 sm:p-10 tint-orange-top">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
            [ FOUNDER&apos;S VISION ]
          </p>
          <blockquote className="mt-4 font-display text-2xl sm:text-3xl font-semibold leading-snug text-[#0A0A0A] dark:text-white max-w-4xl">
            &ldquo;{ceo.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-medium text-[#0A0A0A] dark:text-white">
            {ceo.name}{' '}
            <span className="text-[#52525B] dark:text-[#9CA3AF] font-normal">
              · {ceo.role}, {ceo.organization}
            </span>
          </p>
        </section>

        {/* Interactive Capability Cards */}
        <section className="mt-16">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
            [ PLATFORM CAPABILITIES ]
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] dark:text-white mb-8">
            Inspect how Grafino AI accelerates delivery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {AI_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              const active = selectedId === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setSelectedId(cap.id)}
                  aria-pressed={active}
                  className={`flex flex-col justify-between rounded-2xl border p-6 text-left transition-colors cursor-pointer ${
                    active
                      ? 'border-[#EE7104] bg-[#FFFFFF] dark:bg-[#141414] tint-orange-top'
                      : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] hover:border-[#EE7104]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="text-[#D46200] dark:text-[#EE7104]">[ {cap.index} ]</span>
                      <Icon className="h-4 w-4 text-[#EE7104]" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-[#0A0A0A] dark:text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                      {cap.summary}
                    </p>
                  </div>
                  <p className="mt-5 border-t border-[#E5E7EB] dark:border-[#262626] pt-4 text-xs text-[#0A0A0A] dark:text-[#D4D4D8]">
                    {cap.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
