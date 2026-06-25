"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export function CtaButton({
  variant = "default",
  size = "lg",
  className = "",
  withIcon = true,
  children = "ابدأ مجانًا",
}: {
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "lg" | "sm";
  className?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() =>
        toast.info("التسجيل قريبًا", {
          description: "جرّب المساعد الذكي «اسأل سِمَة» الآن من الزر في الأسفل.",
        })
      }
    >
      {withIcon && <Sparkles className="size-4" />}
      {children}
    </Button>
  );
}
