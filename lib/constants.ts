// ============================================================
// VESHARA LEARN — MASTER CONSTANTS & CONTENT REPOSITORY
// ============================================================

export const SITE_CONFIG = {
  name: "Veshara Learn",
  tagline: "Learn skills. Build proof. Create opportunities.",
  headline: "BECOME A SOCIAL MEDIA MANAGER.",
  subheadline: "Learn the skills brands actually pay for.",
  description:
    "Learn strategy, content creation, growth, analytics and client management through practical, project-based learning. Go from beginner to client-ready.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "arisharajput100@gmail.com",
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const;

export const COURSE = {
  id: "smm-flagship",
  title: "Social Media Manager",
  subtitle: "From Beginner to Client-Ready",
  slug: "social-media-manager",
  price: 19900, // in paisa (₹199)
  priceDisplay: "₹199",
  originalPriceDisplay: "₹2,499",
  discountPercentage: "92% OFF",
  badge: "Flagship Certification",
  level: "Beginner to Client-Ready",
  duration: "45 Practical Lessons • 8 Modules",
  access: "Lifetime Access",
  description:
    "Learn strategy, content creation, growth, analytics, and client management through real-world, project-based learning. Build a portfolio you can pitch with confidence.",
  longDescription:
    "Most people know how to scroll Instagram, make basic reels, or design simple Canva posts. But brands don't pay for casual scrolling—they pay for predictable growth, conversion-driven content strategies, structured posting calendars, and professional analytics reporting. This course bridges that exact gap.",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Course Overview", href: "/course" },
    { label: "About Veshara", href: "/about" },
    { label: "Student Login", href: "/login" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  resources: [
    { label: "30-Day Content Calendar", href: "/resources/30-day-content-calendar" },
    { label: "SMM Audit Checklist", href: "/resources/social-media-audit-checklist" },
    { label: "Client Proposal Template", href: "/resources/client-proposal-template" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
} as const;

export interface CurriculumModule {
  number: string;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: string[];
  project: string;
}

export const CURRICULUM: CurriculumModule[] = [
  {
    number: "01",
    title: "Social Media Fundamentals",
    lessonsCount: 5,
    duration: "1h 10m",
    lessons: [
      "What social media management actually is vs content creation",
      "Platform ecosystem: Instagram, LinkedIn, Facebook & X (Twitter)",
      "The role & daily workflows of an in-demand social media manager",
      "How brands make money using social channels in India & globally",
      "Setting up and optimizing professional business accounts",
    ],
    project: "Set up, configure, and audit a professional Instagram business account with bio positioning and call-to-actions.",
  },
  {
    number: "02",
    title: "Brand & Audience Architecture",
    lessonsCount: 5,
    duration: "1h 20m",
    lessons: [
      "Deconstructing brand identity: values, tone, and visual pillars",
      "Defining high-converting target audiences (B2B vs B2C)",
      "Building practical buyer personas that drive content clicks",
      "Developing a distinct brand voice guidelines sheet",
      "Conducting actionable competitive analysis without vanity metrics",
    ],
    project: "Create a complete Brand Brief and Audience Persona dossier for an actual Indian D2C brand or local business.",
  },
  {
    number: "03",
    title: "Content Strategy & Calendar Frameworks",
    lessonsCount: 5,
    duration: "1h 15m",
    lessons: [
      "The 4 Core Content Pillars: Educational, Entertaining, Inspiring, Promotional",
      "Content format distribution: Carousels, Short-form Reels, Static graphics, Stories",
      "Architecting a high-conversion 30-day content calendar in Google Sheets",
      "High-efficiency content batching and production workflows",
      "Modern hashtag and keyword SEO strategy for Instagram & LinkedIn search",
    ],
    project: "Build a ready-to-execute 30-Day Content Calendar with planned hooks, topics, formats, and posting schedules.",
  },
  {
    number: "04",
    title: "High-Impact Content Creation (Canva + Reels)",
    lessonsCount: 6,
    duration: "1h 45m",
    lessons: [
      "Canva for professionals: grid layouts, typographic pairing, and branding kits",
      "Scripting 3-second visual and audio hooks that stop the thumb scroll",
      "The anatomy of viral reels: pacing, transitions, and audio selection",
      "Direct-response caption copywriting formulas (AIDA & PAS)",
      "Daily interactive Story sequences that build authentic buyer trust",
      "Maintaining visual consistency without spending hours in design",
    ],
    project: "Design a complete brand launch asset pack: 5 carousel posts, 3 reel scripts with audio ideas, and 5 interactive story slides.",
  },
  {
    number: "05",
    title: "Organic Instagram Growth Engine",
    lessonsCount: 6,
    duration: "1h 30m",
    lessons: [
      "Demystifying the algorithm: recommendation systems, watch time, and save rates",
      "Organic reach expansion without paid advertising spend",
      "Reel optimization tactics for explore page and reels tab indexing",
      "Proactive outbound engagement strategies that attract warm followers",
      "Creator collaborations, influencer gifting, and mutual shoutouts",
      "The 5 lethal mistakes killing account reach (and how to avoid them)",
    ],
    project: "Draft an Organic Growth Strategy Roadmap containing milestone targets, engagement schedules, and content distribution plans.",
  },
  {
    number: "06",
    title: "Professional Account Management",
    lessonsCount: 6,
    duration: "1h 35m",
    lessons: [
      "Structuring your daily, weekly, and monthly manager operating schedule",
      "Mastering Meta Business Suite for unified Instagram and Facebook scheduling",
      "Community management: handling comments, DM automation, and lead replies",
      "Brand crisis prevention: dealing with negative PR or viral backlash",
      "Managing multiple client accounts simultaneously without burnout",
      "Client approvals workflow and communication protocols",
    ],
    project: "Create a Standard Operating Procedure (SOP) handbook for managing a client's social presence seamlessly.",
  },
  {
    number: "07",
    title: "Analytics, Metrics & Executive Reporting",
    lessonsCount: 6,
    duration: "1h 40m",
    lessons: [
      "Vanity metrics vs Conversion metrics: reach, impressions, CTR, engagement",
      "Deep-dive into Instagram Professional Dashboard insights",
      "Extracting quantitative data into clean, client-friendly spreadsheets",
      "Building executive monthly performance decks in Google Slides / PDF",
      "Translating raw data into actionable content pivots for the next month",
      "Presenting ROI to clients so they keep renewing their retainer contracts",
    ],
    project: "Generate a complete, polished Monthly Analytics Report with performance charts, takeaways, and strategic next steps.",
  },
  {
    number: "08",
    title: "Client Acquisition, Pricing & Freelancing",
    lessonsCount: 6,
    duration: "1h 40m",
    lessons: [
      "Packaging your services: monthly retainers vs one-off audits",
      "How to price your management services in India (from ₹15,000 to ₹60,000/month)",
      "Writing winning client proposals that outshine generic agencies",
      "Cold outreach frameworks for Instagram DMs, LinkedIn, and cold email",
      "Client onboarding onboarding: contracts, payments, and asset handoffs",
      "Positioning your personal brand to attract inbound client inquiries",
    ],
    project: "Assemble your Client-Ready Portfolio including your case studies, service menu, pricing structure, and formal pitch proposal.",
  },
];

export const SKILLS = [
  {
    title: "Strategic Planning",
    description: "Architect target-driven content pillars that turn passive followers into paying customers.",
    icon: "Target",
  },
  {
    title: "Content Production",
    description: "Design thumb-stopping carousels, reels, and stories with Canva and modern tools.",
    icon: "PenTool",
  },
  {
    title: "Brand Architecture",
    description: "Establish clear brand voice, typography rules, color identity, and audience personas.",
    icon: "Palette",
  },
  {
    title: "Organic Reach",
    description: "Leverage explore page indexing, audio curation, and engagement funnels without ad spend.",
    icon: "TrendingUp",
  },
  {
    title: "Analytics & ROI",
    description: "Translate complex metrics into executive performance decks clients happily renew for.",
    icon: "BarChart3",
  },
  {
    title: "Client Retainers",
    description: "Master outreach scripts, proposal design, and high-ticket service packaging.",
    icon: "Briefcase",
  },
] as const;

export const TOOLS = [
  { name: "Instagram", category: "Distribution" },
  { name: "Meta Suite", category: "Publishing" },
  { name: "Google Sheets", category: "Planning" },
  { name: "ChatGPT & AI", category: "Copywriting" },
] as const;

export const INCLUSIONS = [
  "Complete 8-Module Video Curriculum (45 Practical Lessons)",
  "Real-World Hands-on Capstone Projects for every module",
  "Plug-and-play 30-Day Content Calendar (Google Sheets Template)",
  "High-Converting Client Proposal Template (Canva + PDF)",
  "Freelance Pricing & Package Calculator (Custom Spreadsheet)",
  "Executive Monthly Analytics & Reporting Deck",
  "Direct Outreach Scripts for Instagram, LinkedIn & Email",
  "Official Veshara Learn Verified Course Completion Certificate",
  "Lifetime Unrestricted Access with all future curriculum updates",
  "Dedicated Student Dashboard with lesson progress sync",
] as const;

export const PORTFOLIO_PROJECTS = [
  {
    title: "Comprehensive Brand Strategy Dossier",
    tag: "Strategy",
    description: "A complete brand brief featuring distinct buyer personas, tone-of-voice rules, and competitive whitespace positioning.",
  },
  {
    title: "30-Day Systematic Content Calendar",
    tag: "Execution",
    description: "A fully structured calendar outlining specific hooks, captions, visual media formats, and strategic content pillars.",
  },
  {
    title: "Organic Instagram Growth Roadmap",
    tag: "Growth",
    description: "A data-informed organic playbook highlighting reel distribution, strategic cross-promotions, and engagement routines.",
  },
  {
    title: "Complete Visual Content Asset Pack",
    tag: "Design",
    description: "Carousel slides, branded story sequences, and high-retention reel storyboards designed for client handoff.",
  },
  {
    title: "Executive Monthly Performance Report",
    tag: "Analytics",
    description: "An analytics document calculating engagement rates, follower velocity, click-through rates, and future recommendations.",
  },
  {
    title: "Client-Winning Pitch & Retainer Proposal",
    tag: "Business",
    description: "A ready-to-send proposal covering scope of work, deliverables timeline, terms of service, and monthly retainer fees.",
  },
] as const;

export const AUDIENCES = [
  {
    title: "College Students",
    description: "Build an in-demand, high-income digital skill alongside your degree and start earning before graduation.",
    icon: "GraduationCap",
  },
  {
    title: "Complete Beginners",
    description: "Step into modern digital marketing with zero prior experience through straightforward, step-by-step guidance.",
    icon: "Sparkles",
  },
  {
    title: "Aspiring Freelancers",
    description: "Add high-ticket social media retainers to your freelance services and land reliable monthly clients.",
    icon: "Briefcase",
  },
  {
    title: "Content Creators",
    description: "Learn the business side of social platforms to grow your own channels or manage accounts for others.",
    icon: "Video",
  },
  {
    title: "Career Switchers",
    description: "Pivot from saturated traditional jobs into a flexible, creative remote career with proof of capability.",
    icon: "Compass",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Enroll for ₹199",
    description: "Get instant, lifetime access to the entire 8-module course and all downloadable templates.",
  },
  {
    step: "02",
    title: "Watch Practical Lessons",
    description: "Learn zero-fluff, real-world social media management workflows at your own pace.",
  },
  {
    step: "03",
    title: "Build Your Portfolio",
    description: "Complete hands-on assignments for each module that become tangible proof of your skill.",
  },
  {
    step: "04",
    title: "Get Certified",
    description: "Receive your verified Veshara Learn certificate upon completing all lessons and projects.",
  },
  {
    step: "05",
    title: "Pitch & Land Clients",
    description: "Use our ready-made proposals, pricing guides, and outreach scripts to land your first paid retainer.",
  },
] as const;

export const FAQS = [
  {
    question: "Is this course really suitable for absolute beginners?",
    answer:
      "Yes, 100%. The curriculum starts from the absolute foundation—explaining what social media management actually entails, how platforms differ, and how brands generate revenue. You don't need marketing degrees or technical skills to succeed.",
    category: "course",
  },
  {
    question: "Why is the price only ₹199?",
    answer:
      "Veshara Learn's mission is to make high-impact, practical digital skills accessible to every motivated learner in India. At ₹199, there is zero financial barrier. We focus on scale, genuine skill-building, and creating a community of client-ready professionals.",
    category: "payment",
  },
  {
    question: "What tools or software will I need to buy?",
    answer:
      "You don't need to purchase any expensive software. Everything in the course is taught using free tiers of industry tools: Instagram, free Canva, Meta Business Suite, and Google Sheets. A laptop is recommended, but you can learn and practice on a smartphone too.",
    category: "course",
  },
  {
    question: "How long do I have access to the course content?",
    answer:
      "You get unlimited lifetime access. You can watch the lessons at whatever pace suits your schedule, replay modules as often as needed, and receive all future course updates at zero extra charge.",
    category: "access",
  },
  {
    question: "Do I get a certificate upon finishing?",
    answer:
      "Yes! Once you complete all 45 lessons across all 8 modules, your account automatically unlocks your official Veshara Learn Certificate of Completion, complete with a verifiable unique Certificate ID.",
    category: "course",
  },
  {
    question: "Can I watch the lessons on my mobile phone?",
    answer:
      "Yes! The Veshara Learn student platform is fully mobile-responsive. You can log into your student dashboard and stream lessons smoothly on any smartphone, tablet, or desktop browser.",
    category: "access",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support all Indian payment methods via Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards (Visa, Mastercard, RuPay), and Net Banking across all major banks.",
    category: "payment",
  },
  {
    question: "How do I get help if I get stuck?",
    answer:
      "You can contact our student support team anytime at arisharajput100@gmail.com. We answer all queries promptly to ensure your learning journey is uninterrupted.",
    category: "support",
  },
] as const;

export const FREE_RESOURCES = [
  {
    slug: "30-day-content-calendar",
    title: "30-Day Master Content Calendar",
    category: "Planning Template",
    description: "The exact Google Sheets template professional social media managers use to plan, schedule, review, and get client sign-offs on monthly posts.",
    type: "Google Sheet / Excel",
    badge: "Featured Template",
    benefits: [
      "Color-coded status trackers (Draft, Approved, Scheduled)",
      "Pillar distribution tracker to balance content variety",
      "Asset link columns for easy team collaboration",
      "Pre-filled with 15 plug-and-play post frameworks",
    ],
  },
  {
    slug: "social-media-audit-checklist",
    title: "Social Media Audit Checklist",
    category: "Client Acquisition",
    description: "A 25-point audit checklist to evaluate any brand's profile, bio, content cadence, highlights, and engagement. The #1 tool for landing freelance clients.",
    type: "Interactive Checklist",
    badge: "Diagnostic Audit",
    benefits: [
      "Bio optimization and link-in-bio diagnostic audit",
      "Content aesthetics, typography, and visual consistency check",
      "Hashtag and algorithmic SEO scoring matrix",
      "Client-ready PDF format to deliver instant value during pitches",
    ],
  },
  {
    slug: "client-proposal-template",
    title: "Client-Winning Proposal Template",
    category: "Freelancing",
    description: "A high-ticket proposal slide deck designed to showcase deliverables, timelines, case studies, and pricing tiers that win client retainers.",
    type: "Canva & PDF Template",
    badge: "High-Ticket Pitch Deck",
    benefits: [
      "Clear scope-of-work breakdown avoiding scope creep",
      "Three-tier pricing table (Starter, Growth, Scaling)",
      "Standard contract terms, payment schedules, and onboarding steps",
      "Clean, modern aesthetic that builds immediate credibility",
    ],
  },
];
