import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// En modo demo o sin credenciales, crear un mock que no falla
let supabaseClient;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  // Mock client para modo demo (sincronización ya está bloqueada por DEMO_MODE en syncEngine)
  supabaseClient = {
    from: () => ({
      select: () => ({ 
        gt: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) 
      }),
      upsert: () => Promise.resolve({ error: null }),
      delete: () => Promise.resolve({ error: null }),
    }),
  };
}

export const supabase = supabaseClient;
