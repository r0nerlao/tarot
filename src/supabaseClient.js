import { createClient } from '@supabase/supabase-js';

// Load from environment variables (CRA exposes REACT_APP_ prefix vars)
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate that credentials are present
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase credentials. Ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set in your environment.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
