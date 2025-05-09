import { createClient } from '@supabase/supabase-js';
import { CookieOptions } from '@supabase/ssr';

// Client-side Supabase client
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For server components, use this function instead of the above client
export async function createServerSupabaseClient() {
  const { createServerClient } = await import('@supabase/ssr');
  const { cookies } = await import('next/headers');
  
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            // Convert Supabase cookie options to Next.js cookie options
            cookieStore.set({
              name,
              value,
              ...options
            });
          } catch (error) {
            // Handle errors silently in production
            if (process.env.NODE_ENV !== 'production') {
              console.error('Error setting cookie:', error);
            }
          }
        },
        remove(name, options) {
          try {
            // Convert Supabase cookie options to Next.js cookie options
            cookieStore.delete({
              name,
              ...options
            });
          } catch (error) {
            // Handle errors silently in production
            if (process.env.NODE_ENV !== 'production') {
              console.error('Error removing cookie:', error);
            }
          }
        },
      },
    }
  );
} 