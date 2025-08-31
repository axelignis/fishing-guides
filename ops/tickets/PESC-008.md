# PESC-008 — Búsqueda por Región/Comuna + mapa (Mapbox)

Estado: Ready
Epic: EPIC-02
Story Points: 5

Descripción
-----------
Permitir a los usuarios filtrar servicios por región y comuna y visualizar resultados en un mapa (Mapbox), con markers y lista sincronizada.

DoR (Definition of Ready)
- Datos de regiones/comunas en seeds o endpoint de referencia.
- Diseño básico de UI (filtros + lista + contenedor de mapa).
- API para listar servicios con filtros de región/comuna.

DoD (Definition of Done)
- Endpoint de búsqueda con paginación y filtros por region/comuna probado.
- UI con filtros funcionales y lista actualizada según filtros.
- Mapa integrado mostrando markers correspondientes y sincronizado con lista.
- Seeds actualizados con coordenadas geográficas mínimas.
- Tests unitarios para utilitarios y un E2E básico que valida filtro+mapa.
- Documentación en `ops/` actualizada.

Subtareas (sugeridas)
1. API: crear endpoint `GET /api/services?region=&comuna=&page=` (2 SP)
2. Seeds: validar/añadir coordenadas para servicios (1 SP)
3. UI: componentes de filtros + lista (2 SP)
4. Mapa: integrar Mapbox y render markers (2 SP)
5. Tests: agregar E2E básico y unit (1 SP)

Notas
-----
- Considerar usar `react-map-gl` o `mapbox-gl` según preferencia.
- Mantener la performance: cargar markers paginados o clusters si hay muchos.
