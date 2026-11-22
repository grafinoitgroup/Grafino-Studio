import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_ITEMS, RoutePath, STUDIO_INFO } from '../data/studioData';
import { GrafinoLogo } from './GrafinoLogo';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ currentPath, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const primaryLinks = NAV_ITEMS.filter((item) => item.group === 'primary');
  const moreLinks = NAV_ITEMS.filter((item) => item.group === 'more');
  const isMoreActive = moreLinks.some((item) => item.path === currentPath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (path: RoutePath) => {
    setMoreOpen(false);
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#FAFAFA] dark:bg-[#050505] border-b border-[#E5E7EB] dark:border-[#262626]'
            : 'bg-[#FAFAFA]/90 dark:bg-[#050505]/90 border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Left: Logo + compact wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
            aria-label="Grafino Studio Home"
          >
            <GrafinoLogo size={30} />
            <span className="font-display text-base font-extrabold tracking-tight text-[#0A0A0A] dark:text-white group-hover:text-[#EE7104] transition-colors">
              GRAFINO
            </span>
          </a>

          {/* Center: Bracketed Desktop Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-5"
          >
            {primaryLinks.map((item) => {
              const active = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`font-mono-tech text-[11px] whitespace-nowrap shrink-0 transition-colors py-1 ${
                    active
                      ? 'text-[#D46200] dark:text-[#EE7104] font-semibold'
                      : 'text-[#52525B] dark:text-[#9CA3AF] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  {item.bracketLabel}
                </a>
              );
            })}

            {/* [MORE +] Dropdown */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`flex items-center gap-1 font-mono-tech text-[11px] whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
                  isMoreActive || moreOpen
                    ? 'text-[#D46200] dark:text-[#EE7104] font-semibold'
                    : 'text-[#52525B] dark:text-[#9CA3AF] hover:text-[#0A0A0A] dark:hover:text-white'
                }`}
              >
                <span>[MORE +]</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    moreOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    role="menu"
                    className="absolute right-0 mt-3 w-56 border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-2"
                  >
                    {moreLinks.map((item) => {
                      const active = currentPath === item.path;
                      return (
                        <a
                          key={item.path}
                          href={item.path}
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(item.path);
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 font-mono-tech text-[11px] whitespace-nowrap transition-colors ${
                            active
                              ? 'bg-[#F4F4F5] dark:bg-[#161616] text-[#D46200] dark:text-[#EE7104]'
                              : 'text-[#0A0A0A] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#161616]'
                          }`}
                        >
                          <span>{item.bracketLabel}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#EE7104]" />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Compact lg (1024-1279px) Navigation */}
          <nav
            aria-label="Compact Desktop Navigation"
            className="hidden lg:flex xl:hidden items-center gap-4"
          >
            {primaryLinks.slice(0, 5).map((item) => {
              const active = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`font-mono-tech text-[11px] whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[#D46200] dark:text-[#EE7104] font-semibold'
                      : 'text-[#52525B] dark:text-[#9CA3AF] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  {item.bracketLabel}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="font-mono-tech text-[11px] whitespace-nowrap shrink-0 text-[#52525B] dark:text-[#9CA3AF] hover:text-[#EE7104] transition-colors cursor-pointer"
            >
              [ALL PAGES +]
            </button>
          </nav>

          {/* Right: Theme toggle + Primary CTA + Mobile Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer shrink-0"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#EE7104] px-4 py-2 font-mono-tech text-[11px] font-semibold text-white whitespace-nowrap shrink-0 hover:bg-[#d86502] transition-colors"
            >
              CONTACT US
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="flex xl:hidden h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors cursor-pointer shrink-0"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Overlay Menu (Mobile / Tablet / All-Pages) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#FAFAFA] dark:bg-[#050505] px-6 pt-24 pb-10"
            role="dialog"
            aria-modal="true"
            aria-label="Full Site Navigation"
          >
            <div className="mx-auto w-full max-w-3xl">
              <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-6">
                [ DIRECTORY / 11 STUDIO ROUTES ]
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#E5E7EB] dark:border-[#262626]">
                {NAV_ITEMS.map((item, idx) => {
                  const active = currentPath === item.path;
                  return (
                    <motion.a
                      key={item.path}
                      href={item.path}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.path);
                      }}
                      className={`flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#262626] py-4 sm:px-4 transition-colors ${
                        active
                          ? 'text-[#D46200] dark:text-[#EE7104]'
                          : 'text-[#0A0A0A] dark:text-white hover:text-[#EE7104]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-xl font-bold tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 border-t border-[#E5E7EB] dark:border-[#262626] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                  {STUDIO_INFO.location}
                </p>
                <p className="mt-1">
                  {STUDIO_INFO.email} · {STUDIO_INFO.phoneDisplay}
                </p>
              </div>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/contact');
                }}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#EE7104] px-6 py-2.5 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors"
              >
                START A PROJECT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
