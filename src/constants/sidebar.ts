/**
 * @file sidebar.ts
 * @description Configuración del menú lateral del dashboard
 */

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Star,
  Megaphone,
  List,
  Plus,
  Archive,
  Clock,
  BarChart3,
  Tag,
  Ticket,
  TrendingUp,
  Users
} from 'lucide-react';

export interface SubmenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ElementType;
  badge?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  badge?: number;
  submenu?: (SubmenuItem | NestedMenuItem)[]; // Permitir submenús anidados
}

export interface NestedMenuItem extends SubmenuItem {
  submenu: SubmenuItem[]; // Para submenús de segundo nivel (como en campañas)
}

export const MENU_ITEMS: MenuItem[] = [
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
      { id: 'inventario', label: 'Inventario', href: '/dashboard/inventario', icon: Archive }
    ]
  },
  
  { 
    id: 'pedidos', 
    label: 'Pedidos', 
    icon: ShoppingBag, 
    href: '/dashboard/orders',
    badge: 3 // Total de pedidos en estado activo
  },
  
  { 
    id: 'resenas', 
    label: 'Reseñas', 
    icon: Star, 
    href: '/dashboard/reviews',
    badge: 4 // Total de reseñas pendientes de respuesta
  },
  
  { 
    id: 'marketing', 
    label: 'Marketing', 
    icon: Megaphone, 
    href: '/dashboard/marketing',
    submenu: [
      { id: 'panel', label: 'Panel de métricas', href: '/dashboard/marketing', icon: BarChart3 },
      { 
        id: 'campanas', 
        label: 'Campañas', 
        href: '/dashboard/marketing/campaigns', 
        icon: TrendingUp,
        submenu: [ // Esto ahora es válido gracias a NestedMenuItem
          { id: 'campanas-activas', label: 'Activas', href: '/dashboard/marketing/campaigns?status=active', icon: Clock },
          { id: 'campanas-historial', label: 'Historial', href: '/dashboard/marketing/campaigns/history', icon: Archive },
          { id: 'campanas-nueva', label: 'Nueva campaña', href: '/dashboard/marketing/campaigns/create', icon: Plus }
        ]
      },
      { id: 'ofertas', label: 'Ofertas', href: '/dashboard/marketing/offers', icon: Tag },
      { id: 'cupones', label: 'Cupones', href: '/dashboard/marketing/coupons', icon: Ticket }
    ]
  }
];