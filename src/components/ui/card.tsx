/**
 * @file card.tsx
 * @description Componente Card con diseño orgánico - Versión corregida
 * @version 3.0.1 - Corregidos imports y typos
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Leaf, Sprout, Flower, ArrowRight, Star } from "lucide-react";
import { Button } from "./button"; // ✅ IMPORT CORREGIDO

// ============================================================================
// TIPOS
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "flat" | "organic" | "forest";
  interactive?: boolean;
  cardSize?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  backgroundImage?: string;
  overlay?: "none" | "light" | "medium" | "dark";
  hoverEffect?: "none" | "lift" | "glow" | "scale" | "organic";
  animate?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
  align?: "left" | "center" | "right";
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  titleSize?: "sm" | "md" | "lg";
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  descriptionSize?: "sm" | "md" | "lg";
}

// ============================================================================
// COMPONENTE CARD PRINCIPAL
// ============================================================================

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      interactive = false,
      cardSize = "md",
      rounded = "lg",
      backgroundImage,
      overlay = "none",
      hoverEffect = "none",
      animate = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-white border border-origen-pradera/20 shadow-sm",
      elevated: "bg-white border-0 shadow-md shadow-origen-bosque/5 hover:shadow-lg hover:shadow-origen-bosque/10",
      outline: "bg-transparent border-2 border-origen-pradera/30 hover:border-origen-hoja",
      flat: "bg-origen-crema border-0 shadow-none",
      organic: "bg-gradient-to-br from-white to-origen-crema border border-origen-pradera/30 shadow-lg shadow-origen-menta/5 relative overflow-hidden",
      forest: "bg-gradient-to-br from-origen-bosque to-origen-pino border border-origen-bosque/30 text-white shadow-xl shadow-origen-bosque/20",
    };

    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
      full: "rounded-[2rem]",
    };

    const overlayClasses = {
      none: "",
      light: "bg-black/10",
      medium: "bg-black/30",
      dark: "bg-black/50",
    };

    const hoverClasses = {
      none: "",
      lift: "hover:-translate-y-2 transition-transform duration-300",
      glow: "hover:shadow-lg hover:shadow-origen-menta/20 transition-shadow duration-300",
      scale: "hover:scale-[1.02] transition-transform duration-300",
      organic: "hover:shadow-xl hover:shadow-origen-menta/10 hover:border-origen-menta/30 transition-all duration-500",
    };

    const animationClasses = animate
      ? "animate-in fade-in-0 zoom-in-95 duration-500"
      : "";

    const backgroundStyle = backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col",
          roundedClasses[rounded],
          variantClasses[variant],
          sizeClasses[cardSize],
          hoverEffect !== "none" && hoverClasses[hoverEffect],
          interactive && "cursor-pointer",
          animationClasses,
          className
        )}
        style={backgroundStyle}
        role={interactive ? "button" : "article"}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {backgroundImage && overlay !== "none" && (
          <div
            className={cn(
              "absolute inset-0",
              roundedClasses[rounded],
              overlayClasses[overlay]
            )}
          />
        )}
        
        <div className={cn(
          "relative z-10",
          variant === "forest" && "text-white"
        )}>
          {children}
        </div>
        
        {variant === "organic" && (
          <>
            <div className="absolute -bottom-4 -right-4 h-16 w-16 text-origen-menta/10 rotate-12">
              <Leaf className="h-full w-full" />
            </div>
            <div className="absolute -top-4 -left-4 h-12 w-12 text-origen-pradera/10 -rotate-12">
              <Sprout className="h-full w-full" />
            </div>
          </>
        )}
        
        {variant === "forest" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

// ============================================================================
// CARD HEADER
// ============================================================================

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", compact = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        compact ? "space-y-1" : "space-y-1.5",
        "mb-4",
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// ============================================================================
// CARD TITLE
// ============================================================================

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", titleSize = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
    };

    return (
      <h3
        ref={ref}
        className={cn(
          "font-bold leading-tight tracking-tight",
          sizeClasses[titleSize],
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

// ============================================================================
// CARD DESCRIPTION
// ============================================================================

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = "", descriptionSize = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed text-gray-600",
          sizeClasses[descriptionSize],
          className
        )}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

// ============================================================================
// CARD CONTENT
// ============================================================================

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", compact = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1",
        compact ? "space-y-2" : "space-y-4",
        className
      )}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

// ============================================================================
// CARD FOOTER
// ============================================================================

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", compact = false, align = "left", ...props }, ref) => {
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center mt-4",
          compact ? "pt-2" : "pt-4",
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

// ============================================================================
// FEATURE CARD
// ============================================================================

export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  iconColor?: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ 
    icon, 
    title, 
    description, 
    action,
    iconColor,
    variant = "elevated",
    interactive = true,
    className = "",
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        interactive={interactive}
        hoverEffect="organic"
        className={cn("group", className)}
        {...props}
      >
        <CardHeader>
          <div 
            className={cn(
              "mb-4 inline-flex h-12 w-12 items-center justify-center",
              "rounded-xl",
              "bg-gradient-to-br from-origen-menta/10 to-origen-pradera/10",
              "text-origen-hoja",
              "group-hover:scale-110 group-hover:shadow-lg",
              "transition-all duration-300",
              iconColor
            )}
          >
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {action && (
          <CardFooter align="right">
            {action}
          </CardFooter>
        )}
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="h-5 w-5 text-origen-menta" />
        </div>
      </Card>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

// ============================================================================
// STAT CARD
// ============================================================================

export interface StatCardProps extends Omit<CardProps, 'children'> {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  description?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    label, 
    value, 
    trend, 
    icon, 
    description,
    variant = "elevated",
    className = "",
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-origen-hoja">{label}</p>
              <p className="text-3xl font-bold text-origen-bosque">{value}</p>
              {trend && (
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      trend.isPositive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-xs text-gray-500">vs mes anterior</span>
                </div>
              )}
              {description && (
                <p className="text-xs text-gray-600">{description}</p>
              )}
            </div>
            {icon && (
              <div className={cn(
                "p-3 rounded-xl",
                "bg-gradient-to-br from-origen-menta/10 to-origen-pradera/10",
                "text-origen-menta"
              )}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-origen-menta to-origen-pradera" />
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

// ============================================================================
// PRODUCT CARD - CORREGIDO (typo 'baddes' → 'badges')
// ============================================================================

export interface ProductCardProps extends Omit<CardProps, 'children'> {
  image: string;
  name: string;
  price: string | number;
  producer?: string;
  rating?: number;
  badges?: React.ReactNode[];
  onAddToCart?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    image, 
    name, 
    price, 
    producer,
    rating,
    badges,
    onAddToCart,
    variant = "elevated",
    interactive = true,
    className = "",
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        interactive={interactive}
        hoverEffect="lift"
        className={cn("group", className)}
        {...props}
      >
        {/* Imagen */}
        <div className="relative -m-6 mb-0 overflow-hidden rounded-t-2xl">
          <div 
            className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges - CORREGIDO: badges en lugar de baddes */}
          {badges && badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {badges}
            </div>
          )}
        </div>
        
        <CardContent className="mt-6">
          <div className="space-y-3">
            {producer && (
              <p className="text-xs text-origen-hoja">{producer}</p>
            )}
            
            <CardTitle className="text-lg">{name}</CardTitle>
            
            {rating !== undefined && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">({rating})</span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-origen-bosque">
                {typeof price === 'number' ? `${price.toFixed(2)}€` : price}
              </span>
              {onAddToCart && (
                <Button
                  size="sm"
                  variant="accent"
                  onClick={onAddToCart}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Añadir
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  FeatureCard,
  StatCard,
  ProductCard
};