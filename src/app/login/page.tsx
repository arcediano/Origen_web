// app/login/page.tsx
/**
 * Página de Login - Origen Marketplace
 * @module app/login/page
 * @version 5.2.0 - Título con mismo estilo que registro
 */

import { SimpleLogin } from '@/components/forms/SimpleLogin';
import Link from 'next/link';
import { 
  Shield, 
  Leaf, 
  ArrowRight,
  Sparkles,
  Heart,
  CheckCircle,
  Store,
  Award,
  Clock,
  TrendingUp,
  Users,
  Globe,
  ChevronRight,
  Mail,
  Phone,
  Sprout
} from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-origen-crema/30">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 md:gap-3 group focus:outline-none focus:ring-2 focus:ring-origen-menta focus:ring-offset-2 rounded-lg p-1"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-origen-bosque to-origen-pino flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <svg 
                  className="w-6 h-6 md:w-7 md:h-7 text-white" 
                  viewBox="0 0 200 200"
                >
                  <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="3"/>
                  <path d="M100 140 L100 80" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M100 90 Q85 75, 75 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M100 90 Q115 75, 125 65" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="100" cy="140" r="8" fill="white"/>
                  <circle cx="100" cy="140" r="5" fill="#06D6A0"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-origen-bosque leading-tight">ORIGEN</span>
                <span className="text-[10px] md:text-xs text-origen-hoja -mt-1">
                  Productores locales
                </span>
              </div>
            </Link>
            
            <Link 
              href="/register" 
              className="inline-flex items-center gap-1.5 md:gap-2 text-sm font-medium text-origen-bosque border-2 border-origen-pradera/30 hover:border-origen-pradera bg-white hover:bg-origen-crema px-4 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-origen-menta focus:ring-offset-2"
            >
              <Store className="w-4 h-4 text-origen-pradera" />
              <span className="hidden sm:inline">Nuevo productor</span>
              <span className="sm:hidden">Registro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* COLUMNA IZQUIERDA - 6/12 */}
            <div className="lg:col-span-6 space-y-8 lg:pr-8 xl:pr-12">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-origen-pradera/10 to-origen-hoja/10 rounded-full px-4 py-2 border border-origen-pradera/30">
                <Sparkles className="w-4 h-4 text-origen-pradera" />
                <span className="text-xs md:text-sm font-semibold text-origen-bosque">
                  Espacio exclusivo para productores
                </span>
              </div>
              
              {/* 
                ====================================================================
                TÍTULO - EXACTAMENTE IGUAL QUE EN REGISTER PAGE
                Misma estructura, mismas clases, mismo espaciado
                ====================================================================
              */}
              <div className="text-left max-w-xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-origen-bosque mb-4 md:mb-6">
                  Bienvenido a tu
                  <span className="block text-origen-pradera">panel de control</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Gestiona tu tienda, analiza tus ventas y haz crecer tu negocio 
                  con las herramientas diseñadas para productores locales.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { value: '+500', label: 'Productores', icon: Users, color: 'from-origen-menta/60 to-origen-pradera/60' },
                  { value: '50k+', label: 'Compradores', icon: Globe, color: 'from-origen-pradera/60 to-origen-hoja/60' },
                  { value: '+40%', label: 'Crecimiento', icon: TrendingUp, color: 'from-origen-hoja/60 to-origen-pino/60' },
                  { value: '24h', label: 'Soporte', icon: Clock, color: 'from-origen-pino/60 to-origen-bosque/60' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="group">
                      <div className="bg-white rounded-xl p-4 border border-gray-200 group-hover:border-origen-pradera transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-origen-bosque">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Beneficios */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-origen-bosque uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-origen-pradera" />
                  Todo incluido en tu cuenta
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Dashboard en tiempo real',
                    'Gestión de inventario',
                    'Análisis de ventas',
                    'Soporte prioritario 24/7'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-origen-menta/10 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-origen-menta" />
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* COLUMNA DERECHA - 6/12 */}
            <div className="lg:col-span-6">
              <div className="lg:pl-8 xl:pl-12">
                <SimpleLogin />
                
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 border border-gray-200 shadow-sm hover:border-origen-pradera transition-all">
                    <span className="text-sm text-gray-600">💬 ¿Problemas para acceder?</span>
                    <Link 
                      href="/soporte" 
                      className="text-sm font-medium text-origen-pradera hover:text-origen-bosque transition-colors flex items-center gap-1"
                    >
                      Contactar soporte
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-12 md:mt-16 lg:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-origen-bosque flex items-center justify-center shadow-md">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-origen-bosque">ORIGEN</div>
                  <div className="text-xs text-origen-hoja italic">Conoce de dónde viene lo que comes</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                Marketplace que conecta productores locales españoles con consumidores 
                que valoran la autenticidad, la transparencia y la sostenibilidad.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-origen-crema/80 text-xs font-medium text-origen-bosque">
                  <Leaf className="w-3 h-3 text-origen-pradera" />
                  Sostenibilidad
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-origen-crema/80 text-xs font-medium text-origen-bosque">
                  <Shield className="w-3 h-3 text-origen-pradera" />
                  Transparencia
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-origen-crema/80 text-xs font-medium text-origen-bosque">
                  <Heart className="w-3 h-3 text-origen-pradera" />
                  Comunidad
                </span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-origen-bosque uppercase tracking-wider mb-4">
                Productores
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/como-funciona" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link href="/tarifas" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Tarifas y comisiones
                  </Link>
                </li>
                <li>
                  <Link href="/soporte" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Soporte especializado
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-origen-bosque uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacidad" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Política de Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/aviso-legal" className="text-sm text-gray-600 hover:text-origen-pradera transition-colors inline-flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 text-origen-menta/70 group-hover:translate-x-0.5 transition-transform" />
                    Aviso Legal
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-sm font-bold text-origen-bosque uppercase tracking-wider mb-4">
                Contacto
              </h3>
              
              <div className="bg-origen-crema/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-origen-menta/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-origen-menta" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-origen-bosque">info@origen.es</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-origen-menta/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-origen-menta" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="font-medium text-origen-bosque">+34 900 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-origen-menta/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-origen-menta" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Horario</p>
                    <p className="font-medium text-origen-bosque">Lunes a Viernes, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Origen Marketplace. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-400">
                Diseño según Manual de Marca Origen v1.1.0
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}