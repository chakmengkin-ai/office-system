import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key'
    )
}

// Singleton instance for client-side usage if needed, though createClient() is preferred for SSR consistency
export const supabase = createClient()
