/**
 * @file tabs.tsx
 * @description Sistema de pestañas premium - 100% responsive
 * @version 4.0.1 - CORREGIDO: Eliminada doble declaración de useTabs
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

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
  badge?: string | number;
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

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext debe usarse dentro de un componente Tabs");
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
            orientation === "vertical" && "flex flex-col sm:flex-row gap-4 sm:gap-6",
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
    const { orientation, variant, tabsSize, fullWidth } = useTabsContext();

    const variantClasses = {
      default: cn(
        "bg-origen-crema/80 p-1 rounded-xl",
        orientation === "horizontal" ? "inline-flex flex-wrap" : "flex flex-col",
        "backdrop-blur-sm"
      ),
      
      pills: cn(
        orientation === "horizontal" ? "flex flex-wrap gap-1.5" : "flex flex-col gap-1.5"
      ),
      
      underline: cn(
        orientation === "horizontal" 
          ? "flex flex-wrap border-b border-origen-pradera/30" 
          : "flex flex-col border-r border-origen-pradera/30"
      ),
      
      organic: cn(
        "relative",
        orientation === "horizontal" 
          ? "flex flex-wrap border-b-2 border-origen-pradera/20" 
          : "flex flex-col border-r-2 border-origen-pradera/20"
      ),
      
      minimal: cn(
        orientation === "horizontal" ? "flex flex-wrap gap-2 sm:gap-4" : "flex flex-col gap-2"
      ),
    };

    const sizeClasses = {
      sm: "text-xs sm:text-sm",
      md: "text-sm sm:text-base",
      lg: "text-base sm:text-lg",
    };

    const widthClass = fullWidth && orientation === "horizontal" ? "w-full" : "";

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[tabsSize],
          widthClass,
          orientation === "vertical" && "w-full sm:w-48 shrink-0",
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
  ({ className = "", value, disabled = false, icon, badge, children, ...props }, ref) => {
    const { activeTab, setActiveTab, orientation, variant, tabsSize, fullWidth } = useTabsContext();
    const isActive = activeTab === value;

    const variantClasses = {
      default: cn(
        "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive 
          ? "bg-white text-origen-bosque shadow-sm" 
          : "text-gray-600 hover:text-origen-bosque hover:bg-white/50"
      ),
      
      pills: cn(
        "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive 
          ? "bg-origen-bosque text-white shadow-md"
          : "bg-white border border-origen-pradera/30 text-gray-600 hover:border-origen-pradera hover:text-origen-bosque"
      ),
      
      underline: cn(
        "px-3 py-1.5 sm:px-4 sm:py-2 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative",
        orientation === "horizontal"
          ? cn(
              "border-b-2 -mb-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-gray-600 hover:text-origen-bosque hover:border-origen-pradera/50"
            )
          : cn(
              "border-r-2 -mr-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-gray-600 hover:text-origen-bosque hover:border-origen-pradera/50"
            )
      ),
      
      organic: cn(
        "px-3 py-2 sm:px-5 sm:py-2.5 font-medium transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative group",
        orientation === "horizontal"
          ? cn(
              "border-b-2 -mb-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-gray-600 hover:text-origen-bosque"
            )
          : cn(
              "border-r-2 -mr-px",
              isActive 
                ? "border-origen-pradera text-origen-bosque"
                : "border-transparent text-gray-600 hover:text-origen-bosque"
            )
      ),
      
      minimal: cn(
        "px-2 py-1 sm:px-3 sm:py-1.5 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "relative",
        isActive 
          ? "text-origen-bosque font-semibold"
          : "text-gray-500 hover:text-origen-hoja"
      ),
    };

    const sizeClasses = {
      sm: "text-xs px-2 py-1 sm:px-3 sm:py-1.5",
      md: "text-sm px-3 py-1.5 sm:px-4 sm:py-2",
      lg: "text-base px-4 py-2 sm:px-5 sm:py-2.5",
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
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {icon && (
            <span className={cn(
              "transition-all duration-200 shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4",
              isActive ? "text-current" : "text-gray-400"
            )}>
              {icon}
            </span>
          )}
          
          <span>{children}</span>
          
          {badge !== undefined && (
            <span className={cn(
              "inline-flex items-center justify-center ml-1",
              "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
              isActive 
                ? "bg-origen-pradera text-white" 
                : "bg-gray-200 text-gray-700"
            )}>
              {badge}
            </span>
          )}
          
          {variant === "organic" && isActive && (
            <span className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-origen-pradera animate-pulse" />
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
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          "mt-4 sm:mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
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
// TABS CON ICONOS (PREMIUM)
// ============================================================================

export interface TabsWithIconProps extends TabsProps {
  tabs: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    badge?: string | number;
    disabled?: boolean;
  }>;
  className?: string;
}

const TabsWithIcon = React.forwardRef<HTMLDivElement, TabsWithIconProps>(
  ({ tabs, className, ...props }, ref) => {
    return (
      <Tabs ref={ref} className={className} {...props}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              badge={tab.badge}
              disabled={tab.disabled}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.charAt(0)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  }
);

TabsWithIcon.displayName = "TabsWithIcon";

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsWithIcon,
  useTabsContext as useTabs // Exportamos con el nombre useTabs para mantener la API
};