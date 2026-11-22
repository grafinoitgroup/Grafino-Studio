export type RoutePath =
  | '/'
  | '/services'
  | '/pricing'
  | '/subscription-package'
  | '/our-ai-tools'
  | '/help-desk'
  | '/appointments'
  | '/events'
  | '/jobs'
  | '/about-us'
  | '/contact';

export interface NavItem {
  label: string;
  bracketLabel: string;
  path: RoutePath;
  group: 'primary' | 'more';
}

export interface StudioMetric {
  id: string;
  numericValue: number;
  suffix: string;
  displayValue: string;
  label: string;
  detail: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: 'Design' | 'Engineering' | 'Marketing' | 'Production' | 'AI';
  shortTag: string;
  summary: string;
  deliverables: string[];
  freeDemo: boolean;
  tint: 'orange' | 'magenta' | 'cyan';
}

export interface CapabilityCard {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  targetPath: RoutePath;
}

export interface ShowcaseWork {
  id: string;
  index: string;
  category: string;
  title: string;
  discipline: string;
  summary: string;
  highlights: string[];
  tint: 'orange' | 'magenta' | 'cyan';
  mockupStyle: 'brand' | 'web' | 'software' | 'ai';
  image?: string;
}

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  helpDeskQuote?: string;
  focusArea: string;
}

export interface PackageTier {
  id: string;
  index: string;
  name: 'Starter Package' | 'Growth Package' | 'Premium Package';
  priceLabel: string;
  ctaLabel: string;
  summary: string;
  idealFor: string;
  included: string[];
  featured?: boolean;
  tint: 'orange' | 'magenta' | 'cyan';
}

export interface FaqItem {
  id: string;
  index: string;
  category: string;
  question: string;
  answer: string;
}

export interface EventSession {
  id: string;
  index: string;
  format: 'Workshop' | 'Webinar' | 'Live Session';
  title: string;
  focus: string;
  description: string;
  status: string;
  duration: string;
}

export interface JobTrack {
  id: string;
  index: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  skills: string[];
}

export const STUDIO_INFO = {
  brandName: 'Grafino Studio',
  shortMark: 'GRAFINO',
  tagline: "From design to delivery, we've got you covered.",
  heroStatement: 'Transform your online identity for success',
  location: 'Mustafa Town, Haroonabad, Pakistan',
  phoneDisplay: '+92-332-7551182',
  whatsappNumber: '923327551182',
  email: 'info@grafino.dpnds.org',
  aiPlatformUrl: 'https://grafinoai.qzz.io/',
  aiPlatformCta: 'Explore Grafino AI Solutions',
  // Paste your local logo image path here (e.g., './logo.webp' or '/Grafino studio.webp') to replace the vector emblem.
  logoSrc: '',
  socials: {
    // Replace '#' with your exact official Grafino Studio profile URLs
    instagram: '#', // Instagram handle URL
    linkedin: '#', // LinkedIn company page URL
    twitter: '#', // Twitter / X profile URL
  },
} as const;

export const STUDIO_IMAGES = {
  brandDesign: '/src/assets/images/capability_brand_design_1795174551964.jpg',
  webEngineering: '/src/assets/images/capability_web_engineering_1795174563078.jpg',
  videoProduction: '/src/assets/images/capability_video_production_1795174551374.jpg',
  digitalGrowth: '/src/assets/images/capability_digital_growth_1795174561437.jpg',
  showcaseEditorial: '/src/assets/images/showcase_studio_editorial_1795174551547.jpg',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', bracketLabel: '[HOME]', path: '/', group: 'primary' },
  { label: 'Services', bracketLabel: '[SERVICES]', path: '/services', group: 'primary' },
  { label: 'Pricing', bracketLabel: '[PRICING]', path: '/pricing', group: 'primary' },
  { label: 'Packages', bracketLabel: '[PACKAGES]', path: '/subscription-package', group: 'primary' },
  { label: 'AI Tools', bracketLabel: '[AI TOOLS]', path: '/our-ai-tools', group: 'primary' },
  { label: 'About', bracketLabel: '[ABOUT]', path: '/about-us', group: 'primary' },
  { label: 'Contact', bracketLabel: '[CONTACT]', path: '/contact', group: 'primary' },
  { label: 'Help Desk', bracketLabel: '[HELP DESK]', path: '/help-desk', group: 'more' },
  { label: 'Appointments', bracketLabel: '[APPOINTMENTS]', path: '/appointments', group: 'more' },
  { label: 'Events', bracketLabel: '[EVENTS]', path: '/events', group: 'more' },
  { label: 'Jobs', bracketLabel: '[JOBS]', path: '/jobs', group: 'more' },
];

