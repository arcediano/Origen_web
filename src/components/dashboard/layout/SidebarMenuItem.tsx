/**
 * @component SidebarMenuItem
 * @description Item del menú principal con soporte para submenús
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { SidebarSubmenu } from './SidebarSubmenu';

interface SubmenuItem {
  id: string;
  label: string;
  href: string;
}

interface SidebarMenuItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  submenu?: SubmenuItem[];
  isActive?: boolean;
  defaultOpen?: boolean;
  onItemClick?: () => void;
}

export function SidebarMenuItem({
  id,
  label,
  icon: Icon,
  href,
  submenu,
  isActive: propIsActive,
  defaultOpen = false,
  onItemClick
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determinar si el ítem o alguno de sus subítems está activo
  const isActive = propIsActive !== undefined 
    ? propIsActive 
    : href 
      ? pathname === href
      : false;

  const hasActiveChild = submenu?.some(item => 
    pathname === item.href || 
    (item.href.includes('?') && pathname === item.href.split('?')[0])
  ) || false;

  // Abrir automáticamente si tiene un hijo activo
  useEffect(() => {
    if (hasActiveChild && !isOpen) {
      setIsOpen(true);
    }
  }, [hasActiveChild, isOpen]);

  if (!mounted) return null;

  // Si tiene submenú, renderizar con toggle
  if (submenu && submenu.length > 0) {
    return (
      <div className="space-y-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
            "hover:bg-origen-crema/80 group relative",
            (isActive || hasActiveChild) 
              ? "text-origen-bosque bg-origen-crema/50" 
              : "text-gray-600 hover:text-origen-bosque"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-5 h-5 flex items-center justify-center transition-colors",
              (isActive || hasActiveChild) 
                ? "text-origen-pradera" 
                : "text-gray-500 group-hover:text-origen-pradera"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <span>{label}</span>
          </div>
          
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            (isActive || hasActiveChild) 
              ? "text-origen-pradera" 
              : "text-gray-400"
          )} />
          
          {/* Indicador de active */}
          {(isActive || hasActiveChild) && (
            <motion.div
              layoutId="activeMenuItemIndicator"
              className="absolute left-0 w-1 h-6 bg-origen-pradera rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
        
        <SidebarSubmenu 
          items={submenu} 
          isOpen={isOpen} 
          onItemClick={onItemClick}
        />
      </div>
    );
  }

  // Si no tiene submenú, renderizar como link
  return (
    <Link
      href={href || '#'}
      onClick={onItemClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group",
        "hover:bg-origen-crema/80",
        isActive 
          ? "text-origen-bosque bg-origen-crema/50" 
          : "text-gray-600 hover:text-origen-bosque"
      )}
    >
      <div className={cn(
        "w-5 h-5 flex items-center justify-center transition-colors",
        isActive 
          ? "text-origen-pradera" 
          : "text-gray-500 group-hover:text-origen-pradera"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span>{label}</span>
      
      {/* Indicador de active */}
      {isActive && (
        <motion.div
          layoutId="activeMenuItemIndicator"
          className="absolute left-0 w-1 h-6 bg-origen-pradera rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}