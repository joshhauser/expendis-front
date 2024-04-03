<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useIconsStore } from '@/shared/stores/icons-store';
  import CategoryIcon from '@/components/CategoryIcon.vue';
  import Transaction from '@/components/Transaction.vue';
  import type { TransactionWithCategory } from '@/shared/models/transaction.model';
  import { Utils } from '@/shared/utils';
  import TransactionsSummary from '@/components/TransactionsSummary.vue';
  import DashboardCard from '@/components/DashboardCard.vue';

  const iconStore = useIconsStore();

  const transactions: TransactionWithCategory[] = [
    {
      label: 'T1',
      amount: 45.6,
      category: {
        label: 'Cat1',
        color: '#4565c4',
        icon: 'fas fa-house',
      },
      categoryId: 1,
      date: new Date(),
    },
    {
      label: 'T2',
      amount: -105.6,
      category: {
        label: 'Cat1',
        color: '#4565c4',
        icon: 'fas fa-house',
      },
      categoryId: 1,
      date: new Date('2019-01-06'),
    },
  ];

  const mappedTransactionsByDate = Utils.mapTransactionsByDate(transactions);
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
