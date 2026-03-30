import { useState, useEffect, useCallback, type ElementType } from "react";
import { useLocation, useNavigate } from "react-router";
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
  Droplets,
} from "lucide-react";
import { Button } from "./ui/button";

export const ONBOARDING_KEY = "taller_pro_onboarding_v1";

type StepAction = "click" | "input";

interface Step {
  icon: ElementType;
  color: string;
  bg: string;
  title: string;
  text: string;
  hint: string;
  route?: string;
  selector?: string;
  requiredAction?: StepAction;
  requiredSelectors?: string[];
  autoAdvance?: boolean;
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    title: "¡Bienvenido a Taller PRO!",
    text: "Te voy a guiar paso a paso por la app completa. Vas a ver focos animados sobre botones y campos reales para que aprendas haciendo.",
    hint: "El texto aparece tipo máquina de escribir. Podés acelerar cada paso con el botón de continuar.",
    route: "/",
  },
  {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Crear vehículo",
    text: "Empezamos por lo esencial: hacé clic en Registrar nuevo auto para abrir el formulario.",
    hint: "Cuando lo pulses avanzo automáticamente al siguiente paso.",
    route: "/",
    selector: '[data-tour="dashboard-new-vehicle-btn"]',
    requiredAction: "click",
    autoAdvance: true,
  },
  {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Patente del vehículo",
    text: "Perfecto. Ahora completá la patente en este campo.",
    hint: "Ejemplo: ABC123. Cuando la completes, avanzo automáticamente.",
    selector: '[data-tour="vehicle-form-patente"]',
    requiredAction: "input",
    requiredSelectors: ['[data-tour="vehicle-form-patente"]'],
    autoAdvance: true,
  },
  {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Datos del cliente",
    text: "Completá el nombre del cliente y su teléfono para asociar correctamente el vehículo.",
    hint: "Mientras más completo el alta, mejor será la gestión posterior.",
    selector: '[data-tour="vehicle-form-cliente"]',
    requiredAction: "input",
    requiredSelectors: [
      '[data-tour="vehicle-form-cliente"]',
      '[data-tour="vehicle-form-telefono"]',
    ],
    autoAdvance: true,
  },
  {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    title: "Guardar vehículo",
    text: "Cuando termines, presioná Registrar Vehículo para crear el registro.",
    hint: "Al crearlo, podrás usarlo en órdenes de trabajo.",
    selector: '[data-tour="vehicle-form-submit"]',
    requiredAction: "click",
    autoAdvance: true,
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Ir a Órdenes",
    text: "Ahora te llevo a Órdenes de Trabajo para crear una OT.",
    hint: "Voy a enfocar el botón principal de alta.",
    route: "/ordenes",
    selector: '[data-tour="orders-new-btn"]',
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Nueva OT",
    text: "Hacé clic en Nueva OT para abrir el formulario de orden.",
    hint: "Este paso abre el circuito operativo del taller.",
    selector: '[data-tour="orders-new-btn"]',
    requiredAction: "click",
    autoAdvance: true,
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Asignar técnico",
    text: "En la orden, indicá quién hará el trabajo en el campo Técnico.",
    hint: "También puedes seleccionar el vehículo y fecha antes de guardar.",
    selector: '[data-tour="order-form-tecnico"]',
    requiredAction: "input",
    requiredSelectors: ['[data-tour="order-form-tecnico"]'],
    autoAdvance: true,
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Descripción del trabajo",
    text: "Escribí una descripción clara del trabajo a realizar o realizado.",
    hint: "Esto impacta en la trazabilidad y en la impresión del comprobante.",
    selector: '[data-tour="order-form-descripcion"]',
    requiredAction: "input",
    requiredSelectors: ['[data-tour="order-form-descripcion"]'],
    autoAdvance: true,
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Crear orden",
    text: "Para cerrar el flujo, presioná Crear Orden.",
    hint: "Al guardar, la OT queda disponible en el listado con filtros.",
    selector: '[data-tour="order-form-submit"]',
    requiredAction: "click",
    autoAdvance: true,
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    title: "Buscar OT",
    text: "Este buscador te permite localizar órdenes por número, patente o cliente.",
    hint: "Úsalo junto con filtros de estado y orden para trabajar más rápido.",
    selector: '[data-tour="orders-search-input"]',
  },
  {
    icon: Receipt,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    title: "Cuentas corrientes",
    text: "Pasamos a Cuentas: acá gestionás bancos, proveedores y sus saldos.",
    hint: "Te marco primero cómo crear una cuenta nueva.",
    route: "/cuentas",
    selector: '[data-tour="cuentas-new-btn"]',
  },
  {
    icon: Receipt,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    title: "Nueva cuenta",
    text: "Hacé clic en Nueva Cuenta para abrir el formulario.",
    hint: "Luego completaremos el nombre de la entidad.",
    selector: '[data-tour="cuentas-new-btn"]',
    requiredAction: "click",
    autoAdvance: true,
  },
  {
    icon: Receipt,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    title: "Entidad",
    text: "Ingresá el nombre de la entidad, por ejemplo un banco o proveedor.",
    hint: "Después puedes guardar con el botón Crear Cuenta.",
    selector: '[data-tour="cuentas-form-entidad"]',
    requiredAction: "input",
    requiredSelectors: ['[data-tour="cuentas-form-entidad"]'],
    autoAdvance: true,
  },
  {
    icon: CreditCard,
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    title: "Gestión de cheques",
    text: "Ahora vamos a Cheques para registrar y buscar movimientos rápidamente.",
    hint: "Te enfoco el botón de alta.",
    route: "/cheques",
    selector: '[data-tour="cheques-new-btn"]',
  },
  {
    icon: CreditCard,
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    title: "Buscar cheques",
    text: "Desde este buscador puedes filtrar por número o emisor.",
    hint: "También puedes combinar con el estado para depurar el listado.",
    selector: '[data-tour="cheques-search-input"]',
  },
  {
    icon: Droplets,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    title: "Lavados",
    text: "Te llevo a Lavados para ver estadísticas y evolución mensual.",
    hint: "El foco muestra la tarjeta principal con el indicador del mes actual.",
    route: "/lavados",
    selector: '[data-tour="lavados-stat-card"]',
  },
  {
    icon: Shield,
    color: "text-rose-400",
    bg: "bg-rose-500/20",
    title: "Finanzas protegidas",
    text: "Entramos a Finanzas. Está protegido por contraseña, así que te marco el acceso.",
    hint: "Usa la clave configurada en tu sistema y luego pulsa Acceder.",
    route: "/gestion-financiera",
    selector: '[data-tour="finanzas-password-input"]',
  },
  {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/20",
    title: "¡Tour completo!",
    text: "Ya recorriste de punta a punta el flujo principal de la app. Puedes repetir este Tour cuando quieras desde el botón superior.",
    hint: "Si quieres, en la próxima iteración te preparo un tour avanzado por cada formulario en detalle.",
  },
];

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

