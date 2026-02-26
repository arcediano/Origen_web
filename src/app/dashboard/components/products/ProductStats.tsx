/**
 * @file ProductStats.tsx
 * @description Componente de estadísticas de productos - VERSIÓN RESPONSIVE
 */

'use client';

import React from 'react';
import { 
  Package, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';

export interface ProductStatsProps {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
  totalRevenue?: number;
  avgRating?: number;
  className?: string;
}

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: 'pradera' | 'bosque' | 'amber' | 'red';
  tooltip?: string;
  tooltipDetailed?: string;
}

function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  color = 'pradera',
  tooltip,
  tooltipDetailed
}: StatsCardProps) {
  const colorClasses = {
    pradera: { bg: 'bg-origen-pradera/10', text: 'text-origen-pradera', icon: 'text-origen-pradera' },
    bosque: { bg: 'bg-origen-bosque/10', text: 'text-origen-bosque', icon: 'text-origen-bosque' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-500' },
    red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-500' },
  };

  const classes = colorClasses[color];

  return (
    <Card variant="elevated" hoverEffect="organic" className="p-4 sm:p-5">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icono - tamaño responsive */}
        <div className={cn('w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0', classes.bg)}>
          <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', classes.icon)} />
        </div>

        <div className="flex-1 min-w-0"> {/* min-w-0 para permitir truncado */}
          {/* Valor y tooltip */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className={cn('text-2xl sm:text-3xl font-semibold tracking-tight', classes.text)}>
              {value}
            </span>
            {tooltip && (
              <Tooltip 
                content={tooltip} 
                detailed={tooltipDetailed}
                size="sm"
              />
            )}
          </div>
          
          {/* Label - responsive */}
          <p className="text-sm sm:text-base text-gray-500 truncate mt-0.5 sm:mt-1">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export function ProductStats({
  total,
  active,
  lowStock,
  outOfStock,
  totalRevenue,
  avgRating,
  className,
}: ProductStatsProps) {
  // En móvil: 2 columnas, en tablet: 4 columnas
  return (
    <div className={cn(
      'grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4',
      className
    )}>
      <StatsCard
        label="Productos totales"
        value={total}
        icon={Package}
        color="pradera"
        tooltip="Total productos"
        tooltipDetailed="Número total de productos en tu catálogo"
      />

      <StatsCard
        label="Productos activos"
        value={active}
        icon={CheckCircle}
        color="bosque"
        tooltip="Productos activos"
        tooltipDetailed="Productos publicados y disponibles para la venta"
      />

      <StatsCard
        label="Stock bajo"
        value={lowStock}
        icon={AlertCircle}
        color="amber"
        tooltip="Stock bajo"
        tooltipDetailed="Productos con stock por debajo del umbral"
      />

      <StatsCard
        label="Productos agotados"
        value={outOfStock}
        icon={AlertCircle}
        color="red"
        tooltip="Productos agotados"
        tooltipDetailed="Productos sin stock disponible"
      />
    </div>
  );
}