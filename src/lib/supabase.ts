
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use provided Supabase URL and Anon Key
const supabaseUrl = 'https://hsvyldblgrqcgqlsgxsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdnlsZGJsZ3JxY2dxbHNneHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3ODgxNTgsImV4cCI6MjA1ODM2NDE1OH0.FRq5VJv_7ZUu5oEOz_qAvdiHqeIqLg4VNL-rMDoNx8w';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
