"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Check,
  Sparkles,
  ShieldCheck,
  Languages,
} from "lucide-react";

const swatches = [
  { name: "Primary", hex: "#10B981", text: "ffffff" },
  { name: "Teal", hex: "#14B8A6", text: "ffffff" },
  { name: "Lime", hex: "#84CC16", text: "1a2e1a" },
  { name: "Ink", hex: "#0B1220", text: "ffffff" },
  { name: "Mist", hex: "#E6F4EF", text: "0B1220" },
  { name: "Gold", hex: "#F5C451", text: "1a2e1a" },
];

const tokens = `--brand-primary: #10B981;
--brand-accent:  #14B8A6;
--font-display:  "Cairo";
--font-body:     "IBM Plex Sans Arabic";
--radius:        0.875rem;`;

const easeOut = [0.16, 1, 0.3, 1] as const;

export function BrandCanvas() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, oklch(0.72 0.16 162 / 0.35), transparent 70%), radial-gradient(50% 50% at 80% 80%, oklch(0.66 0.13 185 / 0.3), transparent 70%)",
        }}
      />

      {/* Main brand sheet card */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="glass relative rounded-3xl border border-border/80 p-5 shadow-2xl shadow-primary/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground font-display text-lg font-extrabold">
              س
            </span>
            <div className="leading-tight">
              <div className="font-display text-base font-extrabold">سِمَة</div>
              <div className="text-[10px] tracking-[0.18em] text-muted-foreground">
                BRAND SHEET
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <Sparkles className="size-3" /> AI
          </span>
        </div>

        {/* Palette */}
        <div className="mt-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Palette className="size-3.5" /> لوحة الألوان
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {swatches.map((s, i) => (
              <motion.div
                key={s.hex}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: easeOut }}
                className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-black/10"
                style={{ background: s.hex }}
                title={`${s.name} · ${s.hex}`}
              >
                {i === 0 && (
                  <span
                    className="absolute bottom-0.5 end-0.5 rounded bg-black/40 px-1 text-[8px] font-bold leading-tight"
                    style={{ color: `#${s.text}` }}
                  >
                    AA
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Check className="size-3 text-primary" /> WCAG 2.1 AA
            </span>
            <span>١١ لونًا</span>
          </div>
        </div>

        {/* Type specimen */}
        <div className="mt-5 rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Type className="size-3.5" /> نظام الخطوط
          </div>
          <div className="font-display text-3xl font-extrabold leading-tight">
            هوية تُعرَف
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            IBM Plex Sans Arabic · Cairo — معاينة باسم مشروعك
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["عريض", "Bold", "Medium", "عادي", "Light"].map((w) => (
              <span
                key={w}
                className="rounded-md border border-border/70 bg-card/60 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Tokens */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-[oklch(0.13_0.01_168)]">
          <div className="flex items-center gap-1.5 border-b border-border/50 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground">
            <span className="size-2 rounded-full bg-red-400/80" />
            <span className="size-2 rounded-full bg-yellow-400/80" />
            <span className="size-2 rounded-full bg-green-400/80" />
            <span className="ms-2">design-tokens.css</span>
          </div>
          <pre
            dir="ltr"
            className="overflow-x-auto px-3 py-2.5 text-[10.5px] leading-relaxed text-emerald-200/90"
            style={{ fontFamily: "var(--font-ibm), monospace" }}
          >
            {tokens}
          </pre>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
        className="absolute -start-5 top-10 hidden sm:flex"
      >
        <div className="animate-float-slow flex items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-3 py-2 shadow-xl backdrop-blur">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <ShieldCheck className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[11px] font-bold">بوابة عميل</div>
            <div className="text-[10px] text-muted-foreground">آمنة ومحمية</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: easeOut }}
        className="absolute -end-4 bottom-16 hidden sm:flex"
      >
        <div
          className="animate-float-slow flex items-center gap-2 rounded-2xl border border-border/70 bg-card/90 px-3 py-2 shadow-xl backdrop-blur"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Languages className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-[11px] font-bold">عربي RTL</div>
            <div className="text-[10px] text-muted-foreground">أولًا</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
