<script setup lang="ts">
defineProps<{
  steps: string[]
}>()
</script>

<template>
  <div class="workflow-stepper">
    <template v-for="(step, i) in steps" :key="i">
      <div class="step">
        <span class="step-number">{{ i + 1 }}</span>
        <span class="step-label">{{ step }}</span>
      </div>
      <span v-if="i < steps.length - 1" class="step-arrow">→</span>
    </template>
  </div>
</template>
