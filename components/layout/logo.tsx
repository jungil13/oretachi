import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "inverted" | "hero";
};

export function Logo({ className, variant = "default" }: LogoProps) {
  const isHero = variant === "hero";

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          isHero ? "h-24 w-40" : "h-12 w-24"
        )}
        aria-hidden
      >
        <Image
          src="/logo.png"
          alt="Oretachi no Curry-ya Logo"
          fill
          className="object-contain p-1"
          priority
        />
      </div>
    </div>
  );
}