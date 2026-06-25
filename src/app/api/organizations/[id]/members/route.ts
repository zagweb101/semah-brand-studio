import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Invite a member to an organization
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: orgId } = await params;
    const { email, role } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user is a member of the org with admin/owner role
    const callerMembership = await db.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: session.user.id,
          organizationId: orgId,
        },
      },
    });

    if (!callerMembership || (callerMembership.role !== "OWNER" && callerMembership.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Only owners and admins can invite members" },
        { status: 403 }
      );
    }

    // Find or create the user to invite
    let invitee = await db.user.findUnique({ where: { email } });
    if (!invitee) {
      invitee = await db.user.create({
        data: {
          email,
          name: email.split("@")[0],
        },
      });
      await db.subscription.create({
        data: {
          userId: invitee.id,
          customerId: `cus_demo_${invitee.id}`,
          status: "active",
          plan: "free",
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Check if already a member
    const existingMembership = await db.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: invitee.id,
          organizationId: orgId,
        },
      },
    });
    if (existingMembership) {
      return NextResponse.json(
        { error: "User is already a member of this organization" },
        { status: 400 }
      );
    }

    const membership = await db.membership.create({
      data: {
        userId: invitee.id,
        organizationId: orgId,
        role: role || "MEMBER",
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    // Create notification for the invitee
    const org = await db.organization.findUnique({ where: { id: orgId } });
    await db.notification.create({
      data: {
        userId: invitee.id,
        title: "You've been invited to a team 👥",
        message: `You were added to "${org?.name}" as ${role || "MEMBER"}.`,
        type: "info",
      },
    });

    return NextResponse.json({ membership }, { status: 201 });
  } catch (error) {
    console.error("POST /api/organizations/[id]/members error:", error);
    return NextResponse.json(
      { error: "Failed to invite member" },
      { status: 500 }
    );
  }
}

// Remove a member from an organization
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: orgId } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const callerMembership = await db.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: session.user.id,
          organizationId: orgId,
        },
      },
    });

    if (!callerMembership || (callerMembership.role !== "OWNER" && callerMembership.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Only owners and admins can remove members" },
        { status: 403 }
      );
    }

    const targetMembership = await db.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId: orgId,
        },
      },
    });

    if (!targetMembership) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    if (targetMembership.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot remove the owner of the organization" },
        { status: 400 }
      );
    }

    await db.membership.delete({
      where: { id: targetMembership.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/organizations/[id]/members error:", error);
    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
}
