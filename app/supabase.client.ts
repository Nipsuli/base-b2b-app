import { createClient } from '@supabase/supabase-js'
export { SupabaseClient } from '@supabase/supabase-js'

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string
      PUBLIC_SUPABASE_ANON_KEY: string
    }
  }
}

export const supabase = () => {
  if (!window.env.SUPABASE_URL)
    throw new Error('SUPABASE_URL is required')

  if (!window.env.PUBLIC_SUPABASE_ANON_KEY)
    throw new Error('PUBLIC_SUPABASE_ANON_KEY is required')

  // Supabase options example (build your own :))
  // https://supabase.com/docs/reference/javascript/initializing#with-additional-parameters

  const supabaseOptions = {
    fetch: fetch.bind(globalThis), // see ⚠️ cloudflare
    schema: "public",
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true
  };
  // ⚠️ cloudflare needs you define fetch option : https://github.com/supabase/supabase-js#custom-fetch-implementation
  // Use Remix fetch polyfill for node (See https://remix.run/docs/en/v1/other-api/node)
  return createClient(
    window.env.SUPABASE_URL,
    window.env.PUBLIC_SUPABASE_ANON_KEY,
    supabaseOptions
  )
}