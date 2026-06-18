import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "right";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 rounded-full bg-bg-soft px-4 py-1.5 text-xs font-semibold text-pomegranate">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-ink-soft">{description}</p>}
    </Reveal>
  );
}
