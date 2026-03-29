# Taller PRO - Demo

Version demo local sin base de datos remota.

## Requisitos
- Node.js 18+
- npm 9+

## Como ejecutar
1. Abrir una terminal en esta carpeta.
2. Instalar dependencias:
   npm install
3. Levantar entorno de desarrollo:
   npm run dev
4. Build de produccion (opcional):
   npm run build

## Alcance de la demo
- Persistencia local en navegador (IndexedDB)
- Sin conexion a Supabase
- Limites estrictos por modulo:
  - Vehiculos: 12
  - Ordenes de trabajo: 40
  - Gastos: 25
  - Cheques: 25
  - Cuentas corrientes: 15

## Nota
Si queres reiniciar la demo desde cero, borra los datos del sitio desde el navegador (almacenamiento local/IndexedDB) y recarga la app.
