import { FormEvent, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, Clock } from 'lucide-react';
import { APPOINTMENT_TIME_SLOTS } from '../data/studioData';
import {
  AppointmentFormValues,
  SubmissionSummary,
  createSubmissionSummary,
  getServiceTitles,
  getUpcomingAppointmentDates,
  validateAppointmentForm,
} from '../utils/studioLogic';

interface AppointmentsPageProps {
  initialService?: string;
  onSubmitted: (summary: SubmissionSummary) => void;
}

export function AppointmentsPage({ initialService, onSubmitted }: AppointmentsPageProps) {
  const serviceOptions = useMemo(() => getServiceTitles(), []);
  const dateOptions = useMemo(() => getUpcomingAppointmentDates(new Date(), 8), []);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [values, setValues] = useState<AppointmentFormValues>({
    service:
      initialService && serviceOptions.includes(initialService)
        ? initialService
        : serviceOptions[0],
    date: dateOptions[0]?.fullLabel ?? '',
    timeSlot: APPOINTMENT_TIME_SLOTS[1],
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBookings, setConfirmedBookings] = useState<
    Array<{ id: string; service: string; date: string; timeSlot: string }>
  >([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateAppointmentForm(values);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const summary = createSubmissionSummary(
      'Consultation Appointment',
      `Appointment Request: ${values.service} (${values.date} at ${values.timeSlot})`,
      [
        { label: 'Service', value: values.service },
        { label: 'Preferred Date', value: values.date },
        { label: 'Time Slot', value: values.timeSlot },
        { label: 'Name', value: values.name },
        { label: 'Phone', value: values.phone },
        { label: 'Email', value: values.email },
        { label: 'Notes', value: values.notes || 'None' },
      ]
    );
    setConfirmedBookings((prev) => [
      {
        id: summary.id,
        service: values.service,
        date: values.date,
        timeSlot: values.timeSlot,
      },
      ...prev,
    ]);
    onSubmitted(summary);
    setValues((prev) => ({
      ...prev,
      name: '',
      phone: '',
      email: '',
      notes: '',
    }));
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono-tech text-[11px] text-[#D46200] dark:text-[#EE7104] mb-4">
            [ STUDIO CONSULTATION SCHEDULER ]
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] dark:text-white leading-[0.98] text-balance">
            Book a focused strategy{' '}
            <span className="font-editorial font-normal text-[#EE7104]">appointment.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Reserve a 1-on-1 discovery or Free Demo session with Grafino Studio in three quick steps.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-[#E5E7EB] dark:border-[#262626] py-5">
          {[
            { num: 1 as const, label: '01 / Choose Service' },
            { num: 2 as const, label: '02 / Date & Time Slot' },
            { num: 3 as const, label: '03 / Confirm Details' },
          ].map((item) => {
            const active = step === item.num;
            const completed = step > item.num;
            return (
              <button
                key={item.num}
                type="button"
                onClick={() => setStep(item.num)}
                className={`flex min-h-[46px] items-center justify-between rounded-xl border px-4 py-3 font-mono-tech text-[11px] transition-colors cursor-pointer ${
                  active
                    ? 'border-[#EE7104] bg-[#EE7104]/10 text-[#D46200] dark:text-[#EE7104] font-semibold'
                    : completed
                    ? 'border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-white'
                    : 'border-[#E5E7EB] dark:border-[#262626] text-[#52525B] dark:text-[#9CA3AF]'
                }`}
              >
                <span>{item.label}</span>
                {completed && <Check className="h-4 w-4 text-[#EE7104]" />}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Booking Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-10">
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                  Step 1: Choose your service or Free Demo topic
                </h2>
                <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                  Select the discipline you want to review with our team.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => {
                    const selected = values.service === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setValues({ ...values, service })}
                        aria-pressed={selected}
                        className={`flex min-h-[54px] items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#EE7104] bg-[#EE7104]/10 text-[#0A0A0A] dark:text-white'
                            : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] text-[#0A0A0A] dark:text-white hover:border-[#EE7104]/60'
                        }`}
                      >
                        <span>{service}</span>
                        {selected && <Check className="h-4 w-4 text-[#EE7104] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-7 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] transition-colors cursor-pointer"
                  >
                    <span>CONTINUE TO DATE &amp; TIME</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                  Step 2: Pick a date and time slot
                </h2>
                <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                  Studio consultations run Monday through Saturday in Pakistan Standard Time (PKT).
                </p>

                <div className="mt-6">
                  <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104] mb-3 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>AVAILABLE DATES</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {dateOptions.map((d) => {
                      const selected = values.date === d.fullLabel;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setValues({ ...values, date: d.fullLabel })}
                          aria-pressed={selected}
                          className={`rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                            selected
                              ? 'border-[#EE7104] bg-[#EE7104]/10 text-[#0A0A0A] dark:text-white'
                              : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] text-[#0A0A0A] dark:text-white hover:border-[#EE7104]/60'
                          }`}
                        >
                          <span className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                            {d.dayName}
                          </span>
                          <span className="mt-1 block font-display text-lg font-bold tabular-nums">
                            {d.monthShort} {d.dayNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104] mb-3 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>TIME SLOTS</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {APPOINTMENT_TIME_SLOTS.map((slot) => {
                      const selected = values.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setValues({ ...values, timeSlot: slot })}
                          aria-pressed={selected}
                          className={`min-h-[44px] rounded-xl border px-4 py-2.5 font-mono-tech text-xs transition-colors cursor-pointer tabular-nums ${
                            selected
                              ? 'border-[#EE7104] bg-[#EE7104] text-white font-semibold'
                              : 'border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] text-[#0A0A0A] dark:text-white hover:border-[#EE7104]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] px-5 py-2.5 font-mono-tech text-xs text-[#0A0A0A] dark:text-white hover:border-[#EE7104] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#EE7104] px-7 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] cursor-pointer"
                  >
                    <span>CONTINUE TO CONFIRM</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-white">
                    Step 3: Your contact information
                  </h2>
                  <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                    Confirm your details to lock your slot and dispatch via WhatsApp or Email.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="appt-name"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="appt-name"
                      type="text"
                      required
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full min-h-[44px] rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-phone"
                      className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                    >
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      id="appt-phone"
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

                <div>
                  <label
                    htmlFor="appt-email"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="appt-email"
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
                    htmlFor="appt-notes"
                    className="block font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF] mb-2"
                  >
                    PROJECT NOTES (OPTIONAL)
                  </label>
                  <textarea
                    id="appt-notes"
                    rows={3}
                    value={values.notes}
                    onChange={(e) => setValues({ ...values, notes: e.target.value })}
                    placeholder="Share links, scope, or questions you want covered during the call..."
                    className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] px-4 py-3 text-sm text-[#0A0A0A] dark:text-white focus:border-[#EE7104] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#262626] px-5 py-2.5 font-mono-tech text-xs text-[#0A0A0A] dark:text-white hover:border-[#EE7104] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>BACK</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#EE7104] px-8 py-3 font-mono-tech text-xs font-semibold text-white hover:bg-[#d86502] cursor-pointer"
                  >
                    <span>CONFIRM APPOINTMENT</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Live Booking Summary Card */}
          <aside className="lg:col-span-4 rounded-2xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] p-6 sm:p-8 tint-orange-top">
            <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104]">
              [ LIVE BOOKING SUMMARY ]
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-[#0A0A0A] dark:text-white">
              Consultation Slot
            </h3>

            <dl className="mt-6 space-y-4 border-y border-[#E5E7EB] dark:border-[#262626] py-5 text-sm">
              <div>
                <dt className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                  SERVICE
                </dt>
                <dd className="mt-1 font-semibold text-[#0A0A0A] dark:text-white">
                  {values.service}
                </dd>
              </div>
              <div>
                <dt className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                  DATE
                </dt>
                <dd className="mt-1 font-semibold text-[#0A0A0A] dark:text-white tabular-nums">
                  {values.date}
                </dd>
              </div>
              <div>
                <dt className="font-mono-tech text-[10px] text-[#52525B] dark:text-[#9CA3AF]">
                  TIME SLOT
                </dt>
                <dd className="mt-1 font-semibold text-[#D46200] dark:text-[#EE7104] tabular-nums">
                  {values.timeSlot}
                </dd>
              </div>
            </dl>

            {confirmedBookings.length > 0 && (
              <div className="mt-6">
                <p className="font-mono-tech text-[10px] text-[#D46200] dark:text-[#EE7104] mb-3">
                  BOOKED THIS SESSION ({confirmedBookings.length})
                </p>
                <ul className="space-y-2.5">
                  {confirmedBookings.map((b) => (
                    <li
                      key={b.id}
                      className="rounded-xl border border-[#E5E7EB] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#161616] p-3 text-xs"
                    >
                      <span className="font-mono-tech text-[10px] text-[#EE7104]">{b.id}</span>
                      <p className="font-semibold text-[#0A0A0A] dark:text-white mt-0.5">
                        {b.service}
                      </p>
                      <p className="text-[#52525B] dark:text-[#9CA3AF]">
                        {b.date} · {b.timeSlot}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
