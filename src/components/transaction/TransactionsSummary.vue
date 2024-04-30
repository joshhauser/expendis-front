<script setup lang="ts">
  import TransactionLine from '@/components/transaction/TransactionLine.vue';
  import type { TransactionWithCategory, Transaction } from '@/shared/models/transaction.model';
  import { Utils } from '@/shared/utils';
  import type { PropType } from 'vue';

  const props = defineProps({
    transactions: {
      type: Array as PropType<Transaction[] | TransactionWithCategory[]>,
      required: true,
    },
  });

  const mappedTransactionsByDate = Utils.mapTransactionsByDate(props.transactions);
</script>

<template>
  <div
    v-for="(transactions, transactionDate, index) in mappedTransactionsByDate"
    :key="index"
    class="mb-3"
  >
    <p class="transaction-date p-2">{{ transactionDate }}</p>
    <TransactionLine
      v-for="transaction in transactions"
      :transaction="transaction"
      :key="transaction.id"
    />
  </div>
</template>

<style scoped></style>
