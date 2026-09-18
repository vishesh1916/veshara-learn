import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Veshara Learn database...");

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "arisharajput100@gmail.com" },
    update: { role: "ADMIN" },
    create: {
      name: "Arisha Rajput",
      email: "arisharajput100@gmail.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 2. Create Course
  const course = await prisma.course.upsert({
    where: { slug: "social-media-manager" },
    update: {
      price: 19900,
      isPublished: true,
    },
    create: {
      title: "Social Media Manager",
      slug: "social-media-manager",
      description:
        "Learn strategy, content creation, growth, analytics and client management through practical, project-based learning. Go from beginner to client-ready.",
      shortDesc: "From Beginner to Client-Ready",
      price: 19900, // ₹199 in paisa
      isPublished: true,
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
    },
  });
  console.log(`✅ Course created: ${course.title} (₹199)`);

  // 4. Create Modules & Lessons
  const modulesData = [
    {
      title: "Module 01: Social Media Fundamentals",
      order: 1,
      lessons: [
        { title: "What Social Media Management Actually Is vs Creation", videoUrl: "dQw4w9WgXcQ", duration: 14, order: 1 },
        { title: "The 2026 Platform Landscape: IG, LinkedIn, X, Meta", videoUrl: "dQw4w9WgXcQ", duration: 18, order: 2 },
        { title: "Day in the Life & Essential Operating Workflows", videoUrl: "dQw4w9WgXcQ", duration: 12, order: 3 },
        { title: "How Businesses Turn Attention Into Revenue", videoUrl: "dQw4w9WgXcQ", duration: 15, order: 4 },
        { title: "Configuring Professional Business Profiles & Bios", videoUrl: "dQw4w9WgXcQ", duration: 20, order: 5 },
      ],
    },
    {
      title: "Module 02: Brand & Audience Architecture",
      order: 2,
      lessons: [
        { title: "Deconstructing Brand Identity & Visual Positioning", videoUrl: "dQw4w9WgXcQ", duration: 16, order: 1 },
        { title: "Defining High-Ticket Target Audiences (B2B vs D2C)", videoUrl: "dQw4w9WgXcQ", duration: 15, order: 2 },
        { title: "Drafting Actionable Buyer Personas", videoUrl: "dQw4w9WgXcQ", duration: 22, order: 3 },
        { title: "Developing Distinct Brand Voice & Vocabulary Guidelines", videoUrl: "dQw4w9WgXcQ", duration: 14, order: 4 },
        { title: "Competitive Whitespace Analysis", videoUrl: "dQw4w9WgXcQ", duration: 19, order: 5 },
      ],
    },
    {
      title: "Module 03: Content Strategy & Calendar Mastery",
      order: 3,
      lessons: [
        { title: "The 4 High-Converting Content Pillars Framework", videoUrl: "dQw4w9WgXcQ", duration: 17, order: 1 },
        { title: "Balancing Formats: Carousels, Short Videos & Graphics", videoUrl: "dQw4w9WgXcQ", duration: 14, order: 2 },
        { title: "Architecting a 30-Day Master Calendar in Google Sheets", videoUrl: "dQw4w9WgXcQ", duration: 24, order: 3 },
        { title: "Batching 1 Month of Content in 4 Hours", videoUrl: "dQw4w9WgXcQ", duration: 16, order: 4 },
        { title: "SEO Keywords & Algorithm Indexing Strategies", videoUrl: "dQw4w9WgXcQ", duration: 13, order: 5 },
      ],
    },
    {
      title: "Module 04: High-Impact Content Creation (Canva + Reels)",
      order: 4,
      lessons: [
        { title: "Canva Design Systems: Typography, Color & Layouts", videoUrl: "dQw4w9WgXcQ", duration: 26, order: 1 },
        { title: "3-Second Visual & Verbal Hooks that Halt the Scroll", videoUrl: "dQw4w9WgXcQ", duration: 18, order: 2 },
        { title: "Reel Architecture: Transitions, Pacing & Trending Audio", videoUrl: "dQw4w9WgXcQ", duration: 21, order: 3 },
        { title: "Direct Response Caption Copywriting (AIDA & PAS)", videoUrl: "dQw4w9WgXcQ", duration: 17, order: 4 },
        { title: "Interactive Story Sequences that Convert Followers to Leads", videoUrl: "dQw4w9WgXcQ", duration: 15, order: 5 },
        { title: "Asset Packaging and Brand Kit Consistency", videoUrl: "dQw4w9WgXcQ", duration: 19, order: 6 },
      ],
    },
    {
      title: "Module 05: Organic Instagram Growth Engine",
      order: 5,
      lessons: [
        { title: "Instagram Recommendation System Demystified", videoUrl: "dQw4w9WgXcQ", duration: 20, order: 1 },
        { title: "Organic Reach Expansion without Paid Ad Spend", videoUrl: "dQw4w9WgXcQ", duration: 22, order: 2 },
        { title: "Explore Page Optimization & Watch-Time Hacks", videoUrl: "dQw4w9WgXcQ", duration: 18, order: 3 },
        { title: "Proactive Community Outbound Engagement Protocols", videoUrl: "dQw4w9WgXcQ", duration: 16, order: 4 },
        { title: "Collaborations, Shoutouts & Co-authoring Posts", videoUrl: "dQw4w9WgXcQ", duration: 14, order: 5 },
        { title: "The 5 Algorithmic Traps Killing Account Momentum", videoUrl: "dQw4w9WgXcQ", duration: 12, order: 6 },
      ],
    },
    {
      title: "Module 06: Professional Account Management & Meta Suite",
      order: 6,
      lessons: [
        { title: "Structuring Your Daily Operating Schedule", videoUrl: "dQw4w9WgXcQ", duration: 16, order: 1 },
        { title: "Mastering Meta Business Suite: Scheduling & Inbox", videoUrl: "dQw4w9WgXcQ", duration: 21, order: 2 },
        { title: "Community Moderation & Inbound DM Sales Routing", videoUrl: "dQw4w9WgXcQ", duration: 15, order: 3 },
        { title: "Brand Reputation & Crisis Management Playbook", videoUrl: "dQw4w9WgXcQ", duration: 14, order: 4 },
        { title: "Managing 5+ Client Accounts Simultaneously without Chaos", videoUrl: "dQw4w9WgXcQ", duration: 19, order: 5 },
        { title: "Client Approvals & Sign-off Workflows", videoUrl: "dQw4w9WgXcQ", duration: 17, order: 6 },
      ],
    },
    {
      title: "Module 07: Analytics, ROI & Executive Reporting",
      order: 7,
      lessons: [
        { title: "Differentiating Vanity Numbers from Business ROI", videoUrl: "dQw4w9WgXcQ", duration: 15, order: 1 },
        { title: "Navigating Professional Dashboard Insights In-depth", videoUrl: "dQw4w9WgXcQ", duration: 23, order: 2 },
        { title: "Extracting Raw Metrics into Clean Spreadsheets", videoUrl: "dQw4w9WgXcQ", duration: 18, order: 3 },
        { title: "Designing Executive Monthly Presentation Decks", videoUrl: "dQw4w9WgXcQ", duration: 22, order: 4 },
        { title: "Translating Data into Strategic Next-Month Decisions", videoUrl: "dQw4w9WgXcQ", duration: 16, order: 5 },
        { title: "Demonstrating Measurable Value to Guarantee Contract Renewals", videoUrl: "dQw4w9WgXcQ", duration: 19, order: 6 },
      ],
    },
    {
      title: "Module 08: Client Acquisition, Pricing & Freelancing",
      order: 8,
      lessons: [
        { title: "Structuring Retainers vs One-Off Strategy Audits", videoUrl: "dQw4w9WgXcQ", duration: 18, order: 1 },
        { title: "Pricing Your Services in India (₹15,000 to ₹60,000/mo)", videoUrl: "dQw4w9WgXcQ", duration: 24, order: 2 },
        { title: "Crafting High-Converting Pitch Proposals in Canva", videoUrl: "dQw4w9WgXcQ", duration: 21, order: 3 },
        { title: "Multi-Channel Outreach: Instagram DMs, LinkedIn & Email", videoUrl: "dQw4w9WgXcQ", duration: 19, order: 4 },
        { title: "Client Onboarding: Invoicing, Agreements & Asset Handoff", videoUrl: "dQw4w9WgXcQ", duration: 17, order: 5 },
        { title: "Building Your Personal Brand to Attract Inbound Leads", videoUrl: "dQw4w9WgXcQ", duration: 20, order: 6 },
      ],
    },
  ];

  for (const mod of modulesData) {
    let moduleRecord = await prisma.module.findFirst({
      where: { courseId: course.id, order: mod.order },
    });

    if (!moduleRecord) {
      moduleRecord = await prisma.module.create({
        data: {
          courseId: course.id,
          title: mod.title,
          order: mod.order,
        },
      });
    }

    for (const les of mod.lessons) {
      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId: moduleRecord.id, order: les.order },
      });

      if (!existingLesson) {
        await prisma.lesson.create({
          data: {
            moduleId: moduleRecord.id,
            title: les.title,
            videoUrl: les.videoUrl,
            duration: les.duration,
            order: les.order,
            isFreePreview: les.order === 1 && mod.order === 1,
          },
        });
      }
    }
  }
  console.log("✅ All 8 modules and 45 lessons configured!");

  console.log("\n🚀 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
