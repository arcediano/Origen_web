/**
 * @component OrderStats
 * @description Estadísticas de pedidos con diseño estilo ProductExpandableDetails
 */

'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrderStats as OrderStatsType } from '@/types/order';

interface OrderStatsProps {
  stats: OrderStatsType;
  className?: string;
}

export function OrderStats({ stats, className }: OrderStatsProps) {
  const statsCards = [
    {
      label: 'Total pedidos',
      value: stats.total,
      icon: ShoppingBag,
      color: 'pradera',
      bg: 'from-origen-pradera/5 to-transparent',
      border: 'border-origen-pradera/10',
      iconColor: 'text-origen-pradera'
    },
    {
      label: 'Ingresos totales',
      value: `${stats.totalRevenue.toFixed(2)}€`,
      icon: DollarSign,
      color: 'green',
      bg: 'from-green-50/50 to-transparent',
      border: 'border-green-100',
      iconColor: 'text-green-500',
      secondaryInfo: {
        label: 'media',
        value: `${stats.averageOrderValue.toFixed(2)}€`
      }
    },
    {
      label: 'Pendientes',
      value: stats.pending,
      icon: Clock,
      color: 'amber',
      bg: 'from-amber-50/50 to-transparent',
      border: 'border-amber-100',
      iconColor: 'text-amber-500'
    },
    {
      label: 'Procesando',
      value: stats.processing,
      icon: Package,
      color: 'blue',
      bg: 'from-blue-50/50 to-transparent',
      border: 'border-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      label: 'Enviados',
      value: stats.shipped,
      icon: Truck,
      color: 'purple',
      bg: 'from-purple-50/50 to-transparent',
      border: 'border-purple-100',
      iconColor: 'text-purple-500'
    },
    {
      label: 'Entregados',
      value: stats.delivered,
      icon: CheckCircle,
      color: 'green',
      bg: 'from-green-50/50 to-transparent',
      border: 'border-green-100',
      iconColor: 'text-green-500'
    },
    {
      label: 'Hoy',
      value: stats.todayOrders,
      icon: Calendar,
      color: 'info',
      bg: 'from-origen-menta/5 to-transparent',
      border: 'border-origen-menta/20',
      iconColor: 'text-origen-menta',
      secondaryInfo: {
        label: 'ingresos',
        value: `${stats.todayRevenue.toFixed(2)}€`
      }
    },
    {
      label: 'Cancelados',
      value: stats.cancelled + stats.refunded,
      icon: XCircle,
      color: 'red',
      bg: 'from-red-50/50 to-transparent',
      border: 'border-red-100',
      iconColor: 'text-red-500'
    }
  ];

  return (
    <div className={cn(
      'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4',
      className
    )}>
      {statsCards.map((card, index) => (
        <div
          key={index}
          className={cn(
            'p-4 rounded-xl bg-gradient-to-br',
            card.bg,
            'border',
            card.border
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <card.icon className={cn('w-5 h-5', card.iconColor)} />
              <span className="text-xs font-medium text-gray-500">{card.label}</span>
            </div>
          </div>
          
          <p className="text-2xl font-bold text-origen-bosque">
            {card.value}
          </p>
          
          {card.secondaryInfo && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 text-gray-400" />
              <span>{card.secondaryInfo.label}:</span>
              <span className="font-medium text-origen-bosque">
                {card.secondaryInfo.value}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}