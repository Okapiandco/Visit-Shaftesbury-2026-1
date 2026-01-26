import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a client only if we have the required environment variables
// This prevents build errors when env vars are not set
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a placeholder client for build time
  // This will be replaced with the real client at runtime
  supabase = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  );
}

export { supabase };
export default supabase;
