
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'VOTRE_URL_SUPABASE';
const supabaseKey = 'VOTRE_CLE_ANON_PUBLIQUE';

export const supabase = createClient(supabaseUrl, supabaseKey);
