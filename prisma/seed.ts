/**
 * Seed script — سِمَة · SEMAH AI Brand Studio
 * ينشئ مستخدم تجريبي + مشروع هوية كامل (Brand Brief + Strategy + 3 Visual
 * Directions + Color Palette + Font System + Mood Board + Brand Book + Client
 * Share) لإظهار بنية قاعدة البيانات.
 *
 * التشغيل: bun run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@semah.studio";
  const password = "semah123";

  // 1) المستخدم التجريبي
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "مستخدم سِمَة التجريبي",
      password: passwordHash as string,
      subscription: {
        create: {
          customerId: `cus_demo_${Date.now()}`,
          status: "active",
          plan: "pro",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  console.log(`✓ المستخدم: ${user.email}`);

  // 2) مشروع هوية تجريبي
  const slug = "nakhla-studio";
  const project = await prisma.brandProject.upsert({
    where: { slug },
    update: {},
    create: {
      name: "نخلة استوديو",
      slug,
      status: "design",
      currentStep: 4,
      industry: "استوديو تصميم",
      targetAudience: "الشركات الناشئة في الخليج",
      locale: "ar",
      ownerId: user.id,
      brief: {
        create: {
          companyName: "نخلة استوديو",
          description: "استوديو تصميم متخصص في الهوية البصرية للعلامات العربية.",
          industry: "تصميم وإبداع",
          targetAudience: "الشركات الناشئة والمتاجر الإلكترونية",
          competitors: "استوديوهات التصميم المحلية",
          values: ["الإبداع", "الأصالة", "البساطة"],
          goals: ["بناء هوية عربية معاصرة", "التوسع إقليميًا"],
          toneKeywords: ["عصري", "دافئ", "واثق"],
        },
      },
      strategy: {
        create: {
          vision: "أن نكون الاستوديو العربي الأول في بناء الهويات المؤسسية.",
          mission: "نحوّل الأفكار إلى هويات تُعرَف بسرعة ودقة.",
          coreValues: ["الأصالة", "الإبداع", "الوضوح"],
          personality: ["ودود", "احترافي", "ملهم"],
          toneOfVoice: "عصري ومحترم مع لمسة دافئة",
          positioning: "الاستوديو العربي الأول للهوية بالذكاء الاصطناعي",
          differentiators: ["عربي RTL أولًا", "AI يولّد ٣ اتجاهات", "Brand Book PDF عربي"],
        },
      },
    },
  });

  console.log(`✓ المشروع: ${project.name} (${project.slug})`);

  // 3) ثلاثة اتجاهات بصرية
  const directions = [
    {
      name: "أصالة معاصرة",
      slug: "modern-heritage",
      description: "دمج الزخارف العربية مع شبكات حديثة.",
      styleKeywords: ["زخرفة", "حديث", "ذهبي"],
      colorStory: "أخضر زمردي عميق مع لمسات ذهبية.",
      typographyStory: "Cairo للعناوين وIBM Plex Sans Arabic للنصوص.",
      imageryStyle: "تصوير منتج فاخر بإضاءة دافئة.",
      shapeLanguage: "أقواس ونقوش هندسية.",
    },
    {
      name: "بساطة نورديّة",
      slug: "nordic-minimal",
      description: "بساطة إسكندنافية مع روح عربية.",
      styleKeywords: ["بساطة", "مساحات", "هواء"],
      colorStory: "أبيض ورمادي مع لمسة فيروزية.",
      typographyStory: "Manrope للعناوين وIBM Plex Sans Arabic للنصوص.",
      imageryStyle: "خلفيات نظيفة ومساحات سلبية.",
      shapeLanguage: "خطوط مستقيمة ودوائر ناعمة.",
    },
    {
      name: "جرأة رقمية",
      slug: "digital-bold",
      description: "ألوان نابضة وتدرجات جريئة.",
      styleKeywords: ["جرأة", "تدرجات", "رقمي"],
      colorStory: "تدرجات إمerald إلى teal مع بنفسجي خفيف.",
      typographyStory: "Alexandria للعناوين وManrope للنصوص.",
      imageryStyle: "رسومات 3D وألوان نيون.",
      shapeLanguage: "أشكال سائلة وتدرجات.",
    },
  ];

  for (const d of directions) {
    await prisma.visualDirection.create({
      data: { ...d, projectId: project.id, selected: d.slug === "modern-heritage" },
    });
  }
  console.log(`✓ ٣ اتجاهات بصرية`);

  // 4) لوحة ألوان مختارة
  await prisma.colorPalette.create({
    data: {
      projectId: project.id,
      directionId: null,
      name: "اللوحة الأساسية",
      swatches: [
        { name: "Primary", hex: "#10B981", role: "primary", contrast: "AAA" },
        { name: "Teal", hex: "#14B8A6", role: "accent", contrast: "AA" },
        { name: "Ink", hex: "#0B1220", role: "text", contrast: "AAA" },
        { name: "Mist", hex: "#E6F4EF", role: "surface", contrast: "AA" },
        { name: "Gold", hex: "#F5C451", role: "highlight", contrast: "AA" },
      ],
      wcagAA: true,
      cssVariables:
        "--brand-primary:#10B981;\n--brand-accent:#14B8A6;\n--brand-ink:#0B1220;",
    },
  });
  console.log(`✓ لوحة الألوان`);

  // 5) نظام خطوط
  await prisma.fontSystem.create({
    data: {
      projectId: project.id,
      displayFont: "Cairo",
      bodyFont: "IBM Plex Sans Arabic",
      arabicDisplayFont: "Cairo",
      arabicBodyFont: "IBM Plex Sans Arabic",
      displayFontUrl: "https://fonts.googleapis.com/css2?family=Cairo",
      bodyFontUrl:
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic",
      notes: "زاوج بين Cairo القوي للعناوين وIBM Plex المقروء للنصوص.",
    },
  });
  console.log(`✓ نظام الخطوط`);

  // 6) Mood Board مع عنصرين
  await prisma.moodBoard.create({
    data: {
      projectId: project.id,
      title: "مود نخلة",
      items: {
        create: [
          {
            imageUrl: "https://images.unsplash.com/photo-1",
            source: "upload",
            posX: 20,
            posY: 30,
            width: 180,
            height: 180,
            zIndex: 1,
          },
          {
            imageUrl: "https://images.unsplash.com/photo-2",
            source: "generated",
            prompt: "تركيبة زخرفية عربية حديثة بألوان زمردية",
            posX: 220,
            posY: 60,
            width: 200,
            height: 200,
            zIndex: 2,
          },
        ],
      },
    },
  });
  console.log(`✓ Mood Board`);

  // 7) Brand Book (مسودة)
  await prisma.brandBook.create({
    data: {
      projectId: project.id,
      version: 1,
      status: "generated",
      sections: [
        { id: "cover", title: "الغلاف", content: "نخلة استوديو — دليل الهوية" },
        { id: "story", title: "القصة", content: "كيف بدأ الاستوديو..." },
        { id: "colors", title: "الألوان", content: "اللوحة الأساسية..." },
        { id: "typography", title: "الخطوط", content: "نظام Cairo + IBM Plex..." },
      ],
    },
  });
  console.log(`✓ Brand Book`);

  // 8) رابط مشاركة العميل
  await prisma.clientShare.create({
    data: {
      projectId: project.id,
      token: "share_demo_" + Date.now(),
      passwordHash: null,
      permissions: {
        canComment: true,
        canApprove: true,
        canRequestChanges: false,
      },
      status: "active",
    },
  });
  console.log(`✓ بوابة العميل`);

  // 9) سجل استهلاك AI تجريبي
  for (const feature of ["strategy", "directions", "colors", "fonts"]) {
    await prisma.aICreditUsage.create({
      data: { userId: user.id, projectId: project.id, feature, creditsUsed: 1 },
    });
  }
  console.log(`✓ سجل استهلاك AI`);

  // 10) إشعار ترحيب
  await prisma.notification.create({
    data: {
      userId: user.id,
      title: "مرحبًا بك في سِمَة! 🎉",
      message: "رحلتك لبناء الهوية تبدأ هنا. جرّب المساعد الذكي «اسأل سِمَة».",
      type: "success",
    },
  });

  console.log("\n✅ اكتمل الـ seed بنجاح.");
  console.log(`   بريد المستخدم: ${email}`);
  console.log(`   كلمة المرور: ${password}`);
}

main()
  .catch((e) => {
    console.error("seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
