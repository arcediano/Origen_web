/**
 * @component ProfileCard
 * @description Tarjeta de perfil para el dashboard
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  MapPin, 
  Calendar, 
  Users, 
  Edit, 
  Eye,
  CheckCircle2,
  Award,
  Leaf,
  Heart,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProfileCardProps {
  businessName: string;
  tagline?: string;
  logo?: string;
  banner?: string;
  city: string;
  province: string;
  foundedYear?: number;
  teamSize?: string;
  description?: string;
  values?: string[];
  certifications?: Array<{ name: string; verified: boolean }>;
  isVerified?: boolean;
  onEdit?: () => void;
  onViewStore?: () => void;
  className?: string;
}

export function ProfileCard({
  businessName,
  tagline,
  logo,
  banner,
  city,
  province,
  foundedYear,
  teamSize,
  description,
  values = [],
  certifications = [],
  isVerified = true,
  onEdit,
  onViewStore,
  className
}: ProfileCardProps) {
  const yearsOfExperience = foundedYear 
    ? new Date().getFullYear() - foundedYear 
    : null;

  const valueIcons: Record<string, { icon: React.ElementType; color: string }> = {
    tradicion: { icon: Clock, color: 'bg-amber-100 text-amber-800' },
    calidad: { icon: Award, color: 'bg-blue-100 text-blue-800' },
    familiar: { icon: Users, color: 'bg-green-100 text-green-800' },
    artesanal: { icon: Heart, color: 'bg-red-100 text-red-800' },
    ecologico: { icon: Leaf, color: 'bg-origen-pastel text-origen-bosque' },
    local: { icon: MapPin, color: 'bg-purple-100 text-purple-800' }
  };

  return (
    <Card className={cn(
      "overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all",
      className
    )}>
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-origen-pradera/20 to-origen-hoja/20 relative">
        {banner && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
          />
        )}
      </div>

      {/* Contenido */}
      <div className="px-6 pb-6">
        {/* Logo y nombre */}
        <div className="flex items-end gap-4 -mt-8 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {logo ? (
              <img src={logo} alt={businessName} className="w-full h-full object-cover" />
            ) : (
              <Store className="w-8 h-8 text-origen-bosque" />
            )}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-origen-bosque">{businessName}</h2>
              {isVerified && (
                <Badge variant="outline" className="bg-origen-crema/80 border-origen-pradera/30">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-origen-pradera" />
                  Verificado
                </Badge>
              )}
            </div>
            {tagline && (
              <p className="text-sm text-gray-600 italic">"{tagline}"</p>
            )}
          </div>
        </div>

        {/* Metadatos */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-origen-pradera" />
            {city}, {province}
          </span>
          {yearsOfExperience && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-origen-pradera" />
                {yearsOfExperience} años de experiencia
              </span>
            </>
          )}
          {teamSize && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-origen-pradera" />
                Equipo: {teamSize}
              </span>
            </>
          )}
        </div>

        {/* Valores */}
        {values.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {values.map((valueId) => {
              const value = valueIcons[valueId as keyof typeof valueIcons];
              if (!value) return null;
              const Icon = value.icon;
              return (
                <span
                  key={valueId}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    value.color
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {valueId.charAt(0).toUpperCase() + valueId.slice(1)}
                </span>
              );
            })}
          </div>
        )}

        {/* Certificaciones */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {certifications.map((cert, index) => (
              <span
                key={index}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                  cert.verified
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                )}
              >
                <Award className="w-3 h-3" />
                {cert.name}
                {cert.verified && (
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                )}
              </span>
            ))}
          </div>
        )}

        {/* Descripción */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <Button 
            size="sm" 
            className="bg-origen-bosque hover:bg-origen-pino text-white"
            onClick={onViewStore}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver tienda
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-gray-300"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar perfil
          </Button>
        </div>
      </div>
    </Card>
  );
}