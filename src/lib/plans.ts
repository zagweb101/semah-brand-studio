export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  credits: string;
  interval: "شهر";
  features: string[];
  highlight?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "مجاني",
    description: "مثالي لتجربة سِمَة",
    price: 0,
    credits: "٢٥ رصيد AI شهريًا",
    interval: "شهر",
    features: [
      "مشروع واحد",
      "Brand Brief كامل",
      "استراتيجية مختصرة",
      "اتجاه بصري واحد",
      "تصدير بعلامة مائية",
    ],
    cta: "ابدأ مجانًا",
  },
  {
    id: "starter",
    name: "ستارتر",
    description: "للمستقلين والمشاريع الصغيرة",
    price: 19,
    credits: "١٠٠ رصيد AI شهريًا",
    interval: "شهر",
    features: [
      "٥ مشاريع",
      "استراتيجية علامة كاملة",
      "٣ اتجاهات مؤسسية",
      "لوحات ألوان ونظام خطوط",
      "Mood Boards ومفاهيم شعار",
      "Brand Sheet",
    ],
    cta: "اشترك الآن",
  },
  {
    id: "pro",
    name: "احترافي",
    description: "للمصممين المحترفين",
    price: 49,
    credits: "٥٠٠ رصيد AI شهريًا",
    interval: "شهر",
    features: [
      "٢٠ مشروعًا",
      "كل مزايا ستارتر",
      "Brand Book احترافي",
      "بوابة العميل",
      "سجل الإصدارات وDesign Tokens",
      "تصدير عالي الدقة",
      "٣ أعضاء فريق",
    ],
    highlight: true,
    cta: "اشترك الآن",
  },
  {
    id: "agency",
    name: "وكالة",
    description: "للوكالات والفرق",
    price: 149,
    credits: "٢٠٠٠ رصيد AI شهريًا",
    interval: "شهر",
    features: [
      "مشاريع غير محدودة",
      "كل مزايا الاحترافي",
      "١٠ أعضاء فريق",
      "روابط مشاركة غير محدودة",
      "صلاحيات متقدمة وتقارير الاستخدام",
      "مساحة تخزين أكبر ودعم أولوية",
    ],
    cta: "اشترك الآن",
  },
];

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
