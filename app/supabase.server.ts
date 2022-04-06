import { createClient } from '@supabase/supabase-js'
import type { ApiError, Session } from '@supabase/supabase-js'
import { AppLoadContext } from '@remix-run/cloudflare'

export const supabaseAdmin = (context: AppLoadContext) => {
  if (!context.SUPABASE_URL)
    throw new Error('ENV: SUPABASE_URL is required')

  if (!context.SUPABASE_SERVICE_KEY)
    throw new Error('ENV: SUPABASE_SERVICE_KEY is required')

  const supabaseOptions = {
    fetch: fetch.bind(globalThis), // see ⚠️ cloudflare
    schema: "public",
    autoRefreshToken: true,
  };

  createClient(
    context.SUPABASE_URL,
    context.SUPABASE_SERVICE_KEY,
    supabaseOptions
  )
}

export { Session, ApiError }