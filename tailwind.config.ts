import type { Config } from "tailwindcss";

/**
 * Configuración de Tailwind CSS para Origen
 * Basado en el Manual de Marca v1.0 - Paleta "Bosque Innovador"
 * 
 * @version 1.0.0
 * @created Febrero 2026
 * @author Equipo de Diseño Origen
 */

const config: Config = {
  // Modo oscuro basado en clase
  darkMode: ["class"],
  
  // Archivos donde buscar clases
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // Prefijo para clases (opcional, evitar conflictos)
  // prefix: "origen-",
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // === PALETA DE COLORES OFICIAL - ORIGEN ===
      colors: {
        // Colores principales del manual de marca
        "origen-bosque": "#1B4332",      // Verde Bosque - Principal
        "origen-pino": "#2D6A4F",        // Verde Pino - Secundario oscuro
        "origen-hoja": "#40916C",        // Verde Hoja - Secundario medio
        "origen-pradera": "#74C69D",     // Verde Pradera - Complementario claro
        "origen-menta": "#06D6A0",       // Menta Vibrante - Acento
        "origen-crema": "#F1FAEE",       // Blanco Crema - Fondo
        
        // Colores de apoyo
        "origen-oscuro": "#081C15",      // Verde Oscuro - Texto principal
        "origen-pastel": "#D8F3DC",      // Verde Pastel - Fondos suaves
        
        // Colores del sistema (basados en CSS variables)
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
        lg: "var(--radius)",           // 8px - Principal
        md: "calc(var(--radius) - 2px)", // 6px
        sm: "calc(var(--radius) - 4px)", // 4px
      },
      
      // === TIPOGRAFÍA ===
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"], // Manual de marca
      },
      
      fontSize: {
        // Jerarquía según manual de marca (Sección 4.2)
        "2.5rem": "2.5rem",    // 40px - H1
        "1.8rem": "1.8rem",    // 28.8px - H2
        "1.3rem": "1.3rem",    // 20.8px - H3
      },
      
      // === ESPACIADO PERSONALIZADO ===
      spacing: {
        // Múltiplos de 8px (sistema de diseño consistente)
        '18': '4.5rem',     // 72px
        '22': '5.5rem',     // 88px
        '26': '6.5rem',     // 104px
        '30': '7.5rem',     // 120px
      },
      
      // === SOMBRAS ===
      boxShadow: {
        'origen': '0 4px 20px rgba(27, 67, 50, 0.1)',      // Sombra principal
        'origen-lg': '0 10px 40px rgba(27, 67, 50, 0.15)', // Sombra grande
        'origen-inner': 'inset 0 2px 4px rgba(27, 67, 50, 0.06)', // Sombra interna
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
    },
  },
  
  // === PLUGINS ===
  plugins: [require("tailwindcss-animate")],
};

export default config;