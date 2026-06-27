import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/projects/[id] — تفاصيل مشروع كاملة
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
    }
    const { id } = await params;

    const project = await db.brandProject.findFirst({
      where: { id, ownerId: session.user.id },
      include: {
        brief: true,
        strategy: true,
        visualDirections: true,
        colorPalettes: true,
        fontSystems: true,
        moodBoards: { include: { items: true } },
        brandBooks: { orderBy: { version: "desc" }, take: 1 },
        clientShares: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "فشل جلب المشروع" }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
    }
    const { id } = await params;

    const project = await db.brandProject.findFirst({
      where: { id, ownerId: session.user.id },
      select: { id: true },
    });
    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    await db.brandProject.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "فشل حذف المشروع" }, { status: 500 });
  }
}