export const VERIFIED_METRICS: StudioMetric[] = [
  {
    id: 'satisfaction',
    numericValue: 45,
    suffix: '%',
    displayValue: '45%',
    label: 'Increase in client satisfaction',
    detail: 'Measured across iterative design reviews and post-delivery client feedback cycles.',
  },
  {
    id: 'repeat-business',
    numericValue: 85,
    suffix: '%',
    displayValue: '85%',
    label: 'Repeat business rate',
    detail: 'Long-term creative and engineering retainers built on consistent delivery.',
  },
  {
    id: 'web-performance',
    numericValue: 60,
    suffix: '%',
    displayValue: '60%',
    label: 'Website performance improvement',
    detail: 'Faster load speeds, cleaner front-end architecture, and technical SEO readiness.',
  },
  {
    id: 'happy-clients',
    numericValue: 2000,
    suffix: '',
    displayValue: '2,000',
    label: 'Happy clients served',
    detail: 'Businesses, founders, and creators partnered with Grafino Studio across regions.',
  },
  {
    id: 'projects-completed',
    numericValue: 1200,
    suffix: '',
    displayValue: '1,200',
    label: 'Projects completed',
    detail: 'End-to-end brand systems, software builds, video campaigns, and print deliverables.',
  },
  {
    id: 'websites-launched',
    numericValue: 500,
    suffix: '',
    displayValue: '500',
    label: 'Websites launched',
    detail: 'Responsive web platforms built for conversion, clarity, and lasting reliability.',
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'graphic-design',
    index: '01',
    title: 'Graphic Design',
    category: 'Design',
    shortTag: 'VISUAL IDENTITY',
    summary:
      'Distinctive brand identities, logo systems, social media kits, and editorial layouts engineered to command immediate recognition.',
    deliverables: ['Logo & Brand Guidelines', 'Social Media Visual Systems', 'Packaging & Editorial Layouts'],
    freeDemo: true,
    tint: 'orange',
  },
  {
    id: 'web-design',
    index: '02',
    title: 'Web Design',
    category: 'Engineering',
    shortTag: 'DIGITAL ARCHITECTURE',
    summary:
      'High-contrast, responsive websites crafted for speed, conversion clarity, and effortless navigation across desktop and mobile.',
    deliverables: ['Custom UI/UX Architecture', 'Responsive Web Development', 'Performance Optimization'],
    freeDemo: true,
    tint: 'cyan',
  },
  {
    id: 'seo',
    index: '03',
    title: 'SEO',
    category: 'Marketing',
    shortTag: 'SEARCH VISIBILITY',
    summary:
      'Technical search optimization, keyword architecture, and on-page strategy that turn search intent into measurable organic traffic.',
    deliverables: ['Technical Site Audits', 'On-Page & Local SEO', 'Keyword & Ranking Strategy'],
    freeDemo: true,
    tint: 'magenta',
  },
  {
    id: 'custom-software',
    index: '04',
    title: 'Custom Software',
    category: 'Engineering',
    shortTag: 'SYSTEMS ENGINEERING',
    summary:
      'Tailored software solutions, internal operational tools, and scalable web applications built around your exact business workflows.',
    deliverables: ['Business Workflow Applications', 'API & Database Architecture', 'Ongoing Maintenance'],
    freeDemo: true,
    tint: 'cyan',
  },
  {
    id: 'print-marketing',
    index: '05',
    title: 'Print Marketing',
    category: 'Design',
    shortTag: 'TACTILE COLLATERAL',
    summary:
      'Print-ready brochures, business stationery, banners, and promotional packaging prepared with strict press specifications.',
    deliverables: ['Brochures & Catalogs', 'Business Cards & Stationery', 'Large-Format Signage'],
    freeDemo: true,
    tint: 'orange',
  },
  {
    id: 'content-writing',
    index: '06',
    title: 'Content Writing',
    category: 'Marketing',
    shortTag: 'BRAND VOICE',
    summary:
      'Clear, persuasive website copy, SEO articles, and campaign scripts written to build authority and move readers to action.',
    deliverables: ['Website & Landing Copy', 'SEO Blog Articles', 'Brand Messaging Frameworks'],
    freeDemo: true,
    tint: 'magenta',
  },
  {
    id: 'video-production',
    index: '07',
    title: 'Video Production',
    category: 'Production',
    shortTag: 'MOTION & FILM',
    summary:
      'Commercial edits, brand explainers, motion graphics, and short-form social reels built to hold audience attention.',
    deliverables: ['Commercial & Promo Edits', 'Motion Graphics & Titles', 'Short-Form Social Reels'],
    freeDemo: true,
    tint: 'orange',
  },
  {
    id: 'digital-marketing',
    index: '08',
    title: 'Digital Marketing',
    category: 'Marketing',
    shortTag: 'GROWTH CAMPAIGNS',
    summary:
      'Focused multi-channel campaigns across social media and paid acquisition designed to make every click count.',
    deliverables: ['Social Media Management', 'Paid Ad Campaign Strategy', 'Conversion Analytics'],
    freeDemo: true,
    tint: 'magenta',
  },
  {
    id: 'custom-song-creation',
    index: '09',
    title: 'Custom Song Creation',
    category: 'Production',
    shortTag: 'SONIC IDENTITY',
    summary:
      'Original brand jingles, campaign anthems, and bespoke audio tracks composed to give your brand an unmistakable sound.',
    deliverables: ['Brand Jingles & Intros', 'Custom Campaign Tracks', 'Mastering & Audio Delivery'],
    freeDemo: true,
    tint: 'cyan',
  },
];

