/**
 * Layout del dashboard
 * @description Layout compartido para todas las páginas del dashboard
 */

import { Logo } from '@/components/shared/Logo';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="px-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-origen-crema rounded-lg transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link
            href="/dashboard/productos"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-origen-crema rounded-lg transition"
          >
            <Package className="w-5 h-5" />
            <span>Productos</span>
          </Link>
          
          <Link
            href="/dashboard/pedidos"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-origen-crema rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
          
          <Link
            href="/dashboard/configuracion"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-origen-crema rounded-lg transition"
          >
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition w-full">
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
