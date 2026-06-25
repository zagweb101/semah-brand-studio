"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { plans } from "@/lib/plans";
import { toast } from "sonner";

function toArabicNumerals(input: string | number): string {
  const map = "٠١٢٣٤٥٦٧٨٩";
  return String(input).replace(/\d/g, (d) => map[Number(d)]);
}

export function PricingTable() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    setLoadingPlan(planId);
    // Simulate a brief action then notify (no real billing in this demo).
    await new Promise((r) => setTimeout(r, 650));
    setLoadingPlan(null);
    toast.success(`تم اختيار باقة «${plan.name}»`, {
      description: "التسجيل قريبًا — جرّب المساعد الذكي «اسأل سِمَة» الآن.",
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative flex flex-col transition-smooth ${
            plan.highlight
              ? "border-primary/60 shadow-xl shadow-primary/10 lg:scale-[1.03] bg-card"
              : "hover:border-primary/40 hover:shadow-md"
          }`}
        >
          {plan.highlight && (
            <div className="absolute -top-3 start-1/2 -translate-x-1/2">
              <Badge className="gap-1 brand-gradient text-primary-foreground shadow-lg shadow-primary/30">
                <Sparkles className="size-3" />
                الأكثر شيوعًا
              </Badge>
            </div>
          )}
          <CardHeader className="pb-3">
            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground min-h-[40px]">
              {plan.description}
            </p>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold font-display">
                ${toArabicNumerals(plan.price)}
              </span>
              <span className="text-muted-foreground mb-1">/ {plan.interval}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-primary">
              {plan.credits}
            </p>
          </CardHeader>
          <CardContent className="flex-1 pt-1">
            <ul className="space-y-2.5 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" />
                  </span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              className="w-full"
              variant={plan.highlight ? "default" : "outline"}
              disabled={loadingPlan === plan.id}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {loadingPlan === plan.id && (
                <Loader2 className="size-4 me-2 animate-spin" />
              )}
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
