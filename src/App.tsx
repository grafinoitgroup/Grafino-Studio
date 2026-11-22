import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RoutePath } from './data/studioData';
import { SubmissionSummary, normalizeRoutePath } from './utils/studioLogic';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { ScrollProgressRail } from './components/ScrollProgressRail';
import { SubmissionModal } from './components/SubmissionModal';
import { AboutPage } from './pages/AboutPage';
import { AiToolsPage } from './pages/AiToolsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ContactPage } from './pages/ContactPage';
import { EventsPage } from './pages/EventsPage';
import { HelpDeskPage } from './pages/HelpDeskPage';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { PricingPage } from './pages/PricingPage';
import { ServicesPage } from './pages/ServicesPage';
import { SubscriptionPackagePage } from './pages/SubscriptionPackagePage';

function readInitialTheme(): 'dark' | 'light' {
  try {
    const saved = window.localStorage.getItem('grafino-theme');
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => readInitialTheme());
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizeRoutePath(window.location.pathname)
  );
  const [searchParamsStr, setSearchParamsStr] = useState<string>(() => window.location.search);
  const [skipPreloader] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  });
  const [preloaderDone, setPreloaderDone] = useState(skipPreloader);
  const [activeSubmission, setActiveSubmission] = useState<SubmissionSummary | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Sync theme to <html class="dark"> and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('grafino-theme', theme);
    } catch {
      // ignore storage failure in private contexts
    }
  }, [theme]);

  // Listen for browser back/forward history changes
  useEffect(() => {
    const handlePop = () => {
      setCurrentPath(normalizeRoutePath(window.location.pathname));
      setSearchParamsStr(window.location.search);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Auto-dismiss transient social link notice
  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const navigate = useCallback((path: RoutePath, query = '') => {
    const nextUrl = `${path}${query}`;
    window.history.pushState({}, '', nextUrl);
    setCurrentPath(path);
    setSearchParamsStr(query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleSocialPlaceholder = useCallback((network: string) => {
    setNotice(
      `${network} profile URL can be set in STUDIO_INFO.socials. Reach us right now via WhatsApp (+92-332-7551182) or email.`
    );
  }, []);

  const queryParams = new URLSearchParams(searchParamsStr);
  const initialTier = queryParams.get('tier') ?? undefined;
  const initialTab = queryParams.get('tab') === 'custom' ? 'custom' : 'subscription';
  const initialService = queryParams.get('service') ?? undefined;
  const initialSubject = queryParams.get('subject') ?? undefined;

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            theme={theme}
            onNavigate={navigate}
            onSubmitted={setActiveSubmission}
            onSocialPlaceholderClick={handleSocialPlaceholder}
          />
        );
      case '/services':
        return <ServicesPage onNavigate={navigate} />;
      case '/pricing':
        return <PricingPage onNavigate={navigate} />;
      case '/subscription-package':
        return (
          <SubscriptionPackagePage
            initialTier={initialTier}
            initialTab={initialTab}
            onSubmitted={setActiveSubmission}
          />
        );
      case '/our-ai-tools':
        return <AiToolsPage theme={theme} onNavigate={navigate} />;
      case '/help-desk':
        return <HelpDeskPage onSubmitted={setActiveSubmission} />;
      case '/appointments':
        return (
          <AppointmentsPage
            initialService={initialService}
            onSubmitted={setActiveSubmission}
          />
        );
      case '/events':
        return <EventsPage onSubmitted={setActiveSubmission} />;
      case '/jobs':
        return <JobsPage onSubmitted={setActiveSubmission} />;
      case '/about-us':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return (
          <ContactPage
            initialSubject={initialSubject}
            onSubmitted={setActiveSubmission}
            onSocialPlaceholderClick={handleSocialPlaceholder}
          />
        );
    }
  };

  return (
    <div
      data-theme={theme}
      data-route={currentPath}
      data-ready={preloaderDone ? 'true' : 'false'}
      className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] dark:bg-[#050505] dark:text-white"
    >
      <Preloader skip={skipPreloader} onComplete={() => setPreloaderDone(true)} />

      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <ScrollProgressRail />

      <main className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        onNavigate={navigate}
        onSocialPlaceholderClick={handleSocialPlaceholder}
      />

      <SubmissionModal
        submission={activeSubmission}
        onClose={() => setActiveSubmission(null)}
      />

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-[#EE7104] bg-[#FFFFFF] dark:bg-[#111111] px-4 py-3 text-xs text-[#0A0A0A] dark:text-white"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
