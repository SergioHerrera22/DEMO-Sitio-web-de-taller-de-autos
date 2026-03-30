import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  Car,
  Home,
  FileText,
  CreditCard,
  Droplets,
  Receipt,
  Shield,
  RefreshCw,
  Menu,
  BookOpen,
  MonitorPlay,
  Clapperboard,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { sync } from "../../services/syncEngine";
import { HelpGuide } from "./HelpGuide";
import { WelcomeBanner } from "./WelcomeBanner";
import { OnboardingGuide, useOnboardingGuide } from "./OnboardingGuide";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const PRESENTATION_MODE_KEY = "taller_pro_demo_presentation_mode";
  const location = useLocation();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(() => {
    try {
      return localStorage.getItem(PRESENTATION_MODE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const { open: guideOpen, show: showGuide, close: closeGuide } = useOnboardingGuide();

  useEffect(() => {
    const openTour = () => showGuide();
    window.addEventListener("app:startTour", openTour);
    return () => window.removeEventListener("app:startTour", openTour);
  }, [showGuide]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Inicio", icon: Home, tourId: "nav-inicio" },
    {
      path: "/ordenes",
      label: "Órdenes",
      icon: FileText,
      tourId: "nav-ordenes",
    },
    {
      path: "/cuentas",
      label: "Cuentas",
      icon: Receipt,
      tourId: "nav-cuentas",
    },
    {
      path: "/cheques",
      label: "Cheques",
      icon: CreditCard,
      tourId: "nav-cheques",
    },
    {
      path: "/lavados",
      label: "Lavados",
      icon: Droplets,
      tourId: "nav-lavados",
    },
    {
      path: "/gestion-financiera",
      label: "Finanzas",
      icon: Shield,
      tourId: "nav-finanzas",
    },
  ];

  const showRefreshButton = location.pathname !== "/gestion-financiera";

  const togglePresentationMode = () => {
    setIsPresentationMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(PRESENTATION_MODE_KEY, String(next));
      } catch {
        // noop if storage unavailable
      }

      if (next) {
        toast.success("Modo presentación activado");
      } else {
        toast.success("Modo presentación desactivado");
      }

      return next;
    });
  };

  const handleRefreshData = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      const res = await sync();
      if (!res?.success) toast.error("Error sincronizando datos");

      window.dispatchEvent(new Event("app:refreshData"));
      toast.success("Datos actualizados");
    } catch (error) {
      console.error(error);
      toast.error("Error sincronizando datos");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center min-w-0">
              <div className="flex-shrink-0 flex items-center min-w-0">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900 truncate">
                  Taller PRO
                </span>
              </div>
              {/* Desktop nav */}
              <div className="ml-6 hidden md:flex space-x-1">
                {navLinks.map(({ path, label, icon: Icon, tourId }) => (
                  <Link
                    key={path}
                    to={path}
                    data-tour={tourId}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive(path)
                        ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile nav trigger */}
              <div className="md:hidden">
                <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2"
                      aria-label="Abrir menú"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-blue-600" />
                        Taller PRO
                      </SheetTitle>
                    </SheetHeader>

                    <div className="px-2 pb-4">
                      <div className="space-y-1">
                        {navLinks.map(({ path, label, icon: Icon, tourId }) => (
                          <SheetClose asChild key={path}>
                            <Link
                              to={path}
                              data-tour={`${tourId}-mobile`}
                              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                                isActive(path)
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{label}</span>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <Button
                variant={isPresentationMode ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={togglePresentationMode}
                title="Activar/desactivar modo presentación"
              >
                <MonitorPlay className="h-4 w-4" />
                <span className="hidden sm:inline">Presentación</span>
              </Button>

              {!isPresentationMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={showGuide}
                  title="Ver guía de uso"
                  data-tour="tour-open-button"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Tour</span>
                </Button>
              )}

              {/* Help Button */}
              {!isPresentationMode && <HelpGuide />}

              {showRefreshButton && !isPresentationMode && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Actualizar Datos</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <OnboardingGuide open={guideOpen} onClose={closeGuide} />
      {isPresentationMode ? (
        <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 text-cyan-800 text-sm font-medium">
              <Clapperboard className="h-4 w-4" />
              Demostración en vivo: Vehículo - Orden - Búsqueda - Finanzas -
              Implementación.
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-100"
              onClick={() => navigate("/ordenes")}
            >
              Ver Flujo en Vivo
            </Button>
          </div>
        </div>
      ) : (
        <WelcomeBanner />
      )}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