export const HOME_CAPABILITIES: CapabilityCard[] = [
  {
    id: 'cap-design',
    index: '01',
    category: 'BRAND & PRINT',
    title: 'Graphic Design & Print Marketing',
    description: 'Cohesive visual identities, tactile collateral, and disciplined typography.',
    image: STUDIO_IMAGES.brandDesign,
    imageAlt: 'Monochrome editorial print specimens and geometric brand design workspace',
    targetPath: '/services',
  },
  {
    id: 'cap-web',
    index: '02',
    category: 'WEB & SOFTWARE',
    title: 'Web Design & Custom Software',
    description: 'Fast, resilient interfaces and bespoke software built for measurable performance.',
    image: STUDIO_IMAGES.webEngineering,
    imageAlt: 'Minimalist dark architectural workstation showing geometric web wireframes',
    targetPath: '/services',
  },
  {
    id: 'cap-video',
    index: '03',
    category: 'MEDIA & AUDIO',
    title: 'Video Production & Custom Songs',
    description: 'High-impact commercial storytelling, motion edits, and original sonic branding.',
    image: STUDIO_IMAGES.videoProduction,
    imageAlt: 'Monochrome cinema camera rig inside a minimalist production studio',
    targetPath: '/services',
  },
  {
    id: 'cap-growth',
    index: '04',
    category: 'GROWTH & AI',
    title: 'SEO, Digital Marketing & AI Tools',
    description: 'Search visibility, targeted campaigns, and Grafino AI Solutions for modern teams.',
    image: STUDIO_IMAGES.digitalGrowth,
    imageAlt: 'Brutalist concrete architectural facade symbolizing scalable digital growth',
    targetPath: '/our-ai-tools',
  },
];

