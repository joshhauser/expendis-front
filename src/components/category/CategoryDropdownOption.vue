<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { Category } from '@/shared/models/category.model';
  import CategoryIcon from '@/components/category/CategoryIcon.vue';
  import { useIconsStore } from '@/shared/stores/icons-store';

  const props = defineProps({
    category: {
      type: Object as PropType<Category>,
      required: true,
      default: () => {},
    },
  });

  const iconsStore = useIconsStore();
</script>

<template>
  <div class="flex align-items-center">
    <CategoryIcon
      :icon="iconsStore.getIcon(props.category?.icon)"
      :background-color="props.category?.color"
    />
    <span class="ml-2">{{ props.category?.label }}</span>
  </div>
</template>
