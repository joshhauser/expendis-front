<script setup lang="ts">
  import { onMounted, type PropType, ref } from 'vue';
  import {
    Chart,
    LinearScale,
    BarController,
    CategoryScale,
    BarElement,
    PieController,
    ArcElement,
    Tooltip,
  } from 'chart.js';
  import type { Distribution } from '@/shared/models/distribution-item.model';

  Chart.register(
    LinearScale,
    BarController,
    CategoryScale,
    BarElement,
    PieController,
    ArcElement,
    Tooltip
  );

  const props = defineProps({
    distribution: {
      type: Object as PropType<Distribution>,
      required: true,
    },
  });

  const chartContainer = ref(null);

  onMounted(() => {
    const labels = [];
    const amounts = [];
    const backgroundColors = [];
    for (const distributionItem of props.distribution!.distributionItems) {
      labels.push(
        distributionItem.category.label + ' - ' + Math.abs(distributionItem.amount) + ' €'
      );
      amounts.push(distributionItem.percentage);
      backgroundColors.push(distributionItem.category.color);
    }

    const data = {
      labels,
      datasets: [
        {
          data: amounts,
          backgroundColor: backgroundColors,
        },
      ],
    };

    new Chart(chartContainer.value, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 0.7,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart',
          },
        },
      },
    });
  });
</script>

<template>
  <div style="height: 40vh" class="flex justify-content-center">
    <canvas ref="chartContainer"></canvas>
  </div>
</template>

<style scoped></style>
