"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderPlus,
  MoreVertical,
  Trash2,
  ExternalLink,
  Palette,
  Type,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  slug: string;
  status: string;
  industry?: string | null;
  updatedAt: string;
  brief?: { industry: string | null } | null;
  strategy?: { vision: string | null } | null;
  visualDirections: { id: string; name: string; selected: boolean }[];
  _count: {
    colorPalettes: number;
    fontSystems: number;
    moodBoards: number;
    brandBooks: number;
  };
};

const statusMap: Record<string, { label: string; color: string }> = {
  brief: { label: "Brand Brief", color: "bg-muted text-muted-foreground" },
  strategy: { label: "الاستراتيجية", color: "bg-blue-500/15 text-blue-400" },
  directions: { label: "الاتجاهات", color: "bg-purple-500/15 text-purple-400" },
  design: { label: "التصميم", color: "bg-primary/15 text-primary" },
  export: { label: "التصدير", color: "bg-amber-500/15 text-amber-400" },
  complete: { label: "مكتمل", color: "bg-green-500/15 text-green-400" },
};

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`حذف مشروع «${name}»؟ لا يمكن التراجع.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("فشل الحذف");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("تم حذف المشروع");
    } catch {
      toast.error("فشل حذف المشروع");
    } finally {
      setDeleting(null);
    }
  };

  if (projects.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 border-dashed border-2 bg-card/30 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderPlus className="size-8" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">لا توجد مشاريع بعد</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            ابدأ ببناء أول هوية مؤسسية. أنشئ مشروعًا، عبّئ Brand Brief، ودع
            الذكاء الاصطناعي يولّد لك الاستراتيجية.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard/projects/new">
            <FolderPlus className="size-4" />
            إنشاء أول مشروع
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">مشاريعك</h2>
        <Button asChild size="sm" className="gap-1.5">
          <Link href="/dashboard/projects/new">
            <FolderPlus className="size-4" />
            مشروع جديد
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => {
          const st = statusMap[p.status] || statusMap.brief;
          return (
            <Card
              key={p.id}
              className="group relative overflow-hidden p-5 transition-smooth hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/dashboard/projects/${p.id}`}
                  className="flex min-w-0 flex-1 flex-col"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-base font-bold text-primary">
                      {p.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-bold hover:text-primary">
                        {p.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.brief?.industry || p.industry || "غير مصنّف"}
                      </p>
                    </div>
                  </div>
                </Link>
                <Badge className={`${st.color} shrink-0 text-[10px]`} variant="secondary">
                  {st.label}
                </Badge>
              </div>

              {p.strategy?.vision && (
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {p.strategy.vision}
                </p>
              )}

              {/* Asset counts */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                {p._count.colorPalettes > 0 && (
                  <span className="flex items-center gap-1">
                    <Palette className="size-3" />
                    {p._count.colorPalettes} لوحة
                  </span>
                )}
                {p._count.fontSystems > 0 && (
                  <span className="flex items-center gap-1">
                    <Type className="size-3" />
                    {p._count.fontSystems} خط
                  </span>
                )}
                {p._count.brandBooks > 0 && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="size-3" />
                    Brand Book
                  </span>
                )}
                {p.visualDirections.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Sparkles className="size-3" />
                    {p.visualDirections.length} اتجاه
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-[10px] text-muted-foreground">
                  {new Date(p.updatedAt).toLocaleDateString("ar", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                  >
                    <Link href={`/dashboard/projects/${p.id}`}>
                      فتح
                      <ExternalLink className="size-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deleting === p.id}
                    title="حذف"
                  >
                    {deleting === p.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
