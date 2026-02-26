/**
 * @file useProductForm.ts
 * @description Hook global para la lógica del formulario de productos - VERSIÓN SIMPLIFICADA
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { PriceTier, ProductFormData, FormStepId, ProductCertification, ProductImage } from '@/types/product';
import { defaultFormData } from '@/types/product';
import { createProduct, saveProductDraft, suggestSku } from '@/lib/api/products';

// ============================================================================
// CONSTANTES
// ============================================================================

const STORAGE_KEY = 'origen-nuevo-producto-draft-v10';
const TOTAL_STEPS = 7;

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

export function useProductForm() {
  const router = useRouter();
  
  // Estado del formulario
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState<FormStepId>('basic');
  const [completedTabs, setCompletedTabs] = useState<Record<string, boolean>>({});
  
  // Estados de UI
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'pending_approval' | 'error'>('idle');
  const [skuSuggestion, setSkuSuggestion] = useState<string>('');
  
  // Estados de diálogos
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ==========================================================================
  // CARGAR BORRADOR
  // ==========================================================================

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        setLastSaved(new Date());
      } catch (e) {
        console.error('Error al cargar borrador:', e);
      }
    }
  }, []);

  // ==========================================================================
  // AUTO-GUARDADO
  // ==========================================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setIsAutoSaving(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setLastSaved(new Date());
        setTimeout(() => setIsAutoSaving(false), 500);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  // ==========================================================================
  // VALIDACIÓN DE PASOS COMPLETADOS
  // ==========================================================================

  useEffect(() => {
    const newCompleted: Record<string, boolean> = {
      basic: !!(formData.name && formData.categoryId),
      images: !!(formData.gallery && formData.gallery.length > 0),
      pricing: !!(formData.basePrice && formData.basePrice > 0),
      nutritional: !!(
        formData.nutritionalInfo?.servingSizeValue && 
        formData.nutritionalInfo?.ingredients?.length > 0
      ),
      production: !!(
        formData.productionInfo?.story || 
        formData.productionInfo?.origin || 
        (formData.productionInfo?.practices?.length || 0) > 0 || 
        (formData.productionInfo?.media?.length || 0) > 0
      ),
      inventory: true,
      certifications: true,
    };
    setCompletedTabs(newCompleted);
  }, [formData]);

  // ==========================================================================
  // OBTENER SUGERENCIA DE SKU
  // ==========================================================================

  useEffect(() => {
    const getSkuSuggestion = async () => {
      if (formData.name && formData.name.length >= 3 && formData.categoryId) {
        const response = await suggestSku(formData.name, formData.categoryId);
        if (response.data) {
          setSkuSuggestion(response.data.suggestedSku);
        }
      } else {
        setSkuSuggestion('');
      }
    };

    const timer = setTimeout(() => {
      getSkuSuggestion();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.name, formData.categoryId]);

  // ==========================================================================
  // HANDLERS DEL FORMULARIO - SIN CONVERSIONES
  // ==========================================================================

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleNestedChange = useCallback((section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof ProductFormData] as any || {}),
        [field]: value
      }
    }));
  }, []);

  const handlePriceTiersChange = useCallback((priceTiers: PriceTier[]) => {
    setFormData(prev => ({ ...prev, priceTiers }));
  }, []);

  // AHORA ES DIRECTO - MISMO TIPO
  const handleImagesChange = useCallback((images: ProductImage[]) => {
    setFormData(prev => ({ ...prev, gallery: images }));
  }, []);

  // ==========================================================================
  // ACCIONES PRINCIPALES
  // ==========================================================================

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
      await saveProductDraft(formData);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const handlePublish = useCallback(async () => {
    const allStepsCompleted = Object.keys(completedTabs).length === TOTAL_STEPS;
    if (!allStepsCompleted) return;
    
    setIsPublishing(true);
    setPublishStatus('idle');
    
    try {
      const response = await createProduct(formData);
      
      if (response.error) {
        setPublishStatus('error');
        return;
      }
      
      if (response.data) {
        const hasCertifications = formData.certifications.length > 0;
        const certificationsApproved = formData.certifications.every((c: ProductCertification) => c.verified) || false;
        
        if (hasCertifications && !certificationsApproved) {
          setPublishStatus('pending_approval');
        } else {
          setPublishStatus('success');
          setShowSuccessModal(true);
        }
        
        localStorage.removeItem(STORAGE_KEY);
      }
      
    } catch (error) {
      setPublishStatus('error');
    } finally {
      setIsPublishing(false);
    }
  }, [formData, completedTabs]);

  const handleCancel = useCallback(() => {
    router.push('/dashboard/products');
  }, [router]);

  // ==========================================================================
  // VALORES COMPUTADOS
  // ==========================================================================

  const allStepsCompleted = Object.keys(completedTabs).length === TOTAL_STEPS;
  const hasCertifications = formData.certifications.length > 0;
  const certificationsApproved = formData.certifications.every((c: ProductCertification) => c.verified) || false;

  return {
    // Estado
    formData,
    activeTab,
    setActiveTab,
    completedTabs,
    
    // UI
    isSaving,
    isAutoSaving,
    lastSaved,
    isPublishing,
    publishStatus,
    showCancelDialog,
    setShowCancelDialog,
    showSuccessModal,
    setShowSuccessModal,
    skuSuggestion,
    
    // Valores
    allStepsCompleted,
    hasCertifications,
    certificationsApproved,
    
    // Handlers - TODO DIRECTO, SIN CONVERSIONES
    handleInputChange,
    handleNestedChange,
    handlePriceTiersChange,
    handleImagesChange,      // ← Recibe ProductImage[] directamente
    handleSave,
    handlePublish,
    handleCancel,
  };
}