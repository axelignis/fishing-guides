// Map of region display name -> comunas
export const regionsMap: Record<string, string[]> = {
  'Biobío': ['Concepción', 'Coronel', 'Talcahuano', 'Los Ángeles'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio'],
  'Metropolitana': ['Santiago', 'Providencia', 'Maipú', 'Puente Alto'],
}

export const regionList = Object.keys(regionsMap)

// Normalized list suitable for UI consumption
export const regions = [
  {
    id: 'biobio',
    name: 'Biobío',
    comunas: ['Concepción', 'Talcahuano', 'Lota']
  },
  {
    id: 'valparaiso',
    name: 'Valparaíso',
    comunas: ['Valparaíso', 'Viña del Mar', 'Concón']
  },
  {
    id: 'metropolitana',
    name: 'Metropolitana',
    comunas: ['Santiago', 'Providencia', 'Las Condes']
  }
]
