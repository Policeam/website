"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { dishes, categories } from "@/data/dishes";
import { provinceList } from "@/data/provinces";
import { DishCard } from "@/components/DishCard";
import { Reveal } from "@/components/Reveal";
import { DishCategory, ProvinceId } from "@/data/types";

export function DishesExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DishCategory | "all">(
    (searchParams.get("category") as DishCategory) || "all"
  );
  const [province, setProvince] = useState<ProvinceId | "all">(
    (searchParams.get("province") as ProvinceId) || "all"
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
        d.city.toLowerCase().includes(q);
      const matchesCategory = category === "all" || d.category === category;
      const matchesProvince = province === "all" || d.province === province;
      return matchesQuery && matchesCategory && matchesProvince;
    });
  }, [query, category, province]);

  return (
    <div>
      <div className="glass sticky top-[68px] z-30 mb-10 rounded-3xl p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جست‌وجوی نام غذا، شهر یا مواد اولیه..."
              className="w-full rounded-2xl border border-border-soft bg-surface py-3.5 pe-11 ps-4 text-sm outline-none transition-colors focus:border-saffron"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DishCategory | "all")}
              className="rounded-xl border border-border-soft bg-surface px-4 py-2.5 text-sm outline-none focus:border-saffron"
            >
              <option value="all">همه دسته‌ها</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={province}
              onChange={(e) => setProvince(e.target.value as ProvinceId | "all")}
              className="rounded-xl border border-border-soft bg-surface px-4 py-2.5 text-sm outline-none focus:border-saffron"
            >
              <option value="all">همه استان‌ها</option>
              {provinceList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {(category !== "all" || province !== "all" || query) && (
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setProvince("all");
                }}
                className="rounded-xl border border-border-soft px-4 py-2.5 text-sm text-ink-soft hover:bg-bg-soft"
              >
                حذف فیلترها ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-soft">{filtered.length} غذا پیدا شد</p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish, i) => (
            <Reveal key={dish.slug} delay={Math.min(i * 0.05, 0.4)}>
              <DishCard dish={dish} index={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border-soft p-16 text-center text-ink-soft">
          غذایی با این مشخصات پیدا نشد. فیلترها را تغییر دهید.
        </div>
      )}
    </div>
  );
}
