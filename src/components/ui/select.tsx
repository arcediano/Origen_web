/**
 * @file select.tsx
 * @description Componente Select accesible con diseño orgánico
 * @version 3.0.4 - Corregidos conflictos de exportación con nombres únicos
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";

// ============================================================================
// TIPOS - Usando nombres con prefijo para evitar conflictos
// ============================================================================

export interface OrigenSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface OrigenSelectGroup {
  label?: string;
  items: OrigenSelectItem[];
}

export interface OrigenSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: OrigenSelectItem[];
  groups?: OrigenSelectGroup[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  variant?: "default" | "outline" | "filled" | "minimal";
  selectSize?: "sm" | "md" | "lg";
  searchable?: boolean;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

// ============================================================================
// COMPONENTE SELECT ITEM INTERNO (NO EXPORTADO)
// ============================================================================

interface SelectItemComponentProps {
  item: OrigenSelectItem;
  isSelected: boolean;
  onSelect: () => void;
}

const SelectItemComponent: React.FC<SelectItemComponentProps> = ({ 
  item, 
  isSelected, 
  onSelect 
}) => {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-9 text-sm outline-none",
        "transition-all duration-150",
        "hover:bg-origen-pastel hover:text-origen-bosque",
        "focus:bg-origen-pastel focus:text-origen-bosque focus:outline-none focus:ring-2 focus:ring-origen-menta/50",
        item.disabled && "pointer-events-none opacity-50",
        isSelected && "bg-origen-pastel/50 font-medium"
      )}
      onClick={onSelect}
      disabled={item.disabled}
      role="option"
      aria-selected={isSelected}
    >
      <span className="truncate">{item.label}</span>
      
      {isSelected && (
        <span className="absolute right-3 flex h-4 w-4 items-center justify-center">
          <Check className="h-4 w-4 text-origen-menta animate-in zoom-in-50" />
        </span>
      )}
    </button>
  );
};

// ============================================================================
// COMPONENTE SELECT PRINCIPAL
// ============================================================================

const OrigenSelect = React.forwardRef<HTMLSelectElement, OrigenSelectProps>(
  (
    {
      className = "",
      items = [],
      groups,
      value,
      defaultValue,
      placeholder = "Selecciona una opción",
      label,
      error,
      helperText,
      leftIcon,
      variant = "default",
      selectSize = "md",
      searchable = false,
      disabled = false,
      required = false,
      name,
      id,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "");
    const selectId = id || React.useId();
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : selectedValue;
    
    // Cerrar dropdown al hacer clic fuera
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current && 
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Obtener todos los items
    const allItems = React.useMemo(() => {
      if (groups) {
        return groups.flatMap(g => g.items);
      }
      return items;
    }, [groups, items]);
    
    // Filtrar items por búsqueda
    const filteredGroups = React.useMemo(() => {
      if (!groups) return [];
      return groups
        .map(group => ({
          ...group,
          items: group.items.filter(item => 
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }))
        .filter(group => group.items.length > 0);
    }, [groups, searchTerm]);
    
    const filteredItems = React.useMemo(() => {
      return items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [items, searchTerm]);
    
    // Item seleccionado
    const selectedItem = React.useMemo(() => {
      return allItems.find(item => item.value === currentValue);
    }, [allItems, currentValue]);
    
    const handleSelect = (item: OrigenSelectItem) => {
      if (item.disabled) return;
      
      if (!isControlled) {
        setSelectedValue(item.value);
      }
      
      onValueChange?.(item.value);
      
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = item.value;
        const event = new Event('change', { bubbles: true });
        ref.current.dispatchEvent(event);
      }
      
      setIsOpen(false);
      setSearchTerm("");
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm("");
      }
      if (e.key === 'ArrowDown' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    const variantClasses = {
      default: "bg-white border border-origen-pradera/50 hover:border-origen-hoja focus:border-origen-menta",
      outline: "bg-transparent border-2 border-origen-bosque/30 hover:border-origen-bosque/50 focus:border-origen-menta",
      filled: "bg-origen-crema border border-transparent hover:bg-origen-pastel focus:bg-white focus:border-origen-menta",
      minimal: "bg-transparent border-b border-origen-pradera/30 hover:border-origen-hoja focus:border-origen-menta focus:border-b-2 rounded-none px-0",
    };
    
    const sizeClasses = {
      sm: "h-10 px-3 text-sm",
      md: "h-12 px-4 text-base",
      lg: "h-14 px-5 text-lg",
    };

    return (
      <div className="w-full space-y-2" {...props}>
        {/* Label */}
        {label && (
          <div className="flex items-center gap-2">
            {leftIcon && (
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-origen-menta/10 to-origen-pradera/10 text-origen-hoja">
                {leftIcon}
              </div>
            )}
            <label
              htmlFor={selectId}
              className={cn(
                "text-sm font-semibold text-origen-bosque",
                disabled && "opacity-50 cursor-not-allowed",
                error && "text-red-600"
              )}
            >
              {label}
              {required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          </div>
        )}
        
        {/* Select personalizado */}
        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            id={selectId}
            className={cn(
              "flex w-full items-center justify-between gap-2",
              "rounded-xl transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-origen-menta focus:ring-offset-1",
              variantClasses[variant],
              sizeClasses[selectSize],
              disabled && "cursor-not-allowed opacity-50 bg-gray-50",
              error && "border-red-500 focus:ring-red-500/50",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={label ? selectId : undefined}
            aria-invalid={!!error}
          >
            <div className="flex items-center gap-3 flex-1 truncate">
              <span className={cn(
                "truncate",
                !selectedItem && "text-gray-400"
              )}>
                {selectedItem?.label || placeholder}
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-origen-hoja/60 transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </button>
          
          {/* Dropdown */}
          {isOpen && !disabled && (
            <div 
              ref={dropdownRef}
              className={cn(
                "absolute z-50 w-full mt-2",
                "rounded-xl border border-origen-pradera bg-white",
                "shadow-lg animate-in fade-in-0 zoom-in-95",
                "max-h-80 overflow-hidden flex flex-col"
              )}
            >
              {/* Búsqueda */}
              {searchable && (
                <div className="p-3 border-b border-origen-pradera/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-origen-hoja/60" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar..."
                      className="w-full rounded-lg border border-origen-pradera/50 bg-origen-crema py-2 pl-10 pr-3 text-sm outline-none focus:border-origen-menta focus:ring-1 focus:ring-origen-menta"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
              
              {/* Opciones */}
              <div 
                className="flex-1 overflow-auto p-1"
                role="listbox"
              >
                {groups ? (
                  filteredGroups.length > 0 ? (
                    filteredGroups.map((group, index) => (
                      <div key={index} role="group" aria-label={group.label}>
                        {group.label && (
                          <div className="px-3 py-2 text-xs font-semibold text-origen-hoja uppercase tracking-wide bg-origen-crema/50">
                            {group.label}
                          </div>
                        )}
                        {group.items.map((item) => (
                          <SelectItemComponent
                            key={item.value}
                            item={item}
                            isSelected={currentValue === item.value}
                            onSelect={() => handleSelect(item)}
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-6 text-center text-sm text-gray-500">
                      No se encontraron resultados
                    </div>
                  )
                ) : (
                  filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <SelectItemComponent
                        key={item.value}
                        item={item}
                        isSelected={currentValue === item.value}
                        onSelect={() => handleSelect(item)}
                      />
                    ))
                  ) : (
                    <div className="px-3 py-6 text-center text-sm text-gray-500">
                      No se encontraron resultados
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Mensajes */}
        {(error || helperText) && (
          <p className={cn(
            "text-xs flex items-center gap-1.5",
            error ? "text-red-600" : "text-origen-hoja"
          )}>
            {error || helperText}
          </p>
        )}
        
        {/* Select nativo oculto */}
        <select
          ref={ref}
          name={name}
          value={currentValue}
          onChange={(e) => {
            const item = allItems.find(i => i.value === e.target.value);
            if (item) handleSelect(item);
          }}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          disabled={disabled}
          required={required}
        >
          <option value="">{placeholder}</option>
          {allItems.map(item => (
            <option key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

OrigenSelect.displayName = "Select";

// ============================================================================
// EXPORT - Usando alias para evitar conflictos
// ============================================================================

export { OrigenSelect as Select };
export type { OrigenSelectItem as SelectItem, OrigenSelectGroup as SelectGroup };