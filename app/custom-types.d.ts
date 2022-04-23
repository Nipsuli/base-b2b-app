import '@remix-run/cloudflare'

// these map with the fields in .env
declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    SERVER_URL: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_KEY: string;
    PUBLIC_SUPABASE_ANON_KEY: string;
    COOKIE_SECRET_1: string;
    SESSION_KV: KVNamespace;
  }
}