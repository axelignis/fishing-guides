# EPIC-01 Onboarding + Fundaciones

## Objetivo
Establecer la base técnica y de experiencia inicial (setup, auth básica, i18n, validación RUT) para permitir el crecimiento iterativo.

## Alcance Inicial
- PESC-001 Setup base Next.js + stack UI
- PESC-002 Configuración Postgres + Prisma
- PESC-003 i18n ES/EN
- PESC-006 Auth básica (email/password)
- PESC-014 Validación RUT

## Métricas de éxito
- App corre localmente (`npm run dev`)
- Cambio de idioma persistente en sesión
- Registro / login seguros

## Riesgos
- Complejidad de auth futura (OAuth) -> Mantener modular.

## Notas
Re-evaluar proveedor de emails y storage antes de producción.
