import { db } from "../db";
import type {
  Vehicle,
  OrdenTrabajo,
  Expense,
  Cheque,
  CuentaCorriente,
} from "../app/types";
import { DEMO_LIMITS, DemoLimitError, DemoLimitedTable } from "./demoConfig";

function nowIso() {
  return new Date().toISOString();
}

function broadcastDataRefresh() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("app:refreshData"));
  }
}

async function assertDemoLimit(
  table: DemoLimitedTable,
  isNewRecord: boolean,
  isDeleted: boolean,
) {
  if (!isNewRecord || isDeleted) return;

  const activeCount = await db[table]
    .filter((item: { deleted?: boolean }) => !item.deleted)
    .count();

  if (activeCount >= DEMO_LIMITS[table]) {
    throw new DemoLimitError(table, DEMO_LIMITS[table]);
  }
}

export const dataRepository = {
  async saveVehicle(entity: Vehicle) {
    const previous = await db.vehicles.get(entity.id);
    const updatedAt = nowIso();
    const record: Vehicle = {
      ...entity,
      updatedAt,
      deleted: entity.deleted ?? false,
    };

    await assertDemoLimit(
      "vehicles",
      !previous || previous.deleted === true,
      record.deleted ?? false,
    );
    await db.vehicles.put(record);
    broadcastDataRefresh();
    return record;
  },

  async deleteVehicle(id: string) {
    const existing = await db.vehicles.get(id);
    const updatedAt = nowIso();
    const record: Vehicle = {
      ...(existing as Vehicle),
      id,
      deleted: true,
      updatedAt,
    };
    await db.vehicles.put(record);
    broadcastDataRefresh();
  },

  async saveOrdenTrabajo(entity: OrdenTrabajo) {
    const previous = await db.ordenesTrabajo.get(entity.id);
    const updatedAt = nowIso();
    const record: OrdenTrabajo = {
      ...entity,
      updatedAt,
      deleted: entity.deleted ?? false,
    };

    await assertDemoLimit(
      "ordenesTrabajo",
      !previous || previous.deleted === true,
      record.deleted ?? false,
    );
    await db.ordenesTrabajo.put(record);
    broadcastDataRefresh();
    return record;
  },

  async deleteOrdenTrabajo(id: string) {
    const existing = await db.ordenesTrabajo.get(id);
    const updatedAt = nowIso();
    const record: OrdenTrabajo = {
      ...(existing as OrdenTrabajo),
      id,
      deleted: true,
      updatedAt,
    };
    await db.ordenesTrabajo.put(record);
    broadcastDataRefresh();
  },

  async saveExpense(entity: Expense) {
    const previous = await db.expenses.get(entity.id);
    const updatedAt = nowIso();
    const record: Expense = {
      ...entity,
      updatedAt,
      deleted: entity.deleted ?? false,
    };

    await assertDemoLimit(
      "expenses",
      !previous || previous.deleted === true,
      record.deleted ?? false,
    );
    await db.expenses.put(record);
    broadcastDataRefresh();
    return record;
  },

  async deleteExpense(id: string) {
    const existing = await db.expenses.get(id);
    const updatedAt = nowIso();
    const record: Expense = {
      ...(existing as Expense),
      id,
      deleted: true,
      updatedAt,
    };
    await db.expenses.put(record);
    broadcastDataRefresh();
  },

  async saveCheque(entity: Cheque) {
    const previous = await db.cheques.get(entity.id);
    const updatedAt = nowIso();
    const record: Cheque = {
      ...entity,
      updatedAt,
      deleted: entity.deleted ?? false,
    };

    await assertDemoLimit(
      "cheques",
      !previous || previous.deleted === true,
      record.deleted ?? false,
    );
    await db.cheques.put(record);
    broadcastDataRefresh();
    return record;
  },

  async deleteCheque(id: string) {
    const existing = await db.cheques.get(id);
    const updatedAt = nowIso();
    const record: Cheque = {
      ...(existing as Cheque),
      id,
      deleted: true,
      updatedAt,
    };
    await db.cheques.put(record);
    broadcastDataRefresh();
  },

  async saveCuentaCorriente(entity: CuentaCorriente) {
    const previous = await db.cuentasCorrientes.get(entity.id);
    const updatedAt = nowIso();
    const record: CuentaCorriente = {
      ...entity,
      updatedAt,
      deleted: entity.deleted ?? false,
    };

    await assertDemoLimit(
      "cuentasCorrientes",
      !previous || previous.deleted === true,
      record.deleted ?? false,
    );
    await db.cuentasCorrientes.put(record);
    broadcastDataRefresh();
    return record;
  },

  async deleteCuentaCorriente(id: string) {
    const existing = await db.cuentasCorrientes.get(id);
    const updatedAt = nowIso();
    const record: CuentaCorriente = {
      ...(existing as CuentaCorriente),
      id,
      deleted: true,
      updatedAt,
    };
    await db.cuentasCorrientes.put(record);
    broadcastDataRefresh();
  },
};
