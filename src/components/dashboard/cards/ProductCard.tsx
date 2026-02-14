/**
 * @component ProductCard
 * @description Tarjeta de producto para el dashboard
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Edit, 
  Copy, 
  Eye, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image?: string;
  category: string;
  sales?: number;
  revenue?: number;
  className?: string;
}

export function ProductCard({
  id,
  name,
  sku,
  price,
  comparePrice,
  stock,
  status,
  image,
  category,
  sales,
  revenue,
  className
}: ProductCardProps) {
  const statusConfig = {
    active: {
      label: 'Activo',
      icon: CheckCircle2,
      color: 'bg-green-100 text-green-700 border-green-200',
      iconColor: 'text-green-600'
    },
    inactive: {
      label: 'Inactivo',
      icon: XCircle,
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      iconColor: 'text-gray-600'
    },
    out_of_stock: {
      label: 'Sin stock',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-700 border-red-200',
      iconColor: 'text-red-600'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  return (
    <Card className={cn(
      "p-4 border border-gray-200 bg-white hover:shadow-md transition-all group",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Imagen */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-origen-crema to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <Link 
                href={`/dashboard/productos/${id}`}
                className="text-base font-semibold text-origen-bosque hover:text-origen-pradera transition-colors"
              >
                {name}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">SKU: {sku}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-500">{category}</span>
              </div>
            </div>

            <Badge 
              variant="outline" 
              className={cn("text-xs", config.color)}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>

          {/* Precio y stock */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-origen-pradera">
                {price.toFixed(2)}€
              </span>
              {comparePrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {comparePrice.toFixed(2)}€
                  </span>
                  <Badge variant="fruit" size="xs" className="bg-red-100 text-red-700">
                    -{discount}%
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                stock > 10 ? "text-green-600 bg-green-50" :
                stock > 0 ? "text-amber-600 bg-amber-50" :
                "text-red-600 bg-red-50"
              )}>
                Stock: {stock} uds
              </span>
            </div>
          </div>

          {/* Ventas (opcional) */}
          {(sales !== undefined || revenue !== undefined) && (
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-xs">
              {sales !== undefined && (
                <span className="text-gray-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-origen-pradera" />
                  {sales} vendidos
                </span>
              )}
              {revenue !== undefined && (
                <span className="text-gray-600">
                  {revenue.toFixed(2)}€ ingresos
                </span>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center gap-2 mt-3">
            <Link href={`/dashboard/productos/${id}`}>
              <Button size="xs" variant="ghost" className="text-gray-500 hover:text-origen-bosque">
                <Eye className="w-3.5 h-3.5 mr-1" />
                Ver
              </Button>
            </Link>
            <Link href={`/dashboard/productos/${id}/editar`}>
              <Button size="xs" variant="ghost" className="text-gray-500 hover:text-origen-bosque">
                <Edit className="w-3.5 h-3.5 mr-1" />
                Editar
              </Button>
            </Link>
            <Button size="xs" variant="ghost" className="text-gray-500 hover:text-origen-bosque">
              <Copy className="w-3.5 h-3.5 mr-1" />
              Duplicar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}