/**
 * @file OrderItem.tsx
 * @description Item de pedido - ESTILO EXACTO DE BENEFITSSECTION
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

interface OrderItemProps {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export function OrderItem({
  id,
  orderNumber,
  customer,
  items,
  total,
  status,
  date
}: OrderItemProps) {
  const statusConfig = {
    pending: { 
      label: 'Pendiente', 
      color: 'bg-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200'
    },
    processing: { 
      label: 'Procesando', 
      color: 'bg-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    },
    shipped: { 
      label: 'Enviado', 
      color: 'bg-purple-500',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200'
    },
    delivered: { 
      label: 'Entregado', 
      color: 'bg-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200'
    },
    cancelled: { 
      label: 'Cancelado', 
      color: 'bg-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200'
    }
  };

  const config = statusConfig[status];

  return (
    <Link href={`/dashboard/pedidos/${id}`} className="block group relative">
      {/* EFECTO EXACTO DE BENEFITSSECTION */}
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-transform duration-300",
        "bg-gradient-to-br from-origen-pradera/5 to-origen-hoja/5",
        "group-hover:scale-[1.02]"
      )}></div>
      
      <div className={cn(
        "relative bg-white rounded-2xl p-6 border border-gray-200",
        "shadow-lg group-hover:shadow-xl group-hover:border-origen-pradera",
        "transition-all duration-300"
      )}>
        <div className="flex items-center gap-4">
          {/* Icono circular */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center flex-shrink-0 shadow-md">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg text-origen-bosque">{orderNumber}</h3>
                <span className="text-sm text-gray-500">{date}</span>
              </div>
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full border",
                config.bg,
                config.text,
                config.border
              )}>
                {config.label}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">{customer}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-gray-600">{items} {items === 1 ? 'producto' : 'productos'}</span>
              </div>
              <span className="font-semibold text-lg text-origen-bosque">
                {total.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}