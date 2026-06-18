import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "@/data/dishes";
import { provinces } from "@/data/provinces";
import { DishVisual } from "@/components/DishVisual";
import { DishCard } from "@/components/DishCard";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = dishes.find((d) => d.slug === slug);
  if (!dish) return {};
  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | طعم ایران`,
      description: dish.description,
    },
  };
}

export default async function DishPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dish = dishes.find((d) => d.slug === slug);
  if (!dish) notFound();

  const province = provinces[dish.province];
  const related = dishes.filter((d) => d.slug !== dish.slug && d.province === dish.province).slice(0, 3);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink-soft">
        <Link href="/" className="hover:text-saffron">خانه</Link>
        <span>/</span>
        <Link href="/dishes" className="hover:text-saffron">دانشنامه غذاها</Link>
        <span>/</span>
        <span className="text-ink">{dish.name}</span>
      </nav>

      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] shadow-warm">
          <DishVisual dish={dish} size="lg" className="h-64 w-full sm:h-80" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-10">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {dish.category}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{dish.name}</h1>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          <Reveal>
            <section>
              <h2 className="text-xl font-bold">معرفی</h2>
              <p className="mt-3 text-base leading-8 text-ink-soft">{dish.description}</p>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section>
              <h2 className="text-xl font-bold">تاریخچه و پیشینه فرهنگی</h2>
              <p className="mt-3 text-base leading-8 text-ink-soft">{dish.history}</p>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section>
              <h2 className="text-xl font-bold">نکات خواندنی</h2>
              <ul className="mt-4 space-y-3">
                {dish.facts.map((fact, i) => (
                  <li key={i} className="flex gap-3 rounded-2xl bg-bg-soft p-4 text-sm leading-7 text-ink-soft">
                    <span className="text-lg">✨</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <div className="glass rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold">اطلاعات کلی</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="استان/منطقه" value={`${province.name} (${dish.city})`} />
                <Row label="زمان آماده‌سازی" value={dish.prepTime} />
                <Row label="سطح تندی" value={"🌶️".repeat(dish.spiceLevel) || "بدون تندی"} />
                <Row label="دسته‌بندی" value={dish.category} />
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold">مواد اولیه اصلی</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {dish.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full border border-border-soft bg-surface px-3 py-1.5 text-xs"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href={`/dishes?province=${dish.province}`}
              className="block rounded-3xl bg-gradient-to-l from-saffron to-pomegranate p-6 text-center text-sm font-bold text-white shadow-warm transition-transform hover:scale-[1.02]"
            >
              مشاهده همه غذاهای {province.name} ←
            </Link>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">سایر غذاهای {province.name}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.08}>
                <DishCard dish={d} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft pb-2 last:border-none last:pb-0">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
