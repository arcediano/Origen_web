/**
 * @file Loading.tsx
 * @description Componente de carga premium - 100% responsive
 */

import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ 
  size = 'md', 
  text = 'Cargando...', 
  fullScreen = false,
  className 
}: LoadingProps) {
  const sizeClasses = {
    sm: {
      spinner: 'w-6 h-6 sm:w-8 sm:h-8',
      text: 'text-xs sm:text-sm',
      container: 'p-4 sm:p-6',
    },
    md: {
      spinner: 'w-8 h-8 sm:w-10 sm:h-10',
      text: 'text-sm sm:text-base',
      container: 'p-6 sm:p-8',
    },
    lg: {
      spinner: 'w-10 h-10 sm:w-12 sm:h-12',
      text: 'text-base sm:text-lg',
      container: 'p-8 sm:p-10',
    },
  };

  const sz = sizeClasses[size];

  const content = (
    <div className={cn(
      "flex flex-col items-center gap-2 sm:gap-3",
      sz.container,
      className
    )}>
      <div className={cn(
        "border-4 border-origen-crema border-t-origen-menta rounded-full animate-spin",
        sz.spinner
      )} />
      {text && (
        <p className={cn(
          "text-gray-600",
          sz.text
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}