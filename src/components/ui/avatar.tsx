/**
 * @file avatar.tsx
 * @description Componente Avatar accesible con diseño orgánico
 * @version 1.2.0 - CORREGIDO: Eliminadas redeclaraciones de variables
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { User, CheckCircle, Clock, XCircle } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'verified';
  bordered?: boolean;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  fallbackDelay?: number;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// CONSTANTES
// ============================================================================

const STATUS_COLORS = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
  verified: 'bg-origen-pradera'
};

// ============================================================================
// COMPONENTE AVATAR
// ============================================================================

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({
  className,
  size = 'md',
  shape = 'circle',
  status,
  bordered = false,
  src,
  alt = 'Avatar',
  fallback,
  fallbackDelay = 0,
  ...props
}, ref) => {
  
  const [imageError, setImageError] = React.useState(false);
  const [showFallback, setShowFallback] = React.useState(fallbackDelay === 0);
  
  React.useEffect(() => {
    if (fallbackDelay > 0) {
      const timer = setTimeout(() => setShowFallback(true), fallbackDelay);
      return () => clearTimeout(timer);
    }
  }, [fallbackDelay]);
  
  // ========================================================================
  // TAMAÑOS
  // ========================================================================
  
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  };

  // ========================================================================
  // FORMAS
  // ========================================================================
  
  const shapeClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-lg'
  };

  // ========================================================================
  // HANDLERS
  // ========================================================================
  
  const handleImageError = () => {
    setImageError(true);
    setShowFallback(true);
  };

  // ========================================================================
  // RENDER
  // ========================================================================
  
  const shouldShowImage = src && !imageError;
  const shouldShowFallback = showFallback && (!shouldShowImage || fallback);

  return (
    <div className="relative inline-flex">
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden",
          "bg-gradient-to-br from-origen-pradera/10 to-origen-hoja/10",
          "text-origen-bosque font-medium",
          sizeClasses[size],
          shapeClasses[shape],
          bordered && "ring-2 ring-white shadow-md",
          className
        )}
        {...props}
      >
        {/* Imagen */}
        {shouldShowImage && (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={handleImageError}
          />
        )}
        
        {/* Fallback */}
        {shouldShowFallback && (
          <div className="flex h-full w-full items-center justify-center bg-inherit">
            {fallback || <User className="h-1/2 w-1/2" />}
          </div>
        )}
      </div>

      {/* Indicador de estado */}
      {status && status !== 'verified' && (
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5",
          size === 'xs' && "h-2 w-2",
          size === 'sm' && "h-2.5 w-2.5",
          size === 'md' && "h-3 w-3",
          size === 'lg' && "h-3.5 w-3.5",
          size === 'xl' && "h-4 w-4",
          "rounded-full border-2 border-white",
          STATUS_COLORS[status]
        )} />
      )}

      {/* Icono de verificación */}
      {status === 'verified' && (
        <div className={cn(
          "absolute -bottom-1 -right-1",
          "rounded-full bg-origen-pradera text-white",
          "flex items-center justify-center",
          "border border-white",
          size === 'xs' && "h-3 w-3",
          size === 'sm' && "h-3.5 w-3.5",
          size === 'md' && "h-4 w-4",
          size === 'lg' && "h-4.5 w-4.5",
          size === 'xl' && "h-5 w-5"
        )}>
          <CheckCircle className={cn(
            size === 'xs' && "h-2 w-2",
            size === 'sm' && "h-2.5 w-2.5",
            size === 'md' && "h-3 w-3",
            size === 'lg' && "h-3.5 w-3.5",
            size === 'xl' && "h-4 w-4"
          )} />
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// ============================================================================
// COMPONENTE AVATAR GROUP
// ============================================================================

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(({
  className,
  children,
  max = 4,
  spacing = 'normal',
  size = 'md',
  ...props
}, ref) => {
  
  const spacingClasses = {
    tight: '-space-x-2',
    normal: '-space-x-3',
    loose: '-space-x-4'
  };

  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center",
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {visibleChildren}
      
      {remainingCount > 0 && (
        <Avatar size={size} className="ring-2 ring-white">
          +{remainingCount}
        </Avatar>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

// ============================================================================
// COMPONENTES DE AYUDA (CON NOMBRES ÚNICOS)
// ============================================================================

export const AvatarImg: React.FC<{ src: string; alt?: string } & React.HTMLAttributes<HTMLDivElement>> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <Avatar src={src} alt={alt} className={className} {...props} />
);

export const AvatarInitials: React.FC<{ children?: React.ReactNode; delayMs?: number } & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  delayMs,
  className,
  ...props
}) => (
  <Avatar 
    fallback={children} 
    fallbackDelay={delayMs} 
    className={className} 
    {...props} 
  />
);

// ============================================================================
// EXPORT (SIN REDECLARACIONES)
// ============================================================================

export { 
  Avatar, 
  AvatarGroup
};