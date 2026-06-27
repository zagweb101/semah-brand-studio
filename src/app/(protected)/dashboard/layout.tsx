import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { db } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/?auth=login");
  }

  // عدد الإشعارات غير المقروءة للعرض في الشريط
  let unreadCount = 0;
  try {
    unreadCount = await db.notification.count({
      where: { userId: session.user.id, read: false },
    });
  } catch {
    /* تجاهل */
  }

  return (
    <DashboardShell
      userName={session.user.name || "مستخدم"}
      userEmail={session.user.email || ""}
      userImage={session.user.image}
      unreadCount={unreadCount}
    >
      {children}
    </DashboardShell>
  );
}
