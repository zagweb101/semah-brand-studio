import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { plans } from "@/lib/plans";

// Get current subscription
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      subscription,
      plans,
    });
  } catch (error) {
    console.error("GET /api/billing error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

// Subscribe / upgrade plan (mock — no real Stripe)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();
    const plan = plans.find((p) => p.id === planId);

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const existing = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const periodEnd = new Date();
    periodEnd.setDate(periodEnd.getDate() + 30);

    let subscription;
    if (existing) {
      subscription = await db.subscription.update({
        where: { userId: session.user.id },
        data: {
          status: "active",
          plan: plan.id,
          priceId: `price_demo_${plan.id}`,
          subscriptionId: `sub_demo_${Date.now()}`,
          currentPeriodEnd: periodEnd,
        },
      });
    } else {
      subscription = await db.subscription.create({
        data: {
          userId: session.user.id,
          customerId: `cus_demo_${session.user.id}`,
          status: "active",
          plan: plan.id,
          priceId: `price_demo_${plan.id}`,
          subscriptionId: `sub_demo_${Date.now()}`,
          currentPeriodEnd: periodEnd,
        },
      });
    }

    // Create notification
    await db.notification.create({
      data: {
        userId: session.user.id,
        title: "Plan updated ✨",
        message:
          plan.id === "free"
            ? "You're now on the Free plan."
            : `You've upgraded to the ${plan.name} plan. Enjoy all the premium features!`,
        type: "success",
      },
    });

    return NextResponse.json({ subscription, plan });
  } catch (error) {
    console.error("POST /api/billing error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
