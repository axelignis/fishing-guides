export type Place = {
  id: string
  title: string
  description: string
  region: string
  comuna: string
  lat?: number
  lng?: number
}

const mockPlaces: Place[] = [
  {
    id: 'p1',
    title: 'Guía de pesca Coronel',
    description: 'Pescamos en la bahía y ríos cercanos',
    region: 'Biobío',
    comuna: 'Coronel',
    lat: -37.0,
    lng: -73.2,
  },
  {
    id: 'p2',
    title: 'Pesca en Valparaíso',
    description: 'Excursiones de un día en la costa',
    region: 'Valparaíso',
    comuna: 'Valparaíso',
    lat: -33.0,
    lng: -71.6,
  },
  {
    id: 'p3',
    title: 'Guía Metropolitana',
    description: 'Lagos y embalses en la región Metropolitana',
    region: 'Metropolitana',
    comuna: 'Santiago',
    lat: -33.45,
    lng: -70.66,
  },
]

export default mockPlaces
