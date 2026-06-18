"use client";

import { useState } from "react";
import Link from "next/link";
import { provinceList } from "@/data/provinces";
import { dishes } from "@/data/dishes";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function IranMap() {
  const [active, setActive] = useState(provinceList[0].id);
  const activeProvince = provinceList.find((p) => p.id === active)!;
  const dishCount = dishes.filter((d) => d.province === active).length;

  return (
    <section id="map" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="کاوش جغرافیایی"
        title="نقشه تعاملی طعم‌های ایران"
        description="روی هر منطقه کلیک کنید تا غذاهای شاخص آن ناحیه از ایران را ببینید."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="relative">
          <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] p-6 shadow-warm sm:aspect-[5/5]">
            <div className="bg-noise absolute inset-0" />
            <svg viewBox="0 0 100 100" className="relative h-full w-full">
              <defs>
                <linearGradient id="iran-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-saffron)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--color-pomegranate)" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <path
                d="M28,12 L46,10 L58,16 L72,14 L82,22 L88,30 L84,38 L90,46 L86,56 L88,66 L78,76 L72,86 L62,92 L54,84 L46,90 L38,82 L30,86 L22,76 L16,66 L20,56 L12,46 L18,36 L14,26 L22,18 Z"
                fill="url(#iran-fill)"
                stroke="var(--color-pomegranate)"
                strokeOpacity="0.35"
                strokeWidth="0.6"
              />
              {provinceList.map((p) => (
                <g key={p.id} onClick={() => setActive(p.id)} className="cursor-pointer">
                  <circle
                    cx={p.left}
                    cy={p.top}
                    r={active === p.id ? 3.4 : 2.2}
                    fill={active === p.id ? "var(--color-pomegranate)" : "var(--color-saffron)"}
                    className="transition-all duration-300"
                  />
                  {active === p.id && (
                    <circle cx={p.left} cy={p.top} r="6" fill="var(--color-pomegranate)" opacity="0.25">
                      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text
                    x={p.left}
                    y={p.top - 4}
                    textAnchor="middle"
                    fontSize="2.6"
                    className="pointer-events-none select-none"
                    fill="var(--color-ink)"
                    opacity={active === p.id ? 1 : 0.55}
                  >
                    {p.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass flex h-full flex-col rounded-[2.5rem] p-8 shadow-warm">
            <span className="text-xs font-semibold text-pomegranate">{activeProvince.region}</span>
            <h3 className="mt-2 text-2xl font-extrabold">{activeProvince.name}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{activeProvince.blurb}</p>

            <div className="mt-6 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-bg-soft px-3 py-1.5 font-semibold">{dishCount} غذای ثبت‌شده</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {dishes
                .filter((d) => d.province === active)
                .map((d) => (
                  <Link
                    key={d.slug}
                    href={`/dishes/${d.slug}`}
                    className="flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:border-saffron hover:text-pomegranate"
                  >
                    <span>{d.icon}</span>
                    {d.shortName}
                  </Link>
                ))}
              {dishCount === 0 && <p className="text-xs text-ink-soft">به‌زودی غذاهای این منطقه افزوده می‌شود.</p>}
            </div>

            <Link
              href={`/dishes?province=${active}`}
              className="mt-auto pt-8 text-sm font-bold text-pomegranate hover:underline"
            >
              مشاهده همه غذاهای {activeProvince.name} ←
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {provinceList.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              active === p.id
                ? "border-pomegranate bg-pomegranate text-white"
                : "border-border-soft text-ink-soft hover:border-saffron hover:text-ink"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </section>
  );
}
