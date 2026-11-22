import {
  CORE_SERVICES,
  FaqItem,
  NAV_ITEMS,
  RoutePath,
  STUDIO_INFO,
  ServiceItem,
} from '../data/studioData';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface SubmissionSummary {
  id: string;
  formType: string;
  submittedAt: string;
  headline: string;
  fields: Array<{ label: string; value: string }>;
  whatsappUrl: string;
  mailtoUrl: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone.trim());
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createSubmissionSummary(
  formType: string,
  subject: string,
  fields: Array<{ label: string; value: string }>
): SubmissionSummary {
  const cleanFields = fields.filter((f) => f.value.trim().length > 0);
  const lines = [
    `Hello Grafino Studio,`,
    `Inquiry Type: ${formType}`,
    '',
    ...cleanFields.map((f) => `${f.label}: ${f.value}`),
  ];
  const messageBody = lines.join('\n');
  const code = `GS-${Date.now().toString(36).slice(-5).toUpperCase()}`;

  return {
    id: code,
    formType,
    submittedAt: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    headline: `${formType} Ready to Send`,
    fields: cleanFields,
    whatsappUrl: buildWhatsAppUrl(messageBody),
    mailtoUrl: buildMailtoUrl(subject, messageBody),
  };
}

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  question: string;
}

export function validateContactForm(values: ContactFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.phone.trim() && !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.subject.trim()) errors.subject = 'Please add a subject for your inquiry.';
  if (values.question.trim().length < 10) {
    errors.question = 'Please share at least 10 characters about your project or question.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface SubscriptionFormValues {
  name: string;
  phone: string;
  email: string;
  subscription: string;
  title: string;
  specialNote: string;
}

export function validateSubscriptionForm(values: SubscriptionFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Your Name is required.';
  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required.';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid phone number (7 to 20 digits).';
  }
  if (!values.email.trim()) {
    errors.email = 'Your Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.subscription.trim()) errors.subscription = 'Please select a subscription tier.';
  if (!values.title.trim()) errors.title = 'Project Title is required.';
  if (!values.specialNote.trim()) errors.specialNote = 'Please include a short Special Note.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface CustomPackageFormValues {
  name: string;
  phone: string;
  email: string;
  title: string;
  specialNote: string;
  productsName: string;
}

export function validateCustomPackageForm(values: CustomPackageFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Your Name is required.';
  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required.';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!values.email.trim()) {
    errors.email = 'Your Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.productsName.trim()) errors.productsName = 'Please list the services or products you need.';
  if (!values.specialNote.trim()) errors.specialNote = 'Special Note is required.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface HelpDeskFormValues {
  name: string;
  email: string;
  phone: string;
  category: string;
  priority: string;
  description: string;
}

export function validateHelpDeskForm(values: HelpDeskFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim() || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim() || !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid contact phone number.';
  }
  if (!values.category.trim()) errors.category = 'Select an issue category.';
  if (!values.priority.trim()) errors.priority = 'Select a priority level.';
  if (values.description.trim().length < 10) {
    errors.description = 'Describe your support request in at least 10 characters.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface AppointmentFormValues {
  service: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export function validateAppointmentForm(values: AppointmentFormValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.service.trim()) errors.service = 'Please select a service.';
  if (!values.date.trim()) errors.date = 'Please choose a preferred date.';
  if (!values.timeSlot.trim()) errors.timeSlot = 'Please pick an available time slot.';
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.phone.trim() || !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.email.trim() || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface JobApplicationValues {
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolio: string;
  note: string;
}

export function validateJobApplicationForm(values: JobApplicationValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Your name is required.';
  if (!values.email.trim() || !isValidEmail(values.email)) {
    errors.email = 'A valid email address is required.';
  }
  if (!values.phone.trim() || !isValidPhone(values.phone)) {
    errors.phone = 'A valid phone number is required.';
  }
  if (!values.role.trim()) errors.role = 'Please select a role track.';
  if (!values.portfolio.trim()) {
    errors.portfolio = 'Please share a portfolio, GitHub, Behance, or LinkedIn link.';
  }
  if (values.note.trim().length < 10) {
    errors.note = 'Add a brief note about your experience (min 10 characters).';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export interface EventRegisterValues {
  name: string;
  email: string;
  phone: string;
  sessionTitle: string;
}

export function validateEventRegistrationForm(values: EventRegisterValues): ValidationResult {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim() || !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim() || !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid WhatsApp or phone number.';
  }
  if (!values.sessionTitle.trim()) errors.sessionTitle = 'Select an upcoming session.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function filterServices(
  services: ServiceItem[],
  category: string,
  query: string
): ServiceItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return services.filter((service) => {
    const matchesCategory = category === 'All' || service.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      service.title.toLowerCase().includes(normalizedQuery) ||
      service.summary.toLowerCase().includes(normalizedQuery) ||
      service.deliverables.some((d) => d.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function filterFaqs(faqs: FaqItem[], query: string): FaqItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return faqs;
  return faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}

export function normalizeRoutePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const validPaths = new Set<string>(NAV_ITEMS.map((item) => item.path));
  if (validPaths.has(clean)) {
    return clean as RoutePath;
  }
  return '/';
}

export interface AppointmentDateOption {
  iso: string;
  dayName: string;
  dayNum: string;
  monthShort: string;
  fullLabel: string;
}

export function getUpcomingAppointmentDates(
  baseDate: Date = new Date(),
  count = 8
): AppointmentDateOption[] {
  const options: AppointmentDateOption[] = [];
  const cursor = new Date(baseDate.getTime());
  cursor.setDate(cursor.getDate() + 1);

  while (options.length < count) {
    // Skip Sundays (0) for studio consultations
    if (cursor.getDay() !== 0) {
      const iso = cursor.toISOString().slice(0, 10);
      const dayName = cursor.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = String(cursor.getDate()).padStart(2, '0');
      const monthShort = cursor.toLocaleDateString('en-US', { month: 'short' });
      options.push({
        iso,
        dayName,
        dayNum,
        monthShort,
        fullLabel: `${dayName}, ${monthShort} ${dayNum}`,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return options;
}

export function formatStudioClock(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Karachi',
    });
    return `EST. 2026 | ${formatter.format(date)} PKT`;
  } catch {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `EST. 2026 | ${hh}:${mm}`;
  }
}

export function getServiceTitles(): string[] {
  return [...CORE_SERVICES.map((s) => s.title), 'Grafino AI Solutions'];
}
