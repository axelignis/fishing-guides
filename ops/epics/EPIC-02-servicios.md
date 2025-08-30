# EPIC-02 Servicios & Descubrimiento

## Objetivo
Permitir a solicitantes descubrir guías y servicios de pesca filtrando por región/comuna y visualizando en mapa.

## Alcance Inicial
- PESC-004 Modelo Prisma mínimo
- PESC-005 Seeds datos fake
- PESC-007 Ficha prestador + listado servicios
- PESC-008 Búsqueda por Región/Comuna + mapa
- PESC-015 Favoritos (MVP+)

## Métricas
- Listado responde <300ms en dataset seed
- Mapa sincronizado con filtros

## Riesgos
- Datos geográficos incompletos -> validar dataset regiones/comunas.

## Notas
Optimizar queries con índices tras definir uso real.
