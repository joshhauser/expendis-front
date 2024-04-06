<script setup lang="ts">
  import { useTooltipStore } from '@/shared/stores/tooltip-store';
  import { onMounted } from 'vue';

  const tooltipStore = useTooltipStore();
  const margin: number = 10;

  const addMouseTracker = () => {
    const tooltipTarget = document.getElementById('tooltip-target');
    if (tooltipTarget) {
      tooltipTarget.addEventListener('mouseover', () => {
        const boundingRect = tooltipTarget.getBoundingClientRect();
        tooltipStore.targetSize = {
          width: boundingRect.width,
          height: boundingRect.height,
        };
      });
    }
  };

  onMounted(() => {
    addMouseTracker();
  });
</script>

<template>
  <div class="flex">
    <div v-if="$slots.default" id="tooltip-target">
      <slot></slot>
    </div>
    <Transition name="tooltip">
      <div
        class="tooltip"
        v-if="tooltipStore.tooltipText !== ''"
        :style="{
          left: tooltipStore.targetSize.width + margin + 'px',
        }"
      >
        <span>{{ tooltipStore.tooltipText }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
  #tooltip-target {
    width: fit-content;
    height: fit-content;
  }

  .tooltip {
    position: absolute;
    padding: 0.25% 1%;
    width: fit-content;
    font-size: 10pt;
    color: white;
    height: auto;
    user-select: none;
    background-color: #41933b;
    border-radius: 10px;
  }
</style>
