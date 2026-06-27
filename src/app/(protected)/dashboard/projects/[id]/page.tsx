import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectView } from "@/components/project-view";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const project = await db.brandProject.findFirst({
    where: { id, ownerId: session?.user?.id },
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

  if (!project) notFound();

  return (
    <ProjectView project={JSON.parse(JSON.stringify(project))} />
  );
}
