# 📁 Estructura Completa del Proyecto

## ✅ Archivos Implementados

### 📂 Configuración (Raíz)
```
✅ package.json              - Dependencias y scripts
✅ tsconfig.json             - Configuración TypeScript
✅ tailwind.config.ts        - Configuración Tailwind + Paleta Origen
✅ next.config.js            - Configuración Next.js
✅ postcss.config.js         - Configuración PostCSS
✅ .env.example              - Variables de entorno con datos Stripe de ejemplo
✅ .gitignore                - Archivos a ignorar
✅ .eslintrc.json            - Configuración ESLint
✅ README.md                 - Documentación principal
✅ INSTALLATION.md           - Guía de instalación
```

### 📂 src/app/ - Páginas Next.js App Router
```
✅ layout.tsx                - Layout raíz
✅ page.tsx                  - Página principal (redirige a /register)
✅ globals.css               - Estilos globales con Tailwind

📂 register/
  ✅ page.tsx                - Formulario de registro

📂 dashboard/
  ✅ layout.tsx              - Layout del dashboard con sidebar
  ✅ page.tsx                - Dashboard principal del vendedor

📂 api/
  📂 sellers/
    📂 register/
      ✅ route.ts            - POST - Registrar vendedor
  📂 stripe/
    📂 connect/
      ✅ route.ts            - POST - Crear cuenta Connect
```

### 📂 src/components/
```
📂 ui/ - Componentes base (shadcn/ui)
  ✅ button.tsx              - Botón con variantes Origen
  ✅ input.tsx               - Input de texto
  ✅ textarea.tsx            - Área de texto
  ✅ label.tsx               - Etiqueta
  ✅ checkbox.tsx            - Checkbox
  ✅ select.tsx              - Select dropdown
  ✅ progress.tsx            - Barra de progreso

📂 forms/
  ✅ SimpleRegistration.tsx  - Formulario de registro completo

📂 dashboard/
  ✅ StatusBanner.tsx        - Banner de estado del vendedor

📂 onboarding/
  ✅ OnboardingLayout.tsx    - Layout con progress bar
  ✅ StepIndicator.tsx       - Indicador visual de pasos

📂 shared/
  ✅ Logo.tsx                - Logo de Origen
  ✅ Loading.tsx             - Spinner de carga
```

### 📂 src/lib/
```
✅ utils.ts                  - Utilidades (cn, formatFileSize, formatCurrency)

📂 stripe/
  ✅ config.ts               - Configuración Stripe Connect
  ✅ server.ts               - Funciones servidor Stripe

📂 validations/
  ✅ seller.ts               - Schemas Zod (5 pasos)
```

### 📂 src/types/
```
✅ index.ts                  - Exportaciones centrales
✅ seller.ts                 - Tipos de vendedor (8 estados)
✅ document.ts               - Tipos de documentos
```

### 📂 src/constants/
```
✅ index.ts                  - Exportaciones centrales
✅ categories.ts             - 6 categorías de productores
✅ provinces.ts              - 50 provincias de España
✅ regions.ts                - Regiones turísticas
✅ documents.ts              - 11 tipos de documentos legales
✅ seller-states.ts          - Configuración de estados
```

### 📂 src/mocks/
```
✅ sellers.ts                - Datos de ejemplo para desarrollo
```

### 📂 docs/
```
✅ FLUJO-VENDEDOR.md         - Documentación completa del flujo
```

---

## 🎯 Estado de Implementación

### ✅ COMPLETAMENTE IMPLEMENTADO

1. **Sistema de Tipos TypeScript**
   - SellerStatus (8 estados)
   - ProducerCategory (6 categorías)
   - DocumentType (11 tipos)
   - Todos los interfaces necesarios

2. **Configuración de Stripe Connect**
   - Datos de ejemplo en .env.example
   - Funciones para crear cuentas Express
   - Gestión de Account Links
   - Cálculo automático de comisiones (15%)

3. **Formulario de Registro**
   - Validación con Zod
   - UI completa con Tailwind
   - Estados de éxito/error
   - API Route funcional

4. **Componentes UI Base**
   - 7 componentes esenciales
   - Totalmente tipados
   - Estilizados con paleta Origen

5. **Sistema de Estados**
   - Configuración de permisos por estado
   - StatusBanner adaptable
   - Lógica de transiciones documentada

6. **Constantes**
   - Categorías con subcategorías
   - Provincias españolas
   - Regiones turísticas (Madrid, Cáceres)
   - Documentos legales con descripciones

7. **Utilidades**
   - Formateo de moneda (EUR)
   - Formateo de tamaño de archivos
   - Combinación de clases (cn)
   - Formateo de fechas

8. **Dashboard Base**
   - Layout con sidebar
   - Navegación funcional
   - Cards de estadísticas
   - Integración con StatusBanner

