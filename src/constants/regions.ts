/**
 * Regiones turísticas por provincia
 * @module constants/regions
 */

import { TouristicRegion } from '@/types/seller';

export const TOURISTIC_REGIONS: Record<string, TouristicRegion[]> = {
  Madrid: [
    {
      id: 'sierra-rincon',
      name: 'Sierra del Rincón',
      province: 'Madrid',
      description: 'Reserva de la Biosfera, conocida por sus hayedos y pueblos tradicionales',
    },
    {
      id: 'sierra-guadarrama',
      name: 'Sierra de Guadarrama',
      province: 'Madrid',
      description: 'Parque Nacional, paraíso natural al norte de Madrid',
    },
    {
      id: 'vegas-tajo',
      name: 'Vegas del Tajo',
      province: 'Madrid',
      description: 'Zona agrícola histórica en el sureste de la región',
    },
  ],
  Cáceres: [
    {
      id: 'valle-jerte',
      name: 'Valle del Jerte',
      province: 'Cáceres',
      description: 'Famoso por sus cerezos en flor y naturaleza espectacular',
    },
    {
      id: 'la-vera',
      name: 'La Vera',
      province: 'Cáceres',
      description: 'Tierra del pimentón y gargantas naturales',
    },
  ],
};
