import { FormEvent, useState } from 'react';
import { ArrowUpRight, Bell, X } from 'lucide-react';
import { EventSession, UPCOMING_EVENTS } from '../data/studioData';
import {
  EventRegisterValues,
  SubmissionSummary,
  createSubmissionSummary,
  validateEventRegistrationForm,
} from '../utils/studioLogic';

interface EventsPageProps {
  onSubmitted: (summary: SubmissionSummary) => void;
}

export function EventsPage({ onSubmitted }: EventsPageProps) {
  const [selectedSession, setSelectedSession] = useState<EventSession | null>(null);
  const [values, setValues] = useState<EventRegisterValues>({
    name: '',
    email: '',
    phone: '',
    sessionTitle: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const openRegistration = (session: EventSession) => {
    setSelectedSession(session);
    setValues({
      name: '',
      email: '',
      phone: '',
      sessionTitle: session.title,
    });
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateEventRegistrationForm(values);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const summary = createSubmissionSummary(
      'Event Interest Registration',
      `Event Notification Request: ${values.sessionTitle}`,
      [
        { label: 'Upcoming Session', value: values.sessionTitle },
        { label: 'Name', value: values.name },
        { label: 'Email', value: values.email },
        { label: 'Phone / WhatsApp', value: values.phone },
      ]
    );
    if (selectedSession) {
      setRegisteredIds((prev) =>
        prev.includes(selectedSession.id) ? prev : [...prev, selectedSession.id]
      );
    }
    setSelectedSession(null);
    onSubmitted(summary);
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ WORKSHOPS, WEBINARS & DESIGN SESSIONS ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Upcoming studio sessions open for{' '}
            <span className="font-editorial font-normal text-[#EE7104]">registration.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Register your interest to be notified as soon as seat schedules are finalized for Grafino Studio creative workshops, engineering talks, and Grafino AI live demos.
          </p>
        </div>

        {/* Editorial Schedule Table / Rows */}
        <div className="mt-12 border-t border-[#E5E7EB] dark:border-[#262626]">
          {UPCOMING_EVENTS.map((session) => {
            const isRegistered = registeredIds.includes(session.id);
            return (
              <article
                key={session.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-[#E5E7EB] dark:border-[#262626] py-8 transition-colors hover:bg-[#FFFFFF]/60 dark:hover:bg-[#111111]/60 px-2 sm:px-4"
              >
                <div className="lg:col-span-3">
                  <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104]">
                    [ {session.index} ] · {session.format.toUpperCase()}
                  </p>
                  <p className="mt-1.5 text-xs text-[#52525B] dark:text-[#9CA3AF]">
                    {session.duration} · {session.status}
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-xs font-medium text-[#52525B] dark:text-[#9CA3AF]">
                    {session.focus}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] dark:text-white">
                    {session.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                    {session.description}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:text-right">
                  <button
                    type="button"
                    onClick={() => openRegistration(session)}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 font-mono-tech text-[11px] font-semibold transition-colors cursor-pointer ${
                      isRegistered
                        ? 'border border-[#EE7104] text-[#D46200] dark:text-[#EE7104]'
                        : 'bg-[#EE7104] text-white hover:bg-[#d86502]'
                    }`}
                  >
                    <Bell className="h-3.5 w-3.5" />
                    <span>{isRegistered ? 'INTEREST REGISTERED' : 'REGISTER INTEREST'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Register Interest / Get Notified Modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
                  UPCOMING REGISTRATION · {selectedSession.format.toUpperCase()}
                </p>
                <h2
                  id="event-modal-title"
                  className="mt-1 font-display text-xl font-bold text-[#0A0A0A] dark:text-white"
                >
                  {selectedSession.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                aria-label="Close registration modal"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF] hover:border-[#EE7104] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="evt-name"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-1.5"
                >
                  YOUR NAME *
                </label>
                <input
                  id="evt-name"
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
                  htmlFor="evt-email"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-1.5"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="evt-email"
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
                  htmlFor="evt-phone"
                  className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-1.5"
                >
                  PHONE / WHATSAPP *
                </label>
                <input
                  id="evt-phone"
                  type="tel"
                  required
                  value={values.phone}
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                  placeholder="+92-3XX-XXXXXXX"
                  className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#EE7104] px-6 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
              >
                <span>GET NOTIFIED WHEN DATES OPEN</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
