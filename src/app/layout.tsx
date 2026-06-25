import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const ibm = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://semah-production.up.railway.app"),
  title: "سِمَة — SEMAH AI Brand Studio | استوديو الهوية بالذكاء الاصطناعي",
  description:
    "سِمَة منصة عربية متكاملة لبناء أنظمة الهوية المؤسسية بالذكاء الاصطناعي: استراتيجية، اتجاهات بصرية، ألوان، خطوط، Mood Boards، Brand Book، وبوابة عميل — خلال دقائق.",
  keywords: [
    "سِمَة",
    "SEMAH",
    "هوية مؤسسية",
    "brand identity",
    "ذكاء اصطناعي",
    "Brand Book",
    "ألوان",
    "خطوط عربية",
    "mood board",
    "استوديو هوية",
  ],
  authors: [{ name: "SEMAH AI Brand Studio" }],
  openGraph: {
    title: "سِمَة — SEMAH AI Brand Studio",
    description:
      "من فكرة إلى هوية تُعرَف. منصة عربية متكاملة لبناء أنظمة الهوية المؤسسية بالذكاء الاصطناعي.",
    type: "website",
    locale: "ar_SA",
    images: [{ url: "/semah-og.png", width: 1344, height: 768, alt: "سِمَة SEMAH AI Brand Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "سِمَة — SEMAH AI Brand Studio",
    description: "من فكرة إلى هوية تُعرَف. استوديو الهوية بالذكاء الاصطناعي.",
    images: ["/semah-og.png"],
  },
  icons: {
    icon: [{ url: "/semah-logo.png", type: "image/png" }],
    apple: [{ url: "/semah-logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${ibm.variable} ${cairo.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
