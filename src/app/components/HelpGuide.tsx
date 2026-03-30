import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { HelpCircle, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Ayuda</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[500px] flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-4 border-b flex-row justify-between items-center">
          <SheetTitle className="text-xl font-bold">
            Guía de Uso - Taller PRO
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-4 space-y-6">
            {/* Bienvenida */}
            <section>
              <h2 className="text-lg font-bold text-blue-600 mb-3">
                👋 ¡Bienvenido a Taller PRO!
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Este es un sistema de gestión completo para talleres de
                reparación de vehículos.{" "}
                <strong>
                  Todos los datos se almacenan localmente en tu navegador
                </strong>
                , sin necesidad de conexión a servidores remotos. ¡Es
                completamente seguro y privado!
              </p>
            </section>

            {/* Inicio */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                📊 Inicio (Dashboard)
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Resumen general del taller con:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li>Total de vehículos registrados</li>
                <li>Órdenes de trabajo en progreso</li>
                <li>Gastos del mes</li>
                <li>Cheques pendientes y cobrados</li>
                <li>Gráficos de producción y finanzas</li>
              </ul>
            </section>

            {/* Órdenes de Trabajo */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                📋 Órdenes de Trabajo
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Gestiona todas las órdenes de reparación:
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Nueva Orden:</strong> Crea una orden con vehículo,
                  cliente, descripción del trabajo y técnico responsable.
                </p>
                <p>
                  <strong>• Editar:</strong> Modifica detalles, agrega
                  repuestos, precios y observaciones.
                </p>
                <p>
                  <strong>• Estados:</strong> Pendiente → En Progreso →
                  Completada → Entregada.
                </p>
                <p>
                  <strong>• Imprimir:</strong> Genera PDF de la orden (con y sin
                  precios) para el cliente.
                </p>
              </div>
            </section>

            {/* Vehículos */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                🚗 Vehículos
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Administra el catálogo de vehículos:
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Registrar:</strong> Añade patente, cliente, marca,
                  modelo, año, color, teléfono y kilómetros.
                </p>
                <p>
                  <strong>• Historial:</strong> Visualiza todas las órdenes de
                  cada vehículo.
                </p>
                <p>
                  <strong>• Limite Demo:</strong> Máximo 12 vehículos en modo
                  demo.
                </p>
              </div>
            </section>

            {/* Cuentas Corrientes */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                💳 Cuentas Corrientes
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Tracking de clientes y deudas:
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Crear Cuenta:</strong> Registra clientes con tipo
                  (empresa o persona).
                </p>
                <p>
                  <strong>• Ver Saldo:</strong> Deuda acumulada y movimientos
                  por cliente.
                </p>
                <p>
                  <strong>• Máximo 15 cuentas</strong> en modo demo.
                </p>
              </div>
            </section>

            {/* Cheques */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                ✅ Cheques
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Gestión de cheques recibidos:
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Registrar:</strong> Cliente, monto, número de
                  cheque, fecha de cobro.
                </p>
                <p>
                  <strong>• Estados:</strong> Pendiente → Cobrado → Rechazado.
                </p>
                <p>
                  <strong>• Máximo 25 cheques</strong> en modo demo.
                </p>
              </div>
            </section>

            {/* Lavados */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                🚿 Lavados
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Registro de servicios de lavado:
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Marcar Lavado:</strong> Registra cuándo se lavó un
                  vehículo en la orden.
                </p>
                <p>
                  <strong>• Estadísticas:</strong> Ve el total de lavados
                  realizados.
                </p>
              </div>
            </section>

            {/* Gestión Financiera */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                💰 Gestión Financiera
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Panel completo de finanzas (protegido con clave):
              </p>
              <div className="text-sm text-gray-700 space-y-2 ml-4">
                <p>
                  <strong>• Clave de Acceso:</strong>{" "}
                  <span className="font-bold text-blue-600 text-base">
                    1234
                  </span>
                </p>
                <p>
                  <strong>• Gastos:</strong> Registra todos los gastos
                  operacionales del taller (repuestos, servicios, salarios,
                  etc.)
                </p>
                <p>
                  <strong>• Presupuestos:</strong> Máximo 25 gastos en modo
                  demo.
                </p>
                <p>
                  <strong>• Reportes:</strong> Análisis de ingresos vs. gastos,
                  márgenes de ganancia.
                </p>
              </div>
            </section>

            {/* Almacenamiento Local */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                💾 Almacenamiento Local
              </h3>
              <p className="text-sm text-gray-700 space-y-2">
                <span className="block">
                  ✓ <strong>Todos los datos están en tu navegador</strong>{" "}
                  (IndexedDB)
                </span>
                <span className="block">
                  ✓ <strong>Sin envío a servidores remotos</strong> - Máxima
                  privacidad
                </span>
                <span className="block">
                  ✓ <strong>Funciona sin conexión a internet</strong> después de
                  cargar
                </span>
                <span className="block">
                  ✓ <strong>Se sincroniza automáticamente</strong> cada minuto
                </span>
              </p>
            </section>

            {/* Tips */}
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                💡 Tips Útiles
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>
                  Usa el botón "Actualizar Datos" para sincronizar cambios
                </li>
                <li>Los PDFs se generan directamente en tu navegador</li>
                <li>Haz respaldo de datos regularmente</li>
                <li>Todos los cambios se guardan automáticamente</li>
                <li>Límites de datos en modo demo para pruebas</li>
              </ul>
            </section>

            {/* Footer */}
            <section className="border-t pt-4">
              <p className="text-xs text-gray-600 italic">
                © 2026 Taller PRO - Sistema de Gestión Local. Versión Demo.
              </p>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
