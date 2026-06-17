import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-curry-yellow text-deep-black hover:bg-soft-gold shadow-lg shadow-curry-yellow/20",
        secondary:
          "bg-deep-black text-pure-white hover:bg-deep-black/80 dark:bg-pure-white dark:text-deep-black",
        outline:
          "border-2 border-deep-black/20 bg-transparent hover:bg-deep-black hover:text-pure-white dark:border-pure-white/20 dark:hover:bg-pure-white dark:hover:text-deep-black",
        ghost: "hover:bg-muted",
        glass: "glass text-pure-white hover:bg-white/20",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
