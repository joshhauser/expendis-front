<script lang="ts" setup>
  import { type PropType, ref } from 'vue';
  import { Severity } from '@/shared/enums/severity.enum';

  const props = defineProps({
    message: {
      type: String,
      default: () => 'Alert!',
    },
    severity: {
      type: [Object as PropType<Severity>, String],
      default: () => Severity.WARNING,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  });

  const show = ref(true);

  const closeAlert = () => {
    show.value = false;
  };
</script>

<template>
  <div
    v-if="show"
    class="w-full alert flex justify-content-between"
    :class="props.severity.valueOf()"
  >
    <div>
      {{ props.message }}
    </div>
    <div class="closing-btn" v-if="props.closable" @click="closeAlert()">Fermer</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/colors';

  .alert {
    padding: 1% 2%;
    margin: 1% 0;
    border-radius: 8px;

    &.primary {
      background-color: $primary-bg;
      border: 2px solid $primary-border;
      color: $primary-text;
    }

    &.secondary {
      background-color: $secondary-bg;
      border: 2px solid $secondary-border;
      color: $secondary-text;
    }

    &.success {
      background-color: $success-bg;
      border: 2px solid $success-border;
      color: $success-text;
    }

    &.warning {
      background-color: $warning-bg;
      border: 2px solid $warning-border;
      color: $warning-text;
    }

    &.danger {
      background-color: $danger-bg;
      border: 2px solid $danger-border;
      color: $danger-text;
    }

    &.info {
      background-color: $info-bg;
      border: 2px solid $info-border;
      color: $info-text;
    }

    &.light {
      background-color: $light-bg;
      border: 2px solid $light-border;
      color: $light-text;
    }

    &.dark {
      background-color: $dark-bg;
      border: 2px solid $dark-border;
      color: $dark-text;
    }

    .closing-btn {
      cursor: pointer;
    }
  }
</style>
