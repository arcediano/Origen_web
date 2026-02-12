import type { Config } from "tailwindcss";

/**
 * Configuración de Tailwind CSS para Origen
 * Basado en el Manual de Marca v1.1 - Paleta "Bosque Innovador"
 * 
 * @version 1.2.0 - Correcciones aplicadas:
 *   - HSL Verde Bosque corregido: 149° 43% 18%
 *   - Eliminadas utilidades de color duplicadas (se usa solo theme.extend.colors)
 *   - Añadidos estados hover personalizados
 *   - Eliminado selector universal border-border
 * 
 * @created Febrero 2026
 * @updated Marzo 2026
 * @author Equipo de Diseño Origen
 */

const config: Config = {
  darkMode: ["class"],
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // === PALETA DE COLORES OFICIAL - ORIGEN v1.1 ===
      colors: {
        // Colores principales - Manual Sección 3.1
        origen: {
          // Primarios
          bosque: "#1B4332",      // HSL: 149° 43% 18% - Principal
          pino: "#2D6A4F",        // HSL: 154° 47% 29% - H2
          hoja: "#40916C",        // HSL: 154° 43% 39% - H3, enlaces
          pradera: "#74C69D",     // HSL: 167° 38% 55% - Botones secundarios
          menta: "#06D6A0",       // HSL: 167° 80% 44% - Acento (solo fondos oscuros)
          crema: "#F1FAEE",       // HSL: 100° 67% 96% - Fondo principal
          
          // Apoyo
          oscuro: "#081C15",      // HSL: 164° 84% 8% - Texto principal
          pastel: "#D8F3DC",      // HSL: 139° 68% 93% - Fondos suaves
        },
        
        // Estados hover (calculados: 15% más oscuros)
        hover: {
          bosque: "#0F2A1F",      // #1B4332 hover
          pino: "#1F4A37",        // #2D6A4F hover
          pradera: "#5AA67D",     // #74C69D hover
          menta: "#05B386",       // #06D6A0 hover
        },
        
        // Variables del sistema (shadcn/ui)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // === BORDES REDONDEADOS ===
      borderRadius: {
        lg: "var(--radius)",      // 8px
        md: "calc(var(--radius) - 2px)", // 6px
        sm: "calc(var(--radius) - 4px)", // 4px
      },
      
      // === TIPOGRAFÍA ===
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      },
      
      fontSize: {
        // Jerarquía según manual Sección 4.2
        "h1": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],   // 40px
        "h2": ["1.8rem", { lineHeight: "1.3", fontWeight: "700" }],   // 28.8px
        "h3": ["1.3rem", { lineHeight: "1.4", fontWeight: "600" }],   // 20.8px
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],   // 16px
        "small": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px
      },
      
      // === ESPACIADO ===
      spacing: {
        '18': '4.5rem',     // 72px
        '22': '5.5rem',     // 88px
        '26': '6.5rem',     // 104px
        '30': '7.5rem',     // 120px
      },
      
      // === SOMBRAS ===
      boxShadow: {
        'origen': '0 4px 20px rgba(27, 67, 50, 0.1)',
        'origen-lg': '0 10px 40px rgba(27, 67, 50, 0.15)',
        'origen-inner': 'inset 0 2px 4px rgba(27, 67, 50, 0.06)',
        'subtle': '0 2px 8px rgba(27, 67, 50, 0.08)',
      },
      
      // === ANIMACIONES ===
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // === GRADIENTES ===
      backgroundImage: {
        'gradient-origen': 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #74C69D 100%)',
        'gradient-menta': 'linear-gradient(135deg, #06D6A0 0%, #74C69D 100%)',
        'gradient-crema': 'linear-gradient(135deg, #F1FAEE 0%, #FFFFFF 100%)',
      },
      
      // === TRANSICIONES ===
      transitionDuration: {
        'DEFAULT': '200ms',
      },
      
      transitionTimingFunction: {
        'DEFAULT': 'ease',
      },
    },
  },
  
  plugins: [require("tailwindcss-animate")],
};

export default config;