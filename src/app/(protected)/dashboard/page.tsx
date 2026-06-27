import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectList } from "@/components/project-list";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const projects = await db.brandProject.findMany({
    where: { ownerId: session?.user?.id },
    orderBy: { updatedAt: "desc" },
    include: {
      brief: { select: { industry: true, targetAudience: true } },
      strategy: { select: { vision: true } },
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

  const totalAiUsage = session?.user?.id
    ? await db.aICreditUsage.aggregate({
        where: { userId: session.user.id },
        _sum: { creditsUsed: true },
      })
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            مرحبًا{session?.user?.name ? `، ${session.user.name}` : ""} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            ابدأ ببناء هوية مؤسسية جديدة أو تابع مشروعك الحالي.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="المشاريع" value={projects.length} />
        <StatCard
          label="مكتملة"
          value={projects.filter((p) => p.status === "complete").length}
        />
        <StatCard
          label="قيد العمل"
          value={projects.filter((p) => p.status !== "complete").length}
        />
        <StatCard
          label="رصيد AI"
          value={Math.max(0, 25 - (totalAiUsage?._sum.creditsUsed || 0))}
          suffix="/ 25"
        />
      </div>

      {/* Projects */}
      <ProjectList initialProjects={JSON.parse(JSON.stringify(projects))} />
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="text-2xl font-extrabold font-display text-primary">
        {value}
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
