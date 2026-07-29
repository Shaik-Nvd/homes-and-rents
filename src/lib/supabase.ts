import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please add them to your .env file.');
}

// Ensure the URL is valid HTTP/HTTPS, otherwise fallback. A string like "undefined" or " " will crash the client.
const isValidUrl = (url: string | undefined) => {
  try {
    if (!url) return false;
    new URL(url);
    return url.startsWith('http');
  } catch (e) {
    return false;
  }
};

export const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co', 
  supabaseAnonKey && supabaseAnonKey.trim() !== '' && supabaseAnonKey !== 'undefined' ? supabaseAnonKey : 'placeholder'
);
