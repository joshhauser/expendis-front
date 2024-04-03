<script setup lang="ts">
  import Transaction from '@/components/Transaction.vue';
  import type { TransactionWithCategory } from '@/shared/models/transaction.model';
  import { Utils } from '@/shared/utils';

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
      label: 'Test',
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
      label: 'Revenu',
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
    {
      label: 'dep1',
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
  <div
    v-for="(transactions, transactionDate, index) in mappedTransactionsByDate"
    :key="index"
    class="mb-3"
  >
    <p class="transaction-date p-2">{{ transactionDate }}</p>
    <Transaction
      v-for="transaction in transactions"
      :transaction="transaction"
      :key="transaction.id"
    />
  </div>
</template>

<style scoped></style>
