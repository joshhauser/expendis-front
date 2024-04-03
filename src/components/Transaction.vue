<script setup lang="ts">
  import { useIconsStore } from '@/shared/stores/icons-store';
  import CategoryIcon from '@/components/CategoryIcon.vue';
  import type { PropType } from 'vue';
  import type { TransactionWithCategory } from '@/shared/models/transaction.model';

  const props = defineProps({
    transaction: {
      type: Object as PropType<TransactionWithCategory>,
      required: true,
      default: () => undefined,
    },
  });
  const iconStore = useIconsStore();
</script>

<template>
  <div>
    <div class="col w-full">
      <div class="flex align-items-center justify-content-between">
        <CategoryIcon
          :background-color="'gray'"
          :icon="iconStore.getIcon('fas fa-house')"
        />
        <div class="col">
          {{ props.transaction!.label }}
        </div>
        <div
          v-if="props.transaction!.amount > 0"
          class="col-auto income amount"
        >
          + {{ props.transaction!.amount }} €
        </div>
        <div v-else class="col-auto expense amount">
          - {{ Math.abs(props.transaction!.amount) }} €
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
