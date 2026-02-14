/**
 * @page ProducerDashboard
 * @description Página principal del dashboard del productor
 * 
 * @data-services
 * - GET /api/producer/profile - Obtener perfil del productor
 * - GET /api/dashboard/stats - Obtener estadísticas del dashboard
 * - GET /api/orders/recent?limit=3 - Obtener últimos pedidos
 * - GET /api/products/top?limit=3 - Obtener productos más vendidos
 * - GET /api/alerts - Obtener alertas del sistema
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarInitials } from '@/components/ui/avatar';
import { DashboardFooter } from '@/components/dashboard/layout/DashboardFooter';

import {
  Store,
  MapPin,
  Calendar,
  Users,
  Award,
  DollarSign,
  Shield,
  Heart,
  Sparkles,
  CheckCircle2,
  Package,
  Camera,
  TrendingUp,
  Settings,
  Edit,
  Eye,
  ShoppingBag,
  Truck,
  Clock,
  ChevronRight,
  AlertCircle,
  Star,
  BarChart3,
  ShoppingCart,
  ArrowUpRight
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface ProducerStats {
  visitsToday: number;
  visitsTrend: string;
  ordersToday: number;
  ordersTrend: string;
  rating: number;
  totalReviews: number;
  monthlyRevenue: number;
  revenueTrend: string;
  monthlyOrders: number;
  pendingOrders: number;
  productsCount: number;
  lowStockCount: number;
}

interface ProducerProfile {
  businessName: string;
  tagline: string;
  foundedYear: number;
  teamSize: string;
  city: string;
  province: string;
  values: string[];
  certifications: Array<{ name: string; verified: boolean }>;
}

interface RecentOrder {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  trend: string;
}

interface Alert {
  id: number;
  type: 'stock' | 'certification';
  message: string;
  severity: 'warning' | 'info';
}

// ============================================================================
// DATOS MOCK - REEMPLAZAR CON LLAMADAS A API
// ============================================================================

const MOCK_PRODUCER: ProducerProfile = {
  businessName: 'Quesería Artesana Valle',
  tagline: 'El sabor de la tradición desde 1985',
  foundedYear: 1985,
  teamSize: '6-10',
  city: 'Toledo',
  province: 'Toledo',
  values: ['tradicion', 'calidad', 'familiar'],
  certifications: [
    { name: 'Agricultura Ecológica', verified: true },
    { name: 'DOP Queso Manchego', verified: true }
  ]
};

const MOCK_STATS: ProducerStats = {
  visitsToday: 245,
  visitsTrend: '+12.5%',
  ordersToday: 18,
  ordersTrend: '+8.3%',
  rating: 4.9,
  totalReviews: 128,
  monthlyRevenue: 3450,
  revenueTrend: '+24.8%',
  monthlyOrders: 56,
  pendingOrders: 3,
  productsCount: 24,
  lowStockCount: 2
};

const MOCK_RECENT_ORDERS: RecentOrder[] = [
  { id: '1234', customer: 'Ana García', items: 2, total: 45.90, status: 'pending', date: '2024-03-12' },
  { id: '1233', customer: 'Carlos Rodríguez', items: 1, total: 28.50, status: 'shipped', date: '2024-03-11' },
  { id: '1232', customer: 'María López', items: 3, total: 67.30, status: 'delivered', date: '2024-03-10' }
];

const MOCK_TOP_PRODUCTS: TopProduct[] = [
  { name: 'Queso Curado 6 meses', sales: 45, revenue: 1102.50, trend: '+15%' },
  { name: 'Queso Semi 3 meses', sales: 38, revenue: 722.00, trend: '+8%' },
  { name: 'Queso Fresco', sales: 32, revenue: 416.00, trend: '+22%' }
];

const MOCK_ALERTS: Alert[] = [
  { id: 1, type: 'stock', message: 'Queso curado: quedan 8 unidades', severity: 'warning' },
  { id: 2, type: 'certification', message: 'Certificación ecológica por renovar (30 días)', severity: 'info' }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function ProducerDashboard() {
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 20) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  if (!mounted) return null;

  const yearsOfExperience = new Date().getFullYear() - MOCK_PRODUCER.foundedYear;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      {/* Cabecera de página */}
      <div className="px-6 lg:px-8 py-6 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">
              {greeting}, <span className="font-semibold text-origen-bosque">María</span> 👋
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
              Ver tienda
            </Button>
            <Link href="/dashboard/configuracion">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 lg:p-8 space-y-8"
      >
        {/* KPIs */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Visitas hoy</p>
                <p className="text-3xl font-semibold text-origen-bosque mt-2">{MOCK_STATS.visitsToday}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {MOCK_STATS.visitsTrend}
                  </span>
                  <span className="text-xs text-gray-400">vs ayer</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-origen-pradera" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pedidos hoy</p>
                <p className="text-3xl font-semibold text-origen-bosque mt-2">{MOCK_STATS.ordersToday}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {MOCK_STATS.ordersTrend}
                  </span>
                  <span className="text-xs text-gray-400">vs ayer</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-origen-pradera" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ingresos mensuales</p>
                <p className="text-3xl font-semibold text-origen-bosque mt-2">{MOCK_STATS.monthlyRevenue}€</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {MOCK_STATS.revenueTrend}
                  </span>
                  <span className="text-xs text-gray-400">vs mes anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-origen-pradera" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Valoración</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-semibold text-origen-bosque">{MOCK_STATS.rating}</p>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">{MOCK_STATS.totalReviews} reseñas</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-origen-pradera" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Perfil */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-origen-pradera/20 to-origen-hoja/20" />
              
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <Avatar size="xl" className="ring-4 ring-white shadow-lg">
                    <AvatarInitials>
                      {MOCK_PRODUCER.businessName.split(' ').map(n => n[0]).join('')}
                    </AvatarInitials>
                  </Avatar>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-origen-bosque">{MOCK_PRODUCER.businessName}</h3>
                      <Badge 
                        variant="outline" 
                        size="sm"
                        icon={<CheckCircle2 className="w-3 h-3 text-origen-pradera" />}
                        className="bg-origen-crema/50 border-origen-pradera/30"
                      >
                        Verificado
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 italic mt-0.5">"{MOCK_PRODUCER.tagline}"</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-origen-pradera" />
                    <span>{MOCK_PRODUCER.city}, {MOCK_PRODUCER.province}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-origen-pradera" />
                    <span>{yearsOfExperience} años de experiencia</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-origen-pradera" />
                    <span>Equipo: {MOCK_PRODUCER.teamSize} personas</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {MOCK_PRODUCER.certifications.map((cert, index) => (
                    <Badge 
                      key={index}
                      variant="success" 
                      size="sm"
                      icon={<Shield className="w-3 h-3" />}
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {cert.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Button size="sm" className="bg-origen-bosque hover:bg-origen-pino text-white flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver tienda
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-200 flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </Card>

            {MOCK_ALERTS.length > 0 && (
              <Card className="p-5 border border-amber-200/50 bg-amber-50/30 shadow-md hover:shadow-lg transition-all duration-300">
                <h4 className="text-sm font-medium text-amber-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Alertas ({MOCK_ALERTS.length})
                </h4>
                <div className="space-y-2">
                  {MOCK_ALERTS.map(alert => (
                    <div key={alert.id} className="flex items-start gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                      <span className="text-amber-700">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>

          {/* Columna derecha - Acciones y listados */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-sm font-medium text-gray-500 mb-4">ACCIONES RÁPIDAS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/dashboard/productos/nuevo" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-origen-crema/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center group-hover:bg-origen-pradera/20">
                    <Package className="w-6 h-6 text-origen-pradera" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Nuevo producto</span>
                </Link>
                <Link href="/dashboard/perfil/imagenes" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-origen-crema/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center group-hover:bg-origen-pradera/20">
                    <Camera className="w-6 h-6 text-origen-pradera" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Subir fotos</span>
                </Link>
                <Link href="/dashboard/estadisticas" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-origen-crema/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center group-hover:bg-origen-pradera/20">
                    <BarChart3 className="w-6 h-6 text-origen-pradera" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Estadísticas</span>
                </Link>
                <Link href="/dashboard/pedidos" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-origen-crema/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-origen-pradera/10 flex items-center justify-center group-hover:bg-origen-pradera/20">
                    <ShoppingCart className="w-6 h-6 text-origen-pradera" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Pedidos</span>
                </Link>
              </div>
            </Card>

            <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">ÚLTIMOS PEDIDOS</h3>
                <Link href="/dashboard/pedidos" className="text-xs text-origen-pradera hover:text-origen-bosque flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="space-y-3">
                {MOCK_RECENT_ORDERS.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-origen-pradera/5 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-origen-pradera" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">#{order.id}</span>
                          <span className="text-xs text-gray-500">{order.customer}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{order.items} productos</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-xs font-medium text-origen-pradera">{order.total.toFixed(2)}€</span>
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
                      <Button size="xs" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">PRODUCTOS MÁS VENDIDOS</h3>
                <Link href="/dashboard/productos" className="text-xs text-origen-pradera hover:text-origen-bosque flex items-center gap-1">
                  Ver catálogo
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {MOCK_TOP_PRODUCTS.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-6">{index + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} unidades vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-origen-pradera">{product.revenue.toFixed(2)}€</p>
                      <p className="text-xs text-green-600">{product.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <DashboardFooter />
    </div>
  );
}