# 🌱 Origen - Panel de Vendedores v2.0

> Panel de administración para vendedores del marketplace Origen con flujo completo de alta y verificación.

## 📋 Características Principales

✅ **Registro Simplificado** - Formulario inicial de 2-3 minutos
✅ **Doble Aprobación** - Sistema de verificación en dos fases
✅ **Onboarding Completo** - 6 pasos guiados post-aprobación
✅ **Integración Stripe Connect** - Pagos automáticos con datos de ejemplo
✅ **Sistema de Estados** - 8 estados del vendedor perfectamente diferenciados
✅ **Documentación Legal** - Gestión completa de documentos requeridos
✅ **Regiones Turísticas** - Storytelling geográfico integrado
✅ **Código Limpio** - Estructura modular y bien documentada

---

## 🗂️ Estructura del Proyecto

```
origen-seller-panel-v2/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (public)/                 # Rutas públicas
│   │   │   └── register/             # Formulario de registro
│   │   ├── (auth)/                   # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── onboarding/           # Onboarding 6 pasos
│   │   ├── (dashboard)/              # Panel del vendedor
│   │   │   ├── dashboard/
│   │   │   ├── productos/
│   │   │   ├── pedidos/
│   │   │   └── configuracion/
│   │   ├── admin/                    # Panel de administración
│   │   │   ├── solicitudes/          # Aprobar vendedores
│   │   │   └── verificacion/         # Verificar documentos
│   │   └── api/                      # API Routes
│   │       ├── sellers/
│   │       ├── stripe/
│   │       └── admin/
│   │
│   ├── components/                   # Componentes React
│   │   ├── ui/                       # Componentes base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   ├── forms/                    # Componentes de formularios
│   │   │   ├── CategorySelector.tsx
│   │   │   ├── ProvinceSelect.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   └── ...
│   │   ├── onboarding/               # Flujo de onboarding
│   │   │   ├── OnboardingLayout.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── Step1Location.tsx
│   │   │   ├── Step2Story.tsx
│   │   │   ├── Step3Visual.tsx
│   │   │   ├── Step4Capacity.tsx
│   │   │   ├── Step5Documents.tsx
│   │   │   └── Step6Stripe.tsx
│   │   ├── dashboard/                # Componentes del dashboard
│   │   │   ├── StatusBanner.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── RecentOrders.tsx
│   │   │   └── ...
│   │   ├── admin/                    # Componentes admin
│   │   │   ├── PendingApprovals.tsx
│   │   │   ├── DocumentReview.tsx
│   │   │   └── ...
│   │   └── shared/                   # Componentes compartidos
│   │       ├── Logo.tsx
│   │       ├── Loading.tsx
│   │       └── ...
│   │
│   ├── lib/                          # Librerías y utilidades
│   │   ├── hooks/                    # Custom React Hooks
│   │   │   ├── useSellerStatus.ts
│   │   │   ├── useOnboarding.ts
│   │   │   └── ...
│   │   ├── utils/                    # Funciones utilidad
│   │   │   ├── cn.ts
│   │   │   ├── format.ts
│   │   │   └── ...
│   │   ├── validations/              # Schemas Zod
│   │   │   ├── seller.ts
│   │   │   ├── onboarding.ts
│   │   │   └── ...
│   │   └── stripe/                   # Configuración Stripe
│   │       ├── client.ts
│   │       ├── server.ts
│   │       └── config.ts
│   │
│   ├── types/                        # TypeScript Types
│   │   ├── seller.ts                 # Tipos del vendedor
│   │   ├── onboarding.ts             # Tipos del onboarding
│   │   ├── document.ts               # Tipos de documentos
│   │   └── ...
│   │
│   ├── constants/                    # Constantes de la app
│   │   ├── categories.ts             # Categorías de productores
│   │   ├── regions.ts                # Regiones turísticas
│   │   ├── documents.ts              # Documentos requeridos
│   │   └── seller-states.ts          # Estados del vendedor
│   │
│   └── mocks/                        # Datos de ejemplo
│       ├── sellers.ts
│       ├── products.ts
│       └── ...
│
├── public/                           # Archivos estáticos
│   ├── images/
│   └── ...
│
├── docs/                             # Documentación
│   ├── FLUJO-VENDEDOR.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── STRIPE-INTEGRATION.md
│
├── .env.example                      # Variables de entorno (ejemplo)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores. **Nota**: Los valores de Stripe son de ejemplo.

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

### 4. Abrir en el Navegador

```
http://localhost:3000
```

---

## 📖 Flujo Completo de Alta de Vendedor

### Fase 1: Registro Inicial (Público)
**URL**: `/register`
- Formulario simplificado (8 campos)
- 2-3 minutos para completar
- Estado resultante: `pending_approval`

### Fase 2: Primera Aprobación (Admin)
**URL**: `/admin/solicitudes`
- Admin revisa solicitud básica
- Aprueba/Rechaza
- Si aprueba:
  - Crea usuario
  - Envía credenciales por email
  - Estado: `approved_access`

### Fase 3: Onboarding (Vendedor - Post Login)
**URL**: `/onboarding`
- 6 pasos guiados:
  1. **Ubicación + Región Turística** 🗺️
  2. **Historia y Valores** 📖
  3. **Perfil Visual** 🎨
  4. **Capacidad y Entregas** 📦
  5. **Documentación Legal** ⚖️
  6. **Stripe Connect** 💳
- Estado: `onboarding_in_progress` → `pending_verification`

### Fase 4: Verificación (Admin)
**URL**: `/admin/verificacion`
- Admin verifica documentación legal
- Vendedor puede crear productos (draft)
- Si aprueba:
  - Estado: `active`
  - Productos se publican automáticamente

### Fase 5: Vendedor Activo
**URL**: `/dashboard`
- Puede vender
- Productos públicos
- Recibe pagos vía Stripe

---

## 🎨 Estados del Vendedor

| Estado | Login | Dashboard | Crear Productos | Publicar | Cobrar |
|--------|:-----:|:---------:|:---------------:|:--------:|:------:|
| `pending_approval` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `rejected` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `approved_access` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `onboarding_in_progress` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `pending_verification` | ✅ | ✅ | ✅ | ❌ | ❌ |
| **`active`** | ✅ | ✅ | ✅ | ✅ | ✅ |
| `suspended` | ✅ | 👁️ | ❌ | ❌ | ❌ |
| `deactivated` | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 💳 Integración con Stripe Connect

### Configuración de Ejemplo

El proyecto incluye configuración de Stripe con datos de ejemplo para desarrollo:

```typescript
// lib/stripe/config.ts
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  platformFeePercent: 15, // 15% de comisión para Origen
};
```

### Crear Cuenta Connect (Ejemplo)

```typescript
// lib/stripe/server.ts
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_CONFIG.secretKey, {
  apiVersion: '2024-12-18.acacia',
});

