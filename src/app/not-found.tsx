import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
      <span className="text-6xl">🍽️</span>
      <h1 className="mt-6 text-3xl font-extrabold">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
      <p className="mt-4 text-ink-soft">شاید این غذا هنوز به دانشنامه ما اضافه نشده باشد!</p>
      <Link
        href="/dishes"
        className="mt-8 rounded-full bg-gradient-to-l from-saffron to-pomegranate px-8 py-3.5 text-sm font-bold text-white shadow-warm"
      >
        بازگشت به دانشنامه غذاها
      </Link>
    </div>
  );
}
