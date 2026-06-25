# سِمَة — SEMAH AI Brand Studio

> استوديو الهوية المؤسسية بالذكاء الاصطناعي، عربي أولًا.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## نظرة عامة

**سِمَة** منصة سحابية (SaaS) عربية-first تساعد المصممين والمؤسسات على بناء أنظمة هوية بصرية متكاملة في دقائق بدلًا من أسابيع. تجمع المنصة بين قوة الذكاء الاصطناعي وواجهة مستخدم عربية RTL مصممة بعناية لتقديم تجربة احترافية لا مثيل لها في السوق العربي.

تنطلق المنصة من **Brand Brief** بسيط يكتبه المستخدم، ثم تولّد استراتيجية هوية كاملة (الرؤية، الرسالة، القيم، الثقافة، نبرة التواصل)، تليها **ثلاثة اتجاهات بصرية متمايزة** بدلًا من اتجاه واحد — كل اتجاه مشروح بألوانه وخطوطه وصوره وأشكاله. ثم يبني المستخدم لوحات ألوان ذكية مع فحص WCAG للتباين، ينتقي خطوطًا عربية وإنجليزية مرخصة مع معاينات حقيقية، يرتّب **Mood Boards** بالسحب والإفلات، ويصدّر **Brand Book** احترافيًا من ٢٥ قسمًا.

أخيرًا تتيح **بوابة العميل الآمنة** مشاركة المشروع برابط محمي وكلمة مرور اختيارية وصلاحيات دقيقة وتعليقات واعتمادات — كل ذلك بواجهة عربية RTL بُنيت من الصفر، مع بنية قابلة لدعم الإنجليزية لاحقًا.

---

## المميزات

| # | الميزة | الوصف |
|---|--------|-------|
| 1 | **استراتيجية هوية متكاملة** | من الـBrand Brief إلى الرؤية والرسالة والقيم والثقافة ونبرة التواصل — مولّد بالذكاء الاصطناعي وقابل للتعديل بالكامل. |
| 2 | **ثلاثة اتجاهات مؤسسية** | ليس اتجاهًا واحدًا. نولّد ثلاثة اتجاهات متمايزة مع وصف كامل للألوان والخطوط والصور والأشكال لتختار الأنسب. |
| 3 | **لوحات ألوان ذكية** | ١١ لونًا لكل لوحة مع فحص WCAG للتباين، تصدير CSS Variables، ونسخ القيم بضغطة واحدة. |
| 4 | **خطوط عربية وإنجليزية** | اقتراح خطوط مرخصة مع معاينات فعلية باسم مشروعك: IBM Plex Sans Arabic، Alexandria، Manrope، والمزيد. |
| 5 | **Mood Boards** | ارفع صورك المرجعية أو ولّد صورًا جديدة بالذكاء الاصطناعي، رتّبها بالسحب والإفلات، وصدّرها بجودة عالية. |
| 6 | **Brand Book احترافي** | ٢٥ قسمًا قابلًا للتخصيص: الغلاف، القصة، الألوان، الخطوط، الاستخدام الصحيح والخاطئ، Design Tokens، والمزيد. |
| 7 | **بوابة عميل آمنة** | شارك المشروع برابط آمن، كلمة مرور اختيارية، صلاحيات دقيقة، تعليقات، اعتمادات، وطلبات تعديل. |
| 8 | **عربي RTL أولًا** | بُنيت من الصفر للسوق العربي: واجهة RTL، خطوط عربية، تصدير PDF عربي A4، مع بنية قابلة لدعم الإنجليزية. |

### تدفق العمل في أربع خطوات

1. **أنشئ مشروعًا** — ابدأ بـBrand Brief موجز.
2. **ولّد الاستراتيجية** — الرؤية، الرسالة، القيم، النبرة.
3. **اختر اتجاهًا بصريًا** — ثلاثة اتجاهات متمايزة.
4. **صدّر وشارك** — Brand Book + بوابة عميل.

---

## التقنيات المستخدمة

| الطبقة | التقنية |
|--------|---------|
| إطار العمل | Next.js 16 (App Router, Turbopack) |
| اللغة | TypeScript 5 |
| التنسيق | Tailwind CSS v4 |
| مكتبات الواجهة | shadcn/ui (Radix UI) + Lucide Icons |
| ORM | Prisma 6 |
| قاعدة البيانات (محلي) | SQLite |
| قاعدة البيانات (إنتاج) | PostgreSQL |
| المصادقة | NextAuth.js v4 (Auth.js) + bcryptjs |
| الذكاء الاصطناعي | z-ai-web-dev-sdk |
| الحركات | Framer Motion |
| الـMarkdown | react-markdown |
| إدارة الحالة | Zustand + TanStack Query |
| الجداول | TanStack Table |
| مدير الحزم | Bun |
| النشر | Railway (Nixpacks) أو Docker |

---

## البدء السريع

### المتطلبات

