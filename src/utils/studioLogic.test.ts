import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CORE_SERVICES,
  HELP_DESK_FAQS,
  HOME_CAPABILITIES,
  HOME_FAQS,
  JOB_TRACKS,
  LEADERSHIP_TEAM,
  NAV_ITEMS,
  PACKAGE_TIERS,
  PHILOSOPHY_STATEMENT,
  SHOWCASE_WORKS,
  STUDIO_INFO,
  UPCOMING_EVENTS,
  VERIFIED_METRICS,
} from '../data/studioData';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  createSubmissionSummary,
  filterFaqs,
  filterServices,
  formatStudioClock,
  getUpcomingAppointmentDates,
  normalizeRoutePath,
  validateAppointmentForm,
  validateContactForm,
  validateCustomPackageForm,
  validateEventRegistrationForm,
  validateHelpDeskForm,
  validateJobApplicationForm,
  validateSubscriptionForm,
} from './studioLogic';

test('verified business facts and zero prohibited copy strings', () => {
  assert.equal(STUDIO_INFO.brandName, 'Grafino Studio');
  assert.equal(STUDIO_INFO.location, 'Mustafa Town, Haroonabad, Pakistan');
  assert.equal(STUDIO_INFO.phoneDisplay, '+92-332-7551182');
  assert.equal(STUDIO_INFO.email, 'info@grafino.dpnds.org');
  assert.equal(STUDIO_INFO.aiPlatformUrl, 'https://grafinoai.qzz.io/');
  assert.equal(NAV_ITEMS.length, 11);
  assert.equal(CORE_SERVICES.length, 9);
  assert.equal(VERIFIED_METRICS.length, 6);
  assert.equal(LEADERSHIP_TEAM.length, 3);
  assert.deepEqual(
    LEADERSHIP_TEAM.map((l) => l.name),
    ['Abdul Basit', 'Naina', 'Saba Saleem']
  );
  assert.deepEqual(
    VERIFIED_METRICS.map((m) => m.displayValue),
    ['45%', '85%', '60%', '2,000', '1,200', '500']
  );

  // Ensure zero em-dashes, zero sparkles, zero Odoo remnants, zero Mustfa typo in all data
  const serialized = JSON.stringify({
    STUDIO_INFO,
    NAV_ITEMS,
    VERIFIED_METRICS,
    CORE_SERVICES,
    HOME_CAPABILITIES,
    SHOWCASE_WORKS,
    LEADERSHIP_TEAM,
    PACKAGE_TIERS,
    HOME_FAQS,
    HELP_DESK_FAQS,
    UPCOMING_EVENTS,
    JOB_TRACKS,
    PHILOSOPHY_STATEMENT,
  });
  assert.equal(serialized.includes('\u2014'), false, 'Data must not contain em-dash characters');
  assert.equal(serialized.includes('\u2728'), false, 'Data must not contain sparkle emoji');
  assert.equal(/odoo|mustfa town/i.test(serialized), false, 'Data must not contain Odoo or Mustfa typo');

  // Ensure pricing tiers never invent numeric dollar prices
  for (const tier of PACKAGE_TIERS) {
    assert.equal(tier.priceLabel, 'Custom Quote');
  }
});

test('WhatsApp and mailto builders encode payloads cleanly', () => {
  const wa = buildWhatsAppUrl('Hello Grafino Studio & Team');
  assert.equal(wa.startsWith('https://wa.me/923327551182?text='), true);
  assert.equal(wa.includes('Hello%20Grafino%20Studio%20%26%20Team'), true);

  const mail = buildMailtoUrl('Starter Quote', 'Line 1\nLine 2');
  assert.equal(mail.startsWith('mailto:info@grafino.dpnds.org?subject='), true);
  assert.equal(mail.includes('Starter%20Quote'), true);

  const summary = createSubmissionSummary('Contact Inquiry', 'Web Redesign', [
    { label: 'Name', value: 'Ayesha Khan' },
    { label: 'Company', value: '' },
  ]);
  assert.equal(summary.fields.length, 1);
  assert.equal(summary.whatsappUrl.includes('Ayesha%20Khan'), true);
});

