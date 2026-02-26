/**
 * @component DashboardSidebar
 * @description Menú lateral premium con estilos según Manual de Marca Origen v1.0
 * 
 * @features
 * - Colores exactos del manual (#1B4332 Verde Bosque, #74C69D Verde Pradera, #06D6A0 Menta Vibrante)
 * - Badges con Menta Vibrante (#06D6A0) para notificaciones importantes
 * - Submenús con margen izquierdo reducido (pl-7)
 * - Efectos hover con Verde Pradera (#74C69D) a 10% de opacidad
 * - Indicador activo con Menta Vibrante (#06D6A0)
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Leaf,
  ChevronDown,
  Plus,
  List,
  TrendingUp,
  Users,
  FileText,
  CreditCard,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  DollarSign,
  Award,
  Megaphone,
  Tag,
  Ticket,
  Star,
  MessageSquare,
  BarChart3,
  Archive,
  AlertCircle,
  User,
  Bell,
  Shield,
  Globe,
  Mail,
  Share2,
  Sparkles,
  Heart,
  Home
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface SubmenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ElementType;
  badge?: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: number;
  submenu?: SubmenuItem[];
}

// ============================================================================
// CONFIGURACIÓN DEL MENÚ
// ============================================================================

const MENU_ITEMS: MenuItem[] = [
  { 
    id: 'inicio', 
    label: 'Inicio', 
    icon: LayoutDashboard, 
    href: '/dashboard' 
  },
  
  { 
    id: 'productos', 
    label: 'Productos', 
    icon: Package, 
    href: '/dashboard/products',
    submenu: [
      { id: 'todos-productos', label: 'Todos los productos', href: '/dashboard/products', icon: List },
      { id: 'nuevo-producto', label: 'Añadir producto', href: '/dashboard/products/create', icon: Plus },
      { id: 'categorias', label: 'Categorías', href: '/dashboard/products/categorias', icon: Package },
      { id: 'inventario', label: 'Inventario', href: '/dashboard/inventario', icon: Archive },
      { id: 'precios', label: 'Precios y ofertas', href: '/dashboard/precios', icon: Tag },
      { id: 'historial', label: 'Historial', href: '/dashboard/historial', icon: Clock }
    ]
  },
  
  { 
    id: 'marketing', 
    label: 'Marketing', 
    icon: Megaphone, 
    href: '/dashboard/marketing',
    badge: 2,
    submenu: [
      { id: 'panel-marketing', label: 'Panel', href: '/dashboard/marketing', icon: BarChart3 },
      { id: 'campanas', label: 'Campañas', href: '/dashboard/marketing/campanas', icon: Megaphone, badge: 2 },
      { id: 'ofertas', label: 'Ofertas', href: '/dashboard/marketing/ofertas', icon: Tag },
      { id: 'cupones', label: 'Cupones', href: '/dashboard/marketing/cupones', icon: Ticket }
    ]
  },
  
  { 
    id: 'resenas', 
    label: 'Reseñas', 
    icon: Star, 
    href: '/dashboard/resenas',
    badge: 5,
    submenu: [
      { id: 'todas-resenas', label: 'Todas las reseñas', href: '/dashboard/resenas', icon: MessageSquare },
      { id: 'pendientes', label: 'Pendientes', href: '/dashboard/resenas/pendientes', icon: Clock, badge: 5 },
      { id: 'analisis', label: 'Análisis', href: '/dashboard/resenas/analisis', icon: BarChart3 }
    ]
  },
  
  { 
    id: 'pedidos', 
    label: 'Pedidos', 
    icon: ShoppingBag, 
    href: '/dashboard/pedidos',
    badge: 3,
    submenu: [
      { id: 'todos-pedidos', label: 'Todos los pedidos', href: '/dashboard/pedidos', icon: List },
      { id: 'pendientes', label: 'Pendientes', href: '/dashboard/pedidos?status=pending', icon: Clock, badge: 2 },
      { id: 'procesando', label: 'Procesando', href: '/dashboard/pedidos?status=processing', icon: Package, badge: 1 },
      { id: 'enviados', label: 'Enviados', href: '/dashboard/pedidos?status=shipped', icon: Truck },
      { id: 'entregados', label: 'Entregados', href: '/dashboard/pedidos?status=delivered', icon: CheckCircle }
    ]
  },
  
  { 
    id: 'estadisticas', 
    label: 'Estadísticas', 
    icon: TrendingUp, 
    href: '/dashboard/estadisticas',
    submenu: [
      { id: 'ventas', label: 'Ventas', href: '/dashboard/estadisticas/ventas', icon: DollarSign },
      { id: 'productos-top', label: 'Productos top', href: '/dashboard/estadisticas/products', icon: Package },
      { id: 'clientes', label: 'Clientes', href: '/dashboard/estadisticas/clientes', icon: Users }
    ]
  }
];

const USER_SECTIONS = [
  { 
    id: 'perfil', 
    label: 'Mi Perfil', 
    icon: User, 
    href: '/dashboard/perfil',
    submenu: [
      { id: 'informacion', label: 'Información personal', href: '/dashboard/perfil', icon: User },
      { id: 'certificaciones', label: 'Certificaciones', href: '/dashboard/perfil/certificaciones', icon: Award },
      { id: 'ubicacion', label: 'Dirección', href: '/dashboard/perfil/ubicacion', icon: MapPin },
      { id: 'notificaciones', label: 'Notificaciones', href: '/dashboard/perfil/notificaciones', icon: Bell, badge: 3 }
    ]
  },
  { 
    id: 'configuracion', 
    label: 'Configuración', 
    icon: Settings, 
    href: '/dashboard/configuracion',
    submenu: [
      { id: 'tienda', label: 'Mi tienda', href: '/dashboard/configuracion/tienda', icon: Store },
      { id: 'envios', label: 'Métodos de envío', href: '/dashboard/configuracion/envios', icon: Truck },
      { id: 'pagos', label: 'Métodos de pago', href: '/dashboard/configuracion/pagos', icon: CreditCard },
      { id: 'facturacion', label: 'Facturación', href: '/dashboard/configuracion/facturacion', icon: FileText },
      { id: 'privacidad', label: 'Privacidad', href: '/dashboard/configuracion/privacidad', icon: Shield }
    ]
  }
];

// ============================================================================
// COMPONENTE BADGE CON COLORES DEL MANUAL (Menta Vibrante #06D6A0)
// ============================================================================

const NotificationBadge = ({ count }: { count: number }) => {
  return (
    <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-white text-xs font-medium shadow-sm"
          style={{ background: '#06D6A0' }} // Menta Vibrante exacto del manual
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

// ============================================================================
// COMPONENTE SUBMENU CON MARGEN REDUCIDO
// ============================================================================

interface SubmenuProps {
  items: SubmenuItem[];
  isOpen: boolean;
  onItemClick?: () => void;
}

const Submenu = ({ items, isOpen, onItemClick }: SubmenuProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {/* Margen izquierdo reducido a pl-7 (28px) */}
          <div className="pl-7 pr-3 py-1 space-y-0.5">
            {items.map((item) => {
              const isActive = pathname === item.href || 
                (item.href.includes('?') && pathname === item.href.split('?')[0]);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                    "hover:bg-[#74C69D]/10", // Verde Pradera al 10% según manual
                    isActive 
                      ? "bg-[#74C69D]/10 text-[#1B4332] font-medium" // Verde Bosque para texto activo
                      : "text-[#666666] hover:text-[#1B4332]"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {Icon && (
                      <Icon className={cn(
                        "w-4 h-4 flex-shrink-0",
                        isActive ? "text-[#06D6A0]" : "text-[#999999]" // Menta Vibrante para iconos activos
                      )} />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <NotificationBadge count={item.badge} />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ isMobileOpen = false, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    
    // Abrir submenús automáticamente si hay un hijo activo
    const initialOpenState: Record<string, boolean> = {};
    
    [...MENU_ITEMS, ...USER_SECTIONS].forEach(item => {
      if (item.submenu) {
        const hasActiveChild = item.submenu.some(sub => 
          pathname === sub.href || (sub.href.includes('?') && pathname === sub.href.split('?')[0])
        );
        if (hasActiveChild) {
          initialOpenState[item.id] = true;
        }
      }
    });
    
    setOpenSubmenus(initialOpenState);
  }, [pathname]);

  const toggleSubmenu = (itemId: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleItemClick = () => {
    if (onMobileClose) onMobileClose();
  };

  if (!mounted) return null;

  // ===== VERSIÓN MÓVIL =====
  if (isMobileOpen) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl lg:hidden flex flex-col"
        >
          {/* Cabecera Móvil */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                   style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #74C69D 100%)' }}>
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-semibold tracking-wide" style={{ color: '#1B4332' }}>origen.</span>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onMobileClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navegación Móvil */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-0.5">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.href ? pathname === item.href : false;
                const hasActiveChild = item.submenu?.some(sub => 
                  pathname === sub.href || (sub.href.includes('?') && pathname === sub.href.split('?')[0])
                );
                const isOpen = openSubmenus[item.id];

                return (
                  <li key={item.id}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            "hover:bg-[#74C69D]/10",
                            (isActive || hasActiveChild) && "bg-[#74C69D]/10"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Icon className={cn(
                              "w-5 h-5 flex-shrink-0",
                              (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                            )} />
                            <span className={cn(
                              "truncate",
                              (isActive || hasActiveChild) ? "text-[#1B4332] font-medium" : "text-[#666666]"
                            )}>
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {item.badge && (
                              <NotificationBadge count={item.badge} />
                            )}
                            <ChevronDown className={cn(
                              "w-4 h-4 transition-transform flex-shrink-0",
                              isOpen ? "rotate-180" : "",
                              (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                            )} />
                          </div>
                        </button>
                        <Submenu 
                          items={item.submenu} 
                          isOpen={isOpen} 
                          onItemClick={handleItemClick}
                        />
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={handleItemClick}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                          "hover:bg-[#74C69D]/10",
                          isActive && "bg-[#74C69D]/10"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Icon className={cn(
                            "w-5 h-5 flex-shrink-0",
                            isActive ? "text-[#06D6A0]" : "text-[#999999]"
                          )} />
                          <span className={cn(
                            "truncate",
                            isActive ? "text-[#1B4332] font-medium" : "text-[#666666]"
                          )}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <NotificationBadge count={item.badge} />
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Separador */}
            <div className="my-4 mx-2 border-t border-gray-100" />

            {/* Secciones de Usuario */}
            <ul className="space-y-0.5">
              {USER_SECTIONS.map((item) => {
                const Icon = item.icon;
                const isActive = item.href ? pathname === item.href : false;
                const hasActiveChild = item.submenu?.some(sub => 
                  pathname === sub.href || (sub.href.includes('?') && pathname === sub.href.split('?')[0])
                );
                const isOpen = openSubmenus[item.id];

                return (
                  <li key={item.id}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                            "hover:bg-[#74C69D]/10",
                            (isActive || hasActiveChild) && "bg-[#74C69D]/10"
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Icon className={cn(
                              "w-5 h-5 flex-shrink-0",
                              (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                            )} />
                            <span className={cn(
                              "truncate",
                              (isActive || hasActiveChild) ? "text-[#1B4332] font-medium" : "text-[#666666]"
                            )}>
                              {item.label}
                            </span>
                          </div>
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform flex-shrink-0",
                            isOpen ? "rotate-180" : "",
                            (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                          )} />
                        </button>
                        <Submenu 
                          items={item.submenu} 
                          isOpen={isOpen} 
                          onItemClick={handleItemClick}
                        />
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={handleItemClick}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                          "hover:bg-[#74C69D]/10",
                          isActive && "bg-[#74C69D]/10"
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 flex-shrink-0",
                          isActive ? "text-[#06D6A0]" : "text-[#999999]"
                        )} />
                        <span className={cn(
                          "truncate",
                          isActive ? "text-[#1B4332] font-medium" : "text-[#666666]"
                        )}>
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Móvil */}
          <div className="p-3 border-t border-gray-100">
            <Link href="/ayuda" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#666666] hover:bg-gray-50 transition-all">
              <HelpCircle className="w-5 h-5 text-[#999999]" />
              <span>Centro de ayuda</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all mt-1">
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </motion.aside>
      </>
    );
  }

  // ===== VERSIÓN DESKTOP =====
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-100 z-40 hidden lg:flex flex-col shadow-xl shadow-black/[0.02]">
      {/* Logo con gradiente del manual */}
      <div className="flex items-center gap-2 px-5 py-7">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
             style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #74C69D 100%)' }}>
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-wide" style={{ color: '#1B4332' }}>origen.</span>
        <span className="ml-auto text-[10px] font-medium px-2 py-1 bg-gray-100 rounded-full" style={{ color: '#666666' }}>v2.0</span>
      </div>

      {/* Navegación Desktop */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href ? pathname === item.href : false;
            const hasActiveChild = item.submenu?.some(sub => 
              pathname === sub.href || (sub.href.includes('?') && pathname === sub.href.split('?')[0])
            );
            const isOpen = openSubmenus[item.id];

            return (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={cn(
                        "group relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                        "hover:bg-[#74C69D]/10",
                        (isActive || hasActiveChild) && "bg-[#74C69D]/10"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Icon className={cn(
                          "w-5 h-5 flex-shrink-0 transition-colors",
                          (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999] group-hover:text-[#06D6A0]"
                        )} />
                        <span className={cn(
                          "truncate",
                          (isActive || hasActiveChild) ? "text-[#1B4332] font-medium" : "text-[#666666]"
                        )}>
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.badge && (
                          <NotificationBadge count={item.badge} />
                        )}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          isOpen ? "rotate-180" : "",
                          (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                        )} />
                      </div>
                      
                      {/* Indicador activo con Menta Vibrante */}
                      {(isActive || hasActiveChild) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 w-1 h-6 rounded-full"
                          style={{ background: '#06D6A0' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                    <Submenu items={item.submenu} isOpen={isOpen} />
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "group relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                      "hover:bg-[#74C69D]/10",
                      isActive && "bg-[#74C69D]/10"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Icon className={cn(
                        "w-5 h-5 flex-shrink-0 transition-colors",
                        isActive ? "text-[#06D6A0]" : "text-[#999999] group-hover:text-[#06D6A0]"
                      )} />
                      <span className={cn(
                        "truncate",
                        isActive ? "text-[#1B4332] font-medium" : "text-[#666666]"
                      )}>
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <NotificationBadge count={item.badge} />
                    )}
                    
                    {/* Indicador activo con Menta Vibrante */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-1 h-6 rounded-full"
                        style={{ background: '#06D6A0' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Separador */}
        <div className="my-4 mx-2 border-t border-gray-100" />

        {/* Secciones de Usuario */}
        <ul className="space-y-0.5">
          {USER_SECTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href ? pathname === item.href : false;
            const hasActiveChild = item.submenu?.some(sub => 
              pathname === sub.href || (sub.href.includes('?') && pathname === sub.href.split('?')[0])
            );
            const isOpen = openSubmenus[item.id];

            return (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={cn(
                        "group relative w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                        "hover:bg-[#74C69D]/10",
                        (isActive || hasActiveChild) && "bg-[#74C69D]/10"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Icon className={cn(
                          "w-5 h-5 flex-shrink-0 transition-colors",
                          (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999] group-hover:text-[#06D6A0]"
                        )} />
                        <span className={cn(
                          "truncate",
                          (isActive || hasActiveChild) ? "text-[#1B4332] font-medium" : "text-[#666666]"
                        )}>
                          {item.label}
                        </span>
                      </div>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen ? "rotate-180" : "",
                        (isActive || hasActiveChild) ? "text-[#06D6A0]" : "text-[#999999]"
                      )} />
                      
                      {/* Indicador activo con Menta Vibrante */}
                      {(isActive || hasActiveChild) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 w-1 h-6 rounded-full"
                          style={{ background: '#06D6A0' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                    <Submenu items={item.submenu} isOpen={isOpen} />
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                      "hover:bg-[#74C69D]/10",
                      isActive && "bg-[#74C69D]/10"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive ? "text-[#06D6A0]" : "text-[#999999] group-hover:text-[#06D6A0]"
                    )} />
                    <span className={cn(
                      "truncate",
                      isActive ? "text-[#1B4332] font-medium" : "text-[#666666]"
                    )}>
                      {item.label}
                    </span>
                    
                    {/* Indicador activo con Menta Vibrante */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-1 h-6 rounded-full"
                        style={{ background: '#06D6A0' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <Link href="/ayuda" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#666666] hover:bg-gray-50 transition-all">
          <HelpCircle className="w-5 h-5 text-[#999999]" />
          <span>Ayuda</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all mt-1">
          <LogOut className="w-5 h-5" />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  );
}