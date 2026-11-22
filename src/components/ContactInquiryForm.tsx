import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import {
  ContactFormValues,
  SubmissionSummary,
  buildWhatsAppUrl,
  createSubmissionSummary,
  validateContactForm,
} from '../utils/studioLogic';
import { MarqueeBanner } from './MarqueeBanner';

interface ContactInquiryFormProps {
  onSubmitted: (summary: SubmissionSummary) => void;
  onSocialPlaceholderClick: (network: string) => void;
  initialSubject?: string;
}

export function ContactInquiryForm({
  onSubmitted,
  onSocialPlaceholderClick,
  initialSubject = '',
}: ContactInquiryFormProps) {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: initialSubject,
    question: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastRef, setLastRef] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const summary = createSubmissionSummary(
      'Contact Inquiry',
      `Grafino Studio Inquiry: ${values.subject}`,
      [
        { label: 'Name', value: values.name },
        { label: 'Phone Number', value: values.phone || 'Not provided' },
        { label: 'Email', value: values.email },
        { label: 'Company', value: values.company || 'Not provided' },
        { label: 'Subject', value: values.subject },
        { label: 'Question', value: values.question },
      ]
    );
    setLastRef(summary.id);
    onSubmitted(summary);
    setValues({
      name: '',
      phone: '',
      email: '',
      company: '',
      subject: '',
      question: '',
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]">
      <MarqueeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Studio Info Card */}
        <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E7EB] dark:border-[#262626] p-6 sm:p-10 tint-orange-top">
          <div>
            <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
              [ STUDIO DESK ]
            </p>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[1.05]">
              Bring your next project to{' '}
              <span className="font-editorial font-normal text-[#EE7104]">ambition.</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
              {STUDIO_INFO.tagline} Share your requirements and our creative, software, and growth leads will reply promptly.
            </p>

            <div className="mt-8 space-y-4 border-t border-[#E5E7EB] dark:border-[#262626] pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#EE7104] mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                    LOCATION
                  </p>
                  <p className="mt-0.5 font-medium text-[#0A0A0A] dark:text-white">
                    {STUDIO_INFO.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#EE7104] mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                    PHONE / WHATSAPP
                  </p>
                  <a
                    href={`tel:${STUDIO_INFO.phoneDisplay}`}
                    className="mt-0.5 block font-medium text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
                  >
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#EE7104] mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${STUDIO_INFO.email}`}
                    className="mt-0.5 block font-medium text-[#0A0A0A] dark:text-white hover:text-[#EE7104] transition-colors"
                  >
                    {STUDIO_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E5E7EB] dark:border-[#262626]">
            <a
              href={buildWhatsAppUrl('Hello Grafino Studio, I would like to start a conversation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#EE7104] px-4 py-2.5 font-mono-tech text-[11px] font-semibold text-white hover:bg-[#d86502] transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WHATSAPP QUICK CHAT</span>
            </a>
            <a
              href={STUDIO_INFO.socials.instagram}
              onClick={(e) => {
                if (STUDIO_INFO.socials.instagram === '#') {
                  e.preventDefault();
                  onSocialPlaceholderClick('Instagram');
                }
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-[#E5E7EB] dark:border-[#262626] px-4 py-2.5 font-mono-tech text-[11px] text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors"
            >
              <span>INSTAGRAM</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#EE7104]" />
            </a>
          </div>
        </div>

        {/* Right Validated Contact Form */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 p-6 sm:p-10 space-y-5">
          {lastRef && (
            <div className="rounded-xl border border-[#EE7104]/40 bg-[#EE7104]/10 px-4 py-3 text-xs text-[#0A0A0A] dark:text-white">
              Inquiry recorded under reference <span className="font-mono-tech font-semibold text-[#D46200] dark:text-[#EE7104]">{lastRef}</span>. You can send another inquiry anytime.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
              >
                NAME *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="Your full name"
                className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
              >
                PHONE NUMBER
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={values.phone}
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
                placeholder="+92-3XX-XXXXXXX"
                className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
              >
                EMAIL *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label
                htmlFor="contact-company"
                className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
              >
                COMPANY
              </label>
              <input
                id="contact-company"
                type="text"
                value={values.company}
                onChange={(e) => setValues({ ...values, company: e.target.value })}
                placeholder="Brand or organization"
                className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
            >
              SUBJECT *
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              value={values.subject}
              onChange={(e) => setValues({ ...values, subject: e.target.value })}
              placeholder="Web Design, Branding, SEO, Custom Software, or General Inquiry"
              className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none"
            />
            {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
          </div>

          <div>
            <label
              htmlFor="contact-question"
              className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
            >
              QUESTION *
            </label>
            <textarea
              id="contact-question"
              rows={4}
              required
              value={values.question}
              onChange={(e) => setValues({ ...values, question: e.target.value })}
              placeholder="Tell us about your project timeline, goals, and deliverables..."
              className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white placeholder:text-[#71717A] focus:border-[#EE7104] focus:outline-none resize-y"
            />
            {errors.question && <p className="mt-1.5 text-xs text-red-500">{errors.question}</p>}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <p className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
              Instant confirmation with one-click WhatsApp & Email dispatch.
            </p>
            <button
              type="submit"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#EE7104] px-7 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer shrink-0"
            >
              <span>SUBMIT INQUIRY</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
