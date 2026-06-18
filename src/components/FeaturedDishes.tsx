import { dishes } from "@/data/dishes";
import { DishCard } from "./DishCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import Link from "next/link";

export function FeaturedDishes() {
  const featured = dishes.filter((d) => d.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="منتخب سرآشپزها"
        title="غذاهای شاخص ایران"
        description="گزیده‌ای از معروف‌ترین و محبوب‌ترین غذاهای ایرانی که هرکدام داستانی منحصربه‌فرد از یک منطقه دارند."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((dish, i) => (
          <Reveal key={dish.slug} delay={i * 0.08}>
            <DishCard dish={dish} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center" delay={0.2}>
        <Link
          href="/dishes"
          className="rounded-full border border-border-soft px-8 py-3.5 text-sm font-bold transition-colors hover:bg-bg-soft"
        >
          مشاهده همه غذاها ←
        </Link>
      </Reveal>
    </section>
  );
}
