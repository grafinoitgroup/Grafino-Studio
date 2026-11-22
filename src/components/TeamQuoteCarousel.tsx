import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LEADERSHIP_TEAM } from '../data/studioData';

export function TeamQuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = LEADERSHIP_TEAM[activeIndex];

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? LEADERSHIP_TEAM.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === LEADERSHIP_TEAM.length - 1 ? 0 : i + 1));

  return (
    <div className="rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-10 tint-orange-top">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E7EB] dark:border-[#262626] pb-6">
        <div>
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
            [ LEADERSHIP PERSPECTIVES ]
          </p>
          <p className="mt-1 text-xs text-[#52525B] dark:text-[#9CA3AF]">
            Verified voices guiding Grafino Studio from Haroonabad to global clients
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <button
              key={leader.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-full font-mono-tech text-[10px] transition-colors cursor-pointer ${
                idx === activeIndex
                  ? 'bg-[#EE7104] text-white'
                  : 'border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104]'
              }`}
            >
              {leader.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8 sm:py-10">
        <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold leading-[1.3] tracking-tight text-[#0A0A0A] dark:text-white max-w-4xl">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-[#E5E7EB] dark:border-[#262626] pt-6">
        <div>
          <p className="font-display text-lg font-bold text-[#0A0A0A] dark:text-white">
            {current.name}
          </p>
          <p className="text-sm text-[#52525B] dark:text-[#9CA3AF]">
            {current.role}, {current.organization}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous leadership quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next leadership quote"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
