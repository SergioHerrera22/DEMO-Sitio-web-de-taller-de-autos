import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Lock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <Alert className="border-blue-300 bg-white">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-lg font-bold text-gray-900 ml-2">
              👋 ¡Bienvenido a Taller PRO Demo!
            </AlertTitle>
            <AlertDescription className="ml-7 mt-3 space-y-3">
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
                ℹ️ Usa el botón <strong>Ayuda</strong> en la esquina superior
                derecha para ver la guía completa de uso.
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
