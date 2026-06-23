import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Get all organizations for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const memberships = await db.membership.findMany({
      where: { userId: session.user.id },
      include: {
        organization: {
          include: {
            memberships: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, image: true },
                },
              },
            },
            owner: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const organizations = memberships.map((m) => ({
      ...m.organization,
      role: m.role,
    }));

    return NextResponse.json({ organizations });
  } catch (error) {
    console.error("GET /api/organizations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}

// Create a new organization
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Organization name must be at least 2 characters" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check slug uniqueness
    const existing = await db.organization.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "An organization with this name already exists" },
        { status: 400 }
      );
    }

    const org = await db.organization.create({
      data: {
        name: name.trim(),
        slug,
        ownerId: session.user.id,
        memberships: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
      },
      include: {
        memberships: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId: session.user.id,
        title: "Organization created 🚀",
        message: `You created "${org.name}". Start inviting team members to collaborate.`,
        type: "success",
      },
    });

    return NextResponse.json({ organization: org }, { status: 201 });
  } catch (error) {
    console.error("POST /api/organizations error:", error);
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}
