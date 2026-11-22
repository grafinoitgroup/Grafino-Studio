import { STUDIO_INFO } from '../data/studioData';
import { SubmissionSummary } from '../utils/studioLogic';
import { ContactInquiryForm } from '../components/ContactInquiryForm';

interface ContactPageProps {
  initialSubject?: string;
  onSubmitted: (summary: SubmissionSummary) => void;
  onSocialPlaceholderClick: (network: string) => void;
}

export function ContactPage({
  initialSubject,
  onSubmitted,
  onSocialPlaceholderClick,
}: ContactPageProps) {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mb-12">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ CONTACT GRAFINO STUDIO ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Start a direct conversation with our{' '}
            <span className="font-editorial font-normal text-[#EE7104]">studio.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            {STUDIO_INFO.tagline} Send your brief using the form below or message us directly on WhatsApp at {STUDIO_INFO.phoneDisplay}.
          </p>
        </div>

        <ContactInquiryForm
          initialSubject={initialSubject}
          onSubmitted={onSubmitted}
          onSocialPlaceholderClick={onSocialPlaceholderClick}
        />
      </div>
    </div>
  );
}