test('contact form validation rejects missing/invalid fields and accepts valid data', () => {
  const bad = validateContactForm({
    name: '',
    phone: '12',
    email: 'invalid',
    company: '',
    subject: '',
    question: 'short',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.phone);
  assert.ok(bad.errors.subject);
  assert.ok(bad.errors.question);

  const good = validateContactForm({
    name: 'Bilal Ahmed',
    phone: '+92-300-1234567',
    email: 'bilal@example.com',
    company: 'Crescent Mills',
    subject: 'Brand Redesign',
    question: 'We need a complete graphic design and responsive web overhaul.',
  });
  assert.equal(good.valid, true);
  assert.deepEqual(good.errors, {});
});

test('subscription and custom package validators enforce required fields', () => {
  const badSub = validateSubscriptionForm({
    name: '',
    phone: '',
    email: 'nope',
    subscription: '',
    title: '',
    specialNote: '',
  });
  assert.equal(badSub.valid, false);
  assert.equal(Object.keys(badSub.errors).length, 6);

  const goodSub = validateSubscriptionForm({
    name: 'Usman Tariq',
    phone: '+92 332 7551182',
    email: 'usman@brand.pk',
    subscription: 'Growth Package',
    title: 'E-Commerce Growth Sprint',
    specialNote: 'Need web redesign plus SEO rollout.',
  });
  assert.equal(goodSub.valid, true);

  const goodCustom = validateCustomPackageForm({
    name: 'Zainab Ali',
    phone: '+923321112233',
    email: 'zainab@studio.pk',
    title: 'Launch Bundle',
    productsName: 'Web Design, Video Production, Custom Song Creation',
    specialNote: 'Target launch in 6 weeks.',
  });
  assert.equal(goodCustom.valid, true);
});

test('help desk, appointments, jobs, and events validators work accurately', () => {
  assert.equal(
    validateHelpDeskForm({
      name: 'Hamza',
      email: 'hamza@company.com',
      phone: '+92-301-9988776',
      category: 'Website Support',
      priority: 'High',
      description: 'Need assistance updating DNS and SSL settings.',
    }).valid,
    true
  );

  assert.equal(
    validateAppointmentForm({
      service: 'Web Design',
      date: '2026-12-01',
      timeSlot: '02:00 PM PKT',
      name: 'Hira Malik',
      phone: '+92-321-4455667',
      email: 'hira@example.com',
      notes: 'Bringing current site brief',
    }).valid,
    true
  );

  assert.equal(
    validateJobApplicationForm({
      name: 'Omar Farooq',
      email: 'omar@dev.io',
      phone: '+92-345-2233445',
      role: 'Full-Stack Web Developer',
      portfolio: 'https://github.com/omar',
      note: '4 years of React and TypeScript production experience.',
    }).valid,
    true
  );

  assert.equal(
    validateEventRegistrationForm({
      name: 'Sana Iqbal',
      email: 'sana@design.co',
      phone: '+92-333-1122334',
      sessionTitle: UPCOMING_EVENTS[0].title,
    }).valid,
    true
  );
});

test('service filtering, FAQ filtering, routing, and date/clock utilities', () => {
  const eng = filterServices(CORE_SERVICES, 'Engineering', '');
  assert.equal(eng.length, 2);

  const song = filterServices(CORE_SERVICES, 'All', 'jingles');
  assert.equal(song.length, 1);
  assert.equal(song[0].id, 'custom-song-creation');

  const demoFaqs = filterFaqs(HELP_DESK_FAQS, 'free demo');
  assert.equal(demoFaqs.length >= 1, true);

  assert.equal(normalizeRoutePath('/subscription-package/'), '/subscription-package');
  assert.equal(normalizeRoutePath('/unknown-route'), '/');

  const dates = getUpcomingAppointmentDates(new Date('2026-11-20T10:00:00Z'), 6);
  assert.equal(dates.length, 6);
  for (const d of dates) {
    assert.notEqual(d.dayName, 'Sun');
  }

  const clock = formatStudioClock(new Date('2026-11-20T10:00:00Z'));
  assert.equal(clock.startsWith('EST. 2026 | '), true);
});