export async function createConnectAccount(sellerId: string, email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'ES',
    email,
    metadata: { sellerId },
  });
  
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/stripe/refresh`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/stripe/complete`,
    type: 'account_onboarding',
  });
  
  return { accountId: account.id, onboardingUrl: accountLink.url };
}
```

### Gestión de Comisiones

```typescript
// Al crear un pago
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000, // 50€
  currency: 'eur',
  application_fee_amount: 750, // 15% = 7.50€ para Origen
  transfer_data: {
    destination: vendedor.stripeAccountId,
  },
});
```

---

## 🔐 API Routes

### Registro y Aprobación

```typescript
POST   /api/sellers/register          // Registro inicial
GET    /api/admin/sellers/pending     // Solicitudes pendientes
POST   /api/admin/sellers/:id/approve // Aprobar vendedor
POST   /api/admin/sellers/:id/reject  // Rechazar vendedor
```

### Onboarding

```typescript
GET    /api/sellers/onboarding/status           // Estado del onboarding
PUT    /api/sellers/onboarding/step/:step       // Guardar paso
POST   /api/sellers/onboarding/documents        // Subir documentos
POST   /api/sellers/onboarding/stripe           // Crear cuenta Stripe
POST   /api/sellers/onboarding/complete         // Finalizar onboarding
```

### Verificación

```typescript
GET    /api/admin/sellers/verification-queue    // Vendedores pendientes
POST   /api/admin/sellers/:id/documents/:docId/verify  // Verificar documento
POST   /api/admin/sellers/:id/activate          // Activar vendedor
```

---

## 📚 Documentación Adicional

### Flujo Completo
Ver [`docs/FLUJO-VENDEDOR.md`](./docs/FLUJO-VENDEDOR.md) para diagramas detallados y explicación paso a paso.

### Arquitectura
Ver [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) para detalles técnicos de la implementación.

### API
Ver [`docs/API.md`](./docs/API.md) para documentación completa de endpoints.

### Stripe Integration
Ver [`docs/STRIPE-INTEGRATION.md`](./docs/STRIPE-INTEGRATION.md) para guía de integración con Stripe Connect.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.3.1 | Framework UI |
| **Next.js** | 15.1.0 | Framework fullstack |
| **TypeScript** | 5.6.3 | Type safety |
| **Tailwind CSS** | 3.4.15 | Styling |
| **Zod** | 3.23.8 | Validación |
| **React Hook Form** | 7.54.0 | Formularios |
| **Stripe** | 17.3.0 | Pagos |
| **Lucide React** | 0.468.0 | Iconos |
| **Radix UI** | Latest | Componentes accesibles |

---

## 🧪 Testing (Próximamente)

```bash
npm run test          # Ejecutar tests
npm run test:watch    # Modo watch
npm run test:coverage # Cobertura
```

---

## 🚢 Deployment

### Vercel (Recomendado)

```bash
vercel deploy
```

### Docker

```bash
docker build -t origen-seller-panel .
docker run -p 3000:3000 origen-seller-panel
```

---

## 📝 Licencia

Propiedad de Origen Marketplace S.L.

---

## 👥 Equipo

**Desarrollado con 🌱 por el equipo de Origen**

Para soporte: dev@origen.es

---

## 🗺️ Roadmap

### v2.0 (Actual)
- [x] Flujo completo de alta de vendedor
- [x] Sistema de estados
- [x] Integración Stripe Connect
- [x] Documentación legal

### v2.1 (Próximo)
- [ ] Dashboard completo de vendedor
- [ ] Gestión de productos
- [ ] Sistema de pedidos
- [ ] Analytics

### v3.0 (Futuro)
- [ ] App móvil
- [ ] Multi-idioma
- [ ] Integraciones avanzadas
- [ ] IA para recomendaciones

---

**Última actualización:** Febrero 2026
**Versión:** 2.0.0
