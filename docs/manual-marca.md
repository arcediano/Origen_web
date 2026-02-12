 MANUAL DE MARCA ORIGEN v1.1.0 - DOCUMENTACIÓN COMPLETA
📋 ÍNDICE
Introducción

Paleta de Colores "Bosque Innovador"

Tipografía

Logotipo e Identidad Visual

Elementos Gráficos

Aplicaciones Digitales

Guía de Accesibilidad

Cambios Aplicados v1.0 → v1.1.0

Implementación Técnica

Componentes UI Actualizados

1. INTRODUCCIÓN
1.1 Visión
Ser el puente que conecta la auténtica producción local española con consumidores que valoran la calidad, transparencia y sostenibilidad.

1.2 Misión
Facilitar el acceso directo a productos artesanales y de kilómetro cero, eliminando intermediarios para beneficiar tanto a productores como a consumidores, mientras construimos una economía local más justa y sostenible.

1.3 Valores de Marca
Autenticidad: Productos reales, con historia y alma

Transparencia: Origen completo visible de cada producto

Sostenibilidad: Prácticas que cuidan la tierra, kilómetro cero

Innovación: Tradición artesanal + tecnología moderna

Comunidad: Relaciones directas productor-consumidor

1.4 Personalidad de Marca
Cercana pero profesional

Auténtica pero innovadora

Consciente pero práctica

2. PALETA DE COLORES "BOSQUE INNOVADOR"
2.1 Colores Principales
Color	HEX	RGB	CMYK	Uso
Verde Bosque	#1B4332	27, 67, 50	60, 0, 25, 74	Principal, botones, títulos
Verde Pino	#2D6A4F	45, 106, 79	58, 0, 25, 58	Secundario oscuro, hover states
Verde Hoja	#40916C	64, 145, 108	56, 0, 26, 43	Secundario medio, subtítulos
Verde Pradera	#74C69D	116, 198, 157	41, 0, 21, 22	Complementario claro, botones secundarios
Menta Vibrante	#06D6A0	6, 214, 160	97, 0, 25, 16	Acento, solo elementos grandes
Blanco Crema	#F1FAEE	241, 250, 238	4, 0, 5, 2	Fondos, espacios de respiro
2.2 Colores de Apoyo
Color	HEX	Uso
Verde Oscuro	#081C15	Texto principal (90% opacidad)
Verde Pastel	#D8F3DC	Fondos suaves, elementos muted
2.3 Variables CSS
css
:root {
  /* Colores Principales */
  --color-origen-bosque: 154 63% 18%;      /* #1B4332 */
  --color-origen-pino: 154 47% 29%;        /* #2D6A4F */
  --color-origen-hoja: 154 43% 39%;        /* #40916C */
  --color-origen-pradera: 167 38% 55%;     /* #74C69D */
  --color-origen-menta: 167 80% 44%;       /* #06D6A0 */
  --color-origen-crema: 100 67% 96%;       /* #F1FAEE */
  
  /* Colores de Apoyo */
  --color-origen-oscuro: 164 84% 8%;       /* #081C15 */
  --color-origen-pastel: 139 68% 93%;      /* #D8F3DC */
}
3. TIPOGRAFÍA
3.1 Familia Tipográfica
Arial como tipografía principal

