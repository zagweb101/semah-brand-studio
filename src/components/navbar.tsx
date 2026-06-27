"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Sparkles, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { AuthModal } from "@/components/auth-modal";

const navLinks = [
  { href: "#features", label: "المزايا" },
  { href: "#how", label: "كيف يعمل" },
  { href: "#audience", label: "لمن صُممت" },
  { href: "#pricing", label: "الأسعار" },
  { href: "#faq", label: "الأسئلة" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAuth = (m: "login" | "register") => {
    setAuthMode(m);
    setAuthOpen(true);
  };

  const handleSignOut = () => {
    signOut({ redirect: false });
    toast.success("تم تسجيل الخروج بنجاح");
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-smooth ${
        scrolled
          ? "border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="relative flex size-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground shadow-lg shadow-primary/25">
            <Image
              src="/semah-logo.png"
              alt="سِمَة"
              width={22}
              height={22}
              className="size-5 object-contain brightness-0 invert"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight">
              سِمَة
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              SEMAH
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-smooth"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session?.user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="gap-1.5">
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  لوحة التحكم
                </Link>
              </Button>
              <span className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                  {session.user.name?.charAt(0) || "م"}
                </span>
                <span className="max-w-[100px] truncate font-medium">
                  {session.user.name}
                </span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                خروج
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuth("login")}
                className="hidden sm:inline-flex"
              >
                دخول
              </Button>
              <Button
                size="sm"
                onClick={() => openAuth("register")}
                className="hidden sm:inline-flex gap-1.5"
              >
                <Sparkles className="size-4" />
                ابدأ مجانًا
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border">
            {session?.user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-card/60 px-3 py-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                    {session.user.name?.charAt(0) || "م"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {session.user.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground" dir="ltr">
                      {session.user.email}
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="w-full gap-1.5">
                  <LogOut className="size-4" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    openAuth("login");
                    setMobileOpen(false);
                  }}
                  className="w-full"
                >
                  دخول
                </Button>
                <Button
                  onClick={() => {
                    openAuth("register");
                    setMobileOpen(false);
                  }}
                  className="w-full gap-1.5"
                >
                  <Sparkles className="size-4" />
                  ابدأ مجانًا
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} mode={authMode} />
    </header>
  );
}
