<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useIconsStore } from '@/shared/stores/icons-store';
  import { Utils } from '@/shared/utils';
  import type { PropType } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<any>,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select an option',
    },
    options: {
      type: Array as PropType<Array<any>>,
      required: true,
      default: () => [],
    },
    optionLabel: {
      type: String,
      required: false,
    },
    optionValue: {
      type: String,
      required: false,
    },
    showClear: {
      type: Boolean,
      required: false,
      default: false,
    },
    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },
  });

  const emits = defineEmits(['update:modelValue']);
  const iconsStore = useIconsStore();
  const showOptions = ref<boolean>(false);

  const onClick = () => {
    showOptions.value = !showOptions.value;
  };

  const onOptionSelect = (selectedOption: any) => {
    emits('update:modelValue', selectedOption);
  };

  const onReset = (event: any) => {
    event.stopPropagation();
    emits('update:modelValue', undefined);
  };

  const isValueSet = computed(() => {
    return props.modelValue != undefined;
  });
</script>

<template>
  <div>
    <div class="dropdown border-round-lg" :class="{ opened: showOptions }" @click="onClick">
      <div class="dropdown-inputwrapper text-base p-2">
        <div class="dropdown-input">
          <slot name="label" :selected="modelValue">
            <template v-if="isValueSet">
              <template v-if="optionLabel != undefined">
                <span>{{ props.modelValue[optionLabel] }}</span>
              </template>
              <template v-else>
                <span>{{ modelValue }}</span>
              </template>
            </template>
            <template v-else>
              <span class="placeholder">
                {{ placeholder }}
              </span>
            </template>
          </slot>
        </div>
        <span v-if="modelValue" class="dropdown-close dropdown-icon" @click="onReset">
          <FontAwesomeIcon :icon="iconsStore.getIcon('fas fa-xmark')" />
        </span>
        <span class="dropdown-toggle dropdown-icon">
          <FontAwesomeIcon :icon="iconsStore.getIcon('fas fa-chevron-down')" />
        </span>
      </div>
      <div class="dropdown-options" v-if="showOptions">
        <template v-if="props.options.length == 0">
          <li>No options.</li>
        </template>

        <template v-else>
          <div class="dropdown-option" v-for="option in options" @click="onOptionSelect(option)">
            <slot name="option" :option="option">
              <template v-if="!Utils.isStringEmpty(props.optionLabel)">
                {{ option[props.optionLabel] }}
              </template>
              <template v-else>
                {{ option }}
              </template>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/colors';

  .dropdown {
    user-select: none;
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid $secondary-border;
    line-height: normal;

    &.opened {
      border-bottom-left-radius: unset !important;
      border-bottom-right-radius: unset !important;
    }

    &-inputwrapper {
      width: 100%;
      display: inline-flex;
    }

    &-input {
      white-space: nowrap;
      overflow: hidden;
      flex: 1 1 auto;
      text-overflow: ellipsis;
      cursor: pointer;

      .placeholder {
        color: $lightgray;
      }
    }

    &-toggle {
      width: 5%;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropdown-options {
      top: 100%;
      width: 100%;
      height: auto;
      position: absolute;
      background-color: white;
      z-index: 2;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      outline: 1px solid $secondary-border;

      .dropdown-option {
        padding: 0.75rem 0.75rem;

        &:hover {
          background-color: $secondary-bg;
        }

        &:last-child {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      }
    }
  }
</style>
