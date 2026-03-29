# Taller PRO - Sistema de Gestion para Taller de Autos

Aplicacion web para administrar de punta a punta la operacion de un taller automotor: vehiculos, ordenes de trabajo, cuentas corrientes, cheques, indicadores de lavado y consolidado financiero mensual.

Esta version esta preparada como DEMO: funciona 100% en almacenamiento local (IndexedDB) y no usa base de datos remota.

## Modo Demo (limites estrictos)

- Vehiculos: maximo 12
- Ordenes de trabajo: maximo 40
- Gastos: maximo 25
- Cheques: maximo 25
- Cuentas corrientes: maximo 15

Al alcanzar un limite, se bloquean nuevas altas de ese modulo y la aplicacion muestra un mensaje indicando que es un tope de prueba.

## Resumen Funcional

### Operacion diaria

- Registro, edicion y eliminacion logica de vehiculos.
- Busqueda por patente y navegacion directa al historial del vehiculo.
- Alta y gestion de ordenes de trabajo con:
  - Numero de OT autogenerado (formato OT-001, OT-002, ...).
  - Descripcion de tareas, tecnico responsable y estado (pendiente, en-progreso, completada).
  - Repuestos (detalle y precio), mano de obra, total y saldo pendiente.
  - Entregas a cuenta y control de deuda por cliente.
  - Indicador de servicio de lavado.

### Documentacion e impresion

- Generacion de paquete imprimible por OT en PDF, incluyendo:
  - Orden sin precios.
  - Comprobante con precios.
  - Hoja de check/firma.

### Cuentas corrientes

- Administracion de cuentas por tipo (banco, proveedor, otro).
- Carga de gastos de proveedor dentro de la cuenta.
- Calculo de saldo y deuda acumulada con proveedores.

### Cheques

- Alta, edicion, baja logica y consulta por estado.
- Estados soportados: en-cartera, entregado, cobrado, imputado.
- Imputacion de cheques a:
  - Clientes (cancelacion parcial/total de saldos pendientes en OT).
  - Cuentas corrientes (impacto en saldo de la cuenta).

### Estadisticas

- Modulo de lavados:
  - Lavados del mes.
  - Total historico.
  - Promedio mensual.
  - Historial mensual y ultimos servicios.
- Modulo de gestion financiera:
  - Vista mensual consolidada de ingresos, egresos, IVA ventas y balance.
  - Integracion de OT, gastos, cuentas corrientes y cheques imputados.
  - Estado de sincronizacion (pendientes, ultimo OK y ultimo error).

## Arquitectura Tecnica

### Frontend

- React 18 + Vite.
- Router con rutas de aplicacion mediante react-router.
- UI basada en Tailwind CSS + componentes Radix/shadcn.
- Notificaciones con sonner.

### Persistencia local

- Base local en navegador con Dexie (IndexedDB).
- Tablas principales:
  - vehicles
  - ordenesTrabajo
  - expenses
  - cuentasCorrientes
  - cheques
  - outbox
  - sync_meta
- Estrategia de borrado logico con campo deleted.

### Persistencia demo

- Sincronizacion remota deshabilitada.
- Estado local registrado en `sync_meta` para compatibilidad de UI.
- Operacion enfocada en evaluacion funcional y pruebas comerciales.

## Rutas de la Aplicacion

- /: Dashboard (busqueda, metricas, listado y alta de vehiculos).
- /vehiculo/:id: Ficha del vehiculo e historial de ordenes.
- /ordenes: Gestion global de ordenes de trabajo.
- /cuentas: Cuentas corrientes y gastos de proveedor.
- /cheques: Gestion e imputacion de cheques.
- /lavados: Estadisticas de lavados.
- /gestion-financiera: Consola financiera mensual (acceso restringido).

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.

## Puesta en Marcha Local

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar entorno de desarrollo:

```bash
npm run dev
```

3. Generar build de produccion:

```bash
npm run build
```

## Scripts Disponibles

- npm run dev: inicia Vite en modo desarrollo.
- npm run build: compila la aplicacion para produccion.

## Seguridad y Accesos

- El modulo de Gestion Financiera usa validacion por contrasena en la interfaz.
- Valor actual en codigo: taller2024.
- Recomendacion: externalizar la contrasena a una variable de entorno o a un mecanismo de autenticacion formal.

## Estructura del Proyecto

- src/app/pages: pantallas principales por dominio.
- src/app/components: componentes reutilizables, formularios y modales.
- src/app/types: modelos tipados de negocio.
- src/services: servicios de sincronizacion, numeracion OT e impresion.
- src/db.ts: definicion de base local Dexie/IndexedDB.

## Deploy

El proyecto incluye configuracion para despliegue en Vercel mediante el archivo vercel.json.

## Atribuciones

Revisar ATTRIBUTIONS.md para detalle de librerias, assets y recursos de terceros.
