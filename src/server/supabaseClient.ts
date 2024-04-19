import { createClient } from "@supabase/supabase-js";

// Access in both .astro components and TypeScript code
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
