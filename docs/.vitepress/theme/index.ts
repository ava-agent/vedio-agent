import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import PromptCard from './components/PromptCard.vue'
import GeneratePanel from './components/GeneratePanel.vue'
import ApiKeyManager from './components/ApiKeyManager.vue'
import WorkflowStepper from './components/WorkflowStepper.vue'
import CostEstimate from './components/CostEstimate.vue'

import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PromptCard', PromptCard)
    app.component('GeneratePanel', GeneratePanel)
    app.component('ApiKeyManager', ApiKeyManager)
    app.component('WorkflowStepper', WorkflowStepper)
    app.component('CostEstimate', CostEstimate)
  }
} satisfies Theme
