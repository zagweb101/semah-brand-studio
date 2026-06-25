import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Get published blog posts
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
