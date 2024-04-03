<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  const props = defineProps({
    backgroundColor: {
      type: String,
      default: () => 'black',
    },
    icon: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div id="icon-wrapper" :style="{ backgroundColor: props.backgroundColor }">
    <FontAwesomeIcon :icon="props.icon" />
  </div>
</template>

<style scoped lang="scss">
  $size: 32px;

  #icon-wrapper {
    height: $size;
    width: $size;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10pt;
  }
</style>
