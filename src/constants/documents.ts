/**
 * Documentos legales requeridos
 * @module constants/documents
 */

import { RequiredDocument } from '@/types/document';

export const REQUIRED_DOCUMENTS: RequiredDocument[] = [
  {
    type: 'cif_nie',
    name: 'CIF/NIF/NIE',
    description: 'Documento de identificación fiscal',
    mandatory: true,
  },
  {
    type: 'rgseaa',
    name: 'Registro RGSEAA',
    description: 'Registro General Sanitario de Empresas Alimentarias',
    mandatory: true,
  },
  {
    type: 'certificado_actividad',
    name: 'Certificado IAE',
    description: 'Alta en el Impuesto de Actividades Económicas',
    mandatory: true,
  },
  {
    type: 'seguro_responsabilidad',
    name: 'Seguro de Responsabilidad Civil',
    description: 'Póliza de seguro vigente',
    mandatory: true,
  },
  {
    type: 'manipulador_alimentos',
    name: 'Carnet de Manipulador de Alimentos',
    description: 'Certificado de formación en manipulación de alimentos',
    mandatory: true,
  },
  {
    type: 'haccp',
    name: 'Plan APPCC/HACCP',
    description: 'Plan de Análisis de Peligros y Puntos de Control Críticos',
    mandatory: true,
  },
  {
    type: 'licencia_actividad',
    name: 'Licencia de Actividad',
    description: 'Licencia municipal para ejercer la actividad',
    mandatory: true,
  },
  {
    type: 'libro_registro',
    name: 'Libro de Registro',
    description: 'Libro de registro de producción (solo agrícola/ganadero)',
    mandatory: true,
    appliesToCategories: ['agricola', 'ganadero'],
  },
  {
    type: 'certificado_ecologico',
    name: 'Certificado Ecológico',
    description: 'Certificación de producción ecológica (opcional)',
    mandatory: false,
  },
  {
    type: 'igp_dop',
    name: 'Certificación IGP/DOP',
    description: 'Indicación Geográfica Protegida o Denominación de Origen (opcional)',
    mandatory: false,
  },
  {
    type: 'escrituras_sociedad',
    name: 'Escrituras de Sociedad',
    description: 'Escrituras de constitución (solo si es empresa)',
    mandatory: false,
  },
];
