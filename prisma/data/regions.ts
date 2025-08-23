export interface Region {
  code: string
  name: string
  comunas: { code: string; name: string }[]
}

export const regions: Region[] = [
  {
    code: '13',
    name: 'Región Metropolitana',
    comunas: [
      { code: '13101', name: 'Santiago' },
      { code: '13114', name: 'Providencia' },
      { code: '13123', name: 'Las Condes' }
    ]
  },
  {
    code: '05',
    name: 'Valparaíso',
    comunas: [
      { code: '05101', name: 'Valparaíso' },
      { code: '05109', name: 'Viña del Mar' },
      { code: '05110', name: 'Concón' }
    ]
  },
  {
    code: '10',
    name: 'Los Lagos',
    comunas: [
      { code: '10101', name: 'Puerto Montt' },
      { code: '10109', name: 'Puerto Varas' },
      { code: '10202', name: 'Castro' }
    ]
  }
]