export const SHOWCASE_WORKS: ShowcaseWork[] = [
  {
    id: 'work-identity',
    index: '[ 01 ]',
    category: '[ BRAND SYSTEMS ]',
    title: 'Identity & Print Architecture',
    discipline: 'Graphic Design / Print Marketing',
    summary:
      'Complete visual systems pairing sharp Swiss grid typography with press-calibrated packaging and corporate stationery.',
    highlights: ['Logo Systems', 'Packaging Grids', 'Editorial Collateral'],
    tint: 'orange',
    mockupStyle: 'brand',
    image: STUDIO_IMAGES.showcaseEditorial,
  },
  {
    id: 'work-web',
    index: '[ 02 ]',
    category: '[ DIGITAL ARCHITECTURE ]',
    title: 'High-Velocity Web Platforms',
    discipline: 'Web Design / Technical SEO',
    summary:
      'Responsive websites engineered for 60% faster performance, clean crawl architecture, and high-converting user journeys.',
    highlights: ['500 Websites Launched', '60% Speed Lift', 'Mobile-First UX'],
    tint: 'cyan',
    mockupStyle: 'web',
  },
  {
    id: 'work-software',
    index: '[ 03 ]',
    category: '[ CUSTOM ENGINEERING ]',
    title: 'Tailored Business Software',
    discipline: 'Custom Software / Workflow Automation',
    summary:
      'Purpose-built portals, dashboards, and internal tools designed around real operational requirements with zero bloat.',
    highlights: ['Clean Codebase', 'Role Workflows', 'Scalable APIs'],
    tint: 'magenta',
    mockupStyle: 'software',
  },
  {
    id: 'work-ai',
    index: '[ 04 ]',
    category: '[ GRAFINO AI SOLUTIONS ]',
    title: "Pakistan's 1st AI Creative Suite",
    discipline: 'AI Tools / Content & Production',
    summary:
      'Next-generation AI workflows developed under Grafino Studio to accelerate ideation, content velocity, and digital execution.',
    highlights: ['grafinoai.qzz.io', 'Smart Workflows', 'Built in Pakistan'],
    tint: 'orange',
    mockupStyle: 'ai',
  },
];

