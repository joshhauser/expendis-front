<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    text: {
      type: String,
      required: true,
      default: () => 'tooltip',
    },
  });

  const margin: number = 10;
  const tooltipTarget = ref(null);
  const targetRect = ref<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const showTooltip = ref<boolean>(false);

  const addMouseTracker = () => {
    tooltipTarget.value!.addEventListener('mouseover', () => {
      const boundingRect = tooltipTarget.value!.getBoundingClientRect();

      targetRect.value = {
        width: boundingRect.width,
        height: boundingRect.height,
        x: boundingRect.x,
        y: boundingRect.y,
      };
    });
  };

  onMounted(() => {
    addMouseTracker();
  });
</script>

<template>
  <div class="flex">
    <div
      v-if="$slots.default"
      ref="tooltipTarget"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <slot></slot>
    </div>
    <Transition name="tooltip">
      <div
        class="tooltip"
        v-if="showTooltip"
        :style="{
          left: targetRect.x + targetRect.width + margin + 'px',
        }"
      >
        <span>{{ props.text }}</span>
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
