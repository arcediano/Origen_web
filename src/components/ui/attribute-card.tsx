/**
 * @file attribute-card.tsx
 * @description Tarjeta de atributo premium - 100% responsive
 */

"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, GripVertical, Eye, EyeOff, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProductAttribute {
  id?: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date';
  value: string | number | boolean;
  unit?: string;
  visible?: boolean;
}

export interface AttributeCardProps {
  attribute: ProductAttribute;
  index: number;
  onUpdate: (index: number, field: keyof ProductAttribute, value: any) => void;
  onRemove: (index: number) => void;
  isDraggable?: boolean;
  error?: string;
}

export function AttributeCard({ 
  attribute, 
  index, 
  onUpdate, 
  onRemove, 
  isDraggable = false,
  error
}: AttributeCardProps) {

  const handleTypeChange = (value: string) => {
    if (value === 'text' || value === 'number' || value === 'boolean' || value === 'date') {
      onUpdate(index, 'type', value as any);
      // Resetear valor al cambiar tipo
      if (value === 'boolean') {
        onUpdate(index, 'value', false);
      } else if (value === 'number') {
        onUpdate(index, 'value', 0);
      } else {
        onUpdate(index, 'value', '');
      }
    }
  };

  const toggleVisibility = () => {
    onUpdate(index, 'visible', !attribute.visible);
  };

  return (
    <div className={cn(
      "p-3 sm:p-4 bg-white rounded-xl border border-gray-200 relative group",
      "hover:border-origen-pradera/30 hover:shadow-origen transition-all",
      error && "border-red-500 bg-red-50/30"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {isDraggable && (
            <GripVertical className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 cursor-move" />
          )}
          <Badge variant="seed" size="sm" className="bg-origen-crema/50">
            <Settings className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            Atributo {index + 1}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={toggleVisibility}
            className={cn(
              "p-1 rounded-md transition-colors",
              attribute.visible !== false 
                ? "text-gray-500 hover:text-origen-bosque" 
                : "text-gray-300 hover:text-gray-500"
            )}
            aria-label={attribute.visible !== false ? "Ocultar" : "Mostrar"}
          >
            {attribute.visible !== false ? (
              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            ) : (
              <EyeOff className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            )}
          </button>
          
          <button
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            aria-label="Eliminar atributo"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-[10px] sm:text-xs text-red-600 mb-2">{error}</p>
      )}

      {/* Grid de campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* Nombre */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">
            Nombre <span className="text-red-500">*</span>
          </label>
          <Input
            value={attribute.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            inputSize="sm"  // ✅ Cambiado de size a inputSize
            className="h-8 sm:h-9 text-xs sm:text-sm"
            placeholder="Ej: Origen"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">
            Tipo <span className="text-red-500">*</span>
          </label>
          <Select
            value={attribute.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="number">Número</SelectItem>
              <SelectItem value="boolean">Sí/No</SelectItem>
              <SelectItem value="date">Fecha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Valor */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">
            Valor <span className="text-red-500">*</span>
          </label>
          {attribute.type === 'boolean' ? (
            <Select
              value={attribute.value.toString()}
              onValueChange={(v) => onUpdate(index, 'value', v === 'true')}
            >
              <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sí</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          ) : attribute.type === 'date' ? (
            <Input
              type="date"
              value={attribute.value as string}
              onChange={(e) => onUpdate(index, 'value', e.target.value)}
              inputSize="sm"  // ✅ Cambiado de size a inputSize
              className="h-8 sm:h-9 text-xs sm:text-sm"
            />
          ) : attribute.type === 'number' ? (
            <Input
              type="number"
              value={attribute.value as number}
              onChange={(e) => onUpdate(index, 'value', parseFloat(e.target.value) || 0)}
              step="0.01"
              inputSize="sm"  // ✅ Cambiado de size a inputSize
              className="h-8 sm:h-9 text-xs sm:text-sm"
            />
          ) : (
            <Input
              value={attribute.value as string}
              onChange={(e) => onUpdate(index, 'value', e.target.value)}
              inputSize="sm"  // ✅ Cambiado de size a inputSize
              className="h-8 sm:h-9 text-xs sm:text-sm"
              placeholder="Valor"
            />
          )}
        </div>

        {/* Unidad */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">Unidad</label>
          <Input
            value={attribute.unit || ''}
            onChange={(e) => onUpdate(index, 'unit', e.target.value)}
            inputSize="sm"  // ✅ Cambiado de size a inputSize
            className="h-8 sm:h-9 text-xs sm:text-sm"
            placeholder="kg, cm, etc."
          />
        </div>
      </div>
    </div>
  );
}