export const LEADERSHIP_TEAM: LeaderProfile[] = [
  {
    id: 'abdul-basit',
    name: 'Abdul Basit',
    role: 'Founder & CEO',
    organization: 'Grafino Studio',
    quote:
      "At Grafino Studio, we believe creativity is not just about design, it's about delivering ideas that inspire, connect, and leave a lasting impact.",
    helpDeskQuote:
      'Grafino Studio turned my ideas into reality with creativity and precision. Their professionalism is unmatched!',
    focusArea: 'Creative Direction, Studio Strategy & Grafino AI Vision',
  },
  {
    id: 'naina',
    name: 'Naina',
    role: 'Digital Marketer & SEO Expert',
    organization: 'Grafino Studio',
    quote:
      'At Grafino Studio, my mission is to make every click count, turning ideas into visibility and visibility into lasting success.',
    focusArea: 'Search Engine Optimization, Growth Strategy & Campaign ROI',
  },
  {
    id: 'saba-saleem',
    name: 'Saba Saleem',
    role: 'Programming Manager',
    organization: 'Grafino Studio',
    quote:
      'In every line of code, we build not just programs, but possibilities that shape the future of Grafino Studio.',
    focusArea: 'Custom Software Architecture, Web Engineering & Code Quality',
  },
];

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'starter',
    index: '01',
    name: 'Starter Package',
    priceLabel: 'Custom Quote',
    ctaLabel: 'Request Starter Quote',
    summary:
      'Essential brand and digital foundation for emerging businesses launching a credible online presence.',
    idealFor: 'Startups, solo founders, and local businesses',
    included: [
      'Core Graphic Design & Brand Kit',
      'Responsive Starter Web Presence',
      'Foundational On-Page SEO Setup',
      'Direct Studio Onboarding & Support',
    ],
    tint: 'cyan',
  },
  {
    id: 'growth',
    index: '02',
    name: 'Growth Package',
    priceLabel: 'Custom Quote',
    ctaLabel: 'Request Growth Quote',
    summary:
      'Full-stack design, web performance, and active SEO plus digital marketing momentum for scaling brands.',
    idealFor: 'Growing companies expanding reach and conversions',
    included: [
      'Multi-Page Custom Web Design',
      'Ongoing SEO & Content Writing',
      'Digital Marketing & Social Visuals',
      'Video Production & Motion Assets',
      'Priority Help Desk & Strategy Calls',
    ],
    featured: true,
    tint: 'orange',
  },
  {
    id: 'premium',
    index: '03',
    name: 'Premium Package',
    priceLabel: 'Custom Quote',
    ctaLabel: 'Request Premium Quote',
    summary:
      'Dedicated creative, custom software engineering, print collateral, and AI-assisted production without bottlenecks.',
    idealFor: 'Established organizations seeking an end-to-end studio partner',
    included: [
      'Custom Software & Web Engineering',
      'Complete Brand, Print & Video Production',
      'Custom Song Creation & Sonic Identity',
      'Full-Funnel Digital Marketing & SEO',
      'Grafino AI Workflow Integration',
    ],
    tint: 'magenta',
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    index: '01',
    category: 'PROCESS',
    question: 'How does Grafino Studio take a project from design to delivery?',
    answer:
      'Every engagement starts with a focused discovery call or consultation to define scope, milestones, and target outcomes. From there, our design, engineering, and marketing leads collaborate in structured review sprints until final assets or code are delivered ready to launch.',
  },
  {
    id: 'faq-2',
    index: '02',
    category: 'DEMO',
    question: 'Can we request a free demo before committing to a full package?',
    answer:
      'Yes. All core services at Grafino Studio include a Free Demo option so you can evaluate our visual direction, technical quality, and communication speed before moving into full production.',
  },
  {
    id: 'faq-3',
    index: '03',
    category: 'PRICING',
    question: 'How are Starter, Growth, Premium, and Custom packages priced?',
    answer:
      'Because each organization has distinct scope, deliverables, and timelines, we prepare a tailored Custom Quote rather than one-size-fits-all pricing. Submit your brief through our Subscription Package or Custom Package form for a prompt estimate.',
  },
  {
    id: 'faq-4',
    index: '04',
    category: 'AI TOOLS',
    question: 'What is Grafino AI Solutions and how can I access it?',
    answer:
      "Grafino AI Solutions is Pakistan's 1st AI platform launched under Grafino Studio's creative technology vision. You can explore the live platform directly at grafinoai.qzz.io or consult our team on integrating AI workflows into your business.",
  },
  {
    id: 'faq-5',
    index: '05',
    category: 'SUPPORT',
    question: 'How quickly can I reach the studio team for urgent questions?',
    answer:
      'You can submit a priority request via our Help Desk, book an Appointment slot directly online, email info@grafino.dpnds.org, or message our team immediately on WhatsApp at +92-332-7551182.',
  },
];

export const HELP_DESK_FAQS: FaqItem[] = [
  ...HOME_FAQS,
  {
    id: 'faq-6',
    index: '06',
    category: 'REVISIONS',
    question: 'How do revision rounds work on design and web projects?',
    answer:
      'We build dedicated review checkpoints into every milestone so feedback is gathered cleanly before moving to the next phase. You can log change requests directly through this Help Desk or during your scheduled appointment.',
  },
  {
    id: 'faq-7',
    index: '07',
    category: 'HANDOFF',
    question: 'Do we receive full source files and deployment assistance?',
    answer:
      'Yes. Upon project completion, Grafino Studio delivers organized production files, print-ready exports, or deployed web repositories along with guidance so your team can operate with complete confidence.',
  },
];

