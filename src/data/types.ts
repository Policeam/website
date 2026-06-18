export type DishCategory =
  | "خورش"
  | "پلو و چلو"
  | "آش و سوپ"
  | "کباب"
  | "دسر و شیرینی"
  | "پیش‌غذا و میان‌وعده";

export type ProvinceId =
  | "tehran"
  | "gilan"
  | "east-azerbaijan"
  | "fars"
  | "khorasan"
  | "khuzestan"
  | "isfahan"
  | "qom"
  | "mazandaran"
  | "kurdistan"
  | "hormozgan"
  | "yazd";

export interface Dish {
  slug: string;
  name: string;
  shortName: string;
  category: DishCategory;
  province: ProvinceId;
  city: string;
  description: string;
  ingredients: string[];
  history: string;
  facts: string[];
  spiceLevel: 1 | 2 | 3;
  prepTime: string;
  accent: "saffron" | "pomegranate" | "turquoise" | "pistachio" | "plum";
  icon: string;
  featured?: boolean;
}
