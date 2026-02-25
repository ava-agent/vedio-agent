<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiKeys } from '../composables/useApiKeys'

const props = defineProps<{
  provider: string
  label?: string
}>()

const { saveKey, getLocalKey, hasKey } = useApiKeys()
const keyInput = ref('')
const saved = ref(false)
const hasSaved = ref(false)

onMounted(() => {
  hasSaved.value = hasKey(props.provider)
})

async function save() {
  if (!keyInput.value.trim()) return
  await saveKey(props.provider, keyInput.value.trim())
  saved.value = true
  hasSaved.value = true
  keyInput.value = ''
  setTimeout(() => { saved.value = false }, 2000)
}

function clear() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('vedio-agent:apikey:' + props.provider)
  }
  hasSaved.value = false
  saved.value = false
}
</script>

<template>
  <ClientOnly>
    <div class="api-key-manager">
      <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">
        {{ label || provider.toUpperCase() }} API Key
      </div>
      <div v-if="hasSaved" class="key-saved">
        ✓ Key 已保存 (本地存储)
        <button class="btn btn-secondary" style="font-size: 12px; padding: 2px 8px;" @click="clear">清除</button>
      </div>
      <div v-else class="key-input-row">
        <input
          v-model="keyInput"
          type="password"
          :placeholder="`输入 ${provider} API Key...`"
        />
        <button class="btn btn-primary" @click="save">保存</button>
      </div>
      <div v-if="saved" style="font-size: 12px; color: var(--vp-c-green-1); margin-top: 4px;">已保存到本地</div>
      <div style="font-size: 11px; color: var(--vp-c-text-3); margin-top: 6px;">
        Key 仅存储在浏览器本地，不会上传到服务器
      </div>
    </div>
  </ClientOnly>
</template>
