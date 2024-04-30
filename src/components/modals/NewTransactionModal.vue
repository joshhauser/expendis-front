<script lang="ts" setup>
  import Alert from '@/components/ds/Alert.vue';
  import Dropdown from '@/components/ds/Dropdown.vue';
  import { ref } from 'vue';
  import CategoryDropdownOption from '@/components/category/CategoryDropdownOption.vue';

  const chosenCategory = ref(null);
  const cats = [
    { label: 'Cat1', color: '#4565c4', icon: 'fas fa-house' },
    { label: 'Cat2', color: '#A565c9', icon: 'fas fa-house' },
  ];
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
          />
        </div>
        <div class="field col">
          <label for="transactionAmount">Amount</label>
          <input
            id="transactionAmount"
            type="number"
            class="text-base p-2 border-1 border-round-lg w-full"
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
          <Dropdown :options="cats" v-model="chosenCategory" optionLabel="label">
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
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/colors.scss';

  input {
    border-color: $secondary-border;
  }
</style>
