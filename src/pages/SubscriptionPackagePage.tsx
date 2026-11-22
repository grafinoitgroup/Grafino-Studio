import { FormEvent, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PACKAGE_TIERS } from '../data/studioData';
import {
  CustomPackageFormValues,
  SubmissionSummary,
  SubscriptionFormValues,
  createSubmissionSummary,
  validateCustomPackageForm,
  validateSubscriptionForm,
} from '../utils/studioLogic';
import { MarqueeBanner } from '../components/MarqueeBanner';

interface SubscriptionPackagePageProps {
  initialTier?: string;
  initialTab?: 'subscription' | 'custom';
  onSubmitted: (summary: SubmissionSummary) => void;
}

export function SubscriptionPackagePage({
  initialTier,
  initialTab = 'subscription',
  onSubmitted,
}: SubscriptionPackagePageProps) {
  const validTierNames = PACKAGE_TIERS.map((t) => t.name);
  const resolvedInitialTier =
    initialTier && validTierNames.includes(initialTier as (typeof validTierNames)[number])
      ? initialTier
      : 'Growth Package';

  const [activeTab, setActiveTab] = useState<'subscription' | 'custom'>(initialTab);

  // Subscription Package Form state
  const [subValues, setSubValues] = useState<SubscriptionFormValues>({
    name: '',
    phone: '',
    email: '',
    subscription: resolvedInitialTier,
    title: '',
    specialNote: '',
  });
  const [subErrors, setSubErrors] = useState<Record<string, string>>({});
  const [subLastRef, setSubLastRef] = useState<string | null>(null);

  // Custom Package Form state
  const [customValues, setCustomValues] = useState<CustomPackageFormValues>({
    name: '',
    phone: '',
    email: '',
    title: '',
    specialNote: '',
    productsName: '',
  });
  const [customErrors, setCustomErrors] = useState<Record<string, string>>({});
  const [customLastRef, setCustomLastRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialTier && validTierNames.includes(initialTier as (typeof validTierNames)[number])) {
      setSubValues((prev) => ({ ...prev, subscription: initialTier }));
      setActiveTab('subscription');
    }
  }, [initialTier]);

  useEffect(() => {
    if (initialTab === 'custom') {
      setActiveTab('custom');
    }
  }, [initialTab]);

  const handleSubscriptionSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateSubscriptionForm(subValues);
    if (!res.valid) {
      setSubErrors(res.errors);
      return;
    }
    setSubErrors({});
    const summary = createSubmissionSummary(
      'Subscription Package Request',
      `Subscription Package: ${subValues.subscription} (${subValues.title})`,
      [
        { label: 'Your Name', value: subValues.name },
        { label: 'Phone Number', value: subValues.phone },
        { label: 'Your Email', value: subValues.email },
        { label: 'Your Subscription', value: subValues.subscription },
        { label: 'Title', value: subValues.title },
        { label: 'Special Note', value: subValues.specialNote },
      ]
    );
    setSubLastRef(summary.id);
    onSubmitted(summary);
    setSubValues({
      name: '',
      phone: '',
      email: '',
      subscription: resolvedInitialTier,
      title: '',
      specialNote: '',
    });
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateCustomPackageForm(customValues);
    if (!res.valid) {
      setCustomErrors(res.errors);
      return;
    }
    setCustomErrors({});
    const summary = createSubmissionSummary(
      'Custom Package Request',
      `Custom Package Inquiry: ${customValues.title}`,
      [
        { label: 'Your Name', value: customValues.name },
        { label: 'Phone Number', value: customValues.phone },
        { label: 'Your Email', value: customValues.email },
        { label: 'Title', value: customValues.title },
        { label: 'Products Name', value: customValues.productsName },
        { label: 'Special Note', value: customValues.specialNote },
      ]
    );
    setCustomLastRef(summary.id);
    onSubmitted(summary);
    setCustomValues({
      name: '',
      phone: '',
      email: '',
      title: '',
      specialNote: '',
      productsName: '',
    });
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ SUBSCRIPTION & CUSTOM PACKAGES ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Configure your Grafino Studio{' '}
            <span className="font-editorial font-normal text-[#EE7104]">package.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Submit either our Subscription Package form (Starter, Growth, or Premium) or specify a tailored multi-service Custom Package below.
          </p>
        </div>

        {/* Form Switcher Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5" role="tablist" aria-label="Package Request Type">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'subscription'}
            onClick={() => setActiveTab('subscription')}
            className={`min-h-[44px] rounded-full px-5 py-2.5 font-mono-tech text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'subscription'
                ? 'bg-[#EE7104] text-white'
                : 'border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white hover:border-[#EE7104]'
            }`}
          >
            [ 01 ] SUBSCRIPTION PACKAGE FORM
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'custom'}
            onClick={() => setActiveTab('custom')}
            className={`min-h-[44px] rounded-full px-5 py-2.5 font-mono-tech text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-[#EE7104] text-white'
                : 'border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white hover:border-[#EE7104]'
            }`}
          >
            [ 02 ] CUSTOM PACKAGE FORM
          </button>
        </div>

        {/* Marquee-Topped Dual Form Container */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]">
          <MarqueeBanner
            phrase={
              activeTab === 'subscription'
                ? 'SUBSCRIPTION PACKAGE REQUEST'
                : 'CUSTOM PACKAGE CONFIGURATION'
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Rail */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] dark:border-[#262626] p-6 sm:p-9 tint-orange-top flex flex-col justify-between">
              <div>
                <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                  [ HOW IT WORKS ]
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                  {activeTab === 'subscription'
                    ? 'Subscription Package Brief'
                    : 'Custom Package Brief'}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  {activeTab === 'subscription'
                    ? 'Select Starter Package, Growth Package, or Premium Package and tell us your project title and special notes. We respond with a tailored Custom Quote.'
                    : 'List the exact products or services you need combined (such as Web Design, SEO, Print Marketing, or Video Production) for a bespoke studio proposal.'}
                </p>
              </div>

              <div className="mt-8 space-y-3 border-t border-[#E5E7EB] dark:border-[#262626] pt-6 text-xs text-[#52525B] dark:text-[#9CA3AF]">
                <p className="font-mono-tech text-[10px] text-[#0A0A0A] dark:text-white">
                  AVAILABLE TIERS:
                </p>
                {PACKAGE_TIERS.map((tier) => (
                  <div key={tier.id} className="flex items-center justify-between">
                    <span>{tier.name}</span>
                    <span className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                      {tier.priceLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Active Form */}
            <div className="lg:col-span-8 p-6 sm:p-10">
              {activeTab === 'subscription' ? (
                <form onSubmit={handleSubscriptionSubmit} noValidate className="space-y-5">
                  {subLastRef && (
                    <div className="rounded-xl border border-[#EE7104]/40 bg-[#EE7104]/10 px-4 py-3 text-xs text-[#0A0A0A] dark:text-white">
                      Subscription request saved under reference{' '}
                      <span className="font-mono-tech font-semibold text-[#D46200] dark:text-[#EE7104]">
                        {subLastRef}
                      </span>
                      .
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="sub-name"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        id="sub-name"
                        type="text"
                        required
                        value={subValues.name}
                        onChange={(e) => setSubValues({ ...subValues, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {subErrors.name && <p className="mt-1.5 text-xs text-red-500">{subErrors.name}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="sub-phone"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        PHONE NUMBER *
                      </label>
                      <input
                        id="sub-phone"
                        type="tel"
                        required
                        value={subValues.phone}
                        onChange={(e) => setSubValues({ ...subValues, phone: e.target.value })}
                        placeholder="+92-3XX-XXXXXXX"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {subErrors.phone && <p className="mt-1.5 text-xs text-red-500">{subErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="sub-email"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        YOUR EMAIL *
                      </label>
                      <input
                        id="sub-email"
                        type="email"
                        required
                        value={subValues.email}
                        onChange={(e) => setSubValues({ ...subValues, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {subErrors.email && <p className="mt-1.5 text-xs text-red-500">{subErrors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="sub-tier"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        YOUR SUBSCRIPTION *
                      </label>
                      <select
                        id="sub-tier"
                        required
                        value={subValues.subscription}
                        onChange={(e) =>
                          setSubValues({ ...subValues, subscription: e.target.value })
                        }
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      >
                        <option value="Starter Package">Starter Package</option>
                        <option value="Growth Package">Growth Package</option>
                        <option value="Premium Package">Premium Package</option>
                      </select>
                      {subErrors.subscription && (
                        <p className="mt-1.5 text-xs text-red-500">{subErrors.subscription}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sub-title"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      TITLE *
                    </label>
                    <input
                      id="sub-title"
                      type="text"
                      required
                      value={subValues.title}
                      onChange={(e) => setSubValues({ ...subValues, title: e.target.value })}
                      placeholder="Project or brand title"
                      className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                    />
                    {subErrors.title && <p className="mt-1.5 text-xs text-red-500">{subErrors.title}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="sub-note"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      SPECIAL NOTE *
                    </label>
                    <textarea
                      id="sub-note"
                      rows={4}
                      required
                      value={subValues.specialNote}
                      onChange={(e) => setSubValues({ ...subValues, specialNote: e.target.value })}
                      placeholder="Share your goals, launch dates, and any specific deliverables..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none resize-y"
                    />
                    {subErrors.specialNote && (
                      <p className="mt-1.5 text-xs text-red-500">{subErrors.specialNote}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#EE7104] px-8 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
                  >
                    <span>SUBMIT SUBSCRIPTION REQUEST</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCustomSubmit} noValidate className="space-y-5">
                  {customLastRef && (
                    <div className="rounded-xl border border-[#EE7104]/40 bg-[#EE7104]/10 px-4 py-3 text-xs text-[#0A0A0A] dark:text-white">
                      Custom package request saved under reference{' '}
                      <span className="font-mono-tech font-semibold text-[#D46200] dark:text-[#EE7104]">
                        {customLastRef}
                      </span>
                      .
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="custom-name"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        id="custom-name"
                        type="text"
                        required
                        value={customValues.name}
                        onChange={(e) => setCustomValues({ ...customValues, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {customErrors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{customErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="custom-phone"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        PHONE NUMBER *
                      </label>
                      <input
                        id="custom-phone"
                        type="tel"
                        required
                        value={customValues.phone}
                        onChange={(e) => setCustomValues({ ...customValues, phone: e.target.value })}
                        placeholder="+92-3XX-XXXXXXX"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {customErrors.phone && (
                        <p className="mt-1.5 text-xs text-red-500">{customErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="custom-email"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        YOUR EMAIL *
                      </label>
                      <input
                        id="custom-email"
                        type="email"
                        required
                        value={customValues.email}
                        onChange={(e) => setCustomValues({ ...customValues, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {customErrors.email && (
                        <p className="mt-1.5 text-xs text-red-500">{customErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="custom-title"
                        className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                      >
                        TITLE *
                      </label>
                      <input
                        id="custom-title"
                        type="text"
                        required
                        value={customValues.title}
                        onChange={(e) => setCustomValues({ ...customValues, title: e.target.value })}
                        placeholder="Custom bundle title"
                        className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                      />
                      {customErrors.title && (
                        <p className="mt-1.5 text-xs text-red-500">{customErrors.title}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="custom-products"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      PRODUCTS NAME *
                    </label>
                    <input
                      id="custom-products"
                      type="text"
                      required
                      value={customValues.productsName}
                      onChange={(e) =>
                        setCustomValues({ ...customValues, productsName: e.target.value })
                      }
                      placeholder="e.g. Graphic Design, Web Design, SEO, Video Production, Custom Song Creation"
                      className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                    />
                    {customErrors.productsName && (
                      <p className="mt-1.5 text-xs text-red-500">{customErrors.productsName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="custom-note"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      SPECIAL NOTE *
                    </label>
                    <textarea
                      id="custom-note"
                      rows={4}
                      required
                      value={customValues.specialNote}
                      onChange={(e) =>
                        setCustomValues({ ...customValues, specialNote: e.target.value })
                      }
                      placeholder="Describe your target deliverables, schedule, and technical preferences..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none resize-y"
                    />
                    {customErrors.specialNote && (
                      <p className="mt-1.5 text-xs text-red-500">{customErrors.specialNote}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#EE7104] px-8 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
                  >
                    <span>SUBMIT CUSTOM PACKAGE</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
