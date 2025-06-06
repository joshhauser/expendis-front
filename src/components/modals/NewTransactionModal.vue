<script lang="ts" setup>
  import CategoryDropdownOption from '@/components/category/CategoryDropdownOption.vue';
  import Alert from '@/components/ds/Alert.vue';
  import Button from '@/components/ds/Button.vue';
  import Dropdown from '@/components/ds/Dropdown.vue';
  import type { Category } from '@/shared/models/category.model';
  import type { Transaction } from '@/shared/models/transaction.model';
  import { CategoryService } from '@/shared/services/category.service';
  import { TransactionService } from '@/shared/services/transaction.service';
  import { useModalStore } from '@/shared/stores/modal-store';
  import { computed, onMounted, ref, watch } from 'vue';

  const modalStore = useModalStore();
  const chosenCategoryId = ref(null);
  const categories = ref<Category[]>([]);
  const transaction = ref<Partial<Transaction>>({});

  const disableConfirmationBtn = computed(() => {
    return !transaction.value.label || !transaction.value.amount || !transaction.value.categoryId;
  });

  watch(chosenCategoryId, () => {
    transaction.value.categoryId = chosenCategoryId.value;
  });

  const createTransaction = () => {
    TransactionService.create(transaction.value as Transaction);
  };

  const closeModal = () => {
    modalStore.closeModal();
  };

  onMounted(() => {
    CategoryService.getAll().then((res) => {
      categories.value = res.data;
    });
  });
</script>

<template>
  <div>
    <div class="form form-parts flex flex-column gap-2">
      <div class="grid">
        <div class="field col">
          <label for="transactionLabel">Label</label>
          <input
            id="transactionLabel"
            type="text"
            class="text-base p-2 border-1 border-round-lg w-full"
            v-model="transaction.label"
          />
        </div>
        <div class="field col">
          <label for="transactionAmount">Amount</label>
          <input
            id="transactionAmount"
            type="number"
            class="text-base p-2 border-1 border-round-lg w-full"
            v-model="transaction.amount"
          />
        </div>
      </div>
      <Alert
        :severity="'info'"
        message="Category is a mandatory configuration that allows to distribute transactions among expenditure items."
      />
      <div class="grid">
        <div class="field col">
          <label>Category</label>
          <Dropdown
            :options="categories"
            v-model="chosenCategoryId"
            optionLabel="label"
            optionValue="id"
          >
            <template #label="{ selected }">
              <CategoryDropdownOption v-if="selected" :category="selected" />
            </template>
            <template #option="{ option }">
              <CategoryDropdownOption :category="option" />
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="flex justify-content-end align-items-center gap-3">
      <Button text="Cancel" severity="secondary" @click="closeModal()" />
      <Button
        text="Confirm"
        severity="primary"
        :disabled="disableConfirmationBtn"
        @click="createTransaction()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/colors.scss';

  input {
    border-color: $secondary-border;
  }
</style>
