/**
 * @page EstadisticasPage
 * @description Página de estadísticas y analytics del dashboard
 * 
 * @data-services
 * - GET /api/stats/kpi - Obtener KPIs principales
 * - GET /api/stats/sales - Obtener datos de ventas para gráficos
 * - GET /api/products/top - Obtener productos más vendidos
 * - POST /api/stats/export - Exportar datos a CSV/PDF
 */

'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, ShoppingBag, Euro, Download } from 'lucide-react';

export default function EstadisticasPage() {
  return (
    <div className="w-full">
      {/* Cabecera de página */}
      <div className="px-6 lg:px-8 py-6 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-origen-bosque">Estadísticas</h1>
            <p className="text-sm text-gray-500 mt-1">Analiza el rendimiento de tu tienda</p>
          </div>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 lg:p-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ingresos mensuales</p>
                <p className="text-2xl font-semibold text-origen-bosque mt-1">2.450€</p>
                <span className="text-xs text-green-600">+34% vs mes anterior</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Euro className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pedidos</p>
                <p className="text-2xl font-semibold text-origen-bosque mt-1">48</p>
                <span className="text-xs text-green-600">+28% vs mes anterior</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Clientes</p>
                <p className="text-2xl font-semibold text-origen-bosque mt-1">124</p>
                <span className="text-xs text-green-600">+15% vs mes anterior</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ticket medio</p>
                <p className="text-2xl font-semibold text-origen-bosque mt-1">51€</p>
                <span className="text-xs text-green-600">+7% vs mes anterior</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-origen-bosque">Ventas por día</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" size="sm">Semana</Badge>
                <Badge variant="outline" size="sm">Mes</Badge>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-lg">
              <p className="text-gray-400">Gráfico de ventas</p>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-origen-bosque">Productos más vendidos</h3>
              <Link href="/dashboard/productos" className="text-xs text-origen-pradera hover:text-origen-bosque">
                Ver todos
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Queso Curado', sales: 124, revenue: '2.976€' },
                { name: 'Queso Semi', sales: 89, revenue: '1.691€' },
                { name: 'Queso Fresco', sales: 67, revenue: '837€' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50/50 rounded-lg">
                  <span className="text-sm font-medium text-origen-bosque">{product.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">{product.sales} uds</span>
                    <span className="text-sm font-semibold text-origen-pradera">{product.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}