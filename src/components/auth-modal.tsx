"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User } from "lucide-react";

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "login" | "register";
  trigger?: React.ReactNode;
}

export function AuthModal({
  open,
  onOpenChange,
  mode = "login",
  trigger,
}: AuthModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [activeTab, setActiveTab] = useState<"login" | "register">(mode);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        mode: activeTab,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          activeTab === "register"
            ? "تم إنشاء حسابك! أهلًا بك في سِمَة 🎉"
            : "أهلًا بعودتك!"
        );
        setOpen(false);
        setTimeout(() => window.location.reload(), 600);
      }
    } catch {
      toast.error("حدث خطأ ما. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl brand-gradient text-primary-foreground font-display text-2xl font-extrabold shadow-lg shadow-primary/30">
            س
          </div>
          <DialogTitle className="font-display text-2xl font-extrabold">
            أهلًا بك في سِمَة
          </DialogTitle>
          <DialogDescription>
            {activeTab === "login"
              ? "سجّل الدخول إلى حسابك للمتابعة"
              : "أنشئ حسابًا مجانيًا للبدء"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">دخول</TabsTrigger>
            <TabsTrigger value="register">حساب جديد</TabsTrigger>
          </TabsList>

          {/* دخول */}
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    dir="ltr"
                    placeholder="you@example.com"
                    required
                    className="ps-3 pe-10 text-left"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    required
                    className="ps-3 pe-10 text-left"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                تسجيل الدخول
              </Button>
            </form>
          </TabsContent>

          {/* حساب جديد */}
          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">الاسم</Label>
                <div className="relative">
                  <User className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="اسمك الكامل"
                    required
                    className="ps-3 pe-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    dir="ltr"
                    placeholder="you@example.com"
                    required
                    className="ps-3 pe-10 text-left"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="ps-3 pe-10 text-left"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  ٦ أحرف على الأقل
                </p>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                إنشاء الحساب
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              أو
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" disabled className="w-full" title="قريبًا">
            Google
          </Button>
          <Button variant="outline" disabled className="w-full" title="قريبًا">
            GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          جرّب حساب العرض:{" "}
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: "demo@semah.studio",
                password: "semah123",
                name: "مستخدم سِمَة التجريبي",
              });
              setActiveTab("login");
              toast.info("تم تعبئة بيانات الحساب التجريبي");
            }}
            className="font-medium text-primary hover:underline"
          >
            استخدم الحساب التجريبي
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
