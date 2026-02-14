/**
 * @component StatsCard
 * @description Tarjeta de estadísticas para el dashboard
 * @version 1.0.0
 */

'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  color?: 'default' | 'green' | 'blue' | 'amber' | 'purple';
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'default',
  className
}: StatsCardProps) {
  const colorClasses = {
    default: {
      bg: 'bg-origen-pradera/10',
      text: 'text-origen-pradera',
      icon: 'text-origen-pradera'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: 'text-green-600'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: 'text-blue-600'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      icon: 'text-amber-600'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      icon: 'text-purple-600'
    }
  };

  return (
    <Card className={cn(
      "p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-origen-bosque">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{trend.value}%</span>
              </div>
              {trend.label && (
                <span className="text-xs text-gray-500">{trend.label}</span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          colorClasses[color].bg
        )}>
          <Icon className={cn("w-5 h-5", colorClasses[color].icon)} />
        </div>
      </div>
    </Card>
  );
}