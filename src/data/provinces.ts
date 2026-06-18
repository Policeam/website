import { ProvinceId } from "./types";

export interface ProvinceInfo {
  id: ProvinceId;
  name: string;
  region: string;
  top: number;
  left: number;
  blurb: string;
}

export const provinces: Record<ProvinceId, ProvinceInfo> = {
  tehran: {
    id: "tehran",
    name: "تهران",
    region: "البرز مرکزی",
    top: 35,
    left: 54,
    blurb: "پایتخت ایران و آشپزخانه‌ای که ترکیبی از سنت‌های سراسر کشور را در خود جمع کرده است.",
  },
  gilan: {
    id: "gilan",
    name: "گیلان",
    region: "شمال، کنار دریای خزر",
    top: 19,
    left: 46,
    blurb: "سرزمین برنج و سبزیجات تازه، خاستگاه خورش‌های ترش و عطرآگین.",
  },
  mazandaran: {
    id: "mazandaran",
    name: "مازندران",
    region: "شمال، کنار دریای خزر",
    top: 20,
    left: 59,
    blurb: "جنگل‌های سرسبز و دریا، الهام‌بخش غذاهایی با ماهی، مرکبات و سبزی‌های محلی.",
  },
  "east-azerbaijan": {
    id: "east-azerbaijan",
    name: "آذربایجان شرقی",
    region: "شمال‌غرب",
    top: 16,
    left: 28,
    blurb: "تبریز، شهر کوفته‌های بزرگ و دلمه‌های خوش‌عطر، با میراثی غنی از آشپزی ترکی-ایرانی.",
  },
  kurdistan: {
    id: "kurdistan",
    name: "کردستان",
    region: "غرب",
    top: 36,
    left: 22,
    blurb: "کوهستان‌های زاگرس و سفره‌هایی سرشار از لبنیات محلی، گردو و نان‌های سنتی.",
  },
  khuzestan: {
    id: "khuzestan",
    name: "خوزستان",
    region: "جنوب‌غرب",
    top: 62,
    left: 27,
    blurb: "دیار نخل و خوزی‌های اصیل، با غذاهای تند و دریایی الهام‌گرفته از خلیج فارس.",
  },
  isfahan: {
    id: "isfahan",
    name: "اصفهان",
    region: "مرکز",
    top: 53,
    left: 49,
    blurb: "نصف جهان، شهری که هنر و آشپزی در آن با ظرافت به هم می‌رسند.",
  },
  fars: {
    id: "fars",
    name: "فارس",
    region: "جنوب مرکزی",
    top: 70,
    left: 51,
    blurb: "شیراز، شهر شعر و باغ‌های مرکبات، با عطر نارنج و گلاب در غذاهایش.",
  },
  qom: {
    id: "qom",
    name: "قم",
    region: "مرکز",
    top: 46,
    left: 54,
    blurb: "شهر زیارتی با شیرینی‌های سنتی معروف که در سفرهای ایرانی جایی ویژه دارند.",
  },
  yazd: {
    id: "yazd",
    name: "یزد",
    region: "کویر مرکزی",
    top: 60,
    left: 64,
    blurb: "شهر کویری با میراث زرتشتی، معروف به شیرینی‌های ظریف و خشکبار درجه یک.",
  },
  khorasan: {
    id: "khorasan",
    name: "خراسان رضوی",
    region: "شمال‌شرق",
    top: 33,
    left: 81,
    blurb: "مشهد، دیار زعفران و غذاهای گرم و مقوی برای زائران و مسافران.",
  },
  hormozgan: {
    id: "hormozgan",
    name: "هرمزگان",
    region: "جنوب، کنار خلیج فارس",
    top: 86,
    left: 60,
    blurb: "بندرعباس و سواحل جنوب، خاستگاه ادویه‌های تند و غذاهای دریایی رنگارنگ.",
  },
};

export const provinceList = Object.values(provinces);
