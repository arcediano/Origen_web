/**
 * @file checkbox.tsx
 * @description Checkbox accesible con diseño orgánico - CORREGIDO v3.0.1
 * @version 3.0.1 - Eliminados todos los usos de Menta (#06D6A0)
 */

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { 
  Check, 
  Minus, 
  Leaf,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxHTMLProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
type DivHTMLProps = React.HTMLAttributes<HTMLDivElement>;
type FieldsetHTMLProps = React.HTMLAttributes<HTMLFieldSetElement>;

interface CheckboxBaseProps extends CheckboxHTMLProps {
  variant?: "seed" | "sprout" | "leaf" | "accent" | "forest";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  animated?: boolean;
}

interface CheckboxWithLabelProps extends CheckboxBaseProps {
  label?: string;
  description?: string;
  error?: string;
  labelPosition?: "right" | "left" | "top" | "bottom";
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  card?: boolean;
}

interface CheckboxGroupProps extends FieldsetHTMLProps {
  legend?: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
  layout?: "vertical" | "horizontal" | "grid";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ 
  className, 
  variant = "seed",
  size = "md",
  ripple = true,
  animated = true,
  checked,
  ...props 
}, ref) => {
  const [isRippling, setIsRippling] = React.useState(false);
  const [animationStage, setAnimationStage] = React.useState<"seed" | "sprout" | "leaf">("seed");
  
  const isChecked = checked === true;
  const isIndeterminate = checked === "indeterminate";
  
  React.useEffect(() => {
    if (!animated) return;
    
    if (isIndeterminate) {
      setAnimationStage("sprout");
    } else if (isChecked) {
      setAnimationStage("leaf");
    } else {
      setAnimationStage("seed");
    }
  }, [isChecked, isIndeterminate, animated]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
    }
    props.onClick?.(e);
  };
  
  const variantClasses = {
    seed: cn(
      "border-origen-pradera/50 bg-white",
      "hover:border-origen-hoja hover:bg-origen-crema/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-pradera data-[state=checked]:to-origen-hoja",
      "data-[state=checked]:border-origen-pradera",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-pradera data-[state=indeterminate]:to-origen-hoja",
      "data-[state=indeterminate]:border-origen-pradera"
    ),
    
    sprout: cn(
      "border-origen-hoja/40 bg-white",
      "hover:border-origen-hoja hover:bg-green-50/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-100 data-[state=checked]:to-emerald-100",
      "data-[state=checked]:border-emerald-300",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-pradera data-[state=indeterminate]:to-origen-hoja",
      "data-[state=indeterminate]:border-origen-pradera"
    ),
    
    leaf: cn(
      "border-green-300/40 bg-white",
      "hover:border-green-400 hover:bg-green-50/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-50 data-[state=checked]:to-emerald-50",
      "data-[state=checked]:border-emerald-400",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-green-100 data-[state=indeterminate]:to-emerald-100",
      "data-[state=indeterminate]:border-emerald-300"
    ),
    
    accent: cn(
      "border-origen-pradera/30 bg-white",
      "hover:border-origen-pradera hover:bg-origen-pradera/10",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-pradera data-[state=checked]:to-origen-hoja",
      "data-[state=checked]:border-origen-pradera",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-pradera/50 data-[state=indeterminate]:to-origen-hoja/50",
      "data-[state=indeterminate]:border-origen-pradera/50"
    ),
    
    forest: cn(
      "border-origen-bosque/30 bg-white",
      "hover:border-origen-bosque hover:bg-origen-bosque/5",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-bosque data-[state=checked]:to-origen-pino",
      "data-[state=checked]:border-origen-bosque",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-bosque/50 data-[state=indeterminate]:to-origen-pino/50",
      "data-[state=indeterminate]:border-origen-bosque/50"
    ),
  };

  const sizeClasses = {
    sm: cn(
      "h-4 w-4",
      "[&_svg]:h-2.5 [&_svg]:w-2.5"
    ),
    md: cn(
      "h-5 w-5",
      "[&_svg]:h-3.5 [&_svg]:w-3.5"
    ),
    lg: cn(
      "h-6 w-6",
      "[&_svg]:h-4.5 [&_svg]:w-4.5"
    ),
  };
  
  const getIcon = () => {
    if (!animated) {
      return isIndeterminate ? (
        <Minus className="text-current" aria-hidden="true" />
      ) : isChecked ? (
        <Check className="text-current" aria-hidden="true" />
      ) : null;
    }
    
    switch (animationStage) {
      case "seed":
        return (
          <div className="flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-current opacity-70" />
          </div>
        );
      case "sprout":
        return <Sprout className="text-current" aria-hidden="true" />;
      case "leaf":
        return <Leaf className="text-current" aria-hidden="true" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="relative inline-flex">
      {isRippling && (
        <div 
          className={cn(
            "absolute inset-0 rounded-lg",
            "animate-ping opacity-20",
            variant === "seed" && "bg-origen-pradera",
            variant === "sprout" && "bg-origen-hoja",
            variant === "leaf" && "bg-green-500",
            variant === "accent" && "bg-origen-pradera",
            variant === "forest" && "bg-origen-bosque"
          )}
          style={{
            top: "-25%",
            left: "-25%",
            width: "150%",
            height: "150%",
          }}
        />
      )}

      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "shrink-0 rounded-lg border-2 bg-white",
          "transition-all duration-500 ease-out",
          "focus-visible:outline-none focus-visible:ring-3",
          "focus-visible:ring-origen-pradera/40 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:data-[state=checked]:bg-gray-400 disabled:data-[state=checked]:border-gray-400",
          
          variantClasses[variant],
          sizeClasses[size],
          
          animated && "overflow-hidden",
          animated && isChecked && "shadow-md shadow-current/20",
          
          className
        )}
        onClick={handleClick}
        checked={checked}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center text-white",
            "transition-all duration-500 ease-out",
            animated && "animate-in zoom-in-75"
          )}
        >
          {getIcon()}
        </CheckboxPrimitive.Indicator>
        
        {animated && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b from-white/30 to-transparent",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )} />
        )}
      </CheckboxPrimitive.Root>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ 
  label, 
  description, 
  error, 
  id,
  labelPosition = "right",
  checkedIcon,
  uncheckedIcon,
  card = false,
  className,
  checked,
  ...props 
}, ref) => {
  const checkboxId = id || React.useId();
  const isChecked = checked === true || checked === "indeterminate";
  const isIndeterminate = checked === "indeterminate";
  const isCheckedBool = checked === true;
  
  if (card) {
    return (
      <div className={cn(
        "relative w-full",
        labelPosition === "top" && "flex flex-col",
        labelPosition === "bottom" && "flex flex-col-reverse",
        labelPosition === "left" && "flex-row-reverse items-start",
        labelPosition === "right" && "flex items-start"
      )}>
        <div
          className={cn(
            "flex-1 cursor-pointer",
            "border-2 rounded-xl p-4 transition-all duration-300",
            "hover:border-origen-hoja hover:shadow-origen-md",
            isChecked 
              ? cn(
                  "border-origen-pradera bg-gradient-to-br",
                  "from-origen-crema to-white",
                  "shadow-origen-md"
                ) 
              : "border-origen-pradera/30 bg-white",
            props.disabled && "opacity-50 cursor-not-allowed",
            "group"
          )}
          onClick={(e) => {
            if (!props.disabled && ref && 'current' in ref) {
              const checkbox = ref.current;
              if (checkbox) {
                checkbox.click();
              }
            }
          }}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <Checkbox
                ref={ref}
                id={checkboxId}
                className="mt-0.5"
                checked={checked}
                {...props}
              />
              {isChecked && (
                <div className="absolute -top-1 -right-1">
                  <div className="h-2 w-2 rounded-full bg-origen-pradera animate-ping" />
                  <div className="h-2 w-2 rounded-full bg-origen-pradera" />
                </div>
              )}
            </div>
            <div className="flex-1">
              {label && (
                <span className={cn(
                  "block font-semibold text-origen-bosque mb-1",
                  "transition-colors duration-300",
                  isChecked && "text-origen-pino"
                )}>
                  {label}
                </span>
              )}
              {description && (
                <p className="text-sm text-origen-hoja leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {isChecked && (
            <div className={cn(
              "absolute inset-0 rounded-xl",
              "bg-gradient-to-br from-origen-pradera/5 to-transparent",
              "pointer-events-none"
            )} />
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600 mt-2 ml-11" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className={cn(
        "flex items-start gap-3",
        labelPosition === "top" && "flex-col",
        labelPosition === "bottom" && "flex-col-reverse",
        labelPosition === "left" && "flex-row-reverse",
        labelPosition === "right" && ""
      )}>
        <Checkbox
          ref={ref}
          id={checkboxId}
          className={cn(
            labelPosition === "top" && "self-start mt-2",
            labelPosition === "bottom" && "self-start mb-2",
            labelPosition === "left" && "order-2",
            labelPosition === "right" && "order-1 mt-0.5",
            className
          )}
          checked={checked}
          {...props}
        />
        {label && (
          <div className={cn(
            "grid gap-1 leading-none flex-1",
            labelPosition === "left" && "order-1 text-right",
            labelPosition === "right" && "order-2"
          )}>
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium text-origen-bosque cursor-pointer",
                "transition-colors duration-200",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                props.disabled && "cursor-not-allowed opacity-50",
                isChecked && "text-origen-pino"
              )}
            >
              {label}
              {props.required && (
                <span className="text-red-500 ml-1" aria-label="requerido">
                  *
                </span>
              )}
            </label>
            {description && (
              <p className="text-xs text-origen-hoja leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 ml-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

CheckboxWithLabel.displayName = "CheckboxWithLabel";

const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ 
    className, 
    legend, 
    description, 
    children, 
    error,
    layout = "vertical",
    ...props 
  }, ref) => {
    const layoutClasses = {
      vertical: "space-y-3",
      horizontal: "flex flex-wrap gap-4",
      grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
    };
    
    return (
      <fieldset 
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {(legend || description) && (
          <div className="space-y-2">
            {legend && (
              <legend className="text-base font-semibold text-origen-bosque">
                {legend}
              </legend>
            )}
            {description && (
              <p className="text-sm text-origen-hoja">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={layoutClasses[layout]}>
          {children}
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export { 
  Checkbox, 
  CheckboxWithLabel, 
  CheckboxGroup 
};

export type { 
  CheckboxBaseProps as CheckboxProps,
  CheckboxWithLabelProps,
  CheckboxGroupProps 
};