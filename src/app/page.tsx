import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { PricingTable } from "@/components/pricing-table";
import { LandingFooter } from "@/components/landing-footer";
import {
  ShieldCheck,
  Database,
  CreditCard,
  Users,
  Mail,
  Moon,
  Zap,
  GitBranch,
  Rocket,
  Bot,
  BarChart3,
  Bell,
  ArrowRight,
  Star,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";

const features = [
  {
    icon: ShieldCheck,
    title: "Auth.js v4",
    description:
      "Email/password credentials auth with JWT sessions, protected routes, and secure password hashing.",
  },
  {
    icon: Database,
    title: "Prisma + SQLite",
    description:
      "Type-safe ORM with migrations, seed data, and a singleton client. Ready to swap to PostgreSQL in production.",
  },
  {
    icon: CreditCard,
    title: "Subscription Billing",
    description:
      "4 pricing plans (Free, Starter, Pro, Business) with upgrade flow, subscription tracking, and billing management.",
  },
  {
    icon: Users,
    title: "Teams & Multi-tenancy",
    description:
      "Organizations, roles (Owner/Admin/Member), invite-by-email system, and member management.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Built-in AI chat powered by Z.ai. Ask questions, get code help, and brainstorm ideas right in your dashboard.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "In-app notification system with read/unread states, notification dropdown, and real-time activity feed.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Beautiful charts showing activity, revenue, and plan distribution. Built with Recharts and shadcn/ui.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "System-aware theme with next-themes and a toggle in the navbar. Full dark mode support everywhere.",
  },
  {
    icon: GitBranch,
    title: "Production Ready",
    description:
      "TypeScript throughout, Zod validation, rate limiting, error boundaries, and clean architecture.",
  },
];

const stats = [
  { label: "Features", value: "9+" },
  { label: "Setup Time", value: "5 min" },
  { label: "Components", value: "50+" },
  { label: "API Routes", value: "8" },
];

const faqs = [
  {
    q: "What's included in the boilerplate?",
    a: "Next.js 16, Prisma, SQLite/PostgreSQL, Auth.js, subscription billing, teams/multi-tenancy, an AI assistant, notifications, analytics dashboard, shadcn/ui, dark mode, and a blog/CMS — everything you need to launch a SaaS.",
  },
  {
    q: "How does the authentication work?",
    a: "We use NextAuth.js v4 with a credentials provider (email + password). Passwords are hashed with bcrypt. Sessions use JWT tokens. You can easily add Google OAuth or other providers by extending the auth config.",
  },
  {
    q: "Can I use this for multiple projects?",
    a: "Yes! The code is yours. Clone it, modify it, strip out what you don't need, and ship as many SaaS products as you want.",
  },
  {
    q: "Is the AI assistant customizable?",
    a: "Absolutely. The AI chat is powered by the Z.ai SDK with a configurable system prompt. You can change the assistant's personality, capabilities, and behavior in the API route.",
  },
  {
    q: "What about payments?",
    a: "The boilerplate includes a mock billing system with 4 plans. To accept real payments, integrate Stripe by adding the Stripe SDK and connecting the plan upgrade flow to Stripe Checkout.",
  },
  {
    q: "Can I switch from SQLite to PostgreSQL?",
    a: "Yes. Just update the DATABASE_URL and change the Prisma datasource provider from 'sqlite' to 'postgresql'. The schema is designed to work with both.",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Next.js 16 + Prisma + Tailwind v4 + AI
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Ship your SaaS in{" "}
              <span className="gradient-text">minutes</span>, not weeks
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              A production-ready Next.js boilerplate with auth, billing, teams,
              AI assistant, and analytics — all pre-configured and ready to
              launch.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {session ? (
                <Button size="lg" asChild>
                  <Link href="/dashboard" className="gap-2">
                    Go to Dashboard <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : (
                <AuthModal
                  trigger={
                    <Button size="lg" className="gap-2">
                      Get Started Free <ArrowRight className="size-4" />
                    </Button>
                  }
                  mode="register"
                />
              )}
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required · Free forever plan
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to launch
            </h2>
            <p className="mt-2 text-muted-foreground">
              9 production-grade features out of the box
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start free, upgrade when you grow. No hidden fees.
            </p>
          </div>
          <PricingTable />
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need to know about the boilerplate
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Testimonial / Social proof */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-primary text-primary"
                />
              ))}
            </div>
            <blockquote className="text-lg font-medium sm:text-xl">
              &ldquo;This boilerplate saved me weeks of setup. I went from idea
              to launched SaaS in a single weekend. The AI assistant is a
              game-changer.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                S
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Sarah Chen</div>
                <div className="text-xs text-muted-foreground">
                  Founder, DevFlow
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-12 text-primary-foreground">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="relative">
              <Rocket className="mx-auto size-12 mb-4" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to build your SaaS?
              </h2>
              <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">
                Stop reinventing the wheel. Start shipping today with everything
                pre-configured.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {session ? (
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/dashboard" className="gap-2">
                      Go to Dashboard <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <AuthModal
                    trigger={
                      <Button size="lg" variant="secondary" className="gap-2">
                        Get Started Free <ArrowRight className="size-4" />
                      </Button>
                    }
                    mode="register"
                  />
                )}
              </div>
              <div className="mt-4 flex justify-center gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> No credit card
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> Free forever
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
