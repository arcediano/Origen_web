# 🚀 Quick Start - Origen Seller Panel v2.0

> Proyecto Next.js 15 completo con flujo de alta de vendedor integrado

## ⚡ Inicio en 3 Minutos

```bash
# 1. Extraer proyecto
tar -xzf origen-seller-panel-v2-COMPLETO.tar.gz
cd origen-seller-panel

# 2. Instalar dependencias
npm install

# 3. Configurar entorno (opcional, ya tiene datos de ejemplo)
cp .env.example .env.local

# 4. Ejecutar
npm run dev

# 5. Abrir navegador
open http://localhost:3000
```

---

## 📦 Lo que Incluye

### ✅ 47 Archivos Completamente Funcionales

#### 🎨 Interfaz de Usuario (12 componentes)
- Formulario de registro completo con validación
- Dashboard del vendedor con sidebar
- 7 componentes UI base (Button, Input, Select, etc.)
- Sistema de banners de estado adaptables
- Logo y componentes compartidos

#### 🔧 Lógica de Negocio
- 8 estados del vendedor perfectamente definidos
- 6 categorías de productores con subcategorías
- 11 tipos de documentos legales configurados
- Sistema de regiones turísticas
- Validaciones con Zod para todos los formularios

#### 💳 Stripe Connect
- Configuración completa con datos de ejemplo
- Funciones para crear cuentas Express
- Gestión de Account Links
- Cálculo automático de comisiones (15%)
- Webhooks documentados

#### 🗄️ Sistema de Tipos
- TypeScript en todo el proyecto
- Tipos exhaustivos para vendedores
- Tipos para documentos legales
- Tipos para onboarding (6 pasos)
- Exportaciones centralizadas

#### 🛣️ API Routes
- POST /api/sellers/register - Registro funcional
- POST /api/stripe/connect - Crear cuenta Stripe
- Respuestas con mock data para desarrollo

---

## 🎯 Rutas Implementadas

### Públicas
```
✅ /register               - Formulario de registro (FUNCIONAL)
```

### Privadas (Dashboard)
```
✅ /dashboard              - Dashboard principal (FUNCIONAL)
⏳ /dashboard/productos    - Gestión de productos (POR IMPLEMENTAR)
⏳ /dashboard/pedidos      - Gestión de pedidos (POR IMPLEMENTAR)
⏳ /dashboard/configuracion - Configuración (POR IMPLEMENTAR)
```

### Onboarding
```
⏳ /onboarding             - 6 pasos (ESTRUCTURA LISTA)
```

### API
```
✅ POST /api/sellers/register  - Registrar vendedor
✅ POST /api/stripe/connect    - Crear cuenta Stripe
```

---

## 📚 Documentación Incluida

```
✅ README.md              - Descripción general del proyecto
✅ INSTALLATION.md        - Guía de instalación detallada
✅ PROJECT-STRUCTURE.md   - Estructura completa documentada
✅ QUICK-START.md         - Esta guía rápida
✅ docs/FLUJO-VENDEDOR.md - Flujo completo con diagramas
```

---

## 💻 Ejemplos de Código

### Usar el Formulario de Registro

El formulario ya está listo en `/register`. Solo llama a la API:

```typescript
// Ya implementado en SimpleRegistration.tsx
const response = await fetch('/api/sellers/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

### Crear Cuenta de Stripe

```typescript
import { createConnectAccount, createAccountLink } from '@/lib/stripe/server';

// En tu API route
const account = await createConnectAccount(
  'seller_123',
  'vendedor@ejemplo.com',
  'Huerta de María'
);

const link = await createAccountLink(account.id);
// Redirigir a link.url
```

### Validar con Zod

```typescript
import { initialRegistrationSchema } from '@/lib/validations/seller';

// Validar datos
const validated = initialRegistrationSchema.parse(data);
```

### Usar Datos Mock

```typescript
import { MOCK_SELLERS } from '@/mocks/sellers';

// Vendedor activo de ejemplo
const seller = MOCK_SELLERS[0];
```

---

## 🎨 Paleta de Colores

Ya configurada en Tailwind:

```tsx
// Verde oscuro - Principal
<div className="bg-origen-bosque text-white">
  Botón principal
</div>

// Menta vibrante - Acento
<div className="bg-origen-menta">
  Destacado
</div>

// Crema - Fondos
<div className="bg-origen-crema">
  Fondo suave
