import { Navbar } from "@/components/navbar";
import { LandingFooter } from "@/components/landing-footer";
import { PricingTable } from "@/components/pricing-table";
import { BrandCanvas } from "@/components/brand-canvas";
import { AskSemahChat } from "@/components/ask-semah-chat";
import { CtaButton } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  Layers,
  Palette,
  Type,
  LayoutGrid,
  BookOpen,
  ShieldCheck,
  Languages,
  Clock,
  FileText,
  MousePointerClick,
  Wand2,
  Share2,
  Star,
  Check,
  Quote,
  PenTool,
  Briefcase,
  Building2,
  Zap,
  Users2,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "استراتيجية هوية متكاملة",
    description:
      "من الـBrand Brief إلى الرؤية والرسالة والقيم والثقافة ونبرة التواصل — مولّد بالذكاء الاصطناعي وقابل للتعديل بالكامل.",
  },
  {
    icon: LayoutGrid,
    title: "ثلاثة اتجاهات مؤسسية",
    description:
      "ليس اتجاهًا واحدًا. نولّد ثلاثة اتجاهات متمايزة مع وصف كامل للألوان والخطوط والصور والأشكال لتختار الأنسب.",
  },
  {
    icon: Palette,
    title: "لوحات ألوان ذكية",
    description:
      "١١ لونًا لكل لوحة مع فحص WCAG للتباين، تصدير CSS Variables، ونسخ القيم بضغطة واحدة.",
  },
  {
    icon: Type,
    title: "خطوط عربية وإنجليزية",
    description:
      "اقتراح خطوط مرخصة مع معاينات فعلية باسم مشروعك: IBM Plex Sans Arabic، Alexandria، Manrope، والمزيد.",
  },
  {
    icon: LayoutGrid,
    title: "Mood Boards",
    description:
      "ارفع صورك المرجعية أو ولّد صورًا جديدة بالذكاء الاصطناعي، رتّبها بالسحب والإفلات، وصدّرها بجودة عالية.",
  },
  {
    icon: BookOpen,
    title: "Brand Book احترافي",
    description:
      "٢٥ قسمًا قابلًا للتخصيص: الغلاف، القصة، الألوان، الخطوط، الاستخدام الصحيح والخاطئ، Design Tokens، والمزيد.",
  },
  {
    icon: ShieldCheck,
    title: "بوابة عميل آمنة",
    description:
      "شارك المشروع برابط آمن، كلمة مرور اختيارية، صلاحيات دقيقة، تعليقات، اعتمادات، وطلبات تعديل.",
  },
  {
    icon: Languages,
    title: "عربي RTL أولًا",
    description:
      "بُنيت من الصفر للسوق العربي: واجهة RTL، خطوط عربية، تصدير PDF عربي A4، مع بنية قابلة لدعم الإنجليزية.",
  },
];

const steps = [
  {
    icon: FileText,
    title: "أنشئ مشروعًا",
    description: "عبّئ Brand Brief متعدد الخطوات مع حفظ تلقائي واستكمال لاحق.",
  },
  {
    icon: Wand2,
    title: "ولّد الاستراتيجية",
    description:
      "الذكاء الاصطناعي يحلّل مشروعك ويولّد رؤية ورسالة وقيمًا وشخصية كاملة.",
  },
  {
    icon: MousePointerClick,
    title: "اختر اتجاهًا بصريًا",
    description:
      "قارن ثلاثة اتجاهات، اختر الأنسب، ثم ولّد الألوان والخطوط والمود بورد.",
  },
  {
    icon: Share2,
    title: "صدّر وشارك",
    description:
      "Brand Book PDF عربي، Design Tokens JSON، وشارك مع العميل للاعتماد.",
  },
];

const audiences = [
  {
    icon: PenTool,
    title: "للمصممين المستقلين",
    points: [
      "تقليل وقت البحث والتقديم",
      "Mood Boards سريعة",
      "Brand Sheet جاهز للعميل",
      "بوابة مراجعة احترافية",
    ],
  },
  {
    icon: Briefcase,
    title: "لأصحاب المشاريع",
    points: [
      "فهم شخصية المشروع قبل التوظيف",
      "اختيار اتجاه بسهولة",
      "ألوان وخطوط منسجمة",
      "Brand Sheet جاهز",
    ],
  },
  {
    icon: Building2,
    title: "للوكالات",
    points: [
      "Workspaces متعددة",
      "أعضاء فريق وصلاحيات",
      "عملاء متعددون",
      "تقارير استخدام وأرشيف",
    ],
  },
];

