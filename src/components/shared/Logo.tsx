/**
 * Componente Logo de Origen
 * @component Logo
 */

import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'bg-origen-bosque rounded-full flex items-center justify-center',
        sizes[size]
      )}>
        <Leaf className="w-5 h-5 text-white" />
      </div>
      {showText && (
        <span className={cn('font-bold text-origen-bosque', textSizes[size])}>
          ORIGEN
        </span>
      )}
    </div>
  );
}