- [Node.js](https://nodejs.org/) 22 أو أحدث
- [Bun](https://bun.sh/) 1.x
- محرر أكواد (يُفضّل VS Code)

### خطوات الإعداد

```bash
# 1. استنساخ المستودع
git clone <repo-url> semah
cd semah

# 2. تثبيت التبعيات
bun install

# 3. إعداد متغيرات البيئة
cp .env.example .env
# ثم عدّل ملف .env وضع قيمك (AUTH_SECRET على الأقل)

# 4. توليد عميل Prisma وإنشاء قاعدة البيانات
bun run db:generate
bun run db:push

# 5. تشغيل خادم التطوير
bun run dev
```

افتح المتصفح على <http://localhost:3000>.

---

## أوامر NPM

| الأمر | الوصف |
|------|-------|
| `bun run dev` | تشغيل خادم التطوير على المنفذ 3000 (مع سجل في `dev.log`). |
| `bun run build` | بناء إنتاجي مع حزم `.next/standalone` ونسخ `static` و`public` إليها. |
| `bun run start` | تشغيل الخادم الإنتاجي من `.next/standalone/server.js` عبر Bun. |
| `bun run lint` | فحص الكود عبر ESLint. |
| `bun run db:push` | دفع مخطط Prisma إلى قاعدة البيانات (يحذف/يضيف الأعمدة مباشرة). |
| `bun run db:generate` | توليد عميل Prisma (`@prisma/client`). |
| `bun run db:migrate` | إنشاء وتطبيق ترحيل (migration) جديد أثناء التطوير. |
| `bun run db:reset` | إعادة ضبط قاعدة البيانات وحذف جميع البيانات (تطبيق كل الترحيلات). |

---

## متغيرات البيئة

انسخ `.env.example` إلى `.env` واملأ القيم. انظر [`.env.example`](./.env.example) للقائمة الكاملة مع التعليقات.

| المتغير | مطلوب | الوصف |
|---------|------|-------|
| `DATABASE_URL` | نعم | رابط قاعدة البيانات (SQLite محليًا، PostgreSQL في الإنتاج). |
| `AUTH_SECRET` | نعم | سر تشفير جلسات NextAuth. ولّده بـ `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | نعم | عنوان التطبيق الأساسي (مثل `http://localhost:3000`). |
| `GOOGLE_CLIENT_ID` | لا | معرّف عميل Google OAuth (للتسجيل بـ Google). |
| `GOOGLE_CLIENT_SECRET` | لا | سر عميل Google OAuth. |
| `ZAI_API_KEY` | لا | مفتاح z-ai-web-dev-sdk (يُقرأ تلقائيًا من البيئة في الغالب). |
| `STRIPE_SECRET_KEY` | لا (مستقبلي) | مفتاح Stripe السري لتفعيل الفوترة. |
| `STRIPE_WEBHOOK_SECRET` | لا (مستقبلي) | سر webhook من Stripe. |
| `STRIPE_PRICE_STARTER` / `STRIPE_PRICE_PRO` / `STRIPE_PRICE_BUSINESS` | لا (مستقبلي) | معرّفات أسعار الباقات في Stripe. |
| `RESEND_API_KEY` | لا (مستقبلي) | مفتاح Resend لإرسال البريد. |
| `FROM_EMAIL` | لا (مستقبلي) | عنوان البريد المُرسِل. |
| `NODE_ENV` | نعم | `development` / `production`. |
| `NEXT_PUBLIC_APP_URL` | نعم | عنوان التطبيق العلني (لروابط العميل). |

> **تنبيه:** لا تضع أي قيم سرية حقيقية في `.env.example` — هذا الملف للتوثيق فقط ويُرفع إلى Git.

---

## بنية المشروع

```
.
├── public/                       # الأصول الثابتة (شعار، صورة OG، robots.txt)
├── prisma/
│   └── schema.prisma             # مخطط قاعدة البيانات (User, Org, Subscription, ...)
├── src/
│   ├── app/
│   │   ├── api/                  # مسارات API
│   │   │   ├── ai/chat/          # المساعد الذكي العام "اسأل سِمَة"
│   │   │   ├── auth/[...nextauth]/ # مصادقة NextAuth
│   │   │   ├── billing/          # نقطة نهاية الفوترة (مستقبلية)
│   │   │   ├── blog/             # نقطة نهاية المدونة
│   │   │   ├── notifications/    # إشعارات المستخدم
│   │   │   ├── onboarding/       # إعداد أول مرة
│   │   │   ├── organizations/    # الفرق والمؤسسات
│   │   │   └── analytics/        # التحليلات
│   │   ├── globals.css           # Tailwind v4 + خطوط عربية + أدوات RTL
│   │   ├── layout.tsx            # تخطيط جذر RTL (lang=ar dir=rtl)
│   │   └── page.tsx              # الصفحة الرئيسية العربية
│   ├── components/
│   │   ├── ui/                   # عناصر shadcn/ui الأساسية
│   │   ├── navbar.tsx            # شريط التنقل العلوي اللاصق
│   │   ├── landing-footer.tsx    # تذييل الصفحة
│   │   ├── brand-canvas.tsx      # لوحة هوية متحركة (Hero)
│   │   ├── ask-semah-chat.tsx    # المساعد الذكي العائم
│   │   ├── pricing-table.tsx     # جدول الباقات
│   │   ├── cta-button.tsx        # زر CTA (client wrapper)
│   │   ├── theme-toggle.tsx      # مبدّل الوضع الليلي/النهاري
│   │   └── providers.tsx         # موفرو next-themes + SessionProvider
│   ├── hooks/
│   │   ├── use-mobile.ts         # كشف حجم الشاشة
│   │   └── use-toast.ts          # إدارة الإشعارات
│   ├── lib/
│   │   ├── auth.ts               # إعداد NextAuth
│   │   ├── db.ts                 # عميل Prisma
│   │   ├── plans.ts              # تعريف الباقات والأسعار
│   │   └── utils.ts              # دالة cn() وأدوات مساعدة
│   └── types/
│       └── next-auth.d.ts        # تعريفات أنواع NextAuth
├── db/                           # ملفات SQLite (متجاهلة في Git)
├── next.config.ts                # إعداد Next.js (output: standalone)
├── tailwind.config.ts            # إعداد Tailwind v4
├── tsconfig.json                 # إعداد TypeScript
├── postcss.config.mjs            # إعداد PostCSS
├── eslint.config.mjs             # إعداد ESLint
├── components.json               # إعداد shadcn/ui
├── package.json
├── railway.toml                  # إعداد النشر على Railway (Nixpacks)
├── Dockerfile                    # بديل Docker متعدد المراحل
└── .env.example                  # قالب متغيرات البيئة (موثّق)
```

---

## النشر

### الخيار 1: Railway (موصى به)

المشروع مهيّأ للنشر على [Railway](https://railway.app/) عبر Nixpacks باستخدام ملف [`railway.toml`](./railway.toml).

**الخطوات:**

1. أنشئ مشروعًا جديدًا على Railway واربطه بمستودع GitHub.
2. أضف قاعدة بيانات PostgreSQL من Railway (Plugin → PostgreSQL).
3. في تبويب **Variables**، أضف المتغيرات التالية:

   | المتغير | القيمة |
   |---------|-------|
   | `DATABASE_URL` | رابط PostgreSQL الذي يوفره Railway. |
   | `AUTH_SECRET` | `openssl rand -base64 32`. |
   | `NEXTAUTH_URL` | عنوان تطبيقك على Railway (مثل `https://semah-production.up.railway.app`). |
   | `NEXT_PUBLIC_APP_URL` | نفس القيمة أعلاه. |
   | `NODE_ENV` | `production`. |
   | `ZAI_API_KEY` | مفتاح z-ai-web-dev-sdk. |

4. سيقوم Railway تلقائيًا بتشغيل:
   - `bun install --frozen-lockfile`
   - `bun run db:generate`
   - `bun run build`
5. يبدأ الخادم بـ `bun run start` على المنفذ 3000.
6. **فحص الصحة (Healthcheck):** يعتمد Railway على `GET /api/auth/session` مع مهلة 60 ثانية.
7. سياسة إعادة التشغيل: `ON_FAILURE` بحد أقصى 3 محاولات.

> **ملاحظة:** يجب تطبيق الترحيلات على PostgreSQL في الإنتاج. يمكنك إضافة `bun run db:push` إلى `startCommand` مؤقتًا أو تشغيله يدويًا عبر Railway Shell.

### الخيار 2: Docker (بديل مستقل)

يوفّر [`Dockerfile`](./Dockerfile) بناءً متعدد المراحل يعتمد على `oven/bun:1` للبناء و`node:22-alpine` للتشغيل، بإخراج standalone خفيف.

```bash
# بناء الصورة
docker build -t semah .

# تشغيل الحاوية
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="..." \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXT_PUBLIC_APP_URL="http://localhost:3000" \
  -e NODE_ENV="production" \
  semah
```

يعمل الخادم داخل الحاوية بـ `node server.js` على المنفذ 3000.

---

## خارطة الطريق

- [ ] **تكامل Stripe للفوترة** — ربط الباقات (مجاني/ستارتر/احترافي/وكالة) بـ Stripe Checkout وWebhooks.
- [ ] **تسجيل الدخول بـ Google OAuth** — إضافة مزود Google إلى NextAuth.
- [ ] **الترحيل الكامل إلى PostgreSQL** — توحيد المخطط على PostgreSQL محليًا وإنتاجيًا.
- [ ] **دعم الإنجليزية (LTR)** — تفعيل `next-intl` لتبديل اللغة عربي/إنجليزي.
- [ ] **تصدير Brand Book كـ PDF** — توليد PDF عربي A4 عالي الجودة.
- [ ] **توليد الصور بالذكاء الاصطناعي** داخل Mood Boards.
- [ ] **التعاون الفوري (Real-time)** على بوابة العميل.
- [ ] **تكامل Resend** للبريد التحيلي والإشعارات.

---

## الرخصة

هذا المشروع مرخّص تحت رخصة **MIT**. انظر ملف [`LICENSE`](./LICENSE) للتفاصيل.

```
MIT License

Copyright (c) 2026 SEMAH AI Brand Studio

... (النص الكامل في ملف LICENSE)
```
