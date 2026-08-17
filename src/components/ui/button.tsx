import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "brand"
  | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const variantStyles: Record<ButtonVariant, string> = {
  // Soft vertical gradient + inner highlight reads as a physical, lit surface.
  primary:
    "bg-linear-to-b from-[#3b3b44] to-ink-strong text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_-12px_rgba(13,13,17,0.75)] hover:from-[#4a4a55] hover:to-[#17171d] active:translate-y-px",
  secondary:
    "bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-hairline),0_8px_20px_-14px_rgba(18,18,32,0.5)] hover:bg-white hover:shadow-[inset_0_0_0_1px_rgba(18,18,32,0.12),0_10px_26px_-14px_rgba(18,18,32,0.55)]",
  ghost: "text-ink hover:bg-black/5",
  // The action colour on the ad landing pages. It starts at `brand-strong`
  // rather than `brand`: white on the lighter orange measures 3.4:1, which
  // fails on a button label, and these carry the whole conversion.
  brand:
    "bg-linear-to-b from-brand-strong to-[#b52f1a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_14px_30px_-14px_rgba(214,58,32,0.85)] hover:from-[#e04226] hover:to-[#a52a17] active:translate-y-px",
  whatsapp:
    "bg-linear-to-b from-whatsapp to-whatsapp-strong text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_14px_30px_-14px_rgba(23,132,63,0.85)] hover:from-[#1a9449] hover:to-[#0f5b29] active:translate-y-px",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-4 text-[13px]",
  md: "h-11 gap-2 px-5 text-[15px]",
  lg: "h-13 gap-2.5 px-7 text-base",
  // Thumb-sized. The landing pages are read one-handed on a phone, where a
  // 44px target is the floor rather than the goal.
  xl: "h-14 gap-2.5 px-8 text-[17px]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap",
    "transition-[background,box-shadow,translate,color] duration-300 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-55",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Use `<Button>` for actions. For navigation, apply `buttonStyles()` to a
 * `<Link>` so the element stays semantically correct.
 */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
