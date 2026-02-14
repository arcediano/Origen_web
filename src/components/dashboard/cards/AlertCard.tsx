/**
 * @component AlertCard
 * @description Tarjeta de alerta para el dashboard
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  X,
  ChevronRight
} from 'lucide-react';

interface AlertCardProps {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  link?: string;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function AlertCard({
  id,
  title,
  message,
  severity,
  link,
  onDismiss,
  className
}: AlertCardProps) {
  const severityConfig = {
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-500'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      iconColor: 'text-amber-500'
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-500'
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-500'
    }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "border p-4",
      config.bg,
      config.border,
      className
    )}>
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
        
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-semibold", config.text)}>
            {title}
          </h4>
          <p className={cn("text-xs mt-1", config.text)}>
            {message}
          </p>
          
          {link && (
            <Link 
              href={link}
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium mt-2",
                config.text,
                "hover:underline"
              )}
            >
              Ver detalles
              <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={() => onDismiss(id)}
            className={cn(
              "p-1 rounded-lg transition-colors",
              config.text,
              "hover:bg-black/5"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </Card>
  );
}