import { ref, onMounted } from 'vue'
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (supabase) return supabase
  const url = (typeof __SUPABASE_URL__ !== 'undefined' && __SUPABASE_URL__) || ''
  const key = (typeof __SUPABASE_ANON_KEY__ !== 'undefined' && __SUPABASE_ANON_KEY__) || ''
  if (!url || !key) return null
  supabase = createClient(url, key)
  return supabase
}

const user = ref<User | null>(null)
const loading = ref(true)

export function useAuth() {
  onMounted(async () => {
    const sb = getSupabase()
    if (!sb) { loading.value = false; return }
    const { data } = await sb.auth.getSession()
    user.value = data.session?.user ?? null
    loading.value = false
    sb.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  })

  async function signIn() {
    const sb = getSupabase()
    if (!sb) return
    await sb.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    })
  }

  async function signOut() {
    const sb = getSupabase()
    if (!sb) return
    await sb.auth.signOut()
    user.value = null
  }

  return { user, loading, signIn, signOut, getSupabase }
}
