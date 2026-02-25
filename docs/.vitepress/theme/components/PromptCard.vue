<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  template: string
  params?: string[]
  platform?: string
  mcpCommand?: string
  costEstimate?: string
}>()

const paramValues = ref<Record<string, string>>({})
const copied = ref(false)
const showMcp = ref(false)

const filledPrompt = computed(() => {
  let text = props.template
  for (const p of props.params || []) {
    const val = paramValues.value[p]
    if (val) {
      text = text.replace(new RegExp(`\\{\\{\\s*${p}\\s*\\}\\}`, 'g'), val)
    }
  }
  return text
})

const hasUnfilled = computed(() => {
  return /\{\{.+?\}\}/.test(filledPrompt.value)
})

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(filledPrompt.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}

function formatLabel(param: string): string {
  return param.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
</script>

<template>
  <ClientOnly>
    <div class="prompt-card">
      <div class="card-header">
        <span class="card-title">{{ title }}</span>
        <span v-if="platform" class="card-platform">{{ platform }}</span>
      </div>

      <div v-if="params?.length" class="params-grid">
        <div v-for="p in params" :key="p" class="param-input">
          <label>{{ formatLabel(p) }}</label>
          <input
            v-model="paramValues[p]"
            :placeholder="`输入 ${formatLabel(p)}...`"
          />
        </div>
      </div>

      <div class="prompt-preview" v-html="renderPrompt()" />

      <div class="card-actions">
        <button class="btn btn-primary" @click="copyPrompt">
          {{ copied ? '已复制 ✓' : '复制提示词' }}
        </button>
        <button v-if="mcpCommand" class="btn btn-secondary" @click="showMcp = !showMcp">
          {{ showMcp ? '隐藏' : 'MCP 命令' }}
        </button>
        <span v-if="costEstimate" style="font-size: 12px; color: var(--vp-c-text-3); align-self: center;">
          {{ costEstimate }}
        </span>
      </div>

      <div v-if="showMcp && mcpCommand" class="mcp-section">
        <strong>Claude Code:</strong> {{ mcpCommand }}
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
export default {
  methods: {
    renderPrompt() {
      let text = this.$props.template || ''
      const vals = (this as any).paramValues || {}
      for (const p of this.$props.params || []) {
        const val = vals[p]
        if (val) {
          text = text.replace(
            new RegExp(`\\{\\{\\s*${p}\\s*\\}\\}`, 'g'),
            `<span class="param-highlight">${this.escapeHtml(val)}</span>`
          )
        } else {
          text = text.replace(
            new RegExp(`\\{\\{\\s*${p}\\s*\\}\\}`, 'g'),
            `<span class="param-highlight">{{${p}}}</span>`
          )
        }
      }
      return text.replace(/\n/g, '<br>')
    },
    escapeHtml(s: string) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  }
}
</script>
