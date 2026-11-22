import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { FaqItem } from '../data/studioData';
import { filterFaqs } from '../utils/studioLogic';

interface FaqAccordionProps {
  items: FaqItem[];
  searchable?: boolean;
  allowHoverDesktop?: boolean;
}

export function FaqAccordion({
  items,
  searchable = false,
  allowHoverDesktop = true,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }
  }, []);

  const visibleItems = searchable ? filterFaqs(items, query) : items;

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {searchable && (
        <div className="mb-8 relative max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            Search Frequently Asked Questions
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52525B] dark:text-[#9CA3AF]" />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help desk topics (e.g. demo, pricing, AI, revisions)..."
            className="w-full min-h-[46px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] pl-11 pr-4 py-3 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#52525B] dark:placeholder:text-[#9CA3AF] focus:border-[#EE7104] focus:outline-none"
          />
        </div>
      )}

      {visibleItems.length === 0 ? (
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-8 text-center">
          <p className="text-sm text-[#52525B] dark:text-[#9CA3AF]">
            No questions matched &ldquo;{query}&rdquo;. Try another keyword or submit a direct Help Desk ticket above.
          </p>
        </div>
      ) : (
        <div className="border-t border-[#E5E7EB] dark:border-[#262626]">
          {visibleItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  if (allowHoverDesktop && canHover) {
                    setOpenId(item.id);
                  }
                }}
                className="border-b border-[#E5E7EB] dark:border-[#262626] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  className="flex w-full min-h-[68px] items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] tabular-nums shrink-0">
                      [ {item.index} ] · {item.category}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-semibold text-[#0A0A0A] dark:text-white group-hover:text-[#EE7104] transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? 'border-[#EE7104] bg-[#EE7104] text-white rotate-45'
                        : 'border-[#E5E7EB] dark:border-[#262626] text-[#0A0A0A] dark:text-white group-hover:border-[#EE7104]'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 sm:pl-36 max-w-3xl text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
