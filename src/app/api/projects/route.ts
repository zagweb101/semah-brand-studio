import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const projectSchema = z.object({
  name: z.string().min(2, "الاسم قصير جدًا").max(80),
  industry: z.string().max(100).optional(),
  targetAudience: z.string().max(300).optional(),
  description: z.string().max(1000).optional(),
});

function slugify(s: string): string {
  return (
    s
      .trim()
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || `proj-${Date.now()}`
  );
}

// GET /api/projects — قائمة مشاريع المستخدم الحالي
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
    }

    const projects = await db.brandProject.findMany({
      where: { ownerId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        brief: { select: { industry: true, targetAudience: true } },
        strategy: { select: { vision: true, mission: true } },
        visualDirections: { select: { id: true, name: true, selected: true } },
        _count: {
          select: {
            colorPalettes: true,
            fontSystems: true,
            moodBoards: true,
            brandBooks: true,
          },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "فشل جلب المشاريع" }, { status: 500 });
  }
}

// POST /api/projects — إنشاء مشروع هوية جديد
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "بيانات غير صالحة", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, industry, targetAudience, description } = parsed.data;

    // تأكد من تفرد الـ slug
    let slug = slugify(name);
    const existing = await db.brandProject.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const project = await db.brandProject.create({
      data: {
        name,
        slug,
        industry: industry || null,
        targetAudience: targetAudience || null,
        ownerId: session.user.id,
        status: "brief",
        currentStep: 1,
        brief: {
          create: {
            companyName: name,
            industry: industry || null,
            targetAudience: targetAudience || null,
            description: description || null,
          },
        },
      },
      include: { brief: true },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "فشل إنشاء المشروع" }, { status: 500 });
  }
}
