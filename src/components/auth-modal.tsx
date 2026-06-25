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
import { Rocket, Loader2, Github, Mail } from "lucide-react";

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
            ? "Account created! Welcome to Semah 🎉"
            : "Welcome back!"
        );
        setOpen(false);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Rocket className="size-6" />
          </div>
          <DialogTitle className="text-2xl">Welcome to Semah</DialogTitle>
          <DialogDescription>
            {activeTab === "login"
              ? "Sign in to your account to continue"
              : "Create an account to get started free"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 6 characters
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
                Create Account
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
              Or
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" disabled className="w-full">
            <Github className="size-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" disabled className="w-full">
            <Mail className="size-4 mr-2" />
            Google
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Try the demo:{" "}
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: "demo@semah.dev",
                password: "demo1234",
                name: "Demo User",
              });
              setActiveTab("login");
            }}
            className="text-primary hover:underline font-medium"
          >
            Use demo account
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );

  return content;
}
