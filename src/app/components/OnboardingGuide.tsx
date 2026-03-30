import { useState, useEffect, useCallback } from "react";
import {
  Car,
  FileText,
  Receipt,
  CreditCard,
  Shield,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";

export const ONBOARDING_KEY = "taller_pro_onboarding_v1";

interface Step {
  icon: React.ElementType;
  color: string;
  bg: string;
  title: string;
  text: string;
  hint: string;
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    title: "¡Bienvenido a Taller PRO!",
    text: "Este es tu sistema de gestión completo para talleres de reparación de vehículos. Todos los datos se guardan localmente en tu navegador, de forma privada y segura, sin necesidad de internet.",
    hint: "En los siguientes pasos te mostramos cómo usar cada sección del sistema.",
  },
  {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Registrar un Vehículo",
    text: 'Desde el Panel de Inicio, desplazate hacia la sección "Vehículos" y hacé clic en "Nuevo Vehículo". Completá la patente, marca, modelo, año, color y los datos del cliente.',
    hint: "El vehículo es el punto de partida para crear órdenes de trabajo.",
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Órdenes de Trabajo",
    text: 'Dirigite a la sección "Órdenes" y creá una nueva Orden de Trabajo. Seleccioná el vehículo registrado, asigná el técnico responsable y describí los trabajos a realizar.',
    hint: "Podés agregar repuestos, mano de obra, notas internas y cambiar el estado de la orden.",
  },
  {
    icon: Receipt,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    title: "Cuentas Corrientes",
    text: 'En "Cuentas" podés registrar clientes con deuda pendiente. El sistema lleva un historial completo de todos los movimientos por cliente y te muestra el saldo acumulado en tiempo real.',
    hint: "Ideal para clientes frecuentes que pagan a fin de mes o en cuotas.",
  },
  {
    icon: CreditCard,
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    title: "Gestión de Cheques",
    text: 'En "Cheques" registrás los cheques que recibís como pago. Podés marcarlos como Pendiente, Cobrado o Rechazado y hacer seguimiento de todas las fechas de cobro.',
    hint: "El sistema resalta visualmente los cheques próximos a su fecha de cobro.",
  },
  {
    icon: Shield,
    color: "text-rose-400",
    bg: "bg-rose-500/20",
    title: "Gestión Financiera",
    text: 'El panel de "Finanzas" está protegido por contraseña. Allí encontrarás reportes detallados de ingresos, egresos del taller y el balance general en distintos períodos.',
    hint: "La contraseña por defecto es 1234.",
  },
  {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/20",
    title: "¡Todo listo para empezar!",
    text: "Ya conocés lo esencial de Taller PRO. Explorá cada sección a tu ritmo. Si necesitás recordar algo, el botón Ayuda en la barra superior siempre está disponible para vos.",
    hint: "",
  },
];

// --- Typewriter Hook ---
function useTypewriter(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) {
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  const skipToEnd = useCallback(() => {
    setDisplayed(text);
    setDone(true);
  }, [text]);

  return { displayed, done, skipToEnd };
}

// --- Component ---
interface OnboardingGuideProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingGuide({ open, onClose }: OnboardingGuideProps) {
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const { displayed, done, skipToEnd } = useTypewriter(
    open ? current.text : "",
    22,
  );

  // Reset step when guide opens
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const handleNext = () => {
    if (!done) {
      skipToEnd();
      return;
    }
    if (isLast) {
      localStorage.setItem(ONBOARDING_KEY, "true");
      onClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setStep((s) => s - 1);
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    onClose();
  };

  if (!open) return null;

  const Icon = current.icon;
  const progressPct = (step / (STEPS.length - 1)) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.78)" }}
    >
      <div className="relative w-full max-w-lg bg-gray-900 border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top progress bar */}
        <div className="h-1 bg-gray-800 w-full">
          <div
            className="h-1 bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Skip button */}
        {!isLast && (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors z-10"
            aria-label="Saltar guía"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="p-8">
          {/* Step dots */}
          <div className="flex gap-1.5 mb-7">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                  i <= step ? "bg-blue-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className={`inline-flex p-3.5 rounded-xl ${current.bg} mb-5`}>
            <Icon className={`h-8 w-8 ${current.color}`} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-5">{current.title}</h2>

          {/* Typewriter area */}
          <div className="min-h-[72px] mb-4">
            <p className="text-gray-300 text-base leading-relaxed">
              {displayed}
              {!done && (
                <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* Hint — fades in when typing finishes */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: done && current.hint ? "80px" : "0px",
              opacity: done && current.hint ? 1 : 0,
            }}
          >
            <div className="bg-gray-800 border border-gray-700/60 rounded-lg px-4 py-3 mb-2">
              <p className="text-sm text-gray-400 italic">💡 {current.hint}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-800">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={handlePrev}
              disabled={isFirst}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>

            <span className="text-xs text-gray-600 tabular-nums">
              {step + 1} / {STEPS.length}
            </span>

            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 transition-colors"
            >
              {!done
                ? "Saltear texto"
                : isLast
                  ? "¡Empezar!"
                  : "Continuar"}
              {done && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Hook for consumers ---
export function useOnboardingGuide() {
  const [open, setOpen] = useState(() => {
    try {
      return !localStorage.getItem(ONBOARDING_KEY);
    } catch {
      return false;
    }
  });

  const show = () => setOpen(true);
  const close = () => setOpen(false);

  return { open, show, close };
}
