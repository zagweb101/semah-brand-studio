"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderPlus,
  Bell,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard", label: "المشاريع", icon: LayoutDashboard },
  { href: "/dashboard/projects/new", label: "مشروع جديد", icon: FolderPlus },
];

export function DashboardShell({
  userName,
  userEmail,
  unreadCount,
  children,
}: {
  userName: string;
  userEmail: string;
  userImage?: string | null;
  unreadCount: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  const handleSignOut = () => {
    signOut({ redirect: false });
    toast.success("تم تسجيل الخروج");
    setTimeout(() => router.push("/"), 400);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground shadow-lg shadow-primary/25">
              <Image
                src="/semah-logo.png"
                alt="سِمَة"
                width={22}
                height={22}
                className="size-5 object-contain brightness-0 invert"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight">
                سِمَة
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
                DASHBOARD
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ChevronLeft className="size-4" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="relative" aria-label="الإشعارات">
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 ps-1 pe-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-bold text-primary">
              {userName.charAt(0)}
            </span>
            <span className="hidden max-w-[120px] truncate text-xs font-medium sm:block">
              {userName}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            aria-label="تسجيل الخروج"
            title="خروج"
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 border-s border-border bg-card/30 lg:block">
          <nav className="sticky top-16 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                    isActive(item.href)
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-6 rounded-xl border border-primary/20 bg-gradient-to-l from-primary/10 to-transparent p-4">
              <Sparkles className="size-5 text-primary" />
              <p className="mt-2 text-xs font-semibold">باقة مجانية</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                ٢٥ رصيد AI متبقّي
              </p>
              <Link href="/#pricing">
                <Button size="sm" className="mt-3 w-full gap-1.5">
                  <Sparkles className="size-3.5" />
                  ترقية
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <aside
              className="absolute end-0 top-16 h-[calc(100vh-4rem)] w-64 border-s border-border bg-card p-3"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                      isActive(item.href)
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
