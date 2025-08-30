PESC-008 — Seed de lugares (determinístico)

Objetivo
- Añadir un seed pequeño y determinístico que cree al menos un guía con coordenadas y un servicio publicado para facilitar pruebas locales y E2E.

Files
- `prisma/seed-places.ts` — script determinístico para crear un guía en Valparaíso / Viña del Mar.

Uso local
1. Asegúrate de tener `DATABASE_URL` apuntando a tu DB local (Postgres).
2. Ejecuta migraciones si es necesario:

```bash
npm run db:migrate
```

3. Ejecuta el seed determinístico:

```bash
npm run seed:places
```

4. Para ejecutar el smoke test localmente (necesita el seed ejecutado):

```bash
RUN_DB_TESTS=true npx jest tests/places/seed.places.smoke.test.ts -i
```

Notas
- El proyecto ya incluye `prisma/seed.ts` (faker) para un dataset amplio. `seed-places.ts` es una alternativa determinística para pruebas.
- La prueba está protegida tras `RUN_DB_TESTS=true` para evitar que CI sin DB falle.
