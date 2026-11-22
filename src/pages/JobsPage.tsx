import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JOB_TRACKS, STUDIO_INFO } from '../data/studioData';
import {
  JobApplicationValues,
  SubmissionSummary,
  createSubmissionSummary,
  validateJobApplicationForm,
} from '../utils/studioLogic';
import { MarqueeBanner } from '../components/MarqueeBanner';

interface JobsPageProps {
  onSubmitted: (summary: SubmissionSummary) => void;
}

export function JobsPage({ onSubmitted }: JobsPageProps) {
  const [values, setValues] = useState<JobApplicationValues>({
    name: '',
    email: '',
    phone: '',
    role: JOB_TRACKS[0].title,
    portfolio: '',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRoles, setSubmittedRoles] = useState<string[]>([]);

  const selectRole = (title: string) => {
    setValues((prev) => ({ ...prev, role: title }));
    document.getElementById('job-application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateJobApplicationForm(values);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const summary = createSubmissionSummary(
      'Career Application',
      `Job Application: ${values.role} (${values.name})`,
      [
        { label: 'Name', value: values.name },
        { label: 'Email', value: values.email },
        { label: 'Phone', value: values.phone },
        { label: 'Role Track', value: values.role },
        { label: 'Portfolio Link', value: values.portfolio },
        { label: 'Note', value: values.note },
      ]
    );
    setSubmittedRoles((prev) => [values.role, ...prev]);
    onSubmitted(summary);
    setValues({
      name: '',
      email: '',
      phone: '',
      role: JOB_TRACKS[0].title,
      portfolio: '',
      note: '',
    });
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ CAREERS AT GRAFINO STUDIO ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Build meaningful creative work with{' '}
            <span className="font-editorial font-normal text-[#EE7104]">discipline.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Based in {STUDIO_INFO.location} and collaborating digitally, we welcome designers, full-stack engineers, SEO strategists, and video editors who care deeply about craft.
          </p>
        </div>

        {/* Studio Culture Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              idx: '01',
              title: 'Craft Before Hype',
              desc: 'We ship crisp design systems, maintainable code, and measurable marketing results rather than shortcuts.',
            },
            {
              idx: '02',
              title: 'Cross-Disciplinary Growth',
              desc: 'Work alongside graphic designers, programmers, marketers, and AI innovators on real client launches.',
            },
            {
              idx: '03',
              title: 'Ownership & Reliability',
              desc: 'Direct mentorship, clear milestones, and respect for focused deep work across every project track.',
            },
          ].map((pillar) => (
            <div
              key={pillar.idx}
              className="rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6"
            >
              <span className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                [ {pillar.idx} ] · STUDIO CULTURE
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-[#0A0A0A] dark:text-white">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Open Creative & Engineering Tracks */}
        <section className="mt-16">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-3">
            [ OPEN TRACKS ]
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] dark:text-white mb-8">
            Current Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOB_TRACKS.map((track) => {
              const selected = values.role === track.title;
              return (
                <article
                  key={track.id}
                  className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-colors ${
                    selected
                      ? 'border-[#EE7104] bg-[#FFFFFF] dark:bg-[#141414] tint-orange-top'
                      : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px]">
                      <span className="text-[#D46200] dark:text-[#EE7104]">
                        [ {track.index} ] · {track.department}
                      </span>
                      <span className="text-[#52525B] dark:text-[#9CA3AF]">
                        {track.location}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                      {track.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#52525B] dark:text-[#9CA3AF]">
                      {track.skills.map((skill, idx) => (
                        <span key={skill} className="inline-flex items-center gap-2">
                          <span>{skill}</span>
                          {idx < track.skills.length - 1 && <span aria-hidden="true">·</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] dark:border-[#262626] pt-4">
                    <span className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                      {track.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => selectRole(track.title)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#EE7104] px-4 py-2 font-mono-tech text-[10px] font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
                    >
                      <span>APPLY FOR TRACK</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Application Form */}
        <section
          id="job-application-form"
          className="mt-16 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]"
        >
          <MarqueeBanner phrase="JOIN GRAFINO STUDIO" />

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-5">
            {submittedRoles.length > 0 && (
              <div className="rounded-xl border border-[#EE7104]/40 bg-[#EE7104]/10 px-4 py-3 text-xs text-[#0A0A0A] dark:text-white">
                Application recorded for <span className="font-semibold">{submittedRoles[0]}</span>.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="job-name"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  NAME *
                </label>
                <input
                  id="job-name"
                  type="text"
                  required
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="job-email"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  EMAIL *
                </label>
                <input
                  id="job-email"
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
                  htmlFor="job-phone"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  PHONE *
                </label>
                <input
                  id="job-phone"
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
                  htmlFor="job-role"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  ROLE TRACK *
                </label>
                <select
                  id="job-role"
                  value={values.role}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                  className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                >
                  {JOB_TRACKS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="job-portfolio"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                >
                  PORTFOLIO / GITHUB / BEHANCE LINK *
                </label>
                <input
                  id="job-portfolio"
                  type="url"
                  required
                  value={values.portfolio}
                  onChange={(e) => setValues({ ...values, portfolio: e.target.value })}
                  placeholder="https://..."
                  className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                />
                {errors.portfolio && (
                  <p className="mt-1 text-xs text-red-500">{errors.portfolio}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="job-note"
                className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
              >
                NOTE *
              </label>
              <textarea
                id="job-note"
                rows={4}
                required
                value={values.note}
                onChange={(e) => setValues({ ...values, note: e.target.value })}
                placeholder="Share your background, key shipped work, and availability..."
                className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none resize-y"
              />
              {errors.note && <p className="mt-1 text-xs text-red-500">{errors.note}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#EE7104] px-8 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
            >
              <span>SUBMIT APPLICATION</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
