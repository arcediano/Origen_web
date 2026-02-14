/**
 * @file attribute-card.tsx
 * @description Componente reutilizable para atributos dinámicos
 */

"use client";

import { ProductAttribute } from '@/types/product';
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
import { X, GripVertical, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AttributeCardProps {
  attribute: ProductAttribute;
  index: number;
  onUpdate: (index: number, field: keyof ProductAttribute, value: any) => void;
  onRemove: (index: number) => void;
  isDraggable?: boolean;
}

export function AttributeCard({ 
  attribute, 
  index, 
  onUpdate, 
  onRemove, 
  isDraggable = false 
}: AttributeCardProps) {

  // Manejador para el cambio de tipo
  const handleTypeChange = (value: string) => {
    if (value === 'text' || value === 'number' || value === 'boolean' || value === 'date') {
      onUpdate(index, 'type', value);
    }
  };

  return (
    <div className={cn(
      "p-4 bg-white rounded-xl border border-gray-200 relative group",
      "hover:border-origen-pradera/30 hover:shadow-sm transition-all"
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isDraggable && (
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          )}
          <Badge variant="outline" size="sm" className="bg-origen-crema/50">
            Atributo {index + 1}
          </Badge>
          <button
            onClick={() => onUpdate(index, 'visible', !attribute.visible)}
            className={cn(
              "p-1 rounded-md transition-colors",
              attribute.visible ? "text-gray-500 hover:text-origen-bosque" : "text-gray-300 hover:text-gray-500"
            )}
          >
            {attribute.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
        <button
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Nombre</label>
          <Input
            value={attribute.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="h-9 text-sm"
            placeholder="Ej: Origen"
          />
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
          <Select
            value={attribute.type}
            onValueChange={handleTypeChange} // ✅ Usamos el manejador con tipado correcto
          >
            <SelectTrigger className="h-9 text-sm">
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

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Valor</label>
          {attribute.type === 'boolean' ? (
            <Select
              value={attribute.value.toString()}
              onValueChange={(v) => onUpdate(index, 'value', v === 'true')}
            >
              <SelectTrigger className="h-9 text-sm">
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
              className="h-9 text-sm"
            />
          ) : attribute.type === 'number' ? (
            <Input
              type="number"
              value={attribute.value as number}
              onChange={(e) => onUpdate(index, 'value', parseFloat(e.target.value) || 0)}
              step="0.01"
              className="h-9 text-sm"
            />
          ) : (
            <Input
              value={attribute.value as string}
              onChange={(e) => onUpdate(index, 'value', e.target.value)}
              className="h-9 text-sm"
              placeholder="Valor"
            />
          )}
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Unidad</label>
          <Input
            value={attribute.unit || ''}
            onChange={(e) => onUpdate(index, 'unit', e.target.value)}
            className="h-9 text-sm"
            placeholder="kg, cm, etc."
          />
        </div>
      </div>
    </div>
  );
}