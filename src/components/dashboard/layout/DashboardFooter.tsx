/**
 * @component DashboardFooter
 * @description Pie de página del dashboard con enlaces y métricas
 * 
 * @data-services
 * - GET /api/stats/global - Obtener estadísticas globales (productores totales, etc.)
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  Shield, 
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';

interface DashboardFooterProps {
  className?: string;
}

export function DashboardFooter({ className }: DashboardFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "mt-auto border-t border-gray-100 bg-white/30 backdrop-blur-sm",
      className
    )}>
      <div className="px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Copyright + marca */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center">
                <span className="text-xs font-bold text-white">O</span>
              </div>
              <span className="text-sm font-medium text-origen-bosque">Origen Marketplace</span>
            </div>
            <p className="text-xs text-gray-400">
              © {currentYear} Todos los derechos reservados
            </p>
          </div>

          {/* Métricas rápidas */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-origen-pradera" />
              <div className="text-left">
                <p className="text-xs font-medium text-origen-bosque">+34%</p>
                <p className="text-[10px] text-gray-500">este mes</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-origen-pradera" />
              <div className="text-left">
                <p className="text-xs font-medium text-origen-bosque">+500</p>
                <p className="text-[10px] text-gray-500">productores</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-origen-pradera" />
              <div className="text-left">
                <p className="text-xs font-medium text-origen-bosque">24h</p>
                <p className="text-[10px] text-gray-500">soporte</p>
              </div>
            </div>
          </div>

          {/* Enlaces legales */}
          <div className="flex items-center gap-4 text-xs">
            <Link 
              href="/privacidad" 
              className="text-gray-400 hover:text-origen-pradera transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Privacidad
            </Link>
            <span className="text-gray-300">·</span>
            <Link 
              href="/terminos" 
              className="text-gray-400 hover:text-origen-pradera transition-colors"
            >
              Términos
            </Link>
            <span className="text-gray-300">·</span>
            <Link 
              href="/cookies" 
              className="text-gray-400 hover:text-origen-pradera transition-colors"
            >
              Cookies
            </Link>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-origen-pradera fill-origen-pradera/30" />
            <span>para productores locales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}