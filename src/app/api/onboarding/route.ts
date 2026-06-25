import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Update user profile
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();

    const user = await db.user.update({
      where: { id: session.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(image !== undefined && { image }),
      },
      select: { id: true, name: true, email: true, image: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("PATCH /api/onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
