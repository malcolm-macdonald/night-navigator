
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default empty values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client for development when credentials are missing
const createMockClient = () => {
  console.warn(
    'Using mock Supabase client. Please set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
  
  // Return a mock client with all methods as no-ops
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Mock: Auth not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Mock: Auth not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      })
    },
    // Add missing properties required by SupabaseClient type
    supabaseUrl: '',
    supabaseKey: '',
    realtime: {
      channel: () => ({
        on: () => ({}),
        subscribe: () => Promise.resolve({}),
      }),
    },
    realtimeUrl: '',
    rest: {},
    removeAllChannels: () => {},
    removeChannel: () => {},
    getChannels: () => [],
  } as unknown as SupabaseClient;
};

// Create and export the Supabase client (real or mock)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();
