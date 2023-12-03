import { createClient } from '@supabase/supabase-js';

import { Database } from 'types/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
