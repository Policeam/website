import Link from "next/link";
import { Dish } from "@/data/types";
import { provinces } from "@/data/provinces";
import { DishVisual } from "./DishVisual";

export function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  return (
    <Link
      href={`/dishes/${dish.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-surface shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-warm"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <DishVisual dish={dish} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {dish.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-pomegranate">{dish.name}</h3>
          <span className="shrink-0 rounded-full border border-border-soft px-2.5 py-1 text-[11px] text-ink-soft">
            {provinces[dish.province].name}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-ink-soft">{dish.description}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-ink-soft">
          <span>⏱ {dish.prepTime}</span>
          <span className="h-1 w-1 rounded-full bg-ink-soft/40" />
          <span>{dish.city}</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-saffron/60" />
    </Link>
  );
}
