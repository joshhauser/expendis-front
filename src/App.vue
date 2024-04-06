<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TransactionsSummary from '@/components/TransactionsSummary.vue';
  import DashboardCard from '@/components/DashboardCard.vue';
  import { useTooltipStore } from '@/shared/stores/tooltip-store';
  import Tooltip from '@/components/Tooltip.vue';

  const tooltipStore = useTooltipStore();
</script>

<template>
  <div>
    <Tooltip text="Test">
      <button>Test tooltip</button>
    </Tooltip>

    <DashboardCard>
      <template #title>
        <h3>Derniers mouvements</h3>
      </template>
      <template #content>
        <TransactionsSummary />
      </template>
    </DashboardCard>
    <RouterView />
  </div>
</template>

<style scoped></style>
