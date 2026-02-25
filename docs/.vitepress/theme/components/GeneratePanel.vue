<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApiKeys } from '../composables/useApiKeys'

const props = defineProps<{
  type: 'image' | 'tts' | 'video' | 'avatar'
  providers?: Array<{ value: string; label: string }>
  defaultPrompt?: string
}>()

const { hasKey, getLocalKey } = useApiKeys()
const provider = ref(props.providers?.[0]?.value || 'openai')
const prompt = ref(props.defaultPrompt || '')
const loading = ref(false)
const error = ref('')
const result = ref<any>(null)

const defaultProviders = {
  image: [
    { value: 'openai', label: 'OpenAI (GPT-Image-1)' },
    { value: 'google', label: 'Google (Imagen 4)' },
    { value: 'stability', label: 'Stability AI' },
  ],
  tts: [
    { value: 'openai', label: 'OpenAI TTS' },
    { value: 'elevenlabs', label: 'ElevenLabs' },
  ],
  video: [
    { value: 'runway', label: 'Runway Gen-4' },
  ],
  avatar: [
    { value: 'heygen', label: 'HeyGen' },
  ],
}

const providerList = computed(() => props.providers || defaultProviders[props.type] || [])
const hasApiKey = computed(() => hasKey(provider.value))

const typeLabels: Record<string, string> = {
  image: '图片生成',
  tts: '语音合成',
  video: '视频生成',
  avatar: '数字人生成',
}

async function generate() {
  if (!prompt.value.trim()) return
  const key = getLocalKey(provider.value)
  if (!key) {
    error.value = `请先设置 ${provider.value} 的 API Key`
    return
  }

  loading.value = true
  error.value = ''
  result.value = null

  try {
    const resp = await fetch(`/api/generate/${props.type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: provider.value,
        prompt: prompt.value,
        apiKey: key,
      })
    })
    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}))
      throw new Error(errData.error || `请求失败 (${resp.status})`)
    }
    result.value = await resp.json()
  } catch (e: any) {
    error.value = e.message || '生成失败，请检查 API Key 和网络连接'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ClientOnly>
    <div class="generate-panel">
      <div class="panel-title">在线{{ typeLabels[type] || '生成' }}</div>

      <select v-model="provider" class="provider-select">
        <option v-for="p in providerList" :key="p.value" :value="p.value">
          {{ p.label }}
        </option>
      </select>

      <div v-if="!hasApiKey" style="margin-bottom: 10px;">
        <ApiKeyManager :provider="provider" />
      </div>

      <textarea
        v-model="prompt"
        :placeholder="`输入${typeLabels[type]}提示词...`"
      />

      <div class="card-actions" style="margin-top: 10px;">
        <button
          class="btn btn-primary"
          :disabled="loading || !prompt.trim()"
          @click="generate"
        >
          {{ loading ? '生成中...' : '开始生成' }}
        </button>
      </div>

      <div v-if="loading" class="loading">
        <span>⏳</span> 正在调用 {{ provider }} API，请稍候...
      </div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <div v-if="result" class="result-area">
        <div v-if="type === 'image' && result.url">
          <img :src="result.url" :alt="prompt" />
        </div>
        <div v-else-if="type === 'tts' && result.url">
          <audio controls :src="result.url" />
        </div>
        <div v-else-if="(type === 'video' || type === 'avatar') && result.url">
          <video controls :src="result.url" />
        </div>
        <div v-else>
          <pre style="font-size: 12px;">{{ JSON.stringify(result, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