interface OnboardingGuideProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingGuide({ open, onClose }: OnboardingGuideProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [actionDone, setActionDone] = useState(true);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const { displayed, done, skipToEnd } = useTypewriter(
    open ? current.text : "",
    22,
  );

  const setCompleted = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
  };

  const getActionTargets = useCallback((stepData: Step): HTMLElement[] => {
    const selectors =
      stepData.requiredSelectors && stepData.requiredSelectors.length > 0
        ? stepData.requiredSelectors
        : stepData.selector
          ? [stepData.selector]
          : [];

    return selectors
      .map((selector) => document.querySelector(selector))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
  }, []);

  const areInputTargetsFilled = useCallback(
    (stepData: Step) => {
      const targets = getActionTargets(stepData);
      if (targets.length === 0) return false;

      return targets.every((el) => {
        if (
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement
        ) {
          return el.value.trim().length > 0;
        }

        const value = el.getAttribute("value") || "";
        return value.trim().length > 0;
      });
    },
    [getActionTargets],
  );

  const closeGuide = () => {
    setCompleted();
    onClose();
  };

  useEffect(() => {
    if (open) {
      setStep(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (current.route && location.pathname !== current.route) {
      navigate(current.route);
    }
  }, [current.route, location.pathname, navigate, open]);

  useEffect(() => {
    if (!open) return;

    setActionDone(!current.requiredAction);
    setTargetEl(null);
    setTargetRect(null);

    const selector = current.selector;
    if (!selector) return;

    let attempts = 0;
    const id = window.setInterval(() => {
      const el = document.querySelector(selector);
      if (el instanceof HTMLElement) {
        setTargetEl(el);
        setTargetRect(el.getBoundingClientRect());
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        window.clearInterval(id);
      }

      attempts += 1;
      if (attempts > 80) {
        window.clearInterval(id);
      }
    }, 150);

    return () => window.clearInterval(id);
  }, [current.requiredAction, current.selector, open, step]);

  useEffect(() => {
    if (!open || !targetEl) return;

    const updateRect = () => {
      setTargetRect(targetEl.getBoundingClientRect());
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [open, targetEl]);

  useEffect(() => {
    if (!open || !targetEl || !current.requiredAction) return;

    const targets = getActionTargets(current);
    if (targets.length === 0) return;

    if (current.requiredAction === "click") {
      const clickHandler = () => setActionDone(true);
      targets.forEach((el) => el.addEventListener("click", clickHandler));

      return () => {
        targets.forEach((el) => el.removeEventListener("click", clickHandler));
      };
    }

    const evaluate = () => {
      setActionDone(areInputTargetsFilled(current));
    };

    evaluate();
    targets.forEach((el) => {
      el.addEventListener("input", evaluate);
      el.addEventListener("change", evaluate);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("input", evaluate);
        el.removeEventListener("change", evaluate);
      });
    };
  }, [areInputTargetsFilled, current, current.requiredAction, getActionTargets, open, targetEl]);

  useEffect(() => {
    if (!open) return;
    if (!current.autoAdvance || !actionDone || !done) return;
    if (isLast) return;

    const timeout = window.setTimeout(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [actionDone, current.autoAdvance, done, isLast, open]);

  const handleNext = () => {
    if (!done) {
      skipToEnd();
      return;
    }

    if (current.requiredAction && !actionDone) {
      return;
    }

    if (isLast) {
      closeGuide();
      return;
    }

    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setStep((s) => s - 1);
  };

  if (!open) return null;

  const Icon = current.icon;
  const progressPct = (step / (STEPS.length - 1)) * 100;
  const requiresAction = Boolean(current.requiredAction);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-black/70" />

      {targetRect && (
        <div
          className="fixed rounded-xl border-2 border-blue-400 animate-pulse"
          style={{
            left: targetRect.left - 8,
            top: targetRect.top - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow:
              "0 0 0 9999px rgba(0, 0, 0, 0.45), 0 0 28px rgba(59,130,246,0.7)",
          }}
        />
      )}

      <div className="pointer-events-auto fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[460px] bg-gray-900 border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 bg-gray-800 w-full">
          <div
            className="h-1 bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {!isLast && (
          <button
            onClick={closeGuide}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar guía"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="p-6 sm:p-7">
          <div className="flex gap-1.5 mb-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                  i <= step ? "bg-blue-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          <div className={`inline-flex p-3.5 rounded-xl ${current.bg} mb-4`}>
            <Icon className={`h-7 w-7 ${current.color}`} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            {current.title}
          </h2>

          <div className="min-h-[84px] mb-3">
            <p className="text-gray-300 text-base leading-relaxed">
              {displayed}
              {!done && (
                <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          </div>

          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: done && current.hint ? "120px" : "0px",
              opacity: done && current.hint ? 1 : 0,
            }}
          >
            <div className="bg-gray-800 border border-gray-700/60 rounded-lg px-4 py-3 mb-2">
              <p className="text-sm text-gray-400">{current.hint}</p>
            </div>
          </div>

          {requiresAction && done && !actionDone && (
            <p className="text-xs text-amber-300 mb-3">
              Este paso requiere que interactúes con el elemento resaltado para
              continuar.
            </p>
          )}

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={handlePrev}
              disabled={isFirst}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>

            <span className="text-xs text-gray-500 tabular-nums">
              {step + 1} / {STEPS.length}
            </span>

            <Button
              onClick={handleNext}
              disabled={done && requiresAction && !actionDone}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 transition-colors"
            >
              {!done ? "Saltear texto" : isLast ? "Finalizar" : "Continuar"}
              {done && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
