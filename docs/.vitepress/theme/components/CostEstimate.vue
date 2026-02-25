<script setup lang="ts">
defineProps<{
  items: Array<{ step: string; tool: string; cost: string }>
  total?: string
}>()
</script>

<template>
  <div class="cost-estimate">
    <table>
      <thead>
        <tr>
          <th>步骤</th>
          <th>推荐工具</th>
          <th>预估成本</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.step">
          <td>{{ item.step }}</td>
          <td>{{ item.tool }}</td>
          <td>{{ item.cost }}</td>
        </tr>
        <tr v-if="total" class="total-row">
          <td colspan="2"><strong>合计</strong></td>
          <td><strong>{{ total }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