const stats = [
  { value: "٩", label: "مزايا إنتاجية" },
  { value: "٤", label: "خطوات للهوية" },
  { value: "٢٥", label: "قسم في Brand Book" },
  { value: "دقائق", label: "بدل أسابيع" },
];

const testimonials = [
  {
    quote:
      "وفّرت عليّ أسابيع من العمل. أنتجت هوية عميل كاملة في جلسة واحدة، والعميل اعتمدها فورًا عبر بوابة المراجعة.",
    name: "ريم العتيبي",
    role: "مصممة هويات مستقلة",
  },
  {
    quote:
      "كنت محتار بين اتجاهين بصريين. سِمَة ولّدت ثلاثة اتجاهات متمايزة، وضحت لي الصورة واخترت بثقة.",
    name: "خالد المنصور",
    role: "مؤسس متجر إلكتروني",
  },
  {
    quote:
      "كمدير وكالة، Workspaces المتعددة وبوابة العميل غيّرت طريقة عملنا مع العملاء تمامًا. تنظيم وسرعة.",
    name: "نورة الشمري",
    role: "مديرة إبداعية، استوديو بصري",
  },
];

const faqs = [
  {
    q: "ما هي سِمَة؟",
    a: "سِمَة منصة عربية متكاملة لبناء أنظمة الهوية المؤسسية بالذكاء الاصطناعي — من الاستراتيجية إلى الألوان والخطوط وMood Boards وBrand Book وبوابة العميل. تحوّل أسابيع من العمل إلى دقائق.",
  },
  {
    q: "هل أحتاج خبرة في التصميم لاستخدامها؟",
    a: "لا. صُممت سِمَة للمصممين وأصحاب المشاريع والوكالات على حدٍ سواء. تكتب Brand Brief، والذكاء الاصطناعي يتولى الباقي مع إمكانية التعديل الكامل لكل عنصر.",
  },
  {
    q: "كيف تعمل بوابة العميل؟",
    a: "تشارك المشروع مع العميل برابط آمن، مع خيار كلمة مرور وصلاحيات دقيقة. يمكن للعميل التعليق، طلب تعديلات، واعتماد الإصدار النهائي — كل ذلك دون الحاجة لتسجيل حساب معقد.",
  },
  {
    q: "هل يمكنني تصدير Brand Book؟",
    a: "نعم. تصدّر Brand Book احترافيًا بصيغة PDF عربي A4 فيه ٢٥ قسمًا قابلًا للتخصيص، بالإضافة إلى Design Tokens بصيغة JSON وقيم الألوان بصيغة CSS Variables.",
  },
  {
    q: "ما الفرق بين الباقات؟",
    a: "الباقة المجانية للتجرّب (٢٥ رصيد AI، مشروع واحد). ستارتر ($١٩) للمستقلين. الاحترافية ($٤٩) تشمل Brand Book وبوابة العميل وهي الأكثر شيوعًا. الوكالة ($١٤٩) للفرق الكبيرة بمشاريع غير محدودة و١٠ أعضاء.",
  },
  {
    q: "هل تدعم اللغة الإنجليزية؟",
    a: "المنصة عربية RTL أولًا، لكن البنية قابلة لدعم الإنجليزية. الخطوط والمعاينات تدعم العربية والإنجليزية معًا، ويمكن تصدير Brand Book بكلتا اللغتين.",
  },
];

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "shadcn/ui",
  "Prisma",
  "PostgreSQL",
  "Auth.js",
  "Stripe",
  "Resend",
  "Zod 4",
  "next-themes",
  "Framer Motion",
  "Sonner",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden hero-radial">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            {/* Copy */}
            <div className="text-center lg:text-start">
              <div className="animate-fade-up">
                <Badge
                  variant="outline"
                  className="mb-5 gap-1.5 border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  مدعوم بالذكاء الاصطناعي · عربي RTL أولًا
                </Badge>
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                من فكرة إلى <br className="hidden sm:block" />
                <span className="gradient-text">هوية تُعرَف</span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                سِمَة منصة متكاملة لبناء أنظمة الهوية المؤسسية — استراتيجية
                مؤسسية، اتجاهات هوية، ألوان، خطوط، Mood Boards، شعارات، Brand
                Book، وبوابة عميل. كل ذلك خلال دقائق.
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <CtaButton size="lg" className="w-full gap-2 sm:w-auto">
                  ابدأ مجانًا
                </CtaButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href="#pricing">عرض الأسعار</a>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                لا حاجة لبطاقة ائتمان · خطة مجانية متاحة
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-4 gap-3 border-t border-border/60 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center lg:text-start">
                    <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <BrandCanvas />
            </div>
          </div>
        </section>

        {/* ===== Tech marquee ===== */}
        <section className="border-y border-border/60 bg-card/30 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              مبني بأحدث التقنيات
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max animate-marquee gap-3">
                {[...stack, ...stack].map((t, i) => (
                  <span
                    key={i}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Features ===== */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
              <Zap className="size-3" /> المزايا
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              كل ما تحتاجه لبناء هوية مؤسسية متكاملة
            </h2>
            <p className="mt-3 text-muted-foreground">
              ٨ مزايا إنتاجية جاهزة، ليست مجرد مولّد شعارات
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-5 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
              >
                <div
                  aria-hidden
                  className="absolute -end-8 -top-8 size-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </div>
                <h3 className="relative mt-4 font-display text-base font-bold">
                  {f.title}
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* Highlight banner */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-l from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-primary-foreground">
                  <Clock className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    من ساعات إلى دقائق
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    بدل أسابيع من البحث والتنسيق، احصل على نظام هوية متكامل جاهز
                    للمراجعة خلال دقائق.
                  </p>
                </div>
              </div>
              <CtaButton className="shrink-0 gap-2">
                جرّب الآن
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ===== How it works ===== */}
        <section id="how" className="border-y border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
                <MousePointerClick className="size-3" /> كيف يعمل
              </Badge>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                كيف تعمل سِمَة
              </h2>
              <p className="mt-3 text-muted-foreground">
                أربع خطوات من الفكرة إلى الهوية المعتمدة
              </p>
            </div>

            <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* connector line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent lg:block"
              />
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="relative rounded-2xl border border-border/70 bg-card/80 p-6 text-center"
                >
                  <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-lg shadow-primary/25">
                    <s.icon className="size-6" />
                    <span className="absolute -end-2 -top-2 flex size-6 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-bold text-background">
                      {["١", "٢", "٣", "٤"][i]}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Audience ===== */}
        <section id="audience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
              <Users2 className="size-3" /> الفئات
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              لمن صُممت سِمَة
            </h2>
            <p className="mt-3 text-muted-foreground">
              للمصممين وأصحاب المشاريع والوكالات
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl border border-border/70 bg-card/50 p-6 transition-smooth hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{a.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-3" />
                      </span>
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="border-y border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
                <Star className="size-3" /> آراء
              </Badge>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                يثق بها المبدعون العرب
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-border/70 bg-card/80 p-6"
                >
                  <Quote className="size-7 text-primary/40" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Pricing ===== */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
              <Sparkles className="size-3" /> الأسعار
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              أسعار بسيطة وشفافة
            </h2>
            <p className="mt-3 text-muted-foreground">
              اختر الباقة المناسبة لك. ألغِ في أي وقت.
            </p>
          </div>
          <PricingTable />
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="border-t border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-3 gap-1 border-primary/30 text-primary">
                <FileText className="size-3" /> الأسئلة الشائعة
              </Badge>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                كل ما تريد معرفته
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl border border-border/60 bg-card/60 px-5 mb-3 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="text-start text-base font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl brand-gradient p-10 text-center text-primary-foreground sm:p-16">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
                backgroundSize: "32px 32px, 44px 44px",
              }}
            />
            <div className="relative">
              <Sparkles className="mx-auto size-12" />
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                جاهز لبناء هويتك؟
              </h2>
              <p className="mx-auto mt-3 max-w-md text-primary-foreground/85">
                ابدأ الآن بمجرد إنشاء حساب. لا حاجة لبطاقة ائتمان.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CtaButton
                  variant="secondary"
                  size="lg"
                  className="w-full gap-2 sm:w-auto"
                >
                  ابدأ مجانًا
                </CtaButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                  asChild
                >
                  <a href="#pricing">عرض الأسعار</a>
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> لا بطاقة ائتمان
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> خطة مجانية متاحة
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-4" /> إلغاء في أي وقت
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      {/* Floating AI assistant */}
      <AskSemahChat />
    </div>
  );
}
