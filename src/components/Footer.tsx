import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, RoutePath, STUDIO_INFO } from '../data/studioData';
import { buildWhatsAppUrl } from '../utils/studioLogic';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
  onSocialPlaceholderClick: (network: string) => void;
}

export function Footer({ onNavigate, onSocialPlaceholderClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#050505] pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Pre-Footer Oversized Email CTA */}
        <div className="pb-14 sm:pb-20">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ DIRECT STUDIO INBOX ]
          </p>
          <a
            href={`mailto:${STUDIO_INFO.email}`}
            className="group inline-flex flex-wrap items-center gap-3 sm:gap-5 font-display text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors break-all"
          >
            <span>INFO@GRAFINO.DPNDS.ORG</span>
            <ArrowUpRight className="h-7 w-7 sm:h-11 sm:w-11 shrink-0 text-[#EE7104] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <p className="mt-4 max-w-xl text-sm text-[#52525B] dark:text-[#9CA3AF]">
            {STUDIO_INFO.tagline} Reach us from anywhere or visit our team in {STUDIO_INFO.location}.
          </p>
        </div>

        {/* Complete 11-Page Directory Mirror */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-6 border-t border-[#E5E7EB] dark:border-[#262626] py-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
              className="font-mono-tech text-[11px] text-[#52525B] dark:text-[#9CA3AF] hover:text-[#EE7104] transition-colors py-1"
            >
              {item.bracketLabel}
            </a>
          ))}
        </div>

        {/* 4-Column Hairline Social & Back To Top Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#E5E7EB] dark:border-[#262626]">
          <a
            href={STUDIO_INFO.socials.instagram}
            onClick={(e) => {
              if (STUDIO_INFO.socials.instagram === '#') {
                e.preventDefault();
                onSocialPlaceholderClick('Instagram');
              }
            }}
            className="flex items-center justify-between border-b sm:border-r lg:border-b-0 border-[#E5E7EB] dark:border-[#262626] px-2 sm:px-5 py-5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
          >
            <span>MESSAGE ON INSTAGRAM</span>
            <ArrowUpRight className="h-4 w-4 text-[#EE7104]" />
          </a>

          <a
            href={STUDIO_INFO.socials.linkedin}
            onClick={(e) => {
              if (STUDIO_INFO.socials.linkedin === '#') {
                e.preventDefault();
                onSocialPlaceholderClick('LinkedIn');
              }
            }}
            className="flex items-center justify-between border-b lg:border-r lg:border-b-0 border-[#E5E7EB] dark:border-[#262626] px-2 sm:px-5 py-5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight className="h-4 w-4 text-[#EE7104]" />
          </a>

          <a
            href={buildWhatsAppUrl('Hello Grafino Studio, I would like to discuss a project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-[#E5E7EB] dark:border-[#262626] px-2 sm:px-5 py-5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
          >
            <span>WHATSAPP {STUDIO_INFO.phoneDisplay}</span>
            <ArrowUpRight className="h-4 w-4 text-[#EE7104]" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center justify-between px-2 sm:px-5 py-5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-4 w-4 text-[#EE7104]" />
          </button>
        </div>

        {/* Legal / Address Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-6 text-xs text-[#52525B] dark:text-[#9CA3AF]">
          <p>{STUDIO_INFO.location}</p>
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.brandName}. All rights reserved.
          </p>
        </div>

        {/* Oversized Vertically Faded GRAFINO Footer Wordmark */}
        <div
          aria-hidden="true"
          className="overflow-hidden pt-4 pb-2 select-none text-center"
        >
          <div
            className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-[#0A0A0A] dark:text-white"
            style={{
              fontSize: 'clamp(4.2rem, 17vw, 15.5rem)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.03) 96%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.03) 96%)',
            }}
          >
            GRAFINO
          </div>
        </div>
      </div>
    </footer>
  );
}
