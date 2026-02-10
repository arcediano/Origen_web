/**
 * Constantes para el proceso de onboarding
 * Datos estáticos para la interfaz de usuario
 */

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Ubicación y Región',
    description: 'Cuéntanos dónde produces y selecciona tu región turística para destacar tu historia',
  },
  {
    id: 2,
    title: 'Historia y Valores',
    description: 'Comparte la historia de tu negocio, tus valores y lo que te hace único',
  },
  {
    id: 3,
    title: 'Perfil Visual',
    description: 'Añade imágenes que representen tu marca y productos',
  },
  {
    id: 4,
    title: 'Capacidad y Logística',
    description: 'Define tu capacidad de producción y opciones de entrega',
  },
  {
    id: 5,
    title: 'Documentación Legal',
    description: 'Sube los documentos requeridos para verificar tu negocio',
  },
  {
    id: 6,
    title: 'Configuración de Pagos',
    description: 'Conecta tu cuenta de Stripe para recibir pagos de forma segura',
  },
] as const;

export const TOURISTIC_REGIONS = [
  { id: 'cantabrico', name: 'Costa Cantábrica', description: 'Verdes paisajes y clima suave' },
  { id: 'mediterraneo', name: 'Costa Mediterránea', description: 'Sol, playa y tradición' },
  { id: 'meseta', name: 'Meseta Central', description: 'Campos extensos y tradición cerealista' },
  { id: 'atlantico', name: 'Costa Atlántica', description: 'Fuerza del mar y tradición pesquera' },
  { id: 'montana', name: 'Zona de Montaña', description: 'Altitud, pureza y productos únicos' },
  { id: 'sur', name: 'Andalucía', description: 'Sol, tradición y productos del sur' },
] as const;

export const PRODUCER_CATEGORIES = [
  { id: 'vegetales', name: 'Hortalizas y Verduras', icon: '🥬' },
  { id: 'frutas', name: 'Frutas', icon: '🍎' },
  { id: 'lacteos', name: 'Lácteos y Quesos', icon: '🧀' },
  { id: 'carnicos', name: 'Productos Cárnicos', icon: '🥩' },
  { id: 'panaderia', name: 'Panadería y Repostería', icon: '🥖' },
  { id: 'conservas', name: 'Conservas y Mermeladas', icon: '🥫' },
  { id: 'bebidas', name: 'Bebidas (Vino, Aceite, etc.)', icon: '🍷' },
  { id: 'otros', name: 'Otros Productos Artesanales', icon: '🎨' },
] as const;

export const REQUIRED_DOCUMENTS = [
  {
    id: 'dni_nie',
    name: 'DNI/NIE del titular',
    description: 'Documento de identidad del responsable legal',
    required: true,
  },
  {
    id: 'cif_nif',
    name: 'CIF/NIF de la empresa',
    description: 'Documento de identificación fiscal',
    required: true,
  },
  {
    id: 'licencia_municipal',
    name: 'Licencia Municipal de Actividad',
    description: 'Permiso del ayuntamiento para ejercer la actividad',
    required: true,
  },
] as const;

export const DELIVERY_INTERVALS = [
  { id: 'same_day', name: 'Mismo día', description: 'Pedidos antes de las 12:00' },
  { id: 'next_day', name: 'Siguiente día', description: '24-48 horas' },
  { id: '2_3_days', name: '2-3 días', description: 'Entrega programada' },
] as const;

export const DELIVERY_AREAS = [
  { id: 'local', name: 'Local', radius: '5-10 km' },
  { id: 'provincial', name: 'Provincial', radius: 'Toda la provincia' },
  { id: 'regional', name: 'Regional', radius: 'Toda la comunidad autónoma' },
] as const;