/**
 * @component SidebarSubmenu
 * @description Submenú desplegable con animación premium
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SubmenuItem {
  id: string;
  label: string;
  href: string;
}

interface SidebarSubmenuProps {
  items: SubmenuItem[];
  isOpen: boolean;
  onItemClick?: () => void;
}

export function SidebarSubmenu({ items, isOpen, onItemClick }: SidebarSubmenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-2 pb-1 pl-11 space-y-0.5">
            {items.map((item) => {
              const isActive = pathname === item.href || 
                (item.href.includes('?') && pathname === item.href.split('?')[0]);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                    "hover:bg-origen-crema/80 group relative",
                    isActive 
                      ? "text-origen-bosque font-medium bg-origen-crema/50" 
                      : "text-gray-600 hover:text-origen-bosque"
                  )}
                >
                  <ChevronRight className={cn(
                    "w-3.5 h-3.5 transition-all",
                    isActive 
                      ? "text-origen-pradera opacity-100" 
                      : "text-gray-400 opacity-50 group-hover:opacity-100 group-hover:text-origen-pradera"
                  )} />
                  <span>{item.label}</span>
                  
                  {/* Indicador de active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSubmenuIndicator"
                      className="absolute left-0 w-1 h-5 bg-origen-pradera rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}