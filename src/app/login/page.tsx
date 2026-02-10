// app/login/page.tsx - Versión Simplificada y Profesional
/**
 * Página de Login - Origen Marketplace
 * Diseño profesional y minimalista
 */

import { SimpleLogin } from '@/components/forms/SimpleLogin';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-origen-crema via-white to-origen-crema">
      {/* Header minimalista */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-origen-bosque to-origen-pino flex items-center justify-center shadow-sm">
                <svg 
                  className="w-6 h-6 text-white" 
                  viewBox="0 0 200 200"
                  aria-label="Logo Origen"
                >
                  <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="3"/>
                  <path d="M100 140 L100 80" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M100 90 Q85 75, 75 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M100 90 Q115 75, 125 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="100" cy="140" r="8" fill="white"/>
                  <circle cx="100" cy="140" r="5" fill="#06D6A0"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-origen-bosque">ORIGEN</span>
                <span className="text-xs text-origen-hoja italic -mt-0.5">
                  Marketplace de productores
                </span>
              </div>
            </Link>
            
            <Link 
              href="/register" 
              className="text-sm font-medium text-origen-bosque hover:text-origen-menta transition-colors"
            >
              ¿Nuevo productor?
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Columna izquierda - Información */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-origen-menta/10 to-origen-pradera/10 text-origen-bosque rounded-full px-4 py-2">
                  <span className="text-sm font-semibold">
                    👋 Acceso exclusivo
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-origen-bosque leading-tight">
                  Bienvenido de vuelta a
                  <span className="block text-origen-menta mt-2">tu espacio productor</span>
                </h1>
                
                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                  Gestiona tu tienda, controla tus pedidos y conecta con clientes 
                  que valoran la autenticidad y calidad de tus productos.
                </p>
              </div>
              
              {/* Características */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-origen-bosque">
                  Accede a herramientas profesionales
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Dashboard Analytics', desc: 'Métricas en tiempo real' },
                    { title: 'Gestión de Stock', desc: 'Control inteligente' },
                    { title: 'Comunicación Directa', desc: 'Mensajería integrada' },
                    { title: 'Logística Avanzada', desc: 'Envíos optimizados' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl p-4 border border-gray-200 hover:border-origen-menta/30 transition-colors"
                    >
                      <h3 className="font-semibold text-origen-bosque text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Testimonio */}
              <div className="bg-gradient-to-r from-origen-crema to-white rounded-xl p-5 border-l-4 border-origen-menta">
                <p className="text-gray-700 italic text-sm mb-3">
                  "La plataforma de Origen ha transformado mi negocio. Las herramientas son intuitivas y el soporte excepcional."
                </p>
                <div>
                  <p className="font-bold text-origen-bosque text-sm">Carlos Rodríguez</p>
                  <p className="text-xs text-gray-500">Aceites Montes de Toledo</p>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Formulario */}
            <div>
              <SimpleLogin />
              
              {/* Información adicional */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-xs">
                  ¿Necesitas ayuda?{' '}
                  <Link href="/soporte" className="text-origen-menta hover:text-origen-bosque font-medium">
                    Contacta con soporte
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="bg-origen-bosque text-white py-6 md:py-8 mt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm font-medium">Origen Marketplace</p>
              <p className="text-xs text-white/60">Conectando productores locales</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/privacidad" className="text-white/70 hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-white/70 hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="/soporte" className="text-white/70 hover:text-white transition-colors">
                Soporte
              </Link>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-xs text-white/50">
                © 2026 Origen. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}