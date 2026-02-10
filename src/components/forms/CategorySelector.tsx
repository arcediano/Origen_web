/**
 * Selector de categorías - Componente UI puro
 * Reutilizable para múltiples formularios
 */

'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Definir interfaz con propiedades readonly
export interface Category {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly description?: string;
}

// Tipos para las props - permitir arrays readonly
interface CategorySelectorProps {
  categories: readonly Category[] | Category[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  className?: string;
}

export function CategorySelector({
  categories,
  selected,
  onChange,
  label = "Selecciona categorías",
  className,
}: CategorySelectorProps) {
  const handleToggle = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter(id => id !== categoryId)
      : [...selected, categoryId];
    onChange(newSelected);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <Label className="text-origen-bosque font-medium block">
          {label}
          <span className="text-xs text-gray-500 ml-2">(Selecciona una o más)</span>
        </Label>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded border cursor-pointer transition-all",
              selected.includes(category.id)
                ? "border-origen-menta bg-origen-crema"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => handleToggle(category.id)}
          >
            <Checkbox
              checked={selected.includes(category.id)}
              onCheckedChange={() => handleToggle(category.id)}
              aria-label={`Seleccionar ${category.name}`}
            />
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <div>
                <span className="text-sm font-medium text-origen-bosque">
                  {category.name}
                </span>
                {category.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}