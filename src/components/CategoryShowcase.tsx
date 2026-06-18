import Link from "next/link";
import { dishes, categories } from "@/data/dishes";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const categoryIcons: Record<string, string> = {
  "خورش": "🍲",
  "پلو و چلو": "🍚",
  "آش و سوپ": "🥣",
  "کباب": "🍢",
  "دسر و شیرینی": "🍮",
  "پیش‌غذا و میان‌وعده": "🥟",
};

const categoryGradients = [
  "from-saffron/30 to-pomegranate/30",
  "from-turquoise/30 to-pistachio/30",
  "from-plum/30 to-pomegranate/30",
  "from-pistachio/30 to-turquoise/30",
  "from-pomegranate/30 to-plum/30",
  "from-saffron/30 to-pistachio/30",
];

export function CategoryShowcase() {
  return (
    <section id="regions" className="relative bg-bg-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="دسته‌بندی غذاها"
          title="هر دسته، دروازه‌ای به یک تجربه"
          description="از خورش‌های دیرپز خانگی تا شیرینی‌های جشن؛ دسته‌بندی‌های آشپزی ایرانی را کاوش کنید."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const count = dishes.filter((d) => d.category === cat).length;
            return (
              <Reveal key={cat} delay={i * 0.07}>
                <Link
                  href={`/dishes?category=${encodeURIComponent(cat)}`}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-border-soft bg-gradient-to-br ${categoryGradients[i % categoryGradients.length]} p-6 transition-transform duration-500 hover:-translate-y-1.5`}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {categoryIcons[cat] ?? "🍽"}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{cat}</h3>
                    <p className="text-sm text-ink-soft">{count} غذای ثبت‌شده</p>
                  </div>
                  <span className="absolute left-5 text-xl text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ←
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
