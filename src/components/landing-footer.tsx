import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const linkGroups: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "المنتج",
    items: [
      { label: "المزايا", href: "#features" },
      { label: "كيف يعمل", href: "#how" },
      { label: "الأسعار", href: "#pricing" },
      { label: "الأسئلة الشائعة", href: "#faq" },
    ],
  },
  {
    title: "الفئات",
    items: [
      { label: "للمصممين المستقلين", href: "#audience" },
      { label: "لأصحاب المشاريع", href: "#audience" },
      { label: "للوكالات", href: "#audience" },
      { label: "بوابة العميل", href: "#features" },
    ],
  },
  {
    title: "الموارد",
    items: [
      { label: "المدونة", href: "#" },
      { label: "دليل الهوية", href: "#" },
      { label: "دعم العملاء", href: "#" },
      { label: "حالة الخدمة", href: "#" },
    ],
  },
  {
    title: "قانوني",
    items: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "شروط الاستخدام", href: "#" },
      { label: "الأمان", href: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/40 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground">
                <Image
                  src="/semah-logo.png"
                  alt="سِمَة"
                  width={22}
                  height={22}
                  className="size-5 object-contain brightness-0 invert"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-extrabold">سِمَة</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
                  SEMAH
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
              من فكرة إلى هوية تُعرَف. منصة عربية متكاملة لبناء أنظمة الهوية
              المؤسسية بالذكاء الاصطناعي — خلال دقائق.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent/50 transition-smooth"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-sm font-bold">{group.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SEMAH AI Brand Studio · صُنع للمبدعين العرب
          </p>
          <p className="text-xs text-muted-foreground">
            مبني بـ Next.js 16 · Tailwind v4 · مدعوم بالذكاء الاصطناعي
          </p>
        </div>
      </div>
    </footer>
  );
}
