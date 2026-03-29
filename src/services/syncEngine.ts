import { db, OutboxEntry, OutboxOperation } from "../db";

function nowIso() {
  return new Date().toISOString();
}

let syncInFlight: Promise<{ success: boolean; error?: unknown }> | null = null;

export async function sync(): Promise<{ success: boolean; error?: unknown }> {
  if (syncInFlight) return syncInFlight;

  syncInFlight = (async () => {
    try {
      // Modo demo: no hay sincronizacion remota.
      await db.sync_meta.put({ key: "lastSyncOkAt", value: nowIso() });
      await db.sync_meta.put({ key: "lastSyncMode", value: "local-demo" });
      await db.sync_meta.put({ key: "lastSyncError", value: "" });
      await db.sync_meta.put({ key: "lastSyncErrorAt", value: "" });
      return { success: true };
    } catch (error) {
      console.error("sync() error", error);
      const message = (error as any)?.message
        ? String((error as any).message)
        : String(error);
      await db.sync_meta.put({ key: "lastSyncError", value: message });
      await db.sync_meta.put({ key: "lastSyncErrorAt", value: nowIso() });
      return { success: false, error };
    } finally {
      syncInFlight = null;
    }
  })();

  return syncInFlight;
}

export async function enqueueOutbox(
  table:
    | "vehicles"
    | "ordenesTrabajo"
    | "expenses"
    | "cheques"
    | "cuentasCorrientes",
  op: OutboxOperation,
  entityId: string,
  payload: unknown,
) {
  const entry: OutboxEntry = {
    id: crypto.randomUUID(),
    table,
    op,
    entityId,
    payload,
    createdAt: nowIso(),
    tries: 0,
  };
  await db.outbox.add(entry);
}
