<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { Severity } from '@/shared/enums/severity.enum';

  const props = defineProps({
    text: {
      type: String,
      required: false,
      default: '',
    },
    severity: {
      type: [Object as PropType<Severity>, String],
      default: () => Severity.DANGER,
    },
  });
</script>

<template>
  <button :class="['btn-' + severity]">{{ text }}</button>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/fonts';
  @import '@/assets/styles/buttons';

  button {
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: unset;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }

  [disabled] {
    cursor: default;
  }
</style>
