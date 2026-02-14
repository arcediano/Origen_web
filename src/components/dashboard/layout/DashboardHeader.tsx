/**
 * @component DashboardHeader
 * @description Header ultra minimalista con banner integrado
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarInitials } from '@/components/ui/avatar';
import { StatusBanner } from '@/components/shared/status/StatusBanner';
import { type SellerStatus } from '@/types/seller';

import {
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  User,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  producerStatus?: SellerStatus;
  statusDetails?: any;
}

export function DashboardHeader({ 
  onMenuClick,
  producerStatus = 'active',
  statusDetails
}: DashboardHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const producerData = {
    name: 'María Martínez',
    business: 'Quesería Artesana',
    email: 'maria@queseria.es',
    avatar: null
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-30 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="px-6 lg:px-8">
        {/* Fila de acciones */}
        <div className="flex items-center justify-between h-14">
          {/* Menú móvil */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/50"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden lg:block w-10" />

          {/* Acciones globales */}
          <div className="flex items-center gap-1 ml-auto">
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="relative text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/50"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="hidden lg:flex text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/50"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-origen-crema/50 transition-all group"
              >
                <Avatar size="xs" className="ring-2 ring-white shadow-sm">
                  <AvatarInitials>
                    {producerData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarInitials>
                </Avatar>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                  isProfileMenuOpen && "rotate-180"
                )} />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-origen-bosque">{producerData.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{producerData.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard/perfil"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-origen-crema/50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 text-origen-pradera" />
                      Mi perfil
                    </Link>
                    
                    <Link
                      href="/dashboard/configuracion"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-origen-crema/50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-origen-pradera" />
                      Configuración
                    </Link>
                    
                    <Link
                      href="/ayuda"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-origen-crema/50 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <HelpCircle className="w-4 h-4 text-origen-pradera" />
                      Centro de ayuda
                    </Link>
                    
                    <hr className="my-2 border-gray-100" />
                    
                    <button
                      onClick={() => {/* logout */}}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Banner de estado - MUCHO MÁS REDUCIDO */}
        {producerStatus !== 'active' && (
          <div className="pb-3">
            <StatusBanner 
              status={producerStatus}
              details={statusDetails}
            />
          </div>
        )}
      </div>
    </header>
  );
}