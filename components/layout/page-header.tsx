import { FadeUp } from "@/components/animations/motion";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  centered = true,
}: PageHeaderProps) {
  return (
    <FadeUp className={cn("mb-10 md:mb-12", centered && "text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-medium tracking-widest text-soft-gold uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </FadeUp>
  );
}