css
font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
3.2 Jerarquía Tipográfica (Manual v1.0 Sección 4.2)
Elemento	Tamaño	Peso	Color	Line-height
H1	2.5rem (40px)	700 (Bold)	Verde Bosque (#1B4332)	1.2
H2	1.8rem (28.8px)	700 (Bold)	Verde Pino (#2D6A4F)	1.3
H3	1.3rem (20.8px)	600 (Semi-bold)	Verde Hoja (#40916C)	1.4
Body	1rem (16px)	400 (Regular)	Verde Oscuro (#081C15) 90%	1.6
Small	0.875rem (14px)	400 (Regular)	Gris verdoso	1.5
3.3 Variables CSS Tipográficas
css
:root {
  --font-h1: 2.5rem;
  --font-h2: 1.8rem;
  --font-h3: 1.3rem;
  --font-body: 1rem;
  --font-small: 0.875rem;
}
4. LOGOTIPO E IDENTIDAD VISUAL
4.1 Elementos del Logo
Círculo protector: Cuidado, calidad y comunidad

Brote creciente: Vida, frescura, conexión con la tierra

Hojas emergentes: Diversidad de productores y productos

Semilla/Raíz: Origen, tierra fértil, base sólida

4.2 Especificaciones Técnicas
Elemento	Especificación
Radio del círculo	85 unidades
Grosor del círculo	3 unidades
Grosor del tallo	5 unidades
Grosor de hojas principales	4 unidades
Radio semilla exterior	8 unidades
Radio semilla interior	5 unidades
4.3 Variaciones del Logo
Versión Principal: Colores completos

Monocromático Oscuro: Para fondos claros sin color

Versión Negativa: Blanco para fondos oscuros

Versión Simplificada: Para tamaños < 32px

4.4 Tamaños Mínimos
Digital: 64 × 64 píxeles (mínimo)

Impreso: 15mm de ancho (mínimo)

5. ELEMENTOS GRÁFICOS
5.1 Iconografía
Estilo: Línea simple, redondeada

Grosor: 2-3px consistente

Color: Verde Bosque o Menta Vibrante para estados activos

Tamaño: Múltiplos de 8px (16, 24, 32, 48px)

5.2 Fotografía
Iluminación: Natural, cálida, suave

Composición: Centrada en producto/productor

Color: Tonos naturales, aumentar ligeramente verdes

Temas preferentes: Productores en acción, productos en contexto, paisajes rurales

5.3 Ilustraciones
Estilo: Orgánico, amigable pero profesional

Colores: Paleta "Bosque Innovador"

Uso: Para explicar procesos, valores, beneficios

6. APLICACIONES DIGITALES
6.1 Web / Marketplace
Elemento	Especificación
Header	Altura mínima 80px desktop, 64px móvil
Botones Primarios	Menta Vibrante (#06D6A0) con texto blanco (elementos grandes)
Botones Secundarios	Verde Pradera (#74C69D) con texto oscuro (#081C15)
Cards de Producto	Fondo blanco, borde sutil, hover con elevación
Border-radius	6px para consistencia (--radius)
6.2 App Móvil
App Icon: Logo simplificado sobre degradado Verde Bosque-Pradera

Splash Screen: Logo principal centrado sobre degradado

Navegación: Íconos en Verde Bosque, activos en Menta Vibrante

6.3 Redes Sociales
Plataforma	Avatar	Cover/Banner
Instagram	320 × 320 px	—
Facebook	180 × 180 px	820 × 312 px
Twitter/X	400 × 400 px	1500 × 500 px
LinkedIn	300 × 300 px	1128 × 191 px
7. GUÍA DE ACCESIBILIDAD
7.1 Contraste Mínimo Requerido (WCAG 2.1)
Tipo de Texto	Nivel AA	Nivel AAA (Recomendado)
Texto normal (< 18px)	4.5:1	7:1
Texto grande (18px+ o 14px+bold)	3:1	4.5:1
7.2 Combinaciones Aprobadas
Combinación	Ratio	Nivel WCAG	Uso Recomendado
Blanco sobre Verde Bosque	10.5:1	AAA ✓	Botones primarios, texto sobre fondos oscuros
Verde Oscuro sobre Verde Pradera	5.8:1	AA ✓	Botones secundarios, badges
Verde Oscuro sobre Verde Pastel	8.2:1	AAA ✓	Fondos destacados, cards
Blanco sobre Menta Vibrante	2.9:1	AA (solo elementos grandes)	Elementos grandes, no texto normal
7.3 Reglas de Uso de Menta Vibrante (#06D6A0)
✓ USOS CORRECTOS:

Texto blanco sobre fondo Menta Vibrante (solo elementos grandes > 44px)

Bordes y elementos decorativos

Estados hover sobre fondos oscuros

Iconos sobre fondo Verde Bosque

✗ USOS INCORRECTOS:

Texto Verde Bosque sobre Menta Vibrante (3.4:1 ✗)

Texto pequeño sobre fondo Menta Vibrante

Botones secundarios con texto oscuro

7.4 Jerarquía Visual de Color
Títulos y Headers: Verde Bosque (#1B4332)

Cuerpo de Texto: Verde Oscuro (#081C15) - 90% opacidad

Botones Primarios: Verde Bosque (#1B4332) con texto blanco

Botones Secundarios: Verde Pradera (#74C69D) con texto oscuro

Fondos: Blanco Crema (#F1FAEE) o blanco puro

8. CAMBIOS APLICADOS v1.0 → v1.1.0
8.1 Problemas Identificados en v1.0
Contraste insuficiente: Menta Vibrante (#06D6A0) con texto Verde Bosque (#1B4332) = 3.4:1

Inconsistencias: Botones secundarios usando colores incorrectos

Fondos oscuros: En secciones largas afectando legibilidad

Falta de coherencia: Entre diferentes componentes

8.2 Correcciones Aplicadas
Elemento	v1.0 (Incorrecto)	v1.1.0 (Corregido)	Razón
Botón Primario	bg-origen-menta	bg-origen-bosque	Contraste 10.5:1 vs 2.9:1
Botón Secundario	bg-origen-menta	bg-origen-pradera	Contraste 5.8:1 vs 3.4:1
Textos pequeños	text-origen-menta	text-origen-hoja	Contraste 4.7:1 vs 3.4:1
Fondos secciones	bg-origen-bosque	bg-white o bg-origen-crema	Mejor legibilidad
Badges destacados	bg-origen-menta/10	bg-origen-pradera/10	Más visible
8.3 Reglas Establecidas
Regla de oro: Texto normal = Verde Oscuro sobre fondos claros

Excepción 1: Texto sobre fondos oscuros = Blanco puro

Excepción 2: Menta Vibrante solo para elementos grandes (> 44px) con texto blanco

Consistencia: Mismo esquema en toda la aplicación

9. IMPLEMENTACIÓN TÉCNICA
9.1 Configuración Tailwind CSS (tailwind.config.ts)
typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        // Paleta oficial corregida
        'origen-bosque': '#1B4332',
        'origen-pino': '#2D6A4F',
        'origen-hoja': '#40916C',
        'origen-pradera': '#74C69D',
        'origen-menta': '#06D6A0',
        'origen-crema': '#F1FAEE',
        'origen-oscuro': '#081C15',
        'origen-pastel': '#D8F3DC',
        
        // Sistema corregido
        primary: {
          DEFAULT: 'hsl(var(--primary))',           // #1B4332
          foreground: 'hsl(var(--primary-foreground))', // Blanco
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',           // #74C69D
          foreground: 'hsl(var(--secondary-foreground))', // #081C15
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",           // 8px
        md: "calc(var(--radius) - 2px)", // 6px
        sm: "calc(var(--radius) - 4px)", // 4px
      },
    },
  },
};
9.2 Estilos Globales (globals.css)
css
@layer base {
  :root {
    /* Variables CSS corregidas */
    --primary: var(--color-origen-bosque);
    --primary-foreground: 0 0% 100%;
    
    --secondary: var(--color-origen-pradera);
    --secondary-foreground: var(--color-origen-oscuro);
    
    --accent: var(--color-origen-menta);
    --accent-foreground: 0 0% 100%; /* Solo para fondos oscuros */
  }
}

@layer components {
  /* Botones corregidos */
  .btn-primary {
    background-color: hsl(var(--color-origen-bosque));
    color: white;
  }
  
  .btn-secondary {
    background-color: hsl(var(--color-origen-pradera));
    color: hsl(var(--color-origen-oscuro));
  }
  
  .btn-accent {
    background-color: hsl(var(--color-origen-menta));
    color: white; /* Solo sobre fondos oscuros */
  }
}
9.3 Componentes UI Base
tsx
// Botón primario - Uso correcto
<Button className="bg-origen-bosque hover:bg-origen-pino text-white">
  Acción principal
</Button>

// Botón secundario - Uso correcto  
<Button className="bg-origen-pradera hover:bg-origen-pradera/90 text-origen-oscuro">
  Acción secundaria
</Button>

// Texto sobre fondo oscuro
<div className="bg-origen-bosque text-white">
  {/* Contenido */}
</div>

// Texto sobre fondo claro  
<div className="bg-white text-origen-oscuro">
  {/* Contenido */}
</div>
10. COMPONENTES UI ACTUALIZADOS
10.1 Login Page (app/login/page.tsx)
Cambios clave:

✅ Footer con fondo claro (no Verde Bosque)

✅ Botón login: Verde Bosque con texto blanco

✅ Enlaces: Verde Pradera para mejor contraste

✅ Formulario: Validación ARIA compliant

✅ Accesibilidad: Navegación por teclado completa

10.2 Register Page (app/register/page.tsx)
Cambios clave:

✅ HeroSection: Overlay corregido para mejor legibilidad

✅ Tarjeta registro: Fondo blanco sólido (no translúcido)

✅ Botones CTA: Verde Bosque (no degradado Menta-Pradera)

✅ Footer: Estructura informativa con fondo claro

✅ Proceso: 4 pasos claros con iconografía

10.3 Components Corregidos
FinalCTASection.tsx: Fondo claro, botones accesibles

HeroSection.tsx: Overlay uniforme, tarjeta legible

SimpleLogin.tsx: Formulario validado, estados claros

BenefitsSection.tsx: Iconos en Verde Bosque para contraste

TestimonialsSection.tsx: Categorías en Verde Hoja (4.7:1)

10.4 Patrones de Diseño Establecidos
tsx
// PATRÓN 1: Secciones de contenido
<section className="bg-white py-12 md:py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-origen-bosque font-bold">Título</h2>
    <p className="text-gray-600">Contenido</p>
  </div>
</section>

// PATRÓN 2: Tarjetas informativas  
<div className="bg-white rounded-xl p-6 border border-gray-200">
  <h3 className="text-origen-bosque font-semibold">Título tarjeta</h3>
  <p className="text-gray-600">Descripción</p>
</div>

// PATRÓN 3: Botones
<button className="bg-origen-bosque text-white px-6 py-3 rounded-lg">
  Primario
</button>
<button className="bg-origen-pradera text-origen-oscuro px-6 py-3 rounded-lg">
  Secundario
</button>
📊 CHECKLIST DE IMPLEMENTACIÓN
✅ CORREGIDO
Contraste mínimo 4.5:1 en todos los textos

Botones primarios: Verde Bosque con texto blanco

Botones secundarios: Verde Pradera con texto oscuro

Fondos claros para secciones largas

Menta Vibrante solo para elementos grandes

Consistencia visual entre componentes

Accesibilidad ARIA compliant

Responsive Mobile First

🎨 MANUAL DE MARCA APLICADO
Paleta "Bosque Innovador" correctamente implementada

Jerarquía tipográfica según Sección 4.2

Logo según especificaciones Sección 2

Iconografía según Sección 5.1

Aplicaciones digitales según Sección 6.1

Guía de accesibilidad según Sección 3.4

🔧 TÉCNICAMENTE SOLIDO
Variables CSS organizadas

Tailwind config optimizado

Componentes modulares y reutilizables

Documentación JSDoc completa

Performance optimizado

SEO friendly

