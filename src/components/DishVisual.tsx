import { Dish } from "@/data/types";

const accentMap: Record<Dish["accent"], { from: string; to: string; glow: string }> = {
  saffron: { from: "#f3c969", to: "#b3273e", glow: "#e8a93b" },
  pomegranate: { from: "#e0445f", to: "#6b3a52", glow: "#b3273e" },
  turquoise: { from: "#4fd1c5", to: "#0fa3a3", glow: "#0fa3a3" },
  pistachio: { from: "#a8c686", to: "#3f5a2e", glow: "#7a9b57" },
  plum: { from: "#9a5f7d", to: "#3a1f30", glow: "#6b3a52" },
};

interface DishVisualProps {
  dish: Pick<Dish, "icon" | "accent" | "name">;
  className?: string;
  size?: "sm" | "lg";
}

export function DishVisual({ dish, className = "", size = "sm" }: DishVisualProps) {
  const colors = accentMap[dish.accent];
  const gradId = `grad-${dish.accent}-${size}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <radialGradient id={`${gradId}-glow`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={colors.glow} stopOpacity="0.55" />
            <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gradId})`} />
        <rect width="400" height="300" fill={`url(#${gradId}-glow)`} />
        <circle cx="60" cy="240" r="120" fill="white" opacity="0.06" />
        <circle cx="350" cy="40" r="90" fill="white" opacity="0.08" />
        <g opacity="0.18">
          <circle cx="200" cy="150" r="95" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="70" fill="none" stroke="white" strokeWidth="1" />
        </g>
      </svg>
      <div className="relative flex h-full w-full items-center justify-center">
        <span
          className={size === "lg" ? "text-7xl drop-shadow-lg sm:text-8xl" : "text-4xl drop-shadow-lg sm:text-5xl"}
          role="img"
          aria-label={dish.name}
        >
          {dish.icon}
        </span>
      </div>
    </div>
  );
}
