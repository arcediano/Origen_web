/**
 * @component DashboardHeader
 * @description Cabecera ultra-minimalista con buscador integrado
 */

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Bell,
  Menu,
  Search,
  Settings,
} from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-30 transition-all duration-300',
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
    )}>
      <div className="flex items-center justify-between px-6 lg:px-8 h-16">
        {/* Menú móvil - CORREGIDO: size="icon" no existe, usamos size="icon-md" */}
        <Button variant="ghost" size="icon-md" onClick={onMenuClick} className="lg:hidden text-gray-600">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Buscador */}
        <div className="hidden lg:flex items-center flex-1 max-w-md ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos, pedidos..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-origen-menta/50 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Acciones derecha - CORREGIDO: size="icon-sm" es válido */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon-sm" className="relative text-gray-600">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="hidden lg:flex text-gray-600">
            <Settings className="w-4 h-4" />
          </Button>
          <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm cursor-pointer">
            <AvatarFallback className="bg-origen-crema text-origen-bosque text-xs">MM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}