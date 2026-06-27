"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  ArrowRight,
  Eye,
  Target,
  Heart,
  Mic,
  Compass,
  Zap,
  Palette,
  Type,
  BookOpen,
  Share2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

type Strategy = {
  id: string;
  vision: string | null;
  mission: string | null;
  coreValues: string[] | null;
  personality: string[] | null;
  toneOfVoice: string | null;
  positioning: string | null;
  differentiators: string[] | null;
};

type Project = {
  id: string;
  name: string;
  slug: string;
  status: string;
  currentStep: number;
  industry: string | null;
  targetAudience: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  brief: {
    companyName: string | null;
    industry: string | null;
    targetAudience: string | null;
    description: string | null;
  } | null;
  strategy: Strategy | null;
  visualDirections: { id: string; name: string; selected: boolean }[];
  colorPalettes: { id: string; name: string }[];
  fontSystems: { id: string; displayFont: string | null }[];
  moodBoards: { id: string; title: string }[];
  brandBooks: { id: string; version: number; status: string }[];
};

const statusLabels: Record<string, string> = {
  brief: "Brand Brief",
  strategy: "الاستراتيجية",
  directions: "الاتجاهات",
  design: "التصميم",
  export: "التصدير",
  complete: "مكتمل",
};

export function ProjectView({ project }: { project: Project }) {
  const params = useSearchParams();
  const [strategy, setStrategy] = useState<Strategy | null>(project.strategy);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"strategy" | "directions" | "assets">(
    "strategy"
  );

  // إذا جاء ?action=strategy، ابدأ التوليد تلقائيًا
  useEffect(() => {
    if (params.get("action") === "strategy" && !strategy) {
      generateStrategy();
    }
  }, []);

  const generateStrategy = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل التوليد");
      setStrategy(data.strategy);
      toast.success("تم توليد الاستراتيجية بنجاح! 🎉");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل توليد الاستراتيجية");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl brand-gradient text-primary-foreground font-display text-xl font-extrabold shadow-lg shadow-primary/25">
            {project.name.charAt(0)}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-extrabold tracking-tight">
                {project.name}
              </h1>
              <Badge variant="secondary" className="text-[10px]">
                {statusLabels[project.status] || project.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {project.brief?.industry || project.industry || "غير مصنّف"}
              {project.brief?.targetAudience &&
                ` · ${project.brief.targetAudience.slice(0, 40)}`}
            </p>
          </div>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowRight className="size-4" />
            عودة للمشاريع
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {[
          { id: "strategy", label: "الاستراتيجية", icon: Target },
          { id: "directions", label: "الاتجاهات البصرية", icon: Compass },
          { id: "assets", label: "الأصول", icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Strategy tab */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          {!strategy && !generating && (
            <Card className="border-dashed border-2 bg-card/30">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    ولّد الاستراتيجية بالذكاء الاصطناعي
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    سنحلّل Brand Brief ونولّد رؤية ورسالة وقيمًا وشخصية ونبرة
                    تواصل وتموضعًا تنافسيًا وتميّزات — كل ذلك قابل للتعديل.
                  </p>
                </div>
                <Button onClick={generateStrategy} size="lg" className="gap-2">
                  <Sparkles className="size-4" />
                  توليد الاستراتيجية (٥ رصيد AI)
                </Button>
              </CardContent>
            </Card>
          )}

          {generating && (
            <Card className="border-primary/30">
              <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                <Loader2 className="size-12 animate-spin text-primary" />
                <div>
                  <h3 className="font-display text-lg font-bold">
                    جارٍ توليد الاستراتيجية…
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    يحلّل الذكاء الاصطناعي مشروعك ويولّد رؤية ورسالة مخصّصة.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {strategy && !generating && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">
                  استراتيجية الهوية
                </h2>
                <Button
                  onClick={generateStrategy}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={generating}
                >
                  <Sparkles className="size-3.5" />
                  إعادة التوليد
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <StrategyCard
                  icon={Eye}
                  title="الرؤية"
                  content={strategy.vision}
                  color="text-blue-400"
                />
                <StrategyCard
                  icon={Target}
                  title="الرسالة"
                  content={strategy.mission}
                  color="text-primary"
                />
                <StrategyCard
                  icon={Heart}
                  title="القيم الجوهرية"
                  list={strategy.coreValues}
                  color="text-red-400"
                />
                <StrategyCard
                  icon={Sparkles}
                  title="الشخصية"
                  list={strategy.personality}
                  color="text-purple-400"
                />
                <StrategyCard
                  icon={Mic}
                  title="نبرة التواصل"
                  content={strategy.toneOfVoice}
                  color="text-amber-400"
                />
                <StrategyCard
                  icon={Compass}
                  title="التموضع التنافسي"
                  content={strategy.positioning}
                  color="text-teal-400"
                />
                <StrategyCard
                  icon={Zap}
                  title="عوامل التميّز"
                  list={strategy.differentiators}
                  color="text-yellow-400"
                  className="md:col-span-2"
                />
              </div>

              {/* Next step CTA */}
              <Card className="border-primary/30 bg-gradient-to-l from-primary/10 to-transparent">
                <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-start">
                  <div>
                    <h3 className="font-display text-base font-bold">
                      الخطوة التالية: الاتجاهات البصرية
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ولّد ٣ اتجاهات بصرية متمايزة بناءً على الاستراتيجية.
                    </p>
                  </div>
                  <Button
                    onClick={() => setActiveTab("directions")}
                    className="gap-1.5"
                  >
                    المتابعة
                    <ArrowRight className="size-4 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {/* Directions tab */}
      {activeTab === "directions" && (
        <div className="space-y-4">
          <Card className="border-dashed border-2 bg-card/30">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Compass className="size-8" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">
                  الاتجاهات البصرية
                </h3>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  سنولّد ٣ اتجاهات بصرية متمايزة (ألوان، خطوط، أسلوب صور) بناءً
                  على الاستراتيجية لتختار الأنسب.
                </p>
              </div>
              <Button disabled size="lg" className="gap-2">
                <Sparkles className="size-4" />
                توليد الاتجاهات (قريبًا)
              </Button>
              <p className="text-xs text-muted-foreground">
                هذه الميزة قيد التطوير — ستتوفر في التحديث القادم.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Assets tab */}
      {activeTab === "assets" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AssetCard
            icon={Palette}
            title="لوحات الألوان"
            count={project.colorPalettes.length}
            label="لوحة"
          />
          <AssetCard
            icon={Type}
            title="أنظمة الخطوط"
            count={project.fontSystems.length}
            label="نظام"
          />
          <AssetCard
            icon={BookOpen}
            title="Brand Books"
            count={project.brandBooks.length}
            label="كتاب"
          />
          <AssetCard
            icon={Share2}
            title="روابط المشاركة"
            count={0}
            label="رابط"
          />
          <AssetCard
            icon={Clock}
            title="أُنشئ في"
            count={null}
            label={new Date(project.createdAt).toLocaleDateString("ar", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        </div>
      )}
    </div>
  );
}

function StrategyCard({
  icon: Icon,
  title,
  content,
  list,
  color,
  className,
}: {
  icon: React.ElementType;
  title: string;
  content?: string | null;
  list?: string[] | null;
  color: string;
  className?: string;
}) {
  return (
    <Card className={`border-border/70 ${className || ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className={`flex size-8 items-center justify-center rounded-lg bg-muted ${color}`}>
            <Icon className="size-4" />
          </span>
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {content && <p className="text-sm leading-relaxed">{content}</p>}
        {list && (
          <div className="flex flex-wrap gap-1.5">
            {list.map((item, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AssetCard({
  icon: Icon,
  title,
  count,
  label,
}: {
  icon: React.ElementType;
  title: string;
  count: number | null;
  label: string;
}) {
  return (
    <Card className="border-border/70 p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <div className="mt-3">
        {count !== null ? (
          <div className="flex items-end gap-1">
            <span className="font-display text-2xl font-extrabold">{count}</span>
            <span className="mb-0.5 text-xs text-muted-foreground">{label}</span>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">{label}</div>
        )}
      </div>
    </Card>
  );
}
