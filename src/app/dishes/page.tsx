import { Suspense } from "react";
import type { Metadata } from "next";
import { DishesExplorer } from "./DishesExplorer";

export const metadata: Metadata = {
  title: "دانشنامه غذاهای ایرانی",
  description: "جست‌وجو و فیلتر غذاهای سنتی ایرانی بر اساس استان، دسته و مواد اولیه.",
};

export default function DishesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-bg-soft px-4 py-1.5 text-xs font-semibold text-pomegranate">
          دانشنامه کامل
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">همه غذاهای سنتی ایران</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
          از خورش‌های خانگی تا شیرینی‌های جشن؛ غذای موردنظرتان را با جست‌وجو یا فیلتر استان و دسته پیدا کنید.
        </p>
      </div>
      <Suspense fallback={null}>
        <DishesExplorer />
      </Suspense>
    </div>
  );
}
