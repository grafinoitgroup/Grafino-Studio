import { useEffect } from 'react';
import { CheckCircle2, Mail, MessageSquare, X } from 'lucide-react';
import { SubmissionSummary } from '../utils/studioLogic';

interface SubmissionModalProps {
  submission: SubmissionSummary | null;
  onClose: () => void;
}

export function SubmissionModal({ submission, onClose }: SubmissionModalProps) {
  useEffect(() => {
    if (!submission) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submission, onClose]);

  if (!submission) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-8 text-[#0A0A0A] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EE7104]/40 bg-[#EE7104]/10 text-[#EE7104]">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                REFERENCE {submission.id} · {submission.submittedAt}
              </p>
              <h3
                id="submission-modal-title"
                className="font-display text-xl font-bold tracking-tight"
              >
                {submission.headline}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation modal"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] hover:text-[#EE7104] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
          Your details have been validated and recorded locally. Dispatch them directly to the Grafino Studio desk using WhatsApp or Email below for immediate follow-up.
        </p>

        <dl className="mt-5 divide-y divide-[#E5E7EB] dark:divide-[#262626] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#0A0A0A] px-4">
          {submission.fields.map((field) => (
            <div key={field.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2.5 text-xs">
              <dt className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                {field.label}
              </dt>
              <dd className="font-medium text-[#0A0A0A] dark:text-white sm:text-right break-words max-w-xs">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={submission.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#EE7104] px-5 py-2.5 font-mono-tech text-[11px] font-semibold text-white hover:bg-[#d86502] transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>SEND VIA WHATSAPP</span>
          </a>
          <a
            href={submission.mailtoUrl}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-5 py-2.5 font-mono-tech text-[11px] font-semibold text-[#0A0A0A] dark:text-white hover:border-[#EE7104] transition-colors"
          >
            <Mail className="h-4 w-4 text-[#EE7104]" />
            <span>SEND VIA EMAIL</span>
          </a>
        </div>
      </div>
    </div>
  );
}
