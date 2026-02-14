/**
 * @component CertificationCard
 * @description Tarjeta de certificación para el dashboard
 * @version 1.0.0
 */

'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Download,
  Eye,
  X
} from 'lucide-react';

interface CertificationCardProps {
  id: string;
  name: string;
  issuingBody: string;
  status: 'pending' | 'verified' | 'expired';
  document?: string;
  expiryDate?: Date;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function CertificationCard({
  id,
  name,
  issuingBody,
  status,
  document,
  expiryDate,
  onView,
  onDownload,
  onDelete,
  className
}: CertificationCardProps) {
  const statusConfig = {
    verified: {
      label: 'Verificado',
      icon: CheckCircle2,
      color: 'bg-green-100 text-green-700 border-green-200',
      iconColor: 'text-green-600'
    },
    pending: {
      label: 'Pendiente',
      icon: Clock,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      iconColor: 'text-amber-600'
    },
    expired: {
      label: 'Expirado',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-700 border-red-200',
      iconColor: 'text-red-600'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const isExpiringSoon = expiryDate && 
    new Date(expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000;

  return (
    <Card className={cn(
      "p-4 border border-gray-200 bg-white hover:shadow-md transition-all",
      className
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          config.color.replace('text-', 'bg-').replace('border-', '')
        )}>
          <Award className={cn("w-5 h-5", config.iconColor)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-origen-bosque">{name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{issuingBody}</p>
            </div>
            
            <Badge 
              variant="outline" 
              className={cn("text-xs", config.color)}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>

          {expiryDate && (
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-3.5 h-3.5 text-gray-400" />
              <span className={cn(
                "text-xs",
                isExpiringSoon ? "text-amber-600" : "text-gray-600"
              )}>
                Válido hasta: {expiryDate.toLocaleDateString('es-ES')}
                {isExpiringSoon && " (próximo a vencer)"}
              </span>
            </div>
          )}

          {document && (
            <div className="flex items-center gap-2 mt-3">
              <Button 
                size="xs" 
                variant="ghost" 
                className="text-gray-500 hover:text-origen-bosque"
                onClick={onView}
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                Ver documento
              </Button>
              <Button 
                size="xs" 
                variant="ghost" 
                className="text-gray-500 hover:text-origen-bosque"
                onClick={onDownload}
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Descargar
              </Button>
              {status === 'pending' && (
                <Button 
                  size="xs" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={onDelete}
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Eliminar
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}