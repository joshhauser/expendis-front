<script setup lang="ts">
  import Datepicker from '@/components/ds/Datepicker.vue';
  import { RouterView } from 'vue-router';
  import TransactionsSummary from '@/components/transaction/TransactionsSummary.vue';
  import DashboardCard from '@/components/dashboard/DashboardCard.vue';
  import type { TransactionWithCategory } from '@/shared/models/transaction.model';
  import ExpensesDistribution from '@/components/transaction/ExpensesDistribution.vue';

  import { useModalStore } from '@/shared/stores/modal-store';
  import BaseModal from '@/components/ds/ModalWrapper.vue';
  import FloatingMenu from '@/components/ds/FloatingMenu.vue';
  import { useIconsStore } from '@/shared/stores/icons-store';
  import NewTransactionModal from '@/components/modals/NewTransactionModal.vue';

  const modalStore = useModalStore();
  const iconsStore = useIconsStore();

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
        label: 'Cat2',
        color: '#A565c9',
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

  const distribution = {
    totalAmount: 180,
    distributionItems: [
      {
        amount: 70,
        percentage: 41.18,
        category: {
          label: 'First',
          color: 'red',
          icon: 'fas fa-house',
          id: 1,
        },
      },
      {
        amount: 100,
        percentage: 58.82,
        category: {
          label: 'Second',
          color: 'blue',
          icon: 'fas fa-house',
          id: 1,
        },
      },
    ],
  };

  const openModal = () => {
    modalStore.openModal({ component: NewTransactionModal });
  };
</script>

<template>
  <div>
    <div class="flex justify-content-center gap-3" style="max-height: 50vh">
      <div class="col-3">
        <DashboardCard>
          <template #title>
            <h3>Derniers mouvements</h3>
          </template>
          <template #content>
            <TransactionsSummary :transactions="transactions" />
          </template>
        </DashboardCard>
      </div>
      <div class="col-3">
        <DashboardCard>
          <template #title>
            <h3>Derniers mouvements</h3>
          </template>
          <template #content>
            <ExpensesDistribution :distribution="distribution" />
          </template>
        </DashboardCard>
      </div>
      <div class="col-3">
        <DashboardCard>
          <template #title>
            <h3>Derniers mouvements</h3>
          </template>
          <template #content>
            <TransactionsSummary :transactions="transactions" />
          </template>
        </DashboardCard>
      </div>
    </div>
    <RouterView />

    <div style="height: 300px">
      <Datepicker />
    </div>
    <BaseModal />
    <FloatingMenu
      action-button-color="red"
      :menu-items="[
        {
          iconKey: iconsStore.getIcon('fas fa-plus'),
          tooltip: 'Ajouter une transaction',
          action: () => {
            openModal();
          },
          backgroundColor: 'blue',
        },
      ]"
    />
  </div>
</template>

<style scoped></style>
