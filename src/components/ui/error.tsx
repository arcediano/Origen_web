/**
 * @file error.tsx
 * @description Componentes de error reutilizables para toda la aplicación
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  RefreshCw, 
  Home,
  ArrowLeft,
  Package,
  AlertTriangle,
  XCircle,
  WifiOff,
  Lock,
  ServerCrash
} from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

// ============================================================================
// TIPOS
// ============================================================================

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ErrorDisplayProps {
  /** Título del error */
  title?: string;
  /** Mensaje descriptivo */
  message: string;
  /** Severidad del error (determina el color) */
  severity?: ErrorSeverity;
  /** Tamaño del componente */
  size?: ErrorSize;
  /** Icono personalizado */
  icon?: React.ReactNode;
  /** Acción principal (botón) */
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  /** Acción secundaria */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Si debe mostrar el botón de reintentar */
  showRetry?: boolean;
  /** Función de reintento */
  onRetry?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export interface ErrorPageProps {
  /** Código de error (404, 500, etc.) */
  code?: string | number;
  /** Título del error */
  title?: string;
  /** Mensaje descriptivo */
  message?: string;
  /** Tipo de error */
  type?: 'not-found' | 'unauthorized' | 'forbidden' | 'server-error' | 'offline' | 'custom';
  /** Acción personalizada */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Si mostrar botón de volver */
  showBackButton?: boolean;
  /** Función al volver */
  onBack?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

export interface ErrorBoundaryProps {
  /** Componentes hijos */
  children: React.ReactNode;
  /** Fallback personalizado */
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  /** Función llamada al capturar error */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorToastProps {
  /** Mensaje del error */
  message: string;
  /** Si está visible */
  isVisible: boolean;
  /** Duración en ms (0 para no auto-cerrar) */
  duration?: number;
  /** Función al cerrar */
  onClose?: () => void;
  /** Posición del toast */
  position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Clase CSS adicional */
  className?: string;
}

export interface ErrorAlertProps {
  /** Mensaje del error */
  message: string;
  /** Título opcional */
  title?: string;
  /** Severidad */
  severity?: ErrorSeverity;
  /** Si se puede cerrar */
  dismissible?: boolean;
  /** Función al cerrar */
  onDismiss?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

// ============================================================================
// CONSTANTES Y MAPEOS
// ============================================================================

const severityConfig: Record<ErrorSeverity, { 
  icon: React.ElementType;
  bg: string;
  border: string;
  text: string;
  iconColor: string;
  buttonVariant: 'primary' | 'secondary' | 'outline' | 'destructive';
}> = {
  info: {
    icon: AlertCircle,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    iconColor: 'text-blue-500',
    buttonVariant: 'primary'
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    iconColor: 'text-amber-500',
    buttonVariant: 'secondary'
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    iconColor: 'text-red-500',
    buttonVariant: 'destructive'
  },
  critical: {
    icon: ServerCrash,
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-800',
    iconColor: 'text-red-600',
    buttonVariant: 'destructive'
  }
};

const errorTypeConfig: Record<string, { 
  code: string; 
  title: string; 
  message: string;
  icon: React.ElementType;
  defaultAction?: { label: string; to: string };
}> = {
  'not-found': {
    code: '404',
    title: 'Página no encontrada',
    message: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
    icon: Package,
    defaultAction: { label: 'Ir al inicio', to: '/' }
  },
  'unauthorized': {
    code: '401',
    title: 'No autorizado',
    message: 'Necesitas iniciar sesión para acceder a esta página.',
    icon: Lock,
    defaultAction: { label: 'Iniciar sesión', to: '/login' }
  },
  'forbidden': {
    code: '403',
    title: 'Acceso denegado',
    message: 'No tienes permiso para acceder a esta página.',
    icon: Lock
  },
  'server-error': {
    code: '500',
    title: 'Error del servidor',
    message: 'Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
    icon: ServerCrash
  },
  'offline': {
    code: '📡',
    title: 'Sin conexión',
    message: 'No hay conexión a internet. Verifica tu red e inténtalo de nuevo.',
    icon: WifiOff
  }
};

const sizeConfig: Record<ErrorSize, { 
  container: string;
  icon: string;
  title: string;
  message: string;
  button: string;
}> = {
  sm: {
    container: 'p-4',
    icon: 'w-8 h-8',
    title: 'text-sm',
    message: 'text-xs',
    button: 'h-8 px-3 text-xs'
  },
  md: {
    container: 'p-6',
    icon: 'w-12 h-12',
    title: 'text-base',
    message: 'text-sm',
    button: 'h-9 px-4 text-sm'
  },
  lg: {
    container: 'p-8',
    icon: 'w-16 h-16',
    title: 'text-lg',
    message: 'text-base',
    button: 'h-10 px-5 text-sm'
  },
  xl: {
    container: 'p-10',
    icon: 'w-20 h-20',
    title: 'text-xl',
    message: 'text-lg',
    button: 'h-11 px-6 text-base'
  }
};

// ============================================================================
// COMPONENTES
// ============================================================================

/**
 * Display de error para usar dentro de componentes
 * 
 * @example
 * <ErrorDisplay 
 *   title="Error al cargar"
 *   message="No se pudieron cargar los productos"
 *   onRetry={loadData}
 * />
 */
export function ErrorDisplay({ 
  title,
  message,
  severity = 'error',
  size = 'md',
  icon,
  action,
  secondaryAction,
  showRetry = true,
  onRetry,
  className 
}: ErrorDisplayProps) {
  const config = severityConfig[severity];
  const sizes = sizeConfig[size];
  const Icon = icon ? null : config.icon;

  return (
    <Card className={cn(
      'text-center',
      sizes.container,
      config.bg,
      config.border,
      className
    )}>
      <div className="flex flex-col items-center">
        {/* Icono */}
        <div className={cn('mb-3', sizes.icon)}>
          {icon || <Icon className={cn('w-full h-full', config.iconColor)} />}
        </div>

        {/* Título */}
        {title && (
          <h3 className={cn('font-semibold mb-1', sizes.title, config.text)}>
            {title}
          </h3>
        )}

        {/* Mensaje */}
        <p className={cn('text-gray-600 mb-4', sizes.message)}>
          {message}
        </p>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {showRetry && onRetry && (
            <Button
              onClick={onRetry}
              variant={config.buttonVariant}
              size={size === 'sm' ? 'sm' : 'md'}
              className={sizes.button}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          )}

          {action && (
            <Button
              onClick={action.onClick}
              variant={config.buttonVariant}
              size={size === 'sm' ? 'sm' : 'md'}
              className={sizes.button}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              size={size === 'sm' ? 'sm' : 'md'}
              className={sizes.button}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Página completa de error (para rutas de error)
 * 
 * @example
 * <ErrorPage type="not-found" />
 * <ErrorPage code="500" title="Error" message="Algo salió mal" />
 */
export function ErrorPage({ 
  code,
  title,
  message,
  type = 'custom',
  action,
  showBackButton = true,
  onBack,
  className 
}: ErrorPageProps) {
  const router = useRouter();
  const config = type !== 'custom' ? errorTypeConfig[type] : null;
  const Icon = config?.icon || AlertCircle;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-b from-white to-origen-crema',
      'flex items-center justify-center p-4',
      className
    )}>
      <Card className="p-8 sm:p-12 max-w-md w-full text-center">
        {/* Código de error */}
        {(code || config?.code) && (
          <div className="mb-4">
            <span className="text-6xl sm:text-7xl font-bold text-origen-pradera/20">
              {code || config?.code}
            </span>
          </div>
        )}

        {/* Icono */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-origen-pradera/50">
          <Icon className="w-full h-full" />
        </div>

        {/* Título */}
        <h1 className="text-xl sm:text-2xl font-bold text-origen-bosque mb-2">
          {title || config?.title || 'Error'}
        </h1>

        {/* Mensaje */}
        <p className="text-sm sm:text-base text-gray-600 mb-8">
          {message || config?.message || 'Ha ocurrido un error inesperado'}
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {showBackButton && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          )}

          {action ? (
            <Button
              onClick={action.onClick}
              className="w-full sm:w-auto bg-origen-bosque hover:bg-origen-pino"
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ) : config?.defaultAction ? (
            <Button
              onClick={() => router.push(config.defaultAction!.to)}
              className="w-full sm:w-auto bg-origen-bosque hover:bg-origen-pino"
            >
              <Home className="w-4 h-4 mr-2" />
              {config.defaultAction.label}
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

/**
 * Capturador de errores para componentes
 * 
 * @example
 * <ErrorBoundary fallback={<ErrorDisplay message="Algo salió mal" />}>
 *   <MiComponente />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean; error: Error | null }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!);
      }
      return this.props.fallback || (
        <ErrorDisplay
          title="Error inesperado"
          message={this.state.error?.message || 'Ha ocurrido un error en este componente'}
          severity="error"
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Toast para errores temporales
 * 
 * @example
 * <ErrorToast 
 *   isVisible={showError}
 *   message="Error al guardar"
 *   onClose={() => setShowError(false)}
 * />
 */
export function ErrorToast({ 
  message,
  isVisible,
  duration = 5000,
  onClose,
  position = 'bottom-right',
  className 
}: ErrorToastProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const positionClasses = {
    'top': 'top-4 left-1/2 -translate-x-1/2',
    'bottom': 'bottom-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'fixed z-50',
        positionClasses[position],
        className
      )}
    >
      <Card className="p-4 bg-red-50 border-red-200 shadow-lg flex items-center gap-3">
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <p className="text-sm text-red-700">{message}</p>
        <button
          onClick={() => {
            setShow(false);
            onClose?.();
          }}
          className="ml-auto text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </Card>
    </motion.div>
  );
}

/**
 * Alerta de error para usar en contexto
 * 
 * @example
 * <ErrorAlert 
 *   title="Error de validación"
 *   message="El nombre es obligatorio"
 *   severity="warning"
 *   dismissible
 *   onDismiss={() => setError(null)}
 * />
 */
export function ErrorAlert({ 
  message,
  title,
  severity = 'error',
  dismissible = true,
  onDismiss,
  className 
}: ErrorAlertProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={cn(
      'rounded-lg border p-4',
      config.bg,
      config.border,
      className
    )}>
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={cn('text-sm font-medium mb-1', config.text)}>
              {title}
            </h4>
          )}
          <p className={cn('text-sm', config.text)}>
            {message}
          </p>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn('text-gray-400 hover:text-gray-600')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Importaciones necesarias
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';