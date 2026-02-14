/**
 * @file tabs.tsx
 * @description Sistema de pestañas accesible con diseño orgánico - CORREGIDO v3.0.1
 * @version 3.0.1 - Eliminados todos los usos de Menta (#06D6A0)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Leaf, Sprout } from "lucide-react";

// ============================================================================
// TIPOS
// ============================================================================

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "pills" | "underline" | "organic" | "minimal";
  tabsSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

// ============================================================================
// CONTEXTO
// ============================================================================

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: "horizontal" | "vertical";
  variant: "default" | "pills" | "underline" | "organic" | "minimal";
  tabsSize: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs debe usarse dentro de un componente Tabs");
  }
  return context;
};

// ============================================================================
// COMPONENTE TABS PRINCIPAL
// ============================================================================

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className = "",
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      variant = "default",
      tabsSize = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const isControlled = value !== undefined;
    const activeTab = isControlled ? value : internalValue;

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        activeTab,
        setActiveTab,
        orientation,
        variant,
        tabsSize,
        fullWidth,
      }),
      [activeTab, setActiveTab, orientation, variant, tabsSize, fullWidth]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "w-full",
            orientation === "vertical" && "flex gap-6",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// ============================================================================
// COMPONENTE TABS LIST
// ============================================================================

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className = "", children, ...props }, ref) => {
    const { orientation, variant, tabsSize, fullWidth } = useTabs();

    const variantClasses = {
      default: cn(
        "bg-origen-crema/80 p-1 rounded-xl",
        orientation === "horizontal" ? "inline-flex" : "flex flex-col",
        "backdrop-blur-sm"
      ),
      pills: cn(
        "gap-2",
        orientation === "horizontal" ? "flex flex-wrap" : "flex flex-col"
      ),
      underline: cn(
        "border-b border-origen-pradera/30",
        orientation === "horizontal" ? "flex" : "flex flex-col border-b-0 border-r"
      ),
      organic: cn(
        "relative",
        orientation === "horizontal" 
          ? "flex border-b-2 border-origen-pradera/20" 
          : "flex flex-col border-r-2 border-origen-pradera/20"
      ),
      minimal: cn(
        "gap-4",
        orientation === "horizontal" ? "flex" : "flex flex-col"
      ),
    };

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[tabsSize],
          fullWidth && orientation === "horizontal" && "w-full",
          className
        )}
        role="tablist"
        aria-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

// ============================================================================
// COMPONENTE TABS TRIGGER
// ============================================================================

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = "", value, disabled = false, icon, children, ...props }, ref) => {
    const { activeTab, setActiveTab, orientation, variant, tabsSize, fullWidth } = useTabs();
    const isActive = activeTab === value;

    const variantClasses = {
      default: cn(
        "px-4 py-2 rounded-lg font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive 
          ? "bg-white text-origen-bosque shadow-sm" 
          : "text-origen-hoja hover:text-origen-bosque hover:bg-white/50"
      ),
      pills: cn(
        "px-4 py-2 rounded-full font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive 
          ? "bg-gradient-to-r from-origen-pradera to-origen-hoja text-white shadow-md"
          : "bg-white border border-origen-pradera/30 text-origen-hoja hover:border-origen-pradera hover:text-origen-bosque"
      ),
      underline: cn(
        "px-4 py-2 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative",
        orientation === "horizontal"
          ? cn(
              "border-b-2 -mb-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-origen-hoja hover:text-origen-bosque hover:border-origen-pradera/50"
            )
          : cn(
              "border-r-2 -mr-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-origen-hoja hover:text-origen-bosque hover:border-origen-pradera/50"
            )
      ),
      organic: cn(
        "px-5 py-2.5 font-medium transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative group",
        orientation === "horizontal"
          ? cn(
              "border-b-2 -mb-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-origen-hoja hover:text-origen-bosque"
            )
          : cn(
              "border-r-2 -mr-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-origen-hoja hover:text-origen-bosque"
            )
      ),
      minimal: cn(
        "px-3 py-1.5 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative",
        isActive 
          ? "text-origen-bosque"
          : "text-gray-500 hover:text-origen-hoja"
      ),
    };

    const sizeClasses = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-2.5",
    };

    const widthClass = fullWidth && orientation === "horizontal" ? "flex-1" : "";

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={cn(
          variantClasses[variant],
          sizeClasses[tabsSize],
          widthClass,
          className
        )}
        onClick={() => !disabled && setActiveTab(value)}
        data-state={isActive ? "active" : "inactive"}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {icon && (
            <span className={cn(
              "transition-all duration-200",
              isActive ? "text-current" : "text-origen-hoja/70"
            )}>
              {icon}
            </span>
          )}
          <span>{children}</span>
          
          {variant === "organic" && isActive && (
            <span className={cn(
              "absolute -bottom-[2px] left-1/2 -translate-x-1/2",
              "w-1.5 h-1.5 rounded-full bg-origen-pradera",
              "animate-pulse"
            )} />
          )}
          
          {variant === "organic" && isActive && orientation === "horizontal" && (
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-origen-pradera animate-bounce">
              <Leaf className="h-3 w-3" />
            </span>
          )}
        </div>
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

// ============================================================================
// COMPONENTE TABS CONTENT
// ============================================================================

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className = "", value, children, ...props }, ref) => {
    const { activeTab } = useTabs();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-pradera focus-visible:ring-offset-2",
          "animate-in fade-in-0 slide-in-from-top-2 duration-300",
          className
        )}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

// ============================================================================
// COMPONENTES ADICIONALES
// ============================================================================

export interface TabsWithIconProps extends TabsProps {
  tabIcons?: Record<string, React.ReactNode>;
}

const TabsWithIcon: React.FC<TabsWithIconProps> = ({ tabIcons = {}, children, ...props }) => {
  return <Tabs {...props}>{children}</Tabs>;
};

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsWithIcon,
  useTabs 
};