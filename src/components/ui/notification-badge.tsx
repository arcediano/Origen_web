/**
 * @component NotificationBadge
 * @description Badge para notificaciones
 */

'use client';

import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function NotificationBadge({ 
  count, 
  className,
  size = 'md' 
}: NotificationBadgeProps) {
  const sizeClasses = {
    sm: 'min-w-[1.2rem] h-5 text-[10px]',
    md: 'min-w-[1.5rem] h-6 text-xs'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium text-white shadow-sm bg-origen-pradera',
        sizeClasses[size],
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}