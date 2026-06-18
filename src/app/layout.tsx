import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://taame-iran.example.com"),
  title: {
    default: "طعم ایران | دانشنامه آشپزی و غذاهای سنتی ایرانی",
    template: "%s | طعم ایران",
  },
  description:
    "دانشنامه دیجیتال آشپزی ایرانی با معرفی کامل غذاهای سنتی، تاریخ، فرهنگ و مواد اولیه هر استان؛ به همراه نقشه تعاملی و جست‌وجوی پیشرفته.",
  keywords: [
    "غذای ایرانی",
    "آشپزی ایرانی",
    "غذاهای سنتی ایران",
    "قورمه سبزی",
    "چلو کباب",
    "فسنجان",
    "دانشنامه غذا",
  ],
  authors: [{ name: "طعم ایران" }],
  openGraph: {
    title: "طعم ایران | دانشنامه آشپزی و غذاهای سنتی ایرانی",
    description: "سفری در طعم، تاریخ و فرهنگ غذاهای سرزمین ایران از خزر تا خلیج فارس.",
    locale: "fa_IR",
    type: "website",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('iranfood-theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