9. **Mock Data**
   - Vendedores de ejemplo
   - Útil para desarrollo sin BD

---

## 🔧 POR IMPLEMENTAR (Próximas fases)

### Fase 1: Completar Onboarding
```
📂 src/components/onboarding/
  ⬜ Step1Location.tsx      - Ubicación + región turística
  ⬜ Step2Story.tsx         - Historia del negocio
  ⬜ Step3Visual.tsx        - Banner, logo, galería
  ⬜ Step4Capacity.tsx      - Capacidad y entregas
  ⬜ Step5Documents.tsx     - Subida de documentos
  ⬜ Step6Stripe.tsx        - Configuración Stripe

📂 src/app/onboarding/
  ⬜ page.tsx               - Orquestador de 6 pasos
```

### Fase 2: Dashboard Completo
```
📂 src/app/dashboard/
  ⬜ productos/page.tsx     - Gestión de productos
  ⬜ pedidos/page.tsx       - Lista de pedidos
  ⬜ configuracion/page.tsx - Configuración de cuenta
```

### Fase 3: Panel de Administración
```
📂 src/app/admin/
  ⬜ solicitudes/page.tsx   - Aprobar solicitudes
  ⬜ verificacion/page.tsx  - Verificar documentos
```

### Fase 4: API Routes Adicionales
```
📂 src/app/api/
  ⬜ sellers/onboarding/route.ts    - Guardar pasos
  ⬜ sellers/documents/route.ts     - Subir documentos
  ⬜ admin/approve/route.ts         - Aprobar vendedor
  ⬜ admin/verify/route.ts          - Verificar docs
```

### Fase 5: Autenticación
```
⬜ Integrar NextAuth.js
⬜ Providers (Email, Google)
⬜ Protección de rutas
⬜ Sesiones y middleware
```

### Fase 6: Base de Datos
```
⬜ Schema Prisma/Drizzle
⬜ Migraciones
⬜ Seeders con mock data
⬜ Queries optimizadas
```

### Fase 7: File Storage
```
⬜ Integración AWS S3
⬜ Upload de imágenes
⬜ Upload de documentos
⬜ Generación de thumbnails
```

### Fase 8: Emails
```
⬜ Templates de emails
⬜ Notificaciones automáticas
⬜ Integración Resend/SendGrid
```

---

## 📊 Progreso General

```
██████████████████████████░░░░░░░░░░░░░░ 60%

✅ Fundamentos: 100%
✅ UI Base: 100%
✅ Tipos: 100%
✅ Stripe Config: 100%
✅ Registro: 100%
⬜ Onboarding: 20%
⬜ Dashboard: 30%
⬜ Admin Panel: 0%
⬜ Auth: 0%
⬜ Database: 0%
```

---

## 🚀 Uso del Proyecto Actual

### Instalación
```bash
npm install
cp .env.example .env.local
npm run dev
```

### Rutas Funcionales
```
✅ http://localhost:3000/register      - Formulario registro
✅ http://localhost:3000/dashboard     - Dashboard vendedor
✅ POST /api/sellers/register          - Endpoint registro
✅ POST /api/stripe/connect            - Crear cuenta Stripe
```

### Testing con Mock Data
```typescript
import { MOCK_SELLERS } from '@/mocks/sellers';

// Usar vendedor de ejemplo
const seller = MOCK_SELLERS[0]; // Estado: active
```

---

## 📝 Notas Importantes

1. **Stripe**: Los datos en `.env.example` son de ejemplo para desarrollo. No funcionan en producción real.

2. **Base de Datos**: Actualmente los API routes devuelven mock data. Necesitas implementar Prisma/Drizzle.

3. **Autenticación**: No hay autenticación implementada. Las rutas del dashboard son públicas.

4. **File Upload**: Necesitas configurar AWS S3 o similar para subir archivos reales.

5. **Emails**: Los comentarios en el código indican dónde enviar emails, pero no están implementados.

---

## 🎨 Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.tsx`
- Utilidades: `camelCase.ts`
- Tipos: `camelCase.ts`
- Constantes: `kebab-case.ts`

### Estructura de Componentes
```typescript
/**
 * Descripción breve
 * @component NombreComponente
 * @description Descripción detallada (opcional)
 */

'use client'; // Solo si usa hooks

import ...

interface Props {
  // Props documentadas
}

export function NombreComponente({ props }: Props) {
  // Código
}
```

### Imports
```typescript
// 1. React
import { useState } from 'react';

// 2. Next.js
import Link from 'next/link';

// 3. Externos
import { z } from 'zod';

// 4. Internos (@/)
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 5. Tipos
import type { Seller } from '@/types/seller';
```

---

**Última actualización**: Febrero 2026  
**Versión Implementada**: 2.0
