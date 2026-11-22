import { FormEvent, useState } from 'react';
import { ArrowUpRight, LifeBuoy } from 'lucide-react';
import { HELP_DESK_FAQS, LEADERSHIP_TEAM } from '../data/studioData';
import {
  HelpDeskFormValues,
  SubmissionSummary,
  createSubmissionSummary,
  validateHelpDeskForm,
} from '../utils/studioLogic';
import { FaqAccordion } from '../components/FaqAccordion';
import { MarqueeBanner } from '../components/MarqueeBanner';

interface HelpDeskPageProps {
  onSubmitted: (summary: SubmissionSummary) => void;
}

export function HelpDeskPage({ onSubmitted }: HelpDeskPageProps) {
  const ceo = LEADERSHIP_TEAM[0];
  const [values, setValues] = useState<HelpDeskFormValues>({
    name: '',
    email: '',
    phone: '',
    category: 'Website Support',
    priority: 'Normal',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recentTickets, setRecentTickets] = useState<
    Array<{ id: string; category: string; priority: string; summary: string }>
  >([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateHelpDeskForm(values);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const summary = createSubmissionSummary(
      'Help Desk Ticket',
      `[${values.priority}] Help Desk: ${values.category}`,
      [
        { label: 'Name', value: values.name },
        { label: 'Email', value: values.email },
        { label: 'Phone', value: values.phone },
        { label: 'Issue Category', value: values.category },
        { label: 'Priority', value: values.priority },
        { label: 'Description', value: values.description },
      ]
    );

    setRecentTickets((prev) => [
      {
        id: summary.id,
        category: values.category,
        priority: values.priority,
        summary: values.description.slice(0, 90),
      },
      ...prev,
    ]);
    onSubmitted(summary);
    setValues({
      name: '',
      email: '',
      phone: '',
      category: 'Website Support',
      priority: 'Normal',
      description: '',
    });
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
              [ GRAFINO STUDIO SUPPORT CENTER ]
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
              Dedicated Help Desk built for fast{' '}
              <span className="font-editorial font-normal text-[#EE7104]">resolution.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF] max-w-2xl">
              Need revisions, technical troubleshooting, billing guidance, or project status updates? Open a support ticket below or search our answers index.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href="#help-ticket-form"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-6 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors"
            >
              <LifeBuoy className="h-4 w-4" />
              <span>START NOW</span>
            </a>
          </div>
        </div>

        {/* CEO Help Desk Quote */}
        <section className="mt-12 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-7 sm:p-9 tint-orange-top">
          <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
            [ CLIENT COMMITMENT ]
          </p>
          <blockquote className="mt-3 font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A] dark:text-white max-w-3xl">
            &ldquo;{ceo.helpDeskQuote ?? ceo.quote}&rdquo;
          </blockquote>
          <p className="mt-4 text-xs text-[#52525B] dark:text-[#9CA3AF]">
            {ceo.name} · {ceo.role}, {ceo.organization}
          </p>
        </section>

        {/* Interactive Support Ticket Form */}
        <section
          id="help-ticket-form"
          className="mt-12 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]"
        >
          <MarqueeBanner phrase="OPEN A SUPPORT TICKET" />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] dark:border-[#262626] p-6 sm:p-9">
              <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                [ TICKET QUEUE ]
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                Start Now
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Every submitted ticket generates a unique reference code and pre-filled WhatsApp and Email dispatch links so your request reaches the right specialist immediately.
              </p>

              {recentTickets.length > 0 && (
                <div className="mt-6 border-t border-[#E5E7EB] dark:border-[#262626] pt-5">
                  <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104] mb-3">
                    SESSION TICKETS ({recentTickets.length})
                  </p>
                  <ul className="space-y-3">
                    {recentTickets.map((t) => (
                      <li
                        key={t.id}
                        className="rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] p-3 text-xs"
                      >
                        <div className="flex items-center justify-between font-mono-tech text-[10px]">
                          <span className="text-[#EE7104]">{t.id}</span>
                          <span className="text-[#52525B] dark:text-[#9CA3AF]">{t.priority}</span>
                        </div>
                        <p className="mt-1 font-semibold text-[#0A0A0A] dark:text-white">
                          {t.category}
                        </p>
                        <p className="mt-0.5 text-[#52525B] dark:text-[#9CA3AF] truncate">
                          {t.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 p-6 sm:p-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="hd-name"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    NAME *
                  </label>
                  <input
                    id="hd-name"
                    type="text"
                    required
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label
                    htmlFor="hd-email"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    EMAIL *
                  </label>
                  <input
                    id="hd-email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="hd-phone"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    PHONE *
                  </label>
                  <input
                    id="hd-phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    placeholder="+92-3XX-XXXXXXX"
                    className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="hd-category"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    ISSUE CATEGORY *
                  </label>
                  <select
                    id="hd-category"
                    value={values.category}
                    onChange={(e) => setValues({ ...values, category: e.target.value })}
                    className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  >
                    <option value="Website Support">Website Support</option>
                    <option value="Graphic & Print Revision">Graphic &amp; Print Revision</option>
                    <option value="Custom Software / Bug Fix">Custom Software / Bug Fix</option>
                    <option value="SEO & Campaign Report">SEO &amp; Campaign Report</option>
                    <option value="Grafino AI Solutions">Grafino AI Solutions</option>
                    <option value="Billing & Packages">Billing &amp; Packages</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="hd-priority"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    PRIORITY *
                  </label>
                  <select
                    id="hd-priority"
                    value={values.priority}
                    onChange={(e) => setValues({ ...values, priority: e.target.value })}
                    className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  >
                    <option value="Low">Low (General Question)</option>
                    <option value="Normal">Normal (Standard Turnaround)</option>
                    <option value="High">High (Active Project Blocker)</option>
                    <option value="Urgent">Urgent (Live Site Down)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="hd-description"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  DESCRIPTION *
                </label>
                <textarea
                  id="hd-description"
                  rows={4}
                  required
                  value={values.description}
                  onChange={(e) => setValues({ ...values, description: e.target.value })}
                  placeholder="Describe the issue, project name, URL, or revision needed..."
                  className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none resize-y"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#EE7104] px-8 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
              >
                <span>SUBMIT SUPPORT TICKET</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Searchable FAQ Accordion */}
        <section className="mt-16">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
            [ KNOWLEDGE BASE ]
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] dark:text-white mb-6">
            Search Help Desk Answers
          </h2>
          <FaqAccordion items={HELP_DESK_FAQS} searchable allowHoverDesktop={false} />
        </section>
      </div>
    </div>
  );
}
