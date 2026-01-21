
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Initialization
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kwdyigyaipfaxrgzukhc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZHlpZ3lhaXBmYXhyZ3p1a2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MjU1ODQsImV4cCI6MjA4NDUwMTU4NH0.2Sg1gxh4cWvVv-VRYDe2V6OHv5Q5BQ0MUQ6Gcv2UUt8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Authentication Helper Functions
 */
export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Dynamically use the current origin for redirects
      redirectTo: window.location.origin
    }
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/#/reset-password`,
  });
};

/**
 * Storage Helper Functions
 */
export const uploadEventImage = async (file: File) => {
  // Use a flat structure in the bucket for better permission handling
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  
  // Attempt upload to 'events' bucket root
  const { data, error } = await supabase.storage
    .from('events')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Upload failed: ${error.message}. Ensure the 'events' bucket exists and is public.`);
  }

  // Retrieve public URL
  const { data: { publicUrl } } = supabase.storage
    .from('events')
    .getPublicUrl(data.path);

  return publicUrl;
};
