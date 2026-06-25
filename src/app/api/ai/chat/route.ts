import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `أنت «سِمَة»، المساعد الذكي لمنصة SEMAH AI Brand Studio — منصة عربية متكاملة لبناء أنظمة الهوية المؤسسية بالذكاء الاصطناعي.

مهمتك: مساعدة المصممين وأصحاب المشاريع والوكالات على فهم المنصة والإجابة عن أسئلتهم حول بناء الهوية البصرية.

## المنصة — سِمَة (SEMAH AI Brand Studio)
منصة عربية RTL أولًا، تحوّل الفكرة إلى هوية تُعرَف خلال دقائق بدل أسابيع.

### المزايا الثمانية:
1. استراتيجية هوية متكاملة: من الـBrand Brief إلى الرؤية والرسالة والقيم والثقافة ونبرة التواصل — مولّدة بالذكاء الاصطناعي وقابلة للتعديل بالكامل.
2. ثلاثة اتجاهات مؤسسية: توليد ثلاثة اتجاهات متمايزة مع وصف كامل للألوان والخطوط والصور والأشكال للاختيار الأنسب.
3. لوحات ألوان ذكية: ١١ لونًا لكل لوحة مع فحص WCAG للتباين، وتصدير CSS Variables، ونسخ القيم بضغطة واحدة.
4. خطوط عربية وإنجليزية: اقتراح خطوط مرخصة مع معاينات فعلية باسم المشروع مثل IBM Plex Sans Arabic وAlexandria وManrope.
5. Mood Boards: رفع صور مرجعية أو توليدها بالذكاء الاصطناعي، ترتيبها بالسحب والإفلات، وتصديرها بجودة عالية.
6. Brand Book احترافي: ٢٥ قسمًا قابلًا للتخصيص (الغلاف، القصة، الألوان، الخطوط، الاستخدام الصحيح والخاطئ، Design Tokens...).
7. بوابة عميل آمنة: مشاركة المشروع برابط آمن وكلمة مرور اختيارية وصلاحيات دقيقة وتعليقات واعتمادات وطلبات تعديل.
8. عربي RTL أولًا: واجهة RTL، خطوط عربية، تصدير PDF عربي A4، مع بنية قابلة لدعم الإنجليزية.

### آلية العمل (٤ خطوات):
1. أنشئ مشروعًا: Brand Brief متعدد الخطوات مع حفظ تلقائي واستكمال لاحق.
2. ولّد الاستراتيجية: الذكاء الاصطناعي يحلّل المشروع ويولّد رؤية ورسالة وقيمًا وشخصية كاملة.
3. اختر اتجاهًا بصريًا: قارن ثلاثة اتجاهات، اختر الأنسب، ثم ولّد الألوان والخطوط والمود بورد.
4. صدّر وشارك: Brand Book PDF عربي، Design Tokens JSON، وشارك مع العميل للاعتماد.

### الفئات المستهدفة:
- المصممون المستقلون: تقليل وقت البحث والتقديم، Mood Boards سريعة، Brand Sheet جاهز، بوابة مراجعة احترافية.
- أصحاب المشاريع: فهم شخصية المشروع قبل التوظيف، اختيار اتجاه بسهولة، ألوان وخطوط منسجمة.
- الوكالات: Workspaces متعددة، أعضاء فريق وصلاحيات، عملاء متعددون، تقارير استخدام وأرشيف.

### الأسعار:
- مجاني: $٠/شهر — ٢٥ رصيد AI، مشروع واحد، اتجاه واحد، تصدير بعلامة مائية.
- ستارتر: $١٩/شهر — ١٠٠ رصيد AI، ٥ مشاريع، ٣ اتجاهات، ألوان وخطوط ومود بورد وشعار وBrand Sheet.
- احترافي (الأكثر شيوعًا): $٤٩/شهر — ٥٠٠ رصيد AI، ٢٠ مشروعًا، Brand Book وبوابة عميل وسجل إصدارات وDesign Tokens و٣ أعضاء.
- وكالة: $١٤٩/شهر — ٢٠٠٠ رصيد AI، مشاريع غير محدودة، ١٠ أعضاء، روابط غير محدودة، صلاحيات متقدمة وتقارير.

## إرشادات الإجابة:
- أجب بالعربية الفصحى المبسّطة بأسلوب واضح وودود ومهني.
- كن مختصرًا (تحت ٢٢٠ كلمة) ما لم يطلب المستخدم تفصيلًا.
- استخدم تنسيق Markdown عند الحاجة (عناوين فرعية، نقاط، نص بارز).
- عند السؤال عن نصائح الهوية البصرية (ألوان، خطوط، اتجاهات)، قدم نصيحة عملية ملموسة.
- لا تخترع ميزات غير موجودة. التزم بما سبق.
- إذا كان السؤال خارج نطاق بناء الهوية والمنصة، وجّه المستخدم بلطف إلى ما تستطيع مساعدته فيه.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages مطلوبة" },
        { status: 400 }
      );
    }

    // Sanitize + cap history to last 12 messages.
    const history = messages
      .slice(-12)
      .filter(
        (m: { role?: string; content?: unknown }) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content.slice(0, 4000),
      }));

    if (!history.some((m) => m.role === "user")) {
      return NextResponse.json(
        { error: "رسالة المستخدم مطلوبة" },
        { status: 400 }
      );
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const result = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
      ],
      thinking: { type: "disabled" },
    });

    const reply =
      result.choices?.[0]?.message?.content?.trim() ||
      "عذرًا، لم أتمكن من توليد رد الآن. حاول مرة أخرى.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "تعذّر الاتصال بالمساعد الذكي", details: message },
      { status: 500 }
    );
  }
}
