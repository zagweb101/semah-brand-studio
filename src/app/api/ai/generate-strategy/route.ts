import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRATEGY_SYSTEM_PROMPT = `أنت خبير استراتيجية علامات تجارية عربي محترف. مهمتك توليد استراتيجية هوية مؤسسية كاملة بناءً على Brand Brief.

أجب بالعربية الفصحى بصيغة JSON صارمة فقط (بدون نص خارج JSON) بهذا الشكل:
{
  "vision": "جملة رؤية ملهمة وطموحة (10-15 كلمة)",
  "mission": "جملة رسالة واضحة وعملية (15-25 كلمة)",
  "coreValues": ["قيمة 1", "قيمة 2", "قيمة 3", "قيمة 4"],
  "personality": ["سمة شخصية 1", "سمة 2", "سمة 3", "سمة 4"],
  "toneOfVoice": "وصف نبرة التواصل (8-12 كلمة)",
  "positioning": "جملة تموضع تنافسي (12-20 كلمة)",
  "differentiators": ["تميّز 1", "تميّز 2", "تميّز 3"]
}

اجعل المحتوى محددًا للمشروع، واقعيًا، وقابلًا للتطبيق. لا تستخدم عبارات عامة.`;

export async function POST(req: Request) {
  let projectId = "";
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    projectId = body?.projectId;
    if (!projectId) {
      return NextResponse.json(
        { error: "projectId مطلوب" },
        { status: 400 }
      );
    }

    const project = await db.brandProject.findFirst({
      where: { id: projectId, ownerId: session.user.id },
      include: { brief: true },
    });
    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    const brief = project.brief;
    const briefText = `اسم الشركة: ${brief?.companyName || project.name}
الصناعة: ${brief?.industry || project.industry || "غير محدد"}
الجمهور المستهدف: ${brief?.targetAudience || project.targetAudience || "غير محدد"}
الوصف: ${brief?.description || project.description || "غير محدد"}`;

    // محاولة استخدام z-ai SDK (مع fallback سريع)
    let strategy: {
      vision: string;
      mission: string;
      coreValues: string[];
      personality: string[];
      toneOfVoice: string;
      positioning: string;
      differentiators: string[];
    };

    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();

      const result = await Promise.race([
        zai.chat.completions.create({
          messages: [
            { role: "system", content: STRATEGY_SYSTEM_PROMPT },
            { role: "user", content: `ولّد استراتيجية هوية لهذا المشروع:\n\n${briefText}` },
          ],
          thinking: { type: "disabled" },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("AI_TIMEOUT")), 10000)
        ),
      ]);

      const raw = result.choices?.[0]?.message?.content?.trim() || "";
      // استخراج JSON من الرد (قد يكون محاطًا بـ ```json)
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI_NO_JSON");
      strategy = JSON.parse(jsonMatch[0]);
    } catch {
      // fallback ذكي محلي
      strategy = generateLocalStrategy(
        brief?.companyName || project.name,
        brief?.industry || project.industry || "",
        brief?.targetAudience || project.targetAudience || ""
      );
    }

    // حفظ في قاعدة البيانات (upsert)
    const saved = await db.brandStrategy.upsert({
      where: { projectId: project.id },
      update: {
        vision: strategy.vision,
        mission: strategy.mission,
        coreValues: strategy.coreValues,
        personality: strategy.personality,
        toneOfVoice: strategy.toneOfVoice,
        positioning: strategy.positioning,
        differentiators: strategy.differentiators,
      },
      create: {
        projectId: project.id,
        vision: strategy.vision,
        mission: strategy.mission,
        coreValues: strategy.coreValues,
        personality: strategy.personality,
        toneOfVoice: strategy.toneOfVoice,
        positioning: strategy.positioning,
        differentiators: strategy.differentiators,
      },
    });

    // تحديث حالة المشروع
    await db.brandProject.update({
      where: { id: project.id },
      data: { status: "strategy", currentStep: 2 },
    });

    // تسجيل استهلاك AI
    await db.aICreditUsage.create({
      data: {
        userId: session.user.id,
        projectId: project.id,
        feature: "strategy",
        creditsUsed: 5,
      },
    });

    return NextResponse.json({ strategy: saved });
  } catch (error) {
    console.error("POST /api/ai/generate-strategy error:", error);
    return NextResponse.json(
      { error: "فشل توليد الاستراتيجية" },
      { status: 500 }
    );
  }
}

/**
 * توليد استراتيجية محليًا عند تعذّر الوصول لـ AI.
 * يولّد رؤية/رسالة/قيمًا مخصصة بناءً على الصناعة والاسم.
 */
function generateLocalStrategy(
  companyName: string,
  industry: string,
  audience: string
): {
  vision: string;
  mission: string;
  coreValues: string[];
  personality: string[];
  toneOfVoice: string;
  positioning: string;
  differentiators: string[];
} {
  const ind = industry || "التقنية والإبداع";
  const aud = audience || "العملاء الباحثون عن التميّز";

  return {
    vision: `أن نكون ${companyName} العلامة الرائدة في ${ind} على المستوى الإقليمي.`,
    mission: `نقدّم حلولًا مبتكرة في ${ind} لـ${aud}، نمكّنهم من تحقيق أهدافهم بأسلوب يعكس هويتهم.`,
    coreValues: ["الإبداع", "الجودة", "الشفافية", "الشراكة"],
    personality: ["عصري", "واثق", "ملهم", "موثوق"],
    toneOfVoice: "عصري ومحترف مع لمسة دافئة تخاطب العميل العربي.",
    positioning: `${companyName} الخيار الأول لـ${aud} الذي يبحث عن التميّز في ${ind}.`,
    differentiators: [
      `فهم عميق لـ${aud}`,
      "نهج مخصّص لكل عميل",
      "جودة استثنائية بسرعة تنفيذ",
    ],
  };
}
