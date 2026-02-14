/**
 * @file button.tsx
 * @description Componente de botón accesible del sistema de diseño
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-xl font-semibold transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "relative overflow-hidden group"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-gradient-to-br from-origen-bosque to-origen-pino text-white",
          "hover:from-origen-pino hover:to-origen-hoja",
          "shadow-md hover:shadow-lg shadow-origen-bosque/15"
        ),
        secondary: cn(
          "bg-gradient-to-br from-origen-crema to-white text-origen-oscuro",
          "border border-origen-pradera/50",
          "hover:bg-origen-pastel/50 hover:border-origen-hoja/70 hover:text-origen-bosque",
          "shadow-sm hover:shadow-md"
        ),
        accent: cn(
          "bg-gradient-to-br from-origen-pradera to-origen-hoja text-white",
          "hover:from-origen-hoja hover:to-origen-pradera/90",
          "shadow-md hover:shadow-lg shadow-origen-pradera/20"
        ),
        outline: cn(
          "bg-transparent text-origen-bosque border-2 border-origen-bosque",
          "hover:bg-origen-crema/50 hover:border-origen-hoja",
          "active:bg-origen-pastel"
        ),
        ghost: cn(
          "bg-transparent text-origen-bosque",
          "hover:bg-origen-crema/50 hover:text-origen-pino",
          "active:bg-origen-pastel"
        ),
        success: cn(
          "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
          "hover:from-emerald-600 hover:to-green-500",
          "shadow-md hover:shadow-lg shadow-green-500/15"
        ),
        destructive: cn(
          "bg-gradient-to-br from-red-500 to-rose-600 text-white",
          "hover:from-rose-600 hover:to-red-500",
          "shadow-md hover:shadow-lg shadow-red-500/15"
        ),
      },
      size: {
        xs: "h-7 px-2.5 text-xs gap-1.5 rounded-lg",
        sm: "h-9 px-4 text-sm gap-2 rounded-xl",
        md: "h-11 px-5 text-base gap-2.5 rounded-xl",
        lg: "h-13 px-6 text-lg gap-3 rounded-2xl",
        xl: "h-15 px-8 text-xl gap-4 rounded-2xl",
        icon: "h-10 w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

export type ButtonProps = {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showSuccess?: boolean;
  pulse?: boolean;
  successIcon?: React.ReactNode;
} & VariantProps<typeof buttonVariants> & 
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      showSuccess = false,
      pulse = false,
      successIcon = <Check className="h-4 w-4" />,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    
    React.useEffect(() => {
      if (showSuccess && !loading) {
        setIsSuccess(true);
        const timer = setTimeout(() => setIsSuccess(false), 2000);
        return () => clearTimeout(timer);
      }
    }, [showSuccess, loading]);

    const getContent = () => {
      if (loading) {
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Procesando...</span>
          </>
        );
      }
      
      if (isSuccess) {
        return (
          <>
            {successIcon}
            <span>¡Completado!</span>
          </>
        );
      }
      
      return (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      );
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          pulse && "animate-origen-pulse",
          isSuccess && "pointer-events-none"
        )}
        ref={ref}
        disabled={disabled || loading || isSuccess}
        aria-busy={loading}
        data-success={isSuccess}
        data-pulse={pulse}
        type={type}
        {...props}
      >
        {(variant === "accent" || variant === "default" || variant === "success" || variant === "destructive") && (
          <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-0 -translate-x-full animate-origen-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </span>
        )}
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {getContent()}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  spacing?: "none" | "tight" | "normal" | "loose";
  direction?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    className, 
    align = "start", 
    spacing = "normal", 
    direction = "horizontal",
    children, 
    ...props 
  }, ref) => {
    const spacingClasses = {
      none: "gap-0",
      tight: "gap-2",
      normal: "gap-3",
      loose: "gap-4",
    };
    
    const alignClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap",
          direction === "horizontal" ? "flex-row" : "flex-col",
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { 
  Button, 
  buttonVariants, 
  ButtonGroup 
};