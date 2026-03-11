/**
 * @file button.tsx
 * @description Botón simplificado y fácil de integrar
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-origen-pradera/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "w-full sm:w-auto"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-origen-bosque text-white",
          "hover:bg-origen-pino",
          "border border-origen-pino"
        ),
        secondary: cn(
          "bg-origen-pradera text-origen-oscuro",
          "hover:bg-origen-hoja",
          "border border-origen-hoja"
        ),
        outline: cn(
          "bg-transparent text-origen-bosque",
          "border-2 border-origen-bosque",
          "hover:bg-origen-crema hover:border-origen-pradera"
        ),
        ghost: cn(
          "bg-transparent text-origen-bosque",
          "hover:bg-origen-crema"
        ),
        destructive: cn(
          "bg-red-600 text-white",
          "hover:bg-red-700",
          "border border-red-500"
        ),
      },
      
      size: {
        sm: "h-9 px-4 text-sm gap-2 rounded-lg",
        md: "h-10 px-5 text-sm gap-2.5 rounded-xl",
        lg: "h-11 px-6 text-base gap-3 rounded-xl",
        icon: "h-10 w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 p-0 rounded-lg", // ← AÑADIDO: tamaño para icono pequeño
      },
    },
    
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      loadingText = "Cargando...",
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        type={type}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };