"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { dishes } from "@/data/dishes";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-saffron/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-pomegranate/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-turquoise/15 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-soft">
              ✨ دانشنامه دیجیتال آشپزی ایرانی
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] sm:text-5xl lg:text-6xl">
              سفری به اعماق
              <span className="gradient-text"> طعم‌های ایران‌زمین</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-ink-soft sm:text-lg">
              از قورمه‌سبزی خانگی تا کوفته بزرگ تبریزی؛ هر غذا روایتی از یک شهر، یک خانواده و قرن‌ها تجربه است.
              با ما همراه شوید تا تاریخ، فرهنگ و عطر غذاهای ایرانی را کشف کنید.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dishes"
                className="rounded-full bg-gradient-to-l from-saffron to-pomegranate px-7 py-3.5 text-sm font-bold text-white shadow-warm transition-transform hover:scale-105"
              >
                گشت‌وگذار در دانشنامه غذاها
              </Link>
              <Link
                href="/#map"
                className="rounded-full border border-border-soft px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-bg-soft"
              >
                کاوش روی نقشه ایران 🗺
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <Stat number={`+${dishes.length}`} label="غذای ثبت‌شده" />
              <Stat number="۱۲" label="استان و منطقه" />
              <Stat number="۶" label="دسته آشپزی" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4"
          >
            {dishes
              .filter((d) => d.featured)
              .slice(0, 4)
              .map((dish, i) => (
                <div
                  key={dish.slug}
                  className={`glass flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl p-4 text-center shadow-warm ${
                    i % 2 === 0 ? "animate-float-slow" : "animate-float-slower"
                  }`}
                >
                  <span className="text-4xl">{dish.icon}</span>
                  <span className="text-sm font-bold">{dish.shortName}</span>
                  <span className="text-[11px] text-ink-soft">{dish.city}</span>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-pomegranate">{number}</div>
      <div className="text-xs text-ink-soft">{label}</div>
    </div>
  );
}
