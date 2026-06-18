import Link from "next/link";
import { provinceList } from "@/data/provinces";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border-soft bg-bg-soft">
      <div className="bg-noise absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-pomegranate text-xl">
                🍇
              </span>
              <span className="text-lg font-extrabold">
                <span className="gradient-text">طعم</span> ایران
              </span>
            </div>
            <p className="text-sm leading-7 text-ink-soft">
              دانشنامه دیجیتال آشپزی ایرانی؛ سفری در طعم، تاریخ و فرهنگ غذاهای سرزمین ایران از خزر تا خلیج فارس.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/" className="hover:text-saffron">خانه</Link></li>
              <li><Link href="/dishes" className="hover:text-saffron">دانشنامه غذاها</Link></li>
              <li><Link href="/#map" className="hover:text-saffron">نقشه تعاملی ایران</Link></li>
              <li><Link href="/#regions" className="hover:text-saffron">مناطق و استان‌ها</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">مناطق پرطرفدار</h4>
            <ul className="space-y-2 text-sm text-ink-soft">
              {provinceList.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link href={`/dishes?province=${p.id}`} className="hover:text-saffron">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">درباره پروژه</h4>
            <p className="text-sm leading-7 text-ink-soft">
              این وب‌سایت با عشق به فرهنگ و آشپزی ایرانی ساخته شده تا میراث طعم‌های سرزمین‌مان را زنده نگه دارد.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border-soft pt-6 text-xs text-ink-soft sm:flex-row">
          <p>© تمامی حقوق برای طعم ایران محفوظ است.</p>
          <p>ساخته‌شده با ❤️ برای دوستداران آشپزی ایرانی</p>
        </div>
      </div>
    </footer>
  );
}
