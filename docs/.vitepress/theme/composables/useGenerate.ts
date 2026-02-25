import { ref } from 'vue'
import { useAuth } from './useAuth'
import { useApiKeys } from './useApiKeys'

export function useGenerate() {
  const loading = ref(false)
  const error = ref('')
  const result = ref<any>(null)
  const { user, getSupabase } = useAuth()
  const { getKey } = useApiKeys()

  async function generate(type: string, params: Record<string, any>) {
    loading.value = true
    error.value = ''
    result.value = null

    try {
      const apiKey = await getKey(params.provider || 'openai')
      const token = user.value
        ? (await getSupabase()?.auth.getSession())?.data.session?.access_token
        : undefined

      const resp = await fetch(`/api/generate/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...params, apiKey, token })
      })

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}))
        throw new Error(errData.error || `请求失败 (${resp.status})`)
      }

      result.value = await resp.json()
    } catch (e: any) {
      error.value = e.message || '生成失败'
    } finally {
      loading.value = false
    }
  }

  return { generate, loading, error, result }
}
