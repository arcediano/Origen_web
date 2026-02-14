/**
 * @page PedidosPage
 * @description Gestión de pedidos de clientes
 * 
 * @data-services
 * - GET /api/orders - Obtener listado de pedidos
 * - GET /api/orders/search?q=:query - Buscar pedidos
 * - GET /api/orders/:id - Obtener detalle del pedido
 * - PUT /api/orders/:id/status - Actualizar estado del pedido
 */

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Eye, ShoppingBag } from 'lucide-react';

export default function PedidosPage() {
  return (
    <div className="w-full">
      {/* Cabecera de página */}
      <div className="px-6 lg:px-8 py-6 border-b border-gray-200/50 bg-white/30">
        <div>
          <h1 className="text-2xl font-semibold text-origen-bosque">Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona los pedidos de tus clientes</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 lg:p-8">
        <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Buscar por número de pedido o cliente..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: '1234', customer: 'Ana García', date: '12/03/2024', total: 45.90, status: 'pending' as const },
              { id: '1233', customer: 'Carlos Rodríguez', date: '11/03/2024', total: 28.50, status: 'shipped' as const },
              { id: '1232', customer: 'María López', date: '10/03/2024', total: 67.30, status: 'delivered' as const }
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-origen-pradera/5 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-origen-pradera" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-origen-bosque">#{order.id}</span>
                      <span className="text-sm text-gray-500">{order.customer}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{order.date}</span>
                      <span className="text-sm font-semibold text-origen-pradera">{order.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {order.status === 'pending' && (
                    <Badge variant="warning" size="sm">Pendiente</Badge>
                  )}
                  {order.status === 'shipped' && (
                    <Badge variant="info" size="sm">Enviado</Badge>
                  )}
                  {order.status === 'delivered' && (
                    <Badge variant="success" size="sm">Entregado</Badge>
                  )}
                  <Link href={`/dashboard/pedidos/${order.id}`}>
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}