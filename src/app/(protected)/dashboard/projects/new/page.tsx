"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

const industries = [
  "تقنية وبرمجيات",
  "تجارة إلكترونية",
  "تصميم وإبداع",
  "استشارات",
  "تعليم",
  "صحة وطب",
  "طعام ومشروبات",
  "عقارات",
  "ترفيه وثقافة",
  "أخرى",
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    targetAudience: "",
    description: "",
  });

  const steps = ["الاسم", "الصناعة", "الجمهور", "الوصف"];
  const canNext = step === 0 ? form.name.trim().length >= 2 : true;

  const handleSubmit = async () => {
    if (form.name.trim().length < 2) {
      toast.error("الاسم قصير جدًا");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الإنشاء");
      toast.success("تم إنشاء المشروع! لنولّد الاستراتيجية الآن.");
      router.push(`/dashboard/projects/${data.project.id}?action=strategy`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "فشل إنشاء المشروع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-lg shadow-primary/30">
          <Sparkles className="size-7" />
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          مشروع هوية جديد
        </h1>
        <p className="mt-2 text-muted-foreground">
          عبّئ Brand Brief — ٤ خطوات سريعة، ثم دع الذكاء الاصطناعي يولّد الاستراتيجية.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-smooth ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 ${
                  i < step ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            {step === 0 && "ما اسم مشروعك/شركتك؟"}
            {step === 1 && "ما الصناعة؟"}
            {step === 2 && "من هو جمهورك المستهدف؟"}
            {step === 3 && "صف مشروعك بإيجاز"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <div className="space-y-2">
              <Label htmlFor="name">اسم المشروع</Label>
              <Input
                id="name"
                placeholder="مثال: نخلة استوديو"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoFocus
                className="text-base"
                onKeyDown={(e) => e.key === "Enter" && canNext && setStep(step + 1)}
              />
              <p className="text-xs text-muted-foreground">
                هذا الاسم سيُستخدم في كل مخرجات الهوية.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <Label>اختر الصناعة</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setForm({ ...form, industry: ind })}
                    className={`rounded-lg border px-3 py-2.5 text-sm transition-smooth ${
                      form.industry === ind
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 hover:bg-accent/50"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="audience">الجمهور المستهدف</Label>
              <Textarea
                id="audience"
                placeholder="مثال: الشركات الناشئة في الخليج، رواد الأعمال من ٢٥-٤٠ سنة..."
                value={form.targetAudience}
                onChange={(e) =>
                  setForm({ ...form, targetAudience: e.target.value })
                }
                rows={3}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                يساعد الذكاء الاصطناعي على تخصيص الرؤية والرسالة.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="desc">وصف المشروع</Label>
              <Textarea
                id="desc"
                placeholder="مثال: استوديو تصميم متخصص في الهوية البصرية للعلامات العربية المعاصرة..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                كلما كان الوصف أدق، كانت الاستراتيجية أفضل.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={() => (step === 0 ? router.back() : setStep(step - 1))}
              className="gap-1.5"
            >
              <ArrowRight className="size-4" />
              {step === 0 ? "إلغاء" : "السابق"}
            </Button>
            {step < steps.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                className="gap-1.5"
              >
                التالي
                <ArrowLeft className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="gap-1.5"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                إنشاء وتوليد الاستراتيجية
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
