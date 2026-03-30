import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  AlertCircle,
  Lock,
  Zap,
  Rocket,
  MessageCircle,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const demoWhatsAppMessage = encodeURIComponent(
    "Hola, vi la demo de Taller PRO y quiero implementarlo en mi taller.",
  );

  const handleOpenTour = () => {
    window.dispatchEvent(new Event("app:startTour"));
  };

  if (!isVisible) return null;

  return (
    <div className="relative border-b border-blue-200/70 px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-r from-sky-100 via-cyan-50 to-blue-100 overflow-hidden">
      <div className="absolute -top-20 -right-16 h-52 w-52 rounded-full bg-cyan-300/25 blur-2xl" />
      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-400/20 blur-2xl" />
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <Alert className="border-cyan-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <Rocket className="h-5 w-5 text-cyan-700" />
            <AlertTitle className="text-lg font-bold text-gray-900 ml-2 flex items-center gap-2 flex-wrap">
              <span>Demo Comercial Activa</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-semibold">
                LISTA PARA PRESENTAR
              </span>
            </AlertTitle>
            <AlertDescription className="ml-7 mt-3 space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                Mostrá en pocos minutos cómo tu taller puede registrar
                vehículos, crear órdenes, controlar pagos y tener métricas de
                negocio en un solo lugar.
              </p>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"
                  onClick={handleOpenTour}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Iniciar Tour de Venta
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 border-cyan-300 text-cyan-800 hover:bg-cyan-50"
                  onClick={() => navigate("/ordenes")}
                >
                  Ver Órdenes en Vivo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 border-green-300 text-green-800 hover:bg-green-50"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${demoWhatsAppMessage}`,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <MessageCircle className="h-4 w-4" />
                  Contactar por WhatsApp
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {/* Info Box 1 */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Almacenamiento Local
                      </p>
                      <p className="text-xs text-gray-700">
                        Todos los datos se guardan en tu navegador (IndexedDB).
                        ¡Máxima privacidad!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box 2 */}
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Límites Demo
                      </p>
                      <p className="text-xs text-gray-700">
                        Vehículos: 12 | OT: 40 | Gastos: 25 | Cheques: 25
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box 3 */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Sector Finanzas
                      </p>
                      <p className="text-xs text-gray-700">
                        Clave:{" "}
                        <span className="font-bold text-green-700">1234</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 pt-2">
                Presentación sugerida: Tour guiado - Registrar Vehículo - Crear
                OT - Buscar OT - Mostrar Finanzas.
              </p>
            </AlertDescription>
          </Alert>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
