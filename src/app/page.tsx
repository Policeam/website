import { Hero } from "@/components/Hero";
import { FeaturedDishes } from "@/components/FeaturedDishes";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { IranMap } from "@/components/IranMap";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <CategoryShowcase />
      <IranMap />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-saffron via-pomegranate to-plum p-10 text-center text-white shadow-warm sm:p-16">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative text-2xl font-extrabold sm:text-3xl">
              کنجکاوید بدانید سفره هر استان ایران چه طعمی دارد؟
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              با جست‌وجوی پیشرفته دانشنامه، غذاها را بر اساس استان، مواد اولیه و نوع غذا فیلتر کنید و دستور پخت
              هرکدام را کشف کنید.
            </p>
            <Link
              href="/dishes"
              className="relative mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-bold text-pomegranate shadow-lg transition-transform hover:scale-105"
            >
              شروع جست‌وجو
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
