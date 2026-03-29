import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { sync } from "../services/syncEngine";

export default function App() {
  // Mantiene compatibilidad de estado para el panel financiero en modo demo local.
  useEffect(() => {
    void sync();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}
