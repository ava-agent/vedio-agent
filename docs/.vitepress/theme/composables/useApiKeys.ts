import { ref } from 'vue'
import { useAuth } from './useAuth'

const STORAGE_PREFIX = 'vedio-agent:apikey:'

export function useApiKeys() {
  const { user, getSupabase } = useAuth()

  function getLocalKey(provider: string): string {
    if (typeof localStorage === 'undefined') return ''
    return localStorage.getItem(STORAGE_PREFIX + provider) || ''
  }

  function setLocalKey(provider: string, key: string) {
    if (typeof localStorage === 'undefined') return
    if (key) {
      localStorage.setItem(STORAGE_PREFIX + provider, key)
    } else {
      localStorage.removeItem(STORAGE_PREFIX + provider)
    }
  }

  async function saveKey(provider: string, key: string) {
    if (!user.value) {
      setLocalKey(provider, key)
      return
    }
    const resp = await fetch('/api/keys/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        key,
        token: (await getSupabase()?.auth.getSession())?.data.session?.access_token
      })
    })
    if (!resp.ok) {
      setLocalKey(provider, key)
    }
  }

  async function getKey(provider: string): Promise<string> {
    return getLocalKey(provider)
  }

  function hasKey(provider: string): boolean {
    return !!getLocalKey(provider)
  }

  return { saveKey, getKey, hasKey, getLocalKey, setLocalKey }
}
