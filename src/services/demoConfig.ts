export const DEMO_MODE = true;

export const DEMO_LIMITS = {
  vehicles: 12,
  ordenesTrabajo: 40,
  expenses: 25,
  cheques: 25,
  cuentasCorrientes: 15,
} as const;

export type DemoLimitedTable = keyof typeof DEMO_LIMITS;

export class DemoLimitError extends Error {
  readonly code = "DEMO_LIMIT_REACHED";
  readonly table: DemoLimitedTable;
  readonly limit: number;

  constructor(table: DemoLimitedTable, limit: number) {
    super(
      `Limite demo alcanzado para ${getTableLabel(table)}: maximo ${limit} registros.`,
    );
    this.name = "DemoLimitError";
    this.table = table;
    this.limit = limit;
  }
}

export function isDemoLimitError(error: unknown): error is DemoLimitError {
  return (
    error instanceof DemoLimitError ||
    (typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "DEMO_LIMIT_REACHED")
  );
}

function getTableLabel(table: DemoLimitedTable): string {
  switch (table) {
    case "vehicles":
      return "vehiculos";
    case "ordenesTrabajo":
      return "ordenes de trabajo";
    case "expenses":
      return "gastos";
    case "cheques":
      return "cheques";
    case "cuentasCorrientes":
      return "cuentas corrientes";
    default:
      return table;
  }
}
