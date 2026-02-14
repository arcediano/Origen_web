/**
 * @component DashboardSidebar
 * @description Menú lateral simplificado y elegante
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
  TrendingUp,
  Store,
  Settings,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  LogOut,
  Bell
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: { count: number };
  submenu?: Array<{ id: string; label: string; href: string }>;
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
    href: '/dashboard/productos',
    submenu: [
      { id: 'todos', label: 'Todos los productos', href: '/dashboard/productos' },
      { id: 'nuevo', label: 'Añadir producto', href: '/dashboard/productos/nuevo' }
    ]
  },
  {
    id: 'pedidos',
    label: 'Pedidos',
    icon: ShoppingBag,
    href: '/dashboard/pedidos',
    badge: { count: 3 },
    submenu: [
      { id: 'todos', label: 'Todos los pedidos', href: '/dashboard/pedidos' },
      { id: 'pendientes', label: 'Pendientes', href: '/dashboard/pedidos?status=pending' }
    ]
  },
  {
    id: 'estadisticas',
    label: 'Estadísticas',
    icon: TrendingUp,
    href: '/dashboard/estadisticas'
  },
  {
    id: 'perfil',
    label: 'Mi perfil',
    icon: Store,
    href: '/dashboard/perfil'
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: Settings,
    href: '/dashboard/configuracion'
  }
];

// ============================================================================
// COMPONENTE SUBMENU
// ============================================================================

interface SubmenuProps {
  items: Array<{ id: string; label: string; href: string }>;
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
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pl-10 space-y-0.5 pt-1 pb-1">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm transition-all",
                    "hover:bg-origen-crema/80",
                    isActive && "bg-origen-crema text-origen-bosque font-medium"
                  )}
                >
                  <span className="truncate">{item.label}</span>
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

export function DashboardSidebar({ 
  isMobileOpen = false,
  onMobileClose
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    
    const initialOpenState: Record<string, boolean> = {};
    MENU_ITEMS.forEach(item => {
      if (item.submenu) {
        const hasActiveChild = item.submenu.some(sub => pathname === sub.href);
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
    if (onMobileClose) {
      onMobileClose();
    }
  };

  if (!mounted) return null;

  // Versión móvil
  if (isMobileOpen) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
        
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl lg:hidden overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-origen-bosque to-origen-pino flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="3"/>
                    <path d="M100 140 L100 80" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M100 90 Q85 75, 75 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M100 90 Q115 75, 125 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="100" cy="140" r="8" fill="white"/>
                    <circle cx="100" cy="140" r="5" fill="#74C69D"/>
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-origen-bosque">ORIGEN</span>
                  <p className="text-xs text-gray-500">Panel de productor</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onMobileClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const hasActiveChild = item.submenu?.some(sub => pathname === sub.href);
                const isOpen = openSubmenus[item.id];

                return (
                  <div key={item.id} className="mb-1">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                            "hover:bg-origen-crema/80",
                            (isActive || hasActiveChild) && "bg-origen-crema text-origen-bosque"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={cn(
                              "w-5 h-5",
                              (isActive || hasActiveChild) ? "text-origen-pradera" : "text-gray-500"
                            )} />
                            <span>{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <Badge variant="warning" size="xs" className="bg-red-500 text-white">
                                {item.badge.count}
                              </Badge>
                            )}
                            <ChevronDown className={cn(
                              "w-4 h-4 transition-transform",
                              isOpen ? "rotate-180" : "",
                              (isActive || hasActiveChild) ? "text-origen-pradera" : "text-gray-400"
                            )} />
                          </div>
                        </button>
                        {item.submenu && (
                          <Submenu 
                            items={item.submenu} 
                            isOpen={isOpen} 
                            onItemClick={handleItemClick}
                          />
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleItemClick}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          "hover:bg-origen-crema/80",
                          isActive && "bg-origen-crema text-origen-bosque"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn(
                            "w-5 h-5",
                            isActive ? "text-origen-pradera" : "text-gray-500"
                          )} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="warning" size="xs" className="bg-red-500 text-white">
                            {item.badge.count}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-200">
              <Link
                href="/ayuda"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-origen-crema/80 transition-all"
                onClick={handleItemClick}
              >
                <HelpCircle className="w-5 h-5 text-gray-500" />
                <span>Centro de ayuda</span>
              </Link>
              <button
                onClick={() => {/* logout */}}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all mt-1"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </motion.aside>
      </>
    );
  }

  // Versión desktop - SIN PROPIEDAD isCollapsed
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-origen-bosque to-origen-pino flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="3"/>
              <path d="M100 140 L100 80" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              <path d="M100 90 Q85 75, 75 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M100 90 Q115 75, 125 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="100" cy="140" r="8" fill="white"/>
              <circle cx="100" cy="140" r="5" fill="#74C69D"/>
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold text-origen-bosque">ORIGEN</span>
            <p className="text-xs text-gray-500">Panel de productor</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const hasActiveChild = item.submenu?.some(sub => pathname === sub.href);
            const isOpen = openSubmenus[item.id];

            return (
              <div key={item.id} className="mb-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        "hover:bg-origen-crema/80",
                        (isActive || hasActiveChild) && "bg-origen-crema text-origen-bosque"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn(
                          "w-5 h-5",
                          (isActive || hasActiveChild) ? "text-origen-pradera" : "text-gray-500"
                        )} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge variant="warning" size="xs" className="bg-red-500 text-white">
                            {item.badge.count}
                          </Badge>
                        )}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          isOpen ? "rotate-180" : "",
                          (isActive || hasActiveChild) ? "text-origen-pradera" : "text-gray-400"
                        )} />
                      </div>
                    </button>
                    {item.submenu && (
                      <Submenu 
                        items={item.submenu} 
                        isOpen={isOpen} 
                      />
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      "hover:bg-origen-crema/80",
                      isActive && "bg-origen-crema text-origen-bosque"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-origen-pradera" : "text-gray-500"
                      )} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="warning" size="xs" className="bg-red-500 text-white">
                        {item.badge.count}
                      </Badge>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-gray-200">
          <Link
            href="/ayuda"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-origen-crema/80 transition-all"
          >
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <span>Centro de ayuda</span>
          </Link>
          <button
            onClick={() => {/* logout */}}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all mt-1"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
}