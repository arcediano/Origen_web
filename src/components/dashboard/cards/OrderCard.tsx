/**
 * @component OrderCard
 * @description Tarjeta de pedido para el dashboard
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  ChevronRight
} from 'lucide-react';

interface OrderCardProps {
  id: string;
  orderNumber: string;
  customer: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  className?: string;
}

export function OrderCard({
  id,
  orderNumber,
  customer,
  date,
  total,
  status,
  items,
  className
}: OrderCardProps) {
  const statusConfig = {
    pending: {
      label: 'Pendiente',
      icon: Clock,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      iconColor: 'text-amber-600'
    },
    processing: {
      label: 'Procesando',
      icon: Package,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      iconColor: 'text-blue-600'
    },
    shipped: {
      label: 'Enviado',
      icon: Truck,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      iconColor: 'text-purple-600'
    },
    delivered: {
      label: 'Entregado',
      icon: CheckCircle2,
      color: 'bg-green-100 text-green-700 border-green-200',
      iconColor: 'text-green-600'
    },
    cancelled: {
      label: 'Cancelado',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-700 border-red-200',
      iconColor: 'text-red-600'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className={cn(
      "p-4 border border-gray-200 bg-white hover:shadow-md transition-all group",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            config.color.replace('text-', 'bg-').replace('border-', '')
          )}>
            <StatusIcon className={cn("w-5 h-5", config.iconColor)} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <Link 
                href={`/dashboard/pedidos/${id}`}
                className="font-medium text-origen-bosque hover:text-origen-pradera transition-colors"
              >
                #{orderNumber}
              </Link>
              <span className="text-xs text-gray-500">
                {date.toLocaleDateString('es-ES')}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">{customer}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500">{items} productos</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-origen-pradera">
              {total.toFixed(2)}€
            </p>
            <Badge 
              variant="outline" 
              className={cn("mt-1 text-xs", config.color)}
            >
              {config.label}
            </Badge>
          </div>
          
          <Link href={`/dashboard/pedidos/${id}`}>
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="text-gray-400 group-hover:text-origen-pradera transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}