"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { AuthModal } from "@/components/auth-modal";

export function CtaButton({
  variant = "default",
  size = "lg",
  className = "",
  withIcon = true,
  children = "ابدأ مجانًا",
  mode = "register",
}: {
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "lg" | "sm";
  className?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
  mode?: "login" | "register";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {withIcon && <Sparkles className="size-4" />}
        {children}
      </Button>
      <AuthModal open={open} onOpenChange={setOpen} mode={mode} />
    </>
  );
}
