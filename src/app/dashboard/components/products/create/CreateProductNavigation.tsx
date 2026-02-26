/**
 * @file CreateProductNavigation.tsx
 * @description Botones de navegación entre pasos y acciones de guardar/publicar
 */

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Save, Send, RefreshCw, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FORM_STEPS } from '@/types/product';

// ============================================================================
// TIPOS
// ============================================================================

export interface CreateProductNavigationProps {
  /** Paso actual */
  currentTab: string;
  /** Función para cambiar de paso */
  onTabChange: (tab: string) => void;
  /** Pasos completados */
  completedTabs: Record<string, boolean>;
  /** Función para guardar */
  onSave: () => void;
  /** Si está guardando */
  isSaving: boolean;
  /** Si todos los pasos están completados */
  allStepsCompleted: boolean;
  /** Si tiene certificaciones */
  hasCertifications: boolean;
  /** Si las certificaciones están aprobadas */
  certificationsApproved: boolean;
  /** Función para publicar */
  onPublish: () => void;
  /** Si está publicando */
  isPublishing: boolean;
  /** Estado de publicación */
  publishStatus: 'idle' | 'success' | 'pending_approval' | 'error';
  /** Clase CSS adicional */
  className?: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Botones de navegación entre pasos y acciones de guardar/publicar
 */
export function CreateProductNavigation({
  currentTab,
  onTabChange,
  onSave,
  isSaving,
  allStepsCompleted,
  onPublish,
  isPublishing,
  publishStatus,
  className,
}: CreateProductNavigationProps) {
  const currentIndex = FORM_STEPS.findIndex(s => s.id === currentTab);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === FORM_STEPS.length - 1;
  const prevStep = !isFirstStep ? FORM_STEPS[currentIndex - 1].id : null;
  const nextStep = !isLastStep ? FORM_STEPS[currentIndex + 1].id : null;

  const handleNext = () => {
    if (nextStep) {
      onTabChange(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (prevStep) {
      onTabChange(prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canPublish = allStepsCompleted;

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200', className)}>
      {/* Botón anterior */}
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={isFirstStep}
        leftIcon={<ChevronLeft className="w-4 h-4" />}
      >
        Anterior
      </Button>

      {/* Acciones centrales */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {/* Botón guardar */}
        <Button
          variant="outline"
          onClick={onSave}
          disabled={isSaving}
          leftIcon={isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        >
          {isSaving ? 'Guardando...' : 'Guardar'}
        </Button>

        {/* Botón siguiente o publicar */}
        {isLastStep ? (
          <Button
            variant="primary"
            onClick={onPublish}
            disabled={isPublishing || !canPublish}
            leftIcon={isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            className={!canPublish ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isPublishing ? 'Publicando...' : 'Publicar'}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Siguiente
          </Button>
        )}
      </div>

      {/* Mensajes de estado (solo en el último paso) */}
      {isLastStep && publishStatus === 'pending_approval' && (
        <div className="mt-4 w-full p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2">
          <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            Pendiente de aprobación por certificaciones
          </p>
        </div>
      )}

      {isLastStep && publishStatus === 'success' && (
        <div className="mt-4 w-full p-3 bg-green-50 rounded-lg border border-green-200 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
          <p className="text-xs text-green-700">
            ¡Publicado con éxito!
          </p>
        </div>
      )}
    </div>
  );
}