</div>
```

Colores disponibles:
- `origen-bosque` - #1B4332 (oscuro)
- `origen-pino` - #2D6A4F
- `origen-hoja` - #40916C
- `origen-hierba` - #52B788
- `origen-pradera` - #74C69D
- `origen-menta` - #06D6A0 (acento)
- `origen-crema` - #F1FAEE (fondo)

---

## 🔑 Variables de Entorno

El archivo `.env.example` ya incluye datos de ejemplo:

```env
# Stripe (datos de ejemplo, NO funcionan en producción)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51OrigenExamplePublishableKey123456789
STRIPE_SECRET_KEY=sk_test_51OrigenExampleSecretKey987654321
STRIPE_WEBHOOK_SECRET=whsec_OrigenExampleWebhookSecret

# Comisión de la plataforma
STRIPE_PLATFORM_FEE_PERCENT=15
```

Para usar Stripe real:
1. Crea cuenta en https://stripe.com
2. Obtén claves en Dashboard > API Keys
3. Reemplaza en `.env.local`

---

## 🧪 Testing Rápido

### 1. Probar Registro
```bash
curl -X POST http://localhost:3000/api/sellers/register \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "María",
    "contactSurname": "García",
    "email": "maria@test.com",
    "phone": "+34 600123456",
    "businessName": "Huerta Test",
    "businessType": "individual",
    "province": "Madrid",
    "city": "Madrid",
    "producerCategory": "agricola",
    "whyOrigin": "Quiero vender mis productos locales directamente a consumidores conscientes.",
    "acceptsTerms": true,
    "acceptsPrivacy": true
  }'
```

### 2. Ver Mock Sellers
```typescript
// En cualquier componente
import { MOCK_SELLERS } from '@/mocks/sellers';
console.log(MOCK_SELLERS);
```

---

## 📊 Progreso del Proyecto

```
████████████████████░░░░░░░░░░░░ 60% Completo

✅ Infraestructura: 100%
✅ UI Base: 100%
✅ Registro: 100%
✅ Stripe Config: 100%
⬜ Onboarding: 20%
⬜ Dashboard: 40%
⬜ Admin: 0%
⬜ Auth: 0%
⬜ Database: 0%
```

---

## 🔧 Próximos Pasos

### Inmediato (Para desarrollo)
1. ✅ El proyecto ya funciona con `npm run dev`
2. ✅ Puedes probar el formulario de registro
3. ✅ Explora el código perfectamente documentado

### Corto Plazo (1-2 semanas)
1. Implementar los 6 pasos del onboarding
2. Completar el dashboard del vendedor
3. Añadir autenticación con NextAuth.js

### Medio Plazo (1 mes)
1. Configurar base de datos (Prisma)
2. Implementar panel de administración
3. Integrar file storage (AWS S3)
4. Sistema de emails (Resend)

### Largo Plazo (2-3 meses)
1. Gestión completa de productos
2. Sistema de pedidos
3. Analytics y reportes
4. Integraciones avanzadas

---

## ❓ FAQ

### ¿Por qué algunos endpoints devuelven mock data?
El proyecto está listo para desarrollo sin necesidad de base de datos. Los comentarios indican dónde implementar las queries reales.

### ¿Puedo usar Stripe en desarrollo?
Sí, pero necesitas claves reales de Stripe en modo test. Los datos actuales son solo ejemplos.

### ¿Cómo añado autenticación?
Recomendamos NextAuth.js. Hay ejemplos en la documentación oficial.

### ¿Está listo para producción?
No, faltan:
- Base de datos
- Autenticación
- File storage
- Sistema de emails
- Tests

---

## 💡 Tips de Desarrollo

### Hot Reload
Next.js recarga automáticamente. Guarda y verás cambios instantáneos.

### TypeScript
Todo está tipado. El IDE te ayudará con autocomplete.

### Componentes
Todos los componentes tienen JSDoc. Hover para ver documentación.

### Zod
Las validaciones evitan errores. Revisa `src/lib/validations/`.

### Mock Data
Usa `src/mocks/` para desarrollo sin BD.

---

## 📞 Soporte

- 📧 Email: dev@origen.es
- 📚 Docs: Ver carpeta `/docs`
- 🐛 Issues: Documentados en código con // TODO

---

## 🎉 ¡A Programar!

El proyecto está listo para desarrollo. Todo el código está:
- ✅ Perfectamente estructurado
- ✅ Limpio y mantenible
- ✅ Completamente documentado
- ✅ Con tipos TypeScript
- ✅ Siguiendo best practices

**¡Feliz coding! 🌱**

---

**Versión**: 2.0.0  
**Creado**: Febrero 2026  
**Framework**: Next.js 15 + React 18 + TypeScript
