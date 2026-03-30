import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Vehicle, Expense, CuentaCorriente } from "../types";
import { db } from "../../db";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { VehicleForm } from "../components/VehicleForm";

import {
  Search,
  Plus,
  Car,
  FileText,
  Edit2,
  Trash2,
  Sparkles,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { createId } from "../../utils";
import { dataRepository } from "../../services/dataRepository";

export function Dashboard() {
  const ITEMS_PER_PAGE = 6;

  const navigate = useNavigate();

  const [searchPatente, setSearchPatente] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [foundVehicle, setFoundVehicle] = useState<Vehicle | null>(null);
  const [deudaCuentasCorrientes, setDeudaCuentasCorrientes] = useState(0);
  const [egresosTotales, setEgresosTotales] = useState(0);
  const [listSearchTerm, setListSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadVehicles();
    loadDeudaCuentasCorrientes();
    loadEgresosTotales();
  }, []);

  useEffect(() => {
    const handler = () => {
      loadVehicles();
      loadDeudaCuentasCorrientes();
      loadEgresosTotales();
    };

    window.addEventListener("app:refreshData", handler);
    return () => window.removeEventListener("app:refreshData", handler);
  }, []);

  const loadVehicles = async () => {
    const vehiclesDB = await db.vehicles.toArray();
    setVehicles(vehiclesDB.filter((vehicle) => !vehicle.deleted));
  };

  const loadDeudaCuentasCorrientes = async () => {
    const cuentas: CuentaCorriente[] = await db.cuentasCorrientes.toArray();
    const totalDeuda = cuentas
      .filter((c) => c.saldo < 0)
      .reduce((sum, c) => sum + c.saldo, 0);
    setDeudaCuentasCorrientes(totalDeuda);
  };

  const loadEgresosTotales = async () => {
    const egresos: Expense[] = await db.expenses.toArray();
    const totalEgresos = egresos.reduce(
      (sum, e) => sum + (e.total || e.monto || 0),
      0,
    );
    setEgresosTotales(totalEgresos);
  };

  const handleSearch = () => {
    if (!searchPatente.trim()) {
      toast.error("Ingrese una patente para buscar");
      return;
    }

    const vehicle = vehicles.find(
      (v) => v.patente.toUpperCase() === searchPatente.toUpperCase(),
    );

    setSearchAttempted(true);
    setFoundVehicle(vehicle || null);

    if (vehicle) {
      navigate(`/vehiculo/${vehicle.id}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRegisterVehicle = async (
    vehicleData: Omit<Vehicle, "id" | "createdAt">,
  ) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: createId(),
      createdAt: new Date().toISOString(),
    };

    await dataRepository.saveVehicle(newVehicle);

    setVehicles((prev) => [...prev, newVehicle]);
    setShowVehicleForm(false);
    setEditingVehicle(null);

    toast.success("Vehículo registrado exitosamente");

    navigate(`/vehiculo/${newVehicle.id}`);
  };

  const handleUpdateVehicle = async (
    vehicleData: Omit<Vehicle, "id" | "createdAt">,
  ) => {
    if (!editingVehicle) return;

    const updatedVehicle: Vehicle = {
      ...editingVehicle,
      ...vehicleData,
    };

    await dataRepository.saveVehicle(updatedVehicle);

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle,
      ),
    );

    setShowVehicleForm(false);
    setEditingVehicle(null);
    toast.success("Vehículo actualizado exitosamente");
  };

  const handleOpenCreateVehicle = () => {
    setEditingVehicle(null);
    setShowVehicleForm(true);
  };

  const handleOpenEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleForm(true);
  };

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    const shouldDelete = window.confirm(
      `¿Seguro que querés eliminar el vehículo ${vehicle.patente}?`,
    );

    if (!shouldDelete) return;

    await dataRepository.deleteVehicle(vehicle.id);

    setVehicles((prev) => prev.filter((item) => item.id !== vehicle.id));

    if (editingVehicle?.id === vehicle.id) {
      setEditingVehicle(null);
      setShowVehicleForm(false);
    }

    toast.success("Vehículo eliminado exitosamente");
  };

  const normalizedListSearchTerm = listSearchTerm.trim().toLowerCase();

  const filteredVehicles = [...vehicles]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .filter((vehicle) => {
      if (!normalizedListSearchTerm) return true;

      const searchableText = [
        vehicle.patente,
        vehicle.cliente,
        vehicle.marca,
        vehicle.modelo,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedListSearchTerm);
    });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedVehicles = filteredVehicles.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [listSearchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const demoWhatsAppMessage = encodeURIComponent(
    "Hola, quiero implementar Taller PRO en mi taller. Me interesa precio y tiempos de implementación.",
  );
  const whatsappNumber = "2644457616";

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-16 -right-14 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-cyan-200/20 blur-2xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            DEMO COMERCIAL
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Su taller más ordenado, rentable y profesional
          </h1>

          <p className="text-cyan-50/95 max-w-3xl text-sm sm:text-base">
            Centralice vehículos, órdenes y cobros en una sola plataforma. Esta
            demo en vivo le muestra cómo mejorar control y productividad desde
            la primera semana.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="justify-between bg-white text-cyan-700 hover:bg-cyan-50"
              onClick={handleOpenCreateVehicle}
            >
              Registrar Vehículo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              className="justify-between bg-slate-900/35 border border-white/25 hover:bg-slate-900/55"
              onClick={() => navigate("/ordenes")}
            >
              Crear Orden de Trabajo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              className="justify-between bg-emerald-500 hover:bg-emerald-400 text-white"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${demoWhatsAppMessage}`,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Quiero esta Solución
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-sky-100 bg-sky-50/70">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-sky-700 font-semibold mb-2">
              Vehículos activos
            </p>
            <p className="text-3xl font-bold text-sky-900">{vehicles.length}</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 bg-orange-50/70">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold mb-2">
              Deuda proveedores
            </p>
            <p className="text-3xl font-bold text-orange-900">
              ${Math.abs(deudaCuentasCorrientes).toFixed(0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-100 bg-rose-50/70">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-rose-700 font-semibold mb-2">
              Egresos acumulados
            </p>
            <p className="text-3xl font-bold text-rose-900">
              ${egresosTotales.toFixed(0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-emerald-50/80">
          <CardContent className="pt-6 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2">
                Próximo paso
              </p>
              <p className="text-sm font-semibold text-emerald-900">
                Mostrar Finanzas
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
              onClick={() => navigate("/gestion-financiera")}
            >
              <Wallet className="h-4 w-4 mr-1" />
              Ir
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Autos cargados
            </CardTitle>
            <CardDescription className="text-white/80">
              Total de vehículos registrados en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{vehicles.length}</span>
              <Button
                variant="secondary"
                className="bg-white text-blue-600 font-semibold"
                onClick={handleOpenCreateVehicle}
                data-tour="dashboard-new-vehicle-btn"
              >
                <Plus className="h-4 w-4 mr-2" />
                Registrar nuevo auto
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buscar Vehículo</CardTitle>
            <CardDescription>
              Ingrese la patente para ver el historial de servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Ej: ABC123"
                  value={searchPatente}
                  onChange={(e) => {
                    setSearchPatente(e.target.value.toUpperCase());
                    setSearchAttempted(false);
                  }}
                  onKeyPress={handleKeyPress}
                  className="uppercase text-lg"
                  data-tour="dashboard-search-patente"
                />
              </div>
              <Button onClick={handleSearch} size="lg">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>

            {searchAttempted && !foundVehicle && searchPatente && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 mb-3">
                  No se encontró ningún vehículo con la patente{" "}
                  <strong>{searchPatente}</strong>
                </p>
                <Button
                  onClick={handleOpenCreateVehicle}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar este vehículo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {vehicles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Vehículos Cargados</CardTitle>
            <CardDescription>
              Visualización paginada con búsqueda por patente, cliente y modelo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <Input
                placeholder="Filtrar por patente, cliente o vehículo"
                value={listSearchTerm}
                onChange={(e) => setListSearchTerm(e.target.value)}
                className="sm:max-w-sm"
              />
              <p className="text-sm text-gray-600">
                Mostrando {paginatedVehicles.length} de{" "}
                {filteredVehicles.length} vehículos
              </p>
            </div>

            <div className="space-y-3">
              {paginatedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {vehicle.patente}
                      </p>
                      <p className="text-sm text-gray-600">
                        {vehicle.marca} {vehicle.modelo} ({vehicle.anio})
                      </p>
                      <p className="text-sm text-gray-500">{vehicle.cliente}</p>
                      <p className="text-xs text-gray-500">
                        Registrado:{" "}
                        {new Date(vehicle.createdAt).toLocaleDateString(
                          "es-AR",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditVehicle(vehicle)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/vehiculo/${vehicle.id}`)}
                    >
                      <FileText className="h-4 w-4" />
                      Ver
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => void handleDeleteVehicle(vehicle)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <p className="text-sm text-gray-600 mt-4">
                No hay vehículos que coincidan con el filtro.
              </p>
            )}

            {filteredVehicles.length > ITEMS_PER_PAGE && (
              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={safeCurrentPage === 1}
                >
                  Anterior
                </Button>
                <p className="text-sm text-gray-600">
                  Página {safeCurrentPage} de {totalPages}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={safeCurrentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showVehicleForm && (
        <VehicleForm
          patente={searchPatente}
          initialData={editingVehicle ?? undefined}
          onSubmit={
            editingVehicle ? handleUpdateVehicle : handleRegisterVehicle
          }
          onCancel={() => {
            setShowVehicleForm(false);
            setEditingVehicle(null);
          }}
        />
      )}
    </div>
  );
}