export const UPCOMING_EVENTS: EventSession[] = [
  {
    id: 'evt-brand',
    index: '01',
    format: 'Workshop',
    title: 'Brand Identity Systems: From Grid to Print Delivery',
    focus: 'Graphic Design & Print Marketing',
    description:
      'An upcoming hands-on studio session walking through brand architecture, typography pairing, and press-ready export workflows.',
    status: 'Upcoming Registration Open',
    duration: '90 Min Live Workshop',
  },
  {
    id: 'evt-web-seo',
    index: '02',
    format: 'Webinar',
    title: 'High-Velocity Web Design & Technical SEO Foundations',
    focus: 'Web Engineering & Search Visibility',
    description:
      'Practical breakdown of how modern front-end performance and structured content work together to improve search rankings and conversions.',
    status: 'Upcoming Registration Open',
    duration: '60 Min Interactive Webinar',
  },
  {
    id: 'evt-ai',
    index: '03',
    format: 'Live Session',
    title: 'Inside Grafino AI Solutions: Creative Workflows in Practice',
    focus: 'Grafino AI & Digital Innovation',
    description:
      'A live walkthrough of how creative teams and founders can apply Grafino AI Solutions alongside human craft without losing brand originality.',
    status: 'Upcoming Registration Open',
    duration: '75 Min Demo & Q&A',
  },
  {
    id: 'evt-video',
    index: '04',
    format: 'Workshop',
    title: 'Short-Form Video Production & Sonic Identity for Brands',
    focus: 'Video Production & Custom Audio',
    description:
      'Storyboarding, pacing, editing craft, and original audio direction for campaigns that stand out across modern feeds.',
    status: 'Upcoming Registration Open',
    duration: '60 Min Studio Session',
  },
];

export const JOB_TRACKS: JobTrack[] = [
  {
    id: 'job-graphic',
    index: '01',
    title: 'Graphic Designer',
    department: 'Brand & Visual Systems',
    location: 'Haroonabad / Remote Friendly',
    type: 'Full-Time / Project Track',
    summary:
      'Craft brand identities, print marketing layouts, and social visual campaigns with sharp typographic restraint.',
    skills: ['Brand Identity', 'Editorial Typography', 'Print Pre-Press', 'Figma & Adobe Suite'],
  },
  {
    id: 'job-fullstack',
    index: '02',
    title: 'Full-Stack Web Developer',
    department: 'Engineering & Software',
    location: 'Haroonabad / Remote Friendly',
    type: 'Full-Time / Project Track',
    summary:
      'Build responsive web interfaces and custom software platforms under our programming team with clean TypeScript architecture.',
    skills: ['React & TypeScript', 'Modern CSS', 'APIs & Databases', 'Performance Tuning'],
  },
  {
    id: 'job-seo',
    index: '03',
    title: 'SEO & Digital Marketing Specialist',
    department: 'Growth & Visibility',
    location: 'Haroonabad / Remote Friendly',
    type: 'Full-Time / Project Track',
    summary:
      'Drive technical SEO audits, keyword roadmaps, and conversion-focused campaigns that turn clicks into measurable client growth.',
    skills: ['Technical SEO', 'Analytics & Reporting', 'Paid Campaigns', 'Content Strategy'],
  },
  {
    id: 'job-video',
    index: '04',
    title: 'Video Editor & Motion Designer',
    department: 'Production Studio',
    location: 'Haroonabad / Hybrid',
    type: 'Full-Time / Project Track',
    summary:
      'Edit brand stories, promotional films, and dynamic motion pieces synchronized with crisp sound design.',
    skills: ['Commercial Editing', 'Motion Graphics', 'Color Grading', 'Audio Sync'],
  },
];

export const APPOINTMENT_TIME_SLOTS = [
  '10:00 AM PKT',
  '11:30 AM PKT',
  '02:00 PM PKT',
  '04:00 PM PKT',
  '06:00 PM PKT',
  '08:00 PM PKT',
];

export const PHILOSOPHY_STATEMENT =
  'We unite editorial precision, modern engineering, and relentless creative craft so every brand we touch launches with unmistakable digital confidence.';
