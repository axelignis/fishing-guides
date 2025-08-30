# EPIC-03 Reservas & Pagos

## Objetivo
Gestionar flujo simple de solicitud, confirmación y pago de reservas usando Webpay sandbox.

## Alcance Inicial
- PESC-009 Solicitud y confirmación reserva
- PESC-010 Pago Webpay sandbox
- PESC-013 Notificaciones email (reserva/confirmación)

## Métricas
- Conversión solicitud→confirmación >70% (seed test)
- Registro confiable de transacciones

## Riesgos
- Latencia Webpay sandbox -> implementar reintentos.

## Notas
Auditar integridad de estados booking vs pago.
