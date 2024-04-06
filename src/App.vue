<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TransactionsSummary from '@/components/TransactionsSummary.vue';
  import DashboardCard from '@/components/DashboardCard.vue';
</script>

<template>
  <div>
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
