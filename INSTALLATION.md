# 📦 Guía de Instalación - Origen Seller Panel

> **Proyecto funcional con flujo completo de alta de vendedor integrado**

## 🎯 Lo que tienes

✅ Proyecto Next.js 15 + React 18 + TypeScript configurado
✅ Flujo completo de registro de vendedores implementado
✅ Integración Stripe Connect con datos de ejemplo
✅ Componentes UI base con Tailwind CSS
✅ Sistema de tipos completo
✅ Código limpio y bien documentado
✅ Paleta de colores Origen integrada

---

## 🚀 Instalación Rápida

### 1. Descomprimir el Proyecto

```bash
# Si descargaste el .tar.gz
tar -xzf origen-seller-panel.tar.gz
cd origen-seller-panel
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

**Importante**: El archivo `.env.example` ya incluye datos de ejemplo de Stripe. Puedes usarlos para desarrollo local sin cambios.

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

### 5. Abrir en el Navegador

```
http://localhost:3000
```

---

## 📂 Estructura del Proyecto

```
origen-seller-panel/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página raíz (redirige a /register)
│   │   ├── register/          # Formulario de registro
│   │   │   └── page.tsx
│   │   ├── onboarding/        # [POR IMPLEMENTAR] Onboarding 6 pasos
│   │   ├── dashboard/         # [POR IMPLEMENTAR] Panel vendedor
│   │   └── api/               # [POR IMPLEMENTAR] API Routes
│   │
│   ├── components/
│   │   ├── ui/                # Componentes base
│   │   │   ├── button.tsx     ✅ Implementado
│   │   │   ├── input.tsx      ✅ Implementado
│   │   │   ├── textarea.tsx   ✅ Implementado
│   │   │   └── label.tsx      ✅ Implementado
│   │   ├── forms/
│   │   │   └── SimpleRegistration.tsx  ✅ Implementado
│   │   └── dashboard/
│   │       └── StatusBanner.tsx        ✅ Implementado
│   │
│   ├── lib/
│   │   ├── utils.ts           ✅ Utilidades generales
│   │   └── stripe/
│   │       ├── config.ts      ✅ Configuración Stripe
│   │       └── server.ts      ✅ Funciones servidor Stripe
│   │
│   ├── types/                 ✅ TypeScript types completos
│   │   ├── seller.ts
│   │   ├── document.ts
│   │   └── index.ts
│   │
│   └── constants/             ✅ Constantes de la app
│       ├── categories.ts      # Categorías de productores
│       ├── provinces.ts       # Provincias de España
│       └── regions.ts         # Regiones turísticas
│
├── docs/
│   └── FLUJO-VENDEDOR.md      ✅ Documentación del flujo completo
│
├── package.json               ✅ Dependencias configuradas
├── tsconfig.json              ✅ TypeScript configurado
├── tailwind.config.ts         ✅ Tailwind + Paleta Origen
├── next.config.js             ✅ Next.js configurado
└── .env.example               ✅ Variables de entorno ejemplo
```

---

## ✅ Lo que está implementado

### 1. Formulario de Registro (`/register`)

**Archivo**: `src/components/forms/SimpleRegistration.tsx`

- ✅ Formulario de 8 campos
- ✅ Validación con Zod
- ✅ Estados de éxito/error
- ✅ UI responsive
- ✅ Paleta de colores Origen

### 2. Componentes UI Base

**Archivos**: `src/components/ui/*.tsx`

- ✅ Button (múltiples variantes)
- ✅ Input
- ✅ Textarea
- ✅ Label

### 3. Sistema de Tipos

**Archivos**: `src/types/*.ts`

- ✅ SellerStatus (8 estados)
- ✅ ProducerCategory (6 categorías)
- ✅ InitialRegistration
- ✅ SellerLocation
- ✅ TouristicRegion
- ✅ DocumentType (11 tipos)

### 4. Integración Stripe

**Archivos**: `src/lib/stripe/*.ts`

- ✅ Configuración con variables de entorno
- ✅ `createConnectAccount()` - Crear cuenta Express
- ✅ `createAccountLink()` - Link de onboarding
- ✅ `checkAccountStatus()` - Verificar estado
- ✅ `createPaymentIntent()` - Crear pago con comisión
- ✅ `calculatePlatformFee()` - Calcular comisión (15%)

### 5. Constantes

**Archivos**: `src/constants/*.ts`

- ✅ 6 categorías de productores con subcategorías
- ✅ 50 provincias de España
- ✅ Regiones turísticas (Madrid, Cáceres)

---

## 🔧 Lo que falta por implementar

### 1. Componentes UI Adicionales

Necesarios para el flujo completo:

```typescript
// src/components/ui/checkbox.tsx
// src/components/ui/select.tsx
// src/components/ui/progress.tsx
// src/components/ui/dialog.tsx
// src/components/ui/tabs.tsx
```

Puedes copiarlos de shadcn/ui: https://ui.shadcn.com/docs/components

### 2. Onboarding (6 pasos)

Crear en `src/app/onboarding/`:

```typescript
// page.tsx - Página principal de onboarding
// components:
//   - Step1Location.tsx
//   - Step2Story.tsx
//   - Step3Visual.tsx
//   - Step4Capacity.tsx
//   - Step5Documents.tsx
//   - Step6Stripe.tsx
```

### 3. API Routes

Crear en `src/app/api/`:

```typescript
// sellers/register/route.ts     - POST registro inicial
// sellers/onboarding/route.ts   - PUT guardar paso
// admin/sellers/route.ts         - GET solicitudes pendientes
// admin/approve/route.ts         - POST aprobar vendedor
// stripe/connect/route.ts        - POST crear cuenta Connect
```

### 4. Dashboard del Vendedor

Crear en `src/app/dashboard/`:

```typescript
// page.tsx - Dashboard principal
// productos/page.tsx
// pedidos/page.tsx
// configuracion/page.tsx
```

### 5. Panel de Administración

Crear en `src/app/admin/`:

```typescript
// solicitudes/page.tsx - Aprobar solicitudes
// verificacion/page.tsx - Verificar documentos
```

---

## 📝 Ejemplos de Uso

### Usar el formulario de registro

```typescript
// El componente ya está listo en /register
// Solo necesitas implementar el API endpoint

// src/app/api/sellers/register/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  // Validar con el schema
  const validated = initialRegistrationSchema.parse(data);
  
  // Guardar en base de datos
  const registration = await db.sellerRegistrations.create({
    data: {
      ...validated,
      status: 'pending_approval',
    },
  });
  
  return Response.json({ id: registration.id, status: 'pending_approval' });
}
```

### Crear cuenta de Stripe

```typescript
import { createConnectAccount, createAccountLink } from '@/lib/stripe/server';

// En tu API route
const account = await createConnectAccount(
  sellerId,
  seller.email,
  seller.businessName
);

const link = await createAccountLink(account.id);

// Redirigir al vendedor a link.url para completar onboarding
```

---

## 🎨 Paleta de Colores Origen

Ya está configurada en Tailwind:

```tsx
className="bg-origen-bosque"    // #1B4332 - Verde oscuro
className="bg-origen-pino"      // #2D6A4F
className="bg-origen-hoja"      // #40916C
className="bg-origen-menta"     // #06D6A0 - Acento
className="bg-origen-crema"     // #F1FAEE - Fondo
```

---

## 🗄️ Base de Datos

El proyecto usa tipos TypeScript. Para implementar la base de datos:

### Opción 1: Prisma (Recomendado)

```bash
npm install prisma @prisma/client
npx prisma init
```

Crear schema basado en los tipos en `src/types/seller.ts`

### Opción 2: Drizzle ORM

```bash
npm install drizzle-orm drizzle-kit
```

---

## 🔐 Autenticación

Para implementar auth, recomendamos NextAuth.js:

```bash
npm install next-auth
```

Configurar providers en `src/app/api/auth/[...nextauth]/route.ts`

---

## 📧 Emails

Para enviar emails de notificación:

```bash
npm install resend
```

O usa cualquier otro servicio (SendGrid, AWS SES, etc.)

---

## 🧪 Testing

Para añadir tests:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## 📚 Documentación Adicional

- **Flujo completo**: Ver `docs/FLUJO-VENDEDOR.md`
- **Stripe Integration**: Ver comentarios en `src/lib/stripe/server.ts`
- **Tipos**: Ver `src/types/` para toda la documentación de tipos

---

## 🐛 Troubleshooting

### Error: Module not found

Si ves errores de módulos no encontrados:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Cannot find module '@/...'

Verifica que `tsconfig.json` tiene:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Stripe no funciona

Los datos en `.env.example` son de ejemplo. Para usar Stripe real:

1. Crea una cuenta en https://stripe.com
2. Obtén tus claves en https://dashboard.stripe.com/apikeys
3. Reemplaza en `.env.local`

---

## 🚢 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 📞 Soporte

Si necesitas ayuda:

1. Revisa la documentación en `docs/`
2. Verifica los comentarios en el código
3. Contacta: dev@origen.es

---

**Proyecto creado con 🌱 por el equipo de Origen**

**Versión**: 2.0.0  
**Última actualización**: Febrero 2026
