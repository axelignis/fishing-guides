# Backlog Inicial

Formato: `PESC-### | Título | Tipo | Epic | SP | Estado | Criterios de aceptación (AC)`

## Prioridad Alta (MVP Core)
PESC-001 | Setup base Next.js + TS + Tailwind + shadcn | chore | EPIC-01 | 3 | Done | proyecto arranca `npm run dev`, Tailwind y shadcn configurados, página “/health”.
PESC-002 | Configuración Postgres + Prisma | chore | EPIC-01 | 3 | Done | `DATABASE_URL` en `.env`, `prisma init`, conexión OK (sin tablas aún).
PESC-003 | i18n next-intl (ES/EN) + toggles | feat | EPIC-01 | 3 | Done | cambiar idioma en header, strings básicos internacionalizados.
PESC-004 | Modelo Prisma mínimo (User, Service, Booking, Review, Address) | feat | EPIC-02 | 5 | Done | `prisma migrate dev` genera tablas; constraints básicas; seeds lo pueblan.
PESC-005 | Seeds datos fake (regiones/comunas + usuarios/servicios) | chore | EPIC-02 | 5 | Done | script `npm run seed:dev` (y test `npm run db:test`) carga datos y muestra 10–20 guías distribuidos por comunas.
PESC-006 | Auth básica (email/password) + sesiones | feat | EPIC-01 | 5 | Done | signup/login/logout; hash seguro; protección de rutas privadas.
PESC-007 | Ficha de prestador + listado servicios | feat | EPIC-02 | 5 | Done | ver perfil guía (bio, idiomas, comuna), ver servicios aprobados.
PESC-008 | Búsqueda por Región/Comuna + mapa (Mapbox) | feat | EPIC-02 | 5 | Backlog | filtro por Región/Comuna, markers en mapa, lista sincronizada.
PESC-009 | Solicitud y confirmación de reserva (agenda simple) | feat | EPIC-03 | 8 | Backlog | solicitante envía solicitud; prestador confirma; estado reflejado.
PESC-010 | Pago Webpay (sandbox) + callback | feat | EPIC-03 | 8 | Backlog | simular transacción; guardar `transactionId` y `status`; marcar `PAID`.
PESC-011 | Reseñas gated (1–3 fotos) + moderación admin | feat | EPIC-04 | 5 | Backlog | sólo reservas `COMPLETED` pueden reseñar; admin oculta/muestra.

## Prioridad Media
PESC-012 | Backoffice admin mínimo (aprobaciones, reseñas) | feat | EPIC-04 | 5 | Backlog | admin gestiona aprobaciones y reseñas.
PESC-013 | Notificaciones email (reserva/confirmación) | feat | EPIC-03 | 3 | Backlog | emails enviados en eventos clave.
PESC-014 | Validación RUT (módulo y formateo) | feat | EPIC-01 | 3 | Backlog | validaciones y formato estándar.

## Prioridad Baja / MVP+
PESC-015 | Favoritos solicitante | feat | EPIC-02 | 3 | Backlog | marcar y listar favoritos.
PESC-016 | SEO base (schema.org, sitemaps) | chore | EPIC-02 | 3 | Backlog | sitemap y metadatos básicos.

## Leyenda Estados
Backlog → Ready → In Progress → In Review → Testing → Done (Blocked si aplica